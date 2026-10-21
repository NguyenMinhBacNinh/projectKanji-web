import { KANJI_EXTENDED_DICT, HAN_VIET_FALLBACK_MAP, MNEMONIC_FALLBACK_RULES, GLOSS_VI_DICT } from './kanjiExtendedDict';

let fullDatabaseCache = null;
let quizDatabaseCache = null;
const DICT_CACHE_PREFIX = 'kanji_live_dict_cache_v9_';
export const STORAGE_KEY_FORGOTTEN = 'kanji_washi_forgotten_cards_v2';
export const STORAGE_KEY_MASTERED = 'kanji_washi_mastered_cards_v2';

export async function loadFullDatabase() {
  if (fullDatabaseCache) return fullDatabaseCache;
  if (typeof window === 'undefined') return {};

  try {
    // Tự động dọn dẹp các cache cũ không có components hoặc chỉ có 4 từ vựng cũ trong localStorage
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('kanji_live_dict_cache_v1_') || k.startsWith('kanji_live_dict_cache_v2_') || k.startsWith('kanji_live_dict_cache_v3_') || k.startsWith('kanji_live_dict_cache_v4_') || k.startsWith('kanji_live_dict_cache_v5_') || k.startsWith('kanji_live_dict_cache_v6_') || k.startsWith('kanji_live_dict_cache_v7_') || k.startsWith('kanji_live_dict_cache_v8_'))) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (_) { }

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

