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
    <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-fadeIn">
      {/* Category & Script Type Toggle */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl karuta-card border border-washi-border shadow-xs">
        {/* Script Type (Hiragana / Katakana) */}
        <div className="flex items-center gap-1.5 p-1 bg-washi rounded-xl border border-washi-border">
          <button
            onClick={() => {
              playWoodClapper();
              setScriptType('hiragana');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
              scriptType === 'hiragana'
                ? 'bg-torii text-white shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <span>あ Hiragana (Chữ mềm)</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setScriptType('katakana');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
              scriptType === 'katakana'
                ? 'bg-torii text-white shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <span>ア Katakana (Chữ cứng)</span>
          </button>
        </div>

        {/* Categories: Seion / Dakuon / Yoon / Quiz */}
        <div className="flex items-center gap-1 flex-wrap justify-center text-xs font-bold">
          <button
            onClick={() => {
              playWoodClapper();
              setCategory('seion');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all border ${
              category === 'seion'
                ? 'bg-torii text-white border-torii shadow-xs'
                : 'kifuda-tab'
            }`}
          >
            Âm cơ bản (46)
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setCategory('dakuon');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all border ${
              category === 'dakuon'
                ? 'bg-torii text-white border-torii shadow-xs'
                : 'kifuda-tab'
            }`}
          >
            Âm đục (ga, za, da, ba, pa)
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setCategory('yoon');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all border ${
              category === 'yoon'
                ? 'bg-torii text-white border-torii shadow-xs'
                : 'kifuda-tab'
            }`}
          >
            Âm ghép (kya, sha...)
          </button>
          <button
            onClick={startQuiz}
            className={`px-3 py-1.5 rounded-xl transition-all border flex items-center gap-1 ${
              category === 'quiz'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500 hover:text-white'
            }`}
          >
            <span>⚡</span>
            <span>Luyện phản xạ</span>
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      {category !== 'quiz' && (
        <div className="w-full flex flex-col lg:flex-row items-start gap-6">
          {/* Kana Grid (5 cột truyền thống của người Nhật) */}
          <div className="flex-1 w-full p-4 sm:p-6 rounded-3xl karuta-card border border-washi-border shadow-md">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-washi-border">
              <span className="text-xs font-bold uppercase tracking-wider text-torii flex items-center gap-1.5">
                <span>🎌</span> Bảng chữ cái {scriptType === 'hiragana' ? 'Hiragana' : 'Katakana'}
              </span>
              <span className="text-[11px] opacity-60">Nhấp vào ô để nghe đọc</span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
              {currentList.map((item, idx) => {
                if (!item.kana) {
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-washi/30 border border-dashed border-washi-border/40 opacity-30 select-none"
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
                    className={`flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl border transition-all duration-200 group active:scale-95 ${
                      isSelected
                        ? 'bg-torii text-white border-torii shadow-md scale-105'
                        : 'bg-washi/90 border-washi-border hover:border-torii/60 hover:shadow-sm'
                    }`}
                  >
                    <span
                      className={`font-kanji text-2xl sm:text-3xl font-black ${
                        isSelected ? 'text-white' : 'group-hover:text-torii'
                      }`}
                    >
                      {charDisplay}
                    </span>
                    <span
                      className={`text-[10px] sm:text-xs font-mono font-bold mt-1 ${
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
          <div className="w-full lg:w-80 p-5 rounded-3xl karuta-card border border-washi-border shadow-md flex flex-col gap-4">
            <div className="text-xs font-bold uppercase tracking-wider text-torii pb-2 border-b border-washi-border flex items-center gap-2">
              <span>🔍</span> Chi tiết & Mẹo nhớ chữ
            </div>

            {selectedKana ? (
              <div className="flex flex-col items-center gap-3 text-center animate-fadeIn">
                <div className="w-24 h-24 rounded-2xl bg-torii/10 border-2 border-torii/40 flex items-center justify-center text-torii font-kanji text-5xl font-black shadow-inner">
                  {scriptType === 'hiragana' ? selectedKana.kana : selectedKana.kata}
                </div>

                <div>
                  <div className="text-xl font-black font-ui uppercase tracking-wide">
                    {selectedKana.romaji}
                  </div>
                  <div className="text-xs opacity-60">
                    {scriptType === 'hiragana' ? 'Hiragana' : 'Katakana'}: 「
                    {scriptType === 'hiragana' ? selectedKana.kana : selectedKana.kata}」
                  </div>
                </div>

                <button
                  onClick={() => {
                    playWaterDrop();
                    playJapaneseSpeech(selectedKana.kana);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-torii text-white font-bold text-xs shadow-sm hover:opacity-90 active:scale-95 transition-all"
                >
                  <span>🔊 Phát âm</span>
                </button>

                {selectedKana.tip && (
                  <div className="w-full p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-left">
                    <span className="font-bold text-amber-800 dark:text-amber-200 block mb-1">
                      💡 Mẹo ghi nhớ hình ảnh:
                    </span>
                    <p className="opacity-80 text-[11px] leading-relaxed">{selectedKana.tip}</p>
                  </div>
                )}

                {selectedKana.example && (
                  <div className="w-full p-3 rounded-2xl bg-washi border border-washi-border text-xs text-left">
                    <span className="font-bold opacity-70 block mb-1">Ví dụ từ vựng chứa chữ:</span>
                    <p className="font-kanji font-bold text-torii text-sm">{selectedKana.example}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center opacity-60 text-xs flex flex-col items-center gap-2">
                <span className="text-3xl">👈</span>
                <span>Nhấp vào bất kỳ chữ nào trong bảng để xem mẹo nhớ và nghe phát âm.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Kana Quiz Game View */}
      {category === 'quiz' && (
        <div className="w-full max-w-xl p-6 md:p-8 rounded-3xl karuta-card border-2 border-border-strong shadow-xl flex flex-col items-center gap-5 relative">
          <div className="karuta-inner-border" />

          <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10 text-xs">
            <span className="font-bold text-torii flex items-center gap-1.5">
              <span>⚡</span> Trắc nghiệm phản xạ Kana
            </span>
            <span className="font-bold opacity-70">
              Câu {quizIndex}/10 • Điểm: <strong className="text-torii">{quizScore}</strong>
            </span>
          </div>

          {!isQuizFinished && quizQuestion ? (
            <div className="w-full flex flex-col items-center gap-5 relative z-10">
              <div className="text-center">
                <span className="text-xs opacity-60 block mb-1">Chữ này đọc là gì?</span>
                <div className="w-28 h-28 mx-auto rounded-3xl bg-washi border-2 border-torii flex items-center justify-center text-6xl font-kanji font-black text-torii shadow-md">
                  {scriptType === 'hiragana'
                    ? quizQuestion.target.kana
                    : quizQuestion.target.kata}
                </div>
              </div>

              {/* 4 Choices */}
              <div className="w-full grid grid-cols-2 gap-3">
                {quizQuestion.options.map((opt, idx) => {
                  let btnColor = 'bg-washi/90 border-washi-border hover:border-torii/60';
                  if (quizFeedback) {
                    if (opt.romaji === quizQuestion.target.romaji) {
                      btnColor = 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-102';
                    } else {
                      btnColor = 'opacity-40 bg-washi border-washi-border';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerQuiz(opt)}
                      disabled={!!quizFeedback}
                      className={`py-3.5 px-4 rounded-2xl border text-base font-bold font-mono transition-all flex items-center justify-center ${btnColor}`}
                    >
                      {opt.romaji}
                    </button>
                  );
                })}
              </div>

              {quizFeedback && (
                <div
                  className={`text-sm font-bold animate-fadeIn ${
                    quizFeedback === 'correct' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {quizFeedback === 'correct' ? '🌸 Chính xác! +10 điểm' : '🍂 Sai rồi!'}
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="w-full flex flex-col items-center gap-4 py-6 relative z-10 text-center animate-fadeIn">
              <div className="hanko-seal text-center p-3 animate-bounce">
                💮 大変よくできました
              </div>
              <h3 className="text-xl font-black font-ui mt-2">HOÀN THÀNH BÀI PHẢN XẠ KANA!</h3>
              <p className="text-sm opacity-70">
                Bạn đạt được <strong className="text-torii text-lg">{quizScore} / 100</strong> điểm.
              </p>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={startQuiz}
                  className="px-5 py-2.5 rounded-xl bg-torii text-white font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition-all"
                >
                  🔄 Luyện lại lần nữa
                </button>
                <button
                  onClick={() => setCategory('seion')}
                  className="px-5 py-2.5 rounded-xl bg-washi border border-washi-border font-bold text-xs hover:border-torii transition-all"
                >
                  📖 Quay lại bảng chữ cái
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
