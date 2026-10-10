'use client';

import { playWoodClapper, playWaterDrop } from '../lib/traditionalAudio';
import {
  SearchIcon,
  SunIcon,
  MoonIcon,
  VolumeIcon,
  VolumeMuteIcon,
  StatsIcon,
  WorksheetIcon,
  MicShadowingIcon,
  SakuraFlowerIcon,
  ToriiShrineIcon,
  BambooIcon,
  SensuFanIcon,
  ScrollUnfurledIcon,
  OrigamiCraneIcon,
  JapaneseBridgeIcon,
  PagodaIcon,
  KatanaIcon,
  LotusZenIcon,
  FountainPenIcon,
} from './ZenIcons';


export default function Header({
  activeMode,
  setActiveMode,
  notebookCount,
  theme,
  onToggleTheme,
  isMuted,
  onToggleMute,
  onOpenSpotlight,
  onOpenStatsModal,
  onOpenVoiceShadowing,
  onOpenWorksheetModal,
  isZenMusicPlaying,
  onToggleZenMusic,
  petalsEnabled = true,
  onTogglePetals,
}) {
  // Xác định nhóm chính hiện tại dựa trên activeMode
  const getPrimaryGroup = () => {
    if (activeMode === 'study') return 'kanji';
    if (['kana', 'vocab', 'grammar', 'reading'].includes(activeMode)) return 'knowledge';
    if (['quiz', 'listening', 'karuta', 'speed'].includes(activeMode)) return 'practice';
    if (activeMode === 'notebook') return 'notebook';
    return 'kanji';
  };

  const primaryGroup = getPrimaryGroup();

  // Chuyển nhóm chính
  const handleSelectPrimary = (group) => {
    playWoodClapper();
    if (group === 'kanji') setActiveMode('study');
    else if (group === 'knowledge') {
      if (!['kana', 'vocab', 'grammar', 'reading'].includes(activeMode)) {
        setActiveMode('kana');
      }
    } else if (group === 'practice') {
      if (!['quiz', 'listening', 'karuta', 'speed'].includes(activeMode)) {
        setActiveMode('quiz');
      }
    } else if (group === 'notebook') {
      setActiveMode('notebook');
    }
  };

  return (
    <header className="w-full max-w-6xl flex flex-col items-center gap-2.5 relative z-30 select-none">
      {/* Unified Top Navigation Bar (Phong cách thẻ giấy Washi sáng, hài hòa nền trang) */}
      <div className="w-full flex items-center justify-between py-2 px-3 sm:px-4 rounded-2xl bg-washi-light/90 dark:bg-stone-900/90 border border-washi-border dark:border-stone-700/80 shadow-xs backdrop-blur-md gap-2">
        {/* Left: Brand Identity */}
        <div
          onClick={() => handleSelectPrimary('kanji')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-torii to-red-700 dark:from-torii-light dark:to-red-600 flex items-center justify-center text-white shadow-md text-base sm:text-lg transition-transform group-hover:scale-105 font-kanji font-black border-2 border-amber-400/50 relative">
            <span className="relative z-10">漢</span>
            <div className="absolute inset-0 rounded-2xl border border-white/25 pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black font-kanji tracking-tight text-sumi dark:text-stone-100 flex items-center gap-1.5">
                <span>漢字学習帳</span>
              </span>
              <span className="text-[10px] opacity-60 font-ui border-l border-current pl-1.5 hidden md:inline text-sumi dark:text-stone-300">
                Kanji Gakushūchō
              </span>
            </div>
          </div>
        </div>

        {/* Center: 4 Core Navigation Tabs with Authentic Japanese Icons */}
        <nav className="flex items-center p-1 rounded-xl bg-washi/80 dark:bg-stone-850/80 border border-washi-border dark:border-stone-700 font-ui text-xs font-bold gap-1">
          {/* 1. Hán tự */}
          <button
            onClick={() => handleSelectPrimary('kanji')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
              primaryGroup === 'kanji'
                ? 'bg-torii dark:bg-torii-light text-white shadow-sm font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <ToriiShrineIcon className="w-4 h-4 text-amber-300 dark:text-amber-200" />
            <span>Hán tự</span>
          </button>

          {/* 2. Bài học (Kana, Từ vựng, Ngữ pháp, Đọc) */}
          <button
            onClick={() => handleSelectPrimary('knowledge')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
              primaryGroup === 'knowledge'
                ? 'bg-torii dark:bg-torii-light text-white shadow-sm font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <BambooIcon className="w-4 h-4 text-emerald-400 dark:text-emerald-300" />
            <span>Bài học</span>
          </button>

          {/* 3. Luyện tập (Quiz, Nghe hiểu, Karuta, Đấu trường) */}
          <button
            onClick={() => handleSelectPrimary('practice')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
              primaryGroup === 'practice'
                ? 'bg-torii dark:bg-torii-light text-white shadow-sm font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <SensuFanIcon className="w-4 h-4 text-amber-400 dark:text-amber-300" />
            <span>Luyện tập</span>
          </button>

          {/* 4. Sổ tay */}
          <button
            onClick={() => handleSelectPrimary('notebook')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 relative ${
              primaryGroup === 'notebook'
                ? 'bg-torii dark:bg-torii-light text-white shadow-sm font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <ScrollUnfurledIcon className="w-4 h-4 text-amber-300 dark:text-amber-200" />
            <span>Sổ tay</span>
            {notebookCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[9px] bg-amber-500 text-white font-black rounded-full shadow-2xs">
                {notebookCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right: Clean Unified Tool Icons */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Quick Search Spotlight */}
          {onOpenSpotlight && (
            <button
              onClick={() => {
                playWaterDrop();
                onOpenSpotlight();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 hover:border-torii/50 dark:hover:border-torii-light/50 hover:bg-torii/10 dark:hover:bg-torii/20 text-torii dark:text-torii-light flex items-center justify-center transition-all text-xs font-bold active:scale-95 shadow-2xs"
              title="Tìm kiếm nhanh Hán tự (Phím tắt ⌘K)"
            >
              <SearchIcon className="w-4 h-4" />
            </button>
          )}

          {/* AI Voice Shadowing (Luyện nói) */}
          {onOpenVoiceShadowing && (
            <button
              onClick={() => {
                playWaterDrop();
                onOpenVoiceShadowing();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 hover:border-torii/50 dark:hover:border-torii-light/50 hover:bg-torii/10 dark:hover:bg-torii/20 text-torii dark:text-torii-light flex items-center justify-center transition-all text-xs font-bold active:scale-95 shadow-2xs"
              title="Luyện phát âm & Shadowing AI qua Micro"
            >
              <MicShadowingIcon className="w-4 h-4" />
            </button>
          )}

          {/* In phiếu tập viết ô Mễ (Printable Worksheet) */}
          {onOpenWorksheetModal && (
            <button
              onClick={() => {
                playWaterDrop();
                onOpenWorksheetModal();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 hover:border-torii/50 dark:hover:border-torii-light/50 hover:bg-torii/10 dark:hover:bg-torii/20 text-torii dark:text-torii-light flex items-center justify-center transition-all text-xs font-bold active:scale-95 hidden sm:flex shadow-2xs"
              title="In phiếu tập viết ô mễ (米字格) ra giấy A4"
            >
              <FountainPenIcon className="w-4 h-4" />
            </button>
          )}

          {/* Thống kê tiến độ */}
          {onOpenStatsModal && (
            <button
              onClick={() => {
                playWaterDrop();
                onOpenStatsModal();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 hover:border-torii/50 dark:hover:border-torii-light/50 hover:bg-torii/10 dark:hover:bg-torii/20 text-torii dark:text-torii-light flex items-center justify-center transition-all text-xs font-bold active:scale-95 shadow-2xs"
              title="Thống kê tiến độ & Lịch Heatmap"
            >
              <StatsIcon className="w-4 h-4" />
            </button>
          )}

          {/* Bật/Tắt Hiệu ứng Hoa Anh Đào (Sakura Petals) */}
          {onTogglePetals && (
            <button
              onClick={() => {
                playWaterDrop();
                onTogglePetals();
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all text-xs font-bold active:scale-95 shadow-2xs ${
                petalsEnabled
                  ? 'border-pink-300 dark:border-pink-600 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300'
                  : 'border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 text-stone-400 hover:text-pink-500'
              }`}
              title={petalsEnabled ? 'Tắt hiệu ứng cánh hoa anh đào rơi' : 'Bật hiệu ứng cánh hoa anh đào rơi'}
            >
              <SakuraFlowerIcon className="w-4 h-4" />
            </button>
          )}

          {/* Bật/Tắt Hiệu ứng Âm thanh Click */}
          {onToggleMute && (
            <button
              onClick={() => {
                onToggleMute();
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all text-xs font-bold active:scale-95 shadow-2xs ${
                isMuted
                  ? 'border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-400'
                  : 'border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-torii'
              }`}
              title={isMuted ? 'Bật hiệu ứng âm thanh click' : 'Tắt hiệu ứng âm thanh click'}
            >
              {isMuted ? <VolumeMuteIcon className="w-4 h-4" /> : <VolumeIcon className="w-4 h-4" />}
            </button>
          )}

          {/* Nhạc thiền Zen Hirajoshi */}
          {onToggleZenMusic && (
            <button
              onClick={() => {
                onToggleZenMusic();
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all text-xs font-bold relative active:scale-95 shadow-2xs ${
                isZenMusicPlaying
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
              }`}
              title={isZenMusicPlaying ? 'Tắt nhạc thiền Zen đàn Koto' : 'Bật nhạc thiền Zen đàn Koto'}
            >
              <LotusZenIcon className="w-4 h-4" />
              {isZenMusicPlaying && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              )}
            </button>
          )}

          {/* Giao diện Ngày/Đêm (Chế độ tối / sáng) */}
          <button
            onClick={() => {
              playWaterDrop();
              onToggleTheme();
            }}
            className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl border border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 hover:border-torii/50 hover:bg-torii/10 text-sumi dark:text-stone-200 flex items-center justify-center gap-1.5 transition-all text-xs font-bold active:scale-95 shadow-2xs"
            title={theme === 'yozakura' ? 'Chuyển sang chế độ Sáng (Washi)' : 'Chuyển sang chế độ Tối (Đêm Kyoto Yozakura)'}
          >
            <span className="transition-transform duration-300 hover:rotate-12 text-amber-500 dark:text-amber-300">
              {theme === 'yozakura' ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4" />}
            </span>
            <span className="text-[11px] font-semibold hidden md:inline">
              {theme === 'yozakura' ? 'Đêm' : 'Ngày'}
            </span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Pills: Chỉ hiện khi ở 'knowledge' hoặc 'practice' */}
      {primaryGroup === 'knowledge' && (
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-washi-light/90 dark:bg-stone-900/90 border border-washi-border dark:border-stone-700 text-xs font-bold animate-fadeIn shadow-xs flex-wrap justify-center">
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('kana');
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'kana'
                ? 'bg-torii dark:bg-torii-light text-white shadow-xs font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <OrigamiCraneIcon className="w-3.5 h-3.5" />
            <span>Bảng Kana</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('vocab');
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'vocab'
                ? 'bg-torii dark:bg-torii-light text-white shadow-xs font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <BambooIcon className="w-3.5 h-3.5" />
            <span>Từ vựng JLPT</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('grammar');
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'grammar'
                ? 'bg-torii dark:bg-torii-light text-white shadow-xs font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <ScrollUnfurledIcon className="w-3.5 h-3.5" />
            <span>Ngữ pháp JLPT</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('reading');
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'reading'
                ? 'bg-torii dark:bg-torii-light text-white shadow-xs font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <JapaneseBridgeIcon className="w-3.5 h-3.5" />
            <span>Đọc hiểu Dokkai</span>
          </button>
        </div>
      )}

      {primaryGroup === 'practice' && (
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-washi-light/90 dark:bg-stone-900/90 border border-washi-border dark:border-stone-700 text-xs font-bold animate-fadeIn shadow-xs flex-wrap justify-center">
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('quiz');
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'quiz'
                ? 'bg-torii dark:bg-torii-light text-white shadow-xs font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <PagodaIcon className="w-3.5 h-3.5" />
            <span>Trắc nghiệm Quiz</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('listening');
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'listening'
                ? 'bg-torii dark:bg-torii-light text-white shadow-xs font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <VolumeIcon className="w-3.5 h-3.5" />
            <span>Luyện nghe Choukai</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('karuta');
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'karuta'
                ? 'bg-torii dark:bg-torii-light text-white shadow-xs font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <SensuFanIcon className="w-3.5 h-3.5" />
            <span>Thẻ Karuta</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('speed');
            }}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'speed'
                ? 'bg-torii dark:bg-torii-light text-white shadow-xs font-black'
                : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
            }`}
          >
            <KatanaIcon className="w-3.5 h-3.5" />
            <span>Đấu trường 60s</span>
          </button>
        </div>
      )}
    </header>
  );
}
