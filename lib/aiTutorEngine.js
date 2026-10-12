// Kenji Sensei (賢治先生) - Hệ thống Gia sư AI tiếng Nhật thông minh
// Hoạt động linh hoạt: Tận dụng Google Gemini API / Cloud Generative AI khi có kết nối,
// và tự động kích hoạt Động cơ Tri thức Nội bộ siêu tốc với 2.219 chữ Hán khi offline.

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
4. Trả lời linh hoạt, tự nhiên, sinh động, tránh trả lời rập khuôn 1 mẫu máy móc. Định dạng văn bản với Markdown đẹp mắt.
`;

// Động cơ phản hồi thông minh nội bộ đa chiều (Local Multi-Angle Sensei Engine)
export function generateLocalSenseiResponse(query, context = {}, fullDb = {}) {
  const { currentChar = '', currentLevel = 'N5', cardInfo = null } = context;
  const q = (query || '').trim().toLowerCase();

  // 1. Chỉ kích hoạt lời chào khi câu hỏi thuần túy là lời chào hỏi ngắn
  const isPureGreeting = (
    q === 'chào' ||
    q === 'chào thầy' ||
    q === 'chào thầy ạ' ||
    q === 'chào sensei' ||
    q === 'xin chào' ||
    q === 'konnichiwa' ||
    q === 'hi' ||
    q === 'hello' ||
    q === 'thầy ơi' ||
    q === 'ơi' ||
    q === 'alo' ||
    q === 'chào bạn'
  );

  if (isPureGreeting) {
    return `Konnichiwa! Thầy là **Kenji Sensei (賢治先生)** đây. 
Rất vui được đồng hành cùng bạn trên con đường chinh phục tiếng Nhật!

Hôm nay bạn muốn thầy hỗ trợ điều gì?
- 💡 **Mẹo nhớ chiết tự chữ Hán** theo bộ thủ sinh động.
- ⛩️ **Phân tích âm On, âm Kun & các từ vựng ghép cốt lõi**.
- ✍️ **Đặt câu ví dụ thực tế theo cấp độ JLPT ${currentLevel}**.
- ⚖️ **Phân biệt các cặp chữ Hán "song sinh" dễ nhầm lẫn**.
- 📖 **Giải đáp cấu trúc ngữ pháp từ N5 đến N1**.

*Hiện tại bạn đang học chữ Hán **「${currentChar || '一'}」** (${cardInfo?.hanViet || ''}). Bạn muốn tìm hiểu sâu về khía cạnh nào của chữ này?*`;
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

  // 3. Hỏi mẹo nhớ / chiết tự / câu chuyện liên tưởng
  if (q.includes('mẹo nhớ') || q.includes('chiết tự') || q.includes('câu chuyện') || q.includes('nhớ chữ') || q.includes('cách nhớ') || q.includes('làm sao nhớ')) {
    if (targetData) {
      const hv = targetData.hanViet || targetData.hv || 'Hán tự';
      const mnemonic = targetData.mnemonic || 'Nhìn kỹ các nét bút và bộ thủ cấu thành chữ để tạo liên tưởng ghi nhớ.';
      const on = targetData.on || '—';
      const kun = targetData.kun || '—';
      const topWord = targetData.vocab?.[0]?.word || targetChar;
      const topMeaning = targetData.vocab?.[0]?.meaning_vi || targetData.meaning || '';

      return `### 💡 Bí quyết chiết tự & Đa góc nhìn ghi nhớ chữ 「${targetChar}」 (${hv})

**1. Chiết tự cốt lõi:**
> "${mnemonic}"

