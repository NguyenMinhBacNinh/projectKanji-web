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
    <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-fadeIn">
      {/* Top Nav Switch: Handbook vs Verb Conjugator */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl karuta-card border border-washi-border shadow-xs">
        <div className="flex items-center gap-1.5 p-1 bg-washi rounded-xl border border-washi-border">
          <button
            onClick={() => {
              playWoodClapper();
              setActiveTab('handbook');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'handbook'
                ? 'bg-torii text-white shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <span>📜 Cẩm nang Ngữ pháp</span>
          </button>
          <button
            onClick={() => {
              playWoodClapper();
              setActiveTab('conjugation');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'conjugation'
                ? 'bg-torii text-white shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <span>⚙️ Luyện chia động từ</span>
          </button>
        </div>

        {/* Level Tabs if in handbook */}
        {activeTab === 'handbook' && (
          <div className="flex items-center gap-1 kifuda-tab p-1 rounded-xl border border-washi-border text-xs font-bold">
            {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  playWoodClapper();
                  setCurrentLevel(lvl);
                  setSelectedGrammar(null);
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentLevel === lvl
                    ? 'bg-torii text-white font-black shadow-xs'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* View 1: Grammar Handbook */}
      {activeTab === 'handbook' && (
        <div className="w-full flex flex-col lg:flex-row items-start gap-6">
          {/* List panel */}
          <div className="flex-1 w-full p-4 sm:p-5 rounded-3xl karuta-card border border-washi-border shadow-md flex flex-col gap-3">
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm ngữ pháp (vd: 〜てください, 〜たい, muốn...)"
                className="w-full py-2 pl-9 pr-3 text-xs rounded-xl bg-washi border border-washi-border focus:border-torii outline-hidden font-ui"
              />
              <span className="absolute left-3 top-2.5 text-xs opacity-50">🔍</span>
            </div>

            <div className="flex items-center justify-between text-[11px] opacity-60 px-1 pt-1 border-b border-washi-border pb-1.5">
              <span>Mẫu ngữ pháp ({grammarList.length})</span>
              <span>JLPT {currentLevel}</span>
            </div>

            {/* Grammar List Items */}
            <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
              {grammarList.map((g) => {
                const isSelected = selectedGrammar?.id === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      playWaterDrop();
                      setSelectedGrammar(g);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all group ${
                      isSelected
                        ? 'bg-torii text-white border-torii shadow-md'
                        : 'bg-washi/80 border-washi-border hover:border-torii/60 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-kanji font-bold text-sm tracking-wide">
                        {g.title}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-torii/10 text-torii'
                        }`}
                      >
                        {g.level}
                      </span>
                    </div>
                    <div
                      className={`text-xs truncate ${
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
          <div className="w-full lg:w-96 p-5 sm:p-6 rounded-3xl karuta-card border border-washi-border shadow-md flex flex-col gap-4 relative">
            <div className="karuta-inner-border" />

            {selectedGrammar ? (
              <div className="flex flex-col gap-3.5 relative z-10 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-washi-border">
                  <span className="hanko-stamp text-xs px-2.5 py-0.5">
                    JLPT {selectedGrammar.level}
                  </span>
                  <span className="text-xs font-bold text-torii uppercase tracking-wider">
                    CHI TIẾT NGỮ PHÁP
                  </span>
                </div>

                <div>
                  <h3 className="font-kanji font-black text-2xl text-torii">
                    {selectedGrammar.title}
                  </h3>
                  <div className="text-sm font-bold opacity-80 mt-1">
                    {selectedGrammar.meaning}
                  </div>
                </div>

                {/* Cấu trúc ngữ pháp */}
                <div className="p-3 rounded-2xl bg-washi border border-washi-border text-xs">
                  <span className="font-bold text-torii block mb-1">📐 Cấu trúc kết nối:</span>
                  <div className="font-mono text-[11px] font-bold opacity-90 leading-relaxed">
                    {selectedGrammar.structure}
                  </div>
                </div>

                {/* Giải thích */}
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs">
                  <span className="font-bold text-amber-800 dark:text-amber-200 block mb-1">
                    💡 Giải thích cách dùng:
                  </span>
                  <p className="opacity-80 text-[11px] leading-relaxed">
                    {selectedGrammar.explanation}
                  </p>
                </div>

                {/* Câu ví dụ mẫu */}
                <div>
                  <span className="text-[11px] font-bold opacity-70 uppercase tracking-wider block mb-2">
                    Câu ví dụ minh họa:
                  </span>
                  <div className="flex flex-col gap-2">
                    {selectedGrammar.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-washi/90 border border-washi-border text-xs flex flex-col gap-1 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-kanji font-bold text-sm text-color-sumi">
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
                            🔊
                          </button>
                        </div>
                        <div className="text-[10px] text-torii font-mono font-semibold">
                          {ex.furigana}
                        </div>
                        <div className="text-[11px] opacity-70 italic">{ex.vn}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center opacity-60 text-xs flex flex-col items-center gap-2 relative z-10">
                <span className="text-3xl">👈</span>
                <span>Chọn một điểm ngữ pháp bên trái để xem công thức và câu ví dụ song ngữ.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* View 2: Interactive Verb Conjugation Drill */}
      {activeTab === 'conjugation' && (
        <div className="w-full max-w-xl p-6 md:p-8 rounded-3xl karuta-card border-2 border-border-strong shadow-xl flex flex-col items-center gap-5 relative">
          <div className="karuta-inner-border" />

          <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10 text-xs">
            <span className="font-bold text-torii flex items-center gap-1.5">
              <span>⚙️</span> Luyện tập chia thể động từ
            </span>
            <span className="opacity-70 font-bold">{currentVerb.group}</span>
          </div>

          <div className="w-full flex flex-col items-center gap-5 relative z-10">
            {/* Target Verb Card */}
            <div className="text-center">
              <span className="text-xs opacity-60 block mb-1">Động từ nguyên mẫu:</span>
              <div className="text-4xl font-kanji font-black text-torii">
                {currentVerb.dict}
              </div>
              <div className="text-xs font-semibold opacity-70 mt-1">
                {currentVerb.reading} • ({currentVerb.meaning})
              </div>
            </div>

            {/* Target Form Selector */}
            <div className="w-full">
              <span className="text-xs font-bold opacity-70 block mb-1.5 text-center">
                Chọn thể cần chia:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {formsList.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => {
                      playWoodClapper();
                      setTargetForm(f.key);
                      setDrillAnswer('');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
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
            <form onSubmit={checkConjugation} className="w-full flex flex-col items-center gap-3">
              <div className="w-full relative">
                <input
                  type="text"
                  value={drillAnswer}
                  onChange={(e) => setDrillAnswer(e.target.value)}
                  placeholder={`Gõ thể của động từ 「${currentVerb.dict}」...`}
                  className="w-full py-3.5 px-4 rounded-2xl bg-washi border-2 border-washi-border focus:border-torii text-center text-lg font-kanji font-bold outline-hidden transition-all shadow-inner"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-torii text-white font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition-all"
                >
                  Kiểm tra đáp án ↵
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDrillAnswer(currentVerb.forms[targetForm]);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-washi border border-washi-border text-xs font-bold opacity-70 hover:opacity-100"
                >
                  Xem đáp án
                </button>
              </div>

              {drillFeedback && (
                <div
                  className={`text-sm font-bold mt-2 animate-fadeIn ${
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
