const fs = require('fs');
const path = require('path');
const { parseKanjiShadowingDrills, LEVEL_SHADOWING_DRILLS } = require('../lib/shadowingData');

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

console.log('=== TIẾN HÀNH KIỂM TRA TOÀN DIỆN HỆ THỐNG DỮ LIỆU AI SHADOWING ===');

const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
const levelStats = {
  N5: { count: 0, totalDrills: 0 },
  N4: { count: 0, totalDrills: 0 },
  N3: { count: 0, totalDrills: 0 },
  N2: { count: 0, totalDrills: 0 },
  N1: { count: 0, totalDrills: 0 }
};

let totalRecords = 0;
let templateFallbacksFound = 0;
let drillsWithoutReading = 0;
let drillsWithoutMeaning = 0;
let duplicateSentences = 0;

const sentenceSeen = new Map();
const rareVocabKanji = [];

Object.entries(db).forEach(([kanji, item]) => {
  totalRecords++;
  const lvl = item.level || 'N1';
  if (levelStats[lvl]) {
    levelStats[lvl].count++;
  }

  const drills = parseKanjiShadowingDrills(item, kanji, lvl);
  if (levelStats[lvl]) {
    levelStats[lvl].totalDrills += drills.length;
  }

  if (item.vocab && item.vocab.length < 3) {
    rareVocabKanji.push({ kanji, level: lvl, vocabCount: item.vocab.length });
  }

  drills.forEach(d => {
    if (d.jp.includes('書き順と意味をしっかりと覚えます')) {
      templateFallbacksFound++;
    }
    if (!d.reading || d.reading.length < 1) {
      drillsWithoutReading++;
    }
    if (!d.vn || d.vn.length < 1) {
      drillsWithoutMeaning++;
    }
    // Check if main sentence is duplicated
    if (d.id.startsWith('char_sent')) {
      if (sentenceSeen.has(d.jp)) {
        duplicateSentences++;
      } else {
        sentenceSeen.set(d.jp, kanji);
      }
    }
  });
});

console.log('--- KẾT QUẢ QUÉT 2,219 KANJI TOÀN DIỆN ---');
console.log(`- Tổng số Kanji đã kiểm tra: ${totalRecords}`);
console.log(`- Phân bổ theo cấp độ:`);
levels.forEach(lvl => {
  console.log(`  + ${lvl}: ${levelStats[lvl].count} chữ (Tổng ${levelStats[lvl].totalDrills} bài tập Shadowing riêng biệt)`);
});
console.log(`- Số câu template mẫu chung ('書き順と意味をしっかりと覚えます'): ${templateFallbacksFound}`);
console.log(`- Số bài tập thiếu cách đọc Hiragana: ${drillsWithoutReading}`);
console.log(`- Số bài tập thiếu nghĩa tiếng Việt: ${drillsWithoutMeaning}`);
console.log(`- Số câu ví dụ chính bị trùng lặp chéo giữa các chữ: ${duplicateSentences}`);
console.log(`- Số chữ Hán hiếm/tên riêng N1 chỉ có 1-2 từ ghép (bảo toàn nguyên gốc, không bịa từ giả): ${rareVocabKanji.length}`);

// Kiểm tra LEVEL_SHADOWING_DRILLS
console.log('\n--- KIỂM TRA BỘ BÀI TẬP CẤP ĐỘ (LEVEL TABS) ---');
levels.forEach(lvl => {
  const drills = LEVEL_SHADOWING_DRILLS[lvl] || [];
  console.log(`  + Tab ${lvl}: ${drills.length} câu giao tiếp chuyên sâu chuẩn Pitch Accent.`);
});
