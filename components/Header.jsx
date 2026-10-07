'use client';

import { playWoodClapper, playWaterDrop } from '../lib/traditionalAudio';

export default function Header({
  activeMode,
  setActiveMode,
  notebookCount,
  theme,
  onToggleTheme,
  onOpenSpotlight,
  onOpenStatsModal,
  onOpenVoiceShadowing,
  onOpenWorksheetModal,
  isZenMusicPlaying,
  onToggleZenMusic,
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
    <header className="w-full max-w-4xl flex flex-col items-center gap-2.5 relative z-30 select-none">
      {/* Unified Top Navigation Bar (Phong cách thẻ giấy Washi sáng, hài hòa nền trang) */}
      <div className="w-full flex items-center justify-between py-2.5 px-3 sm:px-4 rounded-2xl bg-washi-light border border-washi-border shadow-sm gap-2">
        {/* Left: Brand Identity */}
        <div
          onClick={() => handleSelectPrimary('kanji')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-torii flex items-center justify-center text-white shadow-sm text-base sm:text-lg transition-transform group-hover:scale-105">
            ⛩️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black font-kanji tracking-tight text-sumi">
                漢字学習帳
              </span>
              <span className="text-[10px] opacity-60 font-ui border-l border-current pl-1.5 hidden md:inline text-sumi">
                Tiếng Nhật
              </span>
            </div>
          </div>
        </div>

        {/* Center: 4 Core Navigation Tabs (Pill style) */}
        <nav className="flex items-center p-1 rounded-xl bg-washi border border-washi-border font-ui text-xs font-bold gap-1">
          {/* 1. Hán tự */}
          <button
            onClick={() => handleSelectPrimary('kanji')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              primaryGroup === 'kanji'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            <span>📖</span>
            <span className="hidden sm:inline">Hán tự</span>
          </button>

          {/* 2. Bài học (Kana, Từ vựng, Ngữ pháp, Đọc) */}
          <button
            onClick={() => handleSelectPrimary('knowledge')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              primaryGroup === 'knowledge'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            <span>📚</span>
            <span className="hidden sm:inline">Bài học</span>
          </button>

          {/* 3. Luyện tập (Quiz, Nghe hiểu, Karuta, Đấu trường) */}
          <button
            onClick={() => handleSelectPrimary('practice')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              primaryGroup === 'practice'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            <span>🎮</span>
            <span className="hidden sm:inline">Luyện tập</span>
          </button>

          {/* 4. Sổ tay */}
          <button
            onClick={() => handleSelectPrimary('notebook')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 relative ${
              primaryGroup === 'notebook'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            <span>🔖</span>
            <span className="hidden sm:inline">Sổ tay</span>
            {notebookCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[9px] bg-amber-500 text-white font-black rounded-full">
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
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border bg-washi hover:border-torii/50 hover:bg-torii/10 text-torii flex items-center justify-center transition-all text-xs font-bold active:scale-95"
              title="Tìm kiếm nhanh Hán tự (⌘K)"
            >
              <span>🔍</span>
            </button>
          )}

          {/* AI Voice Shadowing (Luyện nói) */}
          {onOpenVoiceShadowing && (
            <button
              onClick={() => {
                playWaterDrop();
                onOpenVoiceShadowing();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border bg-washi hover:border-torii/50 hover:bg-torii/10 text-torii flex items-center justify-center transition-all text-xs font-bold active:scale-95"
              title="Luyện phát âm & Shadowing AI qua Micro"
            >
              <span>🎙️</span>
            </button>
          )}

          {/* In phiếu tập viết ô Mễ (Printable Worksheet) */}
          {onOpenWorksheetModal && (
            <button
              onClick={() => {
                playWaterDrop();
                onOpenWorksheetModal();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border bg-washi hover:border-torii/50 hover:bg-torii/10 text-torii flex items-center justify-center transition-all text-xs font-bold active:scale-95 hidden sm:flex"
              title="In phiếu tập viết ô mễ (米字格) ra giấy A4"
            >
              <span>🖨️</span>
            </button>
          )}

          {/* Thống kê tiến độ */}
          {onOpenStatsModal && (
            <button
              onClick={() => {
                playWaterDrop();
                onOpenStatsModal();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border bg-washi hover:border-torii/50 hover:bg-torii/10 text-torii flex items-center justify-center transition-all text-xs font-bold active:scale-95"
              title="Thống kê tiến độ & Lịch Heatmap"
            >
              <span>📊</span>
            </button>
          )}

          {/* Nhạc thiền Zen Hirajoshi */}
          {onToggleZenMusic && (
            <button
              onClick={() => {
                onToggleZenMusic();
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all text-xs font-bold relative active:scale-95 ${
                isZenMusicPlaying
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                  : 'border-washi-border bg-washi hover:border-torii/50 hover:bg-torii/10 text-emerald-700 dark:text-emerald-300'
              }`}
              title={isZenMusicPlaying ? 'Tắt nhạc thiền Zen đàn Koto' : 'Bật nhạc thiền Zen đàn Koto'}
            >
              <span>🎋</span>
              {isZenMusicPlaying && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              )}
            </button>
          )}

          {/* Giao diện Ngày/Đêm */}
          <button
            onClick={() => {
              playWaterDrop();
              onToggleTheme();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-washi-border bg-washi hover:border-torii/50 hover:bg-torii/10 text-sumi flex items-center justify-center transition-all text-xs active:scale-95"
            title="Đổi giao diện Sáng / Tối"
          >
            <span>{theme === 'yozakura' ? '🌙' : '☀️'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Pills: Chỉ hiện khi ở 'knowledge' hoặc 'practice' */}
      {primaryGroup === 'knowledge' && (
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-washi-light border border-washi-border text-xs font-bold animate-fadeIn shadow-xs flex-wrap justify-center">
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('kana');
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeMode === 'kana'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            🎌 Bảng Kana
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('vocab');
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeMode === 'vocab'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            📖 Từ vựng JLPT
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('grammar');
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeMode === 'grammar'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            📜 Ngữ pháp JLPT
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('reading');
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeMode === 'reading'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            📰 Đọc hiểu Dokkai
          </button>
        </div>
      )}

      {primaryGroup === 'practice' && (
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-washi-light border border-washi-border text-xs font-bold animate-fadeIn shadow-xs flex-wrap justify-center">
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('quiz');
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeMode === 'quiz'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            ⚡ Trắc nghiệm Quiz
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('listening');
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeMode === 'listening'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            🎧 Luyện nghe Choukai
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('karuta');
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeMode === 'karuta'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            🎴 Thẻ Karuta
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveMode('speed');
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeMode === 'speed'
                ? 'bg-torii text-white shadow-xs font-black'
                : 'text-sumi opacity-75 hover:opacity-100 hover:text-torii'
            }`}
          >
            ⚔️ Đấu trường 60s
          </button>
        </div>
      )}
    </header>
  );
}
