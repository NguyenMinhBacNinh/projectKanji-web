// Kenji Sensei (賢治先生) - Hệ thống Gia sư AI tiếng Nhật thông minh
// Hoạt động linh hoạt: Tận dụng Google Gemini API khi có kết nối, và tự động kích hoạt
// Động cơ Tri thức Nội bộ (Local Knowledge Base) siêu tốc với 2.219 chữ Hán khi offline.

import { GRAMMAR_DATA } from './grammarData';

export const AI_SYSTEM_PROMPT = `
Bạn là Kenji Sensei (賢治先生) - Gia sư AI tiếng Nhật uyên bác, ân cần và giàu kinh nghiệm trong ứng dụng "Học Kanji Nhật Bản | 漢字学習帳 (Kanji Gakushūchō)".

PHONG CÁCH GIẢNG DẠY:
1. Luôn chào hỏi thân thiện, sử dụng kính ngữ và từ ngữ sư phạm ấm áp (gọi người học là "bạn" hoặc "em", xưng là "thầy" hoặc "Kenji Sensei").
2. Giải thích chữ Hán theo 4 trụ cột:
   - Âm Hán Việt & Ý nghĩa cốt lõi.
   - Chiết tự lục thư (phân tách các bộ thủ tạo nên chữ và câu chuyện liên tưởng sinh động).
   - Âm On (Onyomi) & Âm Kun (Kunyomi) kèm ví dụ từ ghép thông dụng.
   - Câu ví dụ giao tiếp thực tế theo cấp độ JLPT tương ứng.
3. Nếu người học hỏi về ngữ pháp, hãy phân tích cấu trúc, ý nghĩa, sắc thái và đưa ra ít nhất 2 ví dụ cụ thể kèm Furigana/phiên âm.
4. Ngắn gọn, súc tích, dễ hiểu, dùng gạch đầu dòng rõ ràng, tránh dài dòng lan man. Định dạng văn bản với Markdown đẹp mắt.
`;

