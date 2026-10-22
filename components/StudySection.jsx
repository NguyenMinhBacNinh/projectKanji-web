'use client';

import { useState, useRef, useEffect } from 'react';
import { playJapaneseSpeech } from '../lib/kanjiService';
import {
  playWoodClapper,
  playWaterDrop,
  playHankoStamp,
  playTempleBell,
} from '../lib/traditionalAudio';
import RadicalBreakdownCard from './RadicalBreakdownCard';
import KanjiIllustrationBox from './KanjiIllustrationBox';
import PitchAccentVisual from './PitchAccentVisual';
import FloatingIslandDock from './FloatingIslandDock';
import {
  VolumeIcon,
  BrushIcon,
  RadicalIcon,
  MicShadowingIcon,
  WorksheetIcon,
  StatsIcon,
  MoreHorizontalIcon,
  ShuffleIcon,
  GridIcon,
  ToriiShrineIcon,
  BambooIcon,
  MnemonicIcon,
  ScrollUnfurledIcon,
  SensuFanIcon,
} from './ZenIcons';

export default function StudySection({
  levels,
  currentLevel,
  onChangeLevel,
  kanjiList,
  currentIndex,
  currentChar,
  cardInfo,
  isFlipped,
  setIsFlipped,
  isShuffled,
  onToggleShuffle,
  onPrevCard,
  onNextCard,
  onMarkForgotten,
  onMarkMastered,
  onOpenGridModal,
  onOpenPracticeModal,
  onOpenRadicalModal,
  onOpenVocabModal,
  onOpenMnemonicModal,
  onOpenExampleModal,
  onOpenVoiceShadowing,
  onOpenWorksheetModal,
  onOpenStatsModal,
  onSrsReview,
  dueCount = 0,
  isMastered = false,
  isAnalysisMode = true,
  onToggleAnalysisMode,
  fullDb = null,
}) {
  const showFurigana = true;
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const toolsMenuRef = useRef(null);
  // studioTab: 'bento' (Default Asymmetric Bento Grid) | 'vocab' | 'radical' | 'mnemonic' | 'example'
  const [studioTab, setStudioTab] = useState('bento');

  // Close tools popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setToolsMenuOpen(false);
      }
    }
    if (toolsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toolsMenuOpen]);

  const total = kanjiList?.length || 0;
  const progressPercent = total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;
  const vocabList = cardInfo?.vocab || [];
  const vocabCount = vocabList.length;
  const heroVocab = vocabList[0] || null;
  const secondaryVocab = vocabList.slice(1, 4);

  // Open modal for current active tab
  const handleOpenCurrentTabModal = () => {
    playWoodClapper();
    if (studioTab === 'vocab' || studioTab === 'bento') {
      if (onOpenVocabModal) onOpenVocabModal();
    } else if (studioTab === 'radical') {
      if (onOpenRadicalModal) onOpenRadicalModal();
    } else if (studioTab === 'mnemonic') {
      if (onOpenMnemonicModal) onOpenMnemonicModal();
    } else if (studioTab === 'example') {
      if (onOpenExampleModal) onOpenExampleModal();
    }
  };

  return (
    <section className="w-full max-w-7xl 2xl:max-w-[1440px] flex flex-col items-center gap-1.5 sm:gap-2 flex-1 min-h-0 z-20">
      {/* 1. TOP STUDIO COMMAND DECK (Modern Kyoto Zen & Muji-esque Luxury) */}
      <div className="w-full flex flex-wrap lg:flex-nowrap items-center justify-between gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-2xl bg-white/75 dark:bg-[#151C28]/75 border border-stone-200/70 dark:border-stone-800/80 shadow-[0_4px_20px_-4px_rgba(45,38,28,0.03)] backdrop-blur-xl shrink-0 relative z-30">
        {/* Left: Kifuda Level Tabs */}
        <div className="flex items-center gap-1 shrink-0">
          {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => {
            const count = levels[lvl]?.length || 0;
            const isActive = currentLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => {
                  playWoodClapper();
                  onChangeLevel(lvl);
                }}
                className={`py-1 px-2 sm:px-2.5 rounded-xl text-xs font-bold transition-all text-center relative flex items-center gap-1 shrink-0 border cursor-pointer ${
                  isActive
                    ? 'bg-[#BC002D] text-white border-[#9B0024] shadow-xs scale-[1.02]'
                    : 'bg-stone-100/70 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200/80 dark:border-stone-700/80 hover:bg-stone-200/70 dark:hover:bg-stone-750'
                }`}
              >
                <span>{lvl}</span>
                <span
                  className={`text-[10px] ${
                    isActive ? 'text-white/85' : 'text-stone-400 dark:text-stone-500 font-medium'
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Center: Minimalist Progress & Counter */}
        <div className="flex items-center gap-2 px-1 shrink-0">
          <span className="text-[#BC002D] dark:text-rose-400 font-bold font-mono text-[11px] px-2 py-0.5 rounded-lg border border-stone-200/80 dark:border-stone-700/80 bg-stone-100/80 dark:bg-stone-800/80">
            {total > 0 ? currentIndex + 1 : 0}/{total}
          </span>
          <div className="w-16 sm:w-24 h-1.5 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-800">
            <div
              className="h-full bg-[#BC002D] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <button
            onClick={() => {
              playWoodClapper();
              onToggleShuffle();
            }}
            className={`p-1 rounded-lg border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
              isShuffled
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200/80 dark:border-stone-700/80 hover:bg-stone-100'
            }`}
            title="Xáo trộn danh sách học"
          >
            <ShuffleIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Studio Instruments (Hairline Buttons) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 justify-end ml-auto lg:ml-0 flex-wrap">
          {/* Tập viết [W] */}
          <button
            id="practice-modal-button"
            onClick={() => {
              playWoodClapper();
              if (onOpenPracticeModal) onOpenPracticeModal();
            }}
            className="py-1 px-2.5 rounded-xl bg-white/80 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700/80 text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 shadow-2xs active:scale-95 group cursor-pointer"
            title="Tập viết & Thứ tự nét bút KanjiVG [W]"
          >
            <BrushIcon className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400 group-hover:text-[#BC002D] transition-colors" />
            <span>Tập viết</span>
            <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400 border border-stone-200/80 dark:border-stone-600">
              W
            </kbd>
          </button>

          {/* Bộ thủ [R] */}
          <button
            id="radical-modal-button"
            onClick={() => {
              playWoodClapper();
              if (onOpenRadicalModal) onOpenRadicalModal();
            }}
            className="py-1 px-2.5 rounded-xl bg-white/80 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700/80 text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 shadow-2xs active:scale-95 group cursor-pointer"
            title="Tra cứu 214 Bộ thủ Hán tự [R]"
          >
            <RadicalIcon className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400 group-hover:text-[#BC002D] transition-colors" />
            <span>Bộ thủ</span>
            <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400 border border-stone-200/80 dark:border-stone-600">
              R
            </kbd>
          </button>

          {/* Tiện ích Popover */}
          <div className="relative" ref={toolsMenuRef}>
            <button
              id="tools-menu-button"
              onClick={() => {
                playWoodClapper();
                setToolsMenuOpen(!toolsMenuOpen);
              }}
              className={`py-1 px-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 active:scale-95 cursor-pointer ${
                toolsMenuOpen
                  ? 'border-[#BC002D] bg-[#BC002D]/10 text-[#BC002D] dark:text-rose-400'
                  : 'bg-white/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-stone-200/80 dark:border-stone-700/80 hover:bg-stone-100 shadow-2xs'
              }`}
              title="Công cụ mở rộng (Shadowing, In A4, Thống kê)"
            >
              <MoreHorizontalIcon className="w-3.5 h-3.5 text-stone-500" />
              <span>Tiện ích</span>
              <span
                className={`text-[10px] leading-none transition-transform duration-200 ${
                  toolsMenuOpen ? 'rotate-180' : ''
                }`}
              >
                ▾
              </span>
            </button>

            {toolsMenuOpen && (
              <div
                id="tools-menu-dropdown"
                className="absolute right-0 top-full mt-2 w-52 bg-white/95 dark:bg-[#161D27]/95 border border-stone-200/90 dark:border-stone-700/90 rounded-2xl shadow-xl p-1.5 z-50 flex flex-col gap-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100"
              >
                <button
                  onClick={() => {
                    playWaterDrop();
                    setToolsMenuOpen(false);
                    if (onOpenVoiceShadowing) onOpenVoiceShadowing();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <MicShadowingIcon className="w-4 h-4 text-[#BC002D] dark:text-rose-400" />
                  <span>Luyện phát âm AI</span>
                </button>
                <button
                  onClick={() => {
                    playWaterDrop();
                    setToolsMenuOpen(false);
                    if (onOpenWorksheetModal) onOpenWorksheetModal();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <WorksheetIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>In phiếu viết A4</span>
                </button>
                <button
                  onClick={() => {
                    playWoodClapper();
                    setToolsMenuOpen(false);
                    if (onOpenStatsModal) onOpenStatsModal();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <StatsIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Thống kê học tập</span>
                </button>
              </div>
            )}
          </div>

          {/* Mục lục Hán tự [G] */}
          <button
            onClick={() => {
              playWoodClapper();
              onOpenGridModal();
            }}
            className="py-1 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 shadow-xs active:scale-95 cursor-pointer"
            title="Mục lục 2136 Hán tự [G]"
          >
            <GridIcon className="w-3.5 h-3.5" />
            <span>Mục lục</span>
            <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/20 dark:bg-black/20 text-white/90 dark:text-black/90">
              G
            </kbd>
          </button>
        </div>
      </div>

      {/* 2. MAIN SPLIT STUDIO ARENA (50/50 Desktop Two-Column Zen Canvas) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 items-stretch flex-1 min-h-0">
        {/* ==================== CỘT TRÁI: THẺ KARUTA 3D LUXURY (6 CỘT) ==================== */}
        <div className="lg:col-span-6 flex flex-col gap-2 flex-1 min-h-0">
          {/* Double-Bezel Outer Shell Container */}
          <div
            className="w-full cursor-pointer perspective relative flex-1 min-h-[280px] sm:min-h-[320px] rounded-[28px] sm:rounded-[32px] p-1.5 sm:p-2 bg-stone-200/40 dark:bg-stone-900/40 ring-1 ring-stone-200/70 dark:ring-stone-800/80 backdrop-blur-xl shadow-[0_10px_35px_-6px_rgba(45,38,28,0.04)] dark:shadow-[0_12px_40px_-6px_rgba(0,0,0,0.5)] transition-all duration-300"
            onClick={() => {
              playWoodClapper();
              setIsFlipped(!isFlipped);
            }}
          >
            <div
              className={`card-flip-inner rounded-[22px] sm:rounded-[26px] ${
                isFlipped ? 'is-flipped' : ''
              }`}
              style={{ height: '100%', width: '100%', position: 'relative' }}
            >
              {/* ========== CARD FRONT (MẶT TRƯỚC: THỰC THỂ THƯ PHÁP UY NGHIÊM) ========== */}
              <div className="card-face card-front absolute inset-0 w-full h-full rounded-[22px] sm:rounded-[26px] select-none bg-[#FFFDF9]/98 dark:bg-[#141B26]/98 border border-stone-200/80 dark:border-stone-800/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] overflow-hidden">
                <div className="w-full h-full p-3 sm:p-4 xl:p-5 flex flex-col justify-between relative z-10">
                  {/* Front Header */}
                  <div className="w-full flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-stone-800/60 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700/80 font-bold text-xs">
                        <ToriiShrineIcon className="w-3.5 h-3.5 text-[#BC002D]" />
                        <span>JLPT {currentLevel}</span>
                        <span className="opacity-40">|</span>
                        <span className="font-mono text-[11px] text-[#BC002D] dark:text-rose-400">
                          {total > 0 ? `${currentIndex + 1}/${total}` : '1'}
                        </span>
                      </div>

                      {dueCount > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#BC002D] text-white text-[10px] font-bold shadow-2xs">
                          Cần ôn: {dueCount}
                        </span>
                      )}

                      {cardInfo?.strokeCount && (
                        <span className="px-2.5 py-1 rounded-full bg-stone-100/70 dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 border border-stone-200/70 dark:border-stone-700/70 text-[10px] font-medium font-mono">
                          {cardInfo.strokeCount} nét
                          {cardInfo?.radical ? ` · Bộ ${cardInfo.radical}` : ''}
                        </span>
                      )}
                    </div>

                    {/* Quick Pronunciation Trigger */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playWaterDrop();
                        playJapaneseSpeech(currentChar);
                      }}
                      className="w-7 h-7 rounded-full bg-stone-100/80 dark:bg-stone-800/80 hover:bg-[#BC002D] hover:text-white text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                      title="Phát âm chữ Hán [A]"
                    >
                      <VolumeIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Center: Majestic Calligraphic Hero Display */}
                  <div className="my-auto py-1 sm:py-2 flex flex-col items-center justify-center text-center relative w-full">
                    {/* Furigana Ruby above Kanji */}
                    <div className="h-6 sm:h-7 flex items-center justify-center">
                      {showFurigana && cardInfo?.kun ? (
                        <span className="text-sm sm:text-base text-[#BC002D] dark:text-rose-400 font-bold font-kanji tracking-wider select-none animate-in fade-in duration-150">
                          {cardInfo.kun.split('、')[0].split('.')[0]}
                        </span>
                      ) : (
                        <span className="opacity-0 text-sm sm:text-base select-none pointer-events-none">&nbsp;</span>
                      )}
                    </div>

                    {/* Chữ Hán chính với Font Shippori Mincho Thư Pháp Uy Nghiêm */}
                    <span className="text-7xl sm:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] font-kanji font-black leading-none text-stone-900 dark:text-white select-none transition-transform duration-300 hover:scale-[1.03] drop-shadow-sm py-1">
                      {currentChar}
                    </span>

                    {/* Nghĩa Hán Việt Uy Nghiêm */}
                    <div className="mt-2 flex items-center justify-center">
                      <div className="text-2xl sm:text-3xl xl:text-4xl font-black text-[#8B0000] dark:text-rose-400 font-kanji tracking-[0.25em] uppercase">
                        {cardInfo?.hanViet || '—'}
                      </div>
                    </div>

                    {/* Ý nghĩa tiếng Việt thanh lịch */}
                    <div className="mt-1.5 px-4 py-1.5 rounded-full bg-stone-100/70 dark:bg-stone-850/70 border border-stone-200/70 dark:border-stone-700/70 text-xs sm:text-sm font-medium font-serif text-stone-800 dark:text-stone-200 max-w-md mx-auto text-center leading-relaxed">
                      「 {cardInfo?.meaning || 'Đang cập nhật...'} 」
                    </div>
                  </div>

                  {/* Bottom: Refined On / Kun Hairline Cards */}
                  <div className="w-full pt-2.5 pb-0.5 border-t border-stone-200/60 dark:border-stone-800/60 grid grid-cols-2 gap-2 text-left shrink-0">
                    {/* Âm ON */}
                    <div className="p-2 sm:p-2.5 rounded-2xl bg-white/70 dark:bg-stone-850/70 border border-stone-200/80 dark:border-stone-800/80 shadow-2xs select-none">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-[#BC002D] text-white">
                          ÂM ON (音)
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold font-kanji text-stone-900 dark:text-stone-100 mt-1 block truncate">
                        {cardInfo?.on || '—'}
                      </span>
                    </div>

                    {/* Âm KUN */}
                    <div className="p-2 sm:p-2.5 rounded-2xl bg-white/70 dark:bg-stone-850/70 border border-stone-200/80 dark:border-stone-800/80 shadow-2xs select-none">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-[#C27803] text-white">
                          ÂM KUN (訓)
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold font-kanji text-[#8B0000] dark:text-rose-400 mt-1 block truncate">
                        {cardInfo?.kun || '—'}
                      </span>
                    </div>
                  </div>

                  {/* Flip Hint */}
                  <div className="text-center text-[10px] font-medium text-stone-400 dark:text-stone-500 pt-1 flex items-center justify-center gap-1.5 shrink-0">
                    <span>Chạm hoặc bấm [Space] để lật giải nghĩa</span>
                    <span className="text-[#BC002D]">⟲</span>
                  </div>
                </div>
              </div>

              {/* ========== CARD BACK (MẶT SAU: GIẢI NGHĨA TOÀN DIỆN & SRS) ========== */}
              <div className="card-face card-back absolute inset-0 w-full h-full rounded-[22px] sm:rounded-[26px] select-none bg-[#FFFDF9]/98 dark:bg-[#141B26]/98 border border-stone-200/80 dark:border-stone-800/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] overflow-hidden">
                <div
                  className="w-full h-full p-4 sm:p-5 flex flex-col justify-between overflow-y-auto relative z-10 thin-scrollbar"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Back Header */}
                  <div className="w-full flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-stone-800/60 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl sm:text-4xl font-kanji font-black text-[#8B0000] dark:text-rose-400 leading-none">
                        {currentChar}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base sm:text-lg text-stone-900 dark:text-white font-serif">
                            {cardInfo?.hanViet}
                          </span>
                          <span className="px-2 py-0.5 rounded-full border border-stone-200/80 dark:border-stone-700/80 bg-stone-100/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 text-[10px] font-bold">
                            JLPT {currentLevel}
                          </span>
                        </div>
                        <span className="text-xs text-stone-600 dark:text-stone-300 font-medium block truncate max-w-[220px] sm:max-w-[280px]">
                          {cardInfo?.meaning}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Radical Breakdown Mini-Widget */}
                  <div className="my-1.5 shrink-0">
                    <RadicalBreakdownCard
                      currentChar={currentChar}
                      cardInfo={cardInfo}
                      onOpenRadicalModal={onOpenRadicalModal}
                      fullDb={fullDb}
                    />
                  </div>

                  {/* Mnemonic Illustration Box */}
                  <div
                    className="my-1 shrink-0 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenMnemonicModal) onOpenMnemonicModal();
                    }}
                    title="Nhấp để mở popup mẹo nhớ to rõ [M]"
                  >
                    <KanjiIllustrationBox currentChar={currentChar} cardInfo={cardInfo} variant="back" />
                  </div>

                  {/* SRS Repetition Response Buttons */}
                  <div className="my-2 p-3 rounded-2xl bg-stone-100/60 dark:bg-stone-850/60 border border-stone-200/70 dark:border-stone-800/70 shrink-0">
                    <div className="flex items-center justify-between mb-2 px-0.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#BC002D] dark:text-rose-400 flex items-center gap-1.5">
                        <span>🔁</span> ĐÁNH GIÁ GHI NHỚ (SRS)
                      </span>
                      <span className="text-[10px] font-medium text-stone-400 dark:text-stone-500">
                        Lặp lại ngắt quãng
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSrsReview) onSrsReview(1);
                        }}
                        className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#BC002D] hover:bg-[#9B0024] text-white border border-[#9B0024] shadow-xs transition-all font-bold active:scale-95 cursor-pointer"
                        title="Chưa nhớ - Học lại sau 10 phút"
                      >
                        <span className="text-xs">Quên</span>
                        <span className="text-[9px] font-medium opacity-90">10p</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSrsReview) onSrsReview(2);
                        }}
                        className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#C27803] hover:bg-[#A06302] text-white border border-[#A06302] shadow-xs transition-all font-bold active:scale-95 cursor-pointer"
                        title="Khó - Ôn lại sau 1 ngày"
                      >
                        <span className="text-xs">Khó</span>
                        <span className="text-[9px] font-medium opacity-90">1 ngày</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSrsReview) onSrsReview(3);
                        }}
                        className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#2D6A4F] hover:bg-[#23533E] text-white border border-[#1B4332] shadow-xs transition-all font-bold active:scale-95 cursor-pointer"
                        title="Tốt - Ôn lại sau 3 ngày"
                      >
                        <span className="text-xs">Tốt</span>
                        <span className="text-[9px] font-medium opacity-90">3 ngày</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSrsReview) onSrsReview(4);
                        }}
                        className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white border border-[#1E40AF] shadow-xs transition-all font-bold active:scale-95 cursor-pointer"
                        title="Dễ - Ôn lại sau 7 ngày"
                      >
                        <span className="text-xs">Dễ</span>
                        <span className="text-[9px] font-medium opacity-90">7 ngày</span>
                      </button>
                    </div>
                  </div>

                  {/* Flip Back Hint */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      playWoodClapper();
                      setIsFlipped(false);
                    }}
                    className="pt-2 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400 shrink-0 cursor-pointer hover:text-[#BC002D] dark:hover:text-rose-400 transition-colors py-1 group/flipback"
                    title="Chạm để lật lại mặt trước"
                  >
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="text-[#BC002D] dark:text-rose-400 group-hover/flipback:rotate-180 transition-transform">
                        ⟲
                      </span>
                      <span>Chạm để lật lại mặt trước</span>
                    </span>
                    <span className="font-bold text-[#BC002D] dark:text-rose-400">
                      JLPT {currentLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== CỘT PHẢI: ASYMMETRIC BENTO GRID TRẠM TRI THỨC (6 CỘT) ==================== */}
        <div className="lg:col-span-6 flex flex-col gap-2 flex-1 min-h-0">
          <div className="w-full h-full min-h-[280px] sm:min-h-[320px] bg-white/70 dark:bg-[#151C28]/70 p-3 sm:p-4 rounded-[28px] sm:rounded-[32px] border border-stone-200/70 dark:border-stone-800/80 shadow-[0_10px_35px_-6px_rgba(45,38,28,0.04)] backdrop-blur-xl flex flex-col justify-between relative overflow-hidden flex-1 min-h-0">
            {/* Top Navigation Capsule: Switcher & Modal Trigger */}
            <div className="w-full flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-stone-800/60 gap-1.5 shrink-0 z-10">
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-stone-100/70 dark:bg-stone-850/70 border border-stone-200/70 dark:border-stone-750/70 text-xs font-bold flex-1 overflow-x-auto thin-scrollbar">
                {/* Tab: Bento Tri thức Tổng thể */}
                <button
                  onClick={() => {
                    playWaterDrop();
                    setStudioTab('bento');
                  }}
                  className={`py-1 px-2 sm:px-2.5 rounded-xl transition-all text-center flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    studioTab === 'bento'
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                  }`}
                  title="Bố cục Asymmetric Bento Grid tổng thể"
                >
                  <SensuFanIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Bento Grid</span>
                </button>

                {/* Tab: Từ ghép */}
                <button
                  onClick={() => {
                    playWaterDrop();
                    setStudioTab('vocab');
                  }}
                  className={`py-1 px-2 rounded-xl transition-all text-center flex items-center gap-1 cursor-pointer shrink-0 ${
                    studioTab === 'vocab'
                      ? 'bg-[#BC002D] text-white shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                  }`}
                  title="Tất cả từ ghép JLPT [V]"
                >
                  <BambooIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Từ ghép</span>
                  <span className="text-[10px] opacity-80">({vocabCount})</span>
                </button>

                {/* Tab: Bộ thủ */}
                <button
                  onClick={() => {
                    playWaterDrop();
                    setStudioTab('radical');
                  }}
                  className={`py-1 px-2 rounded-xl transition-all text-center flex items-center gap-1 cursor-pointer shrink-0 ${
                    studioTab === 'radical'
                      ? 'bg-[#BC002D] text-white shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                  }`}
                  title="Chiết tự & Bộ thủ cấu thành [R]"
                >
                  <RadicalIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Bộ thủ</span>
                </button>

                {/* Tab: Mẹo nhớ */}
                <button
                  onClick={() => {
                    playWaterDrop();
                    setStudioTab('mnemonic');
                  }}
                  className={`py-1 px-2 rounded-xl transition-all text-center flex items-center gap-1 cursor-pointer shrink-0 ${
                    studioTab === 'mnemonic'
                      ? 'bg-[#BC002D] text-white shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                  }`}
                  title="Mẹo nhớ & Tranh minh họa [M]"
                >
                  <MnemonicIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Mẹo nhớ</span>
                </button>

                {/* Tab: Ví dụ */}
                <button
                  onClick={() => {
                    playWaterDrop();
                    setStudioTab('example');
                  }}
                  className={`py-1 px-2 rounded-xl transition-all text-center flex items-center gap-1 cursor-pointer shrink-0 ${
                    studioTab === 'example'
                      ? 'bg-[#BC002D] text-white shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                  }`}
                  title="Câu ví dụ thực tế [E]"
                >
                  <ScrollUnfurledIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Ví dụ</span>
                </button>
              </div>

              {/* Popup Modal Launcher */}
              <button
                onClick={handleOpenCurrentTabModal}
                className="py-1.5 px-2.5 rounded-xl bg-white/80 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/80 shadow-2xs active:scale-95 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0 transition-all"
                title="Mở tab hiện tại thành Popup riêng biệt"
              >
                <span>⛶</span>
                <span className="hidden sm:inline">Popup</span>
              </button>
            </div>

            {/* TAB CONTENT CONTAINER */}
            <div className="flex-1 flex flex-col min-h-0 pt-2 relative z-10 overflow-y-auto thin-scrollbar">
              {/* ========================================================================= */}
              {/* VIEW 1: ASYMMETRIC BENTO GRID (Hero Compound + Secondary + Radical + Mnemonic) */}
              {/* ========================================================================= */}
              {studioTab === 'bento' && (
                <div className="w-full flex-1 flex flex-col gap-2 animate-in fade-in duration-200">
                  {/* BENTO TILE 1 (HERO): TỪ GHÉP QUAN TRỌNG NHẤT VỚI BIỂU ĐỒ CAO ĐỘ PITCH ACCENT */}
                  {heroVocab ? (
                    <div
                      onClick={() => {
                        playWaterDrop();
                        playJapaneseSpeech(heroVocab.word || heroVocab.reading);
                      }}
                      className="p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-stone-850/90 border border-stone-200/80 dark:border-stone-800/80 shadow-[0_4px_16px_-2px_rgba(45,38,28,0.03)] hover:border-[#BC002D]/50 transition-all group cursor-pointer relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-2">
                        {/* Left: Eyebrow + Kanji + Ruby Furigana */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#BC002D] dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                              TỪ GHÉP TIÊU BIỂU
                            </span>
                            <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono">
                              JLPT {currentLevel}
                            </span>
                          </div>

                          <div className="font-kanji text-xl sm:text-2xl font-black text-stone-900 dark:text-white group-hover:text-[#BC002D] dark:group-hover:text-rose-400 transition-colors leading-snug">
                            {showFurigana && heroVocab.reading ? (
                              <ruby className="ruby-furigana">
                                {heroVocab.word}
                                <rt className="ruby-rt text-[#BC002D] dark:text-rose-400 font-bold">
                                  {heroVocab.reading}
                                </rt>
                              </ruby>
                            ) : (
                              heroVocab.word
                            )}
                          </div>

                          <p className="text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 mt-1 line-clamp-2">
                            {heroVocab.meaning_vi || heroVocab.vn}
                          </p>
                        </div>

                        {/* Right: Tokyo Pitch Accent Contour Graph & Audio Button */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playWaterDrop();
                              playJapaneseSpeech(heroVocab.word || heroVocab.reading);
                            }}
                            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-[#BC002D] hover:text-white text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-center transition-all cursor-pointer shadow-2xs group-hover:scale-105"
                            title="Nghe phát âm từ ghép"
                          >
                            <VolumeIcon className="w-4 h-4" />
                          </button>

                          {/* NHK Pitch Accent Visual Curve */}
                          <PitchAccentVisual
                            word={heroVocab.word}
                            reading={heroVocab.reading}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* BENTO ROW: 2 SUB-TILES (Lưới từ vựng phụ & Chiết tự) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    {/* BENTO TILE 2: LƯỚI TỪ VỰNG PHỤ (sm:col-span-6) */}
                    <div className="sm:col-span-6 p-2.5 sm:p-3 rounded-2xl bg-white/70 dark:bg-stone-850/70 border border-stone-200/70 dark:border-stone-800/80 flex flex-col justify-between gap-1.5">
                      <div className="flex items-center justify-between pb-1 border-b border-stone-200/60 dark:border-stone-800/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-1">
                          <BambooIcon className="w-3 h-3 text-[#BC002D]" />
                          <span>Từ ghép khác</span>
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          +{Math.max(0, vocabCount - 1)} từ
                        </span>
                      </div>

                      {secondaryVocab.length > 0 ? (
                        <div className="flex flex-col gap-1.5 flex-1 justify-center py-0.5">
                          {secondaryVocab.map((v, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                playWaterDrop();
                                playJapaneseSpeech(v.word || v.reading);
                              }}
                              className="px-2 py-1 rounded-xl bg-stone-50/80 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/60 dark:border-stone-750/60 flex items-center justify-between gap-1.5 transition-colors cursor-pointer group/sec"
                            >
                              <div className="flex-1 truncate">
                                <span className="font-kanji font-bold text-xs text-stone-900 dark:text-stone-100 group-hover/sec:text-[#BC002D]">
                                  {v.word}
                                </span>
                                <span className="text-[10px] text-stone-500 dark:text-stone-400 ml-1.5 truncate">
                                  {v.meaning_vi || v.vn}
                                </span>
                              </div>
                              <PitchAccentVisual
                                word={v.word}
                                reading={v.reading}
                                compact={true}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[11px] text-stone-400 py-3 text-center">
                          Chưa có thêm từ ghép
                        </div>
                      )}

                      <button
                        onClick={() => {
                          playWoodClapper();
                          if (onOpenVocabModal) onOpenVocabModal();
                        }}
                        className="text-[10px] font-bold text-[#BC002D] dark:text-rose-400 hover:underline pt-1 text-right block cursor-pointer"
                      >
                        Xem tất cả {vocabCount} từ vựng →
                      </button>
                    </div>

                    {/* BENTO TILE 3: CHIẾT TỰ & BỘ THỦ CẤU THÀNH (sm:col-span-6) */}
                    <div className="sm:col-span-6 p-2.5 sm:p-3 rounded-2xl bg-white/70 dark:bg-stone-850/70 border border-stone-200/70 dark:border-stone-800/80 flex flex-col justify-between gap-1.5">
                      <div className="flex items-center justify-between pb-1 border-b border-stone-200/60 dark:border-stone-800/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-1">
                          <RadicalIcon className="w-3 h-3 text-amber-600" />
                          <span>Chiết tự Hán tự</span>
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300">
                          214 Bộ
                        </span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center">
                        <RadicalBreakdownCard
                          currentChar={currentChar}
                          cardInfo={cardInfo}
                          onOpenRadicalModal={onOpenRadicalModal}
                          fullDb={fullDb}
                        />
                      </div>

                      <button
                        onClick={() => {
                          playWoodClapper();
                          if (onOpenRadicalModal) onOpenRadicalModal();
                        }}
                        className="text-[10px] font-bold text-amber-700 dark:text-amber-300 hover:underline pt-1 text-right block cursor-pointer"
                      >
                        Bảng tra cứu 214 Bộ thủ [R] →
                      </button>
                    </div>
                  </div>

                  {/* BENTO TILE 4: MẸO NHỚ TRANH MINH HỌA NHƯ TRANG SÁCH NGHỆ THUẬT */}
                  <div
                    onClick={() => {
                      playWoodClapper();
                      if (onOpenMnemonicModal) onOpenMnemonicModal();
                    }}
                    className="p-3 rounded-2xl bg-stone-50/80 dark:bg-stone-850/80 border border-stone-200/70 dark:border-stone-800/80 hover:border-amber-500/40 transition-all cursor-pointer group"
                    title="Nhấp để xem tranh minh họa to rõ [M]"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1">
                        <MnemonicIcon className="w-3.5 h-3.5 text-amber-600" />
                        <span>Mẹo ghi nhớ nghệ thuật</span>
                      </span>
                      <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold group-hover:underline">
                        Mở to [M] ➔
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80 shrink-0 overflow-hidden shadow-2xs">
                        <KanjiIllustrationBox
                          currentChar={currentChar}
                          cardInfo={cardInfo}
                          variant="back"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-stone-700 dark:text-stone-300 font-serif italic leading-relaxed line-clamp-2">
                          {cardInfo?.mnemonic ||
                            'Kết nối hình ảnh tượng hình với câu chuyện ý nghĩa giúp khắc sâu chữ Hán vào trí nhớ dài hạn.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* VIEW 2: DEDICATED FULL VOCABULARY LIST */}
              {/* ========================================================================= */}
              {studioTab === 'vocab' && (
                <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-150 gap-2">
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center justify-between pb-1.5 shrink-0">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#BC002D]" />
                        <span>Từ ghép chứa 「{currentChar}」</span>
                      </span>
                      <span className="text-[10px] font-medium text-[#BC002D] dark:text-rose-400">
                        chạm để nghe phát âm 🔊
                      </span>
                    </div>

                    {vocabList.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-0.5 content-start auto-rows-min py-0.5">
                        {vocabList.map((v, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              playWaterDrop();
                              playJapaneseSpeech(v.word || v.reading || currentChar);
                            }}
                            className="p-2.5 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-850 hover:border-[#BC002D]/60 shadow-2xs transition-colors flex flex-col justify-between text-left group cursor-pointer active:scale-95"
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <div className="font-kanji text-sm sm:text-base font-bold text-stone-900 dark:text-white group-hover:text-[#BC002D] transition-colors leading-snug">
                                {showFurigana ? (
                                  <ruby className="ruby-furigana">
                                    {v.word}
                                    <rt className="ruby-rt text-[#BC002D] font-bold">
                                      {v.reading}
                                    </rt>
                                  </ruby>
                                ) : (
                                  v.word
                                )}
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <PitchAccentVisual
                                  word={v.word}
                                  reading={v.reading}
                                  compact={true}
                                />
                                <div className="w-5 h-5 rounded-md border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center group-hover:bg-[#BC002D] group-hover:text-white transition-colors">
                                  <VolumeIcon className="w-3 h-3" />
                                </div>
                              </div>
                            </div>
                            <span className="text-[11px] font-medium text-stone-600 dark:text-stone-300 leading-snug mt-1 line-clamp-1">
                              {v.meaning_vi || v.vn}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-xs text-stone-400">
                        Đang cập nhật từ ghép cho chữ này...
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      playWoodClapper();
                      if (onOpenVocabModal) onOpenVocabModal();
                    }}
                    className="w-full py-2 px-3 rounded-2xl bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-750 border border-stone-200/80 dark:border-stone-700/80 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs shrink-0 cursor-pointer active:scale-95"
                  >
                    <span>Xem tất cả {vocabCount} từ trong Popup toàn màn hình</span>
                    <span>➔</span>
                  </button>
                </div>
              )}

              {/* ========================================================================= */}
              {/* VIEW 3: DEDICATED RADICAL EXPLORER */}
              {/* ========================================================================= */}
              {studioTab === 'radical' && (
                <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-150 overflow-y-auto">
                  <div>
                    <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Phân rã chiết tự Hán tự</span>
                      <span className="text-[10px] text-white font-bold px-2 py-0.5 rounded-full bg-[#BC002D]">
                        214 Bộ Thủ
                      </span>
                    </div>

                    <RadicalBreakdownCard
                      currentChar={currentChar}
                      cardInfo={cardInfo}
                      onOpenRadicalModal={onOpenRadicalModal}
                      fullDb={fullDb}
                    />

                    <div className="mt-3 p-3 rounded-2xl bg-stone-100/70 dark:bg-stone-850/70 border border-stone-200/70 dark:border-stone-800/70 text-xs">
                      <span className="font-bold text-[#BC002D] dark:text-rose-400 block mb-0.5">
                        Mẹo học qua bộ thủ:
                      </span>
                      <p className="text-stone-700 dark:text-stone-300 font-medium leading-relaxed text-[11px]">
                        Nhận diện đúng bộ thủ giúp bạn tra cứu nhanh và ghi nhớ ý nghĩa chữ Hán lâu hơn gấp 3 lần.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playWoodClapper();
                      if (onOpenRadicalModal) onOpenRadicalModal();
                    }}
                    className="w-full py-2 px-3 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-xs active:scale-95"
                  >
                    <span>MỞ BẢNG TRA CỨU 214 BỘ THỦ [R]</span>
                    <span>➔</span>
                  </button>
                </div>
              )}

              {/* ========================================================================= */}
              {/* VIEW 4: DEDICATED MNEMONIC ART */}
              {/* ========================================================================= */}
              {studioTab === 'mnemonic' && (
                <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-150 overflow-y-auto">
                  <div>
                    <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Ghi nhớ bằng hình ảnh tượng hình</span>
                      <span className="text-[10px] text-white bg-[#C27803] px-2 py-0.5 rounded-full font-bold">
                        Zen Mnemonic
                      </span>
                    </div>

                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        playWoodClapper();
                        if (onOpenMnemonicModal) onOpenMnemonicModal();
                      }}
                      title="Nhấp để mở popup ảnh to rõ [M]"
                    >
                      <KanjiIllustrationBox currentChar={currentChar} cardInfo={cardInfo} variant="back" />
                    </div>

                    <div className="p-3 rounded-2xl bg-stone-100/70 dark:bg-stone-850/70 border border-stone-200/70 dark:border-stone-800/70 text-[11px] text-stone-800 dark:text-stone-200 font-medium leading-relaxed mt-2.5">
                      💡 <strong>Kỹ thuật não phải:</strong> Kết nối hình ảnh với âm thanh giúp kích hoạt trí nhớ dài hạn mà không cần chép phạt.
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playWoodClapper();
                      if (onOpenMnemonicModal) onOpenMnemonicModal();
                    }}
                    className="w-full py-2 px-3 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-xs active:scale-95"
                  >
                    <span>XEM TRANH & MẸO NHỚ TO RÕ [M]</span>
                    <span>➔</span>
                  </button>
                </div>
              )}

              {/* ========================================================================= */}
              {/* VIEW 5: DEDICATED EXAMPLE SENTENCES */}
              {/* ========================================================================= */}
              {studioTab === 'example' && (
                <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-150 overflow-y-auto">
                  <div>
                    <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Ngữ cảnh sử dụng trong câu</span>
                      <button
                        onClick={() => {
                          playWaterDrop();
                          const cleanSentence =
                            cardInfo?.example?.sentence ||
                            cardInfo?.exampleJp?.replace(/<[^>]+>/g, '') ||
                            currentChar;
                          playJapaneseSpeech(cleanSentence);
                        }}
                        className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700/80 shadow-2xs font-bold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <VolumeIcon className="w-3.5 h-3.5" />
                        <span>Nghe</span>
                      </button>
                    </div>

                    {cardInfo?.exampleJp ? (
                      <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800/80 shadow-2xs flex flex-col gap-2 text-left">
                        <p
                          className="font-kanji text-sm sm:text-base font-bold leading-relaxed text-stone-900 dark:text-white"
                          dangerouslySetInnerHTML={{
                            __html:
                              cardInfo.exampleJp.includes(currentChar) &&
                              !cardInfo.exampleJp.includes('text-[#BC002D]')
                                ? cardInfo.exampleJp.replace(
                                    new RegExp(currentChar, 'g'),
                                    `<span class="text-[#BC002D] dark:text-rose-400 font-bold underline decoration-[#BC002D]">${currentChar}</span>`
                                  )
                                : cardInfo.exampleJp,
                          }}
                        />
                        {cardInfo.example?.reading && (
                          <p className="text-xs text-[#BC002D] dark:text-rose-400 font-kanji font-bold">
                            {cardInfo.example.reading}
                          </p>
                        )}
                        <p className="text-xs text-stone-600 dark:text-stone-300 font-medium pt-1.5 border-t border-stone-200/60 dark:border-stone-800/60">
                          → {cardInfo.exampleVn || cardInfo.example?.translation || ''}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-stone-400">
                        Chưa có câu ví dụ cho chữ này.
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      playWoodClapper();
                      if (onOpenExampleModal) onOpenExampleModal();
                    }}
                    className="w-full py-2 px-3 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-xs active:scale-95"
                  >
                    <span>MỞ CÂU VÍ DỤ & LUYỆN NGHE [E]</span>
                    <span>➔</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Station Footer */}
            <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-[11px] font-medium text-stone-500 dark:text-stone-400 shrink-0 z-10">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Trạm tri thức • JLPT {currentLevel}</span>
              </span>
              <span className="text-[10px] text-stone-400 dark:text-stone-500">
                Phân tích Hán tự chuyên sâu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FLOATING ISLAND DOCK (Dynamic Island / macOS Dock Style Bottom Navigation) */}
      <FloatingIslandDock
        onPrevCard={onPrevCard}
        onNextCard={onNextCard}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        onMarkForgotten={onMarkForgotten}
        onMarkMastered={onMarkMastered}
        isMastered={isMastered}
        isShuffled={isShuffled}
        onToggleShuffle={onToggleShuffle}
        onOpenGridModal={onOpenGridModal}
        onPlaySpeech={() => playJapaneseSpeech(currentChar)}
      />
    </section>
  );
}
