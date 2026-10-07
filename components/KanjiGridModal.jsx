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
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return kanjiList;
    const term = searchTerm.trim().toUpperCase();
    return kanjiList.filter((char) => {
      const hv = (HAN_VIET_FALLBACK_MAP[char] || '').toUpperCase();
      return char.includes(term) || hv.includes(term);
    });
  }, [kanjiList, searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="karuta-card w-full max-w-xl max-h-[85vh] rounded-3xl border-2 border-washi-border shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="karuta-inner-border pointer-events-none" />

        <div className="p-4 border-b border-washi-border/70 flex items-center justify-between relative z-10 bg-black/5 dark:bg-white/5">
          <div>
            <h3 className="font-bold text-base font-kanji">
              Mục lục Kanji {currentLevel} ({kanjiList.length} chữ)
            </h3>
            <p className="text-[11px] opacity-70">
              Nhấp vào một chữ để chuyển đến thẻ học tương ứng
            </p>
          </div>
          <button
            onClick={() => {
              playWaterDrop();
              onClose();
            }}
            className="w-8 h-8 rounded-xl opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 text-xl font-bold flex items-center justify-center transition-all cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="p-3 border-b border-washi-border/70 relative z-10">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo chữ Kanji hoặc âm Hán Việt (vd: NHẤT, 一)..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-washi-border text-xs md:text-sm outline-none focus:border-torii transition-colors"
            autoFocus
          />
        </div>

        <div className="p-4 overflow-y-auto grid grid-cols-5 sm:grid-cols-8 gap-2 relative z-10">
          {filteredList.map((char) => {
            const originalIndex = kanjiList.indexOf(char);
            const isCurrent = originalIndex === currentIndex;
            const hv = HAN_VIET_FALLBACK_MAP[char] || '';

            return (
              <button
                key={char}
                onClick={() => {
                  playWoodClapper();
                  onSelectKanji(originalIndex);
                  onClose();
                }}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-torii text-white border-torii shadow-md scale-105 font-bold'
                    : 'bg-black/5 dark:bg-white/5 border-washi-border hover:border-torii/60 hover:scale-102'
                }`}
              >
                <span className="text-xl font-kanji font-bold">{char}</span>
                <span className={`text-[10px] mt-0.5 font-medium truncate max-w-full ${isCurrent ? 'text-white/90' : 'opacity-70'}`}>
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
