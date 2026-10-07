'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { getLocalKanjiInfo } from '../lib/kanjiService';
import { playWaterDrop, playWoodClapper } from '../lib/traditionalAudio';

// Hàm bỏ dấu tiếng Việt để tìm kiếm không dấu ("nhat" tìm được "nhất", "huu" tìm được "hưu")
function removeAccents(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export default function SpotlightSearchModal({
  isOpen,
  onClose,
  onSelectKanji,
  fullDb,
  levelsData = {},
}) {
  const [query, setQuery] = useState('');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState('ALL'); // 'ALL' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Tạo Search Database phẳng từ tất cả các cấp độ
  const flatKanjiIndex = useMemo(() => {
    const list = [];
    const seenChars = new Set();

    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    levels.forEach((lvl) => {
      const chars = levelsData[lvl] || [];
      chars.forEach((char) => {
        if (!seenChars.has(char)) {
          seenChars.add(char);
          const info = getLocalKanjiInfo(char, fullDb);
          const hanViet = info?.hanViet || '';
          const meaning = info?.meaning || '';
          const onReading = info?.on || '';
          const kunReading = info?.kun || '';

          list.push({
            char,
            level: lvl,
            hanViet,
            hanVietNorm: removeAccents(hanViet),
            meaning,
            meaningNorm: removeAccents(meaning),
            onReading,
            onNorm: removeAccents(onReading),
            kunReading,
            kunNorm: removeAccents(kunReading),
            vocabWords: info?.vocab?.map((v) => v.word).join(' ') || '',
            vocabReadings: info?.vocab?.map((v) => v.reading).join(' ') || '',
          });
        }
      });
    });

    return list;
  }, [levelsData, fullDb]);

  // Lọc kết quả tìm kiếm theo query và level filter
  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    const norm = removeAccents(trimmed);

    let filtered = flatKanjiIndex;

    // Lọc theo Level
    if (selectedLevelFilter !== 'ALL') {
      filtered = filtered.filter((item) => item.level === selectedLevelFilter);
    }

    if (!trimmed) {
      // Khi chưa gõ từ khóa: hiển thị các chữ tiêu biểu
      return filtered.slice(0, 16);
    }

    // Tìm kiếm đa năng
    const matches = filtered.filter((item) => {
      // 1. Khớp chính xác hoặc chứa chữ Kanji
      if (item.char === trimmed || item.char.includes(trimmed)) return true;

      // 2. Khớp âm Hán Việt (có dấu hoặc không dấu)
      if (
        item.hanViet.toLowerCase().includes(trimmed.toLowerCase()) ||
        item.hanVietNorm.includes(norm)
      ) {
        return true;
      }

      // 3. Khớp nghĩa tiếng Việt
      if (
        item.meaning.toLowerCase().includes(trimmed.toLowerCase()) ||
        item.meaningNorm.includes(norm)
      ) {
        return true;
      }

      // 4. Khớp âm On / Kun / Romaji
      if (
        item.onReading.toLowerCase().includes(trimmed.toLowerCase()) ||
        item.kunReading.toLowerCase().includes(trimmed.toLowerCase()) ||
        item.onNorm.includes(norm) ||
        item.kunNorm.includes(norm)
      ) {
        return true;
      }

      // 5. Khớp từ vựng liên quan
      if (
        item.vocabWords.includes(trimmed) ||
        item.vocabReadings.toLowerCase().includes(trimmed.toLowerCase())
      ) {
        return true;
      }

      return false;
    });

    // Giới hạn 24 kết quả đầu để render tức thì
    return matches.slice(0, 24);
  }, [flatKanjiIndex, query, selectedLevelFilter]);

  // Tự động focus input khi mở
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setHighlightedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
    }
  }, [isOpen]);

  // Reset highlight index khi danh sách kết quả thay đổi
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchResults]);

  // Cuộn phần tử highlight vào vùng nhìn thấy
  useEffect(() => {
    if (listRef.current && searchResults.length > 0) {
      const highlightedEl = listRef.current.children[highlightedIndex];
      if (highlightedEl) {
        highlightedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, searchResults.length]);

  // Xử lý phím mũi tên và Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[highlightedIndex]) {
        handleSelect(searchResults[highlightedIndex]);
      }
    }
  };

  const handleSelect = (item) => {
    playWoodClapper();
    onSelectKanji(item.char, item.level);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-3 sm:px-4 bg-black/65 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl karuta-card border-2 border-border-strong shadow-2xl flex flex-col overflow-hidden text-color-sumi relative z-10"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Viền trong kép phong cách Nhật */}
        <div className="karuta-inner-border" />

        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-b border-washi-border flex items-center gap-3 relative z-10 bg-washi/70">
          <span className="text-xl text-torii select-none">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo Hán Việt (nhất, hưu), Kanji (休), Romaji, hoặc nghĩa tiếng Việt..."
            className="w-full bg-transparent border-none outline-none text-base sm:text-lg font-ui font-medium placeholder:opacity-45 text-color-sumi"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="text-xs opacity-50 hover:opacity-100 p-1 rounded-md"
            >
              ✕
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-mono opacity-50 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded border border-washi-border">
            ESC đóng
          </span>
        </div>

        {/* Level Filter Bar */}
        <div className="px-4 py-2 bg-washi/40 border-b border-washi-border flex items-center justify-between gap-2 overflow-x-auto relative z-10">
          <div className="flex items-center gap-1.5 text-xs">
            {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  playWaterDrop();
                  setSelectedLevelFilter(lvl);
                }}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                  selectedLevelFilter === lvl
                    ? 'bg-torii text-white shadow-xs'
                    : 'opacity-65 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {lvl === 'ALL' ? 'Tất cả' : `JLPT ${lvl}`}
              </button>
            ))}
          </div>

          <span className="text-[11px] opacity-60 shrink-0 font-medium">
            {searchResults.length} kết quả
          </span>
        </div>

        {/* Search Results List */}
        <div
          ref={listRef}
          className="max-h-[55vh] overflow-y-auto p-2 sm:p-3 flex flex-col gap-1.5 relative z-10"
        >
          {searchResults.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center gap-2 text-color-sumi/70">
              <span className="text-4xl">🎐</span>
              <p className="font-semibold text-sm">
                Không tìm thấy chữ Hán nào phù hợp với từ khóa &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs opacity-75">
                Hãy thử gõ chữ Kanji trực tiếp, âm Hán Việt không dấu hoặc nghĩa tiếng Việt.
              </p>
            </div>
          ) : (
            searchResults.map((item, index) => {
              const isSelected = index === highlightedIndex;

              return (
                <div
                  key={`${item.level}_${item.char}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`p-3 rounded-2xl flex items-center justify-between transition-all duration-150 cursor-pointer border ${
                    isSelected
                      ? 'bg-torii/15 border-torii text-color-sumi shadow-sm scale-[1.008]'
                      : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5 opacity-90'
                  }`}
                >
                  {/* Left: Kanji & Info */}
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    {/* Big Kanji */}
                    <div className="w-12 h-12 rounded-xl bg-washi/80 border border-washi-border flex items-center justify-center font-kanji font-black text-2xl text-torii shadow-xs shrink-0">
                      {item.char}
                    </div>

                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm sm:text-base font-kanji text-torii">
                          {item.hanViet || '—'}
                        </span>
                        <span className="hanko-stamp text-[9px] py-0.2 px-1.5">
                          JLPT {item.level}
                        </span>
                      </div>
                      <div className="text-xs opacity-75 truncate max-w-sm sm:max-w-md mt-0.5 font-medium">
                        {item.meaning}
                      </div>
                    </div>
                  </div>

                  {/* Right: Readings / Jump Indicator */}
                  <div className="flex items-center gap-2 text-right shrink-0">
                    <div className="hidden sm:block text-[11px] opacity-70">
                      {item.onReading && item.onReading !== '—' && (
                        <div>On: {item.onReading}</div>
                      )}
                      {item.kunReading && item.kunReading !== '—' && (
                        <div className="text-torii">Kun: {item.kunReading}</div>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-lg font-bold transition-all ${
                        isSelected
                          ? 'bg-torii text-white'
                          : 'opacity-40'
                      }`}
                    >
                      Nhảy tới ↵
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-washi/50 border-t border-washi-border flex items-center justify-between text-[11px] opacity-65 relative z-10">
          <div className="flex items-center gap-2">
            <span>⛩️</span>
            <span>Kho từ điển hơn 2,136 chữ Hán Thường Dùng (Jōyō Kanji)</span>
          </div>
          <div className="flex items-center gap-2">
            <span><kbd className="font-mono bg-black/10 dark:bg-white/10 px-1 rounded">↑↓</kbd> Di chuyển</span>
            <span><kbd className="font-mono bg-black/10 dark:bg-white/10 px-1 rounded">↵</kbd> Mở thẻ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