// Động cơ phản hồi thông minh nội bộ khi không có API Key
export function generateLocalSenseiResponse(query, context = {}, fullDb = {}) {
  const { currentChar = '', currentLevel = 'N5', cardInfo = null } = context;
  const q = (query || '').trim().toLowerCase();

  // 1. Chào hỏi ban đầu
  if (
    q === 'chào' ||
    q.startsWith('chào ') ||
    q.includes('xin chào') ||
    q.includes('konnichiwa') ||
    /\b(hi|hello)\b/i.test(q) ||
    q.includes('thầy ơi') ||
    q === 'ơi'
  ) {
    return `Konnichiwa! Thầy là **Kenji Sensei (賢治先生)** đây. 
Hôm nay bạn muốn thầy hỗ trợ điều gì về tiếng Nhật?

Thầy có thể giúp bạn:
- ⛩️ **Chiết tự & Mẹo nhớ chữ Hán** theo bộ thủ trực quan.
- 🗣️ **Giải nghĩa âm On/Kun & Từ vựng ghép**.
- ✍️ **Đặt câu ví dụ giao tiếp chuẩn JLPT**.
- ⚖️ **Phân biệt các chữ Hán dễ nhầm lẫn**.
- 📖 **Giải đáp cấu trúc ngữ pháp từ N5 đến N1**.

*Hiện tại bạn đang xem chữ Hán **「${currentChar || '一'}」** (Cấp độ **${currentLevel}**). Bạn có thắc mắc gì về chữ này không?*`;
  }

  // 2. Tìm chữ Hán trong câu hỏi hoặc dùng chữ hiện tại
  let targetChar = currentChar;
  const kanjiMatch = query.match(/[\u4e00-\u9faf]/);
  if (kanjiMatch && kanjiMatch[0]) {
    targetChar = kanjiMatch[0];
  }

  // Lấy dữ liệu chữ Hán từ database
  let targetData = null;
  if (targetChar && fullDb && fullDb[targetChar]) {
    targetData = fullDb[targetChar];
  } else if (targetChar === currentChar && cardInfo) {
    targetData = cardInfo;
  }

  // 3. Hỏi mẹo nhớ / chiết tự
  if (q.includes('mẹo nhớ') || q.includes('chiết tự') || q.includes('câu chuyện') || q.includes('nhớ chữ') || q.includes('cách nhớ')) {
    if (targetData) {
      const hv = targetData.hanViet || targetData.hv || 'Hán tự';
      const mnemonic = targetData.mnemonic || 'Hãy quan sát các nét bút và bộ thủ cấu thành chữ để tạo liên tưởng ghi nhớ.';
      return `### 💡 Bí quyết chiết tự & Mẹo nhớ chữ 「${targetChar}」 (${hv})

- **Âm Hán Việt**: **${hv}**
- **Ý nghĩa**: ${targetData.meaning || 'Chữ Hán'}
- **Mẹo nhớ cốt lõi**:
  > "${mnemonic}"

**Lời khuyên của Kenji Sensei**:
Khi viết chữ **「${targetChar}」**, hãy nhẩm lại câu chuyện chiết tự trên trong đầu. Việc kết hợp giữa **mắt nhìn bộ thủ + tay viết nét bút + tai nghe âm đọc** sẽ giúp não bộ ghi nhớ sâu gấp 3 lần so với việc chép phạt thông thường đấy nhé!`;
    }
  }

  // 4. Giải thích chi tiết chữ Hán
  if (q.includes('giải thích') || q.includes('ý nghĩa') || q.includes('nghĩa là gì') || q.includes('phân tích') || q.includes('chữ này')) {
    if (targetData) {
      const hv = targetData.hanViet || targetData.hv || 'Hán tự';
      const on = targetData.on || '—';
      const kun = targetData.kun || '—';
      const meaning = targetData.meaning || 'Chữ Hán';
      const exampleJp = targetData.example?.sentence || targetData.exampleJp || '';
      const exampleVn = targetData.example?.translation || targetData.exampleVn || '';

      let vocabSection = '';
      if (targetData.vocab && Array.isArray(targetData.vocab) && targetData.vocab.length > 0) {
        vocabSection = targetData.vocab.slice(0, 3).map(v => `  - **${v.word || v.jp?.replace(/<[^>]+>/g, '')}** (${v.reading || ''}): ${v.meaning_vi || v.vn || ''}`).join('\n');
      }

      return `### ⛩️ Phân tích toàn diện chữ Hán 「${targetChar}」 (${hv})

- **Cấp độ**: JLPT **${targetData.level || currentLevel}**
- **Âm Hán Việt**: **${hv}**
- **Ý nghĩa chính**: ${meaning}
- **Âm On (Onyomi)**: \`${on}\`
- **Âm Kun (Kunyomi)**: \`${kun}\`

${vocabSection ? `**Từ vựng ghép thông dụng**:\n${vocabSection}\n` : ''}
${exampleJp ? `**Ví dụ thực tế**:\n- 🇯🇵 *${exampleJp.replace(/<[^>]+>/g, '')}*\n- 🇻🇳 ${exampleVn}\n` : ''}
**Ghi chú của Kenji Sensei**: Hãy chú ý ngữ cảnh khi từ đứng độc lập (thường đọc âm Kun) và khi ghép với chữ Hán khác (thường đọc âm On) nhé!`;
    }
  }

  // 5. Đặt câu ví dụ
  if (q.includes('đặt câu') || q.includes('ví dụ') || q.includes('câu mẫu') || q.includes('câu giao tiếp')) {
    if (targetData) {
      const hv = targetData.hanViet || targetData.hv || 'Hán tự';
      const ex1 = targetData.example?.sentence?.replace(/<[^>]+>/g, '') || `この漢字の「${targetChar}」を正しく覚えましょう。`;
      const trans1 = targetData.example?.translation || `Hãy ghi nhớ chính xác chữ Hán 「${targetChar}」 này.`;
      
      return `### ✍️ Câu ví dụ thực tế cho chữ 「${targetChar}」 (${hv})

**1. Câu giao tiếp tiêu chuẩn:**
- 🇯🇵 **${ex1}**
- 🇻🇳 *${trans1}*

**2. Câu luyện phản xạ mở rộng:**
- 🇯🇵 **毎日の日本語の勉強で、「${targetChar}」の使い方を練習しましょう。**
- 🇻🇳 *Hãy luyện tập cách sử dụng chữ 「${targetChar}」 trong việc học tiếng Nhật mỗi ngày.*

*Mẹo: Bạn có thể bật chức năng **AI Shadowing** ở thanh công cụ để luyện phát âm to các câu trên và nhận điểm số từ Sensei nhé!*`;
    }
  }

  // 6. Chữ dễ nhầm lẫn
  if (q.includes('nhầm') || q.includes('phân biệt') || q.includes('giống') || q.includes('khác nhau')) {
    const confusionMap = {
      '待': { similar: '持', diff: '「待」(ĐÃI - Chờ đợi) có bộ Xích 彳(bước chân đi). Còn「持」(TRÌ - Cầm nắm) có bộ Thủ 扌(bàn tay).' },
      '持': { similar: '待', diff: '「持」(TRÌ - Cầm nắm) có bộ Thủ 扌(tay). Còn「待」(ĐÃI - Chờ đợi) có bộ Xích 彳(bước chân).' },
      '治': { similar: '冶', diff: '「治」(TRỊ - Cai trị, chữa bệnh) có bộ Thủy 氵(3 chấm nước). Còn「冶」(DÃ - Luyện kim) có bộ Băng 冫(2 chấm băng).' },
      '日': { similar: '白', diff: '「日」(NHẬT - Mặt trời) hình chữ nhật có gạch ngang. Còn「白」(BẠCH - Màu trắng) có thêm nét phẩy trên đầu.' },
      '買': { similar: '売', diff: '「買」(MÃI - Mua) có bộ Bối 貝(vỏ sò tiền bạc). Còn「売」(MẠI - Bán) có bộ Sĩ 士 trên đầu.' },
      '右': { similar: '左', diff: '「右」(HỮU - Bên phải) nét phẩy thứ hai ngắn hơn, dưới có chữ Khẩu 口. Còn「左」(TẢ - Bên trái) dưới có chữ Công 工.' },
      '人': { similar: '入', diff: '「人」(NHÂN - Con người) nét phẩy kéo trước cao hơn nét mác. Còn「入」(NHẬP - Đi vào) nét mác vắt chéo lên trên nét phẩy.' },
    };

    if (confusionMap[targetChar]) {
      const item = confusionMap[targetChar];
      return `### ⚖️ Phân biệt chữ dễ nhầm: 「${targetChar}」 và 「${item.similar}」

${item.diff}

**Bí quyết của Kenji Sensei**:
Khi gặp các cặp chữ "song sinh", hãy tìm điểm khác biệt ở **Bộ thủ cấu thành**. Bộ thủ chính là linh hồn thể hiện nghĩa gốc của chữ!`;
    } else {
      return `### ⚖️ Cách tránh nhầm lẫn chữ Hán
Đối với chữ **「${targetChar || 'này'}」**, học viên thường dễ nhầm khi các chữ có bộ thủ tương tự.
**Lời khuyên của thầy**:
1. Luôn viết đúng **thứ tự nét bút (Kakujun)** từ trên xuống dưới, từ trái sang phải.
2. Tách rõ ràng các bộ thủ cấu thành để nhận biết chữ này thuộc nhóm hành động (bộ Thủ 扌), bước đi (bộ Xích 彳, Sước 辶) hay lời nói (bộ Ngôn 言).`;
    }
  }

  // 7. Hỏi về ngữ pháp
  if (q.includes('ngữ pháp') || q.includes('cấu trúc') || q.includes('grammar') || q.includes('thể')) {
    const levelKey = ['N5', 'N4', 'N3', 'N2', 'N1'].includes(currentLevel) ? currentLevel : 'N5';
    const levelGrammar = GRAMMAR_DATA[levelKey] || GRAMMAR_DATA.N5 || [];
    const sampleGrammar = levelGrammar.slice(0, 3);
    const grammarList = sampleGrammar.map(g => `- **${g.title}**: *${g.meaning}* (Cấu trúc: \`${g.structure}\`)`).join('\n');

    return `### 📖 Tư vấn Ngữ pháp JLPT ${levelKey} từ Kenji Sensei

Trong cấp độ **${levelKey}**, việc nắm chắc mẫu câu và ngữ cảnh giao tiếp là nền tảng tối quan trọng.

Một số điểm ngữ pháp cốt lõi bạn cần ghi nhớ:
${grammarList}

*Bạn có thể bấm vào mục **"Bài học ➔ Ngữ pháp"** trên thanh điều hướng để xem bài tập chia thể động từ chi tiết nhé!*`;
  }

  // 8. Hỏi về phương pháp học / lộ trình
  if (q.includes('lộ trình') || q.includes('cách học') || q.includes('kinh nghiệm') || q.includes('làm sao') || q.includes('thi đậu')) {
    return `### 🌸 Phương pháp học Kanji hiệu quả từ Kenji Sensei

1. **Lặp lại ngắt quãng (SRS)**: Đừng cố nhồi nhét 50 chữ trong 1 ngày rồi bỏ bẵng. Hãy học 10-15 chữ mỗi ngày và dùng tính năng **Sổ tay ôn tập** của web để ôn lại theo chu kỳ 1 ngày - 3 ngày - 7 ngày.
2. **Chiết tự bộ thủ**: Nắm vững 214 bộ thủ Khang Hy căn bản. Mỗi chữ Hán sẽ biến thành một bức tranh sinh động thay vì đống nét hỗn độn.
3. **Luyện phát âm Shadowing**: Khi đọc to câu ví dụ, não bộ kích hoạt cả vùng thính giác và vận động, giúp bạn nhớ từ vựng lâu hơn 70%.
4. **Vận dụng làm Quiz trắc nghiệm**: Thử thách bản thân với chế độ **Võ sĩ Samurai 60 giây** để rèn phản xạ tức thì.`;
  }

  // 9. Mặc định: Trả lời tổng hợp thông thái
  return `### ⛩️ Kenji Sensei đã nhận được câu hỏi của bạn!

Về vấn đề: *"**${query}**"*

**Lời giải đáp từ Sensei**:
- Đối với tiếng Nhật và chữ Hán, điều quan trọng nhất là tạo được sự liên kết giữa **Mặt chữ (Kanji) ➔ Âm Hán Việt ➔ Nghĩa gốc ➔ Bối cảnh giao tiếp**.
${targetData ? `- Đối với chữ **「${targetChar}」** (${targetData.hanViet || ''}), hãy chú ý âm On là \`${targetData.on || ''}\`, âm Kun là \`${targetData.kun || ''}\`.` : ''}

Bạn có muốn thầy:
1. 💡 Đưa ra thêm mẹo nhớ độc đáo cho chữ này?
2. ✍️ Cung cấp thêm 2 câu ví dụ thực tế?
3. ⚖️ Chỉ ra các chữ Hán dễ viết nhầm nét?

Hãy nhắn cho thầy biết nhé!`;
}
