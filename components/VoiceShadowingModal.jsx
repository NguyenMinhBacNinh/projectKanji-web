'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { playJapaneseSpeech } from '../lib/kanjiService';
import {
  playWoodClapper,
  playWaterDrop,
  playHankoStamp,
  playQuizSuccess,
  playQuizError,
} from '../lib/traditionalAudio';
import { VolumeIcon } from './ZenIcons';
import { LEVEL_SHADOWING_DRILLS, parseKanjiShadowingDrills } from '../lib/shadowingData';

export default function VoiceShadowingModal({
  isOpen,
  onClose,
  currentLevel = 'N5',
  currentChar = '',
  cardInfo = null,
  initialPhrase = '',
  initialMeaning = '',
}) {
  const [activeTab, setActiveTab] = useState(currentLevel || 'N5');
  const [targetPhrase, setTargetPhrase] = useState('');
  const [targetMeaning, setTargetMeaning] = useState('');
  const [targetReading, setTargetReading] = useState('');
  const [speechRate, setSpeechRate] = useState(0.85); // 0.85x chậm rãi hoặc 1.0x chuẩn
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [score, setScore] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const [feedback, setFeedback] = useState('');

  const recognitionRef = useRef(null);

  // 1. Phân tích bài tập Shadowing riêng cho Chữ Hán đang học
  const kanjiDrills = useMemo(() => {
    return parseKanjiShadowingDrills(cardInfo, currentChar, currentLevel);
  }, [cardInfo, currentChar, currentLevel]);

  // 2. Đồng bộ tab và câu mẫu khi mở modal hoặc đổi cấp độ / chữ Hán
  useEffect(() => {
    if (!isOpen) return;

    // Reset trạng thái chấm điểm
    setTranscript('');
    setScore(null);
    setFeedback('');

    if (currentChar && kanjiDrills.length > 0) {
      setActiveTab('kanji');
      setTargetPhrase(kanjiDrills[0].jp);
      setTargetMeaning(kanjiDrills[0].vn);
      setTargetReading(kanjiDrills[0].reading || '');
    } else {
      const validLvl = ['N5', 'N4', 'N3', 'N2', 'N1'].includes(currentLevel) ? currentLevel : 'N5';
      setActiveTab(validLvl);
      const drills = LEVEL_SHADOWING_DRILLS[validLvl] || LEVEL_SHADOWING_DRILLS.N5;
      if (initialPhrase && initialPhrase.length > 2) {
        setTargetPhrase(initialPhrase.replace(/[①②③④⑤]/g, '').trim());
        setTargetMeaning(initialMeaning || '');
        setTargetReading('');
      } else if (drills.length > 0) {
        setTargetPhrase(drills[0].jp);
        setTargetMeaning(drills[0].vn);
        setTargetReading(drills[0].reading || '');
      }
    }
  }, [isOpen, currentChar, currentLevel, kanjiDrills, initialPhrase, initialMeaning]);

  // 3. Khởi tạo SpeechRecognition của trình duyệt
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      const rec = new SpeechRecognition();
      rec.lang = 'ja-JP';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsListening(true);
        setFeedback('Đang lắng nghe... Hãy nói to, rõ ràng vào Micro!');
      };

      rec.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        setIsListening(false);
        evaluatePronunciation(result);
      };

      rec.onerror = (err) => {
        setIsListening(false);
        if (err.error === 'not-allowed') {
          setFeedback('Micro bị từ chối cấp quyền. Vui lòng cho phép quyền truy cập Micro trên trình duyệt.');
        } else if (err.error === 'no-speech') {
          setFeedback('Chưa nghe thấy giọng nói. Hãy bấm lại Micro và phát âm to hơn nhé.');
        } else {
          setFeedback('Không nhận diện được giọng nói. Vui lòng thử lại.');
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [targetPhrase]);

  // 4. Thuật toán chấm điểm phát âm Levenshtein
  const evaluatePronunciation = (userSpeech) => {
    // Làm sạch câu chuẩn: xóa dấu câu, số thứ tự, khoảng trắng
    const cleanTarget = targetPhrase.replace(/[、。！？\s・「」…『』①②③④⑤0-9.]/g, '').toLowerCase();
    const cleanReading = targetReading ? targetReading.replace(/[、。！？\s・「」…『』①②③④⑤0-9.]/g, '').toLowerCase() : '';
    const cleanUser = userSpeech.replace(/[、。！？\s・「」…『』①②③④⑤0-9.]/g, '').toLowerCase();

    if (!cleanUser) {
      setScore(0);
      setFeedback('Chưa thu được âm thanh rõ ràng.');
      return;
    }

    const calcLev = (s1, s2) => {
      const m = s1.length;
      const n = s2.length;
      if (!m) return n ? 0 : 100;
      if (!n) return 0;
      const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
      for (let i = 0; i <= m; i++) dp[i][0] = i;
      for (let j = 0; j <= n; j++) dp[0][j] = j;
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
          else dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
        }
      }
      const dist = dp[m][n];
      const maxLen = Math.max(m, n);
      return Math.max(0, Math.round(((maxLen - dist) / maxLen) * 100));
    };

    // Chấm điểm đối chiếu với cả Chữ Hán gốc lẫn phiên âm Hiragana
    const scoreKanji = calcLev(cleanTarget, cleanUser);
    const scoreReading = cleanReading ? calcLev(cleanReading, cleanUser) : 0;
    const calculatedScore = Math.max(scoreKanji, scoreReading);

    setScore(calculatedScore);

    if (calculatedScore >= 80) {
      playQuizSuccess();
      playHankoStamp();
      setFeedback('Phát âm vô cùng xuất sắc! Ngữ điệu và âm tiết rất chuẩn xác.');
    } else if (calculatedScore >= 60) {
      playQuizSuccess();
      setFeedback('Phát âm khá tốt! Tiếp tục luyện tập thêm để mượt mà hơn.');
    } else {
      playQuizError();
      setFeedback('Cần điều chỉnh thêm. Hãy bấm nghe lại câu mẫu rồi thử đọc lại nhé!');
    }
  };

  const handleStartListening = () => {
    if (!isSupported) {
      alert('Trình duyệt hiện tại chưa hỗ trợ Web Speech API. Vui lòng dùng Google Chrome, Edge hoặc Safari để thu âm!');
      return;
    }

    setTranscript('');
    setScore(null);
    setFeedback('');
    try {
      recognitionRef.current?.start();
    } catch (e) {
      recognitionRef.current?.stop();
      setTimeout(() => {
        try {
          recognitionRef.current?.start();
        } catch (err) { }
      }, 200);
    }
  };

  // 5. Danh sách câu luyện theo Tab đang chọn
  const activeDrillList = useMemo(() => {
    if (activeTab === 'kanji') {
      return kanjiDrills;
    }
    return LEVEL_SHADOWING_DRILLS[activeTab] || [];
  }, [activeTab, kanjiDrills]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl karuta-card border-2 border-border-strong shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-color-sumi relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="karuta-inner-border" />

        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl text-rose-500">🎙️</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg font-ui text-torii">
                  LUYỆN PHÁT ÂM AI & SHADOWING
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  JLPT N1 – N5
                </span>
              </div>
              <span className="text-[11px] opacity-60">
                Luyện nói ngắt quãng, nhận diện giọng nói tiếng Nhật & chấm điểm thời gian thực
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-torii/10 text-torii font-bold text-sm transition-colors cursor-pointer"
            title="Đóng modal"
          >
            ✕
          </button>
        </div>

        {/* Level Switcher Tabs (N5 -> N1 & Chữ Hán hiện tại) */}
        <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none relative z-10">
          {currentChar && kanjiDrills.length > 0 && (
            <button
              onClick={() => {
                playWoodClapper();
                setActiveTab('kanji');
                if (kanjiDrills[0]) {
                  setTargetPhrase(kanjiDrills[0].jp);
                  setTargetMeaning(kanjiDrills[0].vn);
                  setTargetReading(kanjiDrills[0].reading || '');
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'kanji'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-washi/70 hover:bg-rose-500/10 border border-washi-border text-stone-700 dark:text-stone-300'
              }`}
            >
              <span>⛩️ Chữ Hán 「{currentChar}」</span>
              <span className="text-[10px] opacity-80">({kanjiDrills.length})</span>
            </button>
          )}

          {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => {
            const count = LEVEL_SHADOWING_DRILLS[lvl]?.length || 0;
            const isCurrentActive = activeTab === lvl;
            const isUserLevel = currentLevel === lvl;

            return (
              <button
                key={lvl}
                onClick={() => {
                  playWoodClapper();
                  setActiveTab(lvl);
                  const drills = LEVEL_SHADOWING_DRILLS[lvl] || [];
                  if (drills[0]) {
                    setTargetPhrase(drills[0].jp);
                    setTargetMeaning(drills[0].vn);
                    setTargetReading(drills[0].reading || '');
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isCurrentActive
                    ? 'bg-torii text-white shadow-xs'
                    : 'bg-washi/70 hover:bg-torii/10 border border-washi-border text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>{lvl}</span>
                {isUserLevel && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Cấp độ đang học" />
                )}
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Target Phrase Box */}
        <div className="w-full p-4 sm:p-5 rounded-2xl bg-washi border border-washi-border flex flex-col items-center text-center gap-2.5 relative z-10 shadow-xs">
          <div className="flex items-center justify-between w-full text-[11px] font-bold opacity-60 uppercase tracking-wider">
            <span>
              {activeTab === 'kanji' ? `Chữ Hán: ${currentChar}` : `Cấp độ ${activeTab}`}
            </span>
            <span>Mục tiêu đọc chuẩn xác:</span>
          </div>

          <div className="text-lg sm:text-xl md:text-2xl font-kanji font-bold text-color-sumi leading-relaxed max-w-xl">
            {targetPhrase || 'Hãy chọn một câu luyện nói bên dưới.'}
          </div>

          {targetMeaning && (
            <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 italic max-w-lg">
              {targetMeaning}
            </div>
          )}

          {/* Audio controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            <button
              onClick={() => {
                playWaterDrop();
                playJapaneseSpeech(targetPhrase, speechRate);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-torii text-white font-bold text-xs shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <VolumeIcon className="w-3.5 h-3.5" />
              <span>Nghe câu mẫu ({speechRate}x)</span>
            </button>

            <button
              onClick={() => {
                playWaterDrop();
                setSpeechRate((r) => (r === 0.85 ? 1.0 : 0.85));
              }}
              className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
              title="Đổi tốc độ phát âm chậm hoặc bình thường"
            >
              {speechRate === 0.85 ? '🐢 Tốc độ: Chậm 0.85x' : '⚡ Tốc độ: Chuẩn 1.0x'}
            </button>
          </div>
        </div>

        {/* Speech Recognition Area */}
        <div className="flex flex-col items-center gap-3 py-1 relative z-10">
          <button
            onClick={handleStartListening}
            disabled={isListening}
            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all duration-300 cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/30'
                : 'bg-rose-500 hover:bg-rose-600 text-white active:scale-95 shadow-rose-500/30'
            }`}
            title="Bấm vào để bắt đầu thu âm và đọc"
          >
            <span>{isListening ? '⏹️' : '🎙️'}</span>
          </button>

          <span className="text-xs font-semibold opacity-75">
            {isListening
              ? '🎙️ Đang nghe... Hãy đọc to câu mẫu vào Micro!'
              : 'Bấm vào Micro và đọc to câu tiếng Nhật'}
          </span>

          {feedback && (
            <div className="text-xs text-center font-medium text-torii max-w-md animate-fadeIn">
              {feedback}
            </div>
          )}

          {/* User's spoken transcript */}
          {transcript && (
            <div className="w-full p-3.5 rounded-2xl bg-washi/90 border border-washi-border text-center animate-fadeIn">
              <span className="text-[10px] opacity-60 block uppercase font-bold mb-1">
                Máy nghe thấy bạn đọc:
              </span>
              <div className="font-kanji font-bold text-base sm:text-lg text-torii">
                「{transcript}」
              </div>
            </div>
          )}

          {/* AI Pronunciation Score & Hanko Seal */}
          {score !== null && (
            <div className="w-full flex flex-col items-center gap-1.5 animate-fadeIn">
              <div
                className={`text-2xl sm:text-3xl font-black font-ui ${
                  score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : score >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                Độ chuẩn xác: {score}%
              </div>

              {score >= 85 && (
                <div className="hanko-seal text-center p-2 text-xs sm:text-sm animate-bounce">
                  💮 大変よくできました (Xuất sắc)
                </div>
              )}
              {score >= 70 && score < 85 && (
                <div className="hanko-seal text-center p-2 text-xs sm:text-sm">
                  💮 秀 (Rất tốt)
                </div>
              )}
              {score >= 50 && score < 70 && (
                <div className="hanko-seal text-center p-2 text-xs sm:text-sm">
                  💮 合格 (Đạt chuẩn)
                </div>
              )}
              {score < 50 && (
                <div className="text-xs font-bold text-stone-500 dark:text-stone-400">
                  🌱 もう一度 (Hãy thử nghe lại và đọc to hơn một chút nhé)
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drill List Selector for Active Tab */}
        <div className="w-full pt-2.5 border-t border-washi-border relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold opacity-60 uppercase tracking-wider">
              {activeTab === 'kanji'
                ? `Các câu & từ vựng của chữ 「${currentChar}」:`
                : `Danh sách câu mẫu ${activeTab} (${activeDrillList.length} câu):`}
            </span>
            <span className="text-[10px] opacity-50">Nhấp vào để đổi câu</span>
          </div>

          <div className="flex flex-col gap-1.5 max-h-52 overflow-y-auto pr-1">
            {activeDrillList.map((drill, idx) => {
              const isSelected = targetPhrase === drill.jp;

              return (
                <button
                  key={drill.id || idx}
                  onClick={() => {
                    playWoodClapper();
                    setTargetPhrase(drill.jp);
                    setTargetMeaning(drill.vn);
                    setTargetReading(drill.reading || '');
                    setTranscript('');
                    setScore(null);
                    setFeedback('');
                  }}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all flex flex-col gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300 font-bold shadow-2xs'
                      : 'bg-washi/60 border-washi-border hover:border-torii/40 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-kanji font-bold text-xs sm:text-sm truncate">
                      {drill.jp}
                    </span>
                    {drill.theme && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 shrink-0 font-medium">
                        {drill.theme}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] opacity-70 truncate">{drill.vn}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
