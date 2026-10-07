import { KANJI_EXTENDED_DICT, HAN_VIET_FALLBACK_MAP, MNEMONIC_FALLBACK_RULES, GLOSS_VI_DICT } from './kanjiExtendedDict';

let fullDatabaseCache = null;
const DICT_CACHE_PREFIX = 'kanji_live_dict_cache_v2_';
export const STORAGE_KEY_FORGOTTEN = 'kanji_washi_forgotten_cards_v2';
export const STORAGE_KEY_MASTERED = 'kanji_washi_mastered_cards_v2';

export async function loadFullDatabase() {
  if (fullDatabaseCache) return fullDatabaseCache;
  if (typeof window === 'undefined') return {};

  try {
    const res = await fetch('/kanji_full_database.json');
    if (res.ok) {
      fullDatabaseCache = await res.json();
      return fullDatabaseCache;
    }
  } catch (err) {
    console.warn('Could not load full kanji database JSON:', err);
  }
  return {};
}

export function translateGloss(enGloss) {
  if (!enGloss) return "";
  const lower = enGloss.toLowerCase().trim();
  if (GLOSS_VI_DICT[lower]) return GLOSS_VI_DICT[lower];
  for (const k of Object.keys(GLOSS_VI_DICT)) {
    if (lower.includes(k)) return GLOSS_VI_DICT[k];
  }
  return enGloss;
}

export function getLocalKanjiInfo(char, fullDb = null) {
  const db = fullDb || fullDatabaseCache;
  const dbItem = db && db[char] ? db[char] : null;
  const hasDbVocab = dbItem && dbItem.vocab && dbItem.vocab.length && dbItem.vocab[0].reading && dbItem.vocab[0].reading !== '...';

  let vocabList = [];
  if (hasDbVocab) {
    vocabList = dbItem.vocab.map(v => ({
      word: v.word || v.jp || '',
      reading: (v.reading && v.reading !== '...') ? v.reading : '',
      meaning_vi: v.meaning_vi || v.meaning || '',
      jp: `<ruby>${v.word || v.jp}<rt>${(v.reading && v.reading !== '...') ? v.reading : ''}</rt></ruby>`,
      vn: v.meaning_vi || v.meaning || ''
    }));
  } else if (KANJI_EXTENDED_DICT[char] && KANJI_EXTENDED_DICT[char].vocab) {
    vocabList = KANJI_EXTENDED_DICT[char].vocab.map(v => ({
      word: v.word || (v.jp ? v.jp.replace(/<[^>]+>/g, '') : ''),
      reading: v.reading || '',
      meaning_vi: v.meaning_vi || v.vn || '',
      jp: v.jp || `<ruby>${v.word}<rt>${v.reading || ''}</rt></ruby>`,
      vn: v.vn || v.meaning_vi || ''
    }));
  } else if (dbItem && dbItem.vocab) {
    vocabList = dbItem.vocab.map(v => ({
      word: v.word || v.jp || char,
      reading: (v.reading && v.reading !== '...') ? v.reading : '',
      meaning_vi: v.meaning_vi || v.meaning || `Chữ ${char}`,
      jp: `<ruby>${v.word || v.jp}<rt>${(v.reading && v.reading !== '...') ? v.reading : ''}</rt></ruby>`,
      vn: v.meaning_vi || v.meaning || `Chữ ${char}`
    }));
  }

  // 1. Ưu tiên dữ liệu biên soạn chi tiết
  if (KANJI_EXTENDED_DICT[char]) {
    const ext = { ...KANJI_EXTENDED_DICT[char] };
    if (vocabList.length) ext.vocab = vocabList;
    return ext;
  }

  // 2. Dữ liệu từ kanji_full_database.json
  if (dbItem) {
    const fallbackHV = HAN_VIET_FALLBACK_MAP[char] || "";
    const validHanViet = (dbItem.hanViet && dbItem.hanViet !== "HÁN TỰ" && dbItem.hanViet !== "HÁN") ? dbItem.hanViet : fallbackHV;
    const cleanOn = (dbItem.on && !dbItem.on.includes('Mazii') && !dbItem.on.includes('Jisho') && !dbItem.on.includes('Tra cứu')) ? dbItem.on : "—";
    const cleanKun = (dbItem.kun && !dbItem.kun.includes('Mazii') && !dbItem.kun.includes('Jisho') && !dbItem.kun.includes('Tra cứu')) ? dbItem.kun : "—";

    return {
      hanViet: validHanViet,
      on: cleanOn,
      kun: cleanKun,
      meaning: dbItem.meaning || `Chữ Hán: ${char}`,
      mnemonic: dbItem.mnemonic || `Chiết tự chữ '${char}': Nhìn kỹ các nét bút và bộ thủ cấu thành để tạo sự liên tưởng ghi nhớ bền lâu.`,
      vocab: vocabList.length ? vocabList : [
        { word: char, reading: '', meaning_vi: `Chữ ${char}`, jp: `<ruby>${char}<rt>...</rt></ruby>`, vn: `Chữ ${char}` }
      ],
      exampleJp: dbItem.example ? dbItem.example.sentence : `この<ruby>漢字<rt>かんじ</rt></ruby>は「<ruby>${char}<rt></rt></ruby>」です。`,
      exampleVn: dbItem.example ? dbItem.example.translation : `Chữ Hán này được viết là chữ ${char}.`
    };
  }

  // 3. Fallback map
  const fallbackHanViet = HAN_VIET_FALLBACK_MAP[char] || "";
  const autoMnemonic = MNEMONIC_FALLBACK_RULES[char] ||
    `Chiết tự chữ "${char}" (${fallbackHanViet}): Quan sát kỹ các nét bút và bộ thủ cấu thành để liên kết sinh động với ý nghĩa "${fallbackHanViet}".`;

  return {
    hanViet: fallbackHanViet,
    on: "—",
    kun: "—",
    meaning: `Chữ Hán: ${fallbackHanViet}`,
    mnemonic: autoMnemonic,
    vocab: [
      { word: char, reading: '', meaning_vi: `Chữ ${char}`, jp: `<ruby>${char}<rt>...</rt></ruby>`, vn: `Từ vựng chứa chữ ${fallbackHanViet}` }
    ],
    exampleJp: `この<ruby>漢字<rt>かんじ</rt></ruby>は「<ruby>${char}<rt></rt></ruby>」です。`,
    exampleVn: `Chữ Kanji này là chữ ${fallbackHanViet}.`
  };
}

