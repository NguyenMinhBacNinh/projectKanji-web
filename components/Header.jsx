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
  isZenMusicPlaying,
  onToggleZenMusic,
  petalsEnabled = true,
  onTogglePetals,
  autoSpeechEnabled = false,
  onToggleAutoSpeech,
  onReplaySplash,
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
    <header className="w-full max-w-[1020px] 2xl:max-w-6xl flex flex-col items-center gap-1 sm:gap-1.5 relative z-30 select-none">
      {/* Unified Top Navigation Shell (Kyoto Zen Sanctuary Header) */}
      <div className="w-full rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700/80 shadow-md shadow-stone-900/5 dark:shadow-black/30 backdrop-blur-md relative">
        {/* Tier 1: Main Top Navigation Bar */}
        <div className="w-full flex items-center justify-between py-1.5 sm:py-2 px-2.5 sm:px-4 gap-2">
          {/* Left: Brand Identity with New Official Logo */}
          <div
            onClick={() => {
              handleSelectPrimary('kanji');
              if (onReplaySplash) onReplaySplash();
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0 select-none"
            title="Trang chủ • 漢字学習帳 (Kanji Gakushūchō) - Chạm để xem chuyển cảnh Zen"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-[#1E2633] flex items-center justify-center border-2 border-stone-850 dark:border-amber-400/80 shadow-manga-sm p-0.5 transition-all duration-200 group-hover:scale-105 group-hover:border-torii overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={theme === 'yozakura' ? '/images/logo_emblem_dark.png' : '/images/logo_emblem.png'}
                alt="Logo 漢字学習帳"
                className="w-full h-full object-contain filter drop-shadow-2xs"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black font-kanji tracking-tight text-stone-900 dark:text-white flex items-center gap-1.5">
                  <span>漢字学習帳</span>
                </span>
                <span className="text-[10px] font-bold font-serif px-2 py-0.5 rounded-lg bg-amber-100/90 dark:bg-stone-800 text-amber-900 dark:text-amber-200 border border-amber-800/30 dark:border-amber-400/30 hidden md:inline-flex items-center gap-1 shadow-2xs">
                  <span>侘寂</span>
                  <span>WABI-SABI</span>
                </span>
              </div>
            </div>
          </div>

          {/* Center: 4 Core Navigation Tabs */}
          <nav className="flex items-center p-1 rounded-xl bg-[#F5EFE6] dark:bg-[#1C2431] border border-[#E3DACB] dark:border-stone-700 shadow-2xs font-ui text-xs font-bold gap-1">
            {/* 1. Hán tự */}
            <button
              onClick={() => handleSelectPrimary('kanji')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${primaryGroup === 'kanji'
                  ? 'bg-[#BC002D] text-white shadow-xs font-bold'
                  : 'text-stone-700 dark:text-stone-200 hover:bg-[#EAE1D2] dark:hover:bg-stone-800 hover:text-stone-950'
                }`}
            >
              <ToriiShrineIcon className="w-3.5 h-3.5" />
              <span>Hán tự</span>
            </button>

            {/* 2. Bài học */}
            <button
              onClick={() => handleSelectPrimary('knowledge')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${primaryGroup === 'knowledge'
                  ? 'bg-[#BC002D] text-white shadow-xs font-bold'
                  : 'text-stone-700 dark:text-stone-200 hover:bg-[#EAE1D2] dark:hover:bg-stone-800 hover:text-stone-950'
                }`}
            >
              <BambooIcon className="w-3.5 h-3.5" />
              <span>Bài học</span>
            </button>

            {/* 3. Luyện tập */}
            <button
              onClick={() => handleSelectPrimary('practice')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${primaryGroup === 'practice'
                  ? 'bg-[#BC002D] text-white shadow-xs font-bold'
                  : 'text-stone-700 dark:text-stone-200 hover:bg-[#EAE1D2] dark:hover:bg-stone-800 hover:text-stone-950'
                }`}
            >
              <SensuFanIcon className="w-3.5 h-3.5" />
              <span>Luyện tập</span>
            </button>

            {/* 4. Sổ tay */}
            <button
              onClick={() => handleSelectPrimary('notebook')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 relative ${primaryGroup === 'notebook'
                  ? 'bg-[#BC002D] text-white shadow-xs font-bold'
                  : 'text-stone-700 dark:text-stone-200 hover:bg-[#EAE1D2] dark:hover:bg-stone-800 hover:text-stone-950'
                }`}
            >
              <ScrollUnfurledIcon className="w-3.5 h-3.5" />
              <span>Sổ tay</span>
              {notebookCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-[9px] font-black rounded-full bg-[#BC002D] text-white">
                  {notebookCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right: Clean Unified Tool Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Search Spotlight */}
            {onOpenSpotlight && (
              <button
                onClick={() => {
                  playWaterDrop();
                  onOpenSpotlight();
                }}
                className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl border border-[#D8CEBF] dark:border-stone-700 bg-white/80 dark:bg-stone-800 hover:bg-[#F2ECE0] dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 flex items-center justify-center gap-1.5 transition-all text-xs font-bold shadow-2xs cursor-pointer active:scale-95"
                title="Tìm kiếm nhanh Hán tự [⌘K]"
              >
                <SearchIcon className="w-4 h-4" />
                <kbd className="hidden sm:inline-block text-[9px] font-mono px-1 py-0.2 rounded bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-600">⌘K</kbd>
              </button>
            )}

            {/* Giao diện Ngày/Đêm */}
            <button
              onClick={() => {
                playWaterDrop();
                onToggleTheme();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#D8CEBF] dark:border-stone-700 bg-white/80 dark:bg-stone-800 hover:bg-[#F2ECE0] dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 flex items-center justify-center transition-all text-xs font-bold shadow-2xs cursor-pointer active:scale-95"
              title={theme === 'yozakura' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
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
                    ? 'border-[#BC002D] bg-[#BC002D] text-white shadow-xs'
                    : 'border-[#D8CEBF] dark:border-stone-700 bg-white/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:border-[#BC002D]/50 hover:bg-[#BC002D]/10'
                }`}
                title="Cài đặt không gian & Âm thanh Zen"
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
                        <span>Cài đặt không gian Zen</span>
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">Tùy biến môi trường & âm thanh</div>
                    </div>
                    <button
                      onClick={() => setIsSettingsOpen(false)}
                      className="w-5 h-5 rounded-md hover:bg-stone-200 dark:hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-xs font-bold transition-colors cursor-pointer"
                      title="Đóng menu"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Nhóm Cài đặt Môi trường & Âm thanh */}
                  <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 px-1 pt-0.5">
                    Hiệu ứng & Âm thanh
                  </div>

                  {/* Hoa anh đào rơi */}
                  {onTogglePetals && (
                    <button
                      onClick={() => {
                        playWaterDrop();
                        onTogglePetals();
                      }}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 text-left flex items-center justify-between transition-colors text-stone-800 dark:text-stone-100 font-medium border border-transparent hover:border-stone-200 dark:hover:border-stone-700 cursor-pointer"
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
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 text-left flex items-center justify-between transition-colors text-stone-800 dark:text-stone-100 font-medium border border-transparent hover:border-stone-200 dark:hover:border-stone-700 cursor-pointer"
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
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 text-left flex items-center justify-between transition-colors text-stone-800 dark:text-stone-100 font-medium border border-transparent hover:border-stone-200 dark:hover:border-stone-700 cursor-pointer"
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

                  {/* Tự động phát âm thanh khi chuyển thẻ */}
                  {onToggleAutoSpeech && (
                    <button
                      onClick={() => {
                        playWaterDrop();
                        onToggleAutoSpeech();
                      }}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 text-left flex items-center justify-between transition-colors text-stone-800 dark:text-stone-100 font-medium border border-transparent hover:border-stone-200 dark:hover:border-stone-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <VolumeIcon className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <div>
                          <div className="font-bold text-xs">Tự động đọc Hán tự</div>
                          <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">Phát âm khi chuyển thẻ</div>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${autoSpeechEnabled
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-500'
                          }`}
                      >
                        {autoSpeechEnabled ? 'Đang bật' : 'Tắt'}
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tier 2: Integrated Sub-Navigation Ribbon (Chỉ hiện khi ở 'knowledge' hoặc 'practice') */}
        {primaryGroup === 'knowledge' && (
          <div className="w-full border-t border-[#ebdccb] dark:border-stone-700/70 py-1 px-2.5 bg-[#f7f3ec] dark:bg-[#151d2a] flex items-center justify-center gap-1 sm:gap-1.5 text-xs font-bold animate-fadeIn flex-wrap">
            <button
              onClick={() => {
                playWoodClapper();
                setActiveMode('kana');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${activeMode === 'kana'
                  ? 'bg-torii dark:bg-torii-light text-white shadow-2xs font-black'
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
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${activeMode === 'vocab'
                  ? 'bg-torii dark:bg-torii-light text-white shadow-2xs font-black'
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
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${activeMode === 'grammar'
                  ? 'bg-torii dark:bg-torii-light text-white shadow-2xs font-black'
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
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${activeMode === 'reading'
                  ? 'bg-torii dark:bg-torii-light text-white shadow-2xs font-black'
                  : 'text-sumi dark:text-stone-300 opacity-75 hover:opacity-100 hover:text-torii dark:hover:text-torii-light'
                }`}
            >
              <JapaneseBridgeIcon className="w-3.5 h-3.5" />
              <span>Đọc hiểu Dokkai</span>
            </button>
          </div>
        )}

        {primaryGroup === 'practice' && (
          <div className="w-full border-t border-[#ebdccb] dark:border-stone-700/70 py-1 px-2.5 bg-[#f7f3ec] dark:bg-[#151d2a] flex items-center justify-center gap-1 sm:gap-1.5 text-xs font-bold animate-fadeIn flex-wrap">
            <button
              onClick={() => {
                playWoodClapper();
                setActiveMode('quiz');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${activeMode === 'quiz'
                  ? 'bg-torii dark:bg-torii-light text-white shadow-2xs font-black'
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
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${activeMode === 'listening'
                  ? 'bg-torii dark:bg-torii-light text-white shadow-2xs font-black'
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
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${activeMode === 'karuta'
                  ? 'bg-torii dark:bg-torii-light text-white shadow-2xs font-black'
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
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${activeMode === 'speed'
                  ? 'bg-torii dark:bg-torii-light text-white shadow-2xs font-black'
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