export async function loadQuizDatabase() {
  if (quizDatabaseCache) return quizDatabaseCache;
  if (typeof window === 'undefined') return {};

  try {
    const res = await fetch('/quiz_data.json');
    if (res.ok) {
      quizDatabaseCache = await res.json();
      return quizDatabaseCache;
    }
  } catch (err) {
    console.warn('Could not load quiz database JSON:', err);
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

  // 1. Ưu tiên dữ liệu KANJI_EXTENDED_DICT nhưng đồng bộ câu ví dụ & từ vựng mới nhất từ database
  if (KANJI_EXTENDED_DICT[char]) {
    const ext = { ...KANJI_EXTENDED_DICT[char] };
    if (vocabList.length) ext.vocab = vocabList;
    if (dbItem && dbItem.level) ext.level = dbItem.level;
    if (dbItem && dbItem.components) {
      ext.components = dbItem.components;
      ext.equation = dbItem.equation;
      ext.illustration = dbItem.illustration;
      ext.primaryRadical = dbItem.primaryRadical || dbItem.components[0];
      if (dbItem.mnemonic) ext.mnemonic = dbItem.mnemonic;
    }
    if (dbItem && dbItem.example && dbItem.example.sentence && !dbItem.example.sentence.includes("と書きます") && !dbItem.example.sentence.includes("この漢字は")) {
      ext.example = dbItem.example;
      ext.exampleJp = dbItem.example.sentence;
      ext.exampleVn = dbItem.example.translation;
      ext.exampleReading = dbItem.example.reading || '';
    }
    return ext;
  }

  // 2. Dữ liệu chuẩn từ kanji_full_database.json (2219 chữ chuẩn của Minh Quang)
  if (dbItem) {
    const fallbackHV = HAN_VIET_FALLBACK_MAP[char] || "";
    const validHanViet = (dbItem.hanViet && dbItem.hanViet !== "HÁN TỰ" && dbItem.hanViet !== "HÁN") ? dbItem.hanViet : fallbackHV;
    const cleanOn = (dbItem.on && !dbItem.on.includes('Mazii') && !dbItem.on.includes('Jisho') && !dbItem.on.includes('Tra cứu')) ? dbItem.on : "—";
    const cleanKun = (dbItem.kun && !dbItem.kun.includes('Mazii') && !dbItem.kun.includes('Jisho') && !dbItem.kun.includes('Tra cứu')) ? dbItem.kun : "—";

    // Xây dựng câu ví dụ tự nhiên thực tế, tuyệt đối không dùng template máy móc
    let naturalExampleJp = dbItem.example ? dbItem.example.sentence : '';
    let naturalExampleVn = dbItem.example ? dbItem.example.translation : '';
    let naturalExampleReading = dbItem.example ? dbItem.example.reading : '';

    if (!naturalExampleJp || naturalExampleJp.includes("この漢字は") || naturalExampleJp.includes("と書きます")) {
      const topWord = vocabList[0]?.word || char;
      const topMeaning = vocabList[0]?.meaning_vi || validHanViet;
      naturalExampleJp = `「${topWord}」という言葉を覚えて、日常生活や会話で自然に使ってみましょう。`;
      naturalExampleVn = `Hãy ghi nhớ từ vựng 「${topWord}」 (${topMeaning}) để áp dụng linh hoạt vào giao tiếp đời sống hàng ngày.`;
      naturalExampleReading = `「${topWord}」ということばをおぼえて、にちじょうかいわでしぜんにつかってみましょう。`;
    }

    return {
      level: dbItem.level || 'N5',
      hanViet: validHanViet,
      on: cleanOn,
      kun: cleanKun,
      meaning: dbItem.meaning || `Chữ Hán: ${char}`,
      mnemonic: dbItem.mnemonic || `Chiết tự chữ '${char}': Nhìn kỹ các nét bút và bộ thủ cấu thành để tạo sự liên tưởng ghi nhớ bền lâu.`,
      components: dbItem.components || [char],
      equation: dbItem.equation || `Bộ ${char}`,
      illustration: dbItem.illustration || null,
      primaryRadical: dbItem.primaryRadical || (dbItem.components && dbItem.components.length ? dbItem.components[0] : char),
      vocab: vocabList.length ? vocabList : [
        { word: char, reading: '', meaning_vi: `Chữ ${char}`, jp: `<ruby>${char}<rt>...</rt></ruby>`, vn: `Chữ ${char}` }
      ],
      example: dbItem.example || { sentence: naturalExampleJp, translation: naturalExampleVn, reading: naturalExampleReading },
      exampleJp: naturalExampleJp,
      exampleVn: naturalExampleVn,
      exampleReading: naturalExampleReading
    };
  }

  // 3. Fallback map tự nhiên gắn liền với đời sống & học tập
  const fallbackHanViet = HAN_VIET_FALLBACK_MAP[char] || "";
  const autoMnemonic = MNEMONIC_FALLBACK_RULES[char] ||
    `Chiết tự chữ "${char}" (${fallbackHanViet}): Quan sát kỹ các nét bút và bộ thủ cấu thành để liên kết sinh động với ý nghĩa "${fallbackHanViet}".`;

  const topWord = vocabList[0]?.word || char;
  const naturalFallbackJp = `毎日の日本語学習の中で「${topWord}」の漢字を意識して、語彙力を少しずつ高めていきましょう。`;
  const naturalFallbackVn = `Hãy chú ý quan sát chữ Hán 「${topWord}」 (${fallbackHanViet}) trong học tập và đời sống để từng bước làm giàu vốn từ vựng.`;

  return {
    hanViet: fallbackHanViet,
    on: "—",
    kun: "—",
    meaning: `Chữ Hán: ${fallbackHanViet}`,
    mnemonic: autoMnemonic,
    components: [char],
    equation: `Bộ ${char}`,
    illustration: null,
    primaryRadical: char,
    vocab: [
      { word: char, reading: '', meaning_vi: `Chữ ${char}`, jp: `<ruby>${char}<rt>...</rt></ruby>`, vn: `Từ vựng chứa chữ ${fallbackHanViet}` }
    ],
    exampleJp: naturalFallbackJp,
    exampleVn: naturalFallbackVn,
    exampleReading: ''
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
      // Nếu cache cũ bị dính câu template máy móc thì xóa bỏ ngay lập tức!
      if (cached.exampleJp && (cached.exampleJp.includes("この漢字は") || cached.exampleJp.includes("と書きます"))) {
        localStorage.removeItem(cacheKey);
      } else {
        if (localFallback.vocab && localFallback.vocab.length && localFallback.vocab[0].reading !== '...') {
          cached.vocab = localFallback.vocab;
        }
        if (localFallback.components) {
          cached.components = localFallback.components;
          cached.equation = localFallback.equation;
          cached.illustration = localFallback.illustration;
          cached.primaryRadical = localFallback.primaryRadical;
        }
        if (localFallback.mnemonic) {
          cached.mnemonic = localFallback.mnemonic;
        }
        if (localFallback.exampleJp && !localFallback.exampleJp.includes("この漢字は") && !localFallback.exampleJp.includes("と書きます")) {
          cached.example = localFallback.example;
          cached.exampleJp = localFallback.exampleJp;
          cached.exampleVn = localFallback.exampleVn;
          cached.exampleReading = localFallback.exampleReading;
        }
        return cached;
      }
    }
  } catch (e) { }

  // Nếu local đã có đầy đủ câu ví dụ và dữ liệu chuẩn từ database, luôn luôn dùng dữ liệu chuẩn
  if (localFallback.exampleJp && !localFallback.exampleJp.includes("この漢字は") && !localFallback.exampleJp.includes("と書きます")) {
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
          if (vocabList.length >= 10) break;
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
        components: localFallback.components,
        equation: localFallback.equation,
        illustration: localFallback.illustration,
        primaryRadical: localFallback.primaryRadical,
        vocab: vocabList.length ? vocabList : localFallback.vocab,
        exampleJp: localFallback.exampleJp,
        exampleVn: localFallback.exampleVn,
        exampleReading: localFallback.exampleReading,
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

let cachedVoices = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Phát âm tiếng Nhật chuẩn và ổn định 100%:
 * - Tự động reset hàng đợi tránh bị đứng giọng trên Chrome/Safari
 * - Tự động phát hiện và chọn giọng tự nhiên chuẩn Tokyo (Kyoko / Otoya / Google 日本語 / Nanami)
 */
export function playJapaneseSpeech(text, rateOrReading = '') {
  if (typeof window === 'undefined') return;
  if (!('speechSynthesis' in window)) return;

  const readingStr = typeof rateOrReading === 'string' ? rateOrReading : '';
  const speechRate = typeof rateOrReading === 'number' ? rateOrReading : 0.92;

  const targetText = (text || readingStr || '').replace(/<[^>]+>/g, '').trim();
  if (!targetText) return;

  try {
    // 1. Reset hàng đợi tránh bị treo trên Chrome
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utterance = new SpeechSynthesisUtterance(targetText);
    utterance.lang = 'ja-JP';
    utterance.rate = speechRate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // 2. Lấy danh sách voice hiện có
    const voices = (cachedVoices && cachedVoices.length > 0)
      ? cachedVoices
      : window.speechSynthesis.getVoices();

    const jaVoices = voices.filter(
      (v) => v.lang && (v.lang === 'ja-JP' || v.lang.startsWith('ja'))
    );

    // Ưu tiên các giọng Tokyo tự nhiên cao cấp
    const bestVoice = jaVoices.find(
      (v) =>
        v.name.includes('Kyoko') ||
        v.name.includes('Otoya') ||
        v.name.includes('Google 日本語') ||
        v.name.includes('Nanami') ||
        v.name.includes('Natural')
    ) || jaVoices[0];

    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
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
