const fs = require('fs');
const path = require('path');

console.log('=== BẮT ĐẦU NÂNG CẤP TỪ VỰNG KANJI TỪ 4 LÊN 8-10 TỪ ===');

const projectRoot = path.resolve(__dirname, '..');
const dbJsonPath = path.join(projectRoot, 'public/kanji_full_database.json');
const rootDbJsonPath = path.join(projectRoot, 'kanji_full_database.json');
const rootDbJsPath = path.join(projectRoot, 'kanji_full_database.js');
const jmdictXmlPath = path.join(projectRoot, 'data/JMdict_e.xml');
const vettedPath = path.join(projectRoot, 'data/vetted_vocab_dict.json');
const glossCachePath = path.join(projectRoot, 'data/gloss_translation_cache.json');
const quizDataPath = path.join(projectRoot, 'public/quiz_data.json');

// 1. Nạp cơ sở dữ liệu hiện tại
const db = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
const kanjiList = Object.keys(db);
console.log(`[✓] Đã nạp database: ${kanjiList.length} chữ Kanji.`);

// 2. Nạp từ điển kiểm duyệt & cache dịch thuật
let vettedDict = {};
if (fs.existsSync(vettedPath)) {
  vettedDict = JSON.parse(fs.readFileSync(vettedPath, 'utf8'));
  console.log(`[✓] Đã nạp vetted_vocab_dict: ${Object.keys(vettedDict).length} từ.`);
}

let glossCache = {};
if (fs.existsSync(glossCachePath)) {
  glossCache = JSON.parse(fs.readFileSync(glossCachePath, 'utf8').replace(/^\uFEFF/, ''));
  console.log(`[✓] Đã nạp gloss_translation_cache: ${Object.keys(glossCache).length} mục.`);
}

// 3. Nạp từ vựng chuẩn từ Quiz Database (830+ từ N5-N1 có nghĩa tiếng Việt rất chuẩn)
const quizWordMap = {};
if (fs.existsSync(quizDataPath)) {
  const quizData = JSON.parse(fs.readFileSync(quizDataPath, 'utf8').replace(/^\uFEFF/, ''));
  for (const lvl in quizData) {
    if (Array.isArray(quizData[lvl])) {
      quizData[lvl].forEach((item) => {
        if (item.word && item.targetReading && item.targetMeaning) {
          quizWordMap[item.word] = {
            reading: item.targetReading,
            meaning: item.targetMeaning,
          };
        }
      });
    }
  }
  console.log(`[✓] Đã nạp từ điển Quiz Database: ${Object.keys(quizWordMap).length} từ.`);
}

