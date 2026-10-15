'use client';
import { useState, useMemo } from 'react';
import { HAN_VIET_FALLBACK_MAP } from '../lib/kanjiExtendedDict';
import { playWoodClapper, playWaterDrop } from '../lib/traditionalAudio';

export default function KanjiGridModal({
  isOpen,
  onClose,
  kanjiList,
  currentLevel,
  currentIndex,
  onSelectKanji,
  fullDb = null,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return kanjiList;
    const term = searchTerm.trim().toUpperCase();
    return kanjiList.filter((char) => {
      const dbItem = fullDb && fullDb[char] ? fullDb[char] : null;
      const hv = (dbItem?.hanViet || HAN_VIET_FALLBACK_MAP[char] || '').toUpperCase();
      const mean = (dbItem?.meaning || '').toUpperCase();
      return char.includes(term) || hv.includes(term) || mean.includes(term);
    });
  }, [kanjiList, searchTerm, fullDb]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="karuta-card w-full max-w-xl max-h-[85vh] rounded-3xl border-[2.5px] border-stone-900 dark:border-white shadow-manga-lg flex flex-col overflow-hidden relative bg-white dark:bg-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="karuta-inner-border pointer-events-none" />

        <div className="p-4 border-b-2 border-stone-900 dark:border-white flex items-center justify-between relative z-10 bg-yellow-100 dark:bg-stone-850">
          <div>
            <h3 className="font-black text-base sm:text-lg font-kanji text-stone-950 dark:text-white">
              Mục lục Kanji {currentLevel} ({kanjiList.length} chữ)
            </h3>
            <p className="text-xs font-bold text-stone-700 dark:text-stone-300">
              Nhấp vào một chữ để chuyển đến thẻ học tương ứng
            </p>
          </div>
          <button
            onClick={() => {
              playWaterDrop();
              onClose();
            }}
            className="w-8 h-8 rounded-xl border-2 border-stone-900 dark:border-white bg-white dark:bg-stone-800 hover:bg-akira hover:text-white text-stone-900 dark:text-stone-100 text-lg font-black flex items-center justify-center transition-all cursor-pointer shadow-2xs active:translate-x-0.5 active:translate-y-0.5"
          >
            &times;
          </button>
        </div>

        <div className="p-3 border-b-2 border-stone-900 dark:border-white relative z-10 bg-stone-50 dark:bg-stone-800">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo chữ Kanji hoặc âm Hán Việt (vd: NHẤT, 一)..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border-2 border-stone-900 dark:border-white text-xs md:text-sm font-bold text-stone-950 dark:text-white outline-none focus:bg-yellow-50 dark:focus:bg-stone-800 shadow-2xs transition-colors"
            autoFocus
          />
        </div>

        <div className="p-4 overflow-y-auto grid grid-cols-5 sm:grid-cols-8 gap-2 relative z-10">
          {filteredList.map((char) => {
            const originalIndex = kanjiList.indexOf(char);
            const isCurrent = originalIndex === currentIndex;
            const hv = fullDb?.[char]?.hanViet || HAN_VIET_FALLBACK_MAP[char] || '';

            return (
              <button
                key={char}
                onClick={() => {
                  playWoodClapper();
                  onSelectKanji(originalIndex);
                  onClose();
                }}
                className={`p-2 rounded-xl border-2 border-stone-900 dark:border-white flex flex-col items-center justify-center transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-akira text-white shadow-manga-sm font-black'
                    : 'bg-white dark:bg-stone-800 text-stone-950 dark:text-white hover:bg-manga-yellow hover:text-stone-950 shadow-2xs active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <span className="text-xl font-kanji font-black">{char}</span>
                <span className={`text-[10px] mt-0.5 font-bold truncate max-w-full ${isCurrent ? 'text-white' : 'text-stone-600 dark:text-stone-300'}`}>
                  {hv || '—'}
                </span>
              </button>
            );
          })}
        </div>

        {filteredList.length === 0 && (
          <div className="p-8 text-center text-xs opacity-70 relative z-10">
            Không tìm thấy chữ Kanji nào phù hợp với từ khóa &ldquo;{searchTerm}&rdquo;.
          </div>
        )}
      </div>
    </div>
  );
}