export async function fetchLiveKanjiInfo(char, level, fullDb = null) {
  const localFallback = getLocalKanjiInfo(char, fullDb);
  if (typeof window === 'undefined') return localFallback;

  const cacheKey = DICT_CACHE_PREFIX + char;
  try {
    const cachedStr = localStorage.getItem(cacheKey);
    if (cachedStr) {
      const cached = JSON.parse(cachedStr);
      if (localFallback.vocab && localFallback.vocab.length && localFallback.vocab[0].reading !== '...') {
        cached.vocab = localFallback.vocab;
      }
      return cached;
    }
  } catch (e) { }

  // Nếu local đã có đầy đủ On/Kun chuẩn, không cần gọi mạng
  if (localFallback.on && localFallback.on !== "—" && localFallback.kun && localFallback.kun !== "—") {
    return localFallback;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const [kanjiRes, wordsRes] = await Promise.all([
      fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(char)}`, { signal: controller.signal }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`https://kanjiapi.dev/v1/words/${encodeURIComponent(char)}`, { signal: controller.signal }).then(r => r.ok ? r.json() : null).catch(() => null)
    ]);
    clearTimeout(timeout);

    if (kanjiRes) {
      const onStr = (kanjiRes.on_readings && kanjiRes.on_readings.length) ? kanjiRes.on_readings.join('、') : null;
      const kunStr = (kanjiRes.kun_readings && kanjiRes.kun_readings.length) ? kanjiRes.kun_readings.join('、') : null;
      const enMean = (kanjiRes.meanings && kanjiRes.meanings.length) ? kanjiRes.meanings[0] : "";
      const vnMean = translateGloss(enMean);

      let vocabList = localFallback.vocab || [];
      if ((!vocabList.length || vocabList[0].reading === '...') && wordsRes && Array.isArray(wordsRes)) {
        vocabList = [];
        for (const w of wordsRes) {
          if (vocabList.length >= 4) break;
          const written = w.variants && w.variants[0] ? w.variants[0].written : "";
          const pronounced = w.variants && w.variants[0] ? w.variants[0].pronounced : "";
          const glossEn = (w.meanings && w.meanings[0] && w.meanings[0].glosses) ? w.meanings[0].glosses[0] : "";
          const glossVn = translateGloss(glossEn);

          if (written && written.includes(char)) {
            vocabList.push({
              word: written,
              reading: pronounced,
              meaning_vi: glossVn ? `${glossVn} (${glossEn})` : glossEn,
              jp: `<ruby>${written}<rt>${pronounced}</rt></ruby>`,
              vn: glossVn ? `${glossVn} (${glossEn})` : glossEn
            });
          }
        }
      }

      const enriched = {
        kanji: char,
        level: level,
        hanViet: localFallback.hanViet || "HÁN TỰ",
        on: onStr || localFallback.on,
        kun: kunStr || localFallback.kun,
        meaning: vnMean ? `${vnMean} (${enMean})` : localFallback.meaning,
        mnemonic: localFallback.mnemonic,
        vocab: vocabList.length ? vocabList : localFallback.vocab,
        exampleJp: localFallback.exampleJp,
        exampleVn: localFallback.exampleVn,
      };

      try {
        localStorage.setItem(cacheKey, JSON.stringify(enriched));
      } catch (e) { }

      return enriched;
    }
  } catch (err) {
    // fallback
  }

  return localFallback;
}

export function playJapaneseSpeech(text) {
  if (typeof window === 'undefined') return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
}

export function getForgottenKanji() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_FORGOTTEN)) || [];
  } catch {
    return [];
  }
}

export function saveForgottenKanji(list) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_FORGOTTEN, JSON.stringify(list));
}

export function getMasteredKanji() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_MASTERED)) || [];
  } catch {
    return [];
  }
}

export function saveMasteredKanji(list) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_MASTERED, JSON.stringify(list));
}
