'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getLocalKanjiInfo } from '../lib/kanjiService';
import {
  playTaikoDrum,
  playQuizSuccess,
  playQuizError,
  playHankoStamp,
  playWoodClapper,
} from '../lib/traditionalAudio';
import { KatanaIcon, SamuraiKabutoIcon } from './ZenIcons';


export default function SamuraiSpeedSection({ kanjiList = [], fullDb, currentLevel = 'N5' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [slashEffect, setSlashEffect] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const timerRef = useRef(null);

  // Tải kỷ lục cá nhân từ localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('samurai_speed_highscore') || '0';
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Sinh câu hỏi tốc độ tiếp theo
  const generateQuestion = useCallback(() => {
    if (!kanjiList || kanjiList.length === 0) return null;

    // Chọn ngẫu nhiên 1 chữ đúng
    const randomChar = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    const correctInfo = getLocalKanjiInfo(randomChar, fullDb);

    // Chọn 3 đáp án sai
    const distractors = kanjiList
      .filter((c) => c !== randomChar)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((c) => getLocalKanjiInfo(c, fullDb));

    const options = [correctInfo, ...distractors]
      .map((item) => ({
        char: item.char,
        hanViet: item.hanViet || '—',
        meaning: item.meaning || '—',
      }))
      .sort(() => 0.5 - Math.random());

    return {
      char: randomChar,
      correctHanViet: correctInfo.hanViet,
      options,
    };
  }, [kanjiList, fullDb]);

  // Bắt đầu đấu trường 60 giây
  const handleStartGame = () => {
    playTaikoDrum();
    setTimeLeft(60);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setIsGameOver(false);
    setIsPlaying(true);
    setCurrentQuestion(generateQuestion());
  };

  // Đếm ngược 60 giây
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsPlaying(false);
            setIsGameOver(true);
            playHankoStamp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, timeLeft]);

  // Cập nhật kỷ lục khi kết thúc ván
  useEffect(() => {
    if (isGameOver) {
      if (score > highScore) {
        setHighScore(score);
        if (typeof window !== 'undefined') {
          localStorage.setItem('samurai_speed_highscore', score.toString());
        }
      }
    }
  }, [isGameOver, score, highScore]);

  // Xử lý chọn đáp án
  const handleSelectAnswer = (selectedHanViet) => {
    if (!isPlaying || !currentQuestion) return;

    if (selectedHanViet === currentQuestion.correctHanViet) {
      playQuizSuccess();
      setSlashEffect(true);
      setTimeout(() => setSlashEffect(false), 300);

      const nextCombo = combo + 1;
      setCombo(nextCombo);
      if (nextCombo > maxCombo) setMaxCombo(nextCombo);

      // Điểm cơ bản: 100 + Thưởng combo
      const comboMultiplier = Math.min(nextCombo, 5);
      const pointsAdded = 100 * comboMultiplier;
      setScore((s) => s + pointsAdded);

      setCurrentQuestion(generateQuestion());
    } else {
      playQuizError();
      setCombo(0);
      setCurrentQuestion(generateQuestion());
    }
  };

  // Xác định danh hiệu dựa trên điểm số
  const getSamuraiRank = (finalScore) => {
    if (finalScore >= 2500) return { title: '将軍 (Shogun)', desc: 'Tướng quân tối cao, kiếm pháp vô địch thiên hạ!' };
    if (finalScore >= 1400) return { title: '剣豪 (Kiếm Hào)', desc: 'Kiếm khách bậc thầy, phản xạ thần tốc!' };
    if (finalScore >= 600) return { title: '侍 (Samurai)', desc: 'Chiến binh dũng cảm, phản xạ vững vàng!' };
    return { title: '見習い (Tập sự)', desc: 'Võ sinh mới nhập môn, hãy tiếp tục rèn luyện!' };
  };

  return (
    <div className="w-full max-w-[1020px] 2xl:max-w-6xl h-full min-h-0 flex-1 flex flex-col items-center justify-between gap-1 sm:gap-1.5 z-20 animate-fadeIn select-none overflow-hidden">
      {/* Top Banner / Arena Status */}
      <div className="w-full p-1.5 sm:p-2 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700/80 shadow-md backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-torii text-white flex items-center justify-center shadow-xs border border-amber-300/30">
            <KatanaIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-black text-xs sm:text-sm font-ui text-torii">ĐẤU TRƯỜNG SAMURAI 60S</h2>
            <p className="text-[10px] opacity-70 hidden sm:block">Thử thách phản xạ Hán tự tốc độ cao</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-right">
          <span className="text-[10px] opacity-60 uppercase font-bold hidden sm:inline">Kỷ lục:</span>
          <span className="font-mono text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400">
            🏆 {highScore}
          </span>
        </div>
      </div>

      {/* Main Arena Box */}
      <div className="w-full flex-1 min-h-0 p-3 sm:p-4 rounded-2xl sm:rounded-3xl karuta-card border border-[#D8CEBF] dark:border-stone-700/80 bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 shadow-md flex flex-col items-center justify-between relative overflow-hidden backdrop-blur-md">
        <div className="karuta-inner-border" />

        {/* Hiệu ứng chém kiếm Katana */}
        {slashEffect && (
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
            <div className="w-full h-1 bg-white shadow-[0_0_20px_#fff] rotate-[-25deg] scale-125 animate-ping opacity-90" />
          </div>
        )}

        {!isPlaying && !isGameOver && (
          /* Ready Screen */
          <div className="my-auto flex flex-col items-center gap-3 py-4 text-center relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-torii/10 dark:bg-torii/20 text-torii dark:text-torii-light flex items-center justify-center border border-torii/30 shadow-inner">
              <SamuraiKabutoIcon className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-black font-ui mb-1 text-stone-900 dark:text-white">SẴN SÀNG RA ĐẤU TRƯỜNG?</h3>
              <p className="text-xs opacity-75 max-w-sm leading-relaxed">
                Bạn có đúng <strong>60 giây</strong> để nhận diện càng nhiều chữ Hán càng tốt.
                Combo càng cao, điểm thưởng nhân lên càng khủng!
              </p>
            </div>

            <button
              onClick={handleStartGame}
              className="mt-1 px-6 py-2.5 rounded-xl bg-torii text-white font-black text-xs sm:text-sm shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <KatanaIcon className="w-4 h-4" />
              <span>BẮT ĐẦU ĐẤU TRƯỜNG 60S</span>
            </button>
          </div>
        )}

        {isPlaying && currentQuestion && (
          /* Active Playing Screen */
          <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-between py-1 relative z-10">
            {/* Header: Timer & Combo Bar */}
            <div className="w-full flex items-center justify-between pb-1.5 border-b border-washi-border/60 shrink-0">
              {/* Time Counter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold opacity-70">Thời gian:</span>
                <span
                  className={`font-mono text-lg sm:text-xl font-black ${
                    timeLeft <= 10 ? 'text-rose-600 animate-pulse' : 'text-torii'
                  }`}
                >
                  ⏳ {timeLeft}s
                </span>
              </div>

              {/* Combo Counter */}
              {combo > 1 && (
                <div className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-extrabold text-[11px] tracking-wider shadow-2xs animate-bounce">
                  ⚡ COMBO x{combo}!
                </div>
              )}

              {/* Current Score */}
              <div className="text-right">
                <span className="text-[10px] opacity-60 block uppercase font-bold">Điểm số</span>
                <span className="font-mono text-lg sm:text-xl font-black text-torii">{score}</span>
              </div>
            </div>

            {/* Target Kanji Character */}
            <div className="flex flex-col items-center gap-1 my-auto">
              <span className="text-[11px] opacity-60 font-medium">Âm Hán Việt của chữ này là gì?</span>
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-washi dark:bg-stone-850 border-2 border-torii flex items-center justify-center text-5xl sm:text-6xl font-kanji font-black text-torii shadow-md">
                {currentQuestion.char}
              </div>
            </div>

            {/* 4 Speed Answer Choices */}
            <div className="w-full max-w-lg grid grid-cols-2 gap-2 shrink-0">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(opt.hanViet)}
                  className="p-2 sm:p-2.5 rounded-xl bg-[#FFFDF9] dark:bg-stone-800 border border-washi-border hover:border-torii text-center transition-all duration-150 active:scale-95 group shadow-2xs cursor-pointer"
                >
                  <div className="text-sm sm:text-base font-black font-ui group-hover:text-torii">
                    {opt.hanViet}
                  </div>
                  <div className="text-[10px] opacity-70 truncate mt-0.5">
                    {opt.meaning}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isGameOver && (
          /* Game Over / Results Screen */
          <div className="my-auto w-full flex flex-col items-center gap-3 py-4 text-center relative z-10 animate-fadeIn">
            <div className="hanko-seal text-center p-2 text-xs animate-bounce">
              💮 {getSamuraiRank(score).title}
            </div>

            <div>
              <h3 className="text-xl font-black font-ui mb-0.5 text-stone-900 dark:text-white">KẾT THÚC THỬ THÁCH!</h3>
              <p className="text-xs opacity-75">{getSamuraiRank(score).desc}</p>
            </div>

            <div className="w-full max-w-sm grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#F5EFE6] dark:bg-stone-800 border border-washi-border text-center">
              <div>
                <span className="text-[10px] opacity-60 block">Điểm số đạt được</span>
                <span className="font-mono text-xl font-black text-torii">{score}</span>
              </div>
              <div>
                <span className="text-[10px] opacity-60 block">Combo tối đa</span>
                <span className="font-mono text-xl font-black text-amber-600">
                  {maxCombo} liên tiếp
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 mt-2">
              <button
                onClick={handleStartGame}
                className="px-5 py-2 rounded-xl bg-torii text-white font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <KatanaIcon className="w-3.5 h-3.5" />
                <span>ĐẤU LẠI VÁN MỚI</span>
              </button>
              <button
                onClick={() => setIsGameOver(false)}
                className="px-4 py-2 rounded-xl bg-[#FFFDF9] dark:bg-stone-800 border border-washi-border font-bold text-xs hover:border-torii transition-all cursor-pointer"
              >
                Quay lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
