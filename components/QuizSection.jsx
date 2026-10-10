'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { playJapaneseSpeech, getLocalKanjiInfo, loadQuizDatabase } from '../lib/kanjiService';
import {
  playQuizSuccess,
  playQuizError,
  playWaterDrop,
  playWoodClapper,
  playTaikoDrum,
  playHankoStamp,
} from '../lib/traditionalAudio';
import EnsoCircle from './EnsoCircle';
import { VolumeIcon } from './ZenIcons';

const SPEEDRUN_DURATION = 60; // 60 giây
const HIGH_SCORE_KEY = 'project_kanji_speedrun_highscore_v1';

// Danh sách các bộ lọc dạng câu hỏi
const QUIZ_FILTER_TYPES = [
  { id: 'all', label: '🎲 Tất cả dạng' },
  { id: 'vocab_reading', label: '📖 Đọc từ vựng' },
  { id: 'vocab_meaning', label: '💡 Nghĩa từ vựng' },
  { id: 'sentence_fill', label: '✍️ Điền câu ví dụ' },
  { id: 'sentence_reading', label: '🔍 Đọc từ trong câu' },
  { id: 'kanji_from_reading', label: '🎯 Viết chữ Hán' },
  { id: 'kanji_hanviet', label: '🈳 Hán tự & Hán Việt' },
];

