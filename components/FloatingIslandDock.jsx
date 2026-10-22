'use client';

import {
  playWoodClapper,
  playHankoStamp,
  playTempleBell,
  playWaterDrop,
} from '../lib/traditionalAudio';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ReviewRecallIcon,
  MasteredCheckIcon,
  ShuffleIcon,
  GridIcon,
  VolumeIcon,
} from './ZenIcons';

/**
 * FloatingIslandDock - Dynamic Island / macOS Dock Style Navigation
 * Thanh điều hướng lơ lửng bo tròn ở đáy màn hình:
 * - [← Trước] [⟲ Lật thẻ SPACE] [Tiếp →]
 * - [Sổ tay 1] [Đã thuộc 2]
 * - [🔀] [⊞ G] [🔊 A]
 */
export default function FloatingIslandDock({
  onPrevCard,
  onNextCard,
  isFlipped,
  setIsFlipped,
  onMarkForgotten,
  onMarkMastered,
  isMastered = false,
  isShuffled = false,
  onToggleShuffle,
  onOpenGridModal,
  onPlaySpeech,
}) {
  return (
    <nav
      aria-label="Điều hướng học tập Floating Island"
      className="w-full flex justify-center sticky bottom-2.5 sm:bottom-3 z-40 px-2 mt-auto select-none pointer-events-auto"
    >
      <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-full bg-white/92 dark:bg-[#141B26]/92 backdrop-blur-2xl border border-stone-200/80 dark:border-stone-800/80 shadow-[0_20px_50px_-10px_rgba(45,38,28,0.16)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.65)] transition-all duration-300 max-w-full overflow-x-auto thin-scrollbar">
        {/* GROUP 1: CARD FLIP & NAVIGATION */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Nút Trước [←] */}
          <button
            onClick={() => {
              playWoodClapper();
              onPrevCard();
            }}
            className="py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800/80 text-stone-700 dark:text-stone-300 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer group"
            title="Chữ trước [←]"
          >
            <ChevronLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-600 dark:text-stone-300 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Trước</span>
            <kbd className="hidden md:inline-block text-[9px] font-mono px-1 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border border-stone-200/80 dark:border-stone-700">←</kbd>
          </button>

          {/* Hero Capsule: Lật thẻ [Space] */}
          <button
            onClick={() => {
              playWoodClapper();
              setIsFlipped(!isFlipped);
            }}
            className="py-1.5 sm:py-2 px-3.5 sm:px-5 rounded-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-850 dark:hover:bg-white text-white dark:text-stone-950 text-xs sm:text-sm font-black flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer group ring-1 ring-black/5 dark:ring-white/20"
            title="Lật thẻ [Space]"
          >
            <span className="text-sm transition-transform duration-500 group-hover:rotate-180">⟲</span>
            <span className="tracking-wide">
              {isFlipped ? 'MẶT TRƯỚC' : 'LẬT THẺ'}
            </span>
            <kbd className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-white/20 dark:bg-black/20 text-white/90 dark:text-black/90 font-bold tracking-tight">
              SPACE
            </kbd>
          </button>

          {/* Nút Tiếp [→] */}
          <button
            onClick={() => {
              playWoodClapper();
              onNextCard();
            }}
            className="py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-full bg-[#BC002D] hover:bg-[#A30027] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer group"
            title="Chữ kế tiếp [→]"
          >
            <span className="hidden sm:inline">Tiếp</span>
            <ChevronRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
            <kbd className="hidden md:inline-block text-[9px] font-mono px-1 py-0.2 rounded bg-black/25 text-white">→</kbd>
          </button>
        </div>

        {/* Hairline Divider */}
        <div className="w-px h-5 sm:h-6 bg-stone-200 dark:bg-stone-800 mx-0.5 sm:mx-1 shrink-0" />

        {/* GROUP 2: SRS HAPTIC MEMORY QUICK-TAGS */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Chưa nhớ [1] */}
          <button
            onClick={() => {
              playHankoStamp();
              onMarkForgotten();
            }}
            className="py-1.5 sm:py-2 px-2 sm:px-3 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/25 dark:border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer group"
            title="Lưu vào Sổ tay chưa nhớ [Phím 1]"
          >
            <ReviewRecallIcon className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300" />
            <span className="hidden md:inline">Chưa nhớ</span>
            <kbd className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full text-[9px] font-mono font-bold flex items-center justify-center bg-amber-900/15 dark:bg-amber-400/20 text-amber-900 dark:text-amber-200">1</kbd>
          </button>

          {/* Đã thuộc [2] */}
          <button
            onClick={() => {
              playTempleBell();
              onMarkMastered();
            }}
            className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer border ${
              isMastered
                ? 'bg-[#2D6A4F] text-white border-[#1B4332] shadow-xs'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border-emerald-500/25 dark:border-emerald-500/30'
            }`}
            title="Đánh dấu đã thuộc lòng [Phím 2]"
          >
            <MasteredCheckIcon className={`w-3.5 h-3.5 ${isMastered ? 'text-white' : 'text-emerald-700 dark:text-emerald-400'}`} />
            <span className="hidden md:inline">{isMastered ? 'Đã thuộc' : 'Thuộc'}</span>
            <kbd className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full text-[9px] font-mono font-bold flex items-center justify-center ${
              isMastered
                ? 'bg-black/25 text-white'
                : 'bg-emerald-900/15 dark:bg-emerald-400/20 text-emerald-900 dark:text-emerald-200'
            }`}>2</kbd>
          </button>
        </div>

        {/* Hairline Divider */}
        <div className="w-px h-5 sm:h-6 bg-stone-200 dark:bg-stone-800 mx-0.5 sm:mx-1 shrink-0" />

        {/* GROUP 3: SECONDARY COMPACT TOOLS */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          {/* Phát âm nhanh [A] */}
          {onPlaySpeech && (
            <button
              onClick={() => {
                playWaterDrop();
                onPlaySpeech();
              }}
              className="p-1.5 sm:p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800/80 text-stone-700 dark:text-stone-300 transition-all active:scale-95 cursor-pointer"
              title="Phát âm chữ Hán [A]"
            >
              <VolumeIcon className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Xáo trộn */}
          {onToggleShuffle && (
            <button
              onClick={() => {
                playWoodClapper();
                onToggleShuffle();
              }}
              className={`p-1.5 sm:p-2 rounded-full transition-all active:scale-95 cursor-pointer ${
                isShuffled
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800/80 text-stone-700 dark:text-stone-300'
              }`}
              title="Xáo trộn danh sách học"
            >
              <ShuffleIcon className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mục lục Hán tự [G] */}
          {onOpenGridModal && (
            <button
              onClick={() => {
                playWoodClapper();
                onOpenGridModal();
              }}
              className="p-1.5 sm:p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800/80 text-stone-700 dark:text-stone-300 transition-all active:scale-95 cursor-pointer"
              title="Mục lục 2136 Hán tự [G]"
            >
              <GridIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
