'use client';

import { useState, useMemo } from 'react';
import { GRAMMAR_DATA, CONJUGATION_DRILL_VERBS } from '../lib/grammarData';
import { playJapaneseSpeech } from '../lib/kanjiService';
import {
  playWoodClapper,
  playWaterDrop,
  playQuizSuccess,
  playQuizError,
} from '../lib/traditionalAudio';
import { ScrollUnfurledIcon, KatanaIcon, SearchIcon, VolumeIcon } from './ZenIcons';


export default function GrammarSection() {
  const [activeTab, setActiveTab] = useState('handbook'); // 'handbook' | 'conjugation'
  const [currentLevel, setCurrentLevel] = useState('N5');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrammar, setSelectedGrammar] = useState(null);

  // Verb Conjugation Drill state
  const [drillVerbIndex, setDrillVerbIndex] = useState(0);
  const [targetForm, setTargetForm] = useState('te'); // 'te', 'ta', 'nai', 'masu', 'potential'
  const [drillAnswer, setDrillAnswer] = useState('');
  const [drillFeedback, setDrillFeedback] = useState(null); // 'correct' | 'wrong'

  const formsList = [
    { key: 'te', label: 'Thể て (Te-form)' },
    { key: 'ta', label: 'Thể た (Quá khứ ngắn)' },
    { key: 'nai', label: 'Thể ない (Phủ định ngắn)' },
    { key: 'masu', label: 'Thể ます (Lịch sự)' },
    { key: 'potential', label: 'Thể Khả năng (Có thể làm)' },
  ];

  const currentVerb = CONJUGATION_DRILL_VERBS[drillVerbIndex];

  // Danh sách ngữ pháp theo level & tìm kiếm
  const grammarList = useMemo(() => {
    const list = GRAMMAR_DATA[currentLevel] || [];
    if (!searchTerm.trim()) return list;

    const query = searchTerm.toLowerCase();
    return list.filter(
      (g) =>
        g.title.toLowerCase().includes(query) ||
        g.meaning.toLowerCase().includes(query) ||
        g.structure.toLowerCase().includes(query)
    );
  }, [currentLevel, searchTerm]);

  // Kiểm tra đáp án chia động từ
  const checkConjugation = (e) => {
    e.preventDefault();
    if (!drillAnswer.trim() || drillFeedback) return;

    const correctForm = currentVerb.forms[targetForm];
    const isCorrect =
      drillAnswer.trim().toLowerCase() === correctForm.toLowerCase() ||
      drillAnswer.trim() === currentVerb.dict;

    if (isCorrect) {
      playQuizSuccess();
      setDrillFeedback('correct');
    } else {
      playQuizError();
      setDrillFeedback('wrong');
    }

    setTimeout(() => {
      setDrillFeedback(null);
      setDrillAnswer('');
      // Chọn động từ tiếp theo
      setDrillVerbIndex((idx) => (idx + 1) % CONJUGATION_DRILL_VERBS.length);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[1020px] 2xl:max-w-6xl h-full min-h-0 flex-1 flex flex-col items-center justify-start gap-1.5 sm:gap-2 animate-fadeIn select-none overflow-hidden">
      {/* Top Nav Switch: Handbook vs Verb Conjugator (Gọn gàng 1 dòng) */}
      <div className="w-full flex items-center justify-between gap-2 p-1 sm:p-1.5 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700/80 shadow-md backdrop-blur-md shrink-0">
        <div className="flex items-center gap-1 p-0.5 bg-[#F5EFE6] dark:bg-stone-800 rounded-xl border border-washi-border">
          <button
            onClick={() => {
              playWoodClapper();
              setActiveTab('handbook');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'handbook'
                ? 'bg-torii text-white shadow-2xs'
                : 'opacity-70 hover:opacity-100 text-stone-700 dark:text-stone-300'
            }`}
          >
            <ScrollUnfurledIcon className="w-3.5 h-3.5" />
            <span>Cẩm nang Ngữ pháp</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveTab('conjugation');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'conjugation'
                ? 'bg-torii text-white shadow-2xs'
                : 'opacity-70 hover:opacity-100 text-stone-700 dark:text-stone-300'
            }`}
          >
            <KatanaIcon className="w-3.5 h-3.5" />
            <span>Luyện chia động từ</span>
          </button>
        </div>

        {/* Level Tabs if in handbook */}
        {activeTab === 'handbook' && (
          <div className="flex items-center gap-0.5 p-0.5 bg-[#F5EFE6] dark:bg-stone-800 rounded-xl border border-washi-border text-xs font-bold">
            {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  playWoodClapper();
                  setCurrentLevel(lvl);
                  setSelectedGrammar(null);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all text-xs cursor-pointer ${
                  currentLevel === lvl
                    ? 'bg-torii text-white font-black shadow-2xs'
                    : 'opacity-70 hover:opacity-100 text-stone-700 dark:text-stone-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* View 1: Grammar Handbook (Zero-Scroll Split Studio 2 Cột) */}
      {activeTab === 'handbook' && (
        <div className="w-full flex-1 min-h-0 flex flex-col lg:flex-row items-stretch gap-2.5 sm:gap-3 overflow-hidden">
          {/* List panel */}
          <div className="w-full lg:w-80 2xl:w-96 h-full min-h-0 p-3 sm:p-4 rounded-3xl karuta-card border border-washi-border shadow-md flex flex-col gap-2 shrink-0">
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm ngữ pháp (vd: 〜てください, 〜たい, muốn...)"
                className="w-full py-2 pl-9 pr-3 text-xs rounded-xl bg-washi border border-washi-border focus:border-torii outline-hidden font-ui"
              />
              <span className="absolute left-3 top-2.5 opacity-60">
                <SearchIcon className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] opacity-60 px-1 pt-1 border-b border-washi-border pb-1.5">
              <span>Mẫu ngữ pháp ({grammarList.length})</span>
              <span>JLPT {currentLevel}</span>
            </div>

            {/* Grammar List Items */}
            <div className="flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-1">
              {grammarList.map((g) => {
                const isSelected = selectedGrammar?.id === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      playWaterDrop();
                      setSelectedGrammar(g);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all group cursor-pointer ${
                      isSelected
                        ? 'bg-torii text-white border-torii shadow-xs'
                        : 'bg-washi/80 border-washi-border hover:border-torii/60 hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-kanji font-bold text-xs sm:text-sm tracking-wide">
                        {g.title}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-torii/10 text-torii'
                        }`}
                      >
                        {g.level}
                      </span>
                    </div>
                    <div
                      className={`text-[11px] truncate ${
                        isSelected ? 'text-white/90' : 'opacity-70 group-hover:text-torii'
                      }`}
                    >
                      {g.meaning}
                    </div>
                  </button>
                );
              })}

              {grammarList.length === 0 && (
                <div className="py-12 text-center opacity-60 text-xs">
                  Không tìm thấy ngữ pháp phù hợp với từ khóa này.
                </div>
              )}
            </div>
          </div>

          {/* Grammar Detail View Panel */}
          <div className="flex-1 w-full h-full min-h-0 p-3.5 sm:p-5 rounded-3xl karuta-card border border-washi-border shadow-md flex flex-col relative overflow-hidden">
            <div className="karuta-inner-border" />

            {selectedGrammar ? (
              <div className="flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-1 flex flex-col gap-2.5 sm:gap-3 relative z-10 animate-fadeIn">
                <div className="flex items-center justify-between pb-1.5 border-b border-washi-border">
                  <span className="hanko-stamp text-[10px] px-2 py-0.5">
                    JLPT {selectedGrammar.level}
                  </span>
                  <span className="text-[10px] font-bold text-torii uppercase tracking-wider">
                    CHI TIẾT NGỮ PHÁP
                  </span>
                </div>

                <div>
                  <h3 className="font-kanji font-black text-xl sm:text-2xl text-torii">
                    {selectedGrammar.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-bold opacity-80 mt-0.5">
                    {selectedGrammar.meaning}
                  </div>
                </div>

                {/* Cấu trúc ngữ pháp */}
                <div className="p-2.5 rounded-xl bg-washi border border-washi-border text-xs">
                  <span className="font-bold text-torii block mb-0.5 text-[11px]">📐 Cấu trúc kết nối:</span>
                  <div className="font-mono text-[11px] font-bold opacity-90 leading-relaxed">
                    {selectedGrammar.structure}
                  </div>
                </div>

                {/* Giải thích */}
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                  <span className="font-bold text-amber-800 dark:text-amber-200 block mb-0.5 text-[11px]">
                    💡 Giải thích cách dùng:
                  </span>
                  <p className="opacity-80 text-[11px] leading-relaxed">
                    {selectedGrammar.explanation}
                  </p>
                </div>

                {/* Câu ví dụ mẫu */}
                <div>
                  <span className="text-[10px] font-bold opacity-70 uppercase tracking-wider block mb-1.5">
                    Câu ví dụ minh họa:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {selectedGrammar.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="p-2 sm:p-2.5 rounded-xl bg-washi/90 border border-washi-border text-xs flex flex-col gap-0.5 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-kanji font-bold text-xs sm:text-sm text-color-sumi">
                            {ex.jp}
                          </span>
                          <button
                            onClick={() => {
                              playWaterDrop();
                              playJapaneseSpeech(ex.jp);
                            }}
                            className="p-1 rounded-lg text-torii hover:bg-torii hover:text-white transition-all text-xs"
                            title="Nghe phát âm câu này"
                          >
                            <VolumeIcon className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-[9px] text-torii font-mono font-semibold">
                          {ex.furigana}
                        </div>
                        <div className="text-[10px] opacity-70 italic">{ex.vn}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center opacity-60 text-xs flex flex-col items-center gap-2 relative z-10 my-auto">
                <span className="text-3xl">👈</span>
                <span>Chọn một điểm ngữ pháp bên trái để xem công thức và câu ví dụ song ngữ.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* View 2: Interactive Verb Conjugation Drill */}
      {activeTab === 'conjugation' && (
        <div className="w-full max-w-xl flex-1 min-h-0 overflow-y-auto thin-scrollbar p-4 sm:p-6 rounded-3xl karuta-card border-2 border-border-strong shadow-xl flex flex-col items-center justify-between gap-3 relative">
          <div className="karuta-inner-border" />

          <div className="w-full flex items-center justify-between pb-2 border-b border-washi-border relative z-10 text-xs">
            <span className="font-bold text-torii flex items-center gap-1.5">
              <span>⚙️</span> Luyện tập chia thể động từ
            </span>
            <span className="opacity-70 font-bold">{currentVerb.group}</span>
          </div>

          <div className="w-full flex flex-col items-center gap-3 relative z-10 my-auto">
            {/* Target Verb Card */}
            <div className="text-center">
              <span className="text-[11px] opacity-60 block mb-0.5">Động từ nguyên mẫu:</span>
              <div className="text-3xl sm:text-4xl font-kanji font-black text-torii">
                {currentVerb.dict}
              </div>
              <div className="text-xs font-semibold opacity-70 mt-0.5">
                {currentVerb.reading} • ({currentVerb.meaning})
              </div>
            </div>

            {/* Target Form Selector */}
            <div className="w-full">
              <span className="text-[11px] font-bold opacity-70 block mb-1 text-center">
                Chọn thể cần chia:
              </span>
              <div className="flex items-center gap-1 flex-wrap justify-center">
                {formsList.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => {
                      playWoodClapper();
                      setTargetForm(f.key);
                      setDrillAnswer('');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      targetForm === f.key
                        ? 'bg-torii text-white border-torii shadow-xs'
                        : 'bg-washi border-washi-border hover:border-torii/50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Answer Input Form */}
            <form onSubmit={checkConjugation} className="w-full flex flex-col items-center gap-2">
              <div className="w-full relative">
                <input
                  type="text"
                  value={drillAnswer}
                  onChange={(e) => setDrillAnswer(e.target.value)}
                  placeholder={`Gõ thể của động từ 「${currentVerb.dict}」...`}
                  className="w-full py-2 sm:py-2.5 px-3 rounded-2xl bg-washi border-2 border-washi-border focus:border-torii text-center text-base sm:text-lg font-kanji font-bold outline-hidden transition-all shadow-inner"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-torii text-white font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition-all"
                >
                  Kiểm tra đáp án ↵
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDrillAnswer(currentVerb.forms[targetForm]);
                  }}
                  className="px-3 py-2 rounded-xl bg-washi border border-washi-border text-xs font-bold opacity-70 hover:opacity-100"
                >
                  Xem đáp án
                </button>
              </div>

              {drillFeedback && (
                <div
                  className={`text-xs sm:text-sm font-bold mt-1 animate-fadeIn ${
                    drillFeedback === 'correct' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {drillFeedback === 'correct'
                    ? `🌸 Chính xác! Đáp án đúng là: ${currentVerb.forms[targetForm]}`
                    : `🍂 Chưa đúng! Đáp án đúng là: ${currentVerb.forms[targetForm]}`}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
