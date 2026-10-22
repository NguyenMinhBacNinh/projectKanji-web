'use client';

import { playWaterDrop, playWoodClapper } from '../lib/traditionalAudio';
import { playJapaneseSpeech } from '../lib/kanjiService';
import { VolumeIcon } from './ZenIcons';

export default function KanjiExampleModal({
  isOpen,
  onClose,
  currentChar,
  currentLevel,
  cardInfo,
}) {
  if (!isOpen) return null;

  const cleanSentence =
    cardInfo?.example?.sentence ||
    cardInfo?.exampleJp?.replace(/<[^>]+>/g, '') ||
    currentChar;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] rounded-3xl border-[2.5px] border-stone-900 dark:border-white shadow-manga-xl p-5 sm:p-6 flex flex-col gap-4 bg-white dark:bg-stone-900 text-stone-950 dark:text-white relative z-10 overflow-hidden"
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
                  Câu ví dụ thực tế 「{currentChar}」
                </span>
                <span className="px-2 py-0.5 rounded-lg border-2 border-stone-900 dark:border-white bg-manga-yellow text-stone-950 text-[10px] font-black shadow-2xs">
                  JLPT {currentLevel}
                </span>
              </div>
              <p className="text-xs font-bold text-stone-600 dark:text-stone-300 mt-0.5">
                Ứng dụng chữ Hán trong văn cảnh giao tiếp và đề thi
              </p>
            </div>
          </div>

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

        {/* Example Content */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
          {cardInfo?.exampleJp ? (
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border-2 border-stone-900 dark:border-white shadow-manga-sm flex flex-col gap-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-akira dark:text-rose-400 flex items-center gap-1.5">
                  <span>📜</span>
                  <span>Câu tiếng Nhật:</span>
                </span>

                <button
                  onClick={() => {
                    playWaterDrop();
                    playJapaneseSpeech(cleanSentence);
                  }}
                  className="px-3 py-1 rounded-xl bg-manga-yellow hover:bg-yellow-300 text-stone-950 border-2 border-stone-900 dark:border-white shadow-2xs font-black text-xs flex items-center gap-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  title="Nghe phát âm toàn câu"
                >
                  <VolumeIcon className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>

              <div
                className="font-kanji text-lg sm:text-xl font-black leading-relaxed text-stone-950 dark:text-white"
                dangerouslySetInnerHTML={{
                  __html:
                    cardInfo.exampleJp.includes(currentChar) &&
                    !cardInfo.exampleJp.includes('text-akira')
                      ? cardInfo.exampleJp.replace(
                          new RegExp(currentChar, 'g'),
                          `<span class="text-akira dark:text-rose-400 font-black underline decoration-akira decoration-2">${currentChar}</span>`
                        )
                      : cardInfo.exampleJp,
                }}
              />

              {cardInfo.example?.reading && (
                <div className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-akira dark:text-rose-400 font-kanji font-bold">
                  {cardInfo.example.reading}
                </div>
              )}

              <div className="pt-2 border-t-2 border-stone-200 dark:border-stone-700">
                <span className="text-[11px] font-black uppercase text-stone-500 dark:text-stone-400 block mb-1">
                  Dịch nghĩa tiếng Việt:
                </span>
                <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 font-bold leading-relaxed">
                  {cardInfo.exampleVn || cardInfo.example?.translation || 'Chưa có bản dịch cho câu này.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center flex flex-col items-center justify-center gap-2">
              <span className="text-3xl">📝</span>
              <p className="text-sm font-bold text-stone-500 dark:text-stone-400">
                Chưa có câu ví dụ riêng cho chữ này.
              </p>
            </div>
          )}

          {/* Voice Tip */}
          <div className="p-3.5 rounded-2xl bg-yellow-100 dark:bg-stone-800 border-2 border-stone-900 dark:border-white shadow-2xs text-xs text-stone-850 dark:text-stone-100 font-bold leading-relaxed">
            🎙️ <strong>Luyện phản xạ:</strong> Bấm nghe câu mẫu nhiều lần và đọc to theo nhịp điệu để nắm bắt ngữ điệu chuẩn Tokyo.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t-2 border-stone-900 dark:border-white flex items-center justify-between text-xs font-black text-stone-600 dark:text-stone-400 shrink-0">
          <span className="text-stone-600 dark:text-stone-400">
            Giọng phát âm AI tiếng Nhật chuẩn
          </span>
          <kbd className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-mono text-[10px]">
            ESC đóng
          </kbd>
        </div>
      </div>
    </div>
  );
}
