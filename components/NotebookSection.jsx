'use client';
import { playJapaneseSpeech, getLocalKanjiInfo } from '../lib/kanjiService';
import { playWoodClapper, playWaterDrop } from '../lib/traditionalAudio';
import { ScrollUnfurledIcon, KatanaIcon } from './ZenIcons';

export default function NotebookSection({
  forgottenList,
  onClearNotebook,
  onRemoveItem,
  onStartReview,
  fullDb,
}) {
  const hasItems = forgottenList && forgottenList.length > 0;

  return (
    <section className="w-full max-w-[1020px] 2xl:max-w-6xl h-full min-h-0 flex-1 flex flex-col items-center justify-start gap-1.5 sm:gap-2 z-20 animate-fadeIn select-none overflow-hidden">
      {/* Header Sổ tay Chōmen (Thu gọn 1 dòng) */}
      <div className="w-full p-1.5 sm:p-2 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border border-[#D8CEBF] dark:border-stone-700/80 shadow-md backdrop-blur-md flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 pl-1">
          <ScrollUnfurledIcon className="w-4 h-4 text-torii" />
          <h2 className="text-xs sm:text-sm font-black font-kanji text-stone-900 dark:text-white flex items-center gap-1.5">
            <span>Sổ tay chữ hay quên</span>
            <span className="px-2 py-0.2 rounded-lg border border-[#D8CEBF] dark:border-stone-700 bg-torii/10 text-torii text-[11px] font-bold">
              {forgottenList.length} chữ
            </span>
          </h2>
        </div>

        {hasItems && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                playWoodClapper();
                onStartReview();
              }}
              className="px-3 py-1 bg-torii hover:bg-torii-light text-white rounded-xl text-xs font-bold shadow-2xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <KatanaIcon className="w-3.5 h-3.5" />
              <span>Luyện ôn ngay</span>
            </button>
            <button
              onClick={() => {
                playWaterDrop();
                onClearNotebook();
              }}
              className="px-2.5 py-1 bg-[#F5EFE6] dark:bg-stone-800 hover:bg-rose-500 hover:text-white text-stone-700 dark:text-stone-300 rounded-xl text-xs font-bold border border-washi-border shadow-2xs active:scale-95 transition-all cursor-pointer"
              title="Xóa tất cả các chữ trong sổ"
            >
              Xóa hết
            </button>
          </div>
        )}
      </div>

      {/* Danh sách thẻ bài ghi nhớ (Vùng cuộn nội bộ độc lập) */}
      {hasItems ? (
        <div className="w-full flex-1 min-h-0 overflow-y-auto thin-scrollbar pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {forgottenList.map((char) => {
            const info = getLocalKanjiInfo(char, fullDb);

            return (
              <div
                key={char}
                className="karuta-card p-3 rounded-2xl border border-washi-border hover:border-torii/60 transition-all flex flex-col justify-between group shadow-2xs relative overflow-hidden h-[120px]"
              >
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        playWaterDrop();
                        playJapaneseSpeech(char);
                      }}
                      className="text-3xl font-kanji font-black text-torii hover:scale-105 transition-transform cursor-pointer"
                      title="Nhấp để nghe đọc"
                    >
                      {char}
                    </button>
                    <div>
                      <div className="font-black text-sm font-kanji text-stone-900 dark:text-white">
                        {info.hanViet || '—'}
                      </div>
                      <div className="text-[11px] font-medium text-stone-600 dark:text-stone-300 line-clamp-1">
                        {info.meaning}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playWaterDrop();
                      onRemoveItem(char);
                    }}
                    className="w-6 h-6 rounded-lg border border-washi-border bg-stone-100 dark:bg-stone-800 hover:bg-torii hover:text-white text-stone-600 dark:text-stone-300 flex items-center justify-center text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer"
                    title="Xóa khỏi sổ tay"
                  >
                    ✕
                  </button>
                </div>

                {info.mnemonic ? (
                  <div className="mt-1 pt-1 border-t border-washi-border/70 text-[10px] leading-snug text-stone-700 dark:text-stone-300 relative z-10 line-clamp-2">
                    <span className="font-bold text-torii">Mẹo: </span>
                    {info.mnemonic}
                  </div>
                ) : (
                  <div className="text-[10px] opacity-40 italic">Chưa có ghi chú mẹo nhớ</div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex-1 min-h-0 karuta-card p-8 rounded-3xl border border-washi-border text-center flex flex-col items-center justify-center gap-2 shadow-md relative overflow-hidden">
          <div className="karuta-inner-border" />
          <span className="text-4xl animate-bounce relative z-10">🌸</span>
          <h3 className="font-black text-base font-kanji text-stone-900 dark:text-white relative z-10">
            SỔ TAY CỦA BẠN ĐANG TRỐNG!
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm leading-relaxed relative z-10">
            Khi bạn bấm &ldquo;Chưa nhớ&rdquo; trong khi học hoặc trả lời sai câu hỏi trắc nghiệm, các chữ đó sẽ tự động được ghi danh vào đây kèm câu chuyện mẹo nhớ để bạn ôn luyện lại.
          </p>
        </div>
      )}
    </section>
  );
}
