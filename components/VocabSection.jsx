'use client';

import { useState, useMemo } from 'react';
import { VOCAB_DATA, VOCAB_TOPICS } from '../lib/vocabData';
import { playJapaneseSpeech } from '../lib/kanjiService';
import {
  playWoodClapper,
  playWaterDrop,
  playQuizSuccess,
  playQuizError,
  playHankoStamp,
} from '../lib/traditionalAudio';

export default function VocabSection({ onSaveToNotebook }) {
  const [activeView, setActiveView] = useState('flashcard'); // 'flashcard' | 'list' | 'quiz'
  const [selectedLevel, setSelectedLevel] = useState('all'); // 'all' | 'N5' | 'N4' | 'N3'
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Flashcard State
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredWords, setMasteredWords] = useState([]);

  // Quiz State
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Filtered Vocab List
  const filteredList = useMemo(() => {
    return VOCAB_DATA.filter((item) => {
      if (selectedLevel !== 'all' && item.level !== selectedLevel) return false;
      if (selectedTopic !== 'all' && item.topic !== selectedTopic) return false;
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        return (
          item.kanji.toLowerCase().includes(query) ||
          item.reading.toLowerCase().includes(query) ||
          item.romaji.toLowerCase().includes(query) ||
          item.meaning.toLowerCase().includes(query) ||
          item.hanViet.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedLevel, selectedTopic, searchTerm]);

  const currentWord = filteredList[cardIndex] || filteredList[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
  };

  const toggleMastered = (wordId) => {
    if (masteredWords.includes(wordId)) {
      setMasteredWords((prev) => prev.filter((id) => id !== wordId));
    } else {
      setMasteredWords((prev) => [...prev, wordId]);
      playHankoStamp();
    }
  };

  // Quiz generator
  const generateQuiz = () => {
    if (filteredList.length < 4) return;
    const correct = filteredList[Math.floor(Math.random() * filteredList.length)];
    const distractors = filteredList
      .filter((w) => w.id !== correct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [correct, ...distractors].sort(() => 0.5 - Math.random());

    setQuizQuestion({ target: correct, options });
    setQuizFeedback(null);
  };

  const startQuiz = () => {
    playWoodClapper();
    setActiveView('quiz');
    setQuizScore(0);
    setQuizIndex(1);
    setIsQuizFinished(false);
    generateQuiz();
  };

  const handleAnswerQuiz = (selected) => {
    if (quizFeedback || isQuizFinished) return;

    if (selected.id === quizQuestion.target.id) {
      playQuizSuccess();
      setQuizFeedback('correct');
      setQuizScore((s) => s + 10);
    } else {
      playQuizError();
      setQuizFeedback('wrong');
    }

    setTimeout(() => {
      if (quizIndex >= 10 || quizIndex >= filteredList.length) {
        setIsQuizFinished(true);
        playHankoStamp();
      } else {
        setQuizIndex((i) => i + 1);
        generateQuiz();
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-5 animate-fadeIn">
      {/* Top Filter and Mode Switcher */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 p-3 rounded-2xl karuta-card border border-washi-border shadow-xs">
        {/* View Mode Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-washi rounded-xl border border-washi-border text-xs font-bold">
          <button
            onClick={() => {
              playWoodClapper();
              setActiveView('flashcard');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'flashcard'
                ? 'bg-torii text-white shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <span>🎴</span>
            <span>Thẻ Flashcard</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveView('list');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'list'
                ? 'bg-torii text-white shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <span>📜</span>
            <span>Danh sách ({filteredList.length})</span>
          </button>
          <button
            onClick={startQuiz}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'quiz'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-amber-800 dark:text-amber-300 hover:text-amber-600'
            }`}
          >
            <span>⚡</span>
            <span>Phản xạ từ vựng</span>
          </button>
        </div>

        {/* JLPT Level Filter */}
        <div className="flex items-center gap-1 text-xs font-bold">
          {['all', 'N5', 'N4', 'N3'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                playWoodClapper();
                setSelectedLevel(lvl);
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                selectedLevel === lvl
                  ? 'bg-torii text-white border-torii shadow-xs'
                  : 'kifuda-tab opacity-75 hover:opacity-100'
              }`}
            >
              {lvl === 'all' ? 'Tất cả JLPT' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Topics & Search Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-3">
        {/* Topic dropdown / horizontal pills */}
        <div className="flex-1 w-full flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
          {VOCAB_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                playWoodClapper();
                setSelectedTopic(topic.id);
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedTopic === topic.id
                  ? 'bg-torii/15 border-torii text-torii font-bold shadow-xs'
                  : 'bg-washi border-washi-border opacity-70 hover:opacity-100'
              }`}
            >
              <span>{topic.icon}</span>
              <span>{topic.name}</span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="w-full sm:w-60 relative shrink-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCardIndex(0);
            }}
            placeholder="Tìm từ vựng, Hán Việt..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-washi border border-washi-border text-xs outline-none focus:border-torii transition-colors font-ui"
          />
          <span className="absolute left-2.5 top-2 text-xs opacity-50">🔍</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1.5 text-xs opacity-50 hover:opacity-100"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 1. FLASHCARD VIEW */}
      {activeView === 'flashcard' && (
        <div className="w-full flex flex-col items-center gap-4">
          {filteredList.length === 0 ? (
            <div className="p-12 text-center karuta-card rounded-3xl border border-washi-border w-full">
              <span className="text-3xl block mb-2">🌸</span>
              <p className="text-sm opacity-70">Không tìm thấy từ vựng nào khớp với bộ lọc.</p>
            </div>
          ) : (
            <>
              {/* Card Indicator */}
              <div className="w-full max-w-lg flex items-center justify-between text-xs px-2 opacity-75 font-semibold">
                <span>
                  Từ {cardIndex + 1} / {filteredList.length}
                </span>
                <span className="text-torii font-bold">
                  {currentWord?.level} • {currentWord?.type}
                </span>
              </div>

              {/* 3D Karuta Flashcard Container */}
              <div
                className="w-full max-w-lg cursor-pointer perspective"
                style={{ height: '360px', minHeight: '360px' }}
                onClick={() => {
                  playWoodClapper();
                  setIsFlipped(!isFlipped);
                }}
                title="Bấm để lật thẻ"
              >
                <div
                  className={`card-flip-inner rounded-3xl ${
                    isFlipped ? 'is-flipped' : ''
                  }`}
                  style={{ height: '100%', width: '100%', position: 'relative' }}
                >
                  {/* Mặt trước: Kanji & Chú âm */}
                  <div className="card-face card-front absolute inset-0 w-full h-full rounded-3xl karuta-card p-6 flex flex-col justify-between select-none">
                    <div className="karuta-inner-border" />

                    <div className="w-full flex items-center justify-between relative z-10 border-b border-washi-border/60 pb-2">
                      <span className="hanko-stamp text-[10px] py-0.5 px-2">
                        {currentWord?.level}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playWaterDrop();
                          playJapaneseSpeech(currentWord?.kanji);
                        }}
                        className="p-1.5 rounded-xl bg-washi hover:bg-torii hover:text-white text-torii transition-all active:scale-95"
                        title="Nghe phát âm"
                      >
                        <span className="text-sm">🔊</span>
                      </button>
                    </div>

                    <div className="text-center my-auto relative z-10 flex flex-col items-center">
                      {/* Huy hiệu minh họa chủ đề trực quan */}
                      <div className="mb-2 px-3 py-1 rounded-xl bg-washi border border-washi-border flex items-center gap-1.5 shadow-2xs">
                        <span className="text-base sm:text-lg">
                          {VOCAB_TOPICS.find((t) => t.id === currentWord?.topic)?.icon || '🌸'}
                        </span>
                        <span className="text-[11px] font-bold text-torii font-ui">
                          {VOCAB_TOPICS.find((t) => t.id === currentWord?.topic)?.name || 'Từ vựng'}
                        </span>
                      </div>

                      <div className="text-xs font-mono opacity-60 uppercase tracking-widest mb-1">
                        {currentWord?.romaji}
                      </div>
                      <div className="text-4xl sm:text-5xl font-kanji font-black tracking-wide text-torii drop-shadow-xs">
                        {currentWord?.kanji}
                      </div>
                      <div className="text-lg font-kanji font-bold mt-2 opacity-80">
                        {currentWord?.reading}
                      </div>
                      <div className="text-xs font-bold text-amber-700 dark:text-amber-300 font-kanji mt-1">
                        [{currentWord?.hanViet}]
                      </div>
                    </div>

                    <div className="text-center text-[11px] opacity-60 relative z-10 pt-2 border-t border-washi-border/60">
                      Chạm để lật xem nghĩa & câu ví dụ ↻
                    </div>
                  </div>

                  {/* Mặt sau: Nghĩa & Câu ví dụ */}
                  <div className="card-face card-back absolute inset-0 w-full h-full rounded-3xl karuta-card p-6 flex flex-col justify-between select-none">
                    <div className="karuta-inner-border" />

                    <div className="w-full flex items-center justify-between relative z-10 border-b border-washi-border/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-kanji font-black text-torii text-xl">
                          {currentWord?.kanji}
                        </span>
                        <span className="text-xs opacity-70 font-kanji">({currentWord?.reading})</span>
                      </div>
                      <span className="text-xs font-bold opacity-60">{currentWord?.type}</span>
                    </div>

                    <div className="my-auto relative z-10 flex flex-col gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold opacity-60 block">Nghĩa tiếng Việt:</span>
                        <div className="text-xl font-bold text-color-sumi mt-0.5">
                          {currentWord?.meaning}
                        </div>
                      </div>

                      {currentWord?.exampleJp && (
                        <div className="p-3 bg-washi rounded-2xl border border-washi-border text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-torii">CÂU VÍ DỤ:</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playWaterDrop();
                                playJapaneseSpeech(currentWord.exampleJp);
                              }}
                              className="text-xs hover:scale-110 transition-transform"
                              title="Nghe câu ví dụ"
                            >
                              🔊
                            </button>
                          </div>
                          <div className="font-kanji font-semibold text-sm leading-relaxed">
                            {currentWord.exampleJp}
                          </div>
                          <div className="text-[11px] opacity-75 mt-1 italic">
                            {currentWord.exampleVn}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-center text-[11px] opacity-60 relative z-10 pt-2 border-t border-washi-border/60">
                      Chạm để quay lại mặt trước ↺
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="w-full max-w-lg flex items-center justify-between gap-2 px-1">
                <button
                  onClick={handlePrevCard}
                  className="py-2.5 px-5 karuta-card border border-washi-border rounded-2xl text-xs md:text-sm font-bold shadow-xs active:scale-95 transition-all"
                >
                  ← Trước
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMastered(currentWord?.id)}
                    className={`py-2 px-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                      masteredWords.includes(currentWord?.id)
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : 'karuta-card opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span>{masteredWords.includes(currentWord?.id) ? '✅' : '⚪'}</span>
                    <span>{masteredWords.includes(currentWord?.id) ? 'Đã thuộc' : 'Thuộc từ này'}</span>
                  </button>

                  <button
                    onClick={() => {
                      playWaterDrop();
                      playJapaneseSpeech(currentWord?.kanji);
                    }}
                    className="p-2.5 karuta-card rounded-2xl border border-washi-border text-xs font-bold shadow-xs active:scale-95"
                    title="Phát âm từ vựng"
                  >
                    🔊
                  </button>
                </div>

                <button
                  onClick={handleNextCard}
                  className="py-2.5 px-6 bg-torii hover:bg-torii-light text-white rounded-2xl text-xs md:text-sm font-bold shadow-md active:scale-95 transition-all"
                >
                  Tiếp →
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* 2. LIST VIEW */}
      {activeView === 'list' && (
        <div className="w-full p-4 sm:p-6 rounded-3xl karuta-card border border-washi-border shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-washi/90 border border-washi-border hover:border-torii/50 transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-kanji text-xl font-black group-hover:text-torii transition-colors">
                        {item.kanji}
                      </span>
                      <span className="text-xs font-kanji opacity-75">{item.reading}</span>
                    </div>
                    <div className="text-[10px] font-mono opacity-50 uppercase tracking-wide">
                      {item.romaji} • [{item.hanViet}]
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playWaterDrop();
                      playJapaneseSpeech(item.kanji);
                    }}
                    className="p-1 rounded-lg bg-washi border border-washi-border hover:bg-torii hover:text-white transition-all text-xs"
                    title="Nghe đọc"
                  >
                    🔊
                  </button>
                </div>

                <div className="mt-2 pt-2 border-t border-washi-border/60">
                  <div className="text-xs font-bold text-color-sumi">{item.meaning}</div>
                  <div className="flex items-center justify-between text-[10px] opacity-60 mt-1">
                    <span className="hanko-stamp py-0.2 px-1.5 text-[9px]">{item.level}</span>
                    <span>{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MINI QUIZ VIEW */}
      {activeView === 'quiz' && (
        <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl karuta-card border-2 border-border-strong shadow-xl flex flex-col items-center gap-5 relative">
          <div className="karuta-inner-border" />

          <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10 text-xs">
            <span className="font-bold text-torii flex items-center gap-1.5">
              <span>⚡</span> Trắc nghiệm phản xạ từ vựng
            </span>
            <span className="font-bold opacity-70">
              Câu {quizIndex}/10 • Điểm: <strong className="text-torii">{quizScore}</strong>
            </span>
          </div>

          {!isQuizFinished && quizQuestion ? (
            <div className="w-full flex flex-col items-center gap-5 relative z-10">
              <div className="text-center">
                <span className="text-xs opacity-60 block mb-1">Từ này có nghĩa là gì?</span>
                <div className="py-3 px-6 rounded-2xl bg-washi border-2 border-torii text-3xl sm:text-4xl font-kanji font-black text-torii shadow-md flex items-center gap-3 justify-center">
                  <span>{quizQuestion.target.kanji}</span>
                  <button
                    onClick={() => {
                      playWaterDrop();
                      playJapaneseSpeech(quizQuestion.target.kanji);
                    }}
                    className="text-lg opacity-70 hover:opacity-100 hover:scale-110 transition-transform"
                    title="Nghe phát âm"
                  >
                    🔊
                  </button>
                </div>
                <div className="text-xs font-kanji opacity-75 mt-1.5">
                  Cách đọc: {quizQuestion.target.reading} ({quizQuestion.target.romaji})
                </div>
              </div>

              {/* 4 Choices */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {quizQuestion.options.map((opt, idx) => {
                  let btnColor = 'bg-washi/90 border-washi-border hover:border-torii/60';
                  if (quizFeedback) {
                    if (opt.id === quizQuestion.target.id) {
                      btnColor = 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-102';
                    } else {
                      btnColor = 'opacity-40 bg-washi border-washi-border';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerQuiz(opt)}
                      disabled={!!quizFeedback}
                      className={`p-3 rounded-2xl border text-sm font-bold transition-all text-center ${btnColor}`}
                    >
                      {opt.meaning}
                    </button>
                  );
                })}
              </div>

              {quizFeedback && (
                <div
                  className={`text-sm font-bold animate-fadeIn ${
                    quizFeedback === 'correct' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {quizFeedback === 'correct' ? '🌸 Chính xác! +10 điểm' : '🍂 Sai rồi!'}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-4 py-6 relative z-10 text-center animate-fadeIn">
              <div className="hanko-seal text-center p-3 animate-bounce">
                💮 大変よくできました
              </div>
              <h3 className="text-xl font-black font-ui mt-2">HOÀN THÀNH BÀI TỪ VỰNG!</h3>
              <p className="text-sm opacity-70">
                Bạn đạt được <strong className="text-torii text-lg">{quizScore} / 100</strong> điểm.
              </p>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={startQuiz}
                  className="px-5 py-2.5 rounded-xl bg-torii text-white font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition-all"
                >
                  🔄 Luyện lại
                </button>
                <button
                  onClick={() => setActiveView('flashcard')}
                  className="px-5 py-2.5 rounded-xl bg-washi border border-washi-border font-bold text-xs hover:border-torii transition-all"
                >
                  🎴 Về thẻ Flashcard
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
