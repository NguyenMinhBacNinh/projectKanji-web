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
    return getKanjiDecomposition(currentChar);
  }, [currentChar]);

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
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl karuta-card border-2 border-border-strong shadow-2xl p-5 md:p-6 flex flex-col gap-4 text-color-sumi relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Viền đôi phong cách Nhật */}
        <div className="karuta-inner-border" />

        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-kanji font-black text-torii">{currentChar}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base">{cardInfo?.hanViet || 'HÁN TỰ'}</span>
                <span className="hanko-stamp text-[10px] py-0.5 px-2">JLPT {currentLevel}</span>
                {decomposition?.primaryRadical && (
                  <span className="px-2 py-0.5 rounded-full bg-torii/10 text-torii font-bold text-xs border border-torii/30">
                    Bộ {decomposition.primaryRadical.name} ({decomposition.primaryRadical.char})
                  </span>
                )}
              </div>
              <span className="text-xs opacity-70 block truncate max-w-xs">{cardInfo?.meaning}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenPracticeModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPracticeModal();
                }}
                className="px-2.5 py-1 rounded-xl bg-washi hover:bg-torii hover:text-white border border-torii/30 text-torii font-bold text-xs transition-all flex items-center gap-1 active:scale-95"
                title="Tập viết & Thứ tự nét bút (Phím W)"
              >
                <span>✍️</span>
                <span className="hidden sm:inline">Tập viết</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-washi hover:bg-torii hover:text-white flex items-center justify-center font-bold text-sm transition-all border border-washi-border active:scale-95"
              title="Đóng (Phím Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Switcher: Chiết tự chữ này / Khám phá 214 Bộ thủ */}
        <div className="w-full flex items-center justify-center p-1 rounded-2xl bg-washi border border-washi-border gap-1 relative z-10">
          <button
            onClick={() => {
              playWaterDrop();
              setActiveTab('kanji');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'kanji'
                ? 'bg-torii text-white shadow-sm'
                : 'opacity-70 hover:opacity-100 hover:bg-torii/10'
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
            className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'table'
                ? 'bg-torii text-white shadow-sm'
                : 'opacity-70 hover:opacity-100 hover:bg-torii/10'
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
            <div className="w-full bg-gradient-to-r from-red-500/10 via-amber-500/10 to-red-500/10 p-3.5 rounded-2xl border border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-torii block opacity-80">
                  Cấu tạo thành phần
                </span>
                <div className="text-base sm:text-lg font-black font-kanji mt-0.5 flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                  {decomposition.components.map((comp, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-xl bg-washi border border-torii/30 text-torii shadow-xs font-bold text-sm">
                        {comp.char} <span className="text-xs font-semibold opacity-80">({comp.name})</span>
                      </span>
                      {idx < decomposition.components.length - 1 && (
                        <span className="text-xs opacity-50 font-bold">+</span>
                      )}
                    </span>
                  ))}
                  <span className="text-xs opacity-50 font-bold">➔</span>
                  <span className="px-2.5 py-1 rounded-xl bg-torii text-white font-black text-sm shadow-sm">
                    {currentChar} ({cardInfo?.hanViet || ''})
                  </span>
                </div>
              </div>

              {decomposition.primaryRadical && (
                <div className="shrink-0 text-center sm:text-right px-3 py-1.5 rounded-xl bg-washi/80 border border-washi-border">
                  <span className="text-[10px] uppercase font-bold opacity-60 block">Bộ thủ chính</span>
                  <span className="text-xs font-bold text-torii font-kanji">
                    {decomposition.primaryRadical.char} • {decomposition.primaryRadical.name}
                  </span>
                </div>
              )}
            </div>

            {/* Danh sách các bộ thủ thành phần chi tiết */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold opacity-80 flex items-center gap-1.5">
                <span>🔍</span>
                <span>Phân tích từng bộ thủ cấu thành ({decomposition.components.length} bộ):</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {decomposition.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-washi/80 border border-washi-border hover:border-torii/40 transition-all flex items-start gap-3 shadow-xs hover:shadow-sm"
                  >
                    {/* Chữ bộ thủ to */}
                    <div className="w-12 h-12 rounded-xl bg-torii/10 border border-torii/25 flex items-center justify-center font-kanji font-black text-2xl text-torii shrink-0 shadow-inner">
                      {comp.char}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-extrabold text-sm truncate">Bộ {comp.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-bold opacity-70">
                          {comp.strokes} nét
                        </span>
                      </div>

                      {comp.jp && (
                        <span className="text-[11px] text-torii font-semibold block font-kanji">
                          Kana: {comp.jp}
                        </span>
                      )}

                      <p className="text-xs opacity-75 mt-0.5 leading-snug line-clamp-2">
                        {comp.meaning}
                      </p>

                      <span className="text-[10px] opacity-60 block mt-1">
                        Vị trí: {comp.pos}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Câu chuyện chiết tự ghi nhớ sinh động (Mnemonic Story) */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fffdfa] to-[#f9f4ec] dark:from-[#1e2736] dark:to-[#171f2d] border-2 border-torii/30 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-black text-torii uppercase tracking-wide">
                <span>💡</span>
                <span>Câu chuyện chiết tự ghi nhớ (Mnemonic Story)</span>
              </div>
              <p className="text-xs md:text-sm font-medium leading-relaxed opacity-90 pl-1">
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
                      className="min-w-[42px] h-11 px-2 rounded-xl bg-washi hover:bg-torii hover:text-white border border-washi-border hover:border-torii font-kanji font-bold text-lg flex flex-col items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95 group"
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
                  className="w-full py-2 pl-8 pr-3 rounded-xl bg-washi border border-washi-border text-xs font-medium focus:outline-none focus:border-torii"
                />
                <span className="absolute left-2.5 top-2.5 text-xs opacity-50">🔍</span>
                {radicalSearchQuery && (
                  <button
                    onClick={() => setRadicalSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-xs opacity-50 hover:opacity-100"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Lọc theo số nét */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                <span className="text-[11px] font-bold opacity-60 shrink-0">Nét:</span>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStrokeFilter(st)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold border shrink-0 transition-all ${
                      selectedStrokeFilter === st
                        ? 'bg-torii text-white border-torii'
                        : 'bg-washi border-washi-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    {st === 0 ? 'Tất cả' : `${st} nét`}
                  </button>
                ))}
              </div>
            </div>

            {/* Chi tiết bộ thủ đang chọn xem kỹ (nếu có bấm vào) */}
            {selectedRadicalDetail && (
              <div className="p-3.5 rounded-2xl bg-torii/10 border border-torii/30 flex items-start justify-between gap-3 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <span className="text-3xl font-kanji font-black text-torii">
                    {selectedRadicalDetail.char}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-torii">
                        Bộ {selectedRadicalDetail.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-torii/20 text-torii font-bold">
                        {selectedRadicalDetail.strokes} nét
                      </span>
                      {selectedRadicalDetail.jp && (
                        <span className="text-[11px] font-semibold opacity-75 font-kanji">
                          Kana: {selectedRadicalDetail.jp}
                        </span>
                      )}
                    </div>
                    <p className="text-xs opacity-85 mt-1 font-medium">
                      Ý nghĩa: {selectedRadicalDetail.meaning}
                    </p>
                    <span className="text-[10px] opacity-65 block mt-0.5">
                      Vị trí thường gặp: {selectedRadicalDetail.pos}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRadicalDetail(null)}
                  className="text-xs opacity-50 hover:opacity-100 font-bold px-1.5 py-0.5"
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
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 active:scale-95 ${
                        isSelected
                          ? 'bg-torii/15 border-torii shadow-xs'
                          : 'bg-washi/70 border-washi-border hover:border-torii/40 hover:bg-washi'
                      }`}
                    >
                      <span className="text-2xl font-kanji font-black text-torii shrink-0 leading-none">
                        {char}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs truncate">{info.name}</span>
                          <span className="text-[9px] opacity-60">{info.strokes}n</span>
                        </div>
                        <span className="text-[10px] opacity-70 block truncate mt-0.5">
                          {info.meaning}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredRadicals.length === 0 && (
                <div className="py-8 text-center text-xs opacity-60">
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
