'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { playJapaneseSpeech, getLocalKanjiInfo } from '../lib/kanjiService';
import {
  playQuizSuccess,
  playQuizError,
  playWaterDrop,
  playWoodClapper,
  playTaikoDrum,
  playHankoStamp,
} from '../lib/traditionalAudio';
import EnsoCircle from './EnsoCircle';

// Hằng số dạng bài
const QUESTION_TYPES = {
  KANJI_TO_MEANING: 'kanji_to_meaning', // Dạng 1: Nhìn Kanji ➔ Chọn Nghĩa / Hán Việt
  READING_TO_KANJI: 'reading_to_kanji', // Dạng 2: Nhìn Hiragana ➔ Chọn Kanji (JLPT Moji-Goi)
  VOCAB_FILL: 'vocab_fill',             // Dạng 3: Điền Kanji vào từ vựng ghép (Ngữ cảnh)
};

const SPEEDRUN_DURATION = 60; // 60 giây
const HIGH_SCORE_KEY = 'project_kanji_speedrun_highscore_v1';

export default function QuizSection({
  currentLevel,
  kanjiList,
  onFailKanji,
  fullDb,
}) {
  // Game Mode: 'zen' (Luyện tập thong thả) | 'speedrun' (Thử thách 60s)
  const [gameMode, setGameMode] = useState('zen');
  
  // Question Filter: 'mixed' | 'kanji_to_meaning' | 'reading_to_kanji' | 'vocab_fill'
  const [questionFilter, setQuestionFilter] = useState('mixed');

  // Stats
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showHankoStamp, setShowHankoStamp] = useState(false);
  const [hankoText, setHankoText] = useState('合格');

  // Speedrun stats
  const [timeLeft, setTimeLeft] = useState(SPEEDRUN_DURATION);
  const [isSpeedrunActive, setIsSpeedrunActive] = useState(false);
  const [isSpeedrunFinished, setIsSpeedrunFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Current Question Data
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const timerRef = useRef(null);

  // Load High Score on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    }
  }, []);

  // Countdown timer for Speedrun
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

  // Kết thúc lượt Speedrun
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

  // Khởi động lại Speedrun
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
    generateQuestion();
  };

  // Sinh câu hỏi thông minh theo các dạng JLPT
  const generateQuestion = useCallback(() => {
    if (!kanjiList || kanjiList.length === 0) return;

    // Xác định dạng câu hỏi
    let chosenType = questionFilter;
    if (chosenType === 'mixed') {
      const types = [
        QUESTION_TYPES.KANJI_TO_MEANING,
        QUESTION_TYPES.READING_TO_KANJI,
        QUESTION_TYPES.VOCAB_FILL,
      ];
      chosenType = types[Math.floor(Math.random() * types.length)];
    }

    // Chọn chữ Kanji mục tiêu
    const randomIndex = Math.floor(Math.random() * kanjiList.length);
    const targetChar = kanjiList[randomIndex];
    const targetInfo = getLocalKanjiInfo(targetChar, fullDb);

    // Lấy 3 chữ gây nhiễu cùng level
    const pool = kanjiList.filter((c) => c !== targetChar);
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const distractorChars = shuffledPool.slice(0, 3);
    const distractorInfos = distractorChars.map((char) => ({
      char,
      info: getLocalKanjiInfo(char, fullDb),
    }));

    // Xây dựng câu hỏi theo dạng
    let questionObj = null;

    if (chosenType === QUESTION_TYPES.VOCAB_FILL) {
      // Dạng 3: Điền chữ vào từ vựng
      const validVocab = targetInfo?.vocab?.find(
        (v) => v.word && v.word.length >= 2 && v.word.includes(targetChar)
      );

      if (validVocab) {
        // Tạo chuỗi có ô khuyết [ ？ ]
        const maskedWord = validVocab.word.replace(
          new RegExp(targetChar, 'g'),
          '【 ？ 】'
        );

        const correctOpt = {
          id: 'target',
          kanji: targetChar,
          hanViet: targetInfo.hanViet,
          meaning: targetInfo.meaning,
          display: targetChar,
          subText: targetInfo.hanViet,
          isCorrect: true,
        };

        const distractorOpts = distractorInfos.map((d, i) => ({
          id: `dist_${i}`,
          kanji: d.char,
          hanViet: d.info.hanViet,
          meaning: d.info.meaning,
          display: d.char,
          subText: d.info.hanViet,
          isCorrect: false,
        }));

        questionObj = {
          type: QUESTION_TYPES.VOCAB_FILL,
          badge: 'ĐIỀN TỪ VỰNG',
          instruction: 'Chọn chữ Kanji thích hợp để điền vào ô trống:',
          targetChar,
          targetInfo,
          promptDisplay: maskedWord,
          promptFurigana: validVocab.reading || '',
          promptMeaning: validVocab.meaning_vi || validVocab.vn || '',
          options: [correctOpt, ...distractorOpts].sort(() => 0.5 - Math.random()),
        };
      } else {
        // Fallback về Dạng 2 nếu chữ này không có từ ghép thích hợp
        chosenType = QUESTION_TYPES.READING_TO_KANJI;
      }
    }

    if (chosenType === QUESTION_TYPES.READING_TO_KANJI) {
      // Dạng 2: Nhìn Hiragana ➔ Chọn chữ Kanji
      // Lấy âm Kun hoặc âm On hoặc từ vựng tiêu biểu
      let promptReading = '';
      if (targetInfo?.kun && targetInfo.kun !== '—' && !targetInfo.kun.includes('Tra từ điển')) {
        promptReading = targetInfo.kun.split(/[,、]/)[0].trim();
      } else if (targetInfo?.on && targetInfo.on !== '—' && !targetInfo.on.includes('Tra từ điển')) {
        promptReading = targetInfo.on.split(/[,、]/)[0].trim();
      } else if (targetInfo?.vocab?.[0]?.reading) {
        promptReading = targetInfo.vocab[0].reading;
      } else {
        promptReading = targetInfo.hanViet;
      }

      const correctOpt = {
        id: 'target',
        kanji: targetChar,
        hanViet: targetInfo.hanViet,
        meaning: targetInfo.meaning,
        display: targetChar,
        subText: targetInfo.hanViet,
        isCorrect: true,
      };

      const distractorOpts = distractorInfos.map((d, i) => ({
        id: `dist_${i}`,
        kanji: d.char,
        hanViet: d.info.hanViet,
        meaning: d.info.meaning,
        display: d.char,
        subText: d.info.hanViet,
        isCorrect: false,
      }));

      questionObj = {
        type: QUESTION_TYPES.READING_TO_KANJI,
        badge: 'JLPT MOJI-GOI',
        instruction: 'Nhìn cách đọc Hiragana / Katakana ➔ Chọn chữ Kanji tương ứng:',
        targetChar,
        targetInfo,
        promptDisplay: promptReading,
        promptFurigana: `Âm Hán Việt: ${targetInfo.hanViet}`,
        promptMeaning: targetInfo.meaning,
        options: [correctOpt, ...distractorOpts].sort(() => 0.5 - Math.random()),
      };
    }

    if (chosenType === QUESTION_TYPES.KANJI_TO_MEANING || !questionObj) {
      // Dạng 1: Nhìn chữ Kanji ➔ Chọn Nghĩa & Hán Việt
      const correctOpt = {
        id: 'target',
        kanji: targetChar,
        hanViet: targetInfo.hanViet,
        meaning: targetInfo.meaning,
        display: targetInfo.hanViet,
        subText: targetInfo.meaning,
        isCorrect: true,
      };

      const distractorOpts = distractorInfos.map((d, i) => ({
        id: `dist_${i}`,
        kanji: d.char,
        hanViet: d.info.hanViet,
        meaning: d.info.meaning,
        display: d.info.hanViet,
        subText: d.info.meaning,
        isCorrect: false,
      }));

      questionObj = {
        type: QUESTION_TYPES.KANJI_TO_MEANING,
        badge: 'HÁN TỰ ➔ Ý NGHĨA',
        instruction: 'Chọn âm Hán Việt và ý nghĩa đúng nhất:',
        targetChar,
        targetInfo,
        promptDisplay: targetChar,
        promptFurigana: '',
        promptMeaning: '',
        options: [correctOpt, ...distractorOpts].sort(() => 0.5 - Math.random()),
      };
    }

    setCurrentQuestion(questionObj);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [kanjiList, fullDb, questionFilter]);

  // Sinh câu hỏi đầu tiên
  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  // Xử lý khi chọn đáp án
  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);
    setTotalAttempted((prev) => prev + 1);

    if (opt.isCorrect) {
      playQuizSuccess();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      // Thưởng dấu Hanko khi đạt mốc 5, 10, 15 câu
      if (newStreak % 5 === 0) {
        setTimeout(() => {
          playHankoStamp();
          setHankoText(newStreak >= 10 ? '大吉' : '合格');
          setShowHankoStamp(true);
          setTimeout(() => setShowHankoStamp(false), 2400);
        }, 200);
      }

      // Xử lý điểm số trong Speedrun
      if (gameMode === 'speedrun' && isSpeedrunActive) {
        setCorrectCount((prev) => prev + 1);
        const newMultiplier = Math.min(5, 1 + Math.floor(newStreak / 2) * 0.5);
        setComboMultiplier(newMultiplier);
        setScore((prev) => prev + Math.round(100 * newMultiplier));

        // Tự động chuyển câu siêu nhanh (450ms) trong Speedrun
        setTimeout(() => {
          generateQuestion();
        }, 450);
      }
    } else {
      playQuizError();
      setStreak(0);
      setComboMultiplier(1);

      // Phạt thời gian trong Speedrun (-2s)
      if (gameMode === 'speedrun' && isSpeedrunActive) {
        setTimeLeft((prev) => Math.max(0, prev - 2));
        // Chuyển câu sau 700ms để kịp nhìn đáp án đúng
        setTimeout(() => {
          generateQuestion();
        }, 700);
      }

      // Lưu chữ sai vào Sổ tay ôn tập
      if (onFailKanji && currentQuestion?.targetChar) {
        onFailKanji(currentQuestion.targetChar);
      }
    }
  };

  // Keyboard shortcuts (Phím 1, 2, 3, 4 chọn đáp án; Space/Enter sang câu tiếp)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (!isAnswered && currentQuestion?.options) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          e.preventDefault();
          const idx = parseInt(e.key, 10) - 1;
          if (currentQuestion.options[idx]) {
            handleSelectOption(currentQuestion.options[idx]);
          }
        }
      } else if (isAnswered && gameMode === 'zen') {
        if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          playWoodClapper();
          generateQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentQuestion, gameMode, generateQuestion]);

  if (!currentQuestion) {
    return (
      <div className="p-12 text-center opacity-70 text-sm font-kanji">
        Đang khởi tạo đề trắc nghiệm JLPT...
      </div>
    );
  }

  return (
    <section className="w-full max-w-2xl flex flex-col items-center gap-5 z-20">
      {/* Thanh chọn Chế độ chơi & Dạng bài (Japanese Segmented Nav) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-washi/80 p-2 rounded-2xl border border-washi-border shadow-xs backdrop-blur-xs">
        {/* Game Mode Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => {
              playWaterDrop();
              setGameMode('zen');
              setIsSpeedrunActive(false);
              setIsSpeedrunFinished(false);
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
              if (!isSpeedrunActive && !isSpeedrunFinished) {
                // Sẵn sàng chơi speedrun
              }
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              gameMode === 'speedrun'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-color-sumi/70 hover:text-amber-600 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <span>⚡</span>
            <span>Thử Thách 60s</span>
          </button>
        </div>

        {/* Filter Question Type */}
        <div className="flex items-center gap-1 text-xs overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'mixed', label: '🎲 Trộn Đề' },
            { id: QUESTION_TYPES.KANJI_TO_MEANING, label: '🈸 Kanji ➔ Nghĩa' },
            { id: QUESTION_TYPES.READING_TO_KANJI, label: '🈳 Kana ➔ Kanji' },
            { id: QUESTION_TYPES.VOCAB_FILL, label: '🧩 Điền Từ' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                playWaterDrop();
                setQuestionFilter(t.id);
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] whitespace-nowrap transition-all ${
                questionFilter === t.id
                  ? 'bg-color-sumi text-bg-page font-bold'
                  : 'opacity-65 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Karuta Quiz Card */}
      <div className="w-full p-5 sm:p-7 md:p-8 rounded-3xl karuta-card relative overflow-hidden flex flex-col items-center shadow-washi">
        {/* Viền trong kép kiểu Nhật */}
        <div className="karuta-inner-border" />

        {/* Hiệu ứng con dấu triện đỏ Hanko khi thưởng / đỗ đạt */}
        {showHankoStamp && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-hankoStamp">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-red-600/90 text-red-600/90 flex flex-col items-center justify-center font-kanji font-black rotate-[-12deg] bg-red-600/10 backdrop-blur-xs shadow-2xl">
              <span className="text-3xl md:text-4xl tracking-widest leading-none">
                {hankoText}
              </span>
              <span className="text-[10px] tracking-wider mt-1 uppercase opacity-80 border-t border-red-600/50 pt-0.5">
                JLPT {currentLevel}
              </span>
            </div>
          </div>
        )}

        {/* Speedrun Finished View */}
        {gameMode === 'speedrun' && isSpeedrunFinished ? (
          <div className="w-full py-8 text-center flex flex-col items-center gap-4 relative z-10 animate-fadeIn">
            <div className="text-5xl animate-bounce">🏆</div>
            <h3 className="text-2xl md:text-3xl font-black font-kanji text-torii">
              KẾT THÚC THỬ THÁCH 60 GIÂY
            </h3>
            <p className="text-xs opacity-75 max-w-md">
              Bạn đã hoàn thành xuất sắc thử thách phản xạ chữ Hán JLPT {currentLevel}!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg my-2">
              <div className="bg-washi/80 p-3 rounded-2xl border border-washi-border">
                <span className="text-[10px] font-bold opacity-60 uppercase block">Tổng điểm</span>
                <span className="text-xl md:text-2xl font-black text-amber-600 font-kanji">
                  {score.toLocaleString()}
                </span>
              </div>
              <div className="bg-washi/80 p-3 rounded-2xl border border-washi-border">
                <span className="text-[10px] font-bold opacity-60 uppercase block">Số câu đúng</span>
                <span className="text-xl md:text-2xl font-black text-emerald-600 font-kanji">
                  {correctCount} / {totalAttempted}
                </span>
              </div>
              <div className="bg-washi/80 p-3 rounded-2xl border border-washi-border">
                <span className="text-[10px] font-bold opacity-60 uppercase block">Độ chính xác</span>
                <span className="text-xl md:text-2xl font-black text-torii font-kanji">
                  {totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0}%
                </span>
              </div>
              <div className="bg-washi/80 p-3 rounded-2xl border border-washi-border">
                <span className="text-[10px] font-bold opacity-60 uppercase block">Kỷ lục cao nhất</span>
                <span className="text-xl md:text-2xl font-black text-purple-600 font-kanji">
                  {highScore.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={startSpeedrun}
              className="mt-2 px-8 py-3.5 bg-torii hover:bg-torii-light text-white font-extrabold rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Thử thách lại ↺</span>
            </button>
          </div>
        ) : gameMode === 'speedrun' && !isSpeedrunActive ? (
          /* Speedrun Standby Screen */
          <div className="w-full py-10 text-center flex flex-col items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl">
              ⚡
            </div>
            <div>
              <h3 className="text-2xl font-black font-kanji text-color-sumi">
                THỬ THÁCH TỐC ĐỘ 60 GIÂY
              </h3>
              <p className="text-xs opacity-75 mt-1 max-w-md mx-auto">
                Trả lời chính xác nhiều câu hỏi nhất có thể trong vòng 60 giây. Trả lời đúng liên tiếp để nhân điểm thưởng Combo!
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold bg-washi/80 px-4 py-2 rounded-xl border border-washi-border">
              <span>👑 Kỷ lục của bạn:</span>
              <span className="font-extrabold text-amber-600 font-kanji text-sm">
                {highScore > 0 ? `${highScore.toLocaleString()} điểm` : 'Chưa có'}
              </span>
            </div>

            <button
              onClick={startSpeedrun}
              className="px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2 text-sm"
            >
              <span>Bắt Đầu Thử Thách 60s 🚀</span>
            </button>
          </div>
        ) : (
          /* Standard Quiz Question Display */
          <>
            {/* Top Stats Bar */}
            <div className="w-full flex items-center justify-between pb-3.5 border-b border-washi-border/60 relative z-10">
              <div className="flex items-center gap-2">
                <span className="hanko-stamp text-xs">JLPT {currentLevel}</span>
                <span className="px-2 py-0.5 rounded-full bg-torii/10 text-torii font-bold text-[10px] border border-torii/30">
                  {currentQuestion.badge}
                </span>
              </div>

              {gameMode === 'speedrun' ? (
                /* Speedrun Header Display */
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                      ⏱ {timeLeft}s
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-torii/10 px-3 py-1 rounded-full border border-torii/30">
                    <span className="text-xs font-black text-torii font-kanji">
                      {score} điểm (x{comboMultiplier})
                    </span>
                  </div>
                </div>
              ) : (
                /* Zen Header Display */
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-300">Chuỗi đúng:</span>
                    <span className={`font-extrabold font-kanji text-sm ${streak >= 3 ? 'text-amber-500 animate-pulse' : 'text-torii'}`}>
                      {streak} 🔥
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Time progress bar for Speedrun */}
            {gameMode === 'speedrun' && isSpeedrunActive && (
              <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full mt-2 overflow-hidden relative z-10">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-torii transition-all duration-1000 ease-linear"
                  style={{ width: `${(timeLeft / SPEEDRUN_DURATION) * 100}%` }}
                />
              </div>
            )}

            {/* Kanji / Question Prompt */}
            <div className="text-center py-5 relative z-10 w-full flex flex-col items-center">
              {/* Vòng cọ thiền Enso phía sau */}
              <EnsoCircle />

              <p className="text-xs opacity-60 font-bold uppercase tracking-wider mb-2">
                {currentQuestion.instruction}
              </p>

              {/* Hiển thị câu hỏi theo từng dạng */}
              {currentQuestion.type === QUESTION_TYPES.KANJI_TO_MEANING ? (
                /* Dạng 1: Chữ Kanji khổng lồ */
                <div className="flex flex-col items-center">
                  <div className="text-8xl md:text-9xl font-kanji font-black tracking-wider drop-shadow-sm select-none py-1 transition-transform hover:scale-105">
                    {currentQuestion.promptDisplay}
                  </div>
                  <button
                    onClick={() => {
                      playWaterDrop();
                      playJapaneseSpeech(currentQuestion.promptDisplay);
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-torii hover:text-white font-bold bg-washi hover:bg-torii border border-torii/30 hover:border-torii px-3.5 py-1.5 rounded-xl transition-all shadow-xs group"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                    <span>Phát âm</span>
                  </button>
                </div>
              ) : currentQuestion.type === QUESTION_TYPES.READING_TO_KANJI ? (
                /* Dạng 2: Cách đọc Hiragana to & rõ */
                <div className="flex flex-col items-center py-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-kanji font-black text-torii tracking-widest drop-shadow-xs select-none">
                    {currentQuestion.promptDisplay}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold opacity-75 mt-2 max-w-sm">
                    {currentQuestion.promptFurigana}
                  </div>
                  <div className="text-xs opacity-60 italic mt-0.5 max-w-xs truncate">
                    Ý nghĩa: {currentQuestion.promptMeaning}
                  </div>
                </div>
              ) : (
                /* Dạng 3: Điền chữ vào từ vựng */
                <div className="flex flex-col items-center py-2">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-kanji font-black text-color-sumi tracking-wider drop-shadow-xs select-none bg-washi/80 px-6 py-3 rounded-2xl border border-washi-border">
                    {currentQuestion.promptDisplay}
                  </div>
                  {currentQuestion.promptFurigana && (
                    <div className="text-xs font-bold text-torii font-kanji mt-2">
                      Cách đọc: {currentQuestion.promptFurigana}
                    </div>
                  )}
                  {currentQuestion.promptMeaning && (
                    <div className="text-xs opacity-70 italic mt-0.5">
                      Nghĩa: {currentQuestion.promptMeaning}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4 Lựa chọn Multiple Choice (Thẻ Karuta) */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 relative z-10">
              {currentQuestion.options.map((opt, i) => {
                let btnClass = 'karuta-card hover:border-torii/60 hover:-translate-y-0.5';

                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-md ring-2 ring-emerald-500/40';
                  } else if (selectedOption === opt) {
                    btnClass = 'bg-red-500/20 border-red-500 text-red-950 dark:text-red-200 ring-2 ring-red-500/40';
                  } else {
                    btnClass = 'opacity-35 karuta-card';
                  }
                }

                // Check hiển thị chữ to nếu đáp án là Kanji
                const isKanjiOption = opt.display.length === 1 && !opt.display.match(/[a-zA-Z0-9]/);

                return (
                  <button
                    key={opt.id || i}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 active:scale-98 cursor-pointer relative group ${btnClass}`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {/* Phím tắt số (1, 2, 3, 4) */}
                      <span className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/10 text-[11px] font-bold flex items-center justify-center font-mono opacity-60 group-hover:opacity-100 group-hover:bg-torii group-hover:text-white transition-all shrink-0">
                        {i + 1}
                      </span>

                      <div className="overflow-hidden">
                        {isKanjiOption ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-kanji font-black text-torii">
                              {opt.display}
                            </span>
                            <span className="text-xs font-bold opacity-80 truncate">
                              {opt.subText || opt.hanViet}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="font-extrabold text-sm sm:text-base font-kanji text-torii block">
                              {opt.display}
                            </span>
                            <span className="text-xs opacity-75 mt-0.5 leading-snug line-clamp-1">
                              {opt.subText}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0 ml-2">
                      {isAnswered && opt.isCorrect && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          ✓ ĐÚNG
                        </span>
                      )}
                      {isAnswered && selectedOption === opt && !opt.isCorrect && (
                        <span className="text-red-600 dark:text-red-400 font-extrabold text-xs bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/30">
                          ✗ SAI
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Mnemonic Box in Zen Mode */}
            {isAnswered && gameMode === 'zen' && (
              <div
                className={`w-full mt-4 p-4 rounded-2xl border text-xs md:text-sm animate-fadeIn relative z-10 ${
                  selectedOption?.isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                    : 'bg-red-500/10 border-red-500/30 text-red-950 dark:text-red-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <span>{selectedOption?.isCorrect ? '🎉 Tuyệt vời! Chính xác!' : '😢 Chưa chính xác!'}</span>
                  {!selectedOption?.isCorrect && (
                    <span className="text-[11px] font-normal text-torii">
                      (Đã tự động thêm vào Sổ tay để bạn ôn lại)
                    </span>
                  )}
                </div>
                
                {currentQuestion.targetInfo && (
                  <div className="mt-1 text-xs opacity-85 leading-relaxed space-y-1">
                    <div>
                      <strong>Chữ:</strong> 「{currentQuestion.targetChar}」 •{' '}
                      <strong>Âm Hán Việt:</strong> {currentQuestion.targetInfo.hanViet} •{' '}
                      <strong>Nghĩa:</strong> {currentQuestion.targetInfo.meaning}
                    </div>
                    {currentQuestion.targetInfo.mnemonic && (
                      <div className="italic text-[11px] opacity-80 pt-0.5">
                        💡 <strong>Mẹo nhớ:</strong> {currentQuestion.targetInfo.mnemonic}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Next Question Button (Zen Mode) */}
            {isAnswered && gameMode === 'zen' && (
              <div className="mt-5 flex items-center gap-3 relative z-10">
                <button
                  onClick={() => {
                    playWoodClapper();
                    generateQuestion();
                  }}
                  className="px-8 py-3 bg-torii hover:bg-torii-light text-white font-bold rounded-2xl text-xs md:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Câu tiếp theo [Space / Enter]</span>
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
        <kbd className="px-1 py-0.5 bg-black/5 dark:bg-white/10 rounded font-mono">4</kbd> để chọn nhanh đáp án
      </div>
    </section>
  );
}