export default function QuizSection({
  currentLevel = 'N5',
  kanjiList = [],
  onFailKanji,
  fullDb = null,
}) {
  // Kho dữ liệu Quiz nạp từ public/quiz_data.json
  const [quizDatabase, setQuizDatabase] = useState(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(true);

  // Cấp độ Quiz đang chọn: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
  const [selectedLevel, setSelectedLevel] = useState(currentLevel || 'N5');

  // Game Mode: 'zen' (Luyện tập thong thả) | 'speedrun' (Thử thách 60s)
  const [gameMode, setGameMode] = useState('zen');

  // Question Filter
  const [filterType, setFilterType] = useState('all');

  // Length Mode: 'all' | '100' | '50' | '20'
  const [lengthMode, setLengthMode] = useState('all');

  // Current Question Index in Zen mode
  const [currentIndex, setCurrentIndex] = useState(0);

  // User answers map: { [questionId]: { selectedIndex, isCorrect } }
  const [userAnswers, setUserAnswers] = useState({});

  // Streak & Stats
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Speedrun stats
  const [timeLeft, setTimeLeft] = useState(SPEEDRUN_DURATION);
  const [isSpeedrunActive, setIsSpeedrunActive] = useState(false);
  const [isSpeedrunFinished, setIsSpeedrunFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showHankoStamp, setShowHankoStamp] = useState(false);
  const [hankoText, setHankoText] = useState('合格');

  // Speedrun current question
  const [speedrunQuestion, setSpeedrunQuestion] = useState(null);

  const timerRef = useRef(null);

  // 1. Nạp kho dữ liệu Quiz 1,100 câu
  useEffect(() => {
    let isMounted = true;
    loadQuizDatabase()
      .then((data) => {
        if (isMounted) {
          setQuizDatabase(data);
          setIsLoadingQuiz(false);
        }
      })
      .catch((err) => {
        console.warn('Lỗi nạp quiz_data.json:', err);
        if (isMounted) setIsLoadingQuiz(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Đồng bộ cấp độ khi prop currentLevel thay đổi
  useEffect(() => {
    if (currentLevel) {
      setSelectedLevel(currentLevel);
    }
  }, [currentLevel]);

  // Load High Score on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    }
  }, []);

  // 2. Danh sách câu hỏi theo bộ lọc
  const activeQuestions = useMemo(() => {
    if (!quizDatabase || !quizDatabase[selectedLevel]) {
      return [];
    }

    let list = quizDatabase[selectedLevel];

    // Lọc theo dạng câu hỏi
    if (filterType !== 'all') {
      const filtered = list.filter((q) => q.type === filterType);
      list = filtered.length > 0 ? filtered : list;
    }

    // Lọc theo độ dài
    if (lengthMode === '100' && list.length > 100) {
      list = list.slice(0, 100);
    } else if (lengthMode === '50' && list.length > 50) {
      list = list.slice(0, 50);
    } else if (lengthMode === '20' && list.length > 20) {
      list = list.slice(0, 20);
    }

    return list;
  }, [quizDatabase, selectedLevel, filterType, lengthMode]);

  // Reset index & câu trả lời khi đổi level hoặc filter
  useEffect(() => {
    setCurrentIndex(0);
    setUserAnswers({});
    setStreak(0);
  }, [selectedLevel, filterType, lengthMode]);

  // Câu hỏi hiện tại trong Zen mode
  const currentItem = activeQuestions[currentIndex] || null;
  const currentAnswer = currentItem ? userAnswers[currentItem.id] : null;
  const isAnswered = !!currentAnswer;

  // Thống kê điểm số Zen mode
  const totalCorrect = useMemo(() => {
    return Object.values(userAnswers).filter((a) => a.isCorrect).length;
  }, [userAnswers]);

  const totalWrong = useMemo(() => {
    return Object.values(userAnswers).filter((a) => !a.isCorrect).length;
  }, [userAnswers]);

  // 3. Countdown timer for Speedrun
  useEffect(() => {
    if (gameMode === 'speedrun' && isSpeedrunActive && !isSpeedrunFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishSpeedrun();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameMode, isSpeedrunActive, isSpeedrunFinished]);

  // Kết thúc Speedrun
  const finishSpeedrun = useCallback(() => {
    setIsSpeedrunActive(false);
    setIsSpeedrunFinished(true);
    playTaikoDrum();
    setTimeout(() => {
      playHankoStamp();
      setShowHankoStamp(true);
    }, 400);

    setScore((currentScore) => {
      if (typeof window !== 'undefined') {
        const saved = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10);
        if (currentScore > saved) {
          localStorage.setItem(HIGH_SCORE_KEY, currentScore.toString());
          setHighScore(currentScore);
        }
      }
      return currentScore;
    });
  }, []);

  // Rút một câu hỏi ngẫu nhiên cho Speedrun
  const pickSpeedrunQuestion = useCallback(() => {
    if (!activeQuestions.length) return;
    const rand = activeQuestions[Math.floor(Math.random() * activeQuestions.length)];
    setSpeedrunQuestion(rand);
  }, [activeQuestions]);

  // Bắt đầu Speedrun
  const startSpeedrun = () => {
    playTaikoDrum();
    setTimeLeft(SPEEDRUN_DURATION);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setComboMultiplier(1);
    setCorrectCount(0);
    setTotalAttempted(0);
    setIsSpeedrunFinished(false);
    setShowHankoStamp(false);
    setIsSpeedrunActive(true);
    pickSpeedrunQuestion();
  };

  // 4. Xử lý khi người dùng chọn đáp án
  const handleSelectOption = (optIndex) => {
    if (gameMode === 'speedrun') {
      if (!isSpeedrunActive || isSpeedrunFinished || !speedrunQuestion) return;

      const isCorrect = optIndex === speedrunQuestion.correctIndex;
      setTotalAttempted((prev) => prev + 1);

      if (isCorrect) {
        playQuizSuccess();
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        if (nextStreak > maxStreak) setMaxStreak(nextStreak);

        const newMultiplier = nextStreak >= 10 ? 4 : nextStreak >= 5 ? 3 : nextStreak >= 3 ? 2 : 1;
        setComboMultiplier(newMultiplier);
        setScore((prev) => prev + 100 * newMultiplier);
        setCorrectCount((prev) => prev + 1);
      } else {
        playQuizError();
        setStreak(0);
        setComboMultiplier(1);
        if (speedrunQuestion.kanji && onFailKanji) {
          onFailKanji(speedrunQuestion.kanji);
        }
      }

      pickSpeedrunQuestion();
      return;
    }

    // Zen Mode
    if (isAnswered || !currentItem) return;

    const isCorrect = optIndex === currentItem.correctIndex;

    setUserAnswers((prev) => ({
      ...prev,
      [currentItem.id]: {
        selectedIndex: optIndex,
        isCorrect,
      },
    }));

    if (isCorrect) {
      playQuizSuccess();
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
    } else {
      playQuizError();
      setStreak(0);
      if (currentItem.kanji && onFailKanji) {
        onFailKanji(currentItem.kanji);
      }
    }
  };

  // Chuyển sang câu tiếp theo
  const handleNextQuestion = () => {
    playWoodClapper();
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Quay lại câu trước
  const handlePrevQuestion = () => {
    playWoodClapper();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard shortcuts (Phím 1, 2, 3, 4 chọn đáp án; Space / Enter sang câu tiếp)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        const idx = parseInt(e.key, 10) - 1;
        handleSelectOption(idx);
      } else if (isAnswered && gameMode === 'zen') {
        if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          if (currentIndex < activeQuestions.length - 1) {
            handleNextQuestion();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentIndex, activeQuestions.length, gameMode, speedrunQuestion, currentItem]);

  // Câu hỏi đang hiển thị (Zen vs Speedrun)
  const displayItem = gameMode === 'speedrun' ? speedrunQuestion : currentItem;

  // Tổng số câu của từng level trong database
  const levelCounts = useMemo(() => {
    if (!quizDatabase) return { N5: 160, N4: 160, N3: 160, N2: 260, N1: 360 };
    return {
      N5: quizDatabase.N5?.length || 160,
      N4: quizDatabase.N4?.length || 160,
      N3: quizDatabase.N3?.length || 160,
      N2: quizDatabase.N2?.length || 260,
      N1: quizDatabase.N1?.length || 360,
    };
  }, [quizDatabase]);

  const progressPercent = activeQuestions.length > 0
    ? Math.round(((currentIndex + 1) / activeQuestions.length) * 100)
    : 0;

  return (
    <section className="w-full max-w-2xl flex flex-col items-center gap-4 z-20">
      {/* 1. Thanh chọn Cấp độ Quiz (N5 - N1) */}
      <div className="w-full flex justify-between items-center bg-washi-light p-1.5 rounded-2xl border border-washi-border shadow-xs">
        <div className="flex items-center gap-1 w-full justify-between">
          {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => {
            const isSelected = selectedLevel === lvl;
            const count = levelCounts[lvl];
            return (
              <button
                key={lvl}
                onClick={() => {
                  playWaterDrop();
                  setSelectedLevel(lvl);
                }}
                className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center ${
                  isSelected
                    ? 'bg-torii text-white shadow-sm font-black scale-[1.02]'
                    : 'opacity-70 hover:opacity-100 hover:bg-torii/10 text-color-sumi'
                }`}
              >
                <span>{lvl}</span>{' '}
                <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'opacity-60'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Thanh chế độ (Zen vs Speedrun) & Bộ chọn độ dài đề */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-washi/80 p-2 rounded-2xl border border-washi-border shadow-xs">
        {/* Game Mode Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => {
              playWaterDrop();
              setGameMode('zen');
              setIsSpeedrunActive(false);
              setIsSpeedrunFinished(false);
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              gameMode === 'zen'
                ? 'bg-torii text-white shadow-xs'
                : 'text-color-sumi/70 hover:text-torii hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <span>🎯</span>
            <span>Luyện Tập Zen</span>
          </button>

          <button
            onClick={() => {
              playWaterDrop();
              setGameMode('speedrun');
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              gameMode === 'speedrun'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-color-sumi/70 hover:text-amber-600 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <span>⚡</span>
            <span>Thử Thách 60s</span>
          </button>
        </div>

        {/* Chọn số lượng câu */}
        {gameMode === 'zen' && (
          <div className="flex items-center gap-1 text-[11px] font-bold self-start sm:self-center">
            <span className="opacity-60 text-[10px] mr-1 hidden sm:inline">Số câu:</span>
            {[
              { id: 'all', label: `Trọn bộ (${activeQuestions.length})` },
              { id: '100', label: '100 câu' },
              { id: '50', label: '50 câu' },
              { id: '20', label: '20 câu' },
            ].map((len) => (
              <button
                key={len.id}
                onClick={() => {
                  playWaterDrop();
                  setLengthMode(len.id);
                }}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  lengthMode === len.id
                    ? 'bg-torii text-white shadow-2xs font-extrabold'
                    : 'bg-washi/60 border border-washi-border hover:bg-washi opacity-75'
                }`}
              >
                {len.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Thanh lọc dạng câu hỏi (6 dạng JLPT) */}
      {gameMode === 'zen' && (
        <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {QUIZ_FILTER_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                playWaterDrop();
                setFilterType(t.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterType === t.id
                  ? 'border border-torii bg-torii text-white font-bold shadow-xs'
                  : 'border border-washi-border bg-washi hover:bg-washi-dark text-color-sumi/70'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* 4. Thẻ bài Karuta trắc nghiệm chính */}
      <div className="w-full karuta-card rounded-3xl border-2 border-border-strong p-4 sm:p-6 shadow-xl flex flex-col relative overflow-hidden backdrop-blur-xs">
        <div className="karuta-inner-border" />

        {/* A. Speedrun Start Screen */}
        {gameMode === 'speedrun' && !isSpeedrunActive && !isSpeedrunFinished ? (
          <div className="py-12 flex flex-col items-center text-center relative z-10">
            <span className="text-6xl mb-3 animate-bounce">⚡</span>
            <h3 className="text-2xl font-black font-kanji text-amber-600 mb-1">
              SAMURAI SPEEDRUN 60 GIÂY
            </h3>
            <p className="text-xs sm:text-sm opacity-75 max-w-md mb-6 leading-relaxed">
              Thử thách phản xạ kiếm đạo với kho {levelCounts[selectedLevel]} câu trắc nghiệm JLPT {selectedLevel}.
              Trả lời đúng liên tục để kích hoạt nhân điểm Combo x2, x3, x4!
            </p>

            {highScore > 0 && (
              <div className="mb-6 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs font-bold flex items-center gap-2">
                <span>🏆 Kỷ lục của bạn:</span>
                <span className="font-kanji font-black text-sm">{highScore} điểm</span>
              </div>
            )}

            <button
              onClick={startSpeedrun}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-torii hover:from-amber-500 hover:to-torii-light text-white font-extrabold rounded-2xl text-sm sm:text-base shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>⚔️</span>
              <span>BẮT ĐẦU THỬ THÁCH (60 GIÂY)</span>
            </button>
          </div>
        ) : gameMode === 'speedrun' && isSpeedrunFinished ? (
          /* B. Speedrun Result Screen */
          <div className="py-8 flex flex-col items-center text-center relative z-10 animate-fadeIn">
            {showHankoStamp && (
              <div className="w-24 h-24 rounded-full border-4 border-torii flex flex-col items-center justify-center text-torii font-kanji font-black text-xl rotate-[-12deg] mb-3 animate-stamp shadow-md">
                <span>{score >= 1000 ? '合格' : '努力'}</span>
                <span className="text-[9px] tracking-widest uppercase font-sans">JLPT HANKO</span>
              </div>
            )}

            <h3 className="text-2xl font-black font-kanji text-torii mb-1">
              HẾT THỜI GIAN!
            </h3>
            <p className="text-xs opacity-75 mb-4">
              Bạn đã hoàn thành lượt chạy tốc độ Samurai Speedrun
            </p>

            <div className="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-6">
              <div className="bg-washi/80 p-3 rounded-2xl border border-washi-border flex flex-col items-center">
                <span className="text-xs opacity-70">Điểm số</span>
                <span className="text-xl font-black font-kanji text-torii mt-0.5">{score}</span>
              </div>
              <div className="bg-washi/80 p-3 rounded-2xl border border-washi-border flex flex-col items-center">
                <span className="text-xs opacity-70">Số câu đúng</span>
                <span className="text-xl font-black font-kanji text-emerald-600 mt-0.5">
                  {correctCount}/{totalAttempted}
                </span>
              </div>
              <div className="bg-washi/80 p-3 rounded-2xl border border-washi-border flex flex-col items-center">
                <span className="text-xs opacity-70">Chuỗi cao nhất</span>
                <span className="text-xl font-black font-kanji text-amber-600 mt-0.5">
                  {maxStreak} 🔥
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={startSpeedrun}
                className="px-6 py-2.5 bg-torii hover:bg-torii-light text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Chơi lại ⚡
              </button>
              <button
                onClick={() => {
                  setGameMode('zen');
                  setIsSpeedrunActive(false);
                  setIsSpeedrunFinished(false);
                }}
                className="px-5 py-2.5 karuta-card border border-washi-border font-bold rounded-xl text-xs sm:text-sm opacity-80 hover:opacity-100 transition-all cursor-pointer"
              >
                Về Luyện tập Zen
              </button>
            </div>
          </div>
        ) : !displayItem ? (
          /* C. Empty or Loading */
          <div className="py-12 text-center opacity-70 text-sm font-kanji relative z-10">
            {isLoadingQuiz ? 'Đang nạp 1,100 câu hỏi trắc nghiệm JLPT...' : 'Chưa có câu hỏi cho bộ lọc này.'}
          </div>
        ) : (
          /* D. Standard Question Display */
          <>
            {/* Top Bar: Badges, Counter & Score */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-torii text-white font-black text-xs">
                  JLPT {displayItem.level || selectedLevel}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-washi border border-washi-border font-bold text-[11px] opacity-80">
                  {displayItem.typeBadge || displayItem.typeName || 'Trắc nghiệm'}
                </span>
              </div>

              {gameMode === 'speedrun' ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    ⏱ {timeLeft}s
                  </span>
                  <span className="text-xs font-black text-torii font-kanji">
                    {score} điểm (x{comboMultiplier})
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 text-xs font-bold">
                  <span className="text-torii font-extrabold font-kanji">
                    Câu {currentIndex + 1} / {activeQuestions.length}
                  </span>
                  <span className="text-emerald-600">✓ {totalCorrect}</span>
                  <span className="text-rose-600">✕ {totalWrong}</span>
                  {streak > 0 && <span className="text-amber-500">🔥 {streak}</span>}
                </div>
              )}
            </div>

            {/* Progress Bar (Zen mode) */}
            {gameMode === 'zen' && (
              <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden mt-2 relative z-10">
                <div
                  className="h-full bg-torii transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}

            {/* Question Header & Context */}
            <div className="w-full py-3 relative z-10 flex flex-col items-center text-center">
              <EnsoCircle />

              <h4 className="font-kanji font-bold text-sm sm:text-base text-color-sumi leading-relaxed max-w-lg">
                {displayItem.question}
              </h4>

              {/* Ngữ cảnh / Câu ví dụ (chỗ trống [ ? ]) */}
              {displayItem.context && displayItem.context.trim() && (
                <div className="w-full mt-3 p-3.5 bg-washi/90 rounded-2xl border border-washi-border text-left shadow-2xs">
                  <div
                    className="font-kanji text-sm sm:text-base font-semibold leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: displayItem.context.replace(
                        '[ ? ]',
                        '<span class="px-2.5 py-0.5 bg-torii/15 text-torii rounded-lg border border-torii/40 font-black inline-block mx-1 shadow-2xs">[ ? ]</span>'
                      ),
                    }}
                  />
                  {displayItem.contextTrans && (
                    <div className="text-xs opacity-75 italic mt-1 font-medium">
                      💬 {displayItem.contextTrans}
                    </div>
                  )}
                </div>
              )}

              {/* Chữ Kanji / Từ vựng mục tiêu nổi bật (nếu có và không phải dạng điền câu) */}
              {displayItem.type !== 'sentence_fill' && (displayItem.word || displayItem.kanji) && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-3xl sm:text-4xl font-kanji font-black text-torii drop-shadow-2xs">
                    {displayItem.word || displayItem.kanji}
                  </span>
                  <button
                    onClick={() => {
                      playWaterDrop();
                      playJapaneseSpeech(displayItem.ttsText || displayItem.word || displayItem.kanji);
                    }}
                    className="p-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 transition-all cursor-pointer flex items-center justify-center"
                    title="Nghe phát âm"
                  >
                    <VolumeIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* 4 Lựa chọn Multiple Choice A, B, C, D */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2 relative z-10">
              {displayItem.options &&
                displayItem.options.map((optText, optIdx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const keyLetter = letters[optIdx];
                  const keyNum = optIdx + 1;

                  let btnStyle = 'bg-washi border-washi-border hover:border-torii/60 hover:-translate-y-0.5';

                  if (isAnswered && gameMode === 'zen') {
                    if (optIdx === displayItem.correctIndex) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30';
                    } else if (currentAnswer && currentAnswer.selectedIndex === optIdx && !currentAnswer.isCorrect) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-950 dark:text-rose-200 font-bold ring-2 ring-rose-500/30';
                    } else {
                      btnStyle = 'bg-washi/50 border-washi-border opacity-50';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered && gameMode === 'zen'}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-3 sm:p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 select-none cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/10 text-[11px] font-black flex items-center justify-center font-mono shrink-0">
                          {keyLetter}
                        </span>
                        <span className="font-kanji font-bold text-xs sm:text-sm leading-snug truncate">
                          {optText}
                        </span>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 ml-2">
                        {isAnswered && gameMode === 'zen' && (
                          <>
                            {optIdx === displayItem.correctIndex && (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black">
                                ✓ ĐÚNG
                              </span>
                            )}
                            {currentAnswer && currentAnswer.selectedIndex === optIdx && !currentAnswer.isCorrect && (
                              <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black">
                                ✕ BẠN CHỌN
                              </span>
                            )}
                          </>
                        )}
                        {!isAnswered && (
                          <span className="text-[10px] opacity-40 font-mono">[{keyNum}]</span>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>

            {/* Feedback & Detailed Explanation Box (Zen Mode) */}
            {isAnswered && gameMode === 'zen' && currentAnswer && (
              <div
                className={`w-full mt-4 p-4 rounded-2xl border text-xs sm:text-sm animate-fadeIn relative z-10 text-left ${
                  currentAnswer.isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="font-bold flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span>{currentAnswer.isCorrect ? '🎉 Tuyệt vời! Bạn đã chọn chính xác!' : '😢 Chưa chính xác!'}</span>
                    {!currentAnswer.isCorrect && (
                      <span className="text-[11px] font-normal text-torii">
                        (Đã lưu vào Sổ tay để ôn lại)
                      </span>
                    )}
                  </div>
                  {displayItem.ttsText && (
                    <button
                      onClick={() => {
                        playWaterDrop();
                        playJapaneseSpeech(displayItem.ttsText);
                      }}
                      className="text-xs font-bold underline flex items-center gap-1 opacity-80 hover:opacity-100"
                    >
                      <VolumeIcon className="w-3.5 h-3.5" /> Nghe phát âm
                    </button>
                  )}
                </div>

                {/* Explanation text from database */}
                {displayItem.explanation && (
                  <div className="pt-2 border-t border-washi-border/40 leading-relaxed text-xs opacity-90">
                    <span dangerouslySetInnerHTML={{ __html: displayItem.explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons: Trước / Tiếp theo / Làm lại */}
            {gameMode === 'zen' && (
              <div className="w-full mt-4 pt-3 border-t border-washi-border flex items-center justify-between relative z-10">
                <button
                  disabled={currentIndex === 0}
                  onClick={handlePrevQuestion}
                  className="px-4 py-2 rounded-xl bg-washi border border-washi-border font-bold text-xs opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  ← Câu trước
                </button>

                <button
                  onClick={() => {
                    playWoodClapper();
                    setUserAnswers({});
                    setStreak(0);
                  }}
                  className="px-3 py-1.5 rounded-xl text-[11px] opacity-60 hover:opacity-100 transition-all cursor-pointer"
                  title="Làm lại từ đầu bộ đề này"
                >
                  🔄 Làm lại bộ đề
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={currentIndex >= activeQuestions.length - 1}
                  className="px-5 py-2 rounded-xl bg-torii hover:bg-torii-light text-white font-bold text-xs shadow-sm transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
                >
                  <span>Câu tiếp theo</span>
                  <span>→</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Hints footer */}
      <div className="text-[11px] opacity-60 text-center font-medium">
        Bấm phím số <kbd className="px-1 py-0.5 bg-black/5 dark:bg-white/10 rounded font-mono">1</kbd>{' '}
        <kbd className="px-1 py-0.5 bg-black/5 dark:bg-white/10 rounded font-mono">2</kbd>{' '}
        <kbd className="px-1 py-0.5 bg-black/5 dark:bg-white/10 rounded font-mono">3</kbd>{' '}
        <kbd className="px-1 py-0.5 bg-black/5 dark:bg-white/10 rounded font-mono">4</kbd> để chọn nhanh đáp án • Nhấn [Enter/Space] để sang câu kế tiếp
      </div>
    </section>
  );
}
