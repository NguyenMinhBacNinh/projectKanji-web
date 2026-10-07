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
    <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-fadeIn">
      {/* Top Bar: Selector & Level filter */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl karuta-card border border-washi-border shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎧</span>
          <div>
            <h3 className="text-xs sm:text-sm font-black font-ui uppercase tracking-wide text-torii">
              Luyện nghe phản xạ JLPT (聴解 - Choukai)
            </h3>
            <p className="text-[10px] opacity-70">
              Rèn đôi tai với kịch bản hội thoại thực tế & câu hỏi trắc nghiệm
            </p>
          </div>
        </div>

        {/* Level filter */}
        <div className="flex items-center gap-1 text-xs font-bold">
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
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedLevel === lvl
                  ? 'bg-torii text-white border-torii shadow-xs'
                  : 'kifuda-tab opacity-75 hover:opacity-100'
              }`}
            >
              {lvl === 'all' ? 'Tất cả' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Choukai Card */}
      <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl karuta-card border-2 border-border-strong shadow-xl flex flex-col gap-5 relative">
        <div className="karuta-inner-border" />

        {/* Card Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10 text-xs">
          <div className="flex items-center gap-2">
            <span className="hanko-stamp text-[10px] py-0.5 px-2">
              JLPT {currentDrill?.level}
            </span>
            <span className="font-bold text-color-sumi">
              Bài {drillIndex + 1}/{filteredDrills.length}: {currentDrill?.title}
            </span>
          </div>

          <span className="text-[11px] font-mono opacity-70">
            Điểm: <strong className="text-torii">{score}</strong>
          </span>
        </div>

        {/* Radio/Audio Player Console */}
        <div className="w-full p-4 rounded-2xl bg-washi/90 border border-washi-border flex flex-col gap-3 relative z-10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold opacity-75 flex items-center gap-1.5">
              <span>📻</span>
              <span>Bối cảnh: {currentDrill?.scenario}</span>
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <span className="opacity-60 mr-1">Tốc độ:</span>
              <button
                onClick={() => setPlaybackSpeed(0.7)}
                className={`px-2 py-0.5 rounded-lg border transition-all ${
                  playbackSpeed === 0.7
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'bg-washi border-washi-border opacity-70'
                }`}
                title="Nghe chậm để bắt từ"
              >
                🐢 0.7x Chậm
              </button>
              <button
                onClick={() => setPlaybackSpeed(0.85)}
                className={`px-2 py-0.5 rounded-lg border transition-all ${
                  playbackSpeed === 0.85
                    ? 'bg-torii text-white border-torii'
                    : 'bg-washi border-washi-border opacity-70'
                }`}
                title="Tốc độ tự nhiên"
              >
                🐇 1.0x Chuẩn
              </button>
            </div>
          </div>

          {/* Audio Play Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={isPlaying ? handleStopAudio : handlePlayMainDialogue}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 ${
                isPlaying
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-torii hover:bg-torii-light text-white'
              }`}
            >
              <span>{isPlaying ? '⏹️' : '▶️'}</span>
              <span>{isPlaying ? 'Đang phát (Bấm để dừng)' : 'Nghe đoạn hội thoại'}</span>
            </button>

            <button
              onClick={handlePlayFullAudio}
              className="px-3.5 py-2.5 rounded-2xl bg-washi hover:bg-torii/15 text-torii border border-torii/40 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
              title="Nghe toàn bộ kèm lời dẫn và câu hỏi"
            >
              <span>🎙️</span>
              <span className="hidden sm:inline">Nghe kèm lời dẫn</span>
            </button>
          </div>
        </div>

        {/* Question & Choices */}
        <div className="w-full flex flex-col gap-3 relative z-10">
          <div className="font-bold text-sm sm:text-base text-color-sumi leading-snug">
            ❓ {currentDrill?.question}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentDrill?.options.map((opt, idx) => {
              let btnStyle = 'bg-washi/90 border-washi-border hover:border-torii/60';
              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md font-black';
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
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all text-left flex items-start gap-2.5 ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation & Transcript Accordion (Hiện sau khi trả lời hoặc người dùng bấm xem) */}
        {isAnswered && (
          <div className="w-full flex flex-col gap-3 p-4 rounded-2xl bg-washi/95 border border-washi-border animate-fadeIn relative z-10 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-washi-border/70">
              <span className="font-extrabold text-torii flex items-center gap-1.5">
                <span>💡</span> Giải thích & Từ khóa trọng tâm:
              </span>
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-[11px] font-bold text-torii hover:underline"
              >
                {showTranscript ? 'Ẩn kịch bản ▲' : 'Xem toàn bộ lời thoại (Transcript) ▼'}
              </button>
            </div>

            <p className="leading-relaxed opacity-85 font-medium">
              {currentDrill?.explanation}
            </p>

            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] opacity-60 font-bold uppercase">Từ khóa:</span>
              {currentDrill?.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-[10px] font-bold"
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Transcript Dropdown */}
            {showTranscript && (
              <div className="mt-2 pt-2 border-t border-washi-border/70 flex flex-col gap-2 animate-fadeIn">
                <div className="p-3 bg-washi rounded-xl border border-washi-border/80 font-kanji whitespace-pre-line leading-relaxed text-xs">
                  <div className="text-[10px] font-bold text-torii mb-1 uppercase font-ui">Lời thoại tiếng Nhật:</div>
                  {currentDrill?.audioScript}
                </div>
                <div className="p-3 bg-washi rounded-xl border border-washi-border/80 whitespace-pre-line leading-relaxed text-[11px] opacity-80">
                  <div className="text-[10px] font-bold text-torii mb-1 uppercase">Dịch nghĩa tiếng Việt:</div>
                  {currentDrill?.transcriptVn}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation Controls */}
        <div className="w-full flex items-center justify-between pt-2 border-t border-washi-border relative z-10">
          <button
            onClick={handlePrevDrill}
            className="py-2 px-4 karuta-card border border-washi-border rounded-xl text-xs font-bold active:scale-95 transition-all"
          >
            ← Bài trước
          </button>

          <span className="text-xs opacity-60">
            {drillIndex + 1} / {filteredDrills.length}
          </span>

          <button
            onClick={handleNextDrill}
            className="py-2 px-5 bg-torii hover:bg-torii-light text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all"
          >
            Bài tiếp theo →
          </button>
        </div>
      </div>
    </div>
  );
}
