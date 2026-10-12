'use client';

import { useState, useEffect, useRef } from 'react';
import { playWaterDrop, playWoodClapper, playHankoStamp } from '../lib/traditionalAudio';
import { playJapaneseSpeech } from '../lib/kanjiService';
import { generateLocalSenseiResponse } from '../lib/aiTutorEngine';
import { VolumeIcon } from './ZenIcons';

export default function AiSenseiWidget({
  currentChar = '',
  currentLevel = 'N5',
  cardInfo = null,
  activeMode = 'study',
  fullDb = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userApiKey, setUserApiKey] = useState('');
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load API Key from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('gemini_user_api_key') || '';
      setUserApiKey(savedKey);
    }
  }, []);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'sensei',
          text: `Konnichiwa! Thầy là **Kenji Sensei (賢治先生)** - Gia sư AI tiếng Nhật đồng hành cùng bạn.\n\nThầy có thể giải đáp chiết tự chữ Hán, phân tích ngữ pháp, đặt câu ví dụ và chia sẻ mẹo nhớ theo chuẩn JLPT N5 – N1.\n\nHôm nay bạn cần thầy hỗ trợ điều gì?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSaveApiKey = (key) => {
    const trimmed = key.trim();
    setUserApiKey(trimmed);
    if (typeof window !== 'undefined') {
      if (trimmed) {
        localStorage.setItem('gemini_user_api_key', trimmed);
      } else {
        localStorage.removeItem('gemini_user_api_key');
      }
    }
    setShowSettings(false);
    playHankoStamp();
  };

  const handleSendMessage = async (textToSend = null) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    playWaterDrop();
    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    const context = {
      currentChar,
      currentLevel,
      cardInfo,
      activeMode,
    };

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newHistory,
          context,
          userApiKey,
          fullDb,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        playWoodClapper();
        setMessages((prev) => [
          ...prev,
          {
            id: `sensei_${Date.now()}`,
            sender: 'sensei',
            text: data.reply || 'Thầy chưa hiểu câu hỏi, bạn có thể hỏi lại không?',
            source: data.source,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('API route error');
      }
    } catch (err) {
      // Fallback local engine if API request fails
      const fallbackReply = generateLocalSenseiResponse(text, context, fullDb || {});
      playWoodClapper();
      setMessages((prev) => [
        ...prev,
        {
          id: `sensei_${Date.now()}`,
          sender: 'sensei',
          text: fallbackReply,
          source: 'local_fallback',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    playWoodClapper();
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'sensei',
        text: `Chào bạn! Thầy đã dọn dẹp bảng trò chuyện. Bạn muốn hỏi về chữ Hán **「${currentChar || '一'}」** hay thắc mắc ngữ pháp nào tiếp theo?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Trích xuất tiếng Nhật để phát âm khi bấm nút loa
  const handleSpeakJapanese = (text) => {
    playWaterDrop();
    const jpMatches = text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g);
    if (jpMatches && jpMatches.length > 0) {
      playJapaneseSpeech(jpMatches.join(' '));
    } else {
      playJapaneseSpeech(text);
    }
  };

  // Helper format markdown đơn giản
  const renderFormattedText = (rawText) => {
    const lines = rawText.split('\n');
    return lines.map((line, lIdx) => {
      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={lIdx} className="font-bold text-torii dark:text-torii-light text-sm mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={lIdx} className="font-black text-torii dark:text-torii-light text-base mt-2.5 mb-1.5">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Blockquote
      if (line.startsWith('> ')) {
        return (
          <blockquote
            key={lIdx}
            className="my-1.5 pl-2.5 border-l-2 border-torii text-stone-700 dark:text-stone-300 italic text-xs bg-torii/5 py-1 rounded-r-md"
          >
            {line.replace('> ', '')}
          </blockquote>
        );
      }
      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemText = line.substring(2);
        return (
          <div key={lIdx} className="flex items-start gap-1.5 my-0.5 text-xs">
            <span className="text-torii dark:text-torii-light">•</span>
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={lIdx} className="h-1.5" />;
      }
      // Regular line
      return (
        <p
          key={lIdx}
          className="my-0.5 text-xs leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }}
        />
      );
    });
  };

  const formatInlineMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-stone-700 dark:text-stone-300">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-torii dark:text-torii-light font-mono text-[11px]">$1</code>');
  };

  return (
    <>
      {/* 1. NÚT NỔI LAUNCHER GIA SƯ KENJI SENSEI */}
      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40">
        <button
          onClick={() => {
            playWaterDrop();
            setIsOpen((prev) => !prev);
          }}
          className={`group flex items-center gap-2 p-2 sm:px-3.5 sm:py-2.5 rounded-full shadow-lg border-2 transition-all duration-300 cursor-pointer active:scale-95 ${
            isOpen
              ? 'bg-torii border-white/20 text-white shadow-torii/30 scale-95'
              : 'bg-white/90 dark:bg-stone-900/90 hover:bg-torii dark:hover:bg-torii text-stone-900 dark:text-white hover:text-white border-torii/40 dark:border-stone-700/80 hover:border-torii shadow-xl backdrop-blur-md'
          }`}
          title="Trò chuyện với Kenji Sensei (Gia sư AI tiếng Nhật)"
        >
          {/* Avatar Daruma / Sensei */}
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-500/10 dark:bg-rose-500/20 group-hover:bg-white/20 flex items-center justify-center transition-colors">
            <span className="text-base sm:text-lg">⛩️</span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full animate-pulse" />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="font-black text-xs font-ui leading-tight group-hover:text-white">
              Kenji Sensei
            </span>
            <span className="text-[10px] opacity-70 group-hover:text-white/80 leading-none">
              Gia sư AI tiếng Nhật
            </span>
          </div>

          {hasNewMessage && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-0 right-0" />
          )}
        </button>
      </div>

      {/* 2. CỬA SỔ CHAT SENSEI GLASSMORPHISM WIDGET */}
      {isOpen && (
        <div className="fixed bottom-14 right-2 sm:bottom-20 sm:right-5 w-[94vw] sm:w-[410px] h-[540px] max-h-[82vh] z-50 rounded-3xl karuta-card border-2 border-border-strong shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-fadeIn text-color-sumi">
          <div className="karuta-inner-border" />

          {/* Widget Header */}
          <div className="w-full px-4 py-3 border-b border-washi-border flex items-center justify-between bg-stone-100/70 dark:bg-stone-900/70 relative z-10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-torii text-white flex items-center justify-center text-sm shadow-xs font-bold">
                賢
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-torii">
                    Kenji Sensei (賢治先生)
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    AI Online
                  </span>
                </div>
                <div className="text-[10px] opacity-60">Gia sư 24/7 • N5 – N1</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  playWaterDrop();
                  setShowSettings((s) => !s);
                }}
                className={`p-1.5 rounded-lg transition-colors text-xs cursor-pointer ${
                  showSettings
                    ? 'bg-torii/15 text-torii'
                    : 'text-stone-500 hover:text-torii hover:bg-torii/10'
                }`}
                title="Cài đặt API Key"
              >
                ⚙️
              </button>
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-stone-500 hover:text-torii hover:bg-torii/10 transition-colors text-xs cursor-pointer"
                title="Xóa lịch sử đoạn chat"
              >
                🗑️
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-torii hover:bg-torii/10 font-bold transition-colors text-xs cursor-pointer"
                title="Đóng cửa sổ chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Context Banner */}
          {currentChar && (
            <div className="w-full px-3 py-1.5 bg-washi border-b border-washi-border text-[11px] flex items-center justify-between text-stone-600 dark:text-stone-300 relative z-10 shrink-0">
              <div className="flex items-center gap-1.5 truncate">
                <span>Chữ đang học:</span>
                <span className="font-kanji font-bold text-sm text-torii">
                  {currentChar}
                </span>
                {cardInfo?.hanViet && (
                  <span className="font-semibold opacity-80">({cardInfo.hanViet})</span>
                )}
              </div>
              <span className="px-1.5 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800 text-[10px] font-bold text-torii shrink-0">
                JLPT {currentLevel}
              </span>
            </div>
          )}

          {/* Settings Modal (Cài đặt Gemini API Key cá nhân) */}
          {showSettings && (
            <div className="p-3 bg-washi border-b border-washi-border text-xs flex flex-col gap-2 relative z-20 animate-fadeIn shrink-0">
              <div className="font-bold text-torii flex items-center justify-between">
                <span>🔑 Cài đặt Google Gemini API Key:</span>
                <button
                  onClick={() => setShowSettings(false)}
                  className="opacity-60 hover:opacity-100 text-[11px]"
                >
                  Đóng ✕
                </button>
              </div>
              <p className="text-[10px] opacity-70">
                Nếu bạn có API Key Gemini, hãy dán vào đây để nhận câu trả lời sinh động hơn. Nếu để trống, Sensei vẫn trả lời siêu tốc bằng Động cơ Tri thức Nội bộ!
              </p>
              <div className="flex items-center gap-1.5">
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={userApiKey}
                  onChange={(e) => setUserApiKey(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-xl bg-stone-100 dark:bg-stone-800 border border-washi-border focus:outline-torii"
                />
                <button
                  onClick={() => handleSaveApiKey(userApiKey)}
                  className="px-3 py-1.5 rounded-xl bg-torii text-white font-bold text-xs hover:opacity-90 cursor-pointer"
                >
                  Lưu
                </button>
              </div>
            </div>
          )}

          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 relative z-10 scrollbar-thin">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3 sm:p-3.5 shadow-2xs text-xs relative ${
                      isUser
                        ? 'bg-torii text-white rounded-br-xs'
                        : 'bg-washi/95 border border-washi-border text-color-sumi rounded-bl-xs'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-washi-border/60">
                        <span className="font-bold text-[10px] text-torii flex items-center gap-1">
                          <span>⛩️</span> Kenji Sensei
                        </span>
                        <button
                          onClick={() => handleSpeakJapanese(msg.text)}
                          className="p-1 rounded-md hover:bg-torii/10 text-torii transition-colors cursor-pointer"
                          title="Nghe phát âm tiếng Nhật trong câu này"
                        >
                          <VolumeIcon className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div className="space-y-1">
                      {isUser ? (
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        renderFormattedText(msg.text)
                      )}
                    </div>

                    <div
                      className={`text-[9px] mt-1 text-right ${
                        isUser ? 'text-white/70' : 'opacity-40'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-stone-500 italic p-2 animate-pulse">
                <span className="text-sm">⛩️</span>
                <span>Kenji Sensei đang tra cứu và suy nghĩ câu trả lời...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-3 py-1.5 bg-stone-100/60 dark:bg-stone-900/60 border-t border-washi-border flex items-center gap-1.5 overflow-x-auto scrollbar-none relative z-10 shrink-0">
            {currentChar && (
              <button
                onClick={() => handleSendMessage(`Giải thích chi tiết chữ 「${currentChar}」`)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-washi hover:bg-torii hover:text-white border border-washi-border transition-colors shrink-0 cursor-pointer"
              >
                ⛩️ Giải thích 「{currentChar}」
              </button>
            )}
            {currentChar && (
              <button
                onClick={() => handleSendMessage(`Mẹo nhớ chiết tự của chữ 「${currentChar}」 là gì?`)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-washi hover:bg-torii hover:text-white border border-washi-border transition-colors shrink-0 cursor-pointer"
              >
                💡 Mẹo nhớ chữ này
              </button>
            )}
            <button
              onClick={() => handleSendMessage(`Đặt 2 câu ví dụ thực tế cho cấp độ JLPT ${currentLevel}`)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-washi hover:bg-torii hover:text-white border border-washi-border transition-colors shrink-0 cursor-pointer"
            >
              ✍️ Đặt câu ví dụ JLPT {currentLevel}
            </button>
            <button
              onClick={() => handleSendMessage(`Những chữ Hán nào dễ nhầm lẫn nhất ở cấp độ ${currentLevel}?`)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-washi hover:bg-torii hover:text-white border border-washi-border transition-colors shrink-0 cursor-pointer"
            >
              ⚖️ Chữ dễ nhầm
            </button>
          </div>

          {/* Input Box */}
          <div className="p-2.5 sm:p-3 bg-washi border-t border-washi-border flex items-center gap-2 relative z-10 shrink-0">
            <input
              ref={inputRef}
              type="text"
              placeholder={`Hỏi Kenji Sensei về chữ 「${currentChar || 'Hán'}」, ngữ pháp...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-800 border border-washi-border focus:outline-torii text-color-sumi placeholder:opacity-50"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              className="px-3.5 py-2 rounded-xl bg-torii hover:bg-torii-dark text-white font-bold text-xs shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
              title="Gửi câu hỏi"
            >
              Gửi ➔
            </button>
          </div>
        </div>
      )}
    </>
  );
}
