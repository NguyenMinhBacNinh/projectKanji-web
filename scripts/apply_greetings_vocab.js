const fs = require('fs');
const path = require('path');
const { ALL_GREETINGS } = require('./greetings_dataset');

const vocabDataPath = path.resolve(__dirname, '../lib/vocabData.js');
let currentCode = fs.readFileSync(vocabDataPath, 'utf8');

// Parse current VOCAB_TOPICS and other items
const topicsStartIndex = currentCode.indexOf('export const VOCAB_TOPICS =');
const topicsEndIndex = currentCode.indexOf('export const VOCAB_DATA =');

if (topicsStartIndex === -1 || topicsEndIndex === -1) {
  console.error('Could not find VOCAB_TOPICS or VOCAB_DATA in lib/vocabData.js');
  process.exit(1);
}

const topicsCode = currentCode.slice(topicsStartIndex, topicsEndIndex).trim();

// Extract current VOCAB_DATA
const tempCode = currentCode.replace(/export const /g, 'const ');
eval(tempCode + '; global.VOCAB_DATA = VOCAB_DATA;');

const currentItems = global.VOCAB_DATA || [];
const otherTopicsItems = currentItems.filter(item => item.topic !== 'greetings');

console.log(`[i] Giữ nguyên ${otherTopicsItems.length} từ vựng thuộc các chủ đề khác (ẩm thực, đi lại, mua sắm...).`);
console.log(`[+] Bổ sung ${ALL_GREETINGS.length} câu/từ vựng Chào hỏi & Giao tiếp chuẩn N5-N1.`);

const combinedVocabData = [
  ...ALL_GREETINGS,
  ...otherTopicsItems
];

console.log(`[✓] Tổng cộng dữ liệu từ vựng mới: ${combinedVocabData.length} mục.`);

const newFileContent = `// Dữ liệu từ vựng tiếng Nhật cốt lõi (Tango - 単語)
// Phân loại theo cấp độ JLPT (N5 - N1) và theo Chủ đề thông dụng trong đời sống Nhật Bản.
// Kho ngữ cảnh Chào hỏi & Giao tiếp phong phú hơn 200 câu/từ vựng chuẩn thực tiễn.

${topicsCode}

export const VOCAB_DATA = ${JSON.stringify(combinedVocabData, null, 2)};
`;

fs.writeFileSync(vocabDataPath, newFileContent, 'utf8');
console.log('[✓] Đã cập nhật thành công lib/vocabData.js!');
