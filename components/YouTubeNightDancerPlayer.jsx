'use client';

import { useState, useEffect, useRef } from 'react';
import { VolumeIcon } from './ZenIcons';

export default function YouTubeNightDancerPlayer({
  isPlaying,
  onTogglePlay,
  activeTrackId = 'night_dancer_youtube',
  theme = 'yozakura',
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [isPillDismissed, setIsPillDismissed] = useState(false);
  const [volume, setVolume] = useState(70);
  const iframeRef = useRef(null);

  const shouldPlay = isPlaying && activeTrackId === 'night_dancer_youtube';

  // Khi người dùng bấm phát lần đầu tiên, cho phép mount iframe
  useEffect(() => {
    if (shouldPlay && !hasStartedOnce) {
      setHasStartedOnce(true);
    }
  }, [shouldPlay, hasStartedOnce]);

  // Điều khiển Play / Pause qua YouTube postMessage API
  useEffect(() => {
    if (!iframeRef.current || !hasStartedOnce) return;
    try {
      const command = shouldPlay ? 'playVideo' : 'pauseVideo';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
    } catch (e) {}
  }, [shouldPlay, hasStartedOnce]);

  // Điều khiển âm lượng qua postMessage API
  useEffect(() => {
    if (!iframeRef.current || !hasStartedOnce) return;
    try {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'setVolume', args: [volume] }),
        '*'
      );
    } catch (e) {}
  }, [volume, hasStartedOnce]);

  if (!hasStartedOnce) {
    return null;
  }

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 flex flex-col items-end gap-1.5 animate-fadeIn select-none">
      {/* Container chứa IFrame YouTube (Luôn duy trì trong DOM để nhạc không bị ngắt khi thu nhỏ / phóng to) */}
      <div
        className={`rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border-2 border-torii/40 shadow-2xl p-2.5 flex flex-col gap-2 backdrop-blur-md transition-all duration-300 origin-bottom-right ${
          isExpanded
            ? 'w-[300px] sm:w-[360px] opacity-100 scale-100 pointer-events-auto'
            : 'w-0 h-0 p-0 border-0 m-0 opacity-0 scale-95 pointer-events-none overflow-hidden'
        }`}
      >
        <div className="flex items-center justify-between pb-1 border-b border-washi-border">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs animate-spin">💿</span>
            <div className="min-w-0">
              <div className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                【imase】NIGHT DANCER（MV）
              </div>
              <div className="text-[10px] text-torii font-medium">Bản gốc chính thức từ YouTube</div>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(false)}
            className="w-5 h-5 rounded-md hover:bg-stone-200 dark:hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-xs font-bold cursor-pointer"
            title="Thu nhỏ thanh nghe nhạc"
          >
            ✕
          </button>
        </div>

        {/* Khung video 16:9 sắc nét */}
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative shadow-inner">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/kagoEGKHZvU?enablejsapi=1&autoplay=1&origin=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.origin : ''
            )}&loop=1&playlist=kagoEGKHZvU&playsinline=1`}
            title="【imase】NIGHT DANCER (MV)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Thanh điều khiển âm lượng và liên kết chính thức */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 flex-1">
            <VolumeIcon className="w-3.5 h-3.5 text-stone-500" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#BC002D]"
            />
            <span className="text-[10px] font-mono text-stone-500">{volume}%</span>
          </div>

          <a
            href="https://www.youtube.com/watch?v=kagoEGKHZvU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-torii hover:underline flex items-center gap-0.5 shrink-0"
          >
            <span>YouTube</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Floating Pill Mini Player (Thanh điều khiển thu nhỏ ở góc màn hình) */}
      {!isPillDismissed && (
        <div
          className={`flex items-center gap-2 p-1.5 pr-2.5 rounded-full border shadow-xl backdrop-blur-md transition-all ${
            isPlaying
              ? 'bg-[#FFFDF9]/95 dark:bg-[#161D27]/95 border-torii text-stone-900 dark:text-stone-100 shadow-torii/15'
              : 'bg-stone-100/90 dark:bg-stone-800/90 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
          }`}
        >
          {/* Nút Play / Pause */}
          <button
            onClick={onTogglePlay}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform active:scale-90 cursor-pointer shadow-xs ${
              isPlaying ? 'bg-torii text-white animate-spin' : 'bg-stone-300 dark:bg-stone-700 text-stone-700 dark:text-stone-200'
            }`}
            title={isPlaying ? 'Tạm dừng nhạc Night Dancer' : 'Tiếp tục phát'}
          >
            {isPlaying ? '💿' : '▶'}
          </button>

          {/* Tên bài hát & nút xem MV */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity"
            title="Bấm để xem video MV hoặc thu nhỏ"
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-bold leading-tight flex items-center gap-1">
                <span>imase - NIGHT DANCER</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-torii/15 text-torii font-mono">
                  YouTube MV
                </span>
              </span>
              <span className="text-[9px] text-stone-500 dark:text-stone-400 font-medium">
                {isPlaying ? 'Đang phát bản gốc MV • Nhấp để xem' : 'Đã tạm dừng'}
              </span>
            </div>

            {isPlaying && (
              <span className="flex items-center gap-0.5 ml-1">
                <span className="w-0.5 h-2.5 bg-torii rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 h-3.5 bg-torii rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-2 bg-torii rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </div>

          {/* Nút Phóng to / Thu nhỏ MV */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs opacity-60 hover:opacity-100 p-1 rounded-md hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
            title={isExpanded ? 'Ẩn màn hình video' : 'Mở rộng xem MV'}
          >
            {isExpanded ? '▼' : '▲'}
          </button>

          {/* Nút Ẩn thanh nổi này */}
          <button
            onClick={() => setIsPillDismissed(true)}
            className="text-xs opacity-40 hover:opacity-100 p-1 hover:text-red-500 rounded-md transition-colors cursor-pointer"
            title="Ẩn thanh này (nhạc vẫn tiếp tục phát trong nền)"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
