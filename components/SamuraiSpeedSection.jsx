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
    <div className="w-full max-w-2xl flex flex-col items-center gap-6 animate-fadeIn select-none">
      {/* Top Banner / Arena Status */}
      <div className="w-full p-4 sm:p-5 rounded-3xl karuta-card border border-washi-border shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-torii text-white flex items-center justify-center text-2xl shadow-sm">
            ⚔️
          </div>
          <div>
            <h2 className="font-black text-lg font-ui text-torii">ĐẤU TRƯỜNG SAMURAI 60S</h2>
            <p className="text-xs opacity-70">Thử thách phản xạ Hán tự tốc độ cao</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <span className="text-[10px] opacity-60 block uppercase font-bold">Kỷ lục High Score</span>
            <span className="font-mono text-base font-black text-amber-600 dark:text-amber-400">
              🏆 {highScore}
            </span>
          </div>
        </div>
      </div>

      {/* Main Arena Box */}
      <div className="w-full p-6 sm:p-8 rounded-3xl karuta-card border-2 border-border-strong shadow-2xl flex flex-col items-center gap-6 relative overflow-hidden">
        <div className="karuta-inner-border" />

        {/* Hiệu ứng chém kiếm Katana */}
        {slashEffect && (
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
            <div className="w-full h-1 bg-white shadow-[0_0_20px_#fff] rotate-[-25deg] scale-125 animate-ping opacity-90" />
          </div>
        )}

        {!isPlaying && !isGameOver && (
          /* Ready Screen */
          <div className="flex flex-col items-center gap-5 py-8 text-center relative z-10">
            <div className="text-5xl">🎌</div>
            <div>
              <h3 className="text-2xl font-black font-ui mb-2">SẴN SÀNG RA ĐẬU TRƯỜNG?</h3>
              <p className="text-xs opacity-70 max-w-sm leading-relaxed">
                Bạn có đúng <strong>60 giây</strong> để nhận diện càng nhiều chữ Hán càng tốt.
                Combo càng cao, điểm thưởng nhân lên càng khủng!
              </p>
            </div>

            <button
              onClick={handleStartGame}
              className="px-8 py-3.5 rounded-2xl bg-torii text-white font-black text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>⚔️ BẮT ĐẦU ĐẤU TRƯỜNG 60S</span>
            </button>
          </div>
        )}

        {isPlaying && currentQuestion && (
          /* Active Playing Screen */
          <div className="w-full flex flex-col items-center gap-6 relative z-10">
            {/* Header: Timer & Combo Bar */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border">
              {/* Time Counter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold opacity-70">Thời gian:</span>
                <span
                  className={`font-mono text-2xl font-black ${
                    timeLeft <= 10 ? 'text-rose-600 animate-pulse' : 'text-torii'
                  }`}
                >
                  ⏳ {timeLeft}s
                </span>
              </div>

              {/* Combo Counter */}
              {combo > 1 && (
                <div className="px-3 py-1 rounded-full bg-amber-500 text-white font-extrabold text-xs tracking-wider shadow-sm animate-bounce">
                  ⚡ COMBO x{combo}!
                </div>
              )}

              {/* Current Score */}
              <div className="text-right">
                <span className="text-[10px] opacity-60 block uppercase font-bold">Điểm số</span>
                <span className="font-mono text-2xl font-black text-torii">{score}</span>
              </div>
            </div>

            {/* Target Kanji Character */}
            <div className="flex flex-col items-center gap-2 my-2">
              <span className="text-xs opacity-60 font-medium">Âm Hán Việt của chữ này là gì?</span>
              <div className="w-36 h-36 rounded-3xl bg-washi border-2 border-torii flex items-center justify-center text-7xl font-kanji font-black text-torii shadow-lg">
                {currentQuestion.char}
              </div>
            </div>

            {/* 4 Speed Answer Choices */}
            <div className="w-full grid grid-cols-2 gap-3.5">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(opt.hanViet)}
                  className="p-4 rounded-2xl bg-washi/95 border-2 border-washi-border hover:border-torii text-center transition-all duration-150 active:scale-95 group shadow-xs"
                >
                  <div className="text-lg font-black font-ui group-hover:text-torii">
                    {opt.hanViet}
                  </div>
                  <div className="text-[11px] opacity-70 truncate mt-0.5">
                    {opt.meaning}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isGameOver && (
          /* Game Over / Results Screen */
          <div className="w-full flex flex-col items-center gap-5 py-6 text-center relative z-10 animate-fadeIn">
            <div className="hanko-seal text-center p-3 animate-bounce">
              💮 {getSamuraiRank(score).title}
            </div>

            <div>
              <h3 className="text-2xl font-black font-ui mb-1">KẾT THÚC THỬ THÁCH!</h3>
              <p className="text-xs opacity-75">{getSamuraiRank(score).desc}</p>
            </div>

            <div className="w-full max-w-sm grid grid-cols-2 gap-3 p-4 rounded-2xl bg-washi border border-washi-border text-center">
              <div>
                <span className="text-[11px] opacity-60 block">Điểm số đạt được</span>
                <span className="font-mono text-2xl font-black text-torii">{score}</span>
              </div>
              <div>
                <span className="text-[11px] opacity-60 block">Combo tối đa</span>
                <span className="font-mono text-2xl font-black text-amber-600">
                  {maxCombo} liên tiếp
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={handleStartGame}
                className="px-6 py-3 rounded-xl bg-torii text-white font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                ⚔️ ĐẤU LẠI VÁN MỚI
              </button>
              <button
                onClick={() => setIsGameOver(false)}
                className="px-5 py-3 rounded-xl bg-washi border border-washi-border font-bold text-xs hover:border-torii transition-all"
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
