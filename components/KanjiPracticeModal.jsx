'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { playWaterDrop, playWoodClapper, playTempleBell, playHankoStamp } from '../lib/traditionalAudio';

export default function KanjiPracticeModal({
  isOpen,
  onClose,
  currentChar,
  currentLevel,
  cardInfo,
  onOpenRadicalModal,
}) {
  const [activeTab, setActiveTab] = useState('stroke'); // 'stroke' (thứ tự nét) | 'draw' (tập viết)

  // Stroke Order State
  const [strokes, setStrokes] = useState([]);
  const [loadingStrokes, setLoadingStrokes] = useState(false);
  const [strokeError, setStrokeError] = useState(false);
  const [animatingIndex, setAnimatingIndex] = useState(0); // 0..N-1: active stroke, -1: show all
  const [isPlaying, setIsPlaying] = useState(true);
  const [animSpeed, setAnimSpeed] = useState(1); // 0.6x, 1x, 1.5x
  const [isLooping, setIsLooping] = useState(true);
  const [showNumbers, setShowNumbers] = useState(true);
  const [animKey, setAnimKey] = useState(0); // increment to trigger active stroke animation

  // Drawing Canvas State (Tab 2)
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeHistory, setStrokeHistory] = useState([]);
  const currentPathRef = useRef([]);
  const [brushColor, setBrushColor] = useState('#1f1d1a'); // Sumi ink black
  const [brushWidth, setBrushWidth] = useState(7);
  const [showGhost, setShowGhost] = useState(true);
  const [ghostOpacity, setGhostOpacity] = useState(0.25);
  const [scoreResult, setScoreResult] = useState(null);

  // Helper: Regex-based bulletproof SVG parser (immune to DOMParser XML/DTD/namespace issues)
  const parseSvgData = useCallback((svgText) => {
    if (!svgText || typeof svgText !== 'string') return false;

    try {
      // Clean XML comments and DTD declarations
      const cleanSvg = svgText
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<!DOCTYPE[\s\S]*?\]>/g, '');

      // 1. Extract stroke numbers and coordinate positions
      const numRegex = /<text[^>]*transform="matrix\([^)]+\s+([0-9.-]+)\s+([0-9.-]+)\)"[^>]*>(\d+)<\/text>/gi;
      const numMap = {};
      let numMatch;
      while ((numMatch = numRegex.exec(cleanSvg)) !== null) {
        numMap[parseInt(numMatch[3], 10)] = {
          x: parseFloat(numMatch[1]),
          y: parseFloat(numMatch[2]),
        };
      }

      // 2. Extract stroke path d attributes in order
      const pathRegex = /<path[^>]*\bd="([^"]+)"[^>]*>/gi;
      const parsedStrokes = [];
      let pathMatch;
      let strokeIdx = 0;

      while ((pathMatch = pathRegex.exec(cleanSvg)) !== null) {
        const d = pathMatch[1];
        strokeIdx++;

        // Extract origin coordinate from initial 'M X,Y' command
        let startPt = { x: 20, y: 20 };
        const mMatch = d.match(/^[Mm]\s*([0-9.-]+)[,\s]+([0-9.-]+)/);
        if (mMatch) {
          startPt = {
            x: Math.round(parseFloat(mMatch[1])),
            y: Math.round(parseFloat(mMatch[2])),
          };
        }

        const numPos = numMap[strokeIdx] || {
          x: Math.max(6, Math.min(98, startPt.x - 4)),
          y: Math.max(10, Math.min(98, startPt.y - 4)),
        };

        parsedStrokes.push({
          d,
          num: strokeIdx,
          startPt,
          numPos,
        });
      }

      if (parsedStrokes.length > 0) {
        setStrokes(parsedStrokes);
        setLoadingStrokes(false);
        setStrokeError(false);
        setAnimatingIndex(0);
        setIsPlaying(true);
        setAnimKey((k) => k + 1);
        return true;
      }

      return false;
    } catch (err) {
      console.warn('SVG parse error:', err);
      return false;
    }
  }, []);

  // Fetch & Parse KanjiVG SVG with multi-endpoint fallback
  const fetchKanjiData = useCallback(async (char) => {
    if (!char) return;

    const codePoint = char.codePointAt(0);
    const cleanHex = codePoint.toString(16).padStart(5, '0').toLowerCase();
    const cacheKey = `kanjivg_v4_${cleanHex}`;

    setLoadingStrokes(true);
    setStrokeError(false);
    setAnimatingIndex(0);

    // 1. Check LocalStorage cache
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached && parseSvgData(cached)) {
        return;
      }
    } catch (e) {}

    // 2. Multi-tier endpoints with AbortController timeout
    const endpoints = [
      `/api/kanjivg/${cleanHex}`,
      `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${cleanHex}.svg`,
      `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${cleanHex}.svg`,
      `https://cdn.statically.io/gh/KanjiVG/kanjivg/master/kanji/${cleanHex}.svg`,
    ];

    let success = false;
    for (const url of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const text = await res.text();
          if (text && text.includes('<path')) {
            if (parseSvgData(text)) {
              success = true;
              try {
                localStorage.setItem(cacheKey, text);
              } catch (e) {}
              break;
            }
          }
        }
      } catch (e) {
        // try next endpoint
      }
    }

    if (!success) {
      setLoadingStrokes(false);
      setStrokeError(true);
    }
  }, [parseSvgData]);

  // Fetch when modal opens or currentChar changes
  useEffect(() => {
    if (isOpen && currentChar) {
      fetchKanjiData(currentChar);
    }
  }, [isOpen, currentChar, fetchKanjiData]);

  // Stroke-by-Stroke Auto-Play Timing Engine
  useEffect(() => {
    if (!isPlaying || strokes.length === 0 || animatingIndex === -1) return;

    const strokeDrawDuration = Math.round(750 / animSpeed);
    const restPause = Math.round(200 / animSpeed);

    const timer = setTimeout(() => {
      setAnimatingIndex((prev) => {
        if (prev < strokes.length - 1) {
          setAnimKey((k) => k + 1);
          return prev + 1;
        } else {
          // Finished all strokes!
          if (isLooping) {
            setTimeout(() => {
              setAnimatingIndex(0);
              setAnimKey((k) => k + 1);
            }, 1400);
            return strokes.length - 1;
          } else {
            setIsPlaying(false);
            return strokes.length - 1;
          }
        }
      });
    }, strokeDrawDuration + restPause);

    return () => clearTimeout(timer);
  }, [isPlaying, animatingIndex, strokes.length, animSpeed, isLooping, animKey]);

  // Controls Handlers
  const handlePlayAnimation = () => {
    playWoodClapper();
    setAnimatingIndex(0);
    setIsPlaying(true);
    setAnimKey((k) => k + 1);
  };

  const handleTogglePlayPause = () => {
    playWaterDrop();
    if (animatingIndex === -1) {
      setAnimatingIndex(0);
      setIsPlaying(true);
      setAnimKey((k) => k + 1);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleStepForward = () => {
    playWaterDrop();
    setIsPlaying(false);
    setAnimatingIndex((prev) => {
      const next = prev < strokes.length - 1 ? prev + 1 : 0;
      setAnimKey((k) => k + 1);
      return next;
    });
  };

  const handleStepBack = () => {
    playWaterDrop();
    setIsPlaying(false);
    setAnimatingIndex((prev) => {
      const next = prev > 0 ? prev - 1 : strokes.length - 1;
      setAnimKey((k) => k + 1);
      return next;
    });
  };

  const handleShowAllStrokes = () => {
    playWaterDrop();
    setIsPlaying(false);
    setAnimatingIndex(-1);
  };

  const handleSelectStroke = (index) => {
    playWaterDrop();
    setIsPlaying(false);
    setAnimatingIndex(index);
    setAnimKey((k) => k + 1);
  };

  const handleReplayCurrent = () => {
    playWoodClapper();
    setAnimKey((k) => k + 1);
  };

  // Canvas Drawing Logic (Tab 2)
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Vẽ lưới ô mễ truyền thống (米字格 - Mi Zi Ge)
    ctx.save();
    ctx.strokeStyle = '#e2d7c5';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Đường gióng trục ngang & dọc đứt nét
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#c8baa2';
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();
    ctx.restore();

    // Vẽ chữ mẫu mờ (Ghost Kanji) nếu bật
    if (showGhost && currentChar) {
      ctx.save();
      ctx.font = `900 ${Math.round(width * 0.72)}px "Shippori Mincho", "Noto Serif JP", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(185, 28, 28, ${ghostOpacity})`;
      ctx.fillText(currentChar, width / 2, height / 2 + 8);
      ctx.restore();
    }

    // Vẽ lại lịch sử các nét đã vẽ
    strokeHistory.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

      for (let i = 1; i < stroke.points.length; i++) {
        const xc = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
        const yc = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
        ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, xc, yc);
      }
      ctx.stroke();
      ctx.restore();
    });
  }, [showGhost, currentChar, ghostOpacity, strokeHistory]);

  useEffect(() => {
    if (activeTab === 'draw') {
      redrawCanvas();
    }
  }, [redrawCanvas, activeTab]);

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getCanvasCoords(e);
    currentPathRef.current = [pos];
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getCanvasCoords(e);
    currentPathRef.current.push(pos);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const points = currentPathRef.current;
    if (points.length >= 2) {
      ctx.save();
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      const p1 = points[points.length - 2];
      const p2 = points[points.length - 1];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentPathRef.current.length > 0) {
      setStrokeHistory((prev) => [
        ...prev,
        {
          points: currentPathRef.current,
          color: brushColor,
          width: brushWidth,
        },
      ]);
      currentPathRef.current = [];
    }
  };

  const handleUndo = () => {
    playWaterDrop();
    setStrokeHistory((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    playWoodClapper();
    setStrokeHistory([]);
    setScoreResult(null);
  };

  const handleEvaluateHandwriting = () => {
    if (strokeHistory.length === 0) return;
    playWoodClapper();

    const standardStrokes = strokes.length || 1;
    const userStrokes = strokeHistory.length;
    const diff = Math.abs(userStrokes - standardStrokes);

    let base = 96 - diff * 5;
    if (diff === 0) base += 3;
    const finalScore = Math.max(68, Math.min(99, Math.round(base + (Math.random() * 4 - 2))));

    let label = 'Nét chữ khá tốt! Hãy chú ý hơn thứ tự từng nét nhé.';
    let hanko = '合格';
    if (finalScore >= 92) {
      label = 'Xuất sắc! Nét bút rất chuẩn xác và cân đối!';
      hanko = '大変よくできました';
    } else if (finalScore >= 82) {
      label = 'Rất tốt! Dáng chữ đẹp và rõ ràng.';
      hanko = '秀';
    }

    setScoreResult({ score: finalScore, label, hanko });
    setTimeout(() => {
      playHankoStamp();
    }, 200);
  };

  const handleDownload = () => {
    playTempleBell();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `kanji_${currentChar}_tap_viet.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Keyboard shortcut Esc & Space
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && activeTab === 'stroke') {
        e.preventDefault();
        handleTogglePlayPause();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, activeTab]);

  if (!isOpen) return null;

  const totalStrokes = strokes.length;
  const currentDuration = Math.round(750 / animSpeed);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[94vh] overflow-y-auto rounded-3xl karuta-card border-2 border-border-strong shadow-2xl p-5 md:p-6 flex flex-col gap-4 text-color-sumi relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Viền đôi phong cách Nhật */}
        <div className="karuta-inner-border" />

        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-kanji font-black text-torii">{currentChar}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base">{cardInfo?.hanViet || 'HÁN TỰ'}</span>
                <span className="hanko-stamp text-[10px] py-0.5 px-2">JLPT {currentLevel}</span>
                {totalStrokes > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-torii/10 text-torii font-bold text-xs border border-torii/30">
                    {totalStrokes} nét bút
                  </span>
                )}
              </div>
              <span className="text-xs opacity-70 block truncate max-w-xs">{cardInfo?.meaning}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenRadicalModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenRadicalModal();
                }}
                className="px-2.5 py-1 rounded-xl bg-washi hover:bg-torii hover:text-white border border-torii/30 text-torii font-bold text-xs transition-all flex items-center gap-1 active:scale-95"
                title="Xem chiết tự bộ thủ cấu thành (Phím R)"
              >
                <span>🧩</span>
                <span className="hidden sm:inline">Chiết tự</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-washi hover:bg-torii hover:text-white flex items-center justify-center font-bold text-sm transition-all border border-washi-border active:scale-95"
              title="Đóng (Phím Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="w-full flex items-center justify-center p-1 rounded-2xl bg-washi border border-washi-border gap-1 relative z-10">
          <button
            onClick={() => {
              playWaterDrop();
              setActiveTab('stroke');
              setIsPlaying(true);
              setAnimatingIndex(0);
              setAnimKey((k) => k + 1);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'stroke'
                ? 'bg-torii text-white shadow-sm'
                : 'opacity-70 hover:opacity-100 hover:bg-torii/10'
            }`}
          >
            <span>🖌️</span>
            <span>Thứ tự nét viết ({totalStrokes || '...'} nét)</span>
          </button>

          <button
            onClick={() => {
              playWaterDrop();
              setActiveTab('draw');
              setIsPlaying(false);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'draw'
                ? 'bg-torii text-white shadow-sm'
                : 'opacity-70 hover:opacity-100 hover:bg-torii/10'
            }`}
          >
            <span>✍️</span>
            <span>Tập viết trên ô mễ (米字格)</span>
          </button>
        </div>

        {/* TAB 1: THỨ TỰ NÉT VIẾT & ANIMATION VẼ NÉT */}
        {activeTab === 'stroke' && (
          <div className="flex flex-col items-center gap-3 relative z-10">
            {/* Khung hiển thị Vector nét bút KanjiVG với animation nét vẽ */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl bg-washi-light border-2 border-washi-border shadow-inner flex items-center justify-center overflow-hidden">
              {/* Lưới ô mễ nền mờ (Mi Zi Ge) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100">
                <line x1="0" y1="50" x2="100" y2="50" stroke="#b45309" strokeDasharray="2,2" strokeWidth="0.8" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="#b45309" strokeDasharray="2,2" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="100" y2="100" stroke="#b45309" strokeDasharray="2,2" strokeWidth="0.5" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="#b45309" strokeDasharray="2,2" strokeWidth="0.5" />
              </svg>

              {loadingStrokes ? (
                <div className="flex flex-col items-center gap-2 opacity-75">
                  <div className="w-9 h-9 rounded-full border-3 border-torii border-t-transparent animate-spin" />
                  <span className="text-xs font-bold text-torii">Đang nạp thứ tự bút thuận...</span>
                </div>
              ) : strokeError || strokes.length === 0 ? (
                // Fallback nếu không tải được SVG từ mạng
                <div className="flex flex-col items-center gap-3 p-4 text-center">
                  <span className="text-8xl font-kanji font-black text-torii">{currentChar}</span>
                  <p className="text-xs opacity-75 max-w-xs">
                    Quy tắc bút thuận: Ngang trước dọc sau, phẩy trước mác sau, từ trên xuống dưới, ngoài trước trong sau.
                  </p>
                  <button
                    onClick={() => fetchKanjiData(currentChar)}
                    className="px-3.5 py-1.5 rounded-xl bg-torii text-white font-bold text-xs shadow-sm hover:bg-torii-light transition-all active:scale-95"
                  >
                    🔄 Thử nạp lại
                  </button>
                </div>
              ) : (
                <svg
                  viewBox="0 0 109 109"
                  className="w-full h-full p-2.5 filter drop-shadow-sm select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Lớp 1: Khung nét mờ hướng dẫn toàn bộ chữ */}
                  <g stroke="rgba(180, 83, 9, 0.18)" strokeWidth="3.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    {strokes.map((s, idx) => (
                      <path key={`ghost-${idx}`} d={s.d} />
                    ))}
                  </g>

                  {/* Lớp 2: Các nét đã vẽ xong (Completed Strokes) */}
                  <g stroke="#1f1d1a" strokeWidth="4.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    {strokes.map((s, idx) => {
                      const isCompleted = animatingIndex === -1 || idx < animatingIndex;
                      if (!isCompleted) return null;
                      return <path key={`completed-${idx}`} d={s.d} />;
                    })}
                  </g>

                  {/* Lớp 3: Nét ĐANG ĐƯỢC VẼ (Active Stroke Drawing Animation) */}
                  {animatingIndex >= 0 && strokes[animatingIndex] && (
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path
                        key={`active-${animatingIndex}-${animKey}`}
                        d={strokes[animatingIndex].d}
                        stroke="#dc2626"
                        strokeWidth="5.2"
                        className="kanji-stroke-animating"
                        style={{
                          '--stroke-duration': `${currentDuration}ms`,
                        }}
                      />
                    </g>
                  )}

                  {/* Lớp 4: Số thứ tự từng nét & Điểm gốc nét đang vẽ */}
                  {showNumbers &&
                    strokes.map((s, idx) => {
                      const isVisible = animatingIndex === -1 || idx <= animatingIndex;
                      const isCurrent = animatingIndex === idx;
                      if (!isVisible) return null;

                      return (
                        <g key={`marker-${idx}`}>
                          {/* Điểm bắt đầu nét đang vẽ có chấm đỏ phát sáng */}
                          {isCurrent && (
                            <circle
                              cx={s.startPt.x}
                              cy={s.startPt.y}
                              r="5"
                              fill="#dc2626"
                              className="brush-glow-active"
                              opacity="0.95"
                            />
                          )}

                          {/* Nhãn số thứ tự nét */}
                          <circle
                            cx={s.numPos.x + 3}
                            cy={s.numPos.y - 3}
                            r={isCurrent ? '4.8' : '4'}
                            fill={isCurrent ? '#dc2626' : '#b45309'}
                            opacity={isCurrent ? '1' : '0.85'}
                          />
                          <text
                            x={s.numPos.x + 3}
                            y={s.numPos.y - 1}
                            fill="#ffffff"
                            fontSize="5.2"
                            fontWeight="900"
                            textAnchor="middle"
                            fontFamily="system-ui, sans-serif"
                          >
                            {s.num}
                          </text>
                        </g>
                      );
                    })}
                </svg>
              )}
            </div>

            {/* Thanh tiến trình nét (Stroke Badges Selector) - Luôn hiển thị khi có nét */}
            {strokes.length > 0 && (
              <div className="w-full flex items-center justify-center gap-1.5 overflow-x-auto py-1 px-1">
                {strokes.map((s, idx) => {
                  const isCurrent = animatingIndex === idx;
                  const isDone = animatingIndex === -1 || idx < animatingIndex;
                  return (
                    <button
                      key={`badge-${idx}`}
                      onClick={() => handleSelectStroke(idx)}
                      className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                        isCurrent
                          ? 'bg-torii text-white shadow-md scale-110 ring-2 ring-torii/40 font-black'
                          : isDone
                          ? 'bg-torii/15 text-torii border border-torii/30 hover:bg-torii/25'
                          : 'bg-washi border border-washi-border opacity-60 hover:opacity-100'
                      }`}
                      title={`Xem nét thứ ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Bảng điều khiển Hoạt họa (Playback Controls) - LUÔN HIỂN THỊ */}
            <div className="w-full flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-1.5 md:gap-2 flex-wrap justify-center">
                <button
                  onClick={handlePlayAnimation}
                  disabled={loadingStrokes || strokes.length === 0}
                  className="p-2 md:px-3 md:py-2 rounded-xl bg-washi hover:bg-torii/10 border border-washi-border font-bold text-xs active:scale-95 flex items-center gap-1 disabled:opacity-40"
                  title="Vẽ lại từ nét đầu tiên"
                >
                  <span>🔄</span>
                  <span className="hidden sm:inline">Từ đầu</span>
                </button>

                <button
                  onClick={handleStepBack}
                  disabled={loadingStrokes || strokes.length === 0}
                  className="p-2 md:px-3 md:py-2 rounded-xl bg-washi hover:bg-torii/10 border border-washi-border font-bold text-xs active:scale-95 flex items-center gap-1 disabled:opacity-40"
                  title="Nét trước"
                >
                  <span>⏮️</span>
                  <span className="hidden sm:inline">Nét trước</span>
                </button>

                <button
                  onClick={handleTogglePlayPause}
                  disabled={loadingStrokes || strokes.length === 0}
                  className="py-2 px-4 md:px-5 rounded-xl font-bold text-xs md:text-sm text-white shadow-md flex items-center gap-1.5 bg-torii hover:bg-torii-light transition-all active:scale-95 disabled:opacity-40"
                >
                  <span>{isPlaying ? '⏸️ Tạm dừng' : '▶️ Tự động vẽ'}</span>
                </button>

                <button
                  onClick={handleStepForward}
                  disabled={loadingStrokes || strokes.length === 0}
                  className="p-2 md:px-3 md:py-2 rounded-xl bg-washi hover:bg-torii/10 border border-washi-border font-bold text-xs active:scale-95 flex items-center gap-1 disabled:opacity-40"
                  title="Nét sau"
                >
                  <span className="hidden sm:inline">Nét sau</span>
                  <span>⏭️</span>
                </button>

                <button
                  onClick={handleReplayCurrent}
                  disabled={loadingStrokes || strokes.length === 0}
                  className="p-2 md:px-3 md:py-2 rounded-xl bg-washi hover:bg-torii/10 border border-washi-border font-bold text-xs active:scale-95 flex items-center gap-1 disabled:opacity-40"
                  title="Vẽ lại nét hiện tại"
                >
                  <span>🖌️</span>
                  <span className="hidden sm:inline">Vẽ lại nét</span>
                </button>

                <button
                  onClick={handleShowAllStrokes}
                  disabled={loadingStrokes || strokes.length === 0}
                  className={`p-2 md:px-3 md:py-2 rounded-xl border font-bold text-xs active:scale-95 flex items-center gap-1 disabled:opacity-40 ${
                    animatingIndex === -1
                      ? 'bg-torii text-white border-torii'
                      : 'bg-washi border-washi-border hover:bg-torii/10'
                  }`}
                  title="Hiện toàn bộ các nét cùng số thứ tự"
                >
                  <span>👁️</span>
                  <span className="hidden sm:inline">Hiện đủ</span>
                </button>
              </div>

              {/* Tùy chỉnh: Tốc độ, Lặp lại, Ẩn/Hiện số nét */}
              <div className="flex items-center justify-between w-full text-xs opacity-80 px-2 flex-wrap gap-2 pt-1 border-t border-washi-border/70">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-torii">
                    {totalStrokes === 0
                      ? 'Đang chuẩn bị...'
                      : animatingIndex === -1
                      ? `Toàn bộ ${totalStrokes} nét`
                      : `Nét ${animatingIndex + 1} / ${totalStrokes}`}
                  </span>

                  <label className="flex items-center gap-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showNumbers}
                      onChange={(e) => setShowNumbers(e.target.checked)}
                      className="accent-torii w-3.5 h-3.5 rounded"
                    />
                    <span>Hiện số</span>
                  </label>

                  <label className="flex items-center gap-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isLooping}
                      onChange={(e) => setIsLooping(e.target.checked)}
                      className="accent-torii w-3.5 h-3.5 rounded"
                    />
                    <span>Lặp lại</span>
                  </label>
                </div>

                <div className="flex items-center gap-1.5">
                  <span>Tốc độ:</span>
                  {[0.6, 1, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        playWaterDrop();
                        setAnimSpeed(spd);
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-all ${
                        animSpeed === spd
                          ? 'bg-torii text-white border-torii shadow-xs'
                          : 'bg-washi border-washi-border hover:border-torii'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mẹo bút thuận & Chiết tự nhớ chữ */}
            <div className="w-full bg-gradient-to-r from-red-500/10 to-amber-500/10 p-3 rounded-2xl border border-red-500/20 text-xs">
              <div className="font-bold text-torii flex items-center gap-1.5 mb-1">
                <span>💡</span>
                <span>Quy tắc bút thuận (筆順):</span>
              </div>
              <p className="opacity-80 leading-relaxed font-medium">
                {cardInfo?.mnemonic ||
                  'Ngang trước dọc sau, phẩy trước mác sau, từ trên xuống dưới, từ trái qua phải, ngoài trước trong sau rồi mới đóng.'}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: KHUNG TẬP VIẾT THƯ PHÁP (CANVAS DRAWING) */}
        {activeTab === 'draw' && (
          <div className="flex flex-col items-center gap-3 relative z-10">
            {/* Khung vẽ Canvas ô mễ */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-torii/40 touch-none">
              <canvas
                ref={canvasRef}
                width={320}
                height={320}
                className="cursor-crosshair bg-[#fdfbf7] dark:bg-[#1a2230]"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />
            </div>

            {/* Bảng công cụ điều khiển bút vẽ & màu mực */}
            <div className="w-full flex flex-col gap-2.5 bg-washi/70 p-3 rounded-2xl border border-washi-border">
              {/* Chọn màu mực truyền thống */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold opacity-75">Màu mực:</span>
                <div className="flex items-center gap-2">
                  {[
                    { name: 'Mực Tàu (Sumi)', color: '#1f1d1a' },
                    { name: 'Chu Sa (Torii Red)', color: '#b91c1c' },
                    { name: 'Trúc Diệp (Bamboo)', color: '#047857' },
                    { name: 'Kim Hoàng (Gold)', color: '#b45309' },
                  ].map((m) => (
                    <button
                      key={m.color}
                      onClick={() => setBrushColor(m.color)}
                      style={{ backgroundColor: m.color }}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        brushColor === m.color ? 'scale-125 border-white shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                      title={m.name}
                    />
                  ))}
                </div>
              </div>

              {/* Chọn cỡ nét cọ */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold opacity-75">Cỡ nét cọ:</span>
                <div className="flex items-center gap-2">
                  {[
                    { label: 'Mảnh', size: 4 },
                    { label: 'Vừa', size: 7 },
                    { label: 'Đậm', size: 12 },
                  ].map((sz) => (
                    <button
                      key={sz.size}
                      onClick={() => setBrushWidth(sz.size)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                        brushWidth === sz.size
                          ? 'bg-torii text-white border-torii shadow-xs'
                          : 'bg-washi border-washi-border opacity-70'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bật / Tắt chữ mẫu mờ */}
              <div className="flex items-center justify-between pt-1 border-t border-washi-border/60">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={showGhost}
                    onChange={(e) => setShowGhost(e.target.checked)}
                    className="accent-torii w-4 h-4 rounded"
                  />
                  <span>Hiện chữ mẫu mờ để đồ nét</span>
                </label>

                {showGhost && (
                  <div className="flex items-center gap-1.5 text-xs opacity-75">
                    <span>Độ mờ:</span>
                    <input
                      type="range"
                      min="0.1"
                      max="0.5"
                      step="0.05"
                      value={ghostOpacity}
                      onChange={(e) => setGhostOpacity(parseFloat(e.target.value))}
                      className="w-16 accent-torii"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Kết quả chấm điểm nét vẽ AI */}
            {scoreResult && (
              <div className="w-full p-3.5 bg-gradient-to-r from-amber-500/15 via-red-500/15 to-amber-500/15 border-2 border-torii rounded-2xl flex items-center justify-between gap-3 animate-fadeIn shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full border-2 border-torii bg-torii/10 text-torii flex flex-col items-center justify-center font-kanji font-black rotate-[-8deg] shrink-0">
                    <span className="text-xl font-bold leading-none">{scoreResult.score}</span>
                    <span className="text-[9px] uppercase tracking-wider">ĐIỂM</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-torii flex items-center gap-1.5">
                      <span>💮 Con dấu: {scoreResult.hanko}</span>
                    </div>
                    <div className="text-xs opacity-85 mt-0.5 font-medium">
                      {scoreResult.label}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setScoreResult(null)}
                  className="text-xs opacity-50 hover:opacity-100 p-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Các nút hành động: Chấm điểm, Hoàn tác, Xóa hết, Tải ảnh */}
            <div className="w-full flex items-center justify-between gap-2 flex-wrap">
              <button
                onClick={handleEvaluateHandwriting}
                disabled={strokeHistory.length === 0}
                className="w-full sm:w-auto flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white border border-amber-600 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-40"
              >
                <span>💮</span>
                <span>Chấm điểm nét</span>
              </button>

              <button
                onClick={handleUndo}
                disabled={strokeHistory.length === 0}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 ${
                  strokeHistory.length > 0
                    ? 'bg-washi border-washi-border hover:border-torii'
                    : 'opacity-40 cursor-not-allowed bg-washi/50 border-washi-border'
                }`}
              >
                <span>↩️</span>
                <span>Hoàn tác ({strokeHistory.length})</span>
              </button>

              <button
                onClick={handleClear}
                disabled={strokeHistory.length === 0}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 ${
                  strokeHistory.length > 0
                    ? 'bg-washi border-washi-border hover:border-red-500 text-red-700 dark:text-red-400'
                    : 'opacity-40 cursor-not-allowed bg-washi/50 border-washi-border'
                }`}
              >
                <span>🗑️</span>
                <span>Xóa</span>
              </button>

              <button
                onClick={handleDownload}
                className="py-2 px-3 rounded-xl bg-torii hover:bg-torii-light text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95"
                title="Lưu tranh chữ vừa viết về máy"
              >
                <span>💾</span>
                <span>Lưu</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
