'use client';

import { useState, useMemo } from 'react';
import { LISTENING_DRILLS } from '../lib/listeningData';
import {
  playWoodClapper,
  playWaterDrop,
  playQuizSuccess,
  playQuizError,
  playHankoStamp,
} from '../lib/traditionalAudio';

export default function ListeningSection() {
  const [selectedLevel, setSelectedLevel] = useState('all'); // 'all' | 'N5' | 'N4' | 'N3'
  const [drillIndex, setDrillIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.85); // 0.85 (bình thường) hoặc 0.7 (chậm)
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [score, setScore] = useState(0);

  // Filter drills by level
  const filteredDrills = useMemo(() => {
    if (selectedLevel === 'all') return LISTENING_DRILLS;
    return LISTENING_DRILLS.filter((d) => d.level === selectedLevel);
  }, [selectedLevel]);

  const currentDrill = filteredDrills[drillIndex] || filteredDrills[0];

  // Play audio speech via SpeechSynthesis
  const playAudio = (text, rate = playbackSpeed) => {
    if (typeof window === 'undefined') return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = rate;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlayMainDialogue = () => {
    playWaterDrop();
    playAudio(currentDrill.speakerJp, playbackSpeed);
  };

  const handlePlayFullAudio = () => {
    playWaterDrop();
    playAudio(currentDrill.audioScript, playbackSpeed);
  };

  const handleStopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = currentDrill.options[idx].isCorrect;
    if (isCorrect) {
      playQuizSuccess();
      setScore((s) => s + 10);
      playHankoStamp();
    } else {
      playQuizError();
    }
  };

  const handleNextDrill = () => {
    handleStopAudio();
    playWoodClapper();
    setSelectedOption(null);
    setIsAnswered(false);
    setShowTranscript(false);
    setDrillIndex((prev) => (prev < filteredDrills.length - 1 ? prev + 1 : 0));
  };

  const handlePrevDrill = () => {
    handleStopAudio();
    playWoodClapper();
    setSelectedOption(null);
    setIsAnswered(false);
    setShowTranscript(false);
    setDrillIndex((prev) => (prev > 0 ? prev - 1 : filteredDrills.length - 1));
  };

  return (
    <div className="w-full max-w-[1020px] 2xl:max-w-6xl h-full min-h-0 flex-1 flex flex-col items-center justify-between gap-1 sm:gap-1.5 z-20 animate-fadeIn select-none overflow-hidden">
      {/* Top Bar: Selector & Level filter */}
      <div className="w-full flex items-center justify-between gap-2 p-1 sm:p-1.5 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700/80 shadow-md backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg">🎧</span>
          <div>
            <h3 className="text-xs font-black font-ui uppercase tracking-wide text-torii">
              Luyện nghe Choukai (聴解)
            </h3>
            <p className="text-[10px] opacity-70 hidden sm:block">
              Rèn phản xạ thính giác với hội thoại thực tế & trắc nghiệm JLPT
            </p>
          </div>
        </div>

        {/* Level filter */}
        <div className="flex items-center gap-1 text-xs font-bold shrink-0">
          {['all', 'N5', 'N4', 'N3'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                playWoodClapper();
                setSelectedLevel(lvl);
                setDrillIndex(0);
                setSelectedOption(null);
                setIsAnswered(false);
                setShowTranscript(false);
              }}
              className={`py-1 px-2.5 rounded-xl border transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-torii text-white border-torii shadow-xs font-black'
                  : 'bg-[#F5EFE6] dark:bg-[#1E2633] text-stone-700 dark:text-stone-300 border-[#E3DACB] dark:border-stone-700 hover:bg-[#EAE1D2] dark:hover:bg-stone-800'
              }`}
            >
              {lvl === 'all' ? 'Tất cả' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Choukai Card */}
      <div className="w-full flex-1 min-h-0 karuta-card rounded-2xl sm:rounded-3xl border border-[#D8CEBF] dark:border-stone-700/80 bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 shadow-md p-2.5 sm:p-4 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
        <div className="karuta-inner-border" />

        {/* Card Header */}
        <div className="w-full flex items-center justify-between pb-1 border-b border-washi-border/60 relative z-10 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-torii text-white font-black text-[10px]">
              JLPT {currentDrill?.level}
            </span>
            <span className="font-bold text-stone-900 dark:text-stone-100 text-xs">
              Bài {drillIndex + 1}/{filteredDrills.length}: {currentDrill?.title}
            </span>
          </div>

          <span className="text-[11px] font-mono opacity-70">
            Điểm: <strong className="text-torii">{score}</strong>
          </span>
        </div>

        {/* Scrollable Card Body */}
        <div className="w-full flex-1 min-h-0 overflow-y-auto thin-scrollbar flex flex-col justify-between py-1.5 gap-2 relative z-10">
          {/* Radio/Audio Player Console */}
          <div className="w-full p-2.5 sm:p-3 rounded-xl bg-[#F5EFE6]/90 dark:bg-stone-850 border border-washi-border flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold opacity-75 flex items-center gap-1.5 text-[11px]">
                <span>📻</span>
                <span>Bối cảnh: {currentDrill?.scenario}</span>
              </span>
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <span className="opacity-60 mr-1 hidden sm:inline">Tốc độ:</span>
                <button
                  onClick={() => setPlaybackSpeed(0.7)}
                  className={`px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                    playbackSpeed === 0.7
                      ? 'bg-amber-500 text-white border-amber-600 font-bold'
                      : 'bg-washi border-washi-border opacity-70'
                  }`}
                  title="Nghe chậm để bắt từ"
                >
                  🐢 0.7x
                </button>
                <button
                  onClick={() => setPlaybackSpeed(0.85)}
                  className={`px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                    playbackSpeed === 0.85
                      ? 'bg-torii text-white border-torii font-bold'
                      : 'bg-washi border-washi-border opacity-70'
                  }`}
                  title="Tốc độ tự nhiên"
                >
                  🐇 1.0x
                </button>
              </div>
            </div>

            {/* Audio Play Buttons */}
            <div className="flex items-center justify-center gap-2.5 pt-0.5">
              <button
                onClick={isPlaying ? handleStopAudio : handlePlayMainDialogue}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer ${
                  isPlaying
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-torii hover:bg-torii-light text-white'
                }`}
              >
                <span>{isPlaying ? '⏹️' : '▶️'}</span>
                <span>{isPlaying ? 'Dừng phát' : 'Nghe hội thoại'}</span>
              </button>

              <button
                onClick={handlePlayFullAudio}
                className="px-3 py-1.5 rounded-xl bg-[#FFFDF9] dark:bg-stone-800 hover:bg-torii/15 text-torii border border-torii/40 font-bold text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                title="Nghe toàn bộ kèm lời dẫn và câu hỏi"
              >
                <span>🎙️</span>
                <span>Kèm lời dẫn</span>
              </button>
            </div>
          </div>

          {/* Question & Choices */}
          <div className="w-full flex flex-col gap-2 shrink-0">
            <div className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 leading-snug">
              ❓ {currentDrill?.question}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              {currentDrill?.options.map((opt, idx) => {
                let btnStyle = 'bg-[#FFFDF9] dark:bg-stone-850 border-washi-border hover:border-torii/60';
                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-xs font-black';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-rose-500 text-white border-rose-600';
                  } else {
                    btnStyle = 'opacity-40 bg-washi border-washi-border';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`p-2 sm:p-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-left flex items-start gap-2 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-md bg-black/10 dark:bg-white/10 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation & Transcript Accordion */}
          {isAnswered && (
            <div className="w-full flex flex-col gap-2 p-2.5 rounded-xl bg-[#F5EFE6]/95 dark:bg-stone-850 border border-washi-border animate-fadeIn relative z-10 text-xs shrink-0">
              <div className="flex items-center justify-between pb-1 border-b border-washi-border/70">
                <span className="font-extrabold text-torii flex items-center gap-1 text-[11px]">
                  <span>💡</span> Giải thích & Trọng tâm:
                </span>
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-[10px] font-bold text-torii hover:underline cursor-pointer"
                >
                  {showTranscript ? 'Ẩn transcript ▲' : 'Xem kịch bản (Transcript) ▼'}
                </button>
              </div>

              <p className="leading-relaxed opacity-85 font-medium text-[11px]">
                {currentDrill?.explanation}
              </p>

              <div className="flex items-center gap-1 flex-wrap pt-0.5">
                <span className="text-[9px] opacity-60 font-bold uppercase">Từ khóa:</span>
                {currentDrill?.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-[10px] font-bold"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {/* Transcript Dropdown */}
              {showTranscript && (
                <div className="mt-1 pt-1 border-t border-washi-border/70 flex flex-col gap-1.5 animate-fadeIn">
                  <div className="p-2 bg-washi dark:bg-stone-800 rounded-lg border border-washi-border/80 font-kanji whitespace-pre-line leading-relaxed text-[11px]">
                    <div className="text-[9px] font-bold text-torii mb-0.5 uppercase font-ui">Lời thoại tiếng Nhật:</div>
                    {currentDrill?.audioScript}
                  </div>
                  <div className="p-2 bg-washi dark:bg-stone-800 rounded-lg border border-washi-border/80 whitespace-pre-line leading-relaxed text-[10px] opacity-80">
                    <div className="text-[9px] font-bold text-torii mb-0.5 uppercase">Dịch nghĩa:</div>
                    {currentDrill?.transcriptVn}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="w-full flex items-center justify-between pt-1.5 border-t border-washi-border/60 relative z-10 shrink-0 text-xs">
          <button
            onClick={handlePrevDrill}
            className="py-1 px-3.5 karuta-card border border-washi-border rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer"
          >
            ← Bài trước
          </button>

          <span className="text-[11px] opacity-60">
            {drillIndex + 1} / {filteredDrills.length}
          </span>

          <button
            onClick={handleNextDrill}
            className="py-1 px-4 bg-torii hover:bg-torii-light text-white rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            Bài tiếp theo →
          </button>
        </div>
      </div>
    </div>
  );
}
