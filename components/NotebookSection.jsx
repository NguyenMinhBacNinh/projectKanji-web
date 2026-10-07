'use client';
import { playJapaneseSpeech, getLocalKanjiInfo } from '../lib/kanjiService';
import { playWoodClapper, playWaterDrop } from '../lib/traditionalAudio';

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
      {/* Header Sổ tay Chōmen (帳面) */}
      <div className="w-full karuta-card p-4 md:p-5 rounded-3xl border border-washi-border shadow-washi flex flex-col md:flex-row items-center justify-between gap-3 relative overflow-hidden">
        <div className="karuta-inner-border" />
        <div className="relative z-10">
          <h2 className="text-lg font-bold font-kanji flex items-center gap-2">
            <span>📖</span> Sổ tay chữ hay quên
            <span className="hanko-stamp text-xs">{forgottenList.length} chữ</span>
          </h2>
          <p className="text-xs opacity-70 mt-0.5">
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
              className="flex-1 md:flex-none px-4 py-2 bg-torii text-white rounded-2xl text-xs md:text-sm font-bold hover:bg-torii-light transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>🎯</span> Luyện ôn ngay
            </button>
            <button
              onClick={() => {
                playWaterDrop();
                onClearNotebook();
              }}
              className="px-3.5 py-2 kifuda-tab opacity-75 hover:opacity-100 hover:text-torii rounded-2xl text-xs font-bold transition-all"
              title="Xóa tất cả các chữ trong sổ"
            >
              Xóa hết
            </button>
          </div>
        )}
      </div>

      {/* Danh sách thẻ bài Karuta ghi nhớ */}
      {hasItems ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          {forgottenList.map((char) => {
            const info = getLocalKanjiInfo(char, fullDb);

            return (
              <div
                key={char}
                className="karuta-card p-4 rounded-2xl border border-washi-border shadow-sm flex flex-col justify-between hover:border-torii/40 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        playWaterDrop();
                        playJapaneseSpeech(char);
                      }}
                      className="text-4xl font-kanji font-black text-torii hover:scale-110 transition-transform cursor-pointer"
                      title="Nhấp để nghe đọc"
                    >
                      {char}
                    </button>
                    <div>
                      <div className="font-extrabold text-base font-kanji">
                        {info.hanViet || '—'}
                      </div>
                      <div className="text-xs opacity-70 line-clamp-1">
                        {info.meaning}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playWaterDrop();
                      onRemoveItem(char);
                    }}
                    className="w-7 h-7 rounded-lg opacity-60 hover:opacity-100 hover:text-red-500 hover:bg-red-500/10 flex items-center justify-center text-sm font-bold transition-all"
                    title="Xóa khỏi sổ tay"
                  >
                    ✕
                  </button>
                </div>

                {info.mnemonic && (
                  <div className="mt-3 pt-2 border-t border-washi-border/60 text-[11px] leading-relaxed bg-black/5 dark:bg-white/5 p-2.5 rounded-xl relative z-10">
                    <span className="font-bold text-torii">Mẹo: </span>
                    {info.mnemonic}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full karuta-card p-12 rounded-3xl border border-washi-border text-center flex flex-col items-center justify-center gap-3 shadow-washi relative overflow-hidden">
          <div className="karuta-inner-border" />
          <span className="text-5xl animate-bounce relative z-10">🌸</span>
          <h3 className="font-bold text-base font-kanji relative z-10">
            Sổ tay của bạn đang trống!
          </h3>
          <p className="text-xs opacity-70 max-w-sm leading-relaxed relative z-10">
            Khi bạn bấm &ldquo;Chưa nhớ&rdquo; trong khi học hoặc trả lời sai câu hỏi trắc nghiệm, các chữ đó sẽ tự động được ghi danh vào đây kèm câu chuyện mẹo nhớ để bạn ôn luyện lại.
          </p>
        </div>
      )}
    </section>
  );
}
