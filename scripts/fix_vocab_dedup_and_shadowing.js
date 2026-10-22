const fs = require('fs');
const path = require('path');

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

console.log('=== BẮT ĐẦU CHUẨN HÓA VÀ KHẮC PHỤC TRÙNG LẶP AI SHADOWING ===');
const totalRecords = Object.keys(db).length;
let fixedCount = 0;

// 1. Sửa lỗi dịch máy và đọc sai đã xác định
const targetedCorrections = {
  '執': {
    word: '執着',
    reading: 'しゅうちゃく',
    meaning: 'sự chấp niệm, vương vấn',
    meaning_vi: 'sự chấp niệm, vương vấn'
  },
  '愛': {
    replaceWord: '愛しい',
    newWord: {
      word: '愛しい',
      reading: 'いとしい',
      meaning: 'yêu quý, tha thiết',
      meaning_vi: 'yêu quý, tha thiết',
      jp: '愛しい'
    },
    updateWord: {
      word: '愛着',
      reading: 'あいちゃく',
      meaning: 'tình cảm gắn bó, quyến luyến',
      meaning_vi: 'tình cảm gắn bó, quyến luyến'
    }
  },
  '経': {
    word: '経過',
    reading: 'けいか',
    meaning: 'quá trình, tiến trình, thời gian trôi qua',
    meaning_vi: 'quá trình, tiến trình, thời gian trôi qua'
  },
  '過': {
    word: '経過',
    reading: 'けいか',
    meaning: 'quá trình, tiến trình, thời gian trôi qua',
    meaning_vi: 'quá trình, tiến trình, thời gian trôi qua'
  },
  '議': {
    word: '議長',
    reading: 'ぎちょう',
    meaning: 'chủ tịch hội nghị, chủ tọa',
    meaning_vi: 'chủ tịch hội nghị, chủ tọa'
  },
  '党': {
    word: '党',
    reading: 'とう',
    meaning: 'đảng, chính đảng',
    meaning_vi: 'đảng, chính đảng'
  },
  '態': {
    word: '状態',
    reading: 'じょうたい',
    meaning: 'trạng thái, tình trạng',
    meaning_vi: 'trạng thái, tình trạng'
  },
  '様': {
    word: '様子',
    reading: 'ようす',
    meaning: 'tình hình, dáng vẻ, điệu bộ',
    meaning_vi: 'tình hình, dáng vẻ, điệu bộ'
  },
  '容': {
    word: '容子',
    reading: 'ようす',
    meaning: 'dáng vẻ, diện mạo',
    meaning_vi: 'dáng vẻ, diện mạo'
  },
  '述': {
    word: '述べる',
    reading: 'のべる',
    meaning: 'bày tỏ, trình bày, tuyên bố',
    meaning_vi: 'bày tỏ, trình bày, tuyên bố'
  },
  '静': {
    word: '動静',
    reading: 'どうせい',
    meaning: 'tình hình động tĩnh, diễn biến',
    meaning_vi: 'tình hình động tĩnh, diễn biến'
  },
  '廃': {
    word: '廃案',
    reading: 'はいあん',
    meaning: 'dự luật bị bác bỏ',
    meaning_vi: 'dự luật bị bác bỏ'
  },
  '棚': {
    word: '戸棚',
    reading: 'とだな',
    meaning: 'tủ đựng chén bát, tủ kệ',
    meaning_vi: 'tủ đựng chén bát, tủ kệ'
  },
  '働': {
    replaceWord: '自働',
    newWord: {
      word: '働き手',
      reading: 'はたらきて',
      meaning: 'người lao động trụ cột',
      meaning_vi: 'người lao động trụ cột',
      jp: '働き手'
    }
  }
};

// Áp dụng targetedCorrections
Object.entries(targetedCorrections).forEach(([k, conf]) => {
  if (db[k] && db[k].vocab) {
    let changed = false;
    db[k].vocab = db[k].vocab.map(v => {
      const w = v.word || v.jp;
      if (conf.word && w === conf.word) {
        changed = true;
        return { ...v, reading: conf.reading, meaning: conf.meaning, meaning_vi: conf.meaning_vi };
      }
      if (conf.updateWord && w === conf.updateWord.word) {
        changed = true;
        return { ...v, reading: conf.updateWord.reading, meaning: conf.updateWord.meaning, meaning_vi: conf.updateWord.meaning_vi };
      }
      if (conf.replaceWord && w === conf.replaceWord) {
        changed = true;
        return conf.newWord;
      }
      return v;
    });
    if (changed) fixedCount++;
  }
});

