'use client';

import { useState } from 'react';
import { playWaterDrop, playWoodClapper } from '../lib/traditionalAudio';
import { playJapaneseSpeech } from '../lib/kanjiService';
import { VolumeIcon } from './ZenIcons';

export default function KanjiVocabModal({
  isOpen,
  onClose,
  currentChar,
  currentLevel,
  cardInfo,
}) {
  const [showFurigana, setShowFurigana] = useState(true);

  if (!isOpen) return null;

  const vocabList = cardInfo?.vocab || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] rounded-3xl border-[2.5px] border-stone-900 dark:border-white shadow-manga-xl p-5 sm:p-6 flex flex-col gap-4 bg-white dark:bg-stone-900 text-stone-950 dark:text-white relative z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b-2 border-stone-900 dark:border-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl font-kanji font-black text-akira dark:text-red-400 leading-none">
              {currentChar}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg">
                  Từ ghép JLPT với 「{currentChar}」
                </span>
                <span className="px-2 py-0.5 rounded-lg border-2 border-stone-900 dark:border-white bg-manga-yellow text-stone-950 text-[10px] font-black shadow-2xs">
                  JLPT {currentLevel}
                </span>
                <span className="px-2 py-0.5 rounded-lg border-2 border-stone-900 dark:border-white bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-[10px] font-black font-mono shadow-2xs">
                  {vocabList.length} từ
                </span>
              </div>
              <p className="text-xs font-bold text-stone-600 dark:text-stone-300 mt-0.5">
                Các từ vựng thông dụng hay xuất hiện trong đề thi JLPT
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playWaterDrop();
                setShowFurigana(!showFurigana);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 border-stone-900 dark:border-white shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${
                showFurigana
                  ? 'bg-akira text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
              title="Bật/Tắt Furigana"
            >
              <span className="font-kanji">あ</span>
              <span className="hidden sm:inline">Furigana</span>
            </button>

            <button
              onClick={() => {
                playWoodClapper();
                onClose();
              }}
              className="w-8 h-8 rounded-xl border-2 border-stone-900 dark:border-white bg-white dark:bg-stone-800 hover:bg-akira hover:text-white text-stone-900 dark:text-stone-100 font-black text-sm flex items-center justify-center transition-all cursor-pointer shadow-2xs active:translate-x-0.5 active:translate-y-0.5"
              title="Đóng (Phím Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Vocab List Grid */}
        <div className="flex-1 overflow-y-auto pr-1">
          {vocabList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
              {vocabList.map((v, i) => (
                <div
                  key={i}
                  onClick={() => {
                    playWaterDrop();
                    playJapaneseSpeech(v.word || v.reading || currentChar);
                  }}
                  className="p-3.5 rounded-2xl border-2 border-stone-900 dark:border-white bg-stone-50 dark:bg-stone-850 hover:border-akira dark:hover:border-rose-400 hover:bg-yellow-100/70 dark:hover:bg-stone-800 shadow-manga-sm transition-colors flex flex-col justify-between text-left group cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-kanji text-lg sm:text-xl font-black text-stone-950 dark:text-white group-hover:text-akira dark:group-hover:text-rose-400 transition-colors leading-snug">
                      {showFurigana ? (
                        <ruby className="ruby-furigana">
                          {v.word}
                          <rt className="ruby-rt text-akira font-black text-xs">{v.reading}</rt>
                        </ruby>
                      ) : (
                        v.word
                      )}
                    </div>

                    <div
                      className="w-7 h-7 rounded-xl border-2 border-stone-900 dark:border-white bg-manga-yellow text-stone-950 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-yellow-300 transition-colors"
                      title="Chạm để nghe phát âm"
                    >
                      <VolumeIcon className="w-3.5 h-3.5 text-stone-950" />
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 leading-snug mt-2 pt-1.5 border-t border-stone-200 dark:border-stone-700">
                    {v.meaning_vi || v.vn || 'Đang cập nhật...'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center flex flex-col items-center justify-center gap-2">
              <span className="text-3xl">🎋</span>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400">
                Chưa có danh sách từ ghép riêng cho chữ này.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t-2 border-stone-900 dark:border-white flex items-center justify-between text-xs font-black text-stone-600 dark:text-stone-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-akira" />
            <span>Chạm vào từng từ để nghe giọng Tokyo bản ngữ</span>
          </span>
          <kbd className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-mono text-[10px]">
            ESC đóng
          </kbd>
        </div>
      </div>
    </div>
  );
}
