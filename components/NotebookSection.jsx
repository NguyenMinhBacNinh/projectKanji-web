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
    <section className="w-full max-w-2xl flex flex-col gap-4 z-20">
      {/* Header Sổ tay Chōmen */}
      <div className="w-full karuta-card p-4 md:p-5 rounded-3xl border-[2.5px] border-stone-900 dark:border-white bg-white dark:bg-stone-900 shadow-manga-lg flex flex-col md:flex-row items-center justify-between gap-3 relative overflow-hidden">
        <div className="karuta-inner-border" />
        <div className="relative z-10">
          <h2 className="text-xl font-black font-kanji flex items-center gap-2 text-stone-950 dark:text-white">
            <ScrollUnfurledIcon className="w-5 h-5 text-akira dark:text-rose-400" /> Sổ tay chữ hay quên
            <span className="px-2.5 py-0.5 rounded-lg border-2 border-stone-900 dark:border-white bg-manga-yellow text-stone-950 text-xs font-black shadow-2xs">{forgottenList.length} chữ</span>
          </h2>
          <p className="text-xs font-bold text-stone-600 dark:text-stone-300 mt-1">
            Lưu tự động các chữ làm sai Quiz hoặc bấm &ldquo;Chưa nhớ&rdquo; kèm Mẹo nhớ chiết tự
          </p>
        </div>

        {hasItems && (
          <div className="flex items-center gap-2 w-full md:w-auto relative z-10">
            <button
              onClick={() => {
                playWoodClapper();
                onStartReview();
              }}
              className="flex-1 md:flex-none px-4 py-2.5 bg-akira hover:bg-red-600 text-white rounded-xl text-xs md:text-sm font-black border-2 border-stone-900 dark:border-white shadow-manga active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <KatanaIcon className="w-4 h-4" /> LUYỆN ÔN NGAY
            </button>
            <button
              onClick={() => {
                playWaterDrop();
                onClearNotebook();
              }}
              className="px-3.5 py-2.5 bg-white dark:bg-stone-800 hover:bg-manga-yellow hover:text-stone-950 text-stone-900 dark:text-stone-100 rounded-xl text-xs font-black border-2 border-stone-900 dark:border-white shadow-manga-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              title="Xóa tất cả các chữ trong sổ"
            >
              Xóa hết
            </button>
          </div>
        )}
      </div>

      {/* Danh sách thẻ bài Manga ghi nhớ */}
      {hasItems ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          {forgottenList.map((char) => {
            const info = getLocalKanjiInfo(char, fullDb);

            return (
              <div
                key={char}
                className="karuta-card p-4 rounded-2xl border-2 border-stone-900 dark:border-white bg-white dark:bg-stone-850 shadow-manga-sm hover:border-akira dark:hover:border-rose-400 transition-colors flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        playWaterDrop();
                        playJapaneseSpeech(char);
                      }}
                      className="text-4xl font-kanji font-black text-akira dark:text-rose-400 hover:text-red-600 dark:hover:text-rose-300 transition-colors cursor-pointer"
                      title="Nhấp để nghe đọc"
                    >
                      {char}
                    </button>
                    <div>
                      <div className="font-black text-base font-kanji text-stone-950 dark:text-white">
                        {info.hanViet || '—'}
                      </div>
                      <div className="text-xs font-bold text-stone-600 dark:text-stone-300 line-clamp-1">
                        {info.meaning}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playWaterDrop();
                      onRemoveItem(char);
                    }}
                    className="w-7 h-7 rounded-lg border-2 border-stone-900 dark:border-white bg-stone-100 dark:bg-stone-800 hover:bg-akira hover:text-white text-stone-900 dark:text-stone-100 flex items-center justify-center text-xs font-black transition-all shadow-2xs active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                    title="Xóa khỏi sổ tay"
                  >
                    ✕
                  </button>
                </div>

                {info.mnemonic && (
                  <div className="mt-3 pt-2 border-t-2 border-stone-900 dark:border-white text-xs font-bold leading-relaxed bg-yellow-100 dark:bg-stone-800 text-stone-950 dark:text-stone-100 p-2.5 rounded-xl border border-stone-900 dark:border-white relative z-10 shadow-2xs">
                    <span className="font-black text-akira dark:text-rose-400">Mẹo: </span>
                    {info.mnemonic}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full karuta-card p-12 rounded-3xl border-[2.5px] border-stone-900 dark:border-white bg-white dark:bg-stone-900 text-center flex flex-col items-center justify-center gap-3 shadow-manga-lg relative overflow-hidden">
          <div className="karuta-inner-border" />
          <span className="text-6xl animate-bounce relative z-10">🌸</span>
          <h3 className="font-black text-lg font-kanji text-stone-950 dark:text-white relative z-10">
            SỔ TAY CỦA BẠN ĐANG TRỐNG!
          </h3>
          <p className="text-xs font-bold text-stone-600 dark:text-stone-300 max-w-sm leading-relaxed relative z-10">
            Khi bạn bấm &ldquo;Chưa nhớ&rdquo; trong khi học hoặc trả lời sai câu hỏi trắc nghiệm, các chữ đó sẽ tự động được ghi danh vào đây kèm câu chuyện mẹo nhớ để bạn ôn luyện lại.
          </p>
        </div>
      )}
    </section>
  );
}