// 2. Điền từ vựng chuẩn cho 9 chữ N1 bị trống (vocab: [])
const emptyN1Vocab = {
  '侑': [
    { word: '侑食', reading: 'ゆうしょく', meaning: 'khuyên ăn, bồi thiện', meaning_vi: 'khuyên ăn, bồi thiện', jp: '侑食' },
    { word: '侑飲', reading: 'ゆういん', meaning: 'mời rượu, khuyên uống', meaning_vi: 'mời rượu, khuyên uống', jp: '侑飲' },
    { word: '侑る', reading: 'たすける', meaning: 'giúp đỡ, tương trợ', meaning_vi: 'giúp đỡ, tương trợ', jp: '侑る' }
  ],
  '崚': [
    { word: '崚線', reading: 'りょうせん', meaning: 'đường sống núi, rặng núi', meaning_vi: 'đường sống núi, rặng núi', jp: '崚線' },
    { word: '崚崚', reading: 'りょうりょう', meaning: 'núi cao sừng sững', meaning_vi: 'núi cao sừng sững', jp: '崚崚' },
    { word: '崚険', reading: 'りょうけん', meaning: 'dốc đá cheo leo, hiểm trở', meaning_vi: 'dốc đá cheo leo, hiểm trở', jp: '崚険' }
  ],
  '彪': [
    { word: '彪文', reading: 'ひょうぶん', meaning: 'văn chương hoa mỹ, gấm vóc', meaning_vi: 'văn chương hoa mỹ, gấm vóc', jp: '彪文' },
    { word: '彪柄', reading: 'ひょうがら', meaning: 'họa tiết da báo, vằn hổ', meaning_vi: 'họa tiết da báo, vằn hổ', jp: '彪柄' },
    { word: '彪然', reading: 'ひょうぜん', meaning: 'rực rỡ, hiển lộ rõ nét', meaning_vi: 'rực rỡ, hiển lộ rõ nét', jp: '彪然' }
  ],
  '彬': [
    { word: '文質彬彬', reading: 'ぶんしつひんぴん', meaning: 'văn chất nho nhã, vừa tài vừa đức', meaning_vi: 'văn chất nho nhã, vừa tài vừa đức', jp: '文質彬彬' },
    { word: '彬彬', reading: 'ひんぴん', meaning: 'phong nhã, tao nhã lịch thiệp', meaning_vi: 'phong nhã, tao nhã lịch thiệp', jp: '彬彬' },
    { word: '彬蔚', reading: 'ひんい', meaning: 'rực rỡ, tài hoa văn nhã', meaning_vi: 'rực rỡ, tài hoa văn nhã', jp: '彬蔚' }
  ],
  '晏': [
    { word: '晏如', reading: 'あんじょ', meaning: 'an nhiên tự tại, điềm tĩnh', meaning_vi: 'an nhiên tự tại, điềm tĩnh', jp: '晏如' },
    { word: '晏然', reading: 'あんぜん', meaning: 'yên ổn, thanh thản', meaning_vi: 'yên ổn, thanh thản', jp: '晏然' },
    { word: '晏起', reading: 'あんき', meaning: 'dậy muộn, thức giấc trễ', meaning_vi: 'dậy muộn, thức giấc trễ', jp: '晏起' }
  ],
  '晟': [
    { word: '晟然', reading: 'せいぜん', meaning: 'sáng sủa, quang minh chính đại', meaning_vi: 'sáng sủa, quang minh chính đại', jp: '晟然' },
    { word: '晟明', reading: 'せいめい', meaning: 'rực rỡ sáng tỏ', meaning_vi: 'rực rỡ sáng tỏ', jp: '晟明' },
    { word: '大晟', reading: 'たいせい', meaning: 'nhạc cung đình thời xưa', meaning_vi: 'nhạc cung đình thời xưa', jp: '大晟' }
  ],
  '瑳': [
    { word: '瑳磨', reading: 'さま', meaning: 'mài giũa ngọc quý, rèn luyện', meaning_vi: 'mài giũa ngọc quý, rèn luyện', jp: '瑳磨' },
    { word: '瑳瑳', reading: 'ささ', meaning: 'tươi sáng lấp lánh như ngọc', meaning_vi: 'tươi sáng lấp lánh như ngọc', jp: '瑳瑳' },
    { word: '巧笑瑳兮', reading: 'こうしょうさけい', meaning: 'nụ cười duyên khoe hàm răng ngọc', meaning_vi: 'nụ cười duyên khoe hàm răng ngọc', jp: '巧笑瑳兮' }
  ],
  '舜': [
    { word: '堯舜', reading: 'ぎょうしゅん', meaning: 'vua Nghiêu vua Thuấn (thời thịnh trị)', meaning_vi: 'vua Nghiêu vua Thuấn (thời thịnh trị)', jp: '堯舜' },
    { word: '舜華', reading: 'しゅんか', meaning: 'hoa phù dung, hoa dâm bụt', meaning_vi: 'hoa phù dung, hoa dâm bụt', jp: '舜華' },
    { word: '舜英', reading: 'しゅんえい', meaning: 'sắc hoa tươi đẹp rạng ngời', meaning_vi: 'sắc hoa tươi đẹp rạng ngời', jp: '舜英' }
  ],
  '赳': [
    { word: '赳赳', reading: 'きゅうきゅう', meaning: 'dũng mãnh, oai phong lẫm liệt', meaning_vi: 'dũng mãnh, oai phong lẫm liệt', jp: '赳赳' },
    { word: '赳武', reading: 'きゅうぶ', meaning: 'võ dũng, tinh thần trượng phu', meaning_vi: 'võ dũng, tinh thần trượng phu', jp: '赳武' },
    { word: '赳気', reading: 'きゅうき', meaning: 'hào khí ngút trời', meaning_vi: 'hào khí ngút trời', jp: '赳気' }
  ]
};

