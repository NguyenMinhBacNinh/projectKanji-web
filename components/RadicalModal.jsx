'use client';

import { useState, useMemo } from 'react';
import { playWaterDrop, playWoodClapper, playTempleBell } from '../lib/traditionalAudio';
import {
  RADICAL_DICT,
  CURATED_KANJI_BREAKDOWN,
  getKanjiDecomposition,
  getRadicalInfo,
  findKanjiSharingRadical,
} from '../lib/radicalData';

export default function RadicalModal({
  isOpen,
  onClose,
  currentChar,
  currentLevel,
  cardInfo,
  allKanjiList = [],
  fullDb = null,
  onSelectKanji,
  onOpenPracticeModal,
}) {
  const [activeTab, setActiveTab] = useState('kanji'); // 'kanji' (Chiết tự chữ hiện tại) | 'table' (Bảng 214 Bộ thủ)
  const [selectedRadicalDetail, setSelectedRadicalDetail] = useState(null);
  const [radicalSearchQuery, setRadicalSearchQuery] = useState('');
  const [selectedStrokeFilter, setSelectedStrokeFilter] = useState(0); // 0 = all

  // Bóc tách chiết tự cho chữ Kanji hiện tại
  const decomposition = useMemo(() => {
    if (!currentChar) return null;
    const dbItem = (fullDb && fullDb[currentChar]) ? fullDb[currentChar] : null;
    const mergedCardInfo = dbItem ? { ...dbItem, ...cardInfo } : cardInfo;
    return getKanjiDecomposition(currentChar, mergedCardInfo, fullDb);
  }, [currentChar, cardInfo, fullDb]);

  // Tìm các chữ khác cùng chia sẻ bộ thủ chính
  const relatedKanji = useMemo(() => {
    if (!decomposition || !decomposition.primaryRadical) return [];
    return findKanjiSharingRadical(
      decomposition.primaryRadical.char,
      allKanjiList,
      14
    );
  }, [decomposition, allKanjiList]);

  // Danh sách 214 bộ thủ có lọc tìm kiếm
  const filteredRadicals = useMemo(() => {
    const query = radicalSearchQuery.toLowerCase().trim();
    return Object.entries(RADICAL_DICT).filter(([char, info]) => {
      // Lọc theo số nét nếu chọn
      if (selectedStrokeFilter > 0 && info.strokes !== selectedStrokeFilter) {
        return false;
      }
      if (!query) return true;
      return (
        char.includes(query) ||
        info.name.toLowerCase().includes(query) ||
        info.meaning.toLowerCase().includes(query) ||
        (info.jp && info.jp.toLowerCase().includes(query))
      );
    });
  }, [radicalSearchQuery, selectedStrokeFilter]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border-[2.5px] border-stone-900 dark:border-white shadow-manga-xl p-5 md:p-6 flex flex-col gap-4 bg-white dark:bg-stone-900 text-stone-950 dark:text-white relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b-2 border-stone-900 dark:border-white relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl font-kanji font-black text-akira dark:text-red-400 leading-none">{currentChar}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg">{cardInfo?.hanViet || 'HÁN TỰ'}</span>
                <span className="px-2 py-0.5 rounded-lg border-2 border-stone-900 dark:border-white bg-manga-yellow text-stone-950 text-[10px] font-black shadow-2xs">JLPT {currentLevel}</span>
                {decomposition?.primaryRadical && (
                  <span className="px-2 py-0.5 rounded-lg border-2 border-stone-900 dark:border-white bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-[10px] font-black font-mono shadow-2xs">
                    {decomposition.primaryRadical.name.startsWith('Bộ') ? decomposition.primaryRadical.name : `Bộ ${decomposition.primaryRadical.name}`} ({decomposition.primaryRadical.char})
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-stone-600 dark:text-stone-300 block truncate max-w-xs mt-0.5">{cardInfo?.meaning}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenPracticeModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPracticeModal();
                }}
                className="px-2.5 py-1 rounded-xl bg-manga-yellow hover:bg-yellow-300 text-stone-950 border-2 border-stone-900 dark:border-white font-black text-xs transition-all flex items-center gap-1 shadow-2xs active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                title="Tập viết & Thứ tự nét bút (Phím W)"
              >
                <span>✍️</span>
                <span className="hidden sm:inline">Tập viết</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl border-2 border-stone-900 dark:border-white bg-white dark:bg-stone-800 hover:bg-akira hover:text-white text-stone-900 dark:text-stone-100 font-black text-sm flex items-center justify-center transition-all cursor-pointer shadow-2xs active:translate-x-0.5 active:translate-y-0.5"
              title="Đóng (Phím Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Switcher: Chiết tự chữ này / Khám phá 214 Bộ thủ */}
        <div className="w-full flex items-center justify-center p-1 rounded-2xl bg-stone-100 dark:bg-stone-800 border-2 border-stone-900 dark:border-white gap-1 relative z-10 shadow-2xs">
          <button
            onClick={() => {
              playWaterDrop();
              setActiveTab('kanji');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-1.5 border-2 ${
              activeTab === 'kanji'
                ? 'bg-akira text-white border-stone-900 dark:border-white shadow-manga-sm -translate-y-0.5'
                : 'border-transparent text-stone-800 dark:text-stone-200 hover:bg-manga-yellow hover:text-stone-950'
            }`}
          >
            <span>🧩</span>
            <span>Chiết tự chữ 「{currentChar}」</span>
          </button>

          <button
            onClick={() => {
              playWaterDrop();
              setActiveTab('table');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-1.5 border-2 ${
              activeTab === 'table'
                ? 'bg-akira text-white border-stone-900 dark:border-white shadow-manga-sm -translate-y-0.5'
                : 'border-transparent text-stone-800 dark:text-stone-200 hover:bg-manga-yellow hover:text-stone-950'
            }`}
          >
            <span>📖</span>
            <span>Từ điển 214 Bộ thủ Khang Hi</span>
          </button>
        </div>

        {/* TAB 1: CHIẾT TỰ & BÓC TÁCH BỘ THỦ CHỮ HIỆN TẠI */}
        {activeTab === 'kanji' && decomposition && (
          <div className="flex flex-col gap-4 relative z-10">
            {/* Phương trình chiết tự (Equation Banner) */}
            <div className="w-full bg-yellow-50 dark:bg-stone-850 p-3.5 rounded-2xl border-2 border-stone-900 dark:border-white shadow-manga-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-akira dark:text-rose-400 block mb-1">
                  Cấu tạo thành phần
                </span>
                <div className="text-base sm:text-lg font-black font-kanji flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                  {decomposition.components.map((comp, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-white text-stone-950 dark:text-white shadow-2xs font-black text-sm">
                        <span className="text-akira dark:text-rose-400">{comp.char}</span> <span className="text-xs font-bold opacity-80">({comp.name.replace(/^Bộ\s+/, '')})</span>
                      </span>
                      {idx < decomposition.components.length - 1 && (
                        <span className="text-xs font-black text-stone-900 dark:text-white">+</span>
                      )}
                    </span>
                  ))}
                  <span className="text-xs font-black text-stone-900 dark:text-white">➔</span>
                  <span className="px-2.5 py-1 rounded-xl bg-akira text-white font-black text-sm border-2 border-stone-900 dark:border-white shadow-2xs">
                    {currentChar} {cardInfo?.hanViet ? `(${cardInfo.hanViet})` : ''}
                  </span>
                </div>
              </div>

              {decomposition.primaryRadical && (
                <div className="shrink-0 text-center sm:text-right px-3 py-1.5 rounded-xl bg-manga-yellow border-2 border-stone-900 dark:border-white text-stone-950 shadow-2xs">
                  <span className="text-[10px] uppercase font-black opacity-80 block">Bộ thủ chính</span>
                  <span className="text-xs font-black font-kanji">
                    {decomposition.primaryRadical.char} • {decomposition.primaryRadical.name.startsWith('Bộ') ? decomposition.primaryRadical.name : `Bộ ${decomposition.primaryRadical.name}`}
                  </span>
                </div>
              )}
            </div>

            {/* Danh sách các bộ thủ thành phần chi tiết */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <span>🔍</span>
                <span>Phân tích từng bộ thủ cấu thành ({decomposition.components.length} bộ):</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {decomposition.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white dark:bg-stone-850 border-2 border-stone-900 dark:border-white hover:border-akira dark:hover:border-rose-400 hover:bg-yellow-100/70 dark:hover:bg-stone-800 shadow-manga-sm transition-colors flex items-start gap-3"
                  >
                    {/* Chữ bộ thủ to */}
                    <div className="w-12 h-12 rounded-xl bg-manga-yellow border-2 border-stone-900 dark:border-white flex items-center justify-center font-kanji font-black text-2xl text-stone-950 shrink-0 shadow-2xs">
                      {comp.char}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-black text-sm truncate text-stone-950 dark:text-white">
                          {comp.name.startsWith('Bộ') ? comp.name : `Bộ ${comp.name}`}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-lg border border-stone-900 dark:border-white bg-stone-100 dark:bg-stone-800 font-black text-stone-900 dark:text-stone-200">
                          {comp.strokes} nét
                        </span>
                      </div>

                      {comp.jp && (
                        <span className="text-[11px] text-akira dark:text-rose-400 font-bold block font-kanji">
                          Kana: {comp.jp}
                        </span>
                      )}

                      <p className="text-xs text-stone-700 dark:text-stone-300 font-bold mt-0.5 leading-snug line-clamp-2">
                        {comp.meaning}
                      </p>

                      <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold block mt-1">
                        Vị trí: {comp.pos}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Câu chuyện chiết tự ghi nhớ sinh động (Mnemonic Story) */}
            <div className="p-4 rounded-2xl bg-yellow-100 dark:bg-stone-800 border-2 border-stone-900 dark:border-white shadow-manga-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-black text-akira dark:text-rose-400 uppercase tracking-wide">
                <span>💡</span>
                <span>Câu chuyện chiết tự ghi nhớ (Mnemonic Story)</span>
              </div>
              <p className="text-xs md:text-sm font-bold leading-relaxed text-stone-900 dark:text-stone-100">
                {decomposition.mnemonic}
              </p>
            </div>

            {/* Các chữ Kanji khác cùng chia sẻ bộ thủ này */}
            {relatedKanji.length > 0 && (
              <div className="flex flex-col gap-2 pt-2 border-t border-washi-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold opacity-80 flex items-center gap-1.5">
                    <span>🔗</span>
                    <span>
                      Các chữ Hán khác cùng mang bộ {decomposition.primaryRadical.name} (
                      {decomposition.primaryRadical.char}):
                    </span>
                  </span>
                  <span className="text-[11px] opacity-60">
                    Bấm để chuyển sang học chữ đó
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto py-1 px-0.5">
                  {relatedKanji.map((relatedChar) => (
                    <button
                      key={relatedChar}
                      onClick={() => {
                        playWoodClapper();
                        if (onSelectKanji) {
                          onSelectKanji(relatedChar);
                          onClose();
                        }
                      }}
                      className="min-w-[42px] h-11 px-2 rounded-xl bg-washi hover:bg-torii hover:text-white border border-washi-border hover:border-torii font-kanji font-bold text-lg flex flex-col items-center justify-center transition-colors shadow-xs active:translate-x-0.5 active:translate-y-0.5 group"
                      title={`Học chữ ${relatedChar}`}
                    >
                      <span>{relatedChar}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TỪ ĐIỂN TRA CỨU 214 BỘ THỦ KHANG HI */}
        {activeTab === 'table' && (
          <div className="flex flex-col gap-3 relative z-10">
            {/* Bộ lọc & Ô tìm kiếm */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={radicalSearchQuery}
                  onChange={(e) => setRadicalSearchQuery(e.target.value)}
                  placeholder="Tìm bộ thủ theo tên (Nhân, Mộc, Thủy...), nghĩa hoặc ký tự..."
                  className="w-full py-2 pl-8 pr-8 rounded-xl bg-white dark:bg-stone-850 border-2 border-stone-900 dark:border-white text-xs font-bold text-stone-950 dark:text-white focus:outline-none focus:bg-yellow-50 dark:focus:bg-stone-800 shadow-2xs transition-colors"
                />
                <span className="absolute left-2.5 top-2.5 text-xs opacity-70">🔍</span>
                {radicalSearchQuery && (
                  <button
                    onClick={() => setRadicalSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-xs font-black opacity-70 hover:opacity-100"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Lọc theo số nét */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                <span className="text-[11px] font-black text-stone-700 dark:text-stone-300 shrink-0">Nét:</span>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStrokeFilter(st)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-black border-2 border-stone-900 dark:border-white shrink-0 transition-all cursor-pointer ${
                      selectedStrokeFilter === st
                        ? 'bg-akira text-white shadow-manga-sm -translate-y-0.5'
                        : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-2xs hover:bg-manga-yellow hover:text-stone-950'
                    }`}
                  >
                    {st === 0 ? 'Tất cả' : `${st} nét`}
                  </button>
                ))}
              </div>
            </div>

            {/* Chi tiết bộ thủ đang chọn xem kỹ (nếu có bấm vào) */}
            {selectedRadicalDetail && (
              <div className="p-3.5 rounded-2xl bg-yellow-100 dark:bg-stone-800 border-2 border-stone-900 dark:border-white shadow-manga-sm flex items-start justify-between gap-3 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <span className="text-3xl font-kanji font-black text-akira dark:text-rose-400">
                    {selectedRadicalDetail.char}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-stone-950 dark:text-white">
                        Bộ {selectedRadicalDetail.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-lg border border-stone-900 dark:border-white bg-akira text-white font-black">
                        {selectedRadicalDetail.strokes} nét
                      </span>
                      {selectedRadicalDetail.jp && (
                        <span className="text-[11px] font-bold text-akira dark:text-rose-400 font-kanji">
                          Kana: {selectedRadicalDetail.jp}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-800 dark:text-stone-200 mt-1 font-bold">
                      Ý nghĩa: {selectedRadicalDetail.meaning}
                    </p>
                    <span className="text-[10px] text-stone-600 dark:text-stone-400 font-bold block mt-0.5">
                      Vị trí thường gặp: {selectedRadicalDetail.pos}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRadicalDetail(null)}
                  className="w-6 h-6 rounded-lg border border-stone-900 dark:border-white bg-white dark:bg-stone-700 text-stone-900 dark:text-white text-xs font-black flex items-center justify-center hover:bg-akira hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Lưới danh sách 214 Bộ thủ */}
            <div className="max-h-[50vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {filteredRadicals.map(([char, info]) => {
                  const isSelected = selectedRadicalDetail?.char === char;
                  return (
                    <button
                      key={char}
                      onClick={() => {
                        playWaterDrop();
                        setSelectedRadicalDetail({ char, ...info });
                      }}
                      className={`p-2.5 rounded-xl border-2 border-stone-900 dark:border-white text-left transition-colors flex items-start gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-akira text-white shadow-manga-sm'
                          : 'bg-white dark:bg-stone-850 text-stone-950 dark:text-white shadow-2xs hover:bg-yellow-50 dark:hover:bg-stone-800 hover:border-akira active:translate-x-0.5 active:translate-y-0.5'
                      }`}
                    >
                      <span className={`text-2xl font-kanji font-black shrink-0 leading-none ${isSelected ? 'text-white' : 'text-akira dark:text-rose-400'}`}>
                        {char}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs truncate">{info.name}</span>
                          <span className={`text-[9px] font-bold ${isSelected ? 'text-white/80' : 'text-stone-500 dark:text-stone-400'}`}>{info.strokes}n</span>
                        </div>
                        <span className={`text-[10px] font-bold block truncate mt-0.5 ${isSelected ? 'text-white/90' : 'text-stone-600 dark:text-stone-300'}`}>
                          {info.meaning}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredRadicals.length === 0 && (
                <div className="py-8 text-center text-xs font-bold text-stone-500">
                  Không tìm thấy bộ thủ nào phù hợp với từ khóa &ldquo;{radicalSearchQuery}&rdquo;.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
