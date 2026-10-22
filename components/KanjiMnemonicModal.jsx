'use client';

import { playWoodClapper } from '../lib/traditionalAudio';
import KanjiIllustrationBox from './KanjiIllustrationBox';

export default function KanjiMnemonicModal({
  isOpen,
  onClose,
  currentChar,
  currentLevel,
  cardInfo,
}) {
  if (!isOpen) return null;

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
                  Mẹo ghi nhớ tượng hình 「{cardInfo?.hanViet || currentChar}」
                </span>
                <span className="px-2 py-0.5 rounded-lg border-2 border-stone-900 dark:border-white bg-manga-yellow text-stone-950 text-[10px] font-black shadow-2xs">
                  JLPT {currentLevel}
                </span>
              </div>
              <p className="text-xs font-bold text-stone-600 dark:text-stone-300 mt-0.5">
                Kỹ thuật ghi nhớ liên tưởng qua hình ảnh và trực giác
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

        {/* Mnemonic Content */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
          {/* Tranh minh họa tượng hình */}
          <div className="w-full">
            <KanjiIllustrationBox currentChar={currentChar} cardInfo={cardInfo} variant="back" />
          </div>

          {/* Câu chuyện ghi nhớ */}
          <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-stone-850 border-2 border-stone-900 dark:border-white shadow-manga-sm">
            <div className="flex items-center gap-2 mb-2 text-akira dark:text-rose-400 font-black text-sm uppercase tracking-wide">
              <span>💡</span>
              <span>Ý nghĩa và nguồn gốc hình thành:</span>
            </div>
            <p className="text-sm font-bold leading-relaxed text-stone-850 dark:text-stone-100">
              {cardInfo?.mnemonic || 'Quan sát kỹ cấu trúc nét chữ và liên tưởng đến sự vật tương ứng trong thực tế để khắc sâu vào tiềm thức.'}
            </p>
          </div>

          {/* Mẹo não phải */}
          <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border-2 border-stone-900 dark:border-white shadow-2xs text-xs text-stone-800 dark:text-stone-200 font-bold leading-relaxed">
            🧠 <strong>Phương pháp Spaced Repetition & Visual Association:</strong> Kết nối trực giác hình ảnh với âm thanh giúp não bộ ghi nhớ chữ Hán vĩnh viễn mà không cần chép phạt.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t-2 border-stone-900 dark:border-white flex items-center justify-between text-xs font-black text-stone-600 dark:text-stone-400 shrink-0">
          <span className="flex items-center gap-1.5 text-akira dark:text-rose-400">
            <span>✨ Trí nhớ thị giác não phải</span>
          </span>
          <kbd className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-mono text-[10px]">
            ESC đóng
          </kbd>
        </div>
      </div>
    </div>
  );
}