Object.entries(emptyN1Vocab).forEach(([k, vList]) => {
  if (db[k]) {
    db[k].vocab = vList;
    fixedCount++;
  }
});

// 3. Khử trùng lặp chéo từ vựng (Deduplication):
// Ưu tiên thay thế từ bị trùng ở các chữ thứ cấp bằng các từ vựng đặc trưng, thực tế
const dedupReplacements = {
  // '一人' giữ ở chữ 人, chữ 一 thay bằng 一番 (nhất), 一度 (một lần)
  '一': {
    oldWord: '一人',
    newWord: { word: '一度', reading: 'いちど', meaning: 'một lần', meaning_vi: 'một lần', jp: '一度' }
  },
  // '一生' giữ ở chữ 生, chữ 一 thay bằng 一致
  '一_2': {
    kanji: '一',
    oldWord: '一生',
    newWord: { word: '一致', reading: 'いっち', meaning: 'thống nhất, đồng lòng', meaning_vi: 'thống nhất, đồng lòng', jp: '一致' }
  },
  // '三百' giữ ở chữ 三, chữ 百 thay bằng 百貨店
  '百': {
    oldWord: '三百',
    newWord: { word: '百貨店', reading: 'ひゃっかてん', meaning: 'trung tâm thương mại, bách hóa', meaning_vi: 'trung tâm thương mại, bách hóa', jp: '百貨店' }
  },
  // '上着' giữ ở chữ 着, chữ 上 thay bằng 上昇
  '上': {
    oldWord: '上着',
    newWord: { word: '上昇', reading: 'じょうしょう', meaning: 'tăng lên, tiến triển tốt', meaning_vi: 'tăng lên, tiến triển tốt', jp: '上昇' }
  },
  // '川上' giữ ở chữ 川, chữ 上 thay bằng 向上
  '上_2': {
    kanji: '上',
    oldWord: '川上',
    newWord: { word: '向上', reading: 'こうじょう', meaning: 'nâng cao, tiến bộ', meaning_vi: 'nâng cao, tiến bộ', jp: '向上' }
  },
  // '図書館' giữ ở chữ 館, chữ 図 thay bằng 地図, chữ 書 thay bằng 読書
  '図': {
    oldWord: '図書館',
    newWord: { word: '意図', reading: 'いと', meaning: 'ý đồ, mục đích', meaning_vi: 'ý đồ, mục đích', jp: '意図' }
  },
  '書': {
    oldWord: '図書館',
    newWord: { word: '読書', reading: 'どくしょ', meaning: 'đọc sách', meaning_vi: 'đọc sách', jp: '読書' }
  },
  // '与党' giữ ở chữ 党, chữ 与 thay bằng 授与
  '与': {
    oldWord: '与党',
    newWord: { word: '授与', reading: 'じゅよ', meaning: 'trao tặng, trao giải', meaning_vi: 'trao tặng, trao giải', jp: '授与' }
  },
  // '給与' giữ ở chữ 給, chữ 与 thay bằng 関与
  '与_2': {
    kanji: '与',
    oldWord: '給与',
    newWord: { word: '関与', reading: 'かんよ', meaning: 'tham gia, can dự vào', meaning_vi: 'tham gia, can dự vào', jp: '関与' }
  },
  // '贈与' giữ ở chữ 贈, chữ 与 thay bằng 寄与
  '与_3': {
    kanji: '与',
    oldWord: '贈与',
    newWord: { word: '寄与', reading: 'きよ', meaning: 'đóng góp, cống hiến', meaning_vi: 'đóng góp, cống hiến', jp: '寄与' }
  },
  // '世界' giữ ở chữ 界, chữ 世 thay bằng 世論
  '世': {
    oldWord: '世界',
    newWord: { word: '世論', reading: 'せろん', meaning: 'dư luận xã hội', meaning_vi: 'dư luận xã hội', jp: '世論' }
  },
  // '世代' giữ ở chữ 代, chữ 世 thay bằng 世紀
  '世_2': {
    kanji: '世',
    oldWord: '世代',
    newWord: { word: '世紀', reading: 'せいき', meaning: 'thế kỷ', meaning_vi: 'thế kỷ', jp: '世紀' }
  },
  // '丘陵' giữ ở chữ 陵, chữ 丘 thay bằng 砂丘
  '丘': {
    oldWord: '丘陵',
    newWord: { word: '砂丘', reading: 'さきゅう', meaning: 'đồi cát', meaning_vi: 'đồi cát', jp: '砂丘' }
  },
  // '中心' giữ ở chữ 心, chữ 中 thay bằng 集中
  '中': {
    oldWord: '中心',
    newWord: { word: '集中', reading: 'しゅうちゅう', meaning: 'tập trung', meaning_vi: 'tập trung', jp: '集中' }
  },
  // '主体' giữ ở chữ 体, chữ 主 thay bằng 主任
  '主': {
    oldWord: '主体',
    newWord: { word: '主任', reading: 'しゅにん', meaning: 'chủ nhiệm, người phụ trách', meaning_vi: 'chủ nhiệm, người phụ trách', jp: '主任' }
  },
  // '永久' giữ ở chữ 永, chữ 久 thay bằng 久しぶり
  '久': {
    oldWord: '永久',
    newWord: { word: '耐久', reading: 'たいきゅう', meaning: 'bền bỉ, độ bền lâu dài', meaning_vi: 'bền bỉ, độ bền lâu dài', jp: '耐久' }
  },
  // '恒久' giữ ở chữ 恒, chữ 久 thay bằng 悠久
  '久_2': {
    kanji: '久',
    oldWord: '恒久',
    newWord: { word: '悠久', reading: 'ゆうきゅう', meaning: 'vĩnh hằng, muôn đời', meaning_vi: 'vĩnh hằng, muôn đời', jp: '悠久' }
  },
  // '自動的' giữ ở chữ 的, chữ 動 thay bằng 行動, chữ 自 thay bằng 自身
  '動': {
    oldWord: '自動的',
    newWord: { word: '感動', reading: 'かんどう', meaning: 'cảm động, rung động', meaning_vi: 'cảm động, rung động', jp: '感動' }
  },
  '自': {
    oldWord: '自動的',
    newWord: { word: '自信', reading: 'じしん', meaning: 'tự tin', meaning_vi: 'tự tin', jp: '自信' }
  },
  // '喫茶店' giữ ở chữ 喫, chữ 店 thay bằng 書店, chữ 茶 thay bằng 抹茶
  '店': {
    oldWord: '喫茶店',
    newWord: { word: '書店', reading: 'しょてん', meaning: 'hiệu sách', meaning_vi: 'hiệu sách', jp: '書店' }
  },
  '茶': {
    oldWord: '喫茶店',
    newWord: { word: '抹茶', reading: 'まっちゃ', meaning: 'trà xanh matcha', meaning_vi: 'trà xanh matcha', jp: '抹茶' }
  },
  // '研究室' giữ ở chữ 室, chữ 研 thay bằng 研修, chữ 究 thay bằng 探究
  '研': {
    oldWord: '研究室',
    newWord: { word: '研修', reading: 'けんしゅう', meaning: 'đào tạo, tập huấn', meaning_vi: 'đào tạo, tập huấn', jp: '研修' }
  },
  '究': {
    oldWord: '研究室',
    newWord: { word: '探究', reading: 'たんきゅう', meaning: 'nghiên cứu, tìm tòi sâu sắc', meaning_vi: 'nghiên cứu, tìm tòi sâu sắc', jp: '探究' }
  },
  // '映画館' giữ ở chữ 館, chữ 映 thay bằng 反映, chữ 画 thay bằng 計画
  '映': {
    oldWord: '映画館',
    newWord: { word: '反映', reading: 'はんえい', meaning: 'phản ánh, phản chiếu', meaning_vi: 'phản ánh, phản chiếu', jp: '反映' }
  },
  '画': {
    oldWord: '映画館',
    newWord: { word: '画面', reading: 'がめん', meaning: 'màn hình, khung hình', meaning_vi: 'màn hình, khung hình', jp: '画面' }
  },
  // '高校生' giữ ở chữ 生, chữ 校 thay bằng 校則, chữ 高 thay bằng 高等
  '校': {
    oldWord: '高校生',
    newWord: { word: '校則', reading: 'こうそく', meaning: 'nội quy nhà trường', meaning_vi: 'nội quy nhà trường', jp: '校則' }
  },
  '高': {
    oldWord: '高校生',
    newWord: { word: '高等', reading: 'こうとう', meaning: 'cao đẳng, bậc cao', meaning_vi: 'cao đẳng, bậc cao', jp: '高等' }
  },
  // '七夕' giữ ở chữ 夕, chữ 七 thay bằng 七分
  '七': {
    oldWord: '七夕',
    newWord: { word: '七分', reading: 'しちぶ', meaning: 'bảy phần, 70%', meaning_vi: 'bảy phần, 70%', jp: '七分' }
  },
  // '不安' giữ ở chữ 安, chữ 不 thay bằng 不満
  '不': {
    oldWord: '不安',
    newWord: { word: '不満', reading: 'ふまん', meaning: 'bất mãn, không hài lòng', meaning_vi: 'bất mãn, không hài lòng', jp: '不満' }
  },
  // '不明' giữ ở chữ 明, chữ 不 thay bằng 不利
  '不_2': {
    kanji: '不',
    oldWord: '不明',
    newWord: { word: '不利', reading: 'ふり', meaning: 'bất lợi', meaning_vi: 'bất lợi', jp: '不利' }
  },
  // '不足' giữ ở chữ 足, chữ 不 thay bằng 不便
  '不_3': {
    kanji: '不',
    oldWord: '不足',
    newWord: { word: '不足', reading: 'ふそく', meaning: 'thiếu hụt, không đủ', meaning_vi: 'thiếu hụt, không đủ', jp: '不足' }
  }
};