// 4. Bảng từ điển dịch Anh - Việt chất lượng cao cho các thuật ngữ thường gặp
const COMMON_EN_VI = {
  'one person': 'một người',
  'alone': 'một mình, đơn độc',
  'whole life': 'cả cuộc đời, trọn đời',
  'lifetime': 'cả đời, cuộc đời',
  'best': 'tốt nhất, số một, nhất',
  'first': 'đầu tiên, thứ nhất',
  'together': 'cùng nhau, cùng với',
  'general': 'thông thường, phổ biến, chung',
  'moment': 'một khoảnh khắc, chớp mắt',
  'part': 'một phần, bộ phận',
  'everyone': 'mọi người, tất cả',
  'all': 'tất cả, toàn bộ',
  'always': 'luôn luôn, lúc nào cũng',
  'sometimes': 'thỉnh thoảng, đôi khi',
  'future': 'tương lai',
  'past': 'quá khứ',
  'present': 'hiện tại',
  'society': 'xã hội',
  'world': 'thế giới',
  'country': 'đất nước, quốc gia',
  'city': 'thành phố',
  'nature': 'tự nhiên, thiên nhiên',
  'culture': 'văn hóa',
  'history': 'lịch sử',
  'science': 'khoa học',
  'education': 'giáo dục',
  'economy': 'kinh tế',
  'politics': 'chính trị',
  'family': 'gia đình',
  'friend': 'bạn bè',
  'teacher': 'thầy cô giáo',
  'student': 'học sinh, sinh viên',
  'doctor': 'bác sĩ',
  'hospital': 'bệnh viện',
  'company': 'công ty',
  'president': 'chủ tịch, giám đốc',
  'employee': 'nhân viên',
  'meeting': 'cuộc họp',
  'work': 'công việc, làm việc',
  'telephone': 'điện thoại',
  'computer': 'máy tính',
  'letter': 'bức thư',
  'newspaper': 'báo chí',
  'book': 'sách, cuốn sách',
  'movie': 'bộ phim, phim ảnh',
  'music': 'âm nhạc',
  'song': 'bài hát',
  'food': 'thức ăn, món ăn',
  'drink': 'đồ uống',
  'water': 'nước',
  'fire': 'ngọn lửa',
  'wind': 'cơn gió',
  'earth': 'mặt đất, trái đất',
  'sky': 'bầu trời',
  'mountain': 'ngọn núi',
  'river': 'dòng sông',
  'sea': 'biển cả',
  'rain': 'cơn mưa',
  'snow': 'tuyết',
  'flower': 'bông hoa',
  'tree': 'cây cối',
  'sun': 'mặt trời',
  'moon': 'mặt trăng',
  'star': 'ngôi sao',
  'morning': 'buổi sáng',
  'afternoon': 'buổi chiều',
  'evening': 'buổi tối',
  'night': 'ban đêm',
  'today': 'hôm nay',
  'tomorrow': 'ngày mai',
  'yesterday': 'hôm qua',
  'week': 'tuần',
  'month': 'tháng',
  'year': 'năm',
  'time': 'thời gian',
  'station': 'nhà ga',
  'train': 'tàu điện, xe lửa',
  'car': 'xe ô tô',
  'bicycle': 'xe đạp',
  'plane': 'máy bay',
  'airplane': 'máy bay',
  'airport': 'sân bay',
  'road': 'con đường',
  'street': 'đường phố',
  'bridge': 'cây cầu',
  'house': 'ngôi nhà',
  'room': 'căn phòng',
  'door': 'cánh cửa',
  'window': 'cửa sổ',
  'money': 'tiền bạc',
  'price': 'giá cả',
  'shop': 'cửa hàng',
  'store': 'cửa tiệm',
  'convenience store': 'cửa hàng tiện lợi',
  'supermarket': 'siêu thị',
  'restaurant': 'nhà hàng, quán ăn',
  'cafe': 'quán cà phê',
  'hotel': 'khách sạn',
  'travel': 'du lịch',
  'trip': 'chuyến đi, chuyến du lịch',
  'vacation': 'kỳ nghỉ',
  'holiday': 'ngày lễ, ngày nghỉ',
  'spring': 'mùa xuân',
  'summer': 'mùa hè',
  'autumn': 'mùa thu',
  'winter': 'mùa đông',
  'season': 'mùa',
  'weather': 'thời tiết',
  'temperature': 'nhiệt độ',
  'hot': 'nóng, nóng nực',
  'cold': 'lạnh, lạnh giá',
  'warm': 'ấm áp',
  'cool': 'mát mẻ',
  'big': 'to lớn',
  'small': 'nhỏ bé',
  'high': 'cao, đắt',
  'low': 'thấp',
  'long': 'dài, lâu',
  'short': 'ngắn',
  'new': 'mới',
  'old': 'cũ, già',
  'good': 'tốt, đẹp, hay',
  'bad': 'xấu, tệ',
  'right': 'đúng / bên phải',
  'left': 'bên trái',
  'front': 'phía trước',
  'back': 'phía sau, lưng',
  'inside': 'bên trong',
  'outside': 'bên ngoài',
  'up': 'phía trên',
  'down': 'phía dưới',
  'middle': 'ở giữa, trung tâm',
  'near': 'gần',
  'far': 'xa',
  'easy': 'dễ dàng',
  'difficult': 'khó khăn',
  'interesting': 'thú vị',
  'important': 'quan trọng',
  'safe': 'an toàn',
  'dangerous': 'nguy hiểm',
  'convenient': 'tiện lợi',
  'famous': 'nổi tiếng',
  'beautiful': 'xinh đẹp, đẹp đẽ',
  'healthy': 'khỏe mạnh',
  'busy': 'bận rộn',
  'free': 'rảnh rỗi / miễn phí',
  'quiet': 'yên tĩnh',
  'noisy': 'ồn ào',
  'bright': 'sáng sủa',
  'dark': 'tối tăm',
  'fast': 'nhanh',
  'slow': 'chậm',
  'early': 'sớm',
  'late': 'muộn, trễ',
};

