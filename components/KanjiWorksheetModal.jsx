'use client';

import { useState, useMemo } from 'react';
import { getLocalKanjiInfo } from '../lib/kanjiService';
import { playWaterDrop, playWoodClapper } from '../lib/traditionalAudio';

export default function KanjiWorksheetModal({
  isOpen,
  onClose,
  kanjiList = [],
  currentLevel = 'N5',
  fullDb,
}) {
  const [selectedCount, setSelectedCount] = useState(8); // 8, 12, hoặc 16 chữ trên một phiếu

  const worksheetChars = useMemo(() => {
    return kanjiList.slice(0, selectedCount);
  }, [kanjiList, selectedCount]);

  const handlePrint = () => {
    playWoodClapper();
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl karuta-card border-2 border-border-strong shadow-2xl p-5 sm:p-7 flex flex-col gap-4 text-color-sumi relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="karuta-inner-border" />

        {/* Modal Header (Ẩn khi in ấn) */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border print:hidden relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-torii">📄</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg font-kanji text-torii">
                  PHIẾU TẬP VIẾT CHỮ HÁN Ô MỄ (PRINTABLE WORKSHEET)
                </h3>
                <span className="hanko-stamp text-[10px] py-0.5 px-2">
                  JLPT {currentLevel}
                </span>
              </div>
              <p className="text-xs opacity-70">
                Xuất file PDF hoặc in trực tiếp ra giấy A4 có kẻ ô mễ (米字格) để luyện viết bằng bút mực
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-torii hover:bg-torii-light text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>🖨️ In ra giấy / Lưu PDF</span>
            </button>
            <button
              onClick={() => {
                playWoodClapper();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-washi hover:bg-torii text-color-sumi hover:text-white flex items-center justify-center text-sm font-bold border border-washi-border transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tùy chọn số lượng chữ trên phiếu (Ẩn khi in ấn) */}
        <div className="w-full flex items-center justify-between bg-washi/70 p-2.5 rounded-2xl border border-washi-border text-xs print:hidden relative z-10">
          <span className="font-semibold opacity-75">Số lượng chữ trên trang:</span>
          <div className="flex items-center gap-2">
            {[6, 8, 12].map((cnt) => (
              <button
                key={cnt}
                onClick={() => {
                  playWaterDrop();
                  setSelectedCount(cnt);
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedCount === cnt
                    ? 'bg-torii text-white shadow-xs'
                    : 'bg-washi border border-washi-border opacity-70 hover:opacity-100'
                }`}
              >
                {cnt} Chữ
              </button>
            ))}
          </div>
        </div>

        {/* Printable A4 Paper Preview */}
        <div className="w-full bg-white text-black p-6 sm:p-8 rounded-2xl border border-border-strong shadow-inner font-serif select-text print:p-0 print:border-none print:shadow-none">
          {/* Paper Header */}
          <div className="border-b-2 border-black pb-3 mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-kanji tracking-wider text-black">
                日本語 漢字練習帳 • PHIẾU TẬP VIẾT CHỮ HÁN
              </h2>
              <div className="text-xs text-gray-700 mt-1">
                Cấp độ: <strong>JLPT {currentLevel}</strong> • Ngày luyện tập: {new Date().toLocaleDateString('vi-VN')}
              </div>
            </div>
            <div className="text-right text-xs text-gray-600">
              <div>Họ và tên: ............................................</div>
              <div className="mt-1">Điểm đánh giá: .......... / 100</div>
            </div>
          </div>

          {/* Practice Rows */}
          <div className="flex flex-col gap-3">
            {worksheetChars.map((char, rowIdx) => {
              const info = getLocalKanjiInfo(char, fullDb);

              return (
                <div
                  key={rowIdx}
                  className="flex items-center border border-gray-400 p-1.5 rounded-lg bg-gray-50/50 print:bg-transparent"
                >
                  {/* Left Column: Chữ mẫu & Thông tin */}
                  <div className="w-32 sm:w-40 border-r border-gray-400 pr-2 mr-2 flex items-center gap-2">
                    <div className="w-12 h-12 flex items-center justify-center text-3xl font-kanji font-black border border-red-700 text-red-700 rounded bg-red-50/40">
                      {char}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-xs text-black font-kanji truncate">
                        {info.hanViet}
                      </div>
                      <div className="text-[10px] text-gray-700 truncate">
                        {info.meaning}
                      </div>
                      <div className="text-[9px] text-gray-500 truncate">
                        On: {info.on || '—'}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Lưới ô Mễ (米字格) */}
                  <div className="flex-1 grid grid-cols-6 sm:grid-cols-8 gap-1.5">
                    {/* 2 Ô nét mờ để đồ nét (Tracing Cells) */}
                    {[0, 1].map((cIdx) => (
                      <div
                        key={`trace_${cIdx}`}
                        className="relative aspect-square border border-gray-400 flex items-center justify-center bg-white"
                      >
                        {/* Đường kẻ chữ mễ nét đứt */}
                        <div className="absolute inset-0 border-b border-gray-300 border-dashed top-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="absolute inset-0 border-r border-gray-300 border-dashed left-1/2 -translate-x-1/2 pointer-events-none" />
                        {/* Chữ mờ để đồ nét */}
                        <span className="font-kanji font-black text-2xl text-gray-300 select-none">
                          {char}
                        </span>
                      </div>
                    ))}

                    {/* Các ô trống để tự viết bằng tay */}
                    {[0, 1, 2, 3, 4, 5].map((bIdx) => (
                      <div
                        key={`blank_${bIdx}`}
                        className="relative aspect-square border border-gray-400 flex items-center justify-center bg-white"
                      >
                        {/* Đường kẻ chữ mễ nét đứt */}
                        <div className="absolute inset-0 border-b border-gray-200 border-dashed top-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="absolute inset-0 border-r border-gray-200 border-dashed left-1/2 -translate-x-1/2 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paper Footer */}
          <div className="mt-4 pt-2 border-t border-gray-400 text-[10px] text-gray-500 flex items-center justify-between">
            <span>⛩️ 漢字学習帳 (Kanji Gakushūchō) • Luyện viết chữ Hán mỗi ngày</span>
            <span>Trang 1 / 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