**2. Góc nhìn liên tưởng trực quan:**
- Chữ **「${targetChar}」** mang âm Hán Việt là **${hv}**, biểu đạt ý nghĩa: *${targetData.meaning || 'Chữ Hán'}*.
- Âm đọc chính: On \`${on}\` | Kun \`${kun}\`.
- Để khắc sâu chữ này vào trí nhớ dài hạn, hãy gắn liền nó với từ vựng tiêu biểu: **${topWord}** (${topMeaning}).

**3. Lời khuyên sư phạm của Kenji Sensei:**
- **Không chép phạt máy móc**: Hãy nhắm mắt lại và tưởng tượng hình vẽ của chữ xuất hiện trong tâm trí trong 5 giây.
- **Tập viết 3 lần kết hợp phát âm**: Dùng ngón tay vẽ nét chữ lên mặt bàn kết hợp đọc to âm **${hv}** và từ **${topWord}**. Thao tác đa giác quan này sẽ kích thích vùng nhớ của não bộ gấp 3 lần!`;
    }
  }

  // 4. Giải thích chi tiết chữ Hán / phân tích toàn diện
  if (q.includes('giải thích') || q.includes('ý nghĩa') || q.includes('nghĩa là gì') || q.includes('phân tích') || q.includes('chữ này') || q.includes('chữ hán')) {
    if (targetData) {
      const hv = targetData.hanViet || targetData.hv || 'Hán tự';
      const on = targetData.on || '—';
      const kun = targetData.kun || '—';
      const meaning = targetData.meaning || 'Chữ Hán';
      const exampleJp = targetData.example?.sentence || targetData.exampleJp || '';
      const exampleVn = targetData.example?.translation || targetData.exampleVn || '';

      let vocabSection = '';
      if (targetData.vocab && Array.isArray(targetData.vocab) && targetData.vocab.length > 0) {
        vocabSection = targetData.vocab.slice(0, 4).map(v => `  - **${v.word || v.jp?.replace(/<[^>]+>/g, '')}** (${v.reading || ''}): *${v.meaning_vi || v.vn || ''}*`).join('\n');
      }

      return `### ⛩️ Phân tích toàn diện chữ Hán 「${targetChar}」 (${hv})

- **Cấp độ**: JLPT **${targetData.level || currentLevel}**
- **Âm Hán Việt**: **${hv}**
- **Nghĩa trọng tâm**: ${meaning}
- **Âm On (Onyomi)**: \`${on}\` *(Dùng khi ghép thành từ Hán)*
- **Âm Kun (Kunyomi)**: \`${kun}\` *(Dùng khi đứng độc lập hoặc gắn với Okurigana)*

${vocabSection ? `**Các từ ghép thông dụng nhất**:\n${vocabSection}\n` : ''}
${exampleJp ? `**Ví dụ thực tế trong câu**:\n- 🇯🇵 **${exampleJp.replace(/<[^>]+>/g, '')}**\n- 🇻🇳 *${exampleVn}*\n` : ''}
**Ghi chú của Kenji Sensei**: Hãy quan sát quy luật chuyển âm từ Hán Việt **${hv}** sang âm On \`${on}\` để mở rộng vốn từ cho các chữ cùng vần nhé!`;
    }
  }

  // 5. Đặt câu ví dụ / câu giao tiếp
  if (q.includes('đặt câu') || q.includes('ví dụ') || q.includes('câu mẫu') || q.includes('câu giao tiếp') || q.includes('ứng dụng')) {
    if (targetData) {
      const hv = targetData.hanViet || targetData.hv || 'Hán tự';
      const ex1 = targetData.example?.sentence?.replace(/<[^>]+>/g, '') || `この「${targetChar}」という漢字の使い方を練習しましょう。`;
      const trans1 = targetData.example?.translation || `Hãy luyện tập cách sử dụng chữ Hán 「${targetChar}」 này.`;
      const topWord = targetData.vocab?.[0]?.word || targetChar;
      const topMeaning = targetData.vocab?.[0]?.meaning_vi || hv;
      
      return `### ✍️ Các câu ví dụ giao tiếp với chữ 「${targetChar}」 (${hv})

**1. Câu giao tiếp tiêu chuẩn đề thi JLPT:**
- 🇯🇵 **${ex1}**
- 🇻🇳 *${trans1}*

**2. Câu hội thoại đời sống thường nhật:**
- 🇯🇵 **「${topWord}」の意味を理解して、会話の中で自然に使ってみてください。**
- 🇻🇳 *Hãy nắm vững ý nghĩa của từ 「${topWord}」 (${topMeaning}) và thử vận dụng tự nhiên vào giao tiếp nhé.*

*Mẹo: Bạn có thể bật tính năng **AI Shadowing** ở thanh công cụ để đọc to câu trên và nhận chấm điểm giọng nói từ Sensei!*`;
    }
  }

  // 6. Chữ dễ nhầm lẫn
  if (q.includes('nhầm') || q.includes('phân biệt') || q.includes('giống') || q.includes('khác nhau') || q.includes('dễ lẫn')) {
    const confusionMap = {
      '待': { similar: '持', diff: '「待」(ĐÃI - Chờ đợi) có bộ Xích 彳(bước chân đi chậm). Còn「持」(TRÌ - Cầm nắm) có bộ Thủ 扌(bàn tay hành động).' },
      '持': { similar: '待', diff: '「持」(TRÌ - Cầm nắm) có bộ Thủ 扌(tay). Còn「待」(ĐÃI - Chờ đợi) có bộ Xích 彳(bước chân).' },
      '治': { similar: '冶', diff: '「治」(TRỊ - Cai trị, chữa bệnh) có bộ Thủy 氵(3 chấm nước). Còn「冶」(DÃ - Luyện kim) có bộ Băng 冫(2 chấm băng tuyết).' },
      '日': { similar: '白', diff: '「日」(NHẬT - Mặt trời) hình chữ nhật kín có vệt sáng ở giữa. Còn「白」(BẠCH - Màu trắng) có thêm nét phẩy hạt gạo trên đầu.' },
      '買': { similar: '売', diff: '「買」(MÃI - Mua) có bộ Bối 貝(vỏ sò tiền bạc ở dưới). Còn「売」(MẠI - Bán) có bộ Sĩ 士 trên đầu.' },
      '右': { similar: '左', diff: '「右」(HỮU - Bên phải) dưới có chữ Khẩu 口 (tay đưa thức ăn vào miệng). Còn「左」(TẢ - Bên trái) dưới có chữ Công 工 (tay cầm công cụ).' },
      '人': { similar: '入', diff: '「人」(NHÂN - Con người) nét phẩy bên trái dài hơn nét mác. Còn「入」(NHẬP - Đi vào) nét mác bên phải vắt chéo lên trên nét phẩy.' },
      '末': { similar: '未', diff: '「末」(MẠT - Cuối cùng) nét ngang trên dài hơn nét ngang dưới. Còn「未」(VỊ - Chưa đến) nét ngang trên ngắn hơn nét ngang dưới.' },
    };

    if (confusionMap[targetChar]) {
      const item = confusionMap[targetChar];
      return `### ⚖️ Phân biệt chữ dễ nhầm: 「${targetChar}」 và 「${item.similar}」

${item.diff}

**Bí quyết của Kenji Sensei**:
Khi gặp các cặp chữ "song sinh", hãy nhìn vào **Bộ thủ cấu thành**. Bộ thủ chính là dấu hiệu chỉ thị ý nghĩa gốc giúp bạn không bao giờ nhầm lẫn!`;
    } else {
      return `### ⚖️ Bí quyết tránh nhầm lẫn chữ Hán
Đối với chữ **「${targetChar || 'này'}」**, nhiều học viên dễ viết sai do chưa chú ý tỷ lệ nét bút.

**3 nguyên tắc vàng từ Sensei**:
1. **Tuân thủ thứ tự nét (Kakujun)**: Viết từ trên xuống dưới, từ trái sang phải, ngang trước sổ sau, ngoài trước trong sau.
2. **Nhận diện bộ thủ chủ đạo**: Xác định chữ thuộc bộ Thủ (tay), bộ Ngôn (lời nói), bộ Mộc (cây cối) hay bộ Thủy (nước).
3. **Phóng to ô chữ vuông**: Quan sát các nét giao nhau trong ô mễ để định hình vị trí nét bút cân đối.`;
    }
  }

  // 7. Hỏi về ngữ pháp
  if (q.includes('ngữ pháp') || q.includes('cấu trúc') || q.includes('grammar') || q.includes('thể động từ') || q.includes('chia thể')) {
    const levelKey = ['N5', 'N4', 'N3', 'N2', 'N1'].includes(currentLevel) ? currentLevel : 'N5';
    const levelGrammar = GRAMMAR_DATA[levelKey] || GRAMMAR_DATA.N5 || [];
    const sampleGrammar = levelGrammar.slice(0, 3);
    const grammarList = sampleGrammar.map(g => `- **${g.title}**: *${g.meaning}*\n  ➜ Cấu trúc: \`${g.structure}\``).join('\n');

    return `### 📖 Tư vấn Ngữ pháp JLPT ${levelKey} từ Kenji Sensei

Trong cấp độ **${levelKey}**, các mẫu câu ngữ pháp gắn liền mật thiết với việc diễn đạt ý kiến và hành động thực tế.

**Một số điểm ngữ pháp trọng tâm bạn cần ghi nhớ:**
${grammarList}

*Gợi ý: Bạn có thể bấm vào thẻ **"Bài học ➔ Ngữ pháp"** trên thanh menu chính để làm bài tập chia thể động từ phản xạ nhé!*`;
  }

  // 8. Phương pháp học / kinh nghiệm ôn thi
  if (q.includes('lộ trình') || q.includes('cách học') || q.includes('kinh nghiệm') || q.includes('ôn thi') || q.includes('nhớ lâu')) {
    return `### 🌸 Phương pháp học Kanji nhớ lâu từ Kenji Sensei

1. **Chu kỳ lặp lại ngắt quãng (Spaced Repetition)**: Đừng học dồn một lúc 50 chữ. Hãy học 10-15 chữ mỗi ngày và sử dụng tính năng **Sổ tay ôn tập (Notebook)** của ứng dụng để ôn theo nhịp 1 ngày – 3 ngày – 7 ngày.
2. **Đa giác quan (Mắt nhìn - Tay vẽ - Tai nghe - Miệng đọc)**: Vừa nhìn chữ, vừa vẽ nét, vừa nghe phát âm và nhại lại (Shadowing).
3. **Học theo bộ từ vựng ghép**: Đừng học chữ Hán cô lập, hãy học các từ ghép 2-3 chữ Hán thường gặp trong đời sống.
4. **Luyện phản xạ tốc độ**: Thử thách với chế độ **Đấu trường Samurai 60 giây** để kiểm tra phản xạ đọc nhanh.`;
  }

  // 9. Mặc định: Phân tích thông thái theo câu hỏi người dùng
  return `### ⛩️ Kenji Sensei phản hồi câu hỏi của bạn

Về câu hỏi: *"**${query}**"*

**Lời giải đáp từ Sensei**:
- Khi học tiếng Nhật, việc đặt câu hỏi và tò mò về bản chất ngôn ngữ chính là bước đệm tuyệt vời để bạn tiến bộ vượt bậc.
${targetData ? `- Đối với chữ **「${targetChar}」** (${targetData.hanViet || ''}), ý nghĩa gốc là **${targetData.meaning || ''}**, âm On là \`${targetData.on || ''}\`, âm Kun là \`${targetData.kun || ''}\`.` : ''}

**Bạn có muốn thầy:**
1. 💡 Đưa ra câu chuyện chiết tự gợi nhớ sinh động hơn?
2. ✍️ Hướng dẫn đặt 2 câu giao tiếp thực tế theo trình độ ${currentLevel}?
3. ⚖️ Chỉ ra các chữ Hán có nét tương tự dễ gây nhầm lẫn?

Hãy gửi câu hỏi cho thầy bất cứ lúc nào nhé!`;
}
