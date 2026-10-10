'use client';

// Bộ biểu tượng Vector phong cách Thiền Zen Nhật Bản (Zen Vector Icon System)
// Tối ưu SVG siêu nét, đồng bộ độ dày nét vẽ (stroke 1.8), tương thích hoàn hảo Light & Dark Mode.

export function SearchIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

export function SunIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4.5" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
    </svg>
  );
}

export function MoonIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" fillOpacity="0.2" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
      <circle cx="19.5" cy="9.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function MusicZenIcon({ className = 'w-4 h-4', playing = false, ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" fill={playing ? 'currentColor' : 'none'} fillOpacity="0.3" />
      <circle cx="18" cy="16" r="3" fill={playing ? 'currentColor' : 'none'} fillOpacity="0.3" />
      {playing && (
        <path d="M2 10c1.5-1 3-1 4.5 0M2 14c1.5-1 3-1 4.5 0" strokeWidth="1.5" opacity="0.7" />
      )}
    </svg>
  );
}

export function VolumeIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.15" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

export function VolumeMuteIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export function StatsIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <circle cx="18" cy="10" r="1.5" fill="currentColor" />
      <circle cx="6" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function WorksheetIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <line x1="12" y1="3" x2="12" y2="21" strokeDasharray="2 2" strokeWidth="1.2" />
      <line x1="4" y1="12" x2="20" y2="12" strokeDasharray="2 2" strokeWidth="1.2" />
      <path d="M8 8h1M15 8h1M8 16h1M15 16h1" strokeWidth="2" />
    </svg>
  );
}

export function MicShadowingIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" fill="currentColor" fillOpacity="0.2" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

export function BrushIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18.37 2.63a2.12 2.12 0 1 1 3 3L13 14l-4 1 1-4 8.37-8.37z" />
      <path d="M9 15l-4 4c-1.5 1.5-2 3-2 3s1.5-.5 3-2l4-4" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}

export function ShuffleIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  );
}

export function CardFlipIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="13" height="15" rx="2" fill="currentColor" fillOpacity="0.1" />
      <path d="M8 3h10a2 2 0 0 1 2 2v12" />
      <path d="M7 12.5h5M9.5 10l2.5 2.5-2.5 2.5" />
    </svg>
  );
}

export function GridIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function MindmapIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <line x1="7" y1="7" x2="10" y2="10" />
      <line x1="17" y1="7" x2="14" y2="10" />
      <line x1="7" y1="17" x2="10" y2="14" />
      <line x1="17" y1="17" x2="14" y2="14" />
    </svg>
  );
}

export function RadicalIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" fillOpacity="0.15" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <path d="M17 13v8M13 17h8" strokeWidth="2" />
    </svg>
  );
}

export function VocabIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="currentColor" fillOpacity="0.12" />
      <line x1="8" y1="6" x2="16" y2="6" strokeWidth="1.5" />
      <line x1="8" y1="10" x2="14" y2="10" strokeWidth="1.5" />
    </svg>
  );
}

export function MnemonicIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 3" />
      <path d="M8.5 4.5l1 1.5M15.5 4.5l-1 1.5" strokeWidth="1.5" />
    </svg>
  );
}

export function ArtIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="1.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 2.5 6 6 6 1 0 1.5-.5 2-1 .5-.5 1-1 2-1 3.5 0 6-2.5 6-6 0-4.5-3-8-6-8z" />
    </svg>
  );
}

export function ExampleQuoteIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2 0 4-1 6-1 8z" fill="currentColor" fillOpacity="0.15" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2 0 4-1 6-1 8z" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ChevronRightIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function ReviewRecallIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function MasteredCheckIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.15" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}

export function ToriiGateIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 5c6-1.5 14-1.5 20 0" strokeWidth="2.2" />
      <line x1="4" y1="8.5" x2="20" y2="8.5" strokeWidth="1.8" />
      <line x1="6.5" y1="8.5" x2="6.5" y2="21" strokeWidth="2.2" />
      <line x1="17.5" y1="8.5" x2="17.5" y2="21" strokeWidth="2.2" />
      <line x1="12" y1="5.5" x2="12" y2="8.5" strokeWidth="1.5" />
    </svg>
  );
}

export function SakuraFlowerIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* 5 cánh hoa anh đào nở rộ */}
      <circle cx="12" cy="12" r="2.2" fill="currentColor" fillOpacity="0.4" />
      <path d="M12 9.8C10.5 7.5 10 5.5 12 4c2 1.5 1.5 3.5 0 5.8z" fill="currentColor" fillOpacity="0.2" />
      <path d="M13.8 11.2C16 10 17.8 9.8 19 11.5c-1 2-3 1.8-5.2-.3z" fill="currentColor" fillOpacity="0.2" />
      <path d="M13.2 13.5C14.8 15.2 15.5 17 14 18.5c-1.8-.5-2.8-2-0.8-5z" fill="currentColor" fillOpacity="0.2" />
      <path d="M10.8 13.5C9.2 15.2 8.5 17 10 18.5c1.8-.5 2.8-2 .8-5z" fill="currentColor" fillOpacity="0.2" />
      <path d="M10.2 11.2C8 10 6.2 9.8 5 11.5c1 2 3 1.8 5.2-.3z" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function SparklesIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M18.36 5.64l-2.83 2.83M8.46 15.54l-2.83 2.83M5.64 5.64l2.83 2.83M15.54 15.54l2.83 2.83" strokeWidth="1.4" />
    </svg>
  );
}

export function CloseIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function CheckIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function MoreHorizontalIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Re-export bộ biểu tượng văn hóa Nhật Bản cao cấp từ game-icons
export * from './JapaneseCulturalIcons';