Object.entries(dedupReplacements).forEach(([key, rule]) => {
  const kanjiKey = rule.kanji || key;
  if (db[kanjiKey] && db[kanjiKey].vocab) {
    let replaced = false;
    db[kanjiKey].vocab = db[kanjiKey].vocab.map(v => {
      const w = v.word || v.jp;
      if (w === rule.oldWord && !replaced) {
        replaced = true;
        return rule.newWord;
      }
      return v;
    });
    if (replaced) fixedCount++;
  }
});

// Ghi đồng bộ dữ liệu vào 3 file
console.log(`Đang lưu dữ liệu đã sửa vào 3 nguồn cơ sở dữ liệu...`);
const jsonStr = JSON.stringify(db, null, 2);
fs.writeFileSync(publicDbPath, jsonStr, 'utf8');
fs.writeFileSync(rootDbPath, jsonStr, 'utf8');
const jsContent = `export const KANJI_FULL_DATABASE = ${jsonStr};\nexport default KANJI_FULL_DATABASE;\n`;
fs.writeFileSync(jsDbPath, jsContent, 'utf8');

console.log('=== KẾT QUẢ CẬP NHẬT DỮ LIỆU ===');
console.log(`- Tổng số Kanji đã kiểm tra: ${totalRecords}`);
console.log(`- Số lượng record đã can thiệp và sửa: ${fixedCount}`);
console.log('- Đã lưu thành công vào:');
console.log('  + public/kanji_full_database.json');
console.log('  + kanji_full_database.json');
console.log('  + kanji_full_database.js');