// Hàm dịch gloss tiếng Anh sang tiếng Việt súc tích
function translateGloss(word, gloss, hanViet) {
  if (vettedDict[word]) return vettedDict[word];
  if (quizWordMap[word]) return quizWordMap[word].meaning;

  const cleanGloss = (gloss || '')
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/^to\s+/, '')
    .trim();

  // Thử khớp nguyên cụm
  if (glossCache[cleanGloss]) return glossCache[cleanGloss];
  if (COMMON_EN_VI[cleanGloss]) return COMMON_EN_VI[cleanGloss];

  // Thử các nghĩa đơn phân tách bởi dấu ;
  const parts = cleanGloss.split(/;\s*/);
  for (const p of parts) {
    const trimmed = p.trim();
    if (glossCache[trimmed]) return glossCache[trimmed];
    if (COMMON_EN_VI[trimmed]) return COMMON_EN_VI[trimmed];
  }

  // Nếu có từ đầu tiên trong COMMON_EN_VI
  const firstWord = cleanGloss.split(/\s+/)[0];
  if (COMMON_EN_VI[firstWord]) return COMMON_EN_VI[firstWord];

  // Nếu có nghĩa trong glossCache dạng substring
  for (const k in glossCache) {
    if (cleanGloss.startsWith(k)) return glossCache[k];
  }

  // Fallback có nghĩa
  if (parts[0] && parts[0].length < 35) {
    return parts[0];
  }

  return hanViet ? `Từ ghép Hán tự (${hanViet})` : word;
}

// 5. Quét toàn bộ JMdict một lần duy nhất
console.log('[*] Đang phân tích từ điển JMdict (63 MB)...');
const kanjiSet = new Set(kanjiList);
const candidatesByKanji = {};
kanjiList.forEach((k) => (candidatesByKanji[k] = []));

const jmdictContent = fs.readFileSync(jmdictXmlPath, 'utf8');
const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
let match;
let totalEntries = 0;

while ((match = entryRegex.exec(jmdictContent)) !== null) {
  totalEntries++;
  const entryStr = match[1];
  if (!entryStr.includes('<keb>')) continue;

  // Lấy danh sách kebs
  const kebs = [];
  const kebRegex = /<keb>(.*?)<\/keb>/g;
  let km;
  while ((km = kebRegex.exec(entryStr)) !== null) kebs.push(km[1]);

  // Lấy danh sách rebs
  const rebs = [];
  const rebRegex = /<reb>(.*?)<\/reb>/g;
  let rm;
  while ((rm = rebRegex.exec(entryStr)) !== null) rebs.push(rm[1]);

  // Lấy priority tags
  const pris = [];
  const priRegex = /<(?:ke|re)_pri>(.*?)<\/(?:ke|re)_pri>/g;
  let pm;
  while ((pm = priRegex.exec(entryStr)) !== null) pris.push(pm[1]);

  // Lấy glosses
  const glosses = [];
  const glossRegex = /<gloss>(.*?)<\/gloss>/g;
  let gm;
  while ((gm = glossRegex.exec(entryStr)) !== null) glosses.push(gm[1]);

  const isRare =
    entryStr.includes('&arch;') ||
    entryStr.includes('&rare;') ||
    entryStr.includes('&obsc;') ||
    entryStr.includes('&sl;') ||
    entryStr.includes('&vulg;');

  if (isRare) continue;

  const reading = rebs[0] || '';
  if (!reading) continue;

  const glossText = glosses.slice(0, 2).join('; ');

  for (const word of kebs) {
    // Bỏ qua từ có Katakana ngoại lai, chữ số, hoặc quá dài (>5 ký tự)
    if (word.match(/[\u30A0-\u30FF0-9０-９]/) || word.length > 5) continue;

    // Duyệt qua từng chữ Hán trong từ
    for (const char of word) {
      if (kanjiSet.has(char)) {
        candidatesByKanji[char].push({
          word,
          reading,
          pris,
          gloss: glossText,
        });
      }
    }
  }
}

