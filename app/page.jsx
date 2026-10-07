'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import SakuraPetals from '../components/SakuraPetals';
import JapaneseAtmosphericBackground from '../components/JapaneseAtmosphericBackground';
import StudySection from '../components/StudySection';
import QuizSection from '../components/QuizSection';
import KarutaGameSection from '../components/KarutaGameSection';
import NotebookSection from '../components/NotebookSection';
import KanaSection from '../components/KanaSection';
import GrammarSection from '../components/GrammarSection';
import ReadingSection from '../components/ReadingSection';
import SamuraiSpeedSection from '../components/SamuraiSpeedSection';
import VocabSection from '../components/VocabSection';
import ListeningSection from '../components/ListeningSection';
import VoiceShadowingModal from '../components/VoiceShadowingModal';
import KanjiGridModal from '../components/KanjiGridModal';
import KanjiPracticeModal from '../components/KanjiPracticeModal';
import RadicalModal from '../components/RadicalModal';
import KanjiMindmapModal from '../components/KanjiMindmapModal';
import KanjiWorksheetModal from '../components/KanjiWorksheetModal';
import StatsModal from '../components/StatsModal';
import SpotlightSearchModal from '../components/SpotlightSearchModal';
import Toast from '../components/Toast';
import { KANJI_DATA } from '../lib/kanjiData';
import {
  loadFullDatabase,
  fetchLiveKanjiInfo,
  getLocalKanjiInfo,
  getForgottenKanji,
  saveForgottenKanji,
  getMasteredKanji,
  saveMasteredKanji,
} from '../lib/kanjiService';
import {
  setAudioMuted,
  getAudioMuted,
  toggleZenMusic,
  getZenMusicPlaying,
} from '../lib/traditionalAudio';
import {
  getDueKanjiList,
  recordSrsReview,
  recordDailyActivity,
} from '../lib/srsService';

