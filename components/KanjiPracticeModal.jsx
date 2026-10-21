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

    // 1. Phủ màu nền giấy Washi truyền thống (không để trong suốt)
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDark ? '#161e2e' : '#fcfbf7';
    ctx.fillRect(0, 0, width, height);

    // 2. Viền ngoài trang giấy thư pháp tinh tế
    ctx.save();
    ctx.strokeStyle = isDark ? 'rgba(217, 119, 6, 0.4)' : '#e5dac8';
    ctx.lineWidth = 2;
    ctx.strokeRect(3, 3, width - 6, height - 6);

    // Viền trong đôi mỏng phong cách Nhật Bản
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : '#f0e8dc';
    ctx.lineWidth = 1;
    ctx.strokeRect(7, 7, width - 14, height - 14);

    // 3. Vẽ lưới ô mễ truyền thống (米字格 - Mi Zi Ge)
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = isDark ? 'rgba(217, 119, 6, 0.35)' : '#d5c4aa';
    ctx.lineWidth = 1;

    // Trục chữ thập chính (Cross)
    ctx.beginPath();
    ctx.moveTo(8, height / 2);
    ctx.lineTo(width - 8, height / 2);
    ctx.moveTo(width / 2, 8);
    ctx.lineTo(width / 2, height - 8);
    ctx.stroke();

    // Hai đường chéo phụ (Diagonal)
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e9dfcf';
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.moveTo(12, 12);
    ctx.lineTo(width - 12, height - 12);
    ctx.moveTo(width - 12, 12);
    ctx.lineTo(12, height - 12);
    ctx.stroke();
    ctx.restore();

    // Con dấu chữ nhỏ góc trên: 和紙 • 練習帳 (Sổ luyện viết giấy Washi)
    ctx.save();
    ctx.font = '700 10px serif';
    ctx.fillStyle = isDark ? 'rgba(217, 119, 6, 0.3)' : 'rgba(185, 28, 28, 0.25)';
    ctx.textAlign = 'right';
    ctx.fillText('和紙 • 練習帳', width - 12, 20);
    ctx.restore();

    // 4. Vẽ chữ mẫu mờ (Ghost Kanji) nếu bật
    if (showGhost && currentChar) {
      ctx.save();
      ctx.font = `900 ${Math.round(width * 0.72)}px "Shippori Mincho", "Noto Serif JP", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isDark
        ? `rgba(239, 68, 68, ${ghostOpacity})`
        : `rgba(185, 28, 28, ${ghostOpacity})`;
      ctx.fillText(currentChar, width / 2, height / 2 + 8);
      ctx.restore();
    }

    // 5. Vẽ lại toàn bộ lịch sử các nét đã lưu (bảo tồn nguyên vẹn trên giấy)
    strokeHistory.forEach((stroke) => {
      if (!stroke.points || stroke.points.length === 0) return;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.points.length === 1) {
        ctx.fillStyle = stroke.color;
        ctx.beginPath();
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    });
  }, [showGhost, currentChar, ghostOpacity, strokeHistory]);

  useEffect(() => {
    if (activeTab === 'draw') {
      redrawCanvas();
    }
  }, [redrawCanvas, activeTab]);

  // Reset nét vẽ khi đổi sang Hán tự khác
  useEffect(() => {
    setStrokeHistory([]);
    setScoreResult(null);
  }, [currentChar]);

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
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (_) {}
    setIsDrawing(true);
    const pos = getCanvasCoords(e);
    currentPathRef.current = [pos];

    // Vẽ ngay điểm chấm ban đầu trên canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.fillStyle = brushColor;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, brushWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
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

  const handlePointerUp = (e) => {
    if (!isDrawing) return;
    try {
      if (e?.pointerId && e?.target?.hasPointerCapture?.(e.pointerId)) {
        e.target.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
    setIsDrawing(false);

    // BẢO VỆ DỮ LIỆU: Tạo bản sao mảng điểm trước khi dọn ref
    const pointsToSave = [...currentPathRef.current];
    currentPathRef.current = [];

    if (pointsToSave.length > 0) {
      setStrokeHistory((prev) => [
        ...prev,
        {
          points: pointsToSave,
          color: brushColor,
          width: brushWidth,
        },
      ]);
    }
  };

  const handlePointerLeave = (e) => {
    if (isDrawing && (!e?.target?.hasPointerCapture || !e.target.hasPointerCapture(e.pointerId))) {
      handlePointerUp(e);
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

  // Thuật toán chấm điểm chuẩn hóa 100% toán học (Deterministic - Tuyệt đối không random)
  const handleEvaluateHandwriting = useCallback(() => {
    if (!strokeHistory || strokeHistory.length === 0) return;
    playWoodClapper();

    const W = 80;
    const H = 80;

    // 1. Offscreen Canvas A: Chữ mẫu chuẩn (Template)
    const c1 = document.createElement('canvas');
    c1.width = W;
    c1.height = H;
    const ctx1 = c1.getContext('2d', { willReadFrequently: true });

    let renderedTemplate = false;
    // Vẽ từ vector KanjiVG SVG paths nếu có
    if (strokes && strokes.length > 0 && typeof Path2D !== 'undefined') {
      try {
        ctx1.save();
        ctx1.scale(W / 109, H / 109);
        ctx1.strokeStyle = '#000000';
        ctx1.lineWidth = 9;
        ctx1.lineCap = 'round';
        ctx1.lineJoin = 'round';
        strokes.forEach((s) => {
          if (s.d) {
            ctx1.stroke(new Path2D(s.d));
          }
        });
        ctx1.restore();
        renderedTemplate = true;
      } catch (e) {
        renderedTemplate = false;
      }
    }

    // Nếu không có strokes SVG hoặc lỗi Path2D, vẽ fallback bằng font chữ Nhật
    if (!renderedTemplate && currentChar) {
      ctx1.save();
      ctx1.fillStyle = '#000000';
      ctx1.font = `900 ${Math.round(W * 0.72)}px "Shippori Mincho", "Noto Serif JP", serif`;
      ctx1.textAlign = 'center';
      ctx1.textBaseline = 'middle';
      ctx1.fillText(currentChar, W / 2, H / 2 + 4);
      ctx1.restore();
    }

    // 2. Offscreen Canvas B: Nét vẽ của người dùng (User Strokes)
    const c2 = document.createElement('canvas');
    c2.width = W;
    c2.height = H;
    const ctx2 = c2.getContext('2d', { willReadFrequently: true });

    ctx2.save();
    ctx2.scale(W / 320, H / 320); // Canvas chính là 320x320
    ctx2.lineCap = 'round';
    ctx2.lineJoin = 'round';

    let totalPoints = 0;
    let sumX = 0;
    let sumY = 0;

    strokeHistory.forEach((s) => {
      if (!s.points || s.points.length === 0) return;
      ctx2.strokeStyle = '#000000';
      ctx2.lineWidth = Math.max(s.width || 6, 8);
      if (s.points.length === 1) {
        ctx2.fillStyle = '#000000';
        ctx2.beginPath();
        ctx2.arc(s.points[0].x, s.points[0].y, ctx2.lineWidth / 2, 0, Math.PI * 2);
        ctx2.fill();
        totalPoints += 1;
        sumX += s.points[0].x;
        sumY += s.points[0].y;
      } else {
        ctx2.beginPath();
        ctx2.moveTo(s.points[0].x, s.points[0].y);
        for (let i = 0; i < s.points.length; i++) {
          if (i > 0) ctx2.lineTo(s.points[i].x, s.points[i].y);
          totalPoints += 1;
          sumX += s.points[i].x;
          sumY += s.points[i].y;
        }
        ctx2.stroke();
      }
    });
    ctx2.restore();

    // 3. Phân tích Pixel Overlap & Coverage (80x80 = 6400 pixels)
    const imgData1 = ctx1.getImageData(0, 0, W, H).data;
    const imgData2 = ctx2.getImageData(0, 0, W, H).data;

    let templatePixelCount = 0;
    let userPixelCount = 0;
    let overlapPixelCount = 0;

    for (let i = 3; i < imgData1.length; i += 4) {
      const a1 = imgData1[i] > 30; // Pixel thuộc chữ mẫu
      const a2 = imgData2[i] > 30; // Pixel do người dùng viết

      if (a1) templatePixelCount++;
      if (a2) userPixelCount++;
      if (a1 && a2) overlapPixelCount++;
    }

    if (templatePixelCount === 0) templatePixelCount = 1;
    if (userPixelCount === 0) userPixelCount = 1;

    // Coverage: Tỷ lệ người dùng bao phủ nét chữ mẫu
    const coverage = overlapPixelCount / templatePixelCount;
    // Precision: Tỷ lệ nét viết chuẩn xác, không bị nguệch ngoạc ra ngoài
    const precision = overlapPixelCount / userPixelCount;

    let shapeScore = 0;
    if (coverage + precision > 0) {
      shapeScore = Math.round(((2 * coverage * precision) / (coverage + precision)) * 100);
    }
    // Chuẩn hóa hệ số thực tế cho nét viết tay tự nhiên
    const normalizedShapeScore = Math.min(100, Math.round(shapeScore * 1.35));

    // 4. Stroke Count Accuracy (Độ chuẩn xác số nét viết)
    const expectedStrokes = strokes.length || 1;
    const actualStrokes = strokeHistory.length;
    const strokeDiff = Math.abs(actualStrokes - expectedStrokes);
    let strokeScore = 100;
    if (strokeDiff === 1) strokeScore = 75;
    else if (strokeDiff === 2) strokeScore = 50;
    else if (strokeDiff >= 3) strokeScore = Math.max(15, 100 - strokeDiff * 25);

    // 5. Balance Score (Độ cân đối trọng tâm ô mễ)
    let balanceScore = 90;
    if (totalPoints > 0) {
      const avgX = sumX / totalPoints;
      const avgY = sumY / totalPoints;
      const distFromCenter = Math.hypot(avgX - 160, avgY - 160);
      balanceScore = Math.max(30, Math.min(100, Math.round(100 - (distFromCenter / 160) * 70)));
    }

    // 6. Tổng điểm chuẩn hóa: 100% Deterministic (Không ngẫu nhiên)
    const finalScore = Math.min(
      100,
      Math.max(
        15,
        Math.round(normalizedShapeScore * 0.50 + strokeScore * 0.30 + balanceScore * 0.20)
      )
    );

    let label = 'Nét chữ đạt chuẩn! Hãy chú ý giữ vững độ đều và thứ tự từng nét.';
    let hanko = '優';
    if (finalScore >= 90) {
      label = 'Tuyệt tác thư pháp! Nét bút rất chuẩn xác, thần thái cân đối!';
      hanko = '大変よくできました';
    } else if (finalScore >= 80) {
      label = 'Rất tốt! Dáng chữ đẹp, số nét chuẩn và trọng tâm vững vàng.';
      hanko = '秀';
    } else if (finalScore < 60) {
      label = 'Chưa đạt chuẩn. Hãy bật chữ mẫu mờ để đồ lại đúng dáng nét nhé!';
      hanko = 'がんばろう';
    }

    setScoreResult({
      score: finalScore,
      shapeScore: normalizedShapeScore,
      strokeScore,
      actualStrokes,
      expectedStrokes,
      balanceScore,
      label,
      hanko,
    });

    setTimeout(() => {
      playHankoStamp();
    }, 200);
  }, [strokeHistory, strokes, currentChar]);

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
        className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border-[2.5px] border-stone-900 dark:border-white shadow-manga-xl p-5 md:p-6 flex flex-col gap-4 bg-white dark:bg-stone-900 text-stone-950 dark:text-white relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b-2 border-stone-900 dark:border-white relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl font-kanji font-black text-akira dark:text-red-400 leading-none">{currentChar}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg">{cardInfo?.hanViet || 'HÁN TỰ'}</span>
                <span className="px-2 py-0.5 rounded-lg border-2 border-stone-900 dark:border-white bg-manga-yellow text-stone-950 text-[10px] font-black shadow-2xs">JLPT {currentLevel}</span>
                {totalStrokes > 0 && (
                  <span className="px-2 py-0.5 rounded-lg border-2 border-stone-900 dark:border-white bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-[10px] font-black font-mono shadow-2xs">
                    {totalStrokes} nét bút
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-stone-600 dark:text-stone-300 block truncate max-w-xs mt-0.5">{cardInfo?.meaning}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenRadicalModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenRadicalModal();
                }}
                className="px-2.5 py-1 rounded-xl bg-manga-yellow hover:bg-yellow-300 text-stone-950 border-2 border-stone-900 dark:border-white font-black text-xs transition-all flex items-center gap-1 shadow-2xs active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                title="Xem chiết tự bộ thủ cấu thành (Phím R)"
              >
                <span>🧩</span>
                <span className="hidden sm:inline">Chiết tự</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl border-2 border-stone-900 dark:border-white bg-white dark:bg-stone-800 hover:bg-akira hover:text-white text-stone-900 dark:text-stone-100 font-black text-sm flex items-center justify-center transition-all cursor-pointer shadow-2xs active:translate-x-0.5 active:translate-y-0.5"
              title="Đóng (Phím Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="w-full flex items-center justify-center p-1 rounded-2xl bg-stone-100 dark:bg-stone-800 border-2 border-stone-900 dark:border-white gap-1 relative z-10 shadow-2xs">
          <button
            onClick={() => {
              playWaterDrop();
              setActiveTab('stroke');
              setIsPlaying(true);
              setAnimatingIndex(0);
              setAnimKey((k) => k + 1);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-1.5 border-2 ${
              activeTab === 'stroke'
                ? 'bg-akira text-white border-stone-900 dark:border-white shadow-manga-sm -translate-y-0.5'
                : 'border-transparent text-stone-800 dark:text-stone-200 hover:bg-manga-yellow hover:text-stone-950'
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
            className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-1.5 border-2 ${
              activeTab === 'draw'
                ? 'bg-akira text-white border-stone-900 dark:border-white shadow-manga-sm -translate-y-0.5'
                : 'border-transparent text-stone-800 dark:text-stone-200 hover:bg-manga-yellow hover:text-stone-950'
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
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl bg-white dark:bg-stone-850 border-2 border-stone-900 dark:border-white shadow-manga-sm flex items-center justify-center overflow-hidden">
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
                      className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-black transition-all flex items-center justify-center cursor-pointer border-2 border-stone-900 dark:border-white ${
                        isCurrent
                          ? 'bg-akira text-white shadow-manga-sm -translate-y-0.5'
                          : isDone
                          ? 'bg-manga-yellow text-stone-950 shadow-2xs'
                          : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white opacity-60 hover:opacity-100'
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
                  className="py-1.5 px-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-manga-yellow hover:text-stone-950 text-stone-950 dark:text-white border-2 border-stone-900 dark:border-white font-black text-xs active:translate-x-0.5 active:translate-y-0.5 shadow-2xs flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                  title="Vẽ lại từ nét đầu tiên"
                >
                  <span>🔄</span>
                  <span className="hidden sm:inline">Từ đầu</span>
                </button>

                <button
                  onClick={handleStepBack}
                  disabled={loadingStrokes || strokes.length === 0}
                  className="py-1.5 px-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-manga-yellow hover:text-stone-950 text-stone-950 dark:text-white border-2 border-stone-900 dark:border-white font-black text-xs active:translate-x-0.5 active:translate-y-0.5 shadow-2xs flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                  title="Nét trước"
                >
                  <span>⏮️</span>
                  <span className="hidden sm:inline">Nét trước</span>
                </button>

                <button
                  onClick={handleTogglePlayPause}
                  disabled={loadingStrokes || strokes.length === 0}
                  className="py-2 px-4 md:px-5 rounded-xl font-black text-xs md:text-sm text-white shadow-manga-sm flex items-center gap-1.5 bg-akira hover:bg-red-600 border-2 border-stone-900 dark:border-white transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-40"
                >
                  <span>{isPlaying ? '⏸️ Tạm dừng' : '▶️ Tự động vẽ'}</span>
                </button>

                <button
                  onClick={handleStepForward}
                  disabled={loadingStrokes || strokes.length === 0}
                  className="py-1.5 px-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-manga-yellow hover:text-stone-950 text-stone-950 dark:text-white border-2 border-stone-900 dark:border-white font-black text-xs active:translate-x-0.5 active:translate-y-0.5 shadow-2xs flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                  title="Nét sau"
                >
                  <span className="hidden sm:inline">Nét sau</span>
                  <span>⏭️</span>
                </button>

                <button
                  onClick={handleReplayCurrent}
                  disabled={loadingStrokes || strokes.length === 0}
                  className="py-1.5 px-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-manga-yellow hover:text-stone-950 text-stone-950 dark:text-white border-2 border-stone-900 dark:border-white font-black text-xs active:translate-x-0.5 active:translate-y-0.5 shadow-2xs flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                  title="Vẽ lại nét hiện tại"
                >
                  <span>🖌️</span>
                  <span className="hidden sm:inline">Vẽ lại nét</span>
                </button>

                <button
                  onClick={handleShowAllStrokes}
                  disabled={loadingStrokes || strokes.length === 0}
                  className={`py-1.5 px-2.5 rounded-xl border-2 border-stone-900 dark:border-white font-black text-xs active:translate-x-0.5 active:translate-y-0.5 shadow-2xs flex items-center gap-1 cursor-pointer disabled:opacity-40 ${
                    animatingIndex === -1
                      ? 'bg-akira text-white'
                      : 'bg-white dark:bg-stone-800 text-stone-950 dark:text-white hover:bg-manga-yellow hover:text-stone-950'
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
            {/* Thanh trạng thái bảo tồn nét trên giấy Washi */}
            <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">📜</span>
                <div>
                  <div className="font-bold text-torii flex items-center gap-1.5">
                    <span>Giấy Washi • {strokeHistory.length} / {totalStrokes || 1} nét đã lưu</span>
                  </div>
                  <p className="text-[11px] opacity-75">
                    {strokeHistory.length === 0
                      ? `Cầm bút viết từng nét của chữ ${currentChar} lên giấy trước khi chấm điểm`
                      : strokeHistory.length === totalStrokes
                      ? 'Đã viết đủ số nét chuẩn! Nét đã lưu trên giấy, sẵn sàng chấm điểm.'
                      : `Đã lưu ${strokeHistory.length} nét trên giấy. Hãy viết tiếp hoặc bấm Chấm điểm.`}
                  </p>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${
                  strokeHistory.length >= (totalStrokes || 1)
                    ? 'bg-emerald-600 text-white'
                    : strokeHistory.length > 0
                    ? 'bg-amber-600 text-white'
                    : 'bg-washi-border/60 text-foreground/60'
                }`}
              >
                {strokeHistory.length === 0 ? 'Chưa vẽ' : `${strokeHistory.length} nét`}
              </span>
            </div>

            {/* Khung vẽ Canvas ô mễ - Giấy Washi chuẩn mực */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#c5a880]/60 dark:border-torii/40 touch-none bg-[#fcfbf7] dark:bg-[#161e2e]">
              <canvas
                ref={canvasRef}
                width={320}
                height={320}
                className="cursor-crosshair block"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
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

            {/* Kết quả chấm điểm nét vẽ toán học chuẩn xác 100% */}
            {scoreResult && (
              <div className="w-full p-4 bg-gradient-to-br from-amber-500/10 via-red-500/10 to-amber-500/10 border-2 border-torii rounded-2xl flex flex-col gap-3 animate-fadeIn shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Con dấu tròn Hanko đỏ */}
                    <div className="w-16 h-16 rounded-full border-2 border-red-600 bg-red-600/10 text-red-600 dark:text-red-400 flex flex-col items-center justify-center font-kanji font-black rotate-[-6deg] shrink-0 shadow-inner">
                      <span className="text-2xl font-bold leading-none">{scoreResult.score}</span>
                      <span className="text-[9px] uppercase tracking-wider font-sans font-bold">ĐIỂM</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-torii flex items-center gap-1.5">
                        <span>💮 Con dấu:</span>
                        <span className="font-kanji text-sm font-black px-1.5 py-0.5 rounded bg-red-600/15 text-red-700 dark:text-red-300 border border-red-500/30">
                          {scoreResult.hanko}
                        </span>
                      </div>
                      <div className="text-xs font-medium opacity-90 mt-1 leading-snug">
                        {scoreResult.label}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setScoreResult(null)}
                    className="text-xs opacity-50 hover:opacity-100 p-1 rounded-md hover:bg-black/5"
                    title="Đóng kết quả"
                  >
                    ✕
                  </button>
                </div>

                {/* Chi tiết 3 tiêu chí chấm chuẩn hóa */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-torii/20 text-center">
                  <div className="p-2 rounded-xl bg-washi/80 border border-washi-border flex flex-col">
                    <span className="text-[10px] opacity-70 font-semibold">Khớp hình dáng</span>
                    <span className="text-xs font-black text-torii mt-0.5">{scoreResult.shapeScore}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-washi/80 border border-washi-border flex flex-col">
                    <span className="text-[10px] opacity-70 font-semibold">Số lượng nét</span>
                    <span className="text-xs font-black text-torii mt-0.5">
                      {scoreResult.actualStrokes}/{scoreResult.expectedStrokes} nét
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-washi/80 border border-washi-border flex flex-col">
                    <span className="text-[10px] opacity-70 font-semibold">Độ cân đối</span>
                    <span className="text-xs font-black text-torii mt-0.5">{scoreResult.balanceScore}%</span>
                  </div>
                </div>

                <div className="text-[10px] text-center opacity-65 italic">
                  ✓ Chấm điểm toán học chuẩn xác theo hình học nét vẽ thực tế (kết quả cố định 100%, không ngẫu nhiên).
                </div>
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
