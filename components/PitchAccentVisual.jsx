'use client';

import { getPitchAccent } from '../lib/pitchAccent';

/**
 * PitchAccentVisual - Modern NHK Tokyo Pitch Accent Component
 * Hiển thị nhãn trực quan và biểu đồ cao độ phát âm theo chuẩn NHK Tokyo:
 * - Heiban [0]: Xanh ngọc (Emerald)
 * - Atamadaka [1]: Đỏ hoa trà (Rose)
 * - Nakadaka [2+]: Vàng hổ phách (Amber)
 * - Odaka: Xanh chàm (Blue)
 */
export default function PitchAccentVisual({ word, reading = '', compact = false }) {
  if (!word && !reading) return null;

  const info = getPitchAccent(word, reading);
  if (!info) return null;

  const { pitch, type, name } = info;

  // Tách các âm tiết/mora từ cách đọc
  const rawReading = (reading || word || '').replace(/[・\s.]/g, '').split('、')[0].split('.')[0];
  const moras = [];
  for (let i = 0; i < rawReading.length; i++) {
    const ch = rawReading[i];
    const next = rawReading[i + 1];
    // Âm nhỏ ghép vào mora trước: ゃ, ゅ, ょ, ぁ, ぃ, ぅ, ぇ, ぉ, ゎ
    if (next && /[ゃゅょぁぃぅぇぉゎャュョァィゥェォヮ]/.test(next)) {
      moras.push(ch + next);
      i++;
    } else {
      moras.push(ch);
    }
  }

  // Xác định cao độ (High/Low) cho từng mora theo luật NHK Tokyo:
  // Heiban [0]: Low, High, High, High...
  // Atamadaka [1]: High, Low, Low, Low...
  // Nakadaka [k]: Low, High (tới k), Low (sau k)...
  // Odaka [k=moraLength]: Low, High, High... (hạ xuống ở trợ từ tiếp theo)
  const isHighArray = moras.map((_, idx) => {
    const pos = idx + 1; // 1-based index
    if (type === 'atamadaka') {
      return pos === 1;
    }
    if (type === 'heiban') {
      return pos > 1;
    }
    if (type === 'odaka') {
      return pos > 1;
    }
    // nakadaka
    return pos > 1 && pos <= pitch;
  });

  // Theme colors per type
  const colorMap = {
    heiban: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-500/30 dark:border-emerald-500/40',
      line: '#10B981',
      dot: '#059669',
    },
    atamadaka: {
      bg: 'bg-rose-500/10 dark:bg-rose-500/15',
      text: 'text-rose-700 dark:text-rose-400',
      border: 'border-rose-500/30 dark:border-rose-500/40',
      line: '#F43F5E',
      dot: '#E11D48',
    },
    nakadaka: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/15',
      text: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-500/30 dark:border-amber-500/40',
      line: '#F59E0B',
      dot: '#D97706',
    },
    odaka: {
      bg: 'bg-blue-500/10 dark:bg-blue-500/15',
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-500/30 dark:border-blue-500/40',
      line: '#3B82F6',
      dot: '#2563EB',
    },
  };

  const scheme = colorMap[type] || colorMap.heiban;

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold font-mono tracking-tight border ${scheme.bg} ${scheme.text} ${scheme.border}`}
        title={`Cao độ giọng NHK: ${name}`}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: scheme.dot }} />
        <span>{name}</span>
      </span>
    );
  }

  // Full visual graph with Mora dots & step curve
  return (
    <div className="flex flex-col gap-1 select-none">
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono border ${scheme.bg} ${scheme.text} ${scheme.border}`}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: scheme.dot }} />
          <span>{name}</span>
        </span>
        <span className="text-[10px] font-medium text-stone-400 dark:text-stone-500">NHK Accent</span>
      </div>

      {/* Mora pitch contour graph */}
      {moras.length > 0 && (
        <div className="flex items-end gap-1.5 pt-1 pb-0.5 px-1">
          {moras.map((mora, idx) => {
            const isHigh = isHighArray[idx];
            return (
              <div key={idx} className="flex flex-col items-center gap-0.5 group/mora">
                {/* High/Low Pitch Indicator Pill */}
                <div className="h-5 flex flex-col justify-between items-center w-5">
                  {isHigh ? (
                    <div
                      className="w-2.5 h-2.5 rounded-full shadow-2xs transition-transform group-hover/mora:scale-125"
                      style={{ backgroundColor: scheme.dot }}
                      title="Cao độ cao"
                    />
                  ) : (
                    <div className="h-2.5" />
                  )}

                  {!isHigh ? (
                    <div
                      className="w-2 h-2 rounded-full border-2 transition-transform group-hover/mora:scale-125"
                      style={{ borderColor: scheme.dot, backgroundColor: 'transparent' }}
                      title="Cao độ thấp"
                    />
                  ) : (
                    <div className="h-2" />
                  )}
                </div>

                {/* Mora Syllable Text */}
                <span className="text-[11px] sm:text-xs font-kanji font-bold text-stone-800 dark:text-stone-200">
                  {mora}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
