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
    <section className="w-full max-w-[1020px] 2xl:max-w-6xl h-full min-h-0 flex-1 flex flex-col items-center justify-between gap-1 sm:gap-1.5 z-20 select-none overflow-hidden">
      {/* 1. Sleek Consolidated Kyoto Control Deck */}
      <div className="w-full flex flex-col gap-1 p-1 sm:p-1.5 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700/80 shadow-md backdrop-blur-md shrink-0">
        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-1">
          {/* Level Tabs */}
          <div className="flex items-center gap-1 shrink-0">
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
                  className={`py-1 px-2 sm:px-2.5 rounded-xl text-xs font-bold transition-all text-center relative flex items-center gap-1 shrink-0 border cursor-pointer ${
                    isSelected
                      ? 'bg-torii text-white border-[#9B0024] shadow-xs font-black'
                      : 'bg-[#F5EFE6] dark:bg-[#1E2633] text-stone-700 dark:text-stone-300 border-[#E3DACB] dark:border-stone-700 hover:bg-[#EAE1D2] dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{lvl}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-stone-500 dark:text-stone-400 font-medium'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mode Switch & Question Counts */}
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            {/* Game Mode Tabs */}
            <div className="flex items-center p-0.5 rounded-xl bg-[#F5EFE6] dark:bg-[#1E2633] border border-[#E3DACB] dark:border-stone-700 text-xs font-bold gap-0.5">
              <button
                onClick={() => {
                  playWaterDrop();
                  setGameMode('zen');
                  setIsSpeedrunActive(false);
                  setIsSpeedrunFinished(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  gameMode === 'zen'
                    ? 'bg-torii text-white shadow-2xs font-black'
                    : 'text-stone-700 dark:text-stone-300 hover:text-torii'
                }`}
              >
                <span>🎯 Luyện Zen</span>
              </button>
              <button
                onClick={() => {
                  playWaterDrop();
                  setGameMode('speedrun');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  gameMode === 'speedrun'
                    ? 'bg-amber-600 text-white shadow-2xs font-black'
                    : 'text-stone-700 dark:text-stone-300 hover:text-amber-600'
                }`}
              >
                <span>⚡ 60s Speed</span>
              </button>
            </div>

            {/* Length selector in Zen mode */}
            {gameMode === 'zen' && (
              <div className="hidden md:flex items-center gap-0.5 text-[11px] font-bold">
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
                    className={`px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                      lengthMode === len.id
                        ? 'bg-torii text-white border-torii font-extrabold shadow-2xs'
                        : 'bg-[#F5EFE6] dark:bg-[#1E2633] text-stone-600 dark:text-stone-400 border-[#E3DACB] dark:border-stone-700 hover:text-stone-900'
                    }`}
                  >
                    {len.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Question Type Filters (Single Line Scroll) */}
        {gameMode === 'zen' && (
          <div className="w-full flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar border-t border-[#ebdccb]/60 dark:border-stone-700/60">
            {QUIZ_FILTER_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  playWaterDrop();
                  setFilterType(t.id);
                }}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                  filterType === t.id
                    ? 'border-torii bg-torii text-white font-bold shadow-2xs'
                    : 'border-[#E3DACB] dark:border-stone-700 bg-[#F5EFE6]/80 dark:bg-[#1E2633]/80 hover:bg-[#EAE1D2] text-stone-700 dark:text-stone-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Main Studio Karuta Card */}
      <div className="w-full flex-1 min-h-0 karuta-card rounded-2xl sm:rounded-3xl border border-[#D8CEBF] dark:border-stone-700/80 bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 shadow-md p-2.5 sm:p-4 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
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
            <div className="w-full flex items-center justify-between pb-1 border-b border-washi-border/60 relative z-10 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-torii text-white font-black text-[11px]">
                  JLPT {displayItem.level || selectedLevel}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#F5EFE6] dark:bg-stone-800 border border-washi-border font-bold text-[10px] opacity-80">
                  {displayItem.typeBadge || displayItem.typeName || 'Trắc nghiệm'}
                </span>
              </div>

              {gameMode === 'speedrun' ? (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                    ⏱ {timeLeft}s
                  </span>
                  <span className="text-xs font-black text-torii font-kanji">
                    {score} điểm (x{comboMultiplier})
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-torii font-extrabold font-kanji">
                    Câu {currentIndex + 1} / {activeQuestions.length}
                  </span>
                  <span className="text-emerald-600 text-[11px]">✓ {totalCorrect}</span>
                  <span className="text-rose-600 text-[11px]">✕ {totalWrong}</span>
                  {streak > 0 && <span className="text-amber-500 text-[11px]">🔥 {streak}</span>}
                </div>
              )}
            </div>

            {/* Progress Bar (Zen mode) */}
            {gameMode === 'zen' && (
              <div className="w-full h-1 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden mt-1 shrink-0 relative z-10">
                <div
                  className="h-full bg-torii transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}

            {/* Scrollable Middle Content Area (Ensures Zero Page Overflow on any laptop) */}
            <div className="w-full flex-1 min-h-0 overflow-y-auto thin-scrollbar flex flex-col justify-start py-1 sm:py-2 relative z-10 gap-2 sm:gap-2.5">
              
              {/* KHỐI 1: KHỐI CÂU HỎI (Tách bạch riêng biệt, rõ ràng, không lộ đáp án) */}
              <div className="w-full rounded-2xl border border-[#D8CEBF] dark:border-stone-700/80 bg-[#FBF8F2] dark:bg-[#18202C] p-3 sm:p-4 text-center shadow-xs flex flex-col items-center justify-center shrink-0 relative overflow-hidden transition-all">
                {/* Header nhãn câu hỏi */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-torii" />
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-torii font-sans">
                    CÂU HỎI {gameMode === 'speedrun' ? 'TỐC ĐỘ' : `${currentIndex + 1} / ${activeQuestions.length}`} • {displayItem.typeBadge || displayItem.typeName || 'Trắc nghiệm'}
                  </span>
                </div>

                {/* Nội dung câu hỏi (đã lọc bỏ gợi ý Hán Việt trong câu hỏi để tránh suy đoán) */}
                <h4 className="font-kanji font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 leading-snug max-w-xl">
                  {displayItem.question ? displayItem.question.replace(/\s*\(lấy từ chữ.*?\)/g, '') : ''}
                </h4>

                {/* Ngữ cảnh câu ví dụ (dành cho sentence_fill & sentence_reading) - KHÔNG HIỂN THỊ DỊCH CÂU TRƯỚC KHI TRẢ LỜI */}
                {displayItem.context && displayItem.context.trim() && (
                  <div className="w-full max-w-lg mt-2 p-2.5 bg-white dark:bg-stone-900/90 rounded-xl border border-stone-200 dark:border-stone-700/70 text-center shadow-2xs">
                    <div
                      className="font-kanji text-sm sm:text-base font-semibold leading-relaxed text-stone-900 dark:text-stone-100"
                      dangerouslySetInnerHTML={{
                        __html: displayItem.context
                          .replace(
                            '[ ? ]',
                            '<span class="px-2.5 py-0.5 bg-torii/15 text-torii rounded-lg border border-torii/40 font-black inline-block mx-1 shadow-2xs">[ ? ]</span>'
                          )
                          .replace(
                            /【(.*?)】/g,
                            '<span class="px-2 py-0.5 bg-amber-500/15 text-amber-700 dark:text-amber-300 rounded-lg border border-amber-500/40 font-black inline-block mx-1 font-kanji text-base">【$1】</span>'
                          ),
                      }}
                    />
                  </div>
                )}

                {/* Từ vựng / Hán tự mục tiêu */}
                {/* ĐẶC BIỆT: KHÔNG hiển thị từ/Hán tự cho 'kanji_from_reading' và 'sentence_fill/reading' vì sẽ làm lộ đáp án */}
                {displayItem.type !== 'sentence_fill' && displayItem.type !== 'sentence_reading' && (
                  <div className="mt-2 flex flex-col items-center justify-center">
                    {displayItem.type === 'kanji_from_reading' ? (
                      <div className="flex items-center gap-2 px-3 py-1 bg-torii/10 dark:bg-torii/20 rounded-xl border border-torii/30">
                        <span className="text-[11px] font-medium text-stone-600 dark:text-stone-300">Cách đọc cần tìm Hán tự:</span>
                        <span className="text-xl sm:text-2xl font-kanji font-black text-torii drop-shadow-2xs">
                          「{displayItem.targetReading}」
                        </span>
                      </div>
                    ) : (displayItem.word || displayItem.kanji) ? (
                      <div className="flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-kanji font-black text-torii drop-shadow-2xs leading-none">
                          {displayItem.word || displayItem.kanji}
                        </span>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* KHỐI 2: KHỐI CÂU TRẢ LỜI / LỰA CHỌN (Tách bạch hoàn toàn khỏi khối câu hỏi) */}
              <div className="w-full flex flex-col gap-1.5 shrink-0">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    LỰA CHỌN ĐÁP ÁN
                  </span>
                  <span className="text-[10px] font-mono opacity-50">
                    Phím tắt: [1] [2] [3] [4]
                  </span>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {displayItem.options &&
                    displayItem.options.map((optText, optIdx) => {
                      const letters = ['A', 'B', 'C', 'D'];
                      const keyLetter = letters[optIdx];
                      const keyNum = optIdx + 1;

                      // Mặc định khi chưa trả lời: Thẻ trung tính, tuyệt đối không có chỉ dấu đáp án
                      let btnStyle = 'bg-white dark:bg-stone-850 border-stone-200 dark:border-stone-700/80 hover:border-torii/60 hover:bg-torii/5 text-stone-900 dark:text-stone-100 shadow-2xs';

                      if (isAnswered && gameMode === 'zen') {
                        if (currentAnswer.isCorrect) {
                          // Nếu làm ĐÚNG: Chỉ làm nổi bật lựa chọn của người dùng, không cần lộ đáp án khác
                          if (optIdx === currentAnswer.selectedIndex) {
                            btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30';
                          } else {
                            btnStyle = 'bg-stone-100/40 dark:bg-stone-900/30 border-stone-200/40 dark:border-stone-800/40 opacity-35 text-stone-400';
                          }
                        } else {
                          // Nếu làm SAI: Lúc này MỚI TIẾT LỘ đáp án đúng!
                          if (optIdx === currentAnswer.selectedIndex) {
                            // Câu người dùng đã chọn sai -> Đỏ
                            btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-950 dark:text-rose-200 font-bold ring-2 ring-rose-500/30';
                          } else if (optIdx === displayItem.correctIndex) {
                            // Đáp án chính xác được hiển thị -> Xanh lá
                            btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30';
                          } else {
                            btnStyle = 'bg-stone-100/40 dark:bg-stone-900/30 border-stone-200/40 dark:border-stone-800/40 opacity-35 text-stone-400';
                          }
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered && gameMode === 'zen'}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`py-2 px-3 rounded-xl border text-left flex items-center justify-between transition-all duration-150 select-none cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className="w-5 h-5 rounded-md bg-black/5 dark:bg-white/10 text-[10px] font-black flex items-center justify-center font-mono shrink-0">
                              {keyLetter}
                            </span>
                            <span className="font-kanji font-bold text-xs sm:text-sm leading-snug truncate">
                              {optText}
                            </span>
                          </div>

                          <div className="shrink-0 flex items-center gap-1 ml-1.5">
                            {isAnswered && gameMode === 'zen' && (
                              <>
                                {currentAnswer.isCorrect && optIdx === currentAnswer.selectedIndex && (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-black">
                                    ✓ BẠN CHỌN ĐÚNG
                                  </span>
                                )}
                                {!currentAnswer.isCorrect && optIdx === currentAnswer.selectedIndex && (
                                  <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[9px] font-black">
                                    ✕ BẠN CHỌN SAI
                                  </span>
                                )}
                                {!currentAnswer.isCorrect && optIdx === displayItem.correctIndex && (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-black animate-pulse">
                                    ✓ ĐÁP ÁN ĐÚNG
                                  </span>
                                )}
                              </>
                            )}
                            {!isAnswered && (
                              <span className="text-[10px] opacity-40 font-mono px-1 py-0.5 rounded bg-black/5 dark:bg-white/5">
                                [{keyNum}]
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* KHỐI 3: HỘP GIẢI THÍCH & PHẢN HỒI (Chỉ xuất hiện sau khi đã trả lời) */}
              {isAnswered && gameMode === 'zen' && currentAnswer && (
                <div
                  className={`w-full p-2.5 rounded-xl border text-xs leading-relaxed animate-fadeIn shrink-0 text-left ${
                    currentAnswer.isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      {currentAnswer.isCorrect ? (
                        <span className="text-emerald-700 dark:text-emerald-300 font-extrabold flex items-center gap-1">
                          🎉 Xuất sắc! Bạn đã chọn chính xác!
                        </span>
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-rose-700 dark:text-rose-300 font-extrabold flex items-center gap-1">
                            ✕ Chưa chính xác! Đáp án đúng: <span className="underline decoration-2 font-black text-emerald-600 dark:text-emerald-400 ml-1">{displayItem.options[displayItem.correctIndex]}</span>
                          </span>
                          <span className="text-[10px] font-normal text-stone-500 dark:text-stone-400">
                            (Đã tự động lưu vào Sổ tay để ôn tập lại)
                          </span>
                        </div>
                      )}
                    </div>

                    {displayItem.ttsText && (
                      <button
                        onClick={() => {
                          playWaterDrop();
                          playJapaneseSpeech(displayItem.ttsText);
                        }}
                        className="text-[11px] font-bold underline flex items-center gap-1 opacity-80 hover:opacity-100 cursor-pointer ml-auto shrink-0 bg-white/40 dark:bg-black/20 px-2 py-0.5 rounded-lg border border-current"
                        title="Nghe phát âm tiếng Nhật"
                      >
                        <VolumeIcon className="w-3 h-3" /> Nghe đọc
                      </button>
                    )}
                  </div>

                  {/* Dịch câu ví dụ (CHỈ HIỂN THỊ TẠI ĐÂY SAU KHI ĐÃ TRẢ LỜI) */}
                  {displayItem.contextTrans && (
                    <div className="pt-1 mt-1 border-t border-current/20 text-[11px] font-medium opacity-90">
                      💬 {displayItem.contextTrans}
                    </div>
                  )}

                  {displayItem.explanation && (
                    <div className="pt-1 mt-1 border-t border-current/20 text-[11px] opacity-90 leading-normal">
                      <span dangerouslySetInnerHTML={{ __html: displayItem.explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation buttons: Trước / Tiếp theo / Làm lại */}
            {gameMode === 'zen' && (
              <div className="w-full pt-1.5 border-t border-washi-border/60 flex items-center justify-between shrink-0 text-xs relative z-10">
                <button
                  disabled={currentIndex === 0}
                  onClick={handlePrevQuestion}
                  className="px-3 py-1 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-washi-border font-bold text-xs opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  ← Trước
                </button>

                <button
                  onClick={() => {
                    playWoodClapper();
                    setUserAnswers({});
                    setStreak(0);
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] opacity-60 hover:opacity-100 transition-all cursor-pointer"
                  title="Làm lại từ đầu bộ đề này"
                >
                  🔄 Làm lại
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={currentIndex >= activeQuestions.length - 1}
                  className="px-4 py-1 rounded-lg bg-torii hover:bg-torii-light text-white font-bold text-xs shadow-xs transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <span>Tiếp</span>
                  <span>→</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