console.log(`[✓] Đã duyệt xong ${totalEntries} entries từ JMdict.`);

// 6. Xếp hạng và chọn lọc từ vựng để mỗi chữ Hán có từ 8 đến 10 từ
console.log('[*] Đang tối ưu và bổ sung từ vựng (8 - 10 từ/chữ)...');
let totalAddedWords = 0;
let kanjiUpdatedCount = 0;

for (const char of kanjiList) {
  const currentItem = db[char];
  const existingVocab = currentItem.vocab || [];
  const existingWords = new Set(existingVocab.map((v) => v.word));

  const candidates = candidatesByKanji[char] || [];
  const validCandidates = candidates.filter((c) => !existingWords.has(c.word));

  // Loại bỏ từ trùng lặp trong candidates
  const seenInCandidates = new Set();
  const uniqueCandidates = [];
  for (const c of validCandidates) {
    if (!seenInCandidates.has(c.word)) {
      seenInCandidates.add(c.word);
      uniqueCandidates.push(c);
    }
  }

  // Chấm điểm xếp hạng
  const scored = uniqueCandidates.map((c) => {
    let score = 0;
    c.pris.forEach((p) => {
      if (p === 'ichi1') score += 70;
      else if (p === 'news1') score += 60;
      else if (p === 'spec1') score += 50;
      else if (p === 'ichi2') score += 30;
      else if (p === 'news2') score += 25;
      else if (p.startsWith('nf')) {
        const num = parseInt(p.replace('nf', ''), 10);
        score += Math.max(0, (50 - num) * 2);
      }
    });

    if (vettedDict[c.word]) score += 300;
    if (quizWordMap[c.word]) score += 250;
    if (c.word.length >= 2 && c.word.length <= 4) score += 40;
    if (c.word.startsWith(char)) score += 20;

    return { ...c, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Số lượng từ cần bổ sung để đạt từ 8 đến 10 từ (mục tiêu 8-10 từ)
  const targetTotal = Math.min(10, Math.max(8, existingVocab.length + 5));
  const needed = Math.max(0, targetTotal - existingVocab.length);

  const selected = scored.slice(0, needed);
  if (selected.length > 0) {
    const newVocabEntries = selected.map((s) => {
      const vi = translateGloss(s.word, s.gloss, currentItem.hanViet);
      return {
        word: s.word,
        reading: s.reading,
        meaning: vi,
        meaning_vi: vi,
        jp: s.word,
      };
    });

    currentItem.vocab = [...existingVocab, ...newVocabEntries];
    totalAddedWords += newVocabEntries.length;
    kanjiUpdatedCount++;
  }
}

console.log(`[✓] Đã bổ sung tổng cộng ${totalAddedWords} từ vựng mới vào ${kanjiUpdatedCount} chữ Kanji.`);

// Kiểm tra phân phối số lượng từ vựng sau khi cập nhật
const newCounts = {};
kanjiList.forEach((k) => {
  const len = db[k].vocab ? db[k].vocab.length : 0;
  newCounts[len] = (newCounts[len] || 0) + 1;
});
console.log('[*] Phân bố số lượng từ vựng mới:', newCounts);

// 7. Ghi lại dữ liệu đồng bộ vào các tệp database
console.log('[*] Đang ghi dữ liệu vào public/kanji_full_database.json...');
fs.writeFileSync(dbJsonPath, JSON.stringify(db, null, 2), 'utf8');

console.log('[*] Đang ghi dữ liệu vào kanji_full_database.json...');
fs.writeFileSync(rootDbJsonPath, JSON.stringify(db, null, 2), 'utf8');

console.log('[*] Đang ghi dữ liệu vào kanji_full_database.js...');
const jsContent = `// Database chuẩn 2219 chữ Hán tiếng Nhật (JLPT N5 - N1)\nconst KANJI_DATABASE = ${JSON.stringify(db, null, 2)};\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = KANJI_DATABASE;\n}\n`;
fs.writeFileSync(rootDbJsPath, jsContent, 'utf8');

console.log('=== HOÀN TẤT BỔ SUNG TỪ VỰNG THÀNH CÔNG! ===');
