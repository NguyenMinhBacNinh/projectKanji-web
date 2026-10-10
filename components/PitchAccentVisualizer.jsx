'use client';

import { getPitchAccent } from '../lib/pitchAccent';

export default function PitchAccentVisualizer({ word, reading }) {
  const info = getPitchAccent(word, reading);
  if (!info) return null;

  const typeColors = {
    heiban: 'text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 dark:bg-emerald-500/25 border-emerald-600/30 dark:border-emerald-400/40',
    atamadaka: 'text-rose-800 dark:text-rose-300 bg-rose-500/15 dark:bg-rose-500/25 border-rose-600/30 dark:border-rose-400/40',
    nakadaka: 'text-amber-900 dark:text-amber-300 bg-amber-500/15 dark:bg-amber-500/25 border-amber-600/30 dark:border-amber-400/40',
    odaka: 'text-blue-800 dark:text-blue-300 bg-blue-500/15 dark:bg-blue-500/25 border-blue-600/30 dark:border-blue-400/40',
  };

  const badgeStyle = typeColors[info.type] || 'text-stone-700 dark:text-stone-300 bg-stone-200/60 dark:bg-stone-800 border-stone-300 dark:border-stone-700';

  return (
    <span
      className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded border ${badgeStyle} tracking-tight select-none shadow-2xs`}
      title={`Cao độ phát âm Tokyo (Pitch Accent): ${info.name}`}
    >
      <span className="opacity-75">♪</span>
      <span>{info.name}</span>
    </span>
  );
}
