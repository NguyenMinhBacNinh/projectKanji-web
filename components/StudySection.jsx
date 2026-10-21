'use client';

import { useState, useRef, useEffect } from 'react';
import { playJapaneseSpeech } from '../lib/kanjiService';
import {
  playWoodClapper,
  playTempleBell,
  playWaterDrop,
  playHankoStamp,
} from '../lib/traditionalAudio';
import RadicalBreakdownCard from './RadicalBreakdownCard';
import KanjiIllustrationBox from './KanjiIllustrationBox';
import {
  VolumeIcon,
  BrushIcon,
  RadicalIcon,
  MicShadowingIcon,
  WorksheetIcon,
  StatsIcon,
  MoreHorizontalIcon,
  ReviewRecallIcon,
  MasteredCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShuffleIcon,
  GridIcon,
  VocabIcon,
  MnemonicIcon,
  ExampleQuoteIcon,
  ToriiShrineIcon,
  BambooIcon,
  ScrollUnfurledIcon,
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
  const [studioTab, setStudioTab] = useState('vocab'); // 'vocab' | 'radical' | 'mnemonic' | 'example'

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

  const total = kanjiList.length;
  const progressPercent = total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;
  const vocabCount = cardInfo?.vocab?.length || 0;

  // Open corresponding modal for the active station tab
  const handleOpenCurrentTabModal = () => {
    playWoodClapper();
    if (studioTab === 'vocab' && onOpenVocabModal) onOpenVocabModal();
    else if (studioTab === 'radical' && onOpenRadicalModal) onOpenRadicalModal();
    else if (studioTab === 'mnemonic' && onOpenMnemonicModal) onOpenMnemonicModal();
    else if (studioTab === 'example' && onOpenExampleModal) onOpenExampleModal();
  };

  return (
    <section className="w-full max-w-[1020px] 2xl:max-w-6xl flex flex-col items-center gap-1 sm:gap-1.5 flex-1 min-h-0 z-20">
      {/* 1. TOP STUDIO COMMAND DECK: Level Tabs, Progress & Main Tool Launchers */}
      <div className="w-full flex flex-wrap lg:flex-nowrap items-center justify-between gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700/80 shadow-md shadow-stone-900/5 dark:shadow-black/30 backdrop-blur-md shrink-0 relative z-30">
        {/* Left: Level Tabs (Thẻ Kifuda Gỗ Mun & Giấy Dâu) */}
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
                className={`py-1 px-2 sm:px-2.5 rounded-xl text-xs font-bold transition-all text-center relative flex items-center gap-1 shrink-0 border ${
                  isActive
                    ? 'bg-[#BC002D] text-white border-[#9B0024] shadow-xs'
                    : 'bg-[#F5EFE6] dark:bg-[#1E2633] text-stone-700 dark:text-stone-300 border-[#E3DACB] dark:border-stone-700 hover:bg-[#EAE1D2] dark:hover:bg-stone-800'
                }`}
              >
                <span>{lvl}</span>
                <span className={`text-[10px] ${isActive ? 'text-white/90' : 'text-stone-500 dark:text-stone-400 font-medium'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Center: Progress Bar, Counter & Shuffle */}
        <div className="flex items-center gap-1.5 px-1 shrink-0">
          <span className="text-[#BC002D] dark:text-rose-400 font-bold font-mono text-[11px] px-2 py-0.5 rounded-lg border border-[#D8CEBF] dark:border-stone-700 bg-[#F5EFE6] dark:bg-[#1E2633] shadow-2xs">
            {total > 0 ? currentIndex + 1 : 0}/{total} chữ
          </span>
          <div className="w-14 sm:w-20 h-2 rounded-full overflow-hidden border border-[#D8CEBF] dark:border-stone-700 bg-[#EAE1D2] dark:bg-stone-800">
            <div
              className="h-full bg-[#BC002D] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <button
            onClick={() => {
              playWoodClapper();
              onToggleShuffle();
            }}
            className={`p-1 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
              isShuffled
                ? 'bg-[#C27803] text-white border-[#A06302] shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border-[#D8CEBF] dark:border-stone-700 hover:bg-[#F5EFE6] shadow-2xs'
            }`}
            title="Xáo trộn danh sách"
          >
            <ShuffleIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Studio Instruments */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 justify-end ml-auto lg:ml-0 flex-wrap">
          {/* Tập viết [W] */}
          <button
            id="practice-modal-button"
            onClick={() => {
              playWoodClapper();
              if (onOpenPracticeModal) onOpenPracticeModal();
            }}
            className="py-1 px-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#F5EFE6] dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 border border-[#D8CEBF] dark:border-stone-700 text-xs font-bold flex items-center gap-1 transition-all shrink-0 shadow-2xs active:scale-95 group"
            title="Tập viết & Thứ tự nét bút KanjiVG [W]"
          >
            <BrushIcon className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300 group-hover:text-[#BC002D]" />
            <span>Tập viết</span>
            <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-600">W</kbd>
          </button>

          {/* Bộ thủ [R] */}
          <button
            id="radical-modal-button"
            onClick={() => {
              playWoodClapper();
              if (onOpenRadicalModal) onOpenRadicalModal();
            }}
            className="py-1 px-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#F5EFE6] dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 border border-[#D8CEBF] dark:border-stone-700 text-xs font-bold flex items-center gap-1 transition-all shrink-0 shadow-2xs active:scale-95 group"
            title="Tra cứu 214 Bộ thủ Hán tự [R]"
          >
            <RadicalIcon className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300 group-hover:text-[#BC002D]" />
            <span>Bộ thủ</span>
            <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-600">R</kbd>
          </button>

          {/* Tiện ích Dropdown Popover */}
          <div className="relative" ref={toolsMenuRef}>
            <button
              id="tools-menu-button"
              onClick={() => {
                playWoodClapper();
                setToolsMenuOpen(!toolsMenuOpen);
              }}
              className={`py-1 px-2.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all shrink-0 active:scale-95 ${
                toolsMenuOpen
                  ? 'border-[#BC002D] bg-[#BC002D]/10 text-[#BC002D] dark:text-rose-400'
                  : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-[#D8CEBF] dark:border-stone-700 hover:bg-[#F5EFE6] dark:hover:bg-stone-700 shadow-2xs'
              }`}
              title="Công cụ mở rộng (Shadowing, In A4, Thống kê)"
            >
              <MoreHorizontalIcon className="w-3.5 h-3.5" />
              <span>Tiện ích</span>
              <span className={`text-[10px] leading-none transition-transform duration-200 ${toolsMenuOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {toolsMenuOpen && (
              <div id="tools-menu-dropdown" className="absolute right-0 top-full mt-2 w-48 bg-[#FFFDF9] dark:bg-[#161D27] border border-[#D8CEBF] dark:border-stone-700 rounded-xl shadow-xl p-1.5 z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => {
                    playWaterDrop();
                    setToolsMenuOpen(false);
                    if (onOpenVoiceShadowing) onOpenVoiceShadowing();
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-[#F5EFE6] dark:hover:bg-stone-800 flex items-center gap-2 transition-colors cursor-pointer"
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
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-[#F5EFE6] dark:hover:bg-stone-800 flex items-center gap-2 transition-colors cursor-pointer"
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
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-[#F5EFE6] dark:hover:bg-stone-800 flex items-center gap-2 transition-colors cursor-pointer"
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
            className="py-1 px-3 rounded-xl bg-[#8C6239] hover:bg-[#775330] text-white text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 border border-[#775330] shadow-xs active:scale-95 cursor-pointer"
            title="Mục lục Hán tự [G]"
          >
            <GridIcon className="w-3.5 h-3.5 text-white" />
            <span>Mục lục</span>
            <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-black/25 text-white">G</kbd>
          </button>
        </div>
      </div>

      {/* 2. MAIN SPLIT STUDIO ARENA: 2 Cột song hành (Thẻ Karuta bên trái - Trạm tri thức bên phải) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 items-stretch flex-1 min-h-0">
        {/* ==================== CỘT TRÁI: THẺ FLASHCARD & ĐIỀU HƯỚNG CHÍNH (7 CỘT) ==================== */}
        <div className="lg:col-span-7 flex flex-col gap-1.5 sm:gap-2 flex-1 min-h-0">
          {/* 3D Flashcard Container */}
          <div
            className="w-full cursor-pointer perspective relative flex-1 min-h-[200px] karuta-card-responsive"
            onClick={() => {
              playWoodClapper();
              setIsFlipped(!isFlipped);
            }}
          >
            <div
              className={`card-flip-inner rounded-3xl ${
                isFlipped ? 'is-flipped' : ''
              }`}
              style={{ height: '100%', width: '100%', position: 'relative' }}
            >
              {/* Card Front */}
              <div className="card-face card-front absolute inset-0 w-full h-full rounded-3xl karuta-card select-none dark:bg-stone-900 overflow-hidden border border-[#D8CEBF] dark:border-stone-700/80 shadow-md shadow-stone-900/5 dark:shadow-black/30">
                {/* Front Content */}
                <div className="w-full h-full p-2.5 sm:p-3.5 xl:p-4 flex flex-col justify-between relative z-10 bg-[#FFFDF9]/95 dark:bg-[#161D27]/95">
                  {/* Front Header */}
                  <div className="w-full flex items-center justify-between pb-2 border-b border-[#E3DACB] dark:border-stone-700/70">
                    {/* Left: Level and Counter */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F5EFE6] dark:bg-[#1E2633] text-stone-800 dark:text-stone-200 border border-[#D8CEBF] dark:border-stone-700 shadow-2xs font-bold text-xs">
                        <ToriiShrineIcon className="w-3.5 h-3.5 text-[#BC002D]" />
                        <span>JLPT {currentLevel}</span>
                        <span className="opacity-40">|</span>
                        <span className="font-mono text-[11px] text-[#BC002D] dark:text-rose-400">{total > 0 ? `${currentIndex + 1}/${total}` : '1'}</span>
                      </div>

                      {dueCount > 0 && (
                        <span className="px-2.5 py-1 rounded-xl bg-[#BC002D] text-white border border-[#9B0024] shadow-2xs text-[10px] font-bold">
                          Cần ôn: {dueCount}
                        </span>
                      )}

                      {cardInfo?.strokeCount && (
                        <span className="px-2.5 py-1 rounded-xl bg-[#F5EFE6] dark:bg-[#1E2633] text-stone-700 dark:text-stone-300 border border-[#D8CEBF] dark:border-stone-700 text-[10px] font-medium font-mono shadow-2xs">
                          {cardInfo.strokeCount} nét{cardInfo?.radical ? ` · Bộ ${cardInfo.radical}` : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Center: Hero Kanji Display */}
                  <div className="my-auto py-1 sm:py-1.5 flex flex-col items-center justify-center text-center relative w-full">
                    {/* The Hero Kanji Character */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        playWaterDrop();
                      }}
                      className="relative z-10 font-kanji font-black tracking-normal cursor-pointer select-none group/kanji py-0.5 flex flex-col items-center"
                    >
                      {/* Furigana: Luôn nằm ở TRÊN chữ Hán */}
                      <div className="h-5 sm:h-6 flex items-center justify-center">
                        {showFurigana && cardInfo?.kun ? (
                          <span className="text-sm sm:text-base text-[#BC002D] dark:text-rose-400 font-bold font-kanji tracking-wider select-none animate-in fade-in duration-150">
                            {cardInfo.kun.split('、')[0].split('.')[0]}
                          </span>
                        ) : (
                          <span className="opacity-0 text-sm sm:text-base select-none pointer-events-none">&nbsp;</span>
                        )}
                      </div>

                      {/* Chữ Hán chính */}
                      <span className="text-7xl sm:text-8xl lg:text-[8.5rem] kanji-hero-text leading-tight text-stone-900 dark:text-white select-none transition-transform group-hover/kanji:scale-[1.02] duration-300">
                        {currentChar}
                      </span>
                    </div>

                    {/* Sino-Vietnamese Han-Viet reading */}
                    <div className="mt-1 flex items-center justify-center">
                      <div className="text-2xl sm:text-3xl xl:text-4xl font-black text-[#8B0000] dark:text-rose-400 font-kanji tracking-[0.22em] uppercase">
                        {cardInfo?.hanViet || '—'}
                      </div>
                    </div>

                    {/* Meaning summary */}
                    <div className="mt-1 px-3 py-1 rounded-xl bg-[#FAF5EB] dark:bg-[#1E2633] border border-[#DFD7CA] dark:border-stone-700 shadow-2xs text-[11px] sm:text-xs font-medium font-serif text-stone-800 dark:text-stone-200 max-w-md mx-auto text-center leading-relaxed">
                      「 {cardInfo?.meaning || 'Đang cập nhật...'} 」
                    </div>
                  </div>

                  {/* Bottom: On / Kun Readings (Đã bỏ phát âm loa, giữ lại chữ hiển thị cách đọc) */}
                  <div className="w-full pt-2 pb-0.5 border-t border-[#E3DACB] dark:border-stone-700/70 grid grid-cols-2 gap-2 text-left">
                    {/* On reading box */}
                    <div className="p-2 rounded-xl bg-white dark:bg-stone-800/80 border border-[#DFD7CA] dark:border-stone-700 shadow-2xs select-none">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#BC002D] text-white">
                          ÂM ON (音)
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold font-kanji text-stone-900 dark:text-stone-100 mt-1 block truncate">
                        {cardInfo?.on || '—'}
                      </span>
                    </div>

                    {/* Kun reading box */}
                    <div className="p-2 rounded-xl bg-white dark:bg-stone-800/80 border border-[#DFD7CA] dark:border-stone-700 shadow-2xs select-none">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#C27803] text-white">
                          ÂM KUN (訓)
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold font-kanji text-[#8B0000] dark:text-rose-400 mt-1 block truncate">
                        {cardInfo?.kun || '—'}
                      </span>
                    </div>
                  </div>

                  {/* Space to flip hint */}
                  <div className="text-center text-[10px] font-medium text-stone-500 dark:text-stone-400 pt-0.5 flex items-center justify-center gap-1.5">
                    <span>Chạm hoặc bấm [Space] để lật xem giải nghĩa</span>
                    <span className="text-[#BC002D]">⟲</span>
                  </div>
                </div>
              </div>

              {/* Card Back */}
              <div className="card-face card-back absolute inset-0 w-full h-full rounded-3xl karuta-card select-none dark:bg-stone-900 overflow-hidden border border-[#D8CEBF] dark:border-stone-700/80 shadow-md shadow-stone-900/5 dark:shadow-black/30">
                {/* Back Content */}
                <div className="w-full h-full p-4 sm:p-5 flex flex-col justify-between overflow-y-auto relative z-10 bg-[#FFFDF9]/95 dark:bg-[#161D27]/95">
                  {/* Back Header */}
                  <div className="w-full flex items-center justify-between pb-2 border-b border-[#E3DACB] dark:border-stone-700/70 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl sm:text-4xl font-kanji font-black text-[#8B0000] dark:text-rose-400 leading-none">{currentChar}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base sm:text-lg text-stone-900 dark:text-white font-serif">{cardInfo?.hanViet}</span>
                          <span className="px-2 py-0.5 rounded-lg border border-[#D8CEBF] dark:border-stone-700 bg-[#F5EFE6] dark:bg-[#1E2633] text-stone-800 dark:text-stone-200 text-[10px] font-bold shadow-2xs">
                            JLPT {currentLevel}
                          </span>
                        </div>
                        <span className="text-xs text-stone-600 dark:text-stone-300 font-medium block truncate max-w-[200px] sm:max-w-[260px]">
                          {cardInfo?.meaning}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Radical Breakdown Card Widget */}
                  <div className="my-1.5 shrink-0">
                    <RadicalBreakdownCard
                      currentChar={currentChar}
                      cardInfo={cardInfo}
                      onOpenRadicalModal={onOpenRadicalModal}
                      fullDb={fullDb}
                    />
                  </div>

                  {/* Khung hình tượng & Mẹo ghi nhớ trực quan */}
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
                  <div className="my-2 p-3 rounded-2xl bg-[#FAF5EB] dark:bg-[#1C2431] border border-[#DFD7CA] dark:border-stone-700 shadow-2xs shrink-0">
                    <div className="flex items-center justify-between mb-2 px-0.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#BC002D] dark:text-rose-400 flex items-center gap-1.5">
                        <span>🔁</span> ĐÁNH GIÁ GHI NHỚ (SRS)
                      </span>
                      <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400">Lặp lại ngắt quãng</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSrsReview) onSrsReview(1);
                        }}
                        className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#BC002D] hover:bg-[#9B0024] text-white border border-[#9B0024] shadow-xs transition-all font-bold active:scale-95 group cursor-pointer"
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
                        className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#C27803] hover:bg-[#A06302] text-white border border-[#A06302] shadow-xs transition-all font-bold active:scale-95 group cursor-pointer"
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
                        className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#2D6A4F] hover:bg-[#23533E] text-white border border-[#1B4332] shadow-xs transition-all font-bold active:scale-95 group cursor-pointer"
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
                        className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white border border-[#1E40AF] shadow-xs transition-all font-bold active:scale-95 group cursor-pointer"
                        title="Dễ - Ôn lại sau 7 ngày"
                      >
                        <span className="text-xs">Dễ</span>
                        <span className="text-[9px] font-medium opacity-90">7 ngày</span>
                      </button>
                    </div>
                  </div>

                  {/* Footer back card */}
                  <div className="pt-2 border-t border-[#E3DACB] dark:border-stone-700/70 flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400 shrink-0">
                    <span>Chạm hoặc bấm [Space] để lật lại ⟲</span>
                    <span className="font-bold text-[#BC002D] dark:text-rose-400">JLPT {currentLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MASTER STUDIO ACTION DOCK */}
          <div className="w-full flex flex-col gap-1.5 shrink-0">
            {/* Primary Action Console */}
            <div className="w-full grid grid-cols-12 gap-1.5 sm:gap-2">
              {/* Trước */}
              <button
                onClick={() => {
                  playWoodClapper();
                  onPrevCard();
                }}
                className="col-span-3 py-1.5 sm:py-2 xl:py-2.5 px-2 sm:px-3 bg-white dark:bg-[#1E2633] hover:bg-[#F7F3EA] dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 border border-[#D8CEBF] dark:border-stone-700 rounded-xl text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 group cursor-pointer"
                title="Chữ trước [←]"
              >
                <ChevronLeftIcon className="w-4 h-4 text-stone-600 dark:text-stone-300" />
                <span className="hidden sm:inline">Trước</span>
                <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-600">←</kbd>
              </button>

              {/* Lật thẻ */}
              <button
                onClick={() => {
                  playWoodClapper();
                  setIsFlipped(!isFlipped);
                }}
                className="col-span-6 py-1.5 sm:py-2 xl:py-2.5 px-2 sm:px-3 bg-[#8C6239] hover:bg-[#78532F] text-white rounded-xl text-xs sm:text-sm font-bold border border-[#78532F] shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 group cursor-pointer"
                title="Lật thẻ [Space]"
              >
                <span className="text-white text-base transition-transform group-hover:rotate-180 duration-500">⟲</span>
                <span>{isFlipped ? 'XEM MẶT TRƯỚC' : 'LẬT THẺ XEM GIẢI NGHĨA'}</span>
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/25 text-white/90">
                  SPACE
                </kbd>
              </button>

              {/* Tiếp */}
              <button
                onClick={() => {
                  playWoodClapper();
                  onNextCard();
                }}
                className="col-span-3 py-1.5 sm:py-2 xl:py-2.5 px-2 sm:px-3 bg-[#BC002D] hover:bg-[#A30027] text-white font-bold rounded-xl text-xs sm:text-sm border border-[#990024] shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 group cursor-pointer"
                title="Chữ kế tiếp [→]"
              >
                <span className="hidden sm:inline">Tiếp</span>
                <ChevronRightIcon className="w-4 h-4" />
                <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-black/25 text-white">→</kbd>
              </button>
            </div>

            {/* SRS Haptic Memory Bar */}
            <div className="w-full grid grid-cols-2 gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  playHankoStamp();
                  onMarkForgotten();
                }}
                className="py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl font-bold text-xs border border-amber-900/20 dark:border-amber-500/30 shadow-2xs hover:bg-amber-100/60 dark:hover:bg-amber-950/40 flex items-center justify-between transition-all bg-[#FAF4EB] dark:bg-[#1E2633] text-amber-900 dark:text-amber-200 active:scale-95 cursor-pointer"
                title="Lưu sổ tay chưa nhớ [Phím 1]"
              >
                <div className="flex items-center gap-1.5">
                  <ReviewRecallIcon className="w-4 h-4 text-amber-800 dark:text-yellow-400" />
                  <span>CHƯA NHỚ</span>
                  <span className="text-[10px] opacity-70 hidden sm:inline">· Sổ tay</span>
                </div>
                <kbd className="w-5 h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center bg-amber-900/15 dark:bg-stone-700 text-amber-900 dark:text-amber-200">1</kbd>
              </button>

              <button
                onClick={() => {
                  playTempleBell();
                  onMarkMastered();
                }}
                className={`py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl font-bold text-xs border border-emerald-900/20 dark:border-emerald-500/30 shadow-2xs hover:bg-emerald-100/60 dark:hover:bg-emerald-950/40 flex items-center justify-between transition-all ${
                  isMastered
                    ? 'bg-[#2D6A4F] text-white border-[#1B4332]'
                    : 'bg-[#F0F7F1] dark:bg-[#1E2633] text-emerald-900 dark:text-emerald-200'
                } active:scale-95 cursor-pointer`}
                title="Đã thuộc lòng [Phím 2]"
              >
                <div className="flex items-center gap-1.5">
                  <MasteredCheckIcon className={`w-4 h-4 ${isMastered ? 'text-white' : 'text-emerald-800 dark:text-emerald-400'}`} />
                  <span>{isMastered ? '✓ ĐÃ THUỘC' : 'ĐÁNH DẤU ĐÃ THUỘC'}</span>
                </div>
                <kbd className={`w-5 h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center ${isMastered ? 'bg-black/25 text-white' : 'bg-emerald-900/15 dark:bg-stone-700 text-emerald-900 dark:text-emerald-200'}`}>2</kbd>
              </button>
            </div>
          </div>
        </div>

        {/* ==================== CỘT PHẢI: TRẠM TRI THỨC THOÁNG ĐÃNG & CÓ NÚT MỞ POPUP (5 CỘT) ==================== */}
        <div className="lg:col-span-5 flex flex-col gap-1.5 flex-1 min-h-0">
          <div className="w-full h-full min-h-[200px] bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 p-2.5 sm:p-3 xl:p-3.5 rounded-3xl border border-[#D8CEBF] dark:border-stone-700/80 shadow-md shadow-stone-900/5 dark:shadow-black/30 flex flex-col justify-between relative overflow-hidden flex-1 min-h-0 station-card-responsive">
            <div className="w-full h-full flex flex-col flex-1 animate-fadeIn relative z-10 gap-2">
              {/* Tab Selector Header (Chuyển đổi 4 trạm tri thức + Nút phóng to Popup) */}
              <div className="w-full flex items-center justify-between pb-1.5 border-b border-[#E3DACB] dark:border-stone-700/70 gap-1.5 shrink-0">
                <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#F5EFE6] dark:bg-[#1C2431] border border-[#E3DACB] dark:border-stone-700 shadow-2xs flex-1 text-xs font-bold">
                  {/* Tab 1: Từ ghép [V] */}
                  <button
                    onClick={() => {
                      playWaterDrop();
                      setStudioTab('vocab');
                    }}
                    className={`flex-1 py-1 px-1.5 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
                      studioTab === 'vocab'
                        ? 'bg-[#BC002D] text-white shadow-xs'
                        : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-[#EAE1D2] dark:hover:bg-stone-800'
                    }`}
                    title="Từ vựng JLPT ghép chữ này [V]"
                  >
                    <BambooIcon className={`w-3.5 h-3.5 ${studioTab === 'vocab' ? 'text-white' : 'text-stone-600 dark:text-stone-300'}`} />
                    <span className="text-[11px]">Từ ghép</span>
                    <span className="text-[10px] opacity-90">({vocabCount})</span>
                    <kbd className={`text-[9px] font-mono font-bold px-1 py-0.2 rounded ${
                      studioTab === 'vocab'
                        ? 'bg-black/20 text-white'
                        : 'bg-black/5 dark:bg-white/10 text-stone-600 dark:text-stone-400 border border-stone-300/60 dark:border-stone-700'
                    }`}>V</kbd>
                  </button>

                  {/* Tab 2: Bộ thủ [R] */}
                  <button
                    onClick={() => {
                      playWaterDrop();
                      setStudioTab('radical');
                    }}
                    className={`flex-1 py-1 px-1.5 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
                      studioTab === 'radical'
                        ? 'bg-[#BC002D] text-white shadow-xs'
                        : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-[#EAE1D2] dark:hover:bg-stone-800'
                    }`}
                    title="Chiết tự bộ thủ cấu thành [R]"
                  >
                    <RadicalIcon className={`w-3.5 h-3.5 ${studioTab === 'radical' ? 'text-white' : 'text-stone-600 dark:text-stone-300'}`} />
                    <span className="text-[11px]">Bộ thủ</span>
                    <kbd className={`text-[9px] font-mono font-bold px-1 py-0.2 rounded ${
                      studioTab === 'radical'
                        ? 'bg-black/20 text-white'
                        : 'bg-black/5 dark:bg-white/10 text-stone-600 dark:text-stone-400 border border-stone-300/60 dark:border-stone-700'
                    }`}>R</kbd>
                  </button>

                  {/* Tab 3: Mẹo nhớ [M] */}
                  <button
                    onClick={() => {
                      playWaterDrop();
                      setStudioTab('mnemonic');
                    }}
                    className={`flex-1 py-1 px-1.5 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
                      studioTab === 'mnemonic'
                        ? 'bg-[#BC002D] text-white shadow-xs'
                        : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-[#EAE1D2] dark:hover:bg-stone-800'
                    }`}
                    title="Mẹo ghi nhớ & Tranh tượng hình [M]"
                  >
                    <MnemonicIcon className={`w-3.5 h-3.5 ${studioTab === 'mnemonic' ? 'text-white' : 'text-stone-600 dark:text-stone-300'}`} />
                    <span className="text-[11px]">Mẹo nhớ</span>
                    <kbd className={`text-[9px] font-mono font-bold px-1 py-0.2 rounded ${
                      studioTab === 'mnemonic'
                        ? 'bg-black/20 text-white'
                        : 'bg-black/5 dark:bg-white/10 text-stone-600 dark:text-stone-400 border border-stone-300/60 dark:border-stone-700'
                    }`}>M</kbd>
                  </button>

                  {/* Tab 4: Ví dụ [E] */}
                  <button
                    onClick={() => {
                      playWaterDrop();
                      setStudioTab('example');
                    }}
                    className={`flex-1 py-1 px-1.5 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
                      studioTab === 'example'
                        ? 'bg-[#BC002D] text-white shadow-xs'
                        : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-[#EAE1D2] dark:hover:bg-stone-800'
                    }`}
                    title="Câu ví dụ thực tế [E]"
                  >
                    <ScrollUnfurledIcon className={`w-3.5 h-3.5 ${studioTab === 'example' ? 'text-white' : 'text-stone-600 dark:text-stone-300'}`} />
                    <span className="text-[11px]">Ví dụ</span>
                    <kbd className={`text-[9px] font-mono font-bold px-1 py-0.2 rounded ${
                      studioTab === 'example'
                        ? 'bg-black/20 text-white'
                        : 'bg-black/5 dark:bg-white/10 text-stone-600 dark:text-stone-400 border border-stone-300/60 dark:border-stone-700'
                    }`}>E</kbd>
                  </button>
                </div>

                {/* Nút phóng to / Mở Popup riêng biệt to rõ ràng */}
                <button
                  onClick={handleOpenCurrentTabModal}
                  className="py-1.5 px-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#F5EFE6] dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 border border-[#D8CEBF] dark:border-stone-700 shadow-2xs active:scale-95 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0 transition-all"
                  title="Mở tab hiện tại thành Popup to riêng biệt"
                >
                  <span>⛶</span>
                  <span className="hidden sm:inline">Popup</span>
                </button>
              </div>

              {/* TAB 1: TỪ VỰNG JLPT GHÉP CHỮ */}
              {studioTab === 'vocab' && (
                <div className="flex-1 flex flex-col animate-fadeIn min-h-0 gap-1.5 justify-between">
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="text-[10px] sm:text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center justify-between pb-1 shrink-0">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#BC002D]" />
                        <span>Từ ghép với 「{currentChar}」</span>
                      </span>
                      <span className="text-[10px] font-medium text-[#BC002D] dark:text-rose-400 lowercase">chạm để nghe phát âm 🔊</span>
                    </div>

                    {cardInfo?.vocab && cardInfo.vocab.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-0.5 content-start auto-rows-min py-0.5">
                        {cardInfo.vocab.slice(0, 10).map((v, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              playWaterDrop();
                              playJapaneseSpeech(v.word || v.reading || currentChar);
                            }}
                            className="p-2 sm:p-2.5 rounded-xl border border-[#DFD7CA] dark:border-stone-700 bg-white dark:bg-stone-850 hover:bg-[#FAF5EB] dark:hover:bg-stone-800 hover:border-[#BC002D]/60 shadow-2xs transition-colors flex flex-col justify-between text-left group cursor-pointer active:scale-95"
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <div className="font-kanji text-sm sm:text-base font-bold text-stone-900 dark:text-white group-hover:text-[#BC002D] dark:group-hover:text-rose-400 transition-colors leading-snug">
                                {showFurigana ? (
                                  <ruby className="ruby-furigana">
                                    {v.word}
                                    <rt className="ruby-rt text-[#BC002D] font-bold">{v.reading}</rt>
                                  </ruby>
                                ) : (
                                  v.word
                                )}
                              </div>
                              <div className="w-5 h-5 rounded-md border border-[#D8CEBF] dark:border-stone-700 bg-[#F5EFE6] dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#BC002D] group-hover:text-white transition-colors" title="Phát âm">
                                <VolumeIcon className="w-3 h-3" />
                              </div>
                            </div>

                            <span className="text-[11px] font-medium text-stone-600 dark:text-stone-300 leading-snug mt-1 line-clamp-1">
                              {v.meaning_vi || v.vn}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-xs text-stone-400 font-medium">
                        Đang cập nhật từ ghép cho chữ này...
                      </div>
                    )}
                  </div>

                  {/* Nút mở rộng xem toàn bộ */}
                  <button
                    onClick={() => {
                      playWoodClapper();
                      if (onOpenVocabModal) onOpenVocabModal();
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#F5EFE6] dark:hover:bg-stone-750 border border-[#D8CEBF] dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs shrink-0 cursor-pointer active:scale-95"
                  >
                    <span>Xem tất cả {vocabCount} từ ghép trong Popup</span>
                    <kbd className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-300/60 dark:border-stone-600">V</kbd>
                    <span>➔</span>
                  </button>
                </div>
              )}

              {/* TAB 2: CHIẾT TỰ & BỘ THỦ CẤU THÀNH */}
              {studioTab === 'radical' && (
                <div className="flex-1 py-1 flex flex-col justify-between animate-fadeIn overflow-y-auto">
                  <div>
                    <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Phân rã chiết tự Hán tự</span>
                      <span className="text-[10px] text-white font-bold px-2 py-0.5 rounded-lg bg-[#BC002D] shadow-2xs">214 Bộ Thủ</span>
                    </div>

                    <RadicalBreakdownCard
                      currentChar={currentChar}
                      cardInfo={cardInfo}
                      onOpenRadicalModal={onOpenRadicalModal}
                      fullDb={fullDb}
                    />

                    <div className="mt-2 p-2.5 rounded-xl bg-[#FAF5EB] dark:bg-stone-850 border border-[#DFD7CA] dark:border-stone-700 shadow-2xs text-xs">
                      <span className="font-bold text-[#BC002D] dark:text-rose-400 block mb-0.5">Mẹo học qua bộ thủ:</span>
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
                    className="w-full py-2 px-3 rounded-xl bg-[#8C6239] hover:bg-[#775330] text-white border border-[#775330] shadow-xs active:scale-95 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>MỞ BẢNG TRA CỨU 214 BỘ THỦ [R]</span>
                    <span>➔</span>
                  </button>
                </div>
              )}

              {/* TAB 3: HÌNH TƯỢNG & MẸO GHI NHỚ TRANH MỘC BẢN */}
              {studioTab === 'mnemonic' && (
                <div className="flex-1 py-1 flex flex-col justify-between animate-fadeIn overflow-y-auto">
                  <div>
                    <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Ghi nhớ bằng hình ảnh tượng hình</span>
                      <span className="text-[10px] text-white bg-[#C27803] px-2 py-0.5 rounded-lg font-bold shadow-2xs">Zen Mnemonic</span>
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

                    <div className="p-2.5 rounded-xl bg-[#FAF5EB] dark:bg-stone-850 border border-[#DFD7CA] dark:border-stone-700 shadow-2xs text-[11px] text-stone-800 dark:text-stone-200 font-medium leading-relaxed mt-2">
                      💡 <strong>Kỹ thuật não phải:</strong> Kết nối hình ảnh với âm thanh giúp kích hoạt trí nhớ dài hạn mà không cần chép phạt.
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playWoodClapper();
                      if (onOpenMnemonicModal) onOpenMnemonicModal();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-[#8C6239] hover:bg-[#775330] text-white border border-[#775330] shadow-xs active:scale-95 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>XEM TRANH & MẸO NHỚ TO RÕ [M]</span>
                    <span>➔</span>
                  </button>
                </div>
              )}

              {/* TAB 4: CÂU VÍ DỤ THỰC TẾ */}
              {studioTab === 'example' && (
                <div className="flex-1 py-1 flex flex-col justify-between animate-fadeIn overflow-y-auto">
                  <div>
                    <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Ngữ cảnh sử dụng trong câu</span>
                      <button
                        onClick={() => {
                          playWaterDrop();
                          const cleanSentence = cardInfo?.example?.sentence || cardInfo?.exampleJp?.replace(/<[^>]+>/g, '') || currentChar;
                          playJapaneseSpeech(cleanSentence);
                        }}
                        className="px-2 py-0.5 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 hover:bg-[#EAE1D2] text-stone-800 dark:text-stone-200 border border-[#D8CEBF] dark:border-stone-700 shadow-2xs font-bold text-xs flex items-center gap-1 cursor-pointer active:scale-95"
                      >
                        <VolumeIcon className="w-3 h-3" />
                        <span>Nghe</span>
                      </button>
                    </div>

                    {cardInfo?.exampleJp ? (
                      <div className="p-3 rounded-xl bg-white dark:bg-stone-850 border border-[#DFD7CA] dark:border-stone-700 shadow-2xs flex flex-col gap-1.5 text-left">
                        <p
                          className="font-kanji text-sm sm:text-base font-bold leading-relaxed text-stone-900 dark:text-white"
                          dangerouslySetInnerHTML={{
                            __html: (cardInfo.exampleJp.includes(currentChar) && !cardInfo.exampleJp.includes('text-[#BC002D]'))
                              ? cardInfo.exampleJp.replace(new RegExp(currentChar, 'g'), `<span class="text-[#BC002D] dark:text-rose-400 font-bold underline decoration-[#BC002D]">${currentChar}</span>`)
                              : cardInfo.exampleJp
                          }}
                        />
                        {cardInfo.example?.reading && (
                          <p className="text-xs text-[#BC002D] dark:text-rose-400 font-kanji font-bold">
                            {cardInfo.example.reading}
                          </p>
                        )}
                        <p className="text-xs text-stone-600 dark:text-stone-300 font-medium pt-1 border-t border-stone-200 dark:border-stone-700">
                          → {cardInfo.exampleVn || cardInfo.example?.translation || ''}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-stone-400 font-medium">
                        Chưa có câu ví dụ cho chữ này.
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      playWoodClapper();
                      if (onOpenExampleModal) onOpenExampleModal();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-[#8C6239] hover:bg-[#775330] text-white border border-[#775330] shadow-xs active:scale-95 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>MỞ CÂU VÍ DỤ & LUYỆN NGHE</span>
                    <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/25 text-white/90">E</kbd>
                    <span>➔</span>
                  </button>
                </div>
              )}

              {/* Bottom Station Footer */}
              <div className="pt-1.5 border-t border-[#E3DACB] dark:border-stone-700/70 flex items-center justify-between text-[11px] font-medium text-stone-600 dark:text-stone-300 shrink-0">
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
      </div>
    </section>
  );
}