export default function Home() {
  const [activeMode, setActiveMode] = useState('study');
  const [currentLevel, setCurrentLevel] = useState('N5');
  const [kanjiList, setKanjiList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [cardInfo, setCardInfo] = useState(null);
  const [fullDb, setFullDb] = useState(null);

  const [forgottenList, setForgottenList] = useState([]);
  const [masteredList, setMasteredList] = useState([]);

  // Modals
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);
  const [isRadicalModalOpen, setIsRadicalModalOpen] = useState(false);
  const [isMindmapModalOpen, setIsMindmapModalOpen] = useState(false);
  const [isWorksheetModalOpen, setIsWorksheetModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isVoiceShadowingOpen, setIsVoiceShadowingOpen] = useState(false);

  // SRS and Ambient Zen Music state
  const [dueKanjiList, setDueKanjiList] = useState([]);
  const [isZenPlaying, setIsZenPlaying] = useState(false);

  const [toast, setToast] = useState({ visible: false, message: '', icon: '' });

  // Theme state: 'washi' (mặc định sáng) | 'yozakura' (Đêm Kyoto tối)
  const [theme, setTheme] = useState('washi');

  // Audio mute state
  const [isMuted, setIsMuted] = useState(false);

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'yozakura') {
      root.classList.add('theme-yozakura');
      root.classList.remove('theme-washi');
    } else {
      root.classList.remove('theme-yozakura');
      root.classList.add('theme-washi');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('project_kanji_theme', theme);
    }
  }, [theme]);

  // Load persisted theme + audio preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('project_kanji_theme');
      if (savedTheme === 'yozakura' || savedTheme === 'washi') setTheme(savedTheme);
      const muted = getAudioMuted();
      setIsMuted(muted);
      setAudioMuted(muted);
    }
  }, []);

  const handleToggleTheme = () => {
    setTheme((t) => (t === 'washi' ? 'yozakura' : 'washi'));
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    setAudioMuted(next);
  };

  const showToast = useCallback((message, icon = '🌸') => {
    setToast({ visible: true, message, icon });
    setTimeout(() => {
      setToast({ visible: false, message: '', icon: '' });
    }, 2400);
  }, []);

  // Zen Music toggle (Ngũ cung Hirajoshi & Tiếng đàn Koto)
  const handleToggleZenMusic = () => {
    const next = toggleZenMusic();
    setIsZenPlaying(next);
    if (next) {
      showToast('Đang phát nhạc thiền Zen (Ngũ cung Hirajoshi & Đàn Koto)', '🎋');
    } else {
      showToast('Đã dừng nhạc thiền Zen', '🔇');
    }
  };

  // Refresh SRS due items for current level
  const refreshDueList = useCallback(() => {
    const due = getDueKanjiList(currentLevel);
    setDueKanjiList(due);
  }, [currentLevel]);

  // 1. Initial database and localStorage load
  useEffect(() => {
    loadFullDatabase().then((db) => {
      setFullDb(db);
    });
    setForgottenList(getForgottenKanji());
    setMasteredList(getMasteredKanji());
    recordDailyActivity(0); // Ghi nhận điểm danh streak ngày hôm nay
    setIsZenPlaying(getZenMusicPlaying());
  }, []);

  // 2. Load Kanji list when currentLevel changes
  useEffect(() => {
    const list = KANJI_DATA[currentLevel] || [];
    setKanjiList([...list]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsShuffled(false);
    refreshDueList();
  }, [currentLevel, refreshDueList]);

  // 3. Update current card info
  const currentChar = kanjiList[currentIndex] || '';

  useEffect(() => {
    if (!currentChar) return;
    const local = getLocalKanjiInfo(currentChar, fullDb);
    setCardInfo(local);
    fetchLiveKanjiInfo(currentChar, currentLevel, fullDb).then((enriched) => {
      if (enriched) setCardInfo(enriched);
    });
  }, [currentChar, currentLevel, fullDb]);

  // Toggle Shuffle
  const handleToggleShuffle = () => {
    const raw = KANJI_DATA[currentLevel] || [];
    if (isShuffled) {
      setKanjiList([...raw]);
      setCurrentIndex(0);
      setIsShuffled(false);
      showToast('Đã khôi phục thứ tự ban đầu', '🔄');
    } else {
      const shuffled = [...raw].sort(() => 0.5 - Math.random());
      setKanjiList(shuffled);
      setCurrentIndex(0);
      setIsShuffled(true);
      showToast('Đã xáo trộn danh sách thẻ', '🔀');
    }
    setIsFlipped(false);
  };

  const handlePrevCard = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : kanjiList.length - 1));
  }, [kanjiList.length]);

  const handleNextCard = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < kanjiList.length - 1 ? prev + 1 : 0));
  }, [kanjiList.length]);

  // Mark Forgotten
  const handleMarkForgotten = (charToMark = null) => {
    const target = charToMark || currentChar;
    if (!target) return;
    if (!forgottenList.includes(target)) {
      const updated = [target, ...forgottenList];
      setForgottenList(updated);
      saveForgottenKanji(updated);
      showToast(`Đã thêm 「${target}」 vào sổ tay chữ hay quên!`, '🔖');
    } else {
      showToast(`Chữ 「${target}」 đã có sẵn trong sổ tay.`, 'ℹ️');
    }
  };

  // Mark Mastered
  const handleMarkMastered = () => {
    if (!currentChar) return;
    if (!masteredList.includes(currentChar)) {
      const updated = [currentChar, ...masteredList];
      setMasteredList(updated);
      saveMasteredKanji(updated);
      showToast(`Chúc mừng bạn đã thuộc lòng chữ 「${currentChar}」!`, '🎉');
    } else {
      showToast(`Chữ 「${currentChar}」 đã được lưu trước đó.`, '✅');
    }
    handleNextCard();
  };

  // SRS Spaced Repetition Review (1: Quên, 2: Khó, 3: Tốt, 4: Dễ)
  const handleSrsReview = (grade) => {
    if (!currentChar) return;
    recordSrsReview(currentChar, grade, currentLevel);
    refreshDueList();
    const labels = {
      1: 'Chưa nhớ - Ôn lại sau 10 phút',
      2: 'Khó - Ôn lại sau 1 ngày',
      3: 'Tốt - Ôn lại sau 3 ngày',
      4: 'Dễ - Ôn lại sau 7 ngày',
    };
    showToast(`Đã lưu SRS: ${labels[grade] || 'Ghi nhớ'}`, '🔁');
    handleNextCard();
  };

  // Clear Notebook
  const handleClearNotebook = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách chữ trong sổ tay?')) {
      setForgottenList([]);
      saveForgottenKanji([]);
      showToast('Đã làm trống sổ tay.', '🗑️');
    }
  };

  // Remove single item from Notebook
  const handleRemoveNotebookItem = (char) => {
    const updated = forgottenList.filter((c) => c !== char);
    setForgottenList(updated);
    saveForgottenKanji(updated);
    showToast(`Đã xóa 「${char}」 khỏi sổ tay`, '🗑️');
  };

  // Start review from notebook
  const handleStartReview = () => {
    if (forgottenList.length === 0) return;
    setKanjiList([...forgottenList]);
    setCurrentIndex(0);
    setActiveMode('quiz');
    showToast(`Bắt đầu luyện đề ôn tập cho ${forgottenList.length} chữ hay quên!`, '🎯');
  };

  // Jump to specific Kanji from Spotlight Search
  const handleSelectKanjiFromSearch = useCallback((selectedChar, targetLevel) => {
    if (targetLevel && targetLevel !== currentLevel) {
      setCurrentLevel(targetLevel);
      const targetList = KANJI_DATA[targetLevel] || [];
      const foundIdx = targetList.indexOf(selectedChar);
      setKanjiList(targetList);
      setCurrentIndex(foundIdx >= 0 ? foundIdx : 0);
    } else {
      const foundIdx = kanjiList.indexOf(selectedChar);
      if (foundIdx !== -1) {
        setCurrentIndex(foundIdx);
      }
    }
    setActiveMode('study');
    setIsFlipped(false);
    showToast(`Đã chuyển đến 「${selectedChar}」 • JLPT ${targetLevel || currentLevel}`, '🌸');
  }, [currentLevel, kanjiList, showToast]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Spotlight shortcut: Cmd + K hoặc Ctrl + K (hoạt động ở mọi nơi)
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
        return;
      }

      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      // Close open modals on Escape
      if (
        isGridModalOpen ||
        isPracticeModalOpen ||
        isRadicalModalOpen ||
        isMindmapModalOpen ||
        isWorksheetModalOpen ||
        isStatsModalOpen ||
        isSpotlightOpen ||
        isVoiceShadowingOpen
      ) {
        if (e.key === 'Escape') {
          setIsGridModalOpen(false);
          setIsPracticeModalOpen(false);
          setIsRadicalModalOpen(false);
          setIsMindmapModalOpen(false);
          setIsWorksheetModalOpen(false);
          setIsStatsModalOpen(false);
          setIsSpotlightOpen(false);
          setIsVoiceShadowingOpen(false);
        }
        return;
      }

      if (activeMode === 'study') {
        if (e.code === 'Space') {
          e.preventDefault();
          setIsFlipped((f) => !f);
        } else if (e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          setIsPracticeModalOpen(true);
        } else if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          setIsRadicalModalOpen(true);
        } else if (e.key === 'm' || e.key === 'M') {
          e.preventDefault();
          setIsMindmapModalOpen(true);
        } else if (isFlipped && ['1', '2', '3', '4'].includes(e.key)) {
          e.preventDefault();
          handleSrsReview(parseInt(e.key, 10));
        } else if (e.key === 'ArrowRight') {
          handleNextCard();
        } else if (e.key === 'ArrowLeft') {
          handlePrevCard();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeMode,
    isGridModalOpen,
    isPracticeModalOpen,
    isRadicalModalOpen,
    isMindmapModalOpen,
    isWorksheetModalOpen,
    isStatsModalOpen,
    isSpotlightOpen,
    isVoiceShadowingOpen,
    isFlipped,
    handleSrsReview,
    handleNextCard,
    handlePrevCard,
  ]);

  const isMastered = masteredList.includes(currentChar);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-6 relative select-none">
      {/* Họa tiết sóng biển Seigaiha (青海波) - lớp nền trang truyền thống */}
      <div className="wagara-pattern" aria-hidden="true" />

      {/* Vân xơ giấy Washi */}
      <div className="washi-grain" aria-hidden="true" />

      {/* Phong cảnh Nhật Bản: Mặt trời đỏ / Trăng bạc, Núi Phú Sĩ & Mây Kasumi */}
      <JapaneseAtmosphericBackground theme={theme} />

      {/* Cánh hoa anh đào rơi (Sakura) */}
      <SakuraPetals />

      {/* Main Container */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-6 relative z-20">
        <Header
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          notebookCount={forgottenList.length}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenSpotlight={() => setIsSpotlightOpen(true)}
          onOpenStatsModal={() => setIsStatsModalOpen(true)}
          onOpenWorksheetModal={() => setIsWorksheetModalOpen(true)}
          onOpenVoiceShadowing={() => setIsVoiceShadowingOpen(true)}
          isZenMusicPlaying={isZenPlaying}
          onToggleZenMusic={handleToggleZenMusic}
        />

        {activeMode === 'study' && (
          <StudySection
            levels={KANJI_DATA}
            currentLevel={currentLevel}
            onChangeLevel={(lvl) => setCurrentLevel(lvl)}
            kanjiList={kanjiList}
            currentIndex={currentIndex}
            currentChar={currentChar}
            cardInfo={cardInfo}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
            isShuffled={isShuffled}
            onToggleShuffle={handleToggleShuffle}
            onPrevCard={handlePrevCard}
            onNextCard={handleNextCard}
            onMarkForgotten={() => handleMarkForgotten()}
            onMarkMastered={handleMarkMastered}
            onOpenGridModal={() => setIsGridModalOpen(true)}
            onOpenPracticeModal={() => setIsPracticeModalOpen(true)}
            onOpenRadicalModal={() => setIsRadicalModalOpen(true)}
            onOpenMindmapModal={() => setIsMindmapModalOpen(true)}
            onOpenVoiceShadowing={() => setIsVoiceShadowingOpen(true)}
            onOpenWorksheetModal={() => setIsWorksheetModalOpen(true)}
            onSrsReview={handleSrsReview}
            dueCount={dueKanjiList.length}
            isMastered={isMastered}
          />
        )}

        {activeMode === 'kana' && <KanaSection />}

        {activeMode === 'vocab' && <VocabSection onSaveToNotebook={handleMarkForgotten} />}

        {activeMode === 'grammar' && <GrammarSection />}

        {activeMode === 'reading' && <ReadingSection />}

        {activeMode === 'listening' && <ListeningSection />}

        {activeMode === 'speed' && (
          <SamuraiSpeedSection
            kanjiList={kanjiList}
            fullDb={fullDb}
            currentLevel={currentLevel}
          />
        )}

        {activeMode === 'quiz' && (
          <QuizSection
            currentLevel={currentLevel}
            kanjiList={kanjiList}
            onFailKanji={(char) => handleMarkForgotten(char)}
            fullDb={fullDb}
          />
        )}

        {activeMode === 'karuta' && (
          <KarutaGameSection
            currentLevel={currentLevel}
            kanjiList={kanjiList}
            fullDb={fullDb}
            onChangeLevel={(lvl) => setCurrentLevel(lvl)}
          />
        )}

        {activeMode === 'notebook' && (
          <NotebookSection
            forgottenList={forgottenList}
            onClearNotebook={handleClearNotebook}
            onRemoveItem={handleRemoveNotebookItem}
            onStartReview={handleStartReview}
            fullDb={fullDb}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="w-full max-w-4xl mt-12 py-6 border-t border-washi-border/50 text-center text-xs opacity-70 flex flex-col sm:flex-row items-center justify-between gap-2 z-20 font-ui">
        <div className="flex items-center gap-2">
          <span>⛩️</span>
          <span>Sổ tay học Kanji tiếng Nhật • Luyện thi JLPT N5 - N1</span>
        </div>
        <div className="text-[11px]">
          {activeMode === 'quiz' ? (
            <>
              Phím tắt Quiz:{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">1</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">2</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">3</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">4</kbd>{' '}
              chọn đáp án •{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">Space</kbd>{' '}
              câu tiếp •{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">⌘K</kbd>{' '}
              tìm kiếm
            </>
          ) : activeMode === 'listening' ? (
            <>
              Luyện nghe Choukai:{' '}
              Bấm <span className="font-bold text-torii">▶️ Nghe hội thoại</span> • Chọn phương án đúng • Bấm <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">⌘K</kbd> tìm kiếm
            </>
          ) : activeMode === 'vocab' ? (
            <>
              Từ vựng JLPT:{' '}
              <span className="font-bold">Lật thẻ 3D</span> • Phát âm chuẩn bản xứ • Bấm <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">⌘K</kbd> tìm kiếm
            </>
          ) : (
            <>
              Phím tắt:{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">⌘K</kbd>{' '}
              tìm kiếm •{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">Space</kbd>{' '}
              lật thẻ •{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">1-4</kbd>{' '}
              lưu SRS •{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">W</kbd>{' '}
              tập viết •{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">M</kbd>{' '}
              sơ đồ •{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">R</kbd>{' '}
              chiết tự •{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">←</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded border border-washi-border font-mono">→</kbd>{' '}
              chuyển thẻ
            </>
          )}
        </div>
      </footer>

      {/* Kanji Grid Modal */}
      <KanjiGridModal
        isOpen={isGridModalOpen}
        onClose={() => setIsGridModalOpen(false)}
        kanjiList={KANJI_DATA[currentLevel] || []}
        currentLevel={currentLevel}
        currentIndex={currentIndex}
        onSelectKanji={(idx) => {
          setCurrentIndex(idx);
          setIsFlipped(false);
        }}
      />

      {/* Kanji Stroke Order & Calligraphy Practice Modal with Scoring */}
      <KanjiPracticeModal
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
        currentChar={currentChar}
        currentLevel={currentLevel}
        cardInfo={cardInfo}
        onOpenRadicalModal={() => {
          setIsPracticeModalOpen(false);
          setIsRadicalModalOpen(true);
        }}
      />

      {/* Radical Breakdown & Kangxi Radicals Explorer Modal */}
      <RadicalModal
        isOpen={isRadicalModalOpen}
        onClose={() => setIsRadicalModalOpen(false)}
        currentChar={currentChar}
        currentLevel={currentLevel}
        cardInfo={cardInfo}
        allKanjiList={kanjiList}
        onSelectKanji={(selectedChar) => {
          const foundIdx = kanjiList.indexOf(selectedChar);
          if (foundIdx !== -1) {
            setCurrentIndex(foundIdx);
            setIsFlipped(false);
          } else {
            showToast(`Đã chọn chữ ${selectedChar}`, '🎌');
          }
        }}
        onOpenPracticeModal={() => {
          setIsRadicalModalOpen(false);
          setIsPracticeModalOpen(true);
        }}
      />

      {/* Kanji Compound Mindmap Modal */}
      <KanjiMindmapModal
        isOpen={isMindmapModalOpen}
        onClose={() => setIsMindmapModalOpen(false)}
        currentChar={currentChar}
        currentLevel={currentLevel}
        cardInfo={cardInfo}
      />

      {/* Printable Rice-Grid (米字格) Worksheet Modal */}
      <KanjiWorksheetModal
        isOpen={isWorksheetModalOpen}
        onClose={() => setIsWorksheetModalOpen(false)}
        kanjiList={kanjiList}
        currentLevel={currentLevel}
        fullDb={fullDb}
      />

      {/* Study Statistics & 365-day Activity Heatmap Modal */}
      <StatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        levelsData={KANJI_DATA}
      />

      {/* AI Speech Voice Shadowing Practice Modal */}
      <VoiceShadowingModal
        isOpen={isVoiceShadowingOpen}
        onClose={() => setIsVoiceShadowingOpen(false)}
        initialPhrase={
          cardInfo?.exampleJp?.replace(/<[^>]+>/g, '') ||
          (currentChar ? `「${currentChar}」の勉強` : 'こんにちは、よろしくお願いします。')
        }
        initialMeaning={cardInfo?.exampleVn || 'Xin chào, rất mong được giúp đỡ.'}
      />

      {/* Spotlight Command Palette Search Modal */}
      <SpotlightSearchModal
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onSelectKanji={handleSelectKanjiFromSearch}
        fullDb={fullDb}
        levelsData={KANJI_DATA}
      />

      {/* Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
}
