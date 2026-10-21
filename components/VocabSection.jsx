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
import {
  SearchIcon,
  VolumeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MasteredCheckIcon,
  SensuFanIcon,
  ScrollUnfurledIcon,
  KatanaIcon,
  OrigamiCraneIcon,
} from './ZenIcons';


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
    <div className="w-full max-w-[1020px] 2xl:max-w-6xl h-full min-h-0 flex-1 flex flex-col items-center justify-between gap-1 sm:gap-1.5 z-20 animate-fadeIn select-none overflow-hidden">
      {/* Unified Vocab Studio Toolbar (2 Tầng Khoa học, gọn gàng) */}
      <div className="w-full p-1 sm:p-1.5 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700/80 shadow-md backdrop-blur-md flex flex-col gap-1 shrink-0">
        {/* Tầng 1: Chế độ hiển thị + Cấp độ JLPT + Ô Tìm kiếm */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-1.5">
          {/* Trái: Chế độ hiển thị (View Mode) */}
          <div className="flex items-center gap-0.5 p-0.5 bg-[#F5EFE6] dark:bg-stone-800 rounded-xl border border-washi-border text-xs font-bold w-full md:w-auto">
            <button
              onClick={() => {
                playWoodClapper();
                setActiveView('flashcard');
              }}
              className={`flex-1 md:flex-initial px-2.5 py-1 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeView === 'flashcard'
                  ? 'bg-torii text-white shadow-2xs font-black'
                  : 'text-stone-700 dark:text-stone-300 hover:text-torii'
              }`}
            >
              <SensuFanIcon className="w-3.5 h-3.5" />
              <span>Flashcard</span>
            </button>
            <button
              onClick={() => {
                playWoodClapper();
                setActiveView('list');
              }}
              className={`flex-1 md:flex-initial px-2.5 py-1 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeView === 'list'
                  ? 'bg-torii text-white shadow-2xs font-black'
                  : 'text-stone-700 dark:text-stone-300 hover:text-torii'
              }`}
            >
              <ScrollUnfurledIcon className="w-3.5 h-3.5" />
              <span>Danh sách ({filteredList.length})</span>
            </button>
            <button
              onClick={startQuiz}
              className={`flex-1 md:flex-initial px-2.5 py-1 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeView === 'quiz'
                  ? 'bg-amber-600 text-white shadow-2xs font-black'
                  : 'text-amber-800 dark:text-amber-300 hover:text-amber-600'
              }`}
            >
              <KatanaIcon className="w-3.5 h-3.5" />
              <span>Phản xạ</span>
            </button>
          </div>

          {/* Giữa: Bộ lọc cấp độ JLPT */}
          <div className="flex items-center gap-1 text-xs font-bold w-full md:w-auto justify-center">
            {['all', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  playWoodClapper();
                  setSelectedLevel(lvl);
                  setCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-torii text-white border-torii shadow-2xs font-black'
                    : 'bg-[#F5EFE6] dark:bg-stone-800 border-washi-border opacity-75 hover:opacity-100'
                }`}
              >
                {lvl === 'all' ? 'Tất cả' : lvl}
              </button>
            ))}
          </div>

          {/* Phải: Ô Tìm kiếm */}
          <div className="w-full md:w-52 relative shrink-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCardIndex(0);
              }}
              placeholder="Tìm từ vựng, Hán Việt..."
              className="w-full pl-7 pr-6 py-1 rounded-lg bg-washi dark:bg-stone-800 border border-washi-border dark:border-stone-700 text-xs outline-none focus:border-torii transition-colors font-ui"
            />
            <SearchIcon className="w-3 h-3 absolute left-2 top-2 text-stone-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tầng 2: Dải Chủ đề (Topic Ribbon) */}
        <div className="w-full flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar text-xs font-medium border-t border-[#ebdccb]/60 dark:border-stone-700/60">
          {VOCAB_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                playWoodClapper();
                setSelectedTopic(topic.id);
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2 py-0.5 rounded-lg border whitespace-nowrap transition-all flex items-center gap-1 shrink-0 text-[10px] cursor-pointer ${
                selectedTopic === topic.id
                  ? 'bg-torii/15 border-torii text-torii font-bold shadow-2xs'
                  : 'bg-[#F5EFE6]/80 dark:bg-stone-800/80 border-washi-border opacity-75 hover:opacity-100 text-stone-700 dark:text-stone-300'
              }`}
            >
              <span>{topic.icon}</span>
              <span>{topic.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. FLASHCARD VIEW */}
      {activeView === 'flashcard' && (
        <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-between py-1 gap-1">
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
                style={{ height: 'min(270px, 34vh)', minHeight: '210px' }}
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
                  <div className="card-face card-front absolute inset-0 w-full h-full rounded-3xl karuta-card p-3.5 sm:p-5 flex flex-col justify-between select-none overflow-hidden">
                    <div className="karuta-inner-border" />

                    {/* Watermark Crest */}
                    <div className="absolute -bottom-8 -right-8 pointer-events-none opacity-[0.06] dark:opacity-[0.1] text-torii">
                      <OrigamiCraneIcon className="w-40 h-40" />
                    </div>

                    <div className="w-full flex items-center justify-between relative z-10 border-b border-washi-border/60 pb-1.5">
                      <span className="hanko-stamp text-[10px] py-0.5 px-2">
                        {currentWord?.level}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playWaterDrop();
                          playJapaneseSpeech(currentWord?.kanji);
                        }}
                        className="p-1.5 rounded-xl bg-washi hover:bg-torii hover:text-white text-torii transition-all active:scale-95 border border-washi-border shadow-2xs"
                        title="Nghe phát âm"
                      >
                        <VolumeIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-center my-auto relative z-10 flex flex-col items-center">
                      {/* Huy hiệu minh họa chủ đề trực quan */}
                      <div className="mb-1 px-2.5 py-0.5 rounded-xl bg-washi border border-washi-border flex items-center gap-1.5 shadow-2xs">
                        <span className="text-sm sm:text-base">
                          {VOCAB_TOPICS.find((t) => t.id === currentWord?.topic)?.icon || '🌸'}
                        </span>
                        <span className="text-[10px] font-bold text-torii font-ui">
                          {VOCAB_TOPICS.find((t) => t.id === currentWord?.topic)?.name || 'Từ vựng'}
                        </span>
                      </div>

                      <div className="text-[10px] font-mono opacity-60 uppercase tracking-widest mb-0.5">
                        {currentWord?.romaji}
                      </div>
                      <div className="text-3xl sm:text-4xl font-kanji font-black tracking-wide text-torii drop-shadow-xs">
                        {currentWord?.kanji}
                      </div>
                      <div className="text-base font-kanji font-bold mt-1 opacity-80">
                        {currentWord?.reading}
                      </div>
                      <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 font-kanji mt-0.5">
                        [{currentWord?.hanViet}]
                      </div>
                    </div>

                    <div className="text-center text-[10px] opacity-60 relative z-10 pt-1.5 border-t border-washi-border/60">
                      Chạm để lật xem nghĩa & câu ví dụ ↻
                    </div>
                  </div>

                  {/* Mặt sau: Nghĩa & Câu ví dụ */}
                  <div className="card-face card-back absolute inset-0 w-full h-full rounded-3xl karuta-card p-3.5 sm:p-5 flex flex-col justify-between select-none overflow-hidden">
                    <div className="karuta-inner-border" />

                    {/* Watermark Crest */}
                    <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-[0.06] dark:opacity-[0.1] text-bamboo">
                      <SensuFanIcon className="w-36 h-36" />
                    </div>

                    <div className="w-full flex items-center justify-between relative z-10 border-b border-washi-border/60 pb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-kanji font-black text-torii text-lg">
                          {currentWord?.kanji}
                        </span>
                        <span className="text-xs opacity-70 font-kanji">({currentWord?.reading})</span>
                      </div>
                      <span className="text-[11px] font-bold opacity-60">{currentWord?.type}</span>
                    </div>

                    <div className="my-auto relative z-10 flex flex-col gap-2">
                      <div>
                        <span className="text-[9px] uppercase font-bold opacity-60 block">Nghĩa tiếng Việt:</span>
                        <div className="text-lg sm:text-xl font-bold text-color-sumi mt-0.5">
                          {currentWord?.meaning}
                        </div>
                      </div>

                      {currentWord?.exampleJp && (
                        <div className="p-2 sm:p-2.5 bg-washi rounded-xl border border-washi-border text-xs">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[9px] font-bold text-torii">CÂU VÍ DỤ:</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playWaterDrop();
                                playJapaneseSpeech(currentWord.exampleJp);
                              }}
                              className="p-1 rounded-md hover:bg-torii/10 text-torii transition-colors"
                              title="Nghe câu ví dụ"
                            >
                              <VolumeIcon className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="font-kanji font-semibold text-xs sm:text-sm leading-snug">
                            {currentWord.exampleJp}
                          </div>
                          <div className="text-[10px] opacity-75 mt-0.5 italic">
                            {currentWord.exampleVn}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-center text-[10px] opacity-60 relative z-10 pt-1.5 border-t border-washi-border/60">
                      Chạm để quay lại mặt trước ↺
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="w-full max-w-xl flex items-center justify-between gap-1.5 px-1">
                <button
                  onClick={handlePrevCard}
                  className="py-1.5 sm:py-2 px-3 sm:px-4 karuta-card border border-washi-border rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 text-stone-800 dark:text-stone-100"
                >
                  <ChevronLeftIcon className="w-3.5 h-3.5" />
                  <span>Trước</span>
                </button>

                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button
                    onClick={() => {
                      playWoodClapper();
                      setIsFlipped(!isFlipped);
                    }}
                    className="py-1.5 sm:py-2 px-3 karuta-card border border-washi-border rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 text-stone-800 dark:text-stone-100"
                    title="Lật thẻ xem nghĩa"
                  >
                    <span>{isFlipped ? 'Mặt trước' : 'Lật thẻ'}</span>
                    <span className="text-torii dark:text-torii-light font-bold">↻</span>
                  </button>

                  <button
                    onClick={() => toggleMastered(currentWord?.id)}
                    className={`py-1.5 sm:py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 shadow-xs ${
                      masteredWords.includes(currentWord?.id)
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'karuta-card opacity-80 hover:opacity-100 text-stone-800 dark:text-stone-100'
                    }`}
                  >
                    <MasteredCheckIcon className="w-3 h-3" />
                    <span>{masteredWords.includes(currentWord?.id) ? 'Đã thuộc' : 'Thuộc từ này'}</span>
                  </button>

                  <button
                    onClick={() => {
                      playWaterDrop();
                      playJapaneseSpeech(currentWord?.kanji);
                    }}
                    className="p-1.5 sm:p-2 karuta-card rounded-xl border border-washi-border text-xs font-bold shadow-xs active:scale-95 text-torii hover:bg-torii hover:text-white dark:hover:text-white"
                    title="Phát âm từ vựng"
                  >
                    <VolumeIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleNextCard}
                  className="py-1.5 sm:py-2 px-4 bg-torii hover:bg-torii-light text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-1"
                >
                  <span>Tiếp</span>
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* 2. LIST VIEW */}
      {activeView === 'list' && (
        <div className="w-full flex-1 min-h-0 overflow-y-auto thin-scrollbar p-3 sm:p-4 rounded-3xl karuta-card border border-washi-border shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-washi/90 dark:bg-stone-800/90 border border-washi-border dark:border-stone-700 hover:border-torii/50 dark:hover:border-torii-light transition-all flex flex-col justify-between group shadow-2xs h-[116px]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-kanji text-xl font-black text-stone-900 dark:text-stone-50 group-hover:text-torii dark:group-hover:text-torii-light transition-colors">
                        {item.kanji}
                      </span>
                      <span className="text-xs font-kanji font-bold text-torii dark:text-torii-light">{item.reading}</span>
                    </div>
                    <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                      {item.romaji} • [{item.hanViet}]
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playWaterDrop();
                      playJapaneseSpeech(item.kanji, item.reading);
                    }}
                    className="p-1 rounded-lg bg-washi dark:bg-stone-700 border border-washi-border dark:border-stone-600 hover:bg-torii hover:text-white transition-all text-xs text-stone-700 dark:text-stone-200"
                    title="Nghe đọc"
                  >
                    <VolumeIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-1.5 pt-1.5 border-t border-washi-border/60 dark:border-stone-700/60">
                  <div className="text-xs font-bold text-stone-800 dark:text-stone-100 truncate">{item.meaning}</div>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                    <span className="hanko-stamp py-0.2 px-1.5 text-[9px]">{item.level}</span>
                    <span className="font-medium">{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MINI QUIZ VIEW */}
      {activeView === 'quiz' && (
        <div className="w-full max-w-xl flex-1 min-h-0 overflow-y-auto thin-scrollbar p-4 sm:p-6 rounded-3xl karuta-card border-2 border-border-strong shadow-xl flex flex-col items-center justify-between gap-3 relative">
          <div className="karuta-inner-border" />

          <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10 text-xs">
            <span className="font-bold text-torii flex items-center gap-1.5">
              <KatanaIcon className="w-4 h-4 text-torii" /> Trắc nghiệm phản xạ từ vựng
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
                    className="p-1 rounded-lg hover:bg-torii/10 text-torii opacity-80 hover:opacity-100 transition-colors"
                    title="Nghe phát âm"
                  >
                    <VolumeIcon className="w-5 h-5" />
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
