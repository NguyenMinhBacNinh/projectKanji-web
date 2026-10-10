// Bảng tra cứu & mô phỏng Cao độ giọng tiếng Nhật (Pitch Accent - アクセント)
// Dựa trên Từ điển phát âm NHK (NHK日本語発音アクセント新辞典) - javdejong/nhk-pronunciation
import NHK_PITCH_MAP from '../data/nhk_pitch_accents.json';

// Danh sách dự phòng các từ cơ bản
export const PITCH_ACCENT_DB = {
  '一つ': { pitch: 2, type: 'nakadaka', name: 'Trung cao [2]' },
  '一人': { pitch: 2, type: 'nakadaka', name: 'Trung cao [2]' },
  '一月': { pitch: 4, type: 'odaka', name: 'Vĩ cao [4]' },
  '一日': { pitch: 4, type: 'odaka', name: 'Vĩ cao [4]' },
  '二つ': { pitch: 3, type: 'odaka', name: 'Vĩ cao [3]' },
  '二人': { pitch: 0, type: 'heiban', name: 'Bình bản [0]' },
  '三つ': { pitch: 3, type: 'odaka', name: 'Vĩ cao [3]' },
  '三人': { pitch: 3, type: 'odaka', name: 'Vĩ cao [3]' },
  '四つ': { pitch: 3, type: 'odaka', name: 'Vĩ cao [3]' },
  '五つ': { pitch: 2, type: 'nakadaka', name: 'Trung cao [2]' },
  '六つ': { pitch: 3, type: 'odaka', name: 'Vĩ cao [3]' },
  '七つ': { pitch: 2, type: 'nakadaka', name: 'Trung cao [2]' },
  '八つ': { pitch: 3, type: 'odaka', name: 'Vĩ cao [3]' },
  '九つ': { pitch: 2, type: 'nakadaka', name: 'Trung cao [2]' },
  '十': { pitch: 1, type: 'atamadaka', name: 'Đầu cao [1]' },
  '百': { pitch: 2, type: 'odaka', name: 'Vĩ cao [2]' },
  '千': { pitch: 1, type: 'atamadaka', name: 'Đầu cao [1]' },
  '万': { pitch: 1, type: 'atamadaka', name: 'Đầu cao [1]' },
  '円': { pitch: 1, type: 'atamadaka', name: 'Đầu cao [1]' },
};

/**
 * Chuyển Katakana sang Hiragana
 */
function toHiragana(str) {
  if (!str) return '';
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

/**
 * Đếm số âm tiết (Mora) trong Hiragana/Katakana
 */
export function countMoras(kana) {
  if (!kana) return 1;
  const smallKanaRegex = /[ぁぃぅぇぉゃゅょゎァィゥェォャュョヮ]/g;
  return Math.max(1, kana.replace(smallKanaRegex, '').length);
}

function isKanjiOnly(str) {
  return /^[\u4e00-\u9faf]+$/.test(str);
}

/**
 * Định dạng số cao độ thành cấu trúc chi tiết
 */
function formatPitchResult(pitch, moraLength) {
  if (pitch === 0) {
    return { pitch: 0, type: 'heiban', name: 'Bình bản [0]' };
  }
  if (pitch === 1) {
    return { pitch: 1, type: 'atamadaka', name: 'Đầu cao [1]' };
  }
  if (moraLength > 1 && pitch >= moraLength) {
    return { pitch, type: 'odaka', name: `Vĩ cao [${pitch}]` };
  }
  return { pitch, type: 'nakadaka', name: `Trung cao [${pitch}]` };
}

/**
 * Lấy thông tin cao độ giọng (Pitch Accent) cho một từ tiếng Nhật chuẩn NHK
 */
export function getPitchAccent(word, reading = '') {
  if (!word) return null;

  const cleanWord = word.replace(/[・\s]/g, '');
  const cleanReading = reading.replace(/[・\s.]/g, '').split('、')[0].split('.')[0];
  const hiraReading = toHiragana(cleanReading);
  const moraLength = countMoras(cleanReading || cleanWord);

  // 1. Tra cứu trực tiếp từ Database chuẩn NHK (hơn 179.000 từ vựng)
  if (NHK_PITCH_MAP) {
    // Thử theo Kanji chính xác
    if (NHK_PITCH_MAP[cleanWord] !== undefined) {
      return formatPitchResult(NHK_PITCH_MAP[cleanWord], moraLength);
    }
    // Thử theo cách đọc Hiragana
    if (hiraReading && NHK_PITCH_MAP[hiraReading] !== undefined) {
      return formatPitchResult(NHK_PITCH_MAP[hiraReading], moraLength);
    }
    // Thử theo cách đọc gốc
    if (cleanReading && NHK_PITCH_MAP[cleanReading] !== undefined) {
      return formatPitchResult(NHK_PITCH_MAP[cleanReading], moraLength);
    }
  }

  // 2. Tra cứu từ bảng dự phòng PITCH_ACCENT_DB
  if (PITCH_ACCENT_DB[cleanWord]) {
    return PITCH_ACCENT_DB[cleanWord];
  }

  // 3. Quy luật suy luận ngữ âm Tokyo thông minh (fallback khi từ không có trong từ điển)
  if (moraLength <= 1) {
    return { pitch: 1, type: 'atamadaka', name: 'Đầu cao [1]' };
  }
  if (cleanWord.length === 2 && isKanjiOnly(cleanWord)) {
    return { pitch: 0, type: 'heiban', name: 'Bình bản [0]' };
  }

  return { pitch: 0, type: 'heiban', name: 'Bình bản [0]' };
}
