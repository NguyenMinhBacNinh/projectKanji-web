'use client';

import { useState } from 'react';
import { HIRAGANA_SEION, KANA_DAKUON, KANA_YOON } from '../lib/kanaData';
import { playJapaneseSpeech } from '../lib/kanjiService';
import {
  playWoodClapper,
  playWaterDrop,
  playQuizSuccess,
  playQuizError,
  playHankoStamp,
} from '../lib/traditionalAudio';
import { OrigamiCraneIcon, KatanaIcon, VolumeIcon } from './ZenIcons';


export default function KanaSection() {
  const [scriptType, setScriptType] = useState('hiragana'); // 'hiragana' | 'katakana'
  const [category, setCategory] = useState('seion'); // 'seion' | 'dakuon' | 'yoon' | 'quiz'
  const [selectedKana, setSelectedKana] = useState(null);

  // Kana Quiz state
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState(null); // 'correct' | 'wrong'
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Active dataset
  const currentList =
    category === 'seion'
      ? HIRAGANA_SEION
      : category === 'dakuon'
      ? KANA_DAKUON
      : KANA_YOON;

  // Khởi tạo câu hỏi trắc nghiệm Kana
  const generateQuizQuestion = () => {
    const pool = HIRAGANA_SEION.filter((k) => k.kana !== '');
    const correctItem = pool[Math.floor(Math.random() * pool.length)];

    // Chọn 3 đáp án sai
    const distractors = pool
      .filter((k) => k.romaji !== correctItem.romaji)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [correctItem, ...distractors].sort(() => 0.5 - Math.random());

    setQuizQuestion({
      target: correctItem,
      options,
    });
    setQuizFeedback(null);
  };

  const startQuiz = () => {
    playWoodClapper();
    setCategory('quiz');
    setQuizScore(0);
    setQuizIndex(1);
    setIsQuizFinished(false);
    generateQuizQuestion();
  };

  const handleAnswerQuiz = (selected) => {
    if (quizFeedback || isQuizFinished) return;

    if (selected.romaji === quizQuestion.target.romaji) {
      playQuizSuccess();
      setQuizFeedback('correct');
      setQuizScore((s) => s + 10);
    } else {
      playQuizError();
      setQuizFeedback('wrong');
    }

    setTimeout(() => {
      if (quizIndex >= 10) {
        setIsQuizFinished(true);
        playHankoStamp();
      } else {
        setQuizIndex((i) => i + 1);
        generateQuizQuestion();
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-[1020px] 2xl:max-w-6xl h-full min-h-0 flex-1 flex flex-col items-center justify-between gap-1 sm:gap-1.5 z-20 animate-fadeIn select-none overflow-hidden">
      {/* Category & Script Type Toggle */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700/80 shadow-md backdrop-blur-md shrink-0">
        {/* Script Type (Hiragana / Katakana) */}
        <div className="flex items-center gap-1 p-0.5 bg-[#F5EFE6] dark:bg-stone-800 rounded-xl border border-washi-border">
          <button
            onClick={() => {
              playWoodClapper();
              setScriptType('hiragana');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              scriptType === 'hiragana'
                ? 'bg-torii text-white shadow-2xs'
                : 'text-stone-700 dark:text-stone-300 hover:text-torii'
            }`}
          >
            <OrigamiCraneIcon className="w-3.5 h-3.5" />
            <span>Hiragana (Chữ mềm)</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setScriptType('katakana');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              scriptType === 'katakana'
                ? 'bg-torii text-white shadow-2xs'
                : 'text-stone-700 dark:text-stone-300 hover:text-torii'
            }`}
          >
            <span className="font-kanji font-black">ア</span>
            <span>Katakana (Chữ cứng)</span>
          </button>
        </div>

        {/* Categories: Seion / Dakuon / Yoon / Quiz */}
        <div className="flex items-center gap-1 flex-wrap justify-center text-xs font-bold">
          <button
            onClick={() => {
              playWoodClapper();
              setCategory('seion');
            }}
            className={`px-2.5 py-1 rounded-xl transition-all border cursor-pointer ${
              category === 'seion'
                ? 'bg-torii text-white border-torii shadow-2xs'
                : 'bg-[#F5EFE6] dark:bg-stone-800 border-washi-border opacity-75 hover:opacity-100'
            }`}
          >
            Âm cơ bản (46)
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setCategory('dakuon');
            }}
            className={`px-2.5 py-1 rounded-xl transition-all border cursor-pointer ${
              category === 'dakuon'
                ? 'bg-torii text-white border-torii shadow-2xs'
                : 'bg-[#F5EFE6] dark:bg-stone-800 border-washi-border opacity-75 hover:opacity-100'
            }`}
          >
            Âm đục (ga, za...)
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setCategory('yoon');
            }}
            className={`px-2.5 py-1 rounded-xl transition-all border cursor-pointer ${
              category === 'yoon'
                ? 'bg-torii text-white border-torii shadow-2xs'
                : 'bg-[#F5EFE6] dark:bg-stone-800 border-washi-border opacity-75 hover:opacity-100'
            }`}
          >
            Âm ghép (kya...)
          </button>
          <button
            onClick={startQuiz}
            className={`px-2.5 py-1 rounded-xl transition-all border flex items-center gap-1 cursor-pointer ${
              category === 'quiz'
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500 hover:text-white'
            }`}
          >
            <KatanaIcon className="w-3.5 h-3.5" />
            <span>Phản xạ</span>
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      {category !== 'quiz' && (
        <div className="w-full flex-1 min-h-0 flex flex-col lg:flex-row items-stretch gap-2 sm:gap-3 overflow-hidden">
          {/* Kana Grid (5 cột truyền thống) */}
          <div className="flex-1 min-h-0 p-2 sm:p-3 rounded-2xl sm:rounded-3xl karuta-card border border-[#D8CEBF] dark:border-stone-700/80 bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 shadow-md flex flex-col overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between mb-1 pb-1 border-b border-washi-border/60 shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-torii flex items-center gap-1">
                <span>🎌</span> Bảng chữ cái {scriptType === 'hiragana' ? 'Hiragana' : 'Katakana'}
              </span>
              <span className="text-[10px] opacity-60">Nhấp vào ô để nghe đọc</span>
            </div>

            <div className="grid grid-cols-5 gap-1 sm:gap-1.5 flex-1 min-h-0 overflow-y-auto thin-scrollbar p-0.5">
              {currentList.map((item, idx) => {
                if (!item.kana) {
                  return (
                    <div
                      key={idx}
                      className="p-1.5 rounded-xl bg-washi/30 border border-dashed border-washi-border/40 opacity-30 select-none"
                    />
                  );
                }

                const charDisplay = scriptType === 'hiragana' ? item.kana : item.kata;
                const isSelected = selectedKana?.romaji === item.romaji;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      playWaterDrop();
                      playJapaneseSpeech(item.kana);
                      setSelectedKana(item);
                    }}
                    className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl border transition-all duration-150 group active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-torii text-white border-torii shadow-xs scale-[1.02]'
                        : 'bg-[#FFFDF9] dark:bg-stone-850 border-washi-border hover:border-torii/60'
                    }`}
                  >
                    <span
                      className={`font-kanji text-xl sm:text-2xl font-black ${
                        isSelected ? 'text-white' : 'text-stone-900 dark:text-stone-100 group-hover:text-torii'
                      }`}
                    >
                      {charDisplay}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-mono font-bold mt-0.5 ${
                        isSelected ? 'text-white/80' : 'opacity-60'
                      }`}
                    >
                      {item.romaji}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kana Detail Panel */}
          <div className="w-full lg:w-72 p-3 rounded-2xl sm:rounded-3xl karuta-card border border-[#D8CEBF] dark:border-stone-700/80 bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 shadow-md flex flex-col justify-between shrink-0 overflow-y-auto thin-scrollbar backdrop-blur-md">
            <div className="text-xs font-bold uppercase tracking-wider text-torii pb-1 border-b border-washi-border/60 flex items-center gap-1.5 shrink-0">
              <span>🔍</span> Mẹo nhớ & Chi tiết
            </div>

            {selectedKana ? (
              <div className="flex flex-col items-center gap-2 text-center animate-fadeIn my-auto py-2">
                <div className="w-16 h-16 rounded-2xl bg-torii/10 border-2 border-torii/40 flex items-center justify-center text-torii font-kanji text-4xl font-black shadow-inner">
                  {scriptType === 'hiragana' ? selectedKana.kana : selectedKana.kata}
                </div>

                <div>
                  <div className="text-lg font-black font-ui uppercase tracking-wide">
                    {selectedKana.romaji}
                  </div>
                  <div className="text-[11px] opacity-60">
                    {scriptType === 'hiragana' ? 'Hiragana' : 'Katakana'}: 「
                    {scriptType === 'hiragana' ? selectedKana.kana : selectedKana.kata}」
                  </div>
                </div>

                <button
                  onClick={() => {
                    playWaterDrop();
                    playJapaneseSpeech(selectedKana.kana);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-torii text-white font-bold text-xs shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                >
                  <VolumeIcon className="w-3.5 h-3.5" />
                  <span>Phát âm</span>
                </button>

                {selectedKana.tip && (
                  <div className="w-full p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-left">
                    <span className="font-bold text-amber-800 dark:text-amber-200 block mb-0.5 text-[11px]">
                      💡 Mẹo ghi nhớ:
                    </span>
                    <p className="opacity-80 text-[10px] leading-relaxed">{selectedKana.tip}</p>
                  </div>
                )}

                {selectedKana.example && (
                  <div className="w-full p-2 rounded-xl bg-[#F5EFE6] dark:bg-stone-800 border border-washi-border text-xs text-left">
                    <span className="font-bold opacity-70 block mb-0.5 text-[11px]">Ví dụ:</span>
                    <p className="font-kanji font-bold text-torii text-xs">{selectedKana.example}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="my-auto py-8 text-center opacity-60 text-xs flex flex-col items-center gap-1.5">
                <span className="text-2xl">👈</span>
                <span>Nhấp vào bất kỳ chữ nào trong bảng để xem chi tiết.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Kana Quiz Game View */}
      {category === 'quiz' && (
        <div className="w-full flex-1 min-h-0 max-w-xl p-4 sm:p-6 rounded-3xl karuta-card border border-[#D8CEBF] dark:border-stone-700/80 bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 shadow-md flex flex-col justify-between relative backdrop-blur-md">
          <div className="karuta-inner-border" />

          <div className="w-full flex items-center justify-between pb-1.5 border-b border-washi-border relative z-10 text-xs shrink-0">
            <span className="font-bold text-torii flex items-center gap-1.5">
              <span>⚡</span> Trắc nghiệm phản xạ Kana
            </span>
            <span className="font-bold opacity-70">
              Câu {quizIndex}/10 • Điểm: <strong className="text-torii">{quizScore}</strong>
            </span>
          </div>

          {!isQuizFinished && quizQuestion ? (
            <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-between py-2 relative z-10">
              <div className="text-center my-auto">
                <span className="text-xs opacity-60 block mb-1">Chữ này đọc là gì?</span>
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-washi dark:bg-stone-850 border-2 border-torii flex items-center justify-center text-4xl sm:text-5xl font-kanji font-black text-torii shadow-md">
                  {scriptType === 'hiragana'
                    ? quizQuestion.target.kana
                    : quizQuestion.target.kata}
                </div>
              </div>

              {/* 4 Choices */}
              <div className="w-full grid grid-cols-2 gap-2 shrink-0">
                {quizQuestion.options.map((opt, idx) => {
                  let btnColor = 'bg-[#FFFDF9] dark:bg-stone-850 border-washi-border hover:border-torii/60';
                  if (quizFeedback) {
                    if (opt.romaji === quizQuestion.target.romaji) {
                      btnColor = 'bg-emerald-500 text-white border-emerald-600 shadow-xs font-black';
                    } else {
                      btnColor = 'opacity-40 bg-washi border-washi-border';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerQuiz(opt)}
                      disabled={!!quizFeedback}
                      className={`py-2 px-3 rounded-xl border text-sm sm:text-base font-bold font-mono transition-all flex items-center justify-center cursor-pointer ${btnColor}`}
                    >
                      {opt.romaji}
                    </button>
                  );
                })}
              </div>

              {quizFeedback && (
                <div
                  className={`text-xs font-bold animate-fadeIn pt-1 shrink-0 ${
                    quizFeedback === 'correct' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {quizFeedback === 'correct' ? '🌸 Chính xác! +10 điểm' : '🍂 Sai rồi!'}
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="my-auto w-full flex flex-col items-center gap-2.5 py-4 relative z-10 text-center animate-fadeIn">
              <div className="hanko-seal text-center p-2 text-xs animate-bounce">
                💮 大変よくできました
              </div>
              <h3 className="text-lg font-black font-ui mt-1">HOÀN THÀNH BÀI PHẢN XẠ!</h3>
              <p className="text-xs opacity-75">
                Bạn đạt được <strong className="text-torii text-base">{quizScore} / 100</strong> điểm.
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={startQuiz}
                  className="px-4 py-1.5 rounded-xl bg-torii text-white font-bold text-xs shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                >
                  🔄 Luyện lại
                </button>
                <button
                  onClick={() => setCategory('seion')}
                  className="px-4 py-1.5 rounded-xl bg-[#FFFDF9] dark:bg-stone-800 border border-washi-border font-bold text-xs hover:border-torii transition-all cursor-pointer"
                >
                  📖 Về bảng chữ cái
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
