'use client';
import { playJapaneseSpeech } from '../lib/kanjiService';
import { playWoodClapper, playTempleBell, playWaterDrop } from '../lib/traditionalAudio';
import JapaneseCardIllustration from './JapaneseCardIllustration';
import RadicalBreakdownCard from './RadicalBreakdownCard';
import KanjiIllustrationBox from './KanjiIllustrationBox';

export default function StudySection({
  levels,
  currentLevel,
  onChangeLevel,
  kanjiList,
  currentIndex,
  currentChar,
  cardInfo,
  isFlipped,
  setIsFlipped,
  isShuffled,
  onToggleShuffle,
  onPrevCard,
  onNextCard,
  onMarkForgotten,
  onMarkMastered,
  onOpenGridModal,
  onOpenPracticeModal,
  onOpenRadicalModal,
  onOpenMindmapModal,
  onOpenVoiceShadowing,
  onOpenWorksheetModal,
  onSrsReview,
  dueCount = 0,
  isMastered = false,
}) {
  const total = kanjiList.length;
  const progressPercent = total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;

  return (
    <section className="w-full flex flex-col items-center gap-5 z-20">
      {/* Level Tabs (Thẻ Mộc bài Kifuda - 木札) */}
      <div className="w-full max-w-xl p-1.5 rounded-2xl border border-washi-border shadow-sm flex items-center justify-between gap-1.5 kifuda-tab">
        {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => {
          const count = levels[lvl]?.length || 0;
          const isActive = currentLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => {
                playWoodClapper();
                onChangeLevel(lvl);
              }}
              className={`flex-1 py-2 px-2 rounded-xl text-xs md:text-sm font-bold transition-all text-center relative ${
                isActive
                  ? 'bg-torii text-white shadow-md font-black scale-[1.02]'
                  : 'opacity-70 hover:opacity-100 hover:bg-torii/10'
              }`}
            >
              <span>{lvl}</span>{' '}
              <span className={`text-[10px] ${isActive ? 'text-white/80' : 'opacity-60'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress Bar & Indicators */}
      <div className="w-full max-w-xl flex flex-col gap-1.5 px-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-torii font-black font-kanji text-base">
              {total > 0 ? currentIndex + 1 : 0} / {total} chữ
            </span>
            {isShuffled && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                Đang xáo trộn
              </span>
            )}
          </div>
          <span className="opacity-70 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden border border-washi-border/70 bg-black/5 dark:bg-white/5">
          <div
            className="h-full bg-torii transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3D Flashcard Container - Thẻ bài Karuta / Tanzaku truyền thống */}
      <div
        className="w-full max-w-xl cursor-pointer perspective relative"
        style={{ height: '500px', minHeight: '500px' }}
        onClick={() => {
          playWoodClapper();
          setIsFlipped(!isFlipped);
        }}
        title="Nhấp chuột hoặc phím Space để lật thẻ"
      >
        <div
          className={`card-flip-inner rounded-3xl ${
            isFlipped ? 'is-flipped' : ''
          }`}
          style={{ height: '100%', width: '100%', position: 'relative' }}
        >
          {/* Card Front */}
          <div className="card-face card-front absolute inset-0 w-full h-full rounded-3xl karuta-card select-none">
            {/* Viền trong kép phong cách Nhật (二重枠) */}
            <div className="karuta-inner-border" />

            {/* Hình ảnh danh lam & văn hóa Nhật Bản (Núi Phú Sĩ, Sumo, Torii, v.v.) làm hình chìm nghệ thuật */}
            <JapaneseCardIllustration currentChar={currentChar} currentIndex={currentIndex} />

            {/* Dấu triện "ĐÃ THUỘC" (済 - Sumi) nếu chữ này đã thuộc */}
            {isMastered && (
              <div className="absolute top-16 right-8 pointer-events-none stamp-animated z-20">
                <div className="w-14 h-14 rounded-full border-2 border-torii flex items-center justify-center font-kanji font-black text-torii text-2xl bg-torii/10 shadow-sm rotate-[-12deg]">
                  済
                </div>
              </div>
            )}

            {/* Front Content */}
            <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between relative z-10">
              {/* Front Header */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border/60">
                <div className="flex items-center gap-2">
                  <span className="hanko-stamp">JLPT {currentLevel}</span>
                  <span className="inline-flex items-center text-[11px] font-semibold opacity-70 bg-washi px-2.5 py-1 rounded-lg border border-washi-border">
                    {total > 0 ? `${currentIndex + 1} / ${total}` : '1'}
                  </span>
                  {dueCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/40 text-[10px] font-extrabold animate-pulse">
                      📌 Cần ôn: {dueCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playWoodClapper();
                      if (onOpenMindmapModal) onOpenMindmapModal();
                    }}
                    className="group flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 hover:border-torii transition-all duration-200 shadow-xs active:scale-95"
                    title="Sơ đồ tư duy từ ghép (Phím M)"
                  >
                    <span className="text-sm">🕸️</span>
                    <span className="text-xs font-bold tracking-wide hidden sm:inline">Sơ đồ</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playWoodClapper();
                      if (onOpenRadicalModal) onOpenRadicalModal();
                    }}
                    className="group flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 hover:border-torii transition-all duration-200 shadow-xs active:scale-95"
                    title="Chiết tự bộ thủ cấu thành (Phím R)"
                  >
                    <span className="text-sm">🧩</span>
                    <span className="text-xs font-bold tracking-wide hidden sm:inline">Bộ thủ</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playWoodClapper();
                      onOpenPracticeModal();
                    }}
                    className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 hover:border-torii transition-all duration-200 shadow-xs active:scale-95"
                    title="Tập viết & Thứ tự nét bút (Phím W)"
                  >
                    <span className="text-sm">✍️</span>
                    <span className="text-xs font-bold tracking-wide">Tập viết</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playWaterDrop();
                      playJapaneseSpeech(currentChar);
                    }}
                    className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 hover:border-torii transition-all duration-200 shadow-xs active:scale-95"
                    title="Phát âm chữ này (Phím A)"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                    <span className="text-xs font-bold tracking-wide">Phát âm</span>
                  </button>

                  {onOpenVoiceShadowing && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playWaterDrop();
                        onOpenVoiceShadowing();
                      }}
                      className="group flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 hover:border-torii transition-all duration-200 shadow-xs active:scale-95"
                      title="Luyện nói AI & Shadowing qua Micro"
                    >
                      <span className="text-sm">🎙️</span>
                      <span className="text-xs font-bold tracking-wide hidden sm:inline">Luyện nói</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Giant Kanji & Pictograph Illustration */}
              <div className="text-center py-1">
                <div className="text-7xl md:text-8xl font-kanji font-black tracking-wider drop-shadow-sm transition-colors duration-200 hover:text-torii">
                  {currentChar}
                </div>

                {/* Khung tranh minh họa tượng hình khớp với nghĩa chữ */}
                <KanjiIllustrationBox currentChar={currentChar} cardInfo={cardInfo} variant="front" />

                <div className="mt-1 text-2xl md:text-3xl font-extrabold text-torii font-kanji tracking-wider">
                  {cardInfo?.hanViet || '—'}
                </div>
                <div className="text-xs md:text-sm opacity-75 mt-0.5 font-medium max-w-sm mx-auto">
                  {cardInfo?.meaning || 'Đang cập nhật...'}
                </div>
              </div>

              {/* On / Kun Readings */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-washi-border/60 text-center">
                <div className="bg-washi/70 p-2.5 rounded-xl border border-washi-border">
                  <span className="text-[10px] uppercase font-bold opacity-60 block">Âm On (Onyomi)</span>
                  <span className="text-xs md:text-sm font-bold font-kanji mt-0.5 block truncate">
                    {cardInfo?.on || '—'}
                  </span>
                </div>
                <div className="bg-washi/70 p-2.5 rounded-xl border border-washi-border">
                  <span className="text-[10px] uppercase font-bold opacity-60 block">Âm Kun (Kunyomi)</span>
                  <span className="text-xs md:text-sm font-bold text-torii font-kanji mt-0.5 block truncate">
                    {cardInfo?.kun || '—'}
                  </span>
                </div>
              </div>

              <div className="text-center text-[11px] opacity-60 font-medium pt-2">
                Chạm hoặc bấm [Phím Space] để lật mặt sau ↻
              </div>
            </div>
          </div>

          {/* Card Back */}
          <div className="card-face card-back absolute inset-0 w-full h-full rounded-3xl karuta-card select-none">
            {/* Viền trong kép */}
            <div className="karuta-inner-border" />

            {/* Back Content - Scrollable if content is long */}
            <div className="w-full h-full p-5 md:p-6 flex flex-col justify-between overflow-y-auto relative z-10">
              {/* Back Header */}
              <div className="w-full flex items-center justify-between pb-2.5 border-b border-washi-border">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-kanji font-black text-torii">{currentChar}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">{cardInfo?.hanViet}</span>
                      <span className="hanko-stamp text-[10px] py-0.5 px-2">
                        JLPT {currentLevel}
                      </span>
                    </div>
                    <span className="text-xs opacity-70 block truncate max-w-[240px]">
                      {cardInfo?.meaning}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playWoodClapper();
                      if (onOpenMindmapModal) onOpenMindmapModal();
                    }}
                    className="group flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 hover:border-torii transition-all duration-200 shadow-xs active:scale-95"
                    title="Sơ đồ tư duy từ ghép (Phím M)"
                  >
                    <span className="text-sm">🕸️</span>
                    <span className="text-xs font-bold hidden sm:inline">Sơ đồ</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playWoodClapper();
                      if (onOpenRadicalModal) onOpenRadicalModal();
                    }}
                    className="group flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 hover:border-torii transition-all duration-200 shadow-xs active:scale-95"
                    title="Chiết tự bộ thủ cấu thành (Phím R)"
                  >
                    <span className="text-sm">🧩</span>
                    <span className="text-xs font-bold hidden sm:inline">Bộ thủ</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playWoodClapper();
                      onOpenPracticeModal();
                    }}
                    className="group flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 hover:border-torii transition-all duration-200 shadow-xs active:scale-95"
                    title="Tập viết & Thứ tự nét bút (Phím W)"
                  >
                    <span className="text-sm">✍️</span>
                    <span className="text-xs font-bold hidden sm:inline">Tập viết</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playWaterDrop();
                      playJapaneseSpeech(currentChar);
                    }}
                    className="group flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 hover:border-torii transition-all duration-200 shadow-xs active:scale-95"
                    title="Phát âm chữ này"
                  >
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                    <span className="text-xs font-bold hidden sm:inline">Phát âm</span>
                  </button>

                  {onOpenVoiceShadowing && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playWaterDrop();
                        onOpenVoiceShadowing();
                      }}
                      className="group flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-washi hover:bg-torii text-torii hover:text-white border border-torii/30 hover:border-torii transition-all duration-200 shadow-xs active:scale-95"
                      title="Luyện nói AI & Shadowing"
                    >
                      <span className="text-sm">🎙️</span>
                      <span className="text-xs font-bold hidden sm:inline">Luyện nói</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Chiết tự bộ thủ cấu thành (Radical Breakdown Card Widget) */}
              <RadicalBreakdownCard
                currentChar={currentChar}
                cardInfo={cardInfo}
                onOpenRadicalModal={onOpenRadicalModal}
              />

              {/* Khung hình tượng & Mẹo ghi nhớ trực quan */}
              <KanjiIllustrationBox currentChar={currentChar} cardInfo={cardInfo} variant="back" />

              {/* Vocabulary Grid inside card */}
              <div className="my-1">
                <div className="text-[11px] font-bold opacity-60 uppercase tracking-wider mb-1.5">
                  Từ vựng tiêu biểu
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {cardInfo?.vocab?.slice(0, 4).map((v, i) => (
                    <div
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        playWaterDrop();
                        playJapaneseSpeech(v.word || v.reading || currentChar);
                      }}
                      className="bg-washi/80 p-2 rounded-xl border border-washi-border hover:border-torii/50 transition-all text-center group cursor-pointer"
                    >
                      <div className="font-kanji font-bold group-hover:text-torii">
                        {v.word}
                      </div>
                      <div className="text-[11px] font-semibold text-torii font-kanji">{v.reading}</div>
                      <div className="text-[10px] opacity-70 truncate">{v.meaning_vi || v.vn}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example sentence */}
              {cardInfo?.exampleJp && (
                <div className="my-1 p-2.5 bg-washi/80 rounded-xl border border-washi-border text-xs">
                  <div
                    className="font-kanji font-semibold leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: cardInfo.exampleJp }}
                  />
                  <div className="text-[11px] opacity-70 italic mt-0.5">
                    {cardInfo.exampleVn}
                  </div>
                </div>
              )}

              {/* SRS Repetition Response Buttons */}
              <div className="my-2 p-2.5 rounded-2xl bg-washi/95 border border-washi-border shadow-xs">
                <div className="flex items-center justify-between mb-1.5 px-0.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-torii flex items-center gap-1">
                    <span>🔁</span> Đánh giá ghi nhớ (SRS)
                  </span>
                  <span className="text-[10px] opacity-60">Lặp lại ngắt quãng</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSrsReview) onSrsReview(1);
                    }}
                    className="flex flex-col items-center py-1.5 px-1 rounded-xl bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-700 dark:text-rose-300 border border-rose-400/30 transition-all font-bold active:scale-95 group"
                    title="Chưa nhớ - Học lại sau 10 phút"
                  >
                    <span className="text-xs">Quên</span>
                    <span className="text-[9px] opacity-75 group-hover:text-white/90">10 phút</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSrsReview) onSrsReview(2);
                    }}
                    className="flex flex-col items-center py-1.5 px-1 rounded-xl bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-700 dark:text-amber-300 border border-amber-400/30 transition-all font-bold active:scale-95 group"
                    title="Khó - Ôn lại sau 1 ngày"
                  >
                    <span className="text-xs">Khó</span>
                    <span className="text-[9px] opacity-75 group-hover:text-white/90">1 ngày</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSrsReview) onSrsReview(3);
                    }}
                    className="flex flex-col items-center py-1.5 px-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-700 dark:text-emerald-300 border border-emerald-400/30 transition-all font-bold active:scale-95 group"
                    title="Tốt - Ôn lại sau 3 ngày"
                  >
                    <span className="text-xs">Tốt</span>
                    <span className="text-[9px] opacity-75 group-hover:text-white/90">3 ngày</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSrsReview) onSrsReview(4);
                    }}
                    className="flex flex-col items-center py-1.5 px-1 rounded-xl bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-700 dark:text-blue-300 border border-blue-400/30 transition-all font-bold active:scale-95 group"
                    title="Dễ - Ôn lại sau 7 ngày"
                  >
                    <span className="text-xs">Dễ</span>
                    <span className="text-[9px] opacity-75 group-hover:text-white/90">7 ngày</span>
                  </button>
                </div>
              </div>

              {/* Footer back card */}
              <div className="pt-2 border-t border-washi-border flex items-center justify-between text-[11px] opacity-60">
                <span className="font-medium">Chạm hoặc bấm [Phím Space] để lật lại mặt trước ↺</span>
                <span className="font-bold">JLPT {currentLevel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Vocabulary List below card */}
      {cardInfo?.vocab && cardInfo.vocab.length > 0 && (
        <div className="w-full max-w-xl">
          <div className="text-xs font-bold opacity-60 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
            <span>Từ vựng JLPT ghép với chữ 「{currentChar}」</span>
            <span className="text-[10px] lowercase text-torii">nhấp để nghe đọc</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {cardInfo.vocab.slice(0, 4).map((v, i) => (
              <button
                key={i}
                onClick={() => {
                  playWaterDrop();
                  playJapaneseSpeech(v.word || v.reading || currentChar);
                }}
                className="karuta-card p-3 rounded-2xl border border-washi-border flex flex-col justify-between hover:border-torii/60 hover:shadow-md transition-all text-center group"
              >
                <div className="font-kanji text-base font-bold group-hover:text-torii transition-colors">
                  {v.word}
                </div>
                <div className="text-xs font-semibold text-torii font-kanji mt-0.5">
                  {v.reading}
                </div>
                <div className="text-[11px] opacity-70 mt-1 font-medium leading-relaxed truncate w-full">
                  {v.meaning_vi || v.vn}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons: Forgotten / Mastered */}
      <div className="w-full max-w-xl flex items-center justify-between gap-3 px-1">
        <button
          onClick={() => {
            playWaterDrop();
            onMarkForgotten();
          }}
          className="flex-1 py-2.5 px-4 karuta-card hover:border-amber-400 rounded-2xl font-bold text-xs md:text-sm shadow-sm flex items-center justify-center gap-1.5 transition-all text-amber-700 dark:text-amber-300 active:scale-95"
        >
          <span>🔖</span>
          <span>Chưa nhớ (Lưu sổ tay)</span>
        </button>

        <button
          onClick={() => {
            playTempleBell();
            onMarkMastered();
          }}
          className="flex-1 py-2.5 px-4 karuta-card hover:border-emerald-500 rounded-2xl font-bold text-xs md:text-sm shadow-sm flex items-center justify-center gap-1.5 transition-all text-emerald-700 dark:text-emerald-300 active:scale-95"
        >
          <span>✅</span>
          <span>Đã thuộc lòng</span>
        </button>
      </div>

      {/* Navigation Controls: Prev, Shuffle, Grid, Next */}
      <div className="w-full max-w-xl flex items-center justify-between gap-2 px-1">
        <button
          onClick={() => {
            playWoodClapper();
            onPrevCard();
          }}
          className="py-2.5 px-5 karuta-card border border-washi-border rounded-2xl text-xs md:text-sm font-bold shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
        >
          <span>←</span>
          <span>Trước</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playWoodClapper();
              onToggleShuffle();
            }}
            className={`p-2.5 rounded-2xl border text-xs font-bold transition-all shadow-sm ${
              isShuffled
                ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200'
                : 'karuta-card opacity-70 hover:opacity-100'
            }`}
            title="Đảo ngẫu nhiên danh sách"
          >
            🔀
          </button>

          <button
            onClick={() => {
              playWoodClapper();
              onOpenGridModal();
            }}
            className="py-2.5 px-3.5 karuta-card border border-washi-border rounded-2xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span>📑</span>
            <span>Mục lục</span>
          </button>

          {onOpenWorksheetModal && (
            <button
              onClick={() => {
                playWoodClapper();
                onOpenWorksheetModal();
              }}
              className="py-2.5 px-3.5 karuta-card border border-washi-border rounded-2xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
              title="In phiếu tập viết ô mễ (A4/PDF)"
            >
              <span>🖨️</span>
              <span className="hidden sm:inline">In phiếu</span>
            </button>
          )}
        </div>

        <button
          onClick={() => {
            playWoodClapper();
            onNextCard();
          }}
          className="py-2.5 px-6 bg-torii hover:bg-torii-light text-white rounded-2xl text-xs md:text-sm font-bold shadow-md flex items-center gap-1.5 transition-all active:scale-95"
        >
          <span>Sau</span>
          <span>→</span>
        </button>
      </div>
    </section>
  );
}
