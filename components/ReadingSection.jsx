'use client';

import { useState, useMemo, useEffect } from 'react';
import { READING_ARTICLES, READING_DATA_BY_LEVEL } from '../lib/readingData';
import { playJapaneseSpeech } from '../lib/kanjiService';
import {
  playWoodClapper,
  playWaterDrop,
  playQuizSuccess,
  playQuizError,
} from '../lib/traditionalAudio';
import { VolumeIcon, ChevronLeftIcon, ChevronRightIcon } from './ZenIcons';

const LEVELS = [
  { id: 'ALL', label: 'Tất cả', count: READING_ARTICLES.length },
  { id: 'N5', label: 'N5', count: (READING_DATA_BY_LEVEL.N5 || []).length },
  { id: 'N4', label: 'N4', count: (READING_DATA_BY_LEVEL.N4 || []).length },
  { id: 'N3', label: 'N3', count: (READING_DATA_BY_LEVEL.N3 || []).length },
  { id: 'N2', label: 'N2', count: (READING_DATA_BY_LEVEL.N2 || []).length },
  { id: 'N1', label: 'N1', count: (READING_DATA_BY_LEVEL.N1 || []).length },
];

export default function ReadingSection() {
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [selectedArticleId, setSelectedArticleId] = useState(READING_ARTICLES[0].id);
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Danh sách bài đọc theo cấp độ lọc
  const filteredArticles = useMemo(() => {
    if (selectedLevel === 'ALL') return READING_ARTICLES;
    return READING_DATA_BY_LEVEL[selectedLevel] || READING_ARTICLES;
  }, [selectedLevel]);

  // Bài đọc hiện tại
  const currentIndex = useMemo(() => {
    const idx = filteredArticles.findIndex((a) => a.id === selectedArticleId);
    return idx !== -1 ? idx : 0;
  }, [filteredArticles, selectedArticleId]);

  const article = filteredArticles[currentIndex] || READING_ARTICLES[0];

  // Khi đổi level, nếu bài hiện tại không thuộc level mới thì chuyển sang bài đầu tiên của level đó
  const handleSelectLevel = (levelId) => {
    playWoodClapper();
    setSelectedLevel(levelId);
    const targetArticles = levelId === 'ALL' ? READING_ARTICLES : (READING_DATA_BY_LEVEL[levelId] || []);
    if (targetArticles.length > 0) {
      const exists = targetArticles.some((a) => a.id === selectedArticleId);
      if (!exists) {
        setSelectedArticleId(targetArticles[0].id);
        setSelectedWord(null);
        setShowTranslation(false);
        setSelectedQuizAnswer(null);
        setQuizSubmitted(false);
      }
    }
  };

  const handleSelectArticle = (artId) => {
    playWoodClapper();
    setSelectedArticleId(artId);
    setSelectedWord(null);
    setShowTranslation(false);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handlePrevArticle = () => {
    if (currentIndex > 0) {
      handleSelectArticle(filteredArticles[currentIndex - 1].id);
    }
  };

  const handleNextArticle = () => {
    if (currentIndex < filteredArticles.length - 1) {
      handleSelectArticle(filteredArticles[currentIndex + 1].id);
    }
  };

  // Đọc toàn bộ đoạn văn tiếng Nhật
  const handleReadEntirePassage = () => {
    playWaterDrop();
    const fullText = article.content
      .map((p) => p.segments.map((s) => s.text).join(''))
      .join(' ');
    playJapaneseSpeech(fullText);
  };

  const handleSelectQuiz = (idx) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswer(idx);
    setQuizSubmitted(true);
    if (idx === article.quiz.correct) {
      playQuizSuccess();
    } else {
      playQuizError();
    }
  };

  return (
    <div className="w-full max-w-[1020px] 2xl:max-w-6xl h-full min-h-0 flex-1 flex flex-col items-center justify-start gap-1.5 sm:gap-2 animate-fadeIn select-none overflow-hidden">
      {/* Top Bar: Bộ lọc cấp độ JLPT & Điều khiển đọc */}
      <div className="w-full flex flex-col gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700/80 shadow-md backdrop-blur-md shrink-0">
        {/* Dòng 1: Level Tabs + Reading Controls */}
        <div className="w-full flex items-center justify-between gap-2">
          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => handleSelectLevel(lvl.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  selectedLevel === lvl.id
                    ? 'bg-torii text-white border-torii shadow-2xs'
                    : 'kifuda-tab text-stone-700 dark:text-stone-300 hover:border-torii/40'
                }`}
              >
                <span>{lvl.label}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded-md ${
                  selectedLevel === lvl.id ? 'bg-white/20 text-white' : 'bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}>
                  {lvl.count}
                </span>
              </button>
            ))}
          </div>

          {/* Controls: Furigana & Audio */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Furigana Toggle */}
            <button
              onClick={() => {
                playWoodClapper();
                setShowFurigana(!showFurigana);
              }}
              className={`px-2.5 py-1 rounded-xl border text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer ${
                showFurigana
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-200'
                  : 'kifuda-tab opacity-70 text-stone-700 dark:text-stone-300'
              }`}
              title="Bật hoặc tắt chữ Hiragana chú âm trên đầu chữ Hán"
            >
              <span>あ</span>
              <span className="hidden sm:inline">{showFurigana ? 'Furigana' : 'Ẩn chú âm'}</span>
            </button>

            {/* Read Audio */}
            <button
              onClick={handleReadEntirePassage}
              className="px-2.5 py-1 rounded-xl bg-torii text-white text-xs font-bold shadow-2xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              title="Đọc toàn bộ bài bằng giọng đọc bản xứ"
            >
              <VolumeIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nghe bài</span>
            </button>
          </div>
        </div>

        {/* Dòng 2: Bài đọc Carousel & Quick Select Dropdown */}
        <div className="w-full flex items-center gap-2 pt-1 border-t border-washi-border/60">
          {/* Nút lùi bài */}
          <button
            onClick={handlePrevArticle}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-lg border kifuda-tab disabled:opacity-30 disabled:cursor-not-allowed hover:border-torii transition-all shrink-0 cursor-pointer"
            title="Bài trước"
          >
            <ChevronLeftIcon className="w-3.5 h-3.5" />
          </button>

          {/* Quick Dropdown Picker for Mobile/Desktop */}
          <div className="shrink-0">
            <select
              value={article.id}
              onChange={(e) => handleSelectArticle(e.target.value)}
              className="px-2 py-1 text-xs font-bold rounded-xl border border-washi-border bg-washi text-stone-800 dark:text-stone-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-torii"
            >
              {filteredArticles.map((art, idx) => (
                <option key={art.id} value={art.id}>
                  #{idx + 1} ({art.level}) {art.title}
                </option>
              ))}
            </select>
          </div>

          {/* Article chips scroll */}
          <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {filteredArticles.map((art, idx) => {
              const isSelected = art.id === article.id;
              return (
                <button
                  key={art.id}
                  onClick={() => handleSelectArticle(art.id)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-torii/15 text-torii border-torii font-bold shadow-2xs'
                      : 'kifuda-tab text-stone-600 dark:text-stone-400 hover:text-torii hover:border-torii/40'
                  }`}
                >
                  <span className="text-[11px]">{art.coverIcon}</span>
                  <span className="font-mono text-[10px] opacity-75">#{idx + 1}</span>
                  <span className="max-w-[110px] truncate">{art.title}</span>
                </button>
              );
            })}
          </div>

          {/* Nút tiến bài */}
          <button
            onClick={handleNextArticle}
            disabled={currentIndex === filteredArticles.length - 1}
            className="p-1.5 rounded-lg border kifuda-tab disabled:opacity-30 disabled:cursor-not-allowed hover:border-torii transition-all shrink-0 cursor-pointer"
            title="Bài tiếp theo"
          >
            <ChevronRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Reading Scroll (Zero-Scroll Studio Container) */}
      <div className="w-full flex-1 min-h-0 p-4 sm:p-6 rounded-3xl karuta-card border-2 border-border-strong shadow-xl flex flex-col relative overflow-hidden">
        <div className="karuta-inner-border" />

        {/* Article Header (Sticky inside card) */}
        <div className="flex items-center justify-between pb-2.5 border-b border-washi-border gap-2 relative z-10 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="hanko-stamp text-[10px] px-2 py-0.2">JLPT {article.level}</span>
              <span className="text-[11px] opacity-60 font-medium">
                Bài {currentIndex + 1} / {filteredArticles.length} ({selectedLevel === 'ALL' ? 'Toàn bộ 150 bài' : `Trình độ ${selectedLevel}`})
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-kanji text-torii flex items-center gap-2">
              <span>{article.coverIcon}</span>
              <span>{article.title}</span>
            </h2>
            <p className="text-[11px] opacity-70 mt-0.5">{article.subtitle}</p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="text-[10px] opacity-60 italic text-right hidden sm:block">
              * Nhấp vào từ vựng để tra nghĩa & nghe phát âm
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevArticle}
                disabled={currentIndex === 0}
                className="px-2 py-1 rounded-lg border text-xs font-semibold kifuda-tab disabled:opacity-30 disabled:cursor-not-allowed hover:border-torii transition-all cursor-pointer flex items-center gap-1"
              >
                <ChevronLeftIcon className="w-3 h-3" />
                <span className="hidden sm:inline">Trước</span>
              </button>
              <button
                onClick={handleNextArticle}
                disabled={currentIndex === filteredArticles.length - 1}
                className="px-2 py-1 rounded-lg border text-xs font-semibold kifuda-tab disabled:opacity-30 disabled:cursor-not-allowed hover:border-torii transition-all cursor-pointer flex items-center gap-1"
              >
                <span className="hidden sm:inline">Sau</span>
                <ChevronRightIcon className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Reading & Quiz Body */}
        <div className="flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-1 flex flex-col gap-4 mt-2">
          {/* Word Definition Popover Bar if clicked */}
          {selectedWord && (
            <div className="p-3.5 rounded-2xl bg-torii/10 border border-torii/30 flex items-center justify-between gap-3 animate-fadeIn relative z-10 shrink-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xl font-black font-kanji text-torii">
                  {selectedWord.text}
                </span>
                {selectedWord.ruby && (
                  <span className="text-xs font-mono font-bold text-torii">
                    「{selectedWord.ruby}」
                  </span>
                )}
                <span className="text-xs opacity-90 font-medium border-l border-torii/30 pl-3">
                  {selectedWord.meaning}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    playWaterDrop();
                    playJapaneseSpeech(selectedWord.ruby || selectedWord.text);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-torii text-white font-bold text-xs shadow-xs hover:opacity-90 active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  <VolumeIcon className="w-3.5 h-3.5" />
                  <span>Nghe</span>
                </button>
                <button
                  onClick={() => setSelectedWord(null)}
                  className="text-xs opacity-50 hover:opacity-100 p-1 cursor-pointer"
                  title="Đóng tra từ"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Japanese Content Paragraphs */}
          <div className="flex flex-col gap-5 relative z-10 text-base sm:text-lg font-kanji leading-loose tracking-wide select-text">
            {article.content.map((para, pIdx) => (
              <p key={pIdx} className="leading-[2.4]">
                {para.segments.map((seg, sIdx) => {
                  const hasGlossary = !!seg.meaning;
                  return (
                    <span
                      key={sIdx}
                      onClick={() => {
                        if (hasGlossary) {
                          playWaterDrop();
                          setSelectedWord(seg);
                        }
                      }}
                      className={`inline-block transition-colors ${
                        hasGlossary
                          ? 'cursor-pointer hover:text-torii hover:bg-torii/10 rounded-md px-0.5'
                          : ''
                      }`}
                    >
                      {seg.ruby ? (
                        <ruby className="ruby-text">
                          {seg.text}
                          {showFurigana && (
                            <rt className="text-[10px] text-torii font-mono font-normal select-none">
                              {seg.ruby}
                            </rt>
                          )}
                        </ruby>
                      ) : (
                        seg.text
                      )}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>

          {/* Translation Toggle & Box */}
          <div className="pt-4 border-t border-washi-border relative z-10 shrink-0">
            <button
              onClick={() => {
                playWoodClapper();
                setShowTranslation(!showTranslation);
              }}
              className="flex items-center gap-2 text-xs font-bold text-torii hover:underline py-1 cursor-pointer"
            >
              <span>{showTranslation ? '▼' : '►'}</span>
              <span>
                {showTranslation ? 'Ẩn bản dịch tiếng Việt' : 'Xem bản dịch tiếng Việt song song'}
              </span>
            </button>

            {showTranslation && (
              <div className="mt-3 p-4 rounded-2xl bg-washi border border-washi-border text-xs sm:text-sm leading-relaxed opacity-90 animate-fadeIn">
                <span className="font-bold opacity-70 block mb-1 uppercase tracking-wider text-[10px]">
                  Bản dịch tham khảo:
                </span>
                <p>{article.translationVn}</p>
              </div>
            )}
          </div>

          {/* Dokkai Comprehension Quiz */}
          {article.quiz && (
            <div className="mt-2 p-5 rounded-2xl bg-washi/90 border border-washi-border flex flex-col gap-3 relative z-10 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-torii uppercase tracking-wider flex items-center gap-1.5">
                  <span>📝</span> Câu hỏi kiểm tra đọc hiểu
                </span>
                {quizSubmitted && (
                  <span
                    className={`text-xs font-bold ${
                      selectedQuizAnswer === article.quiz.correct
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {selectedQuizAnswer === article.quiz.correct
                      ? '🌸 Trả lời chính xác!'
                      : '🍂 Chưa đúng, hãy đọc lại giải thích!'}
                  </span>
                )}
              </div>

              <div className="text-sm font-kanji font-bold">{article.quiz.question}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {article.quiz.options.map((opt, oIdx) => {
                  let btnStyle = 'bg-washi border-washi-border hover:border-torii/50';
                  if (quizSubmitted) {
                    if (oIdx === article.quiz.correct) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                    } else if (oIdx === selectedQuizAnswer) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600';
                    } else {
                      btnStyle = 'opacity-40 bg-washi border-washi-border';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectQuiz(oIdx)}
                      disabled={quizSubmitted}
                      className={`p-3 rounded-xl border text-xs text-left transition-all font-medium cursor-pointer ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="text-xs opacity-75 italic mt-1 animate-fadeIn bg-torii/5 p-2.5 rounded-xl border border-torii/15">
                  💡 Giải thích: {article.quiz.explanation}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
