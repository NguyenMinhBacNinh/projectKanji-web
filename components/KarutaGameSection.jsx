'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getLocalKanjiInfo } from '../lib/kanjiService';
import {
  playQuizSuccess,
  playQuizError,
  playWoodClapper,
  playTaikoDrum,
  playHankoStamp,
  playWaterDrop,
} from '../lib/traditionalAudio';

export default function KarutaGameSection({ currentLevel, kanjiList, fullDb, onChangeLevel }) {
  const [gridSize, setGridSize] = useState(12); // 12 cards (6 pairs) hoặc 16 cards (8 pairs)
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHanko, setShowHanko] = useState(false);

  const timerRef = useRef(null);

  // Sinh bộ bài Karuta ngẫu nhiên
  const startNewGame = useCallback(() => {
    if (!kanjiList || kanjiList.length === 0) return;

    const pairCount = gridSize / 2;
    // Chọn ngẫu nhiên N chữ Kanji từ danh sách cấp độ
    const shuffledKanji = [...kanjiList].sort(() => 0.5 - Math.random()).slice(0, pairCount);

    const generatedCards = [];
    shuffledKanji.forEach((char, idx) => {
      const info = getLocalKanjiInfo(char, fullDb);
      const pairId = `pair_${idx}`;

      // Thẻ A: Chữ Kanji
      generatedCards.push({
        id: `${pairId}_kanji`,
        pairId,
        type: 'kanji',
        display: char,
        sub: 'HÁN TỰ',
      });

      // Thẻ B: Âm Hán Việt & Nghĩa
      generatedCards.push({
        id: `${pairId}_meaning`,
        pairId,
        type: 'meaning',
        display: info.hanViet || '—',
        sub: info.meaning || 'Chữ Hán',
      });
    });

    // Xáo trộn ngẫu nhiên tất cả các thẻ
    const shuffledCards = generatedCards.sort(() => 0.5 - Math.random());

    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs(new Set());
    setMoves(0);
    setSeconds(0);
    setIsCompleted(false);
    setShowHanko(false);
    setIsPlaying(true);
  }, [kanjiList, gridSize, fullDb]);

  // Khởi tạo game khi load hoặc đổi level/gridSize
  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Bộ đếm thời gian
  useEffect(() => {
    if (isPlaying && !isCompleted) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, isCompleted]);

  // Xử lý lật thẻ
  const handleCardClick = (idx) => {
    if (
      flippedIndices.length >= 2 ||
      flippedIndices.includes(idx) ||
      matchedPairs.has(cards[idx].pairId)
    ) {
      return;
    }

    playWoodClapper();
    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const card1 = cards[newFlipped[0]];
      const card2 = cards[newFlipped[1]];

      if (card1.pairId === card2.pairId) {
        // Ghép đôi chính xác!
        playQuizSuccess();
        const nextMatched = new Set(matchedPairs);
        nextMatched.add(card1.pairId);
        setMatchedPairs(nextMatched);
        setFlippedIndices([]);

        // Kiểm tra hoàn thành toàn bộ bàn chơi
        if (nextMatched.size === cards.length / 2) {
          setIsCompleted(true);
          setIsPlaying(false);
          setTimeout(() => {
            playTaikoDrum();
            playHankoStamp();
            setShowHanko(true);
          }, 350);
        }
      } else {
        // Sai cặp
        playQuizError();
        setTimeout(() => {
          setFlippedIndices([]);
        }, 850);
      }
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="w-full max-w-3xl flex flex-col items-center gap-5 z-20 animate-fadeIn">
      {/* Top Controls Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-washi/80 p-3 rounded-2xl border border-washi-border shadow-xs">
        <div className="flex items-center gap-2">
          <span className="hanko-stamp text-xs">KARUTA MATCH</span>
          <span className="text-xs font-bold font-kanji text-torii">
            JLPT {currentLevel}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-lg">
            <span>⏱ Thời gian:</span>
            <span className="font-mono font-bold text-torii">{formatTime(seconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-lg">
            <span>🎯 Lượt lật:</span>
            <span className="font-mono font-bold">{moves}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-lg">
            <span>Pairs:</span>
            <span className="font-mono font-bold text-emerald-600">
              {matchedPairs.size} / {cards.length / 2}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playWaterDrop();
              setGridSize((s) => (s === 12 ? 16 : 12));
            }}
            className="px-2.5 py-1 rounded-lg border border-washi-border text-[11px] font-bold hover:bg-torii hover:text-white transition-all"
            title="Đổi số lượng thẻ"
          >
            {gridSize === 12 ? '12 Thẻ' : '16 Thẻ'}
          </button>

          <button
            onClick={() => {
              playWoodClapper();
              startNewGame();
            }}
            className="px-3 py-1 bg-torii hover:bg-torii-light text-white rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center gap-1"
          >
            <span>Làm mới ↺</span>
          </button>
        </div>
      </div>

      {/* Main Karuta Tatami Board */}
      <div className="w-full p-4 sm:p-6 rounded-3xl karuta-card border-2 border-border-strong shadow-2xl relative overflow-hidden">
        <div className="karuta-inner-border" />

        {/* Hanko Victory Stamp */}
        {showHanko && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-hankoStamp">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-red-600/90 text-red-600/90 flex flex-col items-center justify-center font-kanji font-black rotate-[-12deg] bg-red-600/15 backdrop-blur-xs shadow-2xl">
              <span className="text-4xl md:text-5xl tracking-widest leading-none">
                皆勤
              </span>
              <span className="text-[10px] tracking-wider mt-1 uppercase opacity-85 border-t border-red-600/50 pt-0.5">
                XUẤT SẮC
              </span>
            </div>
          </div>
        )}

        {/* Completion Screen Overlay */}
        {isCompleted && (
          <div className="w-full py-8 text-center flex flex-col items-center gap-3 relative z-10 animate-fadeIn">
            <div className="text-5xl animate-bounce">🎴</div>
            <h3 className="text-2xl sm:text-3xl font-black font-kanji text-torii">
              CHIẾN THẮNG TRÒ CHƠI KARUTA!
            </h3>
            <p className="text-xs sm:text-sm opacity-80 max-w-md">
              Bạn đã ghép chính xác tất cả {cards.length / 2} cặp thẻ chữ Hán trong {formatTime(seconds)} với {moves} lượt lật.
            </p>

            <button
              onClick={startNewGame}
              className="mt-3 px-8 py-3 bg-torii hover:bg-torii-light text-white font-extrabold rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Chơi ván mới ↺</span>
            </button>
          </div>
        )}

        {/* Cards Grid */}
        {!isCompleted && (
          <div
            className={`w-full grid gap-2.5 sm:gap-3.5 relative z-10 ${
              gridSize === 12
                ? 'grid-cols-3 sm:grid-cols-4'
                : 'grid-cols-4 sm:grid-cols-4'
            }`}
          >
            {cards.map((card, idx) => {
              const isFlipped = flippedIndices.includes(idx);
              const isMatched = matchedPairs.has(card.pairId);

              let cardStyle =
                'bg-washi/90 border-washi-border hover:border-torii/70 text-color-sumi cursor-pointer';

              if (isMatched) {
                cardStyle =
                  'bg-emerald-500/20 border-emerald-500/80 text-emerald-950 dark:text-emerald-200 shadow-xs opacity-70 cursor-default';
              } else if (isFlipped) {
                cardStyle =
                  'bg-amber-500/20 border-torii text-color-sumi shadow-md scale-[1.02] ring-2 ring-torii/30';
              }

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className={`h-24 sm:h-28 md:h-32 rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all duration-200 active:scale-95 select-none ${cardStyle}`}
                >
                  {isFlipped || isMatched ? (
                    <div className="flex flex-col items-center justify-center w-full animate-fadeIn">
                      {card.type === 'kanji' ? (
                        <>
                          <span className="text-3xl sm:text-4xl md:text-5xl font-kanji font-black text-torii leading-none">
                            {card.display}
                          </span>
                          <span className="text-[10px] opacity-60 font-bold uppercase tracking-wider mt-1">
                            {card.sub}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm sm:text-base md:text-lg font-kanji font-black text-torii leading-tight">
                            {card.display}
                          </span>
                          <span className="text-[10px] sm:text-xs opacity-75 font-medium line-clamp-2 mt-0.5 leading-snug">
                            {card.sub}
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    /* Mặt úp của thẻ Karuta */
                    <div className="flex flex-col items-center justify-center gap-1 opacity-40 hover:opacity-80 transition-opacity">
                      <span className="text-xl sm:text-2xl">🎴</span>
                      <span className="text-[9px] font-kanji font-bold uppercase tracking-widest">
                        花札
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Guide hint */}
      <div className="text-[11px] opacity-60 text-center font-medium">
        Lật mở từng cặp thẻ để tìm ra chữ Kanji tương ứng với âm Hán Việt và ý nghĩa!
      </div>
    </section>
  );
}
