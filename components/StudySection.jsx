'use client';
import { useState } from 'react';
import { playJapaneseSpeech } from '../lib/kanjiService';
import {
  playWoodClapper,
  playTempleBell,
  playWaterDrop,
  playHankoStamp,
} from '../lib/traditionalAudio';
import RadicalBreakdownCard from './RadicalBreakdownCard';
import KanjiIllustrationBox from './KanjiIllustrationBox';
import PitchAccentVisualizer from './PitchAccentVisualizer';
import {
  VolumeIcon,
  BrushIcon,
  MindmapIcon,
  RadicalIcon,
  MicShadowingIcon,
  WorksheetIcon,
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
  BambooIcon,
  ScrollUnfurledIcon,
  ToriiShrineIcon,
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
  onOpenMindmapModal,
  onOpenVoiceShadowing,
  onOpenWorksheetModal,
  onSrsReview,
  dueCount = 0,
  isMastered = false,
  isAnalysisMode = false,
  onToggleAnalysisMode,
}) {
  const [showFurigana, setShowFurigana] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [backMenuOpen, setBackMenuOpen] = useState(false);
  const [studioTab, setStudioTab] = useState('vocab'); // 'vocab' | 'radical' | 'mnemonic' | 'example'

  const total = kanjiList.length;
  const progressPercent = total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;

  return (
    <section className="w-full max-w-6xl flex flex-col items-center gap-3 sm:gap-3.5 z-20">
      {/* 1. TOP BAR: Level Tabs, Progress & Quick Tools hợp nhất 1 dòng khoa học (Unified Studio Toolbar) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 p-1.5 rounded-2xl bg-washi-light/90 dark:bg-stone-850/90 border border-washi-border dark:border-stone-700/80 shadow-2xs">
        {/* Left: Level Tabs (Thẻ Mộc bài Kifuda - 木札) */}
        <div className="flex items-center gap-1 w-full sm:w-auto">
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
                className={`py-1.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center relative ${
                  isActive
                    ? 'bg-torii text-white shadow-sm font-black scale-[1.02]'
                    : 'text-stone-700 dark:text-stone-300 hover:text-torii dark:hover:text-torii-light hover:bg-torii/10 dark:hover:bg-torii/20'
                }`}
              >
                <span>{lvl}</span>{' '}
                <span className={`text-[10px] sm:text-xs ${isActive ? 'text-white/90' : 'text-stone-500 dark:text-stone-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Center: Progress Bar & Counter */}
        <div className="flex items-center gap-2.5 px-2">
          <span className="text-torii dark:text-torii-light font-black font-kanji text-xs sm:text-sm">
            {total > 0 ? currentIndex + 1 : 0} / {total} chữ
          </span>
          <div className="w-20 sm:w-28 h-2 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-800 border border-stone-300/50 dark:border-stone-700">
            <div
              className="h-full bg-torii dark:bg-torii-light transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-stone-600 dark:text-stone-300 font-bold text-[11px]">{progressPercent}%</span>
        </div>

        {/* Right: Quick Tools (Xáo trộn & Mục lục) */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              playWoodClapper();
              onToggleShuffle();
            }}
            className={`py-1.5 px-2.5 rounded-xl border text-xs font-bold transition-all shadow-2xs flex items-center gap-1 ${
              isShuffled
                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-600'
                : 'bg-washi dark:bg-stone-800 border-washi-border dark:border-stone-700 hover:border-torii/40 text-stone-700 dark:text-stone-200'
            }`}
            title="Đảo ngẫu nhiên danh sách"
          >
            <ShuffleIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Xáo trộn</span>
          </button>

          <button
            onClick={() => {
              playWoodClapper();
              onOpenGridModal();
            }}
            className="py-1.5 px-2.5 bg-washi dark:bg-stone-800 border border-washi-border dark:border-stone-700 hover:border-torii/40 rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1 transition-all active:scale-95 text-stone-700 dark:text-stone-200"
            title="Mục lục Hán tự [Phím G]"
          >
            <GridIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mục lục</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN ZERO-SCROLL STUDIO ARENA: 2 Cột song hành trên Desktop / Laptop (1 Khung hình duy nhất) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        {/* ==================== CỘT TRÁI: THẺ FLASHCARD & ĐIỀU HƯỚNG CHÍNH (7 CỘT) ==================== */}
        <div className="lg:col-span-7 flex flex-col gap-2.5 sm:gap-3">
          {/* 3D Flashcard Container (Tanzaku / Karuta thiền Zen tối giản) */}
          <div
            className="w-full cursor-pointer perspective relative"
            style={{ height: '360px', minHeight: '360px' }}
            onClick={() => {
              playWoodClapper();
              setIsFlipped(!isFlipped);
            }}
            title="Nhấp chuột hoặc bấm phím Space để lật thẻ"
          >
            <div
              className={`card-flip-inner rounded-3xl ${
                isFlipped ? 'is-flipped' : ''
              }`}
              style={{ height: '100%', width: '100%', position: 'relative' }}
            >
              {/* Card Front */}
              <div className="card-face card-front absolute inset-0 w-full h-full rounded-3xl karuta-card select-none dark:bg-stone-900 dark:border-stone-700 overflow-hidden">
                <div className="karuta-inner-border" />

                {/* Dấu triện "ĐÃ THUỘC" (済 - Sumi) nếu chữ này đã thuộc */}
                {isMastered && (
                  <div className="absolute top-14 right-7 pointer-events-none stamp-animated z-20">
                    <div className="w-12 h-12 rounded-full border-2 border-torii dark:border-torii-light flex items-center justify-center font-kanji font-black text-torii dark:text-torii-light text-xl bg-torii/10 dark:bg-torii/20 shadow-xs rotate-[-12deg]">
                      済
                    </div>
                  </div>
                )}

                {/* Front Content */}
                <div className="w-full h-full p-5 sm:p-6 flex flex-col justify-between relative z-10">
                  {/* Front Header */}
                  <div className="w-full flex items-center justify-between pb-2.5 border-b border-washi-border/70 dark:border-stone-700/80">
                    {/* Left: Hanko stamp, counter, furigana toggle */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-torii/10 dark:bg-torii/20 border border-torii/30 text-torii dark:text-torii-light font-black text-xs font-kanji">
                        <ToriiShrineIcon className="w-3.5 h-3.5" />
                        <span>JLPT {currentLevel}</span>
                      </div>
                      <span className="text-[11px] font-bold text-stone-700 dark:text-stone-200 bg-washi dark:bg-stone-800 px-2 py-0.5 rounded-lg border border-washi-border dark:border-stone-700">
                        {total > 0 ? `${currentIndex + 1} / ${total}` : '1'}
                      </span>
                      {isAnalysisMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playWaterDrop();
                            setShowFurigana(!showFurigana);
                          }}
                          className={`px-2 py-0.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1 ${
                            showFurigana
                              ? 'bg-matcha/15 dark:bg-matcha/25 text-matcha dark:text-emerald-300 border-matcha/40 dark:border-emerald-500/40'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700'
                          }`}
                          title="Bật/tắt Furigana âm Kunyomi [Phím F]"
                        >
                          <span className="font-kanji">あ</span>
                          <span className="text-[10px] hidden sm:inline">
                            Furigana {showFurigana ? 'ON' : 'OFF'}
                          </span>
                        </button>
                      )}
                      {dueCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 dark:bg-amber-400/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 text-[10px] font-bold animate-pulse">
                          Cần ôn: {dueCount}
                        </span>
                      )}
                    </div>

                    {/* Right: Sound, Writing, More Tools Menu */}
                    <div className="flex items-center gap-1.5">
                      {/* Phát âm */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playWaterDrop();
                          playJapaneseSpeech(currentChar);
                        }}
                        className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-washi dark:bg-stone-800 hover:bg-torii dark:hover:bg-torii text-torii dark:text-torii-light hover:text-white dark:hover:text-white border border-torii/30 dark:border-stone-700 transition-all text-xs font-bold flex items-center gap-1.5 active:scale-95 shadow-2xs"
                        title="Phát âm chữ này (Phím A)"
                      >
                        <VolumeIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-xs">Phát âm</span>
                      </button>

                      {/* Tập viết nét bút */}
                      {isAnalysisMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playWoodClapper();
                            onOpenPracticeModal();
                          }}
                          className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-washi dark:bg-stone-800 hover:bg-torii dark:hover:bg-torii text-torii dark:text-torii-light hover:text-white dark:hover:text-white border border-torii/30 dark:border-stone-700 transition-all text-xs font-bold flex items-center gap-1.5 active:scale-95 shadow-2xs"
                          title="Tập viết & Thứ tự nét bút (Phím W)"
                        >
                          <BrushIcon className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-xs">Tập viết</span>
                        </button>
                      )}

                      {/* Nút menu công cụ bổ trợ (⋯) */}
                      {isAnalysisMode && (
                        <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(!menuOpen);
                          }}
                          className="p-1.5 sm:px-2 rounded-xl bg-washi dark:bg-stone-800 hover:bg-torii/10 text-stone-700 dark:text-stone-300 border border-washi-border dark:border-stone-700 hover:border-torii/30 transition-all text-xs font-bold flex items-center justify-center active:scale-95"
                          title="Công cụ bổ trợ (Sơ đồ, Bộ thủ, Luyện nói)"
                        >
                          <MoreHorizontalIcon className="w-4 h-4" />
                        </button>

                        {menuOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-full mt-1.5 w-48 rounded-2xl bg-washi-light dark:bg-stone-800 border border-washi-border dark:border-stone-700 shadow-xl p-1.5 flex flex-col gap-1 z-50 text-xs font-bold animate-fadeIn"
                          >
                            {onOpenMindmapModal && (
                              <button
                                onClick={() => {
                                  setMenuOpen(false);
                                  playWoodClapper();
                                  onOpenMindmapModal();
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl hover:bg-torii hover:text-white flex items-center gap-2 text-left transition-colors text-stone-800 dark:text-stone-100"
                              >
                                <MindmapIcon className="w-4 h-4 text-torii" />
                                <span>Sơ đồ tư duy (M)</span>
                              </button>
                            )}
                            {onOpenRadicalModal && (
                              <button
                                onClick={() => {
                                  setMenuOpen(false);
                                  playWoodClapper();
                                  onOpenRadicalModal();
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl hover:bg-torii hover:text-white flex items-center gap-2 text-left transition-colors text-stone-800 dark:text-stone-100"
                              >
                                <RadicalIcon className="w-4 h-4 text-torii" />
                                <span>Chiết tự bộ thủ (R)</span>
                              </button>
                            )}
                            {onOpenVoiceShadowing && (
                              <button
                                onClick={() => {
                                  setMenuOpen(false);
                                  playWaterDrop();
                                  onOpenVoiceShadowing();
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl hover:bg-torii hover:text-white flex items-center gap-2 text-left transition-colors text-stone-800 dark:text-stone-100"
                              >
                                <MicShadowingIcon className="w-4 h-4 text-torii" />
                                <span>Luyện nói AI</span>
                              </button>
                            )}
                            {onOpenWorksheetModal && (
                              <button
                                onClick={() => {
                                  setMenuOpen(false);
                                  playWaterDrop();
                                  onOpenWorksheetModal();
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl hover:bg-torii hover:text-white flex items-center gap-2 text-left transition-colors text-stone-800 dark:text-stone-100"
                              >
                                <WorksheetIcon className="w-4 h-4 text-torii" />
                                <span>In phiếu tập viết</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                  {/* Center: Hero Calligraphy Kanji & Han-Viet Dignified Typography */}
                  <div className="my-auto py-1 flex flex-col items-center justify-center text-center">
                    <div className="font-kanji font-black tracking-wider transition-colors duration-200 hover:text-torii dark:hover:text-torii-light select-none flex flex-col items-center">
                      {showFurigana && cardInfo?.kun ? (
                        <ruby className="kanji-hero-ruby">
                          <span className="text-7xl sm:text-8xl leading-none drop-shadow-xs text-stone-900 dark:text-stone-50">{currentChar}</span>
                          <rt className="kanji-hero-rt">{cardInfo.kun.split('、')[0].split('.')[0]}</rt>
                        </ruby>
                      ) : (
                        <span className="text-7xl sm:text-8xl leading-none drop-shadow-xs text-stone-900 dark:text-stone-50">{currentChar}</span>
                      )}
                    </div>

                    {/* Sino-Vietnamese Han-Viet reading */}
                    <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-torii dark:text-torii-light font-kanji tracking-widest">
                      {cardInfo?.hanViet || '—'}
                    </div>

                    {/* Meaning summary - High contrast */}
                    <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-100 mt-0.5 font-semibold max-w-sm mx-auto text-center leading-relaxed">
                      {cardInfo?.meaning || 'Đang cập nhật...'}
                    </div>
                  </div>

                  {/* Bottom: On / Kun Readings (Độ tương phản cao, khung viền sắc nét) */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-washi-border/70 dark:border-stone-700/80 text-center">
                    <div className="bg-stone-100/80 dark:bg-stone-800/80 py-1.5 px-2.5 rounded-xl border border-stone-200/80 dark:border-stone-700/80">
                      <span className="text-[10px] sm:text-[11px] uppercase font-bold text-stone-600 dark:text-stone-400 block tracking-wider">Âm On (Onyomi)</span>
                      <span className="text-xs sm:text-sm font-bold font-kanji text-stone-900 dark:text-stone-100 mt-0.5 block truncate">
                        {cardInfo?.on || '—'}
                      </span>
                    </div>
                    <div className="bg-stone-100/80 dark:bg-stone-800/80 py-1.5 px-2.5 rounded-xl border border-stone-200/80 dark:border-stone-700/80">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-[10px] sm:text-[11px] uppercase font-bold text-stone-600 dark:text-stone-400 tracking-wider">Âm Kun (Kunyomi)</span>
                        {isAnalysisMode && (
                          <PitchAccentVisualizer word={currentChar} reading={cardInfo?.kun} />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-torii dark:text-torii-light font-kanji mt-0.5 block truncate">
                        {cardInfo?.kun || '—'}
                      </span>
                    </div>
                  </div>

                  {/* Space to flip hint */}
                  <div className="text-center text-xs font-semibold text-stone-500 dark:text-stone-400 pt-1.5 flex items-center justify-center gap-1.5">
                    <span>Chạm hoặc bấm [Phím Space] để lật mặt sau</span>
                    <span className="text-torii dark:text-torii-light">↻</span>
                  </div>
                </div>
              </div>

              {/* Card Back */}
              <div className="card-face card-back absolute inset-0 w-full h-full rounded-3xl karuta-card select-none dark:bg-stone-900 dark:border-stone-700">
                {/* Back Content - Scrollable cleanly */}
                <div className="w-full h-full p-4 sm:p-5 flex flex-col justify-between overflow-y-auto relative z-10">
                  {/* Back Header */}
                  <div className="w-full flex items-center justify-between pb-2 border-b border-washi-border dark:border-stone-700 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl sm:text-3xl font-kanji font-black text-torii dark:text-torii-light leading-none">{currentChar}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-50">{cardInfo?.hanViet}</span>
                          <span className="hanko-stamp text-[9px] py-0.2 px-1.5">
                            JLPT {currentLevel}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-600 dark:text-stone-300 font-medium block truncate max-w-[200px] sm:max-w-[260px]">
                          {cardInfo?.meaning}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playWaterDrop();
                          playJapaneseSpeech(currentChar);
                        }}
                        className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-washi dark:bg-stone-800 hover:bg-torii text-torii dark:text-torii-light hover:text-white border border-torii/30 dark:border-stone-700 transition-all text-xs font-bold flex items-center gap-1.5 active:scale-95 shadow-2xs"
                        title="Phát âm chữ này"
                      >
                        <VolumeIcon className="w-3.5 h-3.5" />
                        <span className="text-xs hidden sm:inline">Phát âm</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playWoodClapper();
                          onOpenPracticeModal();
                        }}
                        className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-washi dark:bg-stone-800 hover:bg-torii text-torii dark:text-torii-light hover:text-white border border-torii/30 dark:border-stone-700 transition-all text-xs font-bold flex items-center gap-1.5 active:scale-95 shadow-2xs"
                        title="Tập viết & Thứ tự nét"
                      >
                        <BrushIcon className="w-3.5 h-3.5" />
                        <span className="text-xs hidden sm:inline">Tập viết</span>
                      </button>

                      {/* Back menu ⋯ */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setBackMenuOpen(!backMenuOpen);
                          }}
                          className="p-1.5 sm:px-2 rounded-xl bg-washi dark:bg-stone-800 hover:bg-torii/10 text-stone-700 dark:text-stone-300 border border-washi-border dark:border-stone-700 text-xs font-bold flex items-center justify-center active:scale-95"
                        >
                          <MoreHorizontalIcon className="w-4 h-4" />
                        </button>
                        {backMenuOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-full mt-1.5 w-44 rounded-2xl bg-washi-light dark:bg-stone-800 border border-washi-border dark:border-stone-700 shadow-xl p-1.5 flex flex-col gap-1 z-50 text-xs font-bold animate-fadeIn"
                          >
                            {onOpenMindmapModal && (
                              <button
                                onClick={() => {
                                  setBackMenuOpen(false);
                                  playWoodClapper();
                                  onOpenMindmapModal();
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl hover:bg-torii hover:text-white flex items-center gap-2 text-left transition-colors text-stone-800 dark:text-stone-100"
                              >
                                <MindmapIcon className="w-4 h-4 text-torii" />
                                <span>Sơ đồ tư duy</span>
                              </button>
                            )}
                            {onOpenRadicalModal && (
                              <button
                                onClick={() => {
                                  setBackMenuOpen(false);
                                  playWoodClapper();
                                  onOpenRadicalModal();
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl hover:bg-torii hover:text-white flex items-center gap-2 text-left transition-colors text-stone-800 dark:text-stone-100"
                              >
                                <RadicalIcon className="w-4 h-4 text-torii" />
                                <span>Chiết tự bộ thủ</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Radical Breakdown Card Widget (Chỉ hiện khi phân tích) */}
                  {isAnalysisMode && (
                    <div className="my-1.5 shrink-0">
                      <RadicalBreakdownCard
                        currentChar={currentChar}
                        cardInfo={cardInfo}
                        onOpenRadicalModal={onOpenRadicalModal}
                      />
                    </div>
                  )}

                  {/* Khung hình tượng & Mẹo ghi nhớ trực quan */}
                  <div className="my-1 shrink-0">
                    <KanjiIllustrationBox currentChar={currentChar} cardInfo={cardInfo} variant="back" />
                  </div>

                  {/* SRS Repetition Response Buttons */}
                  <div className="my-2 p-2.5 rounded-2xl bg-stone-100/90 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 shadow-2xs shrink-0">
                    <div className="flex items-center justify-between mb-1.5 px-0.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-torii dark:text-torii-light flex items-center gap-1">
                        <span>🔁</span> Đánh giá ghi nhớ (SRS)
                      </span>
                      <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">Lặp lại ngắt quãng</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSrsReview) onSrsReview(1);
                        }}
                        className="flex flex-col items-center py-1.5 px-1 rounded-xl bg-rose-500/15 hover:bg-rose-500 hover:text-white text-rose-800 dark:text-rose-200 border border-rose-400/40 transition-all font-bold active:scale-95 group"
                        title="Chưa nhớ - Học lại sau 10 phút"
                      >
                        <span className="text-xs">Quên</span>
                        <span className="text-[9px] font-semibold opacity-85 group-hover:text-white/95">10 phút</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSrsReview) onSrsReview(2);
                        }}
                        className="flex flex-col items-center py-1.5 px-1 rounded-xl bg-amber-500/15 hover:bg-amber-500 hover:text-white text-amber-900 dark:text-amber-200 border border-amber-400/40 transition-all font-bold active:scale-95 group"
                        title="Khó - Ôn lại sau 1 ngày"
                      >
                        <span className="text-xs">Khó</span>
                        <span className="text-[9px] font-semibold opacity-85 group-hover:text-white/95">1 ngày</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSrsReview) onSrsReview(3);
                        }}
                        className="flex flex-col items-center py-1.5 px-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 hover:text-white text-emerald-800 dark:text-emerald-200 border border-emerald-400/40 transition-all font-bold active:scale-95 group"
                        title="Tốt - Ôn lại sau 3 ngày"
                      >
                        <span className="text-xs">Tốt</span>
                        <span className="text-[9px] font-semibold opacity-85 group-hover:text-white/95">3 ngày</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSrsReview) onSrsReview(4);
                        }}
                        className="flex flex-col items-center py-1.5 px-1 rounded-xl bg-blue-500/15 hover:bg-blue-500 hover:text-white text-blue-800 dark:text-blue-200 border border-blue-400/40 transition-all font-bold active:scale-95 group"
                        title="Dễ - Ôn lại sau 7 ngày"
                      >
                        <span className="text-xs">Dễ</span>
                        <span className="text-[9px] font-semibold opacity-85 group-hover:text-white/95">7 ngày</span>
                      </button>
                    </div>
                  </div>

                  {/* Footer back card */}
                  <div className="pt-2 border-t border-washi-border dark:border-stone-700 flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400 shrink-0">
                    <span>Chạm hoặc bấm [Phím Space] để lật lại ↺</span>
                    <span className="font-bold text-stone-700 dark:text-stone-300">JLPT {currentLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Forgotten [1] & Mastered [2] (TRỰC TIẾP DƯỚI THẺ - ĐỘ TƯƠNG PHẢN CAO) */}
          <div className="w-full flex items-center justify-between gap-2 sm:gap-2.5">
            <button
              onClick={() => {
                playHankoStamp();
                onMarkForgotten();
              }}
              className="flex-1 py-2.5 px-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all bg-amber-500/15 dark:bg-amber-500/25 border border-amber-600/40 dark:border-amber-400/50 text-amber-900 dark:text-amber-200 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white active:scale-95"
              title="Chưa nhớ - Đóng dấu lưu sổ tay [Phím 1]"
            >
              <ReviewRecallIcon className="w-4 h-4 text-amber-600 dark:text-amber-300" />
              <span>Chưa nhớ (Sổ tay [1])</span>
            </button>

            <button
              onClick={() => {
                playTempleBell();
                onMarkMastered();
              }}
              className="flex-1 py-2.5 px-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all bg-matcha dark:bg-emerald-700 text-white border border-matcha dark:border-emerald-600 hover:bg-matcha-dark dark:hover:bg-emerald-600 active:scale-95"
              title="Đã thuộc lòng [Phím 2]"
            >
              <MasteredCheckIcon className="w-4 h-4" />
              <span>Đã thuộc lòng [2]</span>
            </button>
          </div>

          {/* Navigation Controls: Prev, Flip Space, Next */}
          <div className="w-full flex items-center justify-between gap-2">
            <button
              onClick={() => {
                playWoodClapper();
                onPrevCard();
              }}
              className="flex-1 py-2.5 px-3 karuta-card dark:bg-stone-800 border border-washi-border dark:border-stone-700 rounded-2xl text-xs sm:text-sm font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-all active:scale-95 hover:border-torii/40 text-stone-800 dark:text-stone-100"
              title="Chữ trước [←]"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Trước</span>
            </button>

            <button
              onClick={() => {
                playWoodClapper();
                setIsFlipped(!isFlipped);
              }}
              className="flex-1 py-2.5 px-3 karuta-card dark:bg-stone-800 border border-washi-border dark:border-stone-700 rounded-2xl text-xs sm:text-sm font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-all active:scale-95 hover:border-torii/40 text-stone-800 dark:text-stone-100"
              title="Lật thẻ [Space]"
            >
              <span>{isFlipped ? 'Mặt trước' : 'Lật thẻ'}</span>
              <span className="text-torii dark:text-torii-light font-bold">↻</span>
            </button>

            <button
              onClick={() => {
                playWoodClapper();
                onNextCard();
              }}
              className="flex-1 py-2.5 px-4 bg-torii hover:bg-torii-light dark:bg-red-600 dark:hover:bg-red-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              title="Chữ sau [→]"
            >
              <span>Tiếp</span>
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Keyboard Navigation Hint Bar */}
          <div className="w-full hidden sm:flex items-center justify-center gap-2 text-xs text-stone-600 dark:text-stone-300 font-mono py-0.5">
            <span><kbd className="px-1.5 py-0.2 bg-black/5 dark:bg-white/10 rounded font-bold">Space</kbd> Lật</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.2 bg-black/5 dark:bg-white/10 rounded font-bold">1</kbd> Quên</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.2 bg-black/5 dark:bg-white/10 rounded font-bold">2</kbd> Thuộc</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.2 bg-black/5 dark:bg-white/10 rounded font-bold">←/→</kbd> Chuyển</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.2 bg-black/5 dark:bg-white/10 rounded font-bold">A</kbd> Đọc</span>
          </div>
        </div>

        {/* ==================== CỘT PHẢI: TRẠM TRI THỨC ĐA CHIỀU (5 CỘT - ZERO-SCROLL STUDIO PANEL) ==================== */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          {/* Station Card: Chiều cao khớp hoàn hảo cột trái (~465px) */}
          <div className="w-full h-full min-h-[460px] karuta-card dark:bg-stone-900 dark:border-stone-700 p-3.5 sm:p-4 rounded-3xl border border-washi-border flex flex-col justify-between shadow-xs">
            {!isAnalysisMode ? (
              /* CHẾ ĐỘ TINH GIẢN (ZEN FOCUS): Cấu trúc chữ + Danh sách từ ghép cốt lõi thanh lịch */
              <div className="w-full h-full flex flex-col justify-between flex-1 animate-fadeIn gap-2.5">
                {/* Header Tinh Giản: Tiêu đề + Thông tin bộ thủ */}
                <div className="w-full flex items-center justify-between pb-2 border-b border-washi-border/70 dark:border-stone-700/80">
                  <div className="flex items-center gap-2">
                    <BambooIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold text-xs sm:text-sm text-stone-800 dark:text-stone-200">
                      Từ ghép với 「{currentChar}」
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 bg-washi dark:bg-stone-800 px-2 py-0.5 rounded-lg border border-washi-border dark:border-stone-700">
                    Bộ: <strong className="text-torii dark:text-torii-light">{cardInfo?.radical || currentChar}</strong>
                    {cardInfo?.strokeCount ? ` • ${cardInfo.strokeCount} nét` : ''}
                  </div>
                </div>

                {/* Danh sách 4 từ ghép thiết kế dạng list items thanh lịch */}
                <div className="flex-1 py-1 flex flex-col justify-between gap-2">
                  {cardInfo?.vocab && cardInfo.vocab.length > 0 ? (
                    cardInfo.vocab.slice(0, 4).map((v, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          playWaterDrop();
                          playJapaneseSpeech(v.word || v.reading || currentChar);
                        }}
                        className="p-2 sm:p-2.5 px-3 rounded-2xl border border-washi-border/80 dark:border-stone-700/80 bg-stone-50/80 dark:bg-stone-800/80 hover:border-torii/50 hover:bg-torii/5 transition-all flex items-center justify-between group cursor-pointer active:scale-99 shadow-2xs"
                      >
                        {/* Left: Index & Kanji & Reading */}
                        <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0 pr-2">
                          <span className="w-5 h-5 rounded-full bg-stone-200/80 dark:bg-stone-700 flex items-center justify-center text-[10px] font-bold text-stone-600 dark:text-stone-300 shrink-0">
                            {i + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-2">
                              <span className="font-kanji text-base sm:text-lg font-black text-stone-900 dark:text-stone-50 group-hover:text-torii dark:group-hover:text-torii-light transition-colors">
                                {v.word}
                              </span>
                              <span className="text-xs font-bold text-torii dark:text-torii-light font-kanji">
                                {v.reading}
                              </span>
                            </div>
                            <div className="text-[11px] text-stone-600 dark:text-stone-300 font-ui truncate">
                              {v.hanViet ? `[${v.hanViet}] • ` : ''}{v.meaning_vi || v.vn}
                            </div>
                          </div>
                        </div>

                        {/* Right: Audio button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playWaterDrop();
                            playJapaneseSpeech(v.word || v.reading || currentChar);
                          }}
                          className="p-1.5 sm:p-2 rounded-xl text-torii group-hover:bg-torii group-hover:text-white transition-all shadow-2xs bg-washi dark:bg-stone-700 border border-torii/20 shrink-0"
                          title="Nghe phát âm"
                        >
                          <VolumeIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-xs text-stone-500">
                      Chưa có từ ghép cho chữ Hán này.
                    </div>
                  )}
                </div>

                {/* Banner chuyển sang Chế độ Phân Tích */}
                <div
                  onClick={() => {
                    playWaterDrop();
                    onToggleAnalysisMode?.();
                  }}
                  className="w-full p-2.5 rounded-2xl bg-torii/5 hover:bg-torii/10 dark:bg-torii/15 border border-torii/25 text-center cursor-pointer transition-all flex items-center justify-between px-3 text-xs group"
                >
                  <div className="flex items-center gap-2 text-stone-700 dark:text-stone-200 font-semibold text-xs">
                    <span className="text-base group-hover:scale-110 transition-transform">🔍</span>
                    <span>Xem chiết tự bộ thủ, mẹo nhớ & câu ví dụ?</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-torii text-white font-bold text-[10px] shadow-2xs group-hover:bg-torii-light transition-colors flex items-center gap-1">
                    <span>Bật Phân tích</span>
                    <kbd className="px-1 py-0.2 bg-white/20 rounded font-mono text-[9px]">D</kbd>
                  </span>
                </div>
              </div>
            ) : (
              /* CHẾ ĐỘ PHÂN TÍCH CHUYÊN SÂU (DEEP ANALYSIS MODE): Đầy đủ 4 tab, cao độ Tokyo, chiết tự */
              <div className="w-full h-full flex flex-col justify-between flex-1 animate-fadeIn">
                {/* Tab Selector Header (Chuyển đổi 4 trạm tri thức) */}
                <div className="w-full flex items-center justify-between pb-2.5 border-b border-washi-border/70 dark:border-stone-700/80 gap-1">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 w-full text-xs font-bold">
                <button
                  onClick={() => {
                    playWaterDrop();
                    setStudioTab('vocab');
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                    studioTab === 'vocab'
                      ? 'bg-torii text-white shadow-xs font-black'
                      : 'text-stone-700 dark:text-stone-300 hover:text-torii dark:hover:text-torii-light'
                  }`}
                  title="Từ vựng JLPT ghép chữ này"
                >
                  <BambooIcon className={`w-4 h-4 ${studioTab === 'vocab' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                  <span>Từ ghép</span>
                  <span className="text-[10px] opacity-80">({cardInfo?.vocab?.length || 0})</span>
                </button>

                <button
                  onClick={() => {
                    playWaterDrop();
                    setStudioTab('radical');
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                    studioTab === 'radical'
                      ? 'bg-torii text-white shadow-xs font-black'
                      : 'text-stone-700 dark:text-stone-300 hover:text-torii dark:hover:text-torii-light'
                  }`}
                  title="Chiết tự bộ thủ cấu thành"
                >
                  <RadicalIcon className={`w-4 h-4 ${studioTab === 'radical' ? 'text-white' : 'text-torii dark:text-torii-light'}`} />
                  <span>Bộ thủ</span>
                </button>

                <button
                  onClick={() => {
                    playWaterDrop();
                    setStudioTab('mnemonic');
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                    studioTab === 'mnemonic'
                      ? 'bg-torii text-white shadow-xs font-black'
                      : 'text-stone-700 dark:text-stone-300 hover:text-torii dark:hover:text-torii-light'
                  }`}
                  title="Mẹo ghi nhớ & Tranh tượng hình"
                >
                  <MnemonicIcon className={`w-4 h-4 ${studioTab === 'mnemonic' ? 'text-white' : 'text-amber-500 dark:text-amber-400'}`} />
                  <span>Mẹo nhớ</span>
                </button>

                <button
                  onClick={() => {
                    playWaterDrop();
                    setStudioTab('example');
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                    studioTab === 'example'
                      ? 'bg-torii text-white shadow-xs font-black'
                      : 'text-stone-700 dark:text-stone-300 hover:text-torii dark:hover:text-torii-light'
                  }`}
                  title="Câu ví dụ thực tế"
                >
                  <ScrollUnfurledIcon className={`w-4 h-4 ${studioTab === 'example' ? 'text-white' : 'text-amber-600 dark:text-amber-300'}`} />
                  <span>Ví dụ</span>
                </button>
              </div>
            </div>

            {/* TAB 1: TỪ VỰNG JLPT GHÉP CHỮ (Lưới 2x2 đồng bộ 100% kích thước) */}
            {studioTab === 'vocab' && (
              <div className="flex-1 py-2 flex flex-col justify-between animate-fadeIn">
                <div className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Từ ghép với 「{currentChar}」</span>
                  <span className="text-[10px] text-torii dark:text-torii-light font-semibold lowercase">chạm để nghe phát âm</span>
                </div>

                {cardInfo?.vocab && cardInfo.vocab.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2.5 flex-1 items-stretch">
                    {cardInfo.vocab.slice(0, 4).map((v, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          playWaterDrop();
                          playJapaneseSpeech(v.word || v.reading || currentChar);
                        }}
                        className="p-2.5 rounded-2xl border border-washi-border dark:border-stone-700/80 bg-stone-100/70 dark:bg-stone-800/80 hover:border-torii/60 dark:hover:border-torii-light hover:shadow-xs transition-all flex flex-col justify-between items-center text-center group cursor-pointer active:scale-98 min-h-[125px]"
                      >
                        {/* 1. Kanji + Furigana Slot (40px) */}
                        <div className="h-10 w-full flex items-center justify-center">
                          <div className="font-kanji text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50 group-hover:text-torii dark:group-hover:text-torii-light transition-colors leading-none">
                            {showFurigana ? (
                              <ruby className="ruby-furigana">
                                {v.word}
                                <rt className="ruby-rt">{v.reading}</rt>
                              </ruby>
                            ) : (
                              v.word
                            )}
                          </div>
                        </div>

                        {/* 2. Pitch Accent Slot (22px) */}
                        <div className="h-[22px] w-full flex items-center justify-center">
                          {v.reading ? (
                            <PitchAccentVisualizer word={v.word} reading={v.reading} />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600" />
                          )}
                        </div>

                        {/* 3. Vietnamese Meaning Slot (32px) */}
                        <div className="h-8 w-full flex items-center justify-center pt-1 border-t border-washi-border/60 dark:border-stone-700/60">
                          <span className="text-[11px] font-semibold leading-tight text-stone-700 dark:text-stone-200 line-clamp-2 w-full text-center">
                            {v.meaning_vi || v.vn}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-xs text-stone-500">
                    Đang cập nhật từ ghép cho chữ này...
                  </div>
                )}

                <div className="pt-2 text-center text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                  Tích hợp trực quan hóa cao độ Tokyo NHK Pitch Accent
                </div>
              </div>
            )}

            {/* TAB 2: CHIẾT TỰ & BỘ THỦ CẤU THÀNH */}
            {studioTab === 'radical' && (
              <div className="flex-1 py-2 flex flex-col justify-between animate-fadeIn overflow-y-auto">
                <div>
                  <div className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Phân rã chiết tự Hán tự</span>
                    <span className="text-[10px] text-torii font-bold">214 Bộ Thủ</span>
                  </div>

                  <RadicalBreakdownCard
                    currentChar={currentChar}
                    cardInfo={cardInfo}
                    onOpenRadicalModal={onOpenRadicalModal}
                  />

                  <div className="mt-2.5 p-3 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 text-xs">
                    <span className="font-bold text-torii block mb-1">Mẹo học nhanh qua bộ thủ:</span>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11px]">
                      Ghi nhớ Hán tự bằng cách nhận diện các bộ phận cấu thành giúp bạn suy luận ý nghĩa và viết đúng thứ tự nét bút dễ dàng hơn 300%.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playWoodClapper();
                    if (onOpenRadicalModal) onOpenRadicalModal();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-torii/10 dark:bg-torii/20 hover:bg-torii hover:text-white text-torii dark:text-torii-light font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Mở bảng tra cứu 214 Bộ thủ chi tiết [R]</span>
                  <span>➔</span>
                </button>
              </div>
            )}

            {/* TAB 3: HÌNH TƯỢNG & MẸO GHI NHỚ TRANH MỘC BẢN */}
            {studioTab === 'mnemonic' && (
              <div className="flex-1 py-2 flex flex-col justify-between animate-fadeIn overflow-y-auto">
                <div>
                  <div className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Ghi nhớ bằng hình ảnh tượng hình</span>
                    <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold">Ukiyo-e Visual</span>
                  </div>

                  <KanjiIllustrationBox currentChar={currentChar} cardInfo={cardInfo} variant="back" />
                </div>

                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
                  💡 <strong>Kỹ thuật não phải:</strong> Kết nối hình ảnh với âm thanh giúp kích hoạt trí nhớ dài hạn (Long-term Memory) mà không cần chép phạt.
                </div>
              </div>
            )}

            {/* TAB 4: CÂU VÍ DỤ THỰC TẾ */}
            {studioTab === 'example' && (
              <div className="flex-1 py-2 flex flex-col justify-between animate-fadeIn overflow-y-auto">
                <div>
                  <div className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Ngữ cảnh sử dụng trong câu</span>
                    <button
                      onClick={() => {
                        playWaterDrop();
                        const cleanSentence = cardInfo?.example?.sentence || cardInfo?.exampleJp?.replace(/<[^>]+>/g, '') || currentChar;
                        playJapaneseSpeech(cleanSentence);
                      }}
                      className="text-xs font-bold text-torii dark:text-torii-light hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <VolumeIcon className="w-3.5 h-3.5" />
                      <span>Nghe câu mẫu</span>
                    </button>
                  </div>

                  {cardInfo?.exampleJp ? (
                    <div className="p-3.5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex flex-col gap-2 text-left">
                      <p
                        className="font-kanji text-base sm:text-lg font-bold leading-relaxed text-stone-900 dark:text-stone-50"
                        dangerouslySetInnerHTML={{
                          __html: (cardInfo.exampleJp.includes(currentChar) && !cardInfo.exampleJp.includes('text-torii'))
                            ? cardInfo.exampleJp.replace(new RegExp(currentChar, 'g'), `<span class="text-torii dark:text-torii-light font-bold underline decoration-torii/40">${currentChar}</span>`)
                            : cardInfo.exampleJp
                        }}
                      />
                      {cardInfo.example?.reading && (
                        <p className="text-xs text-torii/90 dark:text-torii-light/90 font-kanji font-medium">
                          {cardInfo.example.reading}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic font-medium pt-1 border-t border-washi-border/60 dark:border-stone-700/60">
                        → Dịch nghĩa: {cardInfo.exampleVn || cardInfo.example?.translation || ''}
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-stone-500">
                      Chưa có câu ví dụ cho chữ này.
                    </div>
                  )}
                </div>

                <div className="text-center text-[11px] text-stone-500 dark:text-stone-400">
                  Phát âm trí tuệ nhân tạo giọng Tokyo bản ngữ chuẩn
                </div>
              </div>
            )}

                {/* Bottom Station Quick Hint */}
                <div className="pt-2 border-t border-washi-border/70 dark:border-stone-700/80 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span>Trạm tri thức chuyên sâu</span>
                  <button
                    onClick={onToggleAnalysisMode}
                    className="font-mono font-bold text-torii dark:text-torii-light hover:underline cursor-pointer"
                  >
                    Về Tinh giản [D] ↻
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
