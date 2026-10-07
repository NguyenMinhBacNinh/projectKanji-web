'use client';

import { useState } from 'react';
import { READING_ARTICLES } from '../lib/readingData';
import { playJapaneseSpeech } from '../lib/kanjiService';
import {
  playWoodClapper,
  playWaterDrop,
  playQuizSuccess,
  playQuizError,
} from '../lib/traditionalAudio';

export default function ReadingSection() {
  const [selectedArticleId, setSelectedArticleId] = useState(READING_ARTICLES[0].id);
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const article =
    READING_ARTICLES.find((a) => a.id === selectedArticleId) || READING_ARTICLES[0];

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
    <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-fadeIn">
      {/* Top Bar: Selector & Reading Controls */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl karuta-card border border-washi-border shadow-xs">
        {/* Article Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {READING_ARTICLES.map((art) => (
            <button
              key={art.id}
              onClick={() => {
                playWoodClapper();
                setSelectedArticleId(art.id);
                setSelectedWord(null);
                setShowTranslation(false);
                setSelectedQuizAnswer(null);
                setQuizSubmitted(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold border transition-all flex items-center gap-1.5 ${
                selectedArticleId === art.id
                  ? 'bg-torii text-white border-torii shadow-xs'
                  : 'kifuda-tab'
              }`}
            >
              <span>{art.coverIcon}</span>
              <span>{art.title}</span>
              <span className="text-[10px] opacity-75">({art.level})</span>
            </button>
          ))}
        </div>

        {/* Reading Controls: Toggle Furigana & Read All */}
        <div className="flex items-center gap-2">
          {/* Furigana Toggle */}
          <button
            onClick={() => {
              playWoodClapper();
              setShowFurigana(!showFurigana);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
              showFurigana
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-200'
                : 'kifuda-tab opacity-70'
            }`}
            title="Bật hoặc tắt chữ Hiragana chú âm trên đầu chữ Hán"
          >
            <span>あ</span>
            <span>{showFurigana ? 'Furigana: BẬT' : 'Furigana: TẮT'}</span>
          </button>

          {/* Read Audio */}
          <button
            onClick={handleReadEntirePassage}
            className="px-3 py-1.5 rounded-xl bg-torii text-white text-xs font-bold shadow-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5"
            title="Đọc toàn bộ bài bằng giọng đọc bản xứ"
          >
            <span>🔊</span>
            <span className="hidden sm:inline">Nghe bài</span>
          </button>
        </div>
      </div>

      {/* Main Reading Scroll (Cuộn thư cổ Nhật Bản) */}
      <div className="w-full p-6 sm:p-8 rounded-3xl karuta-card border-2 border-border-strong shadow-xl flex flex-col gap-6 relative">
        <div className="karuta-inner-border" />

        {/* Article Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-washi-border gap-2 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="hanko-stamp text-xs px-2.5 py-0.5">JLPT {article.level}</span>
              <span className="text-xs opacity-60 font-medium">Luyện đọc hiểu Dokkai</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-kanji text-torii">
              {article.title}
            </h2>
            <p className="text-xs opacity-70 mt-0.5">{article.subtitle}</p>
          </div>

          <div className="text-[11px] opacity-60 italic text-right hidden sm:block">
            * Nhấp vào từ để tra nghĩa & nghe đọc
          </div>
        </div>

        {/* Word Definition Popover Bar if clicked */}
        {selectedWord && (
          <div className="p-3.5 rounded-2xl bg-torii/10 border border-torii/30 flex items-center justify-between gap-3 animate-fadeIn relative z-10">
            <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playWaterDrop();
                  playJapaneseSpeech(selectedWord.ruby || selectedWord.text);
                }}
                className="px-2.5 py-1 rounded-lg bg-torii text-white font-bold text-xs shadow-xs hover:opacity-90 active:scale-95"
              >
                🔊 Nghe
              </button>
              <button
                onClick={() => setSelectedWord(null)}
                className="text-xs opacity-50 hover:opacity-100"
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
        <div className="pt-4 border-t border-washi-border relative z-10">
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex items-center gap-2 text-xs font-bold text-torii hover:underline py-1"
          >
            <span>{showTranslation ? '▼' : '►'}</span>
            <span>{showTranslation ? 'Ẩn bản dịch tiếng Việt' : 'Xem bản dịch tiếng Việt song song'}</span>
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
          <div className="mt-2 p-5 rounded-2xl bg-washi/90 border border-washi-border flex flex-col gap-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-torii uppercase tracking-wider flex items-center gap-1.5">
                <span>📝</span> Câu hỏi kiểm tra đọc hiểu
              </span>
              {quizSubmitted && (
                <span
                  className={`text-xs font-bold ${
                    selectedQuizAnswer === article.quiz.correct
                      ? 'text-emerald-600'
                      : 'text-rose-600'
                  }`}
                >
                  {selectedQuizAnswer === article.quiz.correct
                    ? '🌸 Trả lời chính xác!'
                    : '🍂 Chưa đúng!'}
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
                    className={`p-3 rounded-xl border text-xs text-left transition-all font-medium ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div className="text-xs opacity-75 italic mt-1 animate-fadeIn">
                💡 Giải thích: {article.quiz.explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
