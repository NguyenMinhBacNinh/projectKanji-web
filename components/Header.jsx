'use client';

import { useState, useEffect, useRef } from 'react';
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
  SettingsSlidersIcon,
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
  isAnalysisMode = false,
  onToggleAnalysisMode,
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  // Close settings on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setIsSettingsOpen(false);
      }
    };
    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

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
      {/* Unified Top Navigation Shell (Tích hợp 2 tầng, tránh phân mảnh) */}
      <div className="w-full rounded-2xl bg-washi-light/95 dark:bg-stone-900/95 border border-washi-border dark:border-stone-700/80 shadow-xs backdrop-blur-md relative">
        {/* Tier 1: Main Top Navigation Bar */}
        <div className="w-full flex items-center justify-between py-2 px-3 sm:px-4 gap-2">
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
          <nav className="flex items-center p-1 rounded-xl bg-[#f0ebe1] dark:bg-[#1a2332] border border-[#dfd5c3] dark:border-stone-700 font-ui text-xs font-bold gap-1">
            {/* 1. Hán tự */}
            <button
              onClick={() => handleSelectPrimary('kanji')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${primaryGroup === 'kanji'
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
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${primaryGroup === 'knowledge'
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
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${primaryGroup === 'practice'
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
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 relative ${primaryGroup === 'notebook'
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
            {/* Mode Switch: ⛩️ Tinh Giản / 🔍 Phân Tích */}
            {onToggleAnalysisMode && (
              <button
                onClick={() => {
                  playWaterDrop();
                  onToggleAnalysisMode();
                }}
                className={`h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all active:scale-95 shadow-2xs ${isAnalysisMode
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-900 dark:text-amber-200 shadow-xs'
                    : 'bg-torii/10 border-torii/40 text-torii dark:text-torii-light'
                  }`}
                title="Phím tắt [D]: Chuyển đổi Chế độ Học Tinh Giản & Phân Tích Chuyên Sâu"
              >
                <span className="text-sm">{isAnalysisMode ? '🔍' : '⛩️'}</span>
                <span className="hidden sm:inline font-bold">
                  {isAnalysisMode ? 'Phân tích' : 'Tinh giản'}
                </span>
                <kbd className="hidden md:inline px-1 py-0.2 text-[9px] rounded bg-black/5 dark:bg-white/10 font-mono opacity-75">
                  D
                </kbd>
              </button>
            )}

            {/* Quick Search Spotlight */}
            {onOpenSpotlight && (
              <button
                onClick={() => {
                  playWaterDrop();
                  onOpenSpotlight();
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 hover:border-torii/50 hover:bg-torii/10 text-torii dark:text-torii-light flex items-center justify-center transition-all text-xs font-bold active:scale-95 shadow-2xs"
                title="Tìm kiếm nhanh Hán tự [⌘K]"
              >
                <SearchIcon className="w-4 h-4" />
              </button>
            )}

            {/* Giao diện Ngày/Đêm */}
            <button
              onClick={() => {
                playWaterDrop();
                onToggleTheme();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 hover:border-torii/50 hover:bg-torii/10 text-sumi dark:text-stone-200 flex items-center justify-center transition-all text-xs font-bold active:scale-95 shadow-2xs"
              title={theme === 'yozakura' ? 'Chuyển sang chế độ Sáng (Washi)' : 'Chuyển sang chế độ Tối (Đêm Kyoto)'}
            >
              {theme === 'yozakura' ? (
                <MoonIcon className="w-4 h-4 text-amber-300" />
              ) : (
                <SunIcon className="w-4 h-4 text-amber-500" />
              )}
            </button>

            {/* Tiện ích & Cài đặt Dropdown Popover */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => {
                  playWaterDrop();
                  setIsSettingsOpen(!isSettingsOpen);
                }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 shadow-2xs relative ${
                  isSettingsOpen
                    ? 'border-torii bg-torii text-white shadow-sm ring-2 ring-torii/30'
                    : 'border-washi-border dark:border-stone-700 bg-washi dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:border-torii/50 hover:bg-torii/10'
                }`}
                title="Cài đặt tiện ích & Âm thanh (Sakura, Nhạc Zen, AI, In ấn, Thống kê)"
              >
                <SettingsSlidersIcon className="w-4 h-4" />
                {isZenMusicPlaying && !isSettingsOpen && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-800 animate-pulse" />
                )}
              </button>

              {isSettingsOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-[#fffdfa] dark:bg-[#141c2b] border-2 border-[#e6dece] dark:border-[#2d3a4f] shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-3 flex flex-col gap-2 z-[100] text-xs animate-fadeIn backdrop-blur-none"
                >
                  {/* Header popup */}
                  <div className="px-1 py-1 border-b border-[#ebdccb] dark:border-stone-700/80 pb-2 mb-0.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[12px] text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                        <SettingsSlidersIcon className="w-3.5 h-3.5 text-torii" />
                        <span>Tiện ích & Cài đặt</span>
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">Tùy biến không gian học Zen</div>
                    </div>
                    <button
                      onClick={() => setIsSettingsOpen(false)}
                      className="w-5 h-5 rounded-md hover:bg-stone-200 dark:hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-xs font-bold transition-colors"
                      title="Đóng menu"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Nhóm 1: Không gian & Âm thanh */}
                  <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 px-1 pt-0.5">
                    Không gian & Âm thanh
                  </div>

                  {/* Hoa anh đào rơi */}
                  {onTogglePetals && (
                    <button
                      onClick={() => {
                        playWaterDrop();
                        onTogglePetals();
                      }}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 text-left flex items-center justify-between transition-colors text-stone-800 dark:text-stone-100 font-medium border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
                    >
                      <div className="flex items-center gap-2">
                        <SakuraFlowerIcon className="w-4 h-4 text-pink-500 shrink-0" />
                        <div>
                          <div className="font-bold text-xs">Cánh hoa Sakura rơi</div>
                          <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">Hiệu ứng rơi lãng mạn</div>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${petalsEnabled
                            ? 'bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-500'
                          }`}
                      >
                        {petalsEnabled ? 'Đang bật' : 'Tắt'}
                      </span>
                    </button>
                  )}

                  {/* Âm thanh click */}
                  {onToggleMute && (
                    <button
                      onClick={() => {
                        onToggleMute();
                      }}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 text-left flex items-center justify-between transition-colors text-stone-800 dark:text-stone-100 font-medium border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
                    >
                      <div className="flex items-center gap-2">
                        {isMuted ? (
                          <VolumeMuteIcon className="w-4 h-4 text-stone-400 shrink-0" />
                        ) : (
                          <VolumeIcon className="w-4 h-4 text-torii shrink-0" />
                        )}
                        <div>
                          <div className="font-bold text-xs">Âm thanh thao tác</div>
                          <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">Phách gỗ & gõ mõ thiền</div>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${!isMuted
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-500'
                          }`}
                      >
                        {!isMuted ? 'Đang bật' : 'Tắt'}
                      </span>
                    </button>
                  )}

                  {/* Nhạc thiền Zen */}
                  {onToggleZenMusic && (
                    <button
                      onClick={() => {
                        onToggleZenMusic();
                      }}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 text-left flex items-center justify-between transition-colors text-stone-800 dark:text-stone-100 font-medium border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
                    >
                      <div className="flex items-center gap-2">
                        <LotusZenIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-bold text-xs">Nhạc thiền Zen Koto</div>
                          <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">Đàn tranh Kyoto tịnh tâm</div>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isZenMusicPlaying
                            ? 'bg-emerald-600 text-white animate-pulse'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-500'
                          }`}
                      >
                        {isZenMusicPlaying ? 'Đang phát' : 'Tắt'}
                      </span>
                    </button>
                  )}

                  <div className="my-0.5 border-t border-[#ebdccb] dark:border-stone-700/80" />

                  {/* Nhóm 2: Công cụ học tập */}
                  <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 px-1 pt-0.5">
                    Công cụ học tập chuyên sâu
                  </div>

                  {/* AI Shadowing */}
                  {onOpenVoiceShadowing && (
                    <button
                      onClick={() => {
                        setIsSettingsOpen(false);
                        playWaterDrop();
                        onOpenVoiceShadowing();
                      }}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-torii hover:text-white text-left flex items-center justify-between transition-all text-stone-800 dark:text-stone-100 font-medium group border border-transparent hover:border-torii"
                    >
                      <div className="flex items-center gap-2">
                        <MicShadowingIcon className="w-4 h-4 text-torii group-hover:text-white shrink-0" />
                        <div>
                          <div className="font-bold text-xs">Luyện nói AI Shadowing</div>
                          <div className="text-[10px] opacity-75">Chuẩn ngữ điệu Tokyo Pitch</div>
                        </div>
                      </div>
                      <span className="text-stone-400 group-hover:text-white text-xs">→</span>
                    </button>
                  )}

                  {/* Printable Worksheet */}
                  {onOpenWorksheetModal && (
                    <button
                      onClick={() => {
                        setIsSettingsOpen(false);
                        playWaterDrop();
                        onOpenWorksheetModal();
                      }}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-torii hover:text-white text-left flex items-center justify-between transition-all text-stone-800 dark:text-stone-100 font-medium group border border-transparent hover:border-torii"
                    >
                      <div className="flex items-center gap-2">
                        <FountainPenIcon className="w-4 h-4 text-torii group-hover:text-white shrink-0" />
                        <div>
                          <div className="font-bold text-xs">In phiếu tập viết ô mễ A4</div>
                          <div className="text-[10px] opacity-75">Xuất file PDF luyện viết tay</div>
                        </div>
                      </div>
                      <span className="text-stone-400 group-hover:text-white text-xs">→</span>
                    </button>
                  )}

                  {/* Thống kê Heatmap */}
                  {onOpenStatsModal && (
                    <button
                      onClick={() => {
                        setIsSettingsOpen(false);
                        playWaterDrop();
                        onOpenStatsModal();
                      }}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-torii hover:text-white text-left flex items-center justify-between transition-all text-stone-800 dark:text-stone-100 font-medium group border border-transparent hover:border-torii"
                    >
                      <div className="flex items-center gap-2">
                        <StatsIcon className="w-4 h-4 text-torii group-hover:text-white shrink-0" />
                        <div>
                          <div className="font-bold text-xs">Thống kê tiến độ & Heatmap</div>
                          <div className="text-[10px] opacity-75">Chu kỳ nhớ & tần suất ôn</div>
                        </div>
                      </div>
                      <span className="text-stone-400 group-hover:text-white text-xs">→</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tier 2: Integrated Sub-Navigation Ribbon (Chỉ hiện khi ở 'knowledge' hoặc 'practice') */}
        {primaryGroup === 'knowledge' && (
          <div className="w-full border-t border-[#ebdccb] dark:border-stone-700/70 py-1.5 px-3 bg-[#f7f3ec] dark:bg-[#151d2a] flex items-center justify-center gap-1 sm:gap-1.5 text-xs font-bold animate-fadeIn flex-wrap">
            <button
              onClick={() => {
                playWoodClapper();
                setActiveMode('kana');
              }}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${activeMode === 'kana'
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
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${activeMode === 'vocab'
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
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${activeMode === 'grammar'
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
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${activeMode === 'reading'
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
          <div className="w-full border-t border-[#ebdccb] dark:border-stone-700/70 py-1.5 px-3 bg-[#f7f3ec] dark:bg-[#151d2a] flex items-center justify-center gap-1 sm:gap-1.5 text-xs font-bold animate-fadeIn flex-wrap">
            <button
              onClick={() => {
                playWoodClapper();
                setActiveMode('quiz');
              }}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${activeMode === 'quiz'
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
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${activeMode === 'listening'
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
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${activeMode === 'karuta'
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
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${activeMode === 'speed'
                  ? 'bg-torii dark:bg-torii-light text-white shadow-xs font-black'
                  : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
                }`}
            >
              <KatanaIcon className="w-3.5 h-3.5" />
              <span>Đấu trường 60s</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
