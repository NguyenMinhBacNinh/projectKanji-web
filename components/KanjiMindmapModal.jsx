'use client';

import { useMemo } from 'react';
import { playJapaneseSpeech } from '../lib/kanjiService';
import { playWaterDrop, playWoodClapper } from '../lib/traditionalAudio';

export default function KanjiMindmapModal({
  isOpen,
  onClose,
  currentChar,
  currentLevel,
  cardInfo,
}) {
  // Chuẩn bị danh sách từ ghép vệ tinh
  const compounds = useMemo(() => {
    if (!cardInfo?.vocab || cardInfo.vocab.length === 0) return [];

    return cardInfo.vocab.slice(0, 8).map((v, i) => {
      const word = v.word || v.jp?.replace(/<[^>]+>/g, '') || currentChar;
      const reading = v.reading || '';
      const meaning = v.meaning_vi || v.vn || '';

      // Vị trí chữ Kanji trong từ: Tiền tố (đứng đầu), Hậu tố (đứng cuối), hay ở giữa
      let positionTag = 'Từ ghép';
      if (word.startsWith(currentChar)) positionTag = 'Đứng đầu';
      else if (word.endsWith(currentChar)) positionTag = 'Đứng sau';

      return {
        word,
        reading,
        meaning,
        positionTag,
      };
    });
  }, [cardInfo, currentChar]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl karuta-card border-2 border-border-strong shadow-2xl p-5 sm:p-7 flex flex-col gap-5 text-color-sumi relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="karuta-inner-border" />

        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-torii">🕸️</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg font-kanji text-torii">
                  SƠ ĐỒ TƯ DUY TỪ GHÉP (KANJI MINDMAP)
                </h3>
                <span className="hanko-stamp text-[10px] py-0.5 px-2">
                  JLPT {currentLevel}
                </span>
              </div>
              <p className="text-xs opacity-70">
                Khám phá mạng lưới các từ vựng ghép xoay quanh chữ 「{currentChar}」 ({cardInfo?.hanViet})
              </p>
            </div>
          </div>

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

        {/* Mindmap Visualization Hub */}
        <div className="w-full py-4 relative z-10 flex flex-col items-center">
          {/* Central Kanji Sun Hub */}
          <div
            onClick={() => {
              playWaterDrop();
              playJapaneseSpeech(currentChar);
            }}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-torii to-torii-dark text-white flex flex-col items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all relative group ring-4 ring-torii/20"
          >
            <span className="text-4xl sm:text-5xl font-kanji font-black leading-none drop-shadow-sm">
              {currentChar}
            </span>
            <span className="text-xs font-extrabold tracking-wider mt-1 opacity-95">
              {cardInfo?.hanViet || '—'}
            </span>
            <span className="text-[10px] opacity-80 uppercase tracking-widest mt-0.5">
              🔊 Nghe chữ
            </span>
          </div>

          <div className="text-[11px] opacity-60 font-medium mt-3 text-center">
            Nhấp vào từng quả bóng từ vựng bên dưới để nghe cách đọc và xem giải nghĩa chi tiết:
          </div>
        </div>

        {/* Orbiting Satellite Vocabulary Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
          {compounds.map((comp, idx) => (
            <div
              key={idx}
              onClick={() => {
                playWaterDrop();
                playJapaneseSpeech(comp.word || comp.reading || currentChar);
              }}
              className="bg-washi/80 hover:bg-torii/10 p-3.5 rounded-2xl border border-washi-border hover:border-torii transition-all cursor-pointer group flex flex-col justify-between shadow-xs active:scale-98"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-bold opacity-75 text-[10px]">
                  {comp.positionTag}
                </span>
                <span className="text-xs opacity-60 group-hover:text-torii group-hover:opacity-100 transition-colors">
                  🔊
                </span>
              </div>

              <div className="my-2">
                <div className="text-xl sm:text-2xl font-kanji font-black text-torii group-hover:scale-105 origin-left transition-transform">
                  {comp.word}
                </div>
                <div className="text-xs font-bold text-color-sumi/80 font-kanji mt-0.5">
                  {comp.reading}
                </div>
              </div>

              <div className="text-xs opacity-75 border-t border-washi-border/60 pt-1.5 line-clamp-2">
                {comp.meaning}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-washi-border flex items-center justify-between text-[11px] opacity-65 relative z-10">
          <span>💡 Mẹo: Nhớ từ ghép theo cụm giúp hiểu sâu sắc âm On và âm Kun</span>
          <button
            onClick={() => {
              playWoodClapper();
              onClose();
            }}
            className="text-torii font-bold hover:underline"
          >
            Đóng sơ đồ ✕
          </button>
        </div>
      </div>
    </div>
  );
}
