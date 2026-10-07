'use client';

import { useState, useEffect, useRef } from 'react';
import { playJapaneseSpeech } from '../lib/kanjiService';
import {
  playWoodClapper,
  playWaterDrop,
  playHankoStamp,
  playQuizSuccess,
  playQuizError,
} from '../lib/traditionalAudio';

export default function VoiceShadowingModal({
  isOpen,
  onClose,
  initialPhrase = 'こんにちは、よろしくお願いします。',
  initialMeaning = 'Xin chào, rất mong được giúp đỡ.',
}) {
  const [targetPhrase, setTargetPhrase] = useState(initialPhrase);
  const [targetMeaning, setTargetMeaning] = useState(initialMeaning);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [score, setScore] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const [feedback, setFeedback] = useState('');

  const recognitionRef = useRef(null);

  // Danh sách các câu luyện nói Shadowing thông dụng
  const samplePhrases = [
    { jp: 'こんにちは、よろしくお願いします。', vn: 'Xin chào, rất mong được giúp đỡ.' },
    { jp: 'ありがとうございます。', vn: 'Xin cảm ơn bạn rất nhiều.' },
    { jp: '日本語の勉強はとても面白いです。', vn: 'Học tiếng Nhật rất là thú vị.' },
    { jp: '富士山に登ってみたいです。', vn: 'Tôi muốn thử leo núi Phú Sĩ.' },
    { jp: 'お元気ですか。はい、元気です。', vn: 'Bạn có khỏe không? Vâng, tôi khỏe.' },
  ];

  useEffect(() => {
    if (initialPhrase) {
      setTargetPhrase(initialPhrase);
      setTargetMeaning(initialMeaning);
    }
  }, [initialPhrase, initialMeaning]);

  // Khởi tạo SpeechRecognition
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
        setFeedback('Đang lắng nghe... Hãy đọc to câu tiếng Nhật!');
      };

      rec.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        setIsListening(false);
        evaluatePronunciation(result);
      };

      rec.onerror = (err) => {
        setIsListening(false);
        setFeedback('Không nhận diện được giọng nói hoặc micro bị từ chối.');
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [targetPhrase]);

  // Thuật toán chấm điểm phát âm (dựa trên Levenshtein similarity)
  const evaluatePronunciation = (userSpeech) => {
    const cleanTarget = targetPhrase.replace(/[、。！？\s]/g, '');
    const cleanUser = userSpeech.replace(/[、。！？\s]/g, '');

    if (!cleanUser) {
      setScore(0);
      return;
    }

    // Tính khoảng cách Levenshtein
    const m = cleanTarget.length;
    const n = cleanUser.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (cleanTarget[i - 1] === cleanUser[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + 1
          );
        }
      }
    }

    const distance = dp[m][n];
    const maxLength = Math.max(m, n);
    const calculatedScore = Math.max(0, Math.round(((maxLength - distance) / maxLength) * 100));

    setScore(calculatedScore);

    if (calculatedScore >= 80) {
      playQuizSuccess();
      playHankoStamp();
    } else {
      playQuizError();
    }
  };

  const handleStartListening = () => {
    if (!isSupported) {
      alert('Trình duyệt hiện tại chưa hỗ trợ Web Speech API. Vui lòng dùng Google Chrome hoặc Safari để thu âm!');
      return;
    }

    setTranscript('');
    setScore(null);
    setFeedback('');
    try {
      recognitionRef.current?.start();
    } catch (e) {
      recognitionRef.current?.stop();
      setTimeout(() => recognitionRef.current?.start(), 200);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl karuta-card border-2 border-border-strong shadow-2xl p-5 sm:p-7 flex flex-col gap-5 text-color-sumi relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="karuta-inner-border" />

        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl text-torii">🗣️</span>
            <div>
              <h3 className="font-black text-lg font-ui text-torii">
                LUYỆN PHÁT ÂM AI & SHADOWING
              </h3>
              <span className="text-[11px] opacity-60">Nhận diện giọng nói & Chấm điểm chuẩn xác</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-torii/10 text-torii font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Target Phrase Box */}
        <div className="w-full p-5 rounded-2xl bg-washi border border-washi-border flex flex-col items-center text-center gap-3 relative z-10">
          <span className="text-[11px] font-bold opacity-60 uppercase tracking-wider">
            Câu mẫu tiếng Nhật:
          </span>
          <div className="text-xl sm:text-2xl font-kanji font-bold text-color-sumi leading-relaxed">
            {targetPhrase}
          </div>
          <div className="text-xs opacity-75 italic">{targetMeaning}</div>

          <button
            onClick={() => {
              playWaterDrop();
              playJapaneseSpeech(targetPhrase);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-torii text-white font-bold text-xs shadow-xs hover:opacity-90 active:scale-95 transition-all mt-1"
          >
            <span>🔊 Nghe câu mẫu</span>
          </button>
        </div>

        {/* Speech Recognition Area */}
        <div className="flex flex-col items-center gap-4 py-2 relative z-10">
          <button
            onClick={handleStartListening}
            disabled={isListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all duration-300 ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/30'
                : 'bg-torii text-white hover:scale-105 active:scale-95 shadow-torii/30'
            }`}
            title="Bấm vào để bắt đầu nói"
          >
            <span>{isListening ? '⏹️' : '🎙️'}</span>
          </button>

          <span className="text-xs font-semibold opacity-75">
            {isListening ? '🎙️ Đang nghe... Hãy nói to vào Micro!' : 'Bấm vào Micro và đọc câu mẫu'}
          </span>

          {feedback && <div className="text-xs text-torii font-medium">{feedback}</div>}

          {/* User's spoken transcript */}
          {transcript && (
            <div className="w-full p-4 rounded-2xl bg-washi/80 border border-washi-border text-center">
              <span className="text-[10px] opacity-60 block uppercase font-bold mb-1">
                Máy nghe thấy bạn đọc:
              </span>
              <div className="font-kanji font-bold text-lg text-torii">「{transcript}」</div>
            </div>
          )}

          {/* AI Pronunciation Score & Hanko Seal */}
          {score !== null && (
            <div className="w-full flex flex-col items-center gap-2 animate-fadeIn">
              <div
                className={`text-3xl font-black font-ui ${
                  score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-rose-600'
                }`}
              >
                Độ chuẩn xác: {score}%
              </div>

              {score >= 85 && (
                <div className="hanko-seal text-center p-2.5 animate-bounce">
                  💮 大変よくできました (Xuất sắc)
                </div>
              )}
              {score >= 70 && score < 85 && (
                <div className="hanko-seal text-center p-2.5">
                  💮 秀 (Rất tốt)
                </div>
              )}
              {score >= 50 && score < 70 && (
                <div className="hanko-seal text-center p-2.5">
                  💮 合格 (Đạt chuẩn)
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Sample Selector */}
        <div className="w-full pt-3 border-t border-washi-border relative z-10">
          <span className="text-[10px] font-bold opacity-60 uppercase tracking-wider block mb-2">
            Đổi câu luyện nói khác:
          </span>
          <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
            {samplePhrases.map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playWoodClapper();
                  setTargetPhrase(phrase.jp);
                  setTargetMeaning(phrase.vn);
                  setTranscript('');
                  setScore(null);
                  setFeedback('');
                }}
                className={`p-2 rounded-xl border text-xs text-left transition-all truncate flex items-center justify-between ${
                  targetPhrase === phrase.jp
                    ? 'bg-torii/15 border-torii text-torii font-bold'
                    : 'bg-washi/60 border-washi-border hover:border-torii/40'
                }`}
              >
                <span className="font-kanji">{phrase.jp}</span>
                <span className="text-[10px] opacity-60">{phrase.vn}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
