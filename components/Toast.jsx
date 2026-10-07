'use client';

export default function Toast({ toast }) {
  if (!toast || !toast.visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-sumi text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 z-50 border border-washi-border/20 transition-all duration-300 animate-bounce">
      <span>{toast.icon || '🌸'}</span>
      <span>{toast.message}</span>
    </div>
  );
}
