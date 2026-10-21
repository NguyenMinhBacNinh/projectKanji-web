const fs = require('fs');
const path = require('path');
const projectRoot = path.resolve(__dirname, '..');

console.log('=== BẮT ĐẦU TẠO DỮ LIỆU NGỮ PHÁP 50 MẪU CHO MỖI CẤP ĐỘ (N5 - N1) ===');

// N5 GRAMMAR LIST (50 items)
const N5_LIST = [
  {
    id: 'n5_1',
    level: 'N5',
    title: '〜は〜です',
    meaning: 'A là B (Khẳng định cơ bản)',
    structure: 'Danh từ 1 + は + Danh từ 2 + です',
    explanation: 'Dùng để giới thiệu danh tính, nghề nghiệp, quốc tịch hoặc trạng thái cơ bản của chủ ngữ.',
    examples: [
      { jp: 'わたしは学生です。', vn: 'Tôi là học sinh.', furigana: 'わたしは がくせい です。' },
      { jp: 'これは日本語の本です。', vn: 'Đây là cuốn sách tiếng Nhật.', furigana: 'これは にほんご の ほん です。' }
    ]
  },
  {
    id: 'n5_2',
    level: 'N5',
    title: '〜は〜ではありません',
    meaning: 'A không phải là B (Phủ định lịch sự)',
    structure: 'Danh từ 1 + は + Danh từ 2 + ではありません / じゃありません',
    explanation: 'Dạng phủ định lịch sự của 〜です trong câu định danh.',
    examples: [
      { jp: '彼は先生ではありません。', vn: 'Anh ấy không phải là giáo viên.', furigana: 'かれ は せんせい ではありません。' },
      { jp: '今日は日曜日じゃありません。', vn: 'Hôm nay không phải là chủ nhật.', furigana: 'きょう は にちようび じゃありません。' }
    ]
  },
  {
    id: 'n5_3',
    level: 'N5',
    title: '〜ですか',
    meaning: 'Có phải là... không? (Câu hỏi nghi vấn)',
    structure: 'Mệnh đề + か',
    explanation: 'Thêm trợ từ か vào cuối câu để tạo thành câu hỏi lịch sự.',
    examples: [
      { jp: 'お元気ですか。', vn: 'Bạn có khỏe không?', furigana: 'おげんき ですか。' },
      { jp: 'これはあなたの傘ですか。', vn: 'Đây có phải chiếc ô của bạn không?', furigana: 'これは あなた の かさ ですか。' }
    ]
  },
  {
    id: 'n5_4',
    level: 'N5',
    title: '〜も',
    meaning: 'Cũng... (Trợ từ đồng nhất)',
    structure: 'Danh từ + も',
    explanation: 'Dùng thay thế cho trợ từ は/が/を khi muốn biểu thị tính chất tương tự.',
    examples: [
      { jp: 'わたしもベトナム人です。', vn: 'Tôi cũng là người Việt Nam.', furigana: 'わたし も ベトナムじん です。' },
      { jp: '兄も英語を勉強しています。', vn: 'Anh trai tôi cũng đang học tiếng Anh.', furigana: 'あに も えいご を べんきょう しています。' }
    ]
  },
  {
    id: 'n5_5',
    level: 'N5',
    title: '〜の',
    meaning: 'Của / Thuộc về (Trợ từ liên kết danh từ)',
    structure: 'Danh từ 1 + の + Danh từ 2',
    explanation: 'Biểu thị sự sở hữu, nguồn gốc, xuất xứ hoặc làm rõ bổ nghĩa cho danh từ sau.',
    examples: [
      { jp: 'これは私の車です。', vn: 'Đây là xe ô tô của tôi.', furigana: 'これは わたし の くるま です。' },
      { jp: '日本の桜はとても美しいです。', vn: 'Hoa anh đào của Nhật Bản rất đẹp.', furigana: 'にほん の さくら は とても うつくしい です。' }
    ]
  },
  {
    id: 'n5_6',
    level: 'N5',
    title: '〜があります／います',
    meaning: 'Có (Sự tồn tại của đồ vật / sinh vật)',
    structure: 'Địa điểm + に + Vật (が あります) / Người, động vật (が います)',
    explanation: 'あります dùng cho vật vô tri vô giác, cây cối. います dùng cho sinh vật cử động được (người, động vật).',
    examples: [
      { jp: '机の上に本があります。', vn: 'Trên bàn có cuốn sách.', furigana: 'つくえ の うえ に ほん が あります。' },
      { jp: '庭に猫がいます。', vn: 'Trong vườn có một con mèo.', furigana: 'にわ に ねこ が います。' }
    ]
  },
  {
    id: 'n5_7',
    level: 'N5',
    title: '〜へ行きます／来ます／帰ります',
    meaning: 'Đi / Đến / Về (Chỉ phương hướng chuyển động)',
    structure: 'Địa điểm + へ / に + 行きます / 来ます / 帰ります',
    explanation: 'Trợ từ へ (đọc là e) hoặc に chỉ đích đến của hành động di chuyển.',
    examples: [
      { jp: '来週、日本へ行きます。', vn: 'Tuần sau tôi sẽ đi Nhật Bản.', furigana: 'らいしゅう、にほん へ いきます。' },
      { jp: '毎日６時にうちへ帰ります。', vn: 'Mỗi ngày tôi về nhà lúc 6 giờ.', furigana: 'まいにち ろくじ に うち へ かえります。' }
    ]
  },
  {
    id: 'n5_8',
    level: 'N5',
    title: '〜を〜ます',
    meaning: 'Tác động hành động lên tân ngữ',
    structure: 'Danh từ + を + Động từ tha động từ',
    explanation: 'Trợ từ を chỉ đối tượng trực tiếp chịu tác động của hành động.',
    examples: [
      { jp: '毎朝パンを食べます。', vn: 'Mỗi sáng tôi ăn bánh mì.', furigana: 'まいあさ パン を たべます。' },
      { jp: '音楽を聞きます。', vn: 'Tôi nghe âm nhạc.', furigana: 'おんがく を ききます。' }
    ]
  },
  {
    id: 'n5_9',
    level: 'N5',
    title: '〜で (Địa điểm / Phương tiện)',
    meaning: 'Tại (nơi diễn ra hành động) / Bằng (phương tiện, công cụ)',
    structure: 'Địa điểm + で + Hành động / Phương tiện + で',
    explanation: 'Chỉ nơi diễn ra hành vi hoặc công cụ, phương tiện thực hiện hành động.',
    examples: [
      { jp: '図書館で勉強します。', vn: 'Tôi học bài tại thư viện.', furigana: 'としょかん で べんきょう します。' },
      { jp: '電車で会社へ行きます。', vn: 'Tôi đi đến công ty bằng tàu điện.', furigana: 'でんしゃ で かいしゃ へ いきます。' }
    ]
  },
  {
    id: 'n5_10',
    level: 'N5',
    title: '〜に (Thời gian cụ thể)',
    meaning: 'Vào lúc (Thời điểm diễn ra hành động)',
    structure: 'Thời gian có con số + に + Động từ',
    explanation: 'Dùng cho thời điểm có số giờ, ngày, tháng, năm cụ thể.',
    examples: [
      { jp: '毎朝７時に起きます。', vn: 'Mỗi sáng tôi thức dậy vào lúc 7 giờ.', furigana: 'まいあさ しちじ に おきます。' },
      { jp: '日曜日に買い物に行きます。', vn: 'Tôi đi mua sắm vào chủ nhật.', furigana: 'にちようび に かいもの に いきます。' }
    ]
  },
  {
    id: 'n5_11',
    level: 'N5',
    title: '〜と (Cùng với / Và)',
    meaning: 'Cùng với ai / Và (liệt kê danh từ)',
    structure: 'Danh từ 1 + と + Danh từ 2 / Người + と',
    explanation: 'Dùng để nối các danh từ hoặc chỉ đối tượng cùng tham gia hành động.',
    examples: [
      { jp: '友達と映画を見ました。', vn: 'Tôi đã xem phim cùng bạn bè.', furigana: 'ともだち と えいが を みました。' },
      { jp: '机の上にペンとノートがあります。', vn: 'Trên bàn có bút và vở.', furigana: 'つくえ の うえ に ペン と ノート が あります。' }
    ]
  },
  {
    id: 'n5_12',
    level: 'N5',
    title: '〜から〜まで',
    meaning: 'Từ... đến... (Thời gian & Không gian)',
    structure: 'Điểm bắt đầu + から + Điểm kết thúc + まで',
    explanation: 'Chỉ phạm vi thời gian hoặc quãng đường từ điểm xuất phát đến đích.',
    examples: [
      { jp: '銀行は９時から３時までです。', vn: 'Ngân hàng mở cửa từ 9 giờ đến 3 giờ.', furigana: 'ぎんこう は くじ から さんじ まで です。' },
      { jp: 'ハノイから東京まで飛行機で行きます。', vn: 'Đi từ Hà Nội đến Tokyo bằng máy bay.', furigana: 'ハノイ から とうきょう まで ひこうき で いきます。' }
    ]
  },
  {
    id: 'n5_13',
    level: 'N5',
    title: '〜ませんか',
    meaning: 'Cùng làm... với tôi nhé? (Rủ rê, mời mọc lịch sự)',
    structure: 'Động từ thể ます (bỏ ます) + ませんか',
    explanation: 'Dùng để rủ đối phương cùng làm một việc gì đó, thăm dò ý kiến lịch sự.',
    examples: [
      { jp: 'いっしょにお茶を飲みませんか。', vn: 'Cùng uống trà với tôi nhé?', furigana: 'いっしょ に おちゃ を のみませんか。' },
      { jp: '明日、映画を見に行きませんか。', vn: 'Ngày mai cùng đi xem phim nhé?', furigana: 'あした、えいが を み に いきませんか。' }
    ]
  },
  {
    id: 'n5_14',
    level: 'N5',
    title: '〜ましょう',
    meaning: 'Cùng làm... nào! (Đồng thuận, kêu gọi)',
    structure: 'Động từ thể ます (bỏ ます) + ましょう',
    explanation: 'Dùng để hưởng ứng lời mời hoặc chủ động đề nghị cùng thực hiện.',
    examples: [
      { jp: 'ちょっと休みましょう。', vn: 'Cùng nghỉ một chút nào.', furigana: 'ちょっと やすみましょう。' },
      { jp: 'いっしょに昼ご飯を食べましょう。', vn: 'Cùng nhau ăn trưa nhé.', furigana: 'いっしょ に ひるごはん を たべましょう。' }
    ]
  },
  {
    id: 'n5_15',
    level: 'N5',
    title: '〜ましょうか',
    meaning: 'Để tôi làm giúp bạn nhé? (Đề nghị giúp đỡ)',
    structure: 'Động từ thể ます (bỏ ます) + ましょうか',
    explanation: 'Người nói chủ động đề nghị làm một hành động giúp đỡ đối phương.',
    examples: [
      { jp: '窓を開けましょうか。', vn: 'Để tôi mở cửa sổ giúp bạn nhé?', furigana: 'まど を あけましょうか。' },
      { jp: '荷物を持ちましょうか。', vn: 'Để tôi xách hành lý giúp bạn nhé?', furigana: 'にもつ を もちましょうか。' }
    ]
  },
  {
    id: 'n5_16',
    level: 'N5',
    title: '〜てください',
    meaning: 'Xin hãy làm V (Yêu cầu, đề nghị lịch sự)',
    structure: 'Động từ thể て + ください',
    explanation: 'Dùng khi muốn yêu cầu, nhờ vả đối phương làm việc gì đó một cách lịch sự.',
    examples: [
      { jp: '日本語で話してください。', vn: 'Xin hãy nói bằng tiếng Nhật.', furigana: 'にほんご で はなして ください。' },
      { jp: 'ここに名前を書いてください。', vn: 'Xin hãy viết tên vào đây.', furigana: 'ここに なまえ を かいて ください。' }
    ]
  },
  {
    id: 'n5_17',
    level: 'N5',
    title: '〜ています (Đang làm / Trạng thái)',
    meaning: 'Đang làm V / Đang trong trạng thái...',
    structure: 'Động từ thể て + います',
    explanation: 'Chỉ hành động đang diễn ra tại thời điểm nói hoặc trạng thái là kết quả của hành động trước đó.',
    examples: [
      { jp: '今、日本語を勉強しています。', vn: 'Bây giờ tôi đang học tiếng Nhật.', furigana: 'いま、にほんご を べんきょう しています。' },
      { jp: '山田さんは結婚しています。', vn: 'Anh Yamada đã kết hôn.', furigana: 'やまださん は けっこん しています。' }
    ]
  },
  {
    id: 'n5_18',
    level: 'N5',
    title: '〜てもいいです',
    meaning: 'Làm... cũng được (Cho phép làm gì)',
    structure: 'Động từ thể て + もいいです',
    explanation: 'Biểu thị sự cho phép đối phương làm gì đó hoặc hỏi xin phép khi đổi thành câu hỏi.',
    examples: [
      { jp: '写真を撮ってもいいですか。', vn: 'Tôi có thể chụp ảnh ở đây được không?', furigana: 'しゃしん を とっても いい ですか。' },
      { jp: 'ここでタバコを吸ってもいいです。', vn: 'Hút thuốc ở đây cũng được.', furigana: 'ここで タバコ を すっても いい です。' }
    ]
  },
  {
    id: 'n5_19',
    level: 'N5',
    title: '〜てはいけません',
    meaning: 'Không được phép làm... (Cấm chỉ lịch sự)',
    structure: 'Động từ thể て + はいけません',
    explanation: 'Dùng để cấm đoán hoặc nêu quy định không được phép làm gì.',
    examples: [
      { jp: 'ここで車を止めてはいけません。', vn: 'Không được dừng xe ở đây.', furigana: 'ここで くるま を とめて は いけません。' },
      { jp: '美術館でフラッシュを使ってはいけません。', vn: 'Không được dùng đèn flash trong bảo tàng.', furigana: 'びじゅつかん で フラッシュ を つかって は いけません。' }
    ]
  },
  {
    id: 'n5_20',
    level: 'N5',
    title: '〜から (Nguyên nhân chủ quan)',
    meaning: 'Vì... nên... (Nêu lý do)',
    structure: 'Mệnh đề nguyên nhân + から、Mệnh đề kết quả',
    explanation: 'Nêu lý do, căn cứ chủ quan dẫn tới hành động hoặc quyết định.',
    examples: [
      { jp: '時間がありませんから、タクシーで行きましょう。', vn: 'Vì không có thời gian nên hãy đi bằng taxi nào.', furigana: 'じかん が ありません から、タクシー で いきましょう。' },
      { jp: '寒いから、ドアを閉めてください。', vn: 'Vì trời lạnh nên xin hãy đóng cửa lại.', furigana: 'さむい から、ドア を しめて ください。' }
    ]
  },
  {
    id: 'n5_21',
    level: 'N5',
    title: '〜て、〜 (Nối hành động / Tính từ)',
    meaning: 'Làm... rồi làm... / Vừa... vừa...',
    structure: 'V thể て / Tính từ い bỏ い + くて / Tính từ な bỏ な + で',
    explanation: 'Dùng để nối các hành động xảy ra theo trình tự thời gian hoặc nối nhiều đặc điểm tính chất.',
    examples: [
      { jp: '朝起きて、顔を洗って、ご飯を食べます。', vn: 'Sáng dậy, rửa mặt, rồi ăn cơm.', furigana: 'あさ おきて、かお を あらって、ごはん を たべます。' },
      { jp: 'この部屋は広くて、明るいです。', vn: 'Căn phòng này vừa rộng lại vừa sáng sủa.', furigana: 'この へや は ひろくて、あかるい です。' }
    ]
  },
  {
    id: 'n5_22',
    level: 'N5',
    title: '〜ないでください',
    meaning: 'Xin đừng làm... (Yêu cầu không làm gì)',
    structure: 'Động từ thể ない + でください',
    explanation: 'Yêu cầu, nhờ vả đối phương không thực hiện một hành động nào đó.',
    examples: [
      { jp: 'ここで走らないでください。', vn: 'Xin đừng chạy ở đây.', furigana: 'ここで はしらないで ください。' },
      { jp: '心配しないでください。', vn: 'Xin đừng lo lắng.', furigana: 'しんぱい しないで ください。' }
    ]
  },
  {
    id: 'n5_23',
    level: 'N5',
    title: '〜なければなりません',
    meaning: 'Phải làm... (Bắt buộc, nghĩa vụ)',
    structure: 'Động từ thể ない (bỏ い) + ければなりません',
    explanation: 'Diễn tả hành động bắt buộc phải thực hiện do quy định hoặc hoàn cảnh tất yếu.',
    examples: [
      { jp: '毎日薬を飲まなければなりません。', vn: 'Mỗi ngày tôi phải uống thuốc.', furigana: 'まいにち くすり を のまなければ なりません。' },
      { jp: 'パスポートを見せなければなりません。', vn: 'Bạn phải xuất trình hộ chiếu.', furigana: 'パスポート を みせなければ なりません。' }
    ]
  },
  {
    id: 'n5_24',
    level: 'N5',
    title: '〜なくてもいいです',
    meaning: 'Không cần làm... cũng được',
    structure: 'Động từ thể ない (bỏ い) + くてもいいです',
    explanation: 'Biểu thị sự không bắt buộc phải làm một việc nào đó.',
    examples: [
      { jp: '明日は来なくてもいいです。', vn: 'Ngày mai bạn không cần đến cũng được.', furigana: 'あした は こなくても いい です。' },
      { jp: '傘を持っていかなくてもいいです。', vn: 'Không cần mang ô đi cũng được.', furigana: 'かさ を もっていかなくても いい です。' }
    ]
  },
  {
    id: 'n5_25',
    level: 'N5',
    title: '〜ことができます',
    meaning: 'Có thể làm... (Khả năng / Năng lực)',
    structure: 'Động từ thể nguyên dạng (thể từ điển) + ことができます',
    explanation: 'Biểu thị năng lực của bản thân có thể làm gì hoặc hoàn cảnh cho phép làm việc đó.',
    examples: [
      { jp: '日本語を話すことができます。', vn: 'Tôi có thể nói tiếng Nhật.', furigana: 'にほんご を はなす こと が できます。' },
      { jp: 'カードで払うことができますか。', vn: 'Tôi có thể thanh toán bằng thẻ được không?', furigana: 'カード で はらう こと が できますか。' }
    ]
  },
  {
    id: 'n5_26',
    level: 'N5',
    title: '〜まえに',
    meaning: 'Trước khi làm...',
    structure: 'Động từ thể từ điển / Danh từ + の + まえに',
    explanation: 'Chỉ hành động phía sau xảy ra trước hành động hoặc thời điểm ở vế まえに.',
    examples: [
      { jp: '寝る前に本を読みます。', vn: 'Trước khi ngủ tôi đọc sách.', furigana: 'ねる まえ に ほん を よみます。' },
      { jp: '食事の前に手を洗います。', vn: 'Trước bữa ăn tôi rửa tay.', furigana: 'しょくじ の まえ に て を あらいます。' }
    ]
  },
  {
    id: 'n5_27',
    level: 'N5',
    title: '〜たことがあります',
    meaning: 'Đã từng làm... (Kinh nghiệm quá khứ)',
    structure: 'Động từ thể た + ことがあります',
    explanation: 'Nói về trải nghiệm, kinh nghiệm trong quá khứ của người nói.',
    examples: [
      { jp: '富士山に登ったことがあります。', vn: 'Tôi đã từng leo núi Phú Sĩ.', furigana: 'ふじさん に のぼった こと が あります。' },
      { jp: 'すしを食べたことがありません。', vn: 'Tôi chưa từng ăn sushi bao giờ.', furigana: 'すし を たべた こと が ありません。' }
    ]
  },
  {
    id: 'n5_28',
    level: 'N5',
    title: '〜たり〜たりします',
    meaning: 'Lúc thì làm... lúc thì làm... (Liệt kê hành động)',
    structure: 'Động từ 1 (thể た) + り、Động từ 2 (thể た) + り します',
    explanation: 'Liệt kê một vài hành động tiêu biểu không nhất thiết theo thứ tự thời gian.',
    examples: [
      { jp: '休みの日は本を読んだり散歩したりします。', vn: 'Ngày nghỉ lúc thì tôi đọc sách, lúc thì đi dạo.', furigana: 'やすみ の ひ は ほん を よんだり さんぽ したり します。' },
      { jp: '昨日は買い物をしたり映画を見たりしました。', vn: 'Hôm qua tôi đã đi mua sắm và xem phim.', furigana: 'きのう は かいもの を したり えいが を みたり しました。' }
    ]
  },
  {
    id: 'n5_29',
    level: 'N5',
    title: '〜くなります／になります',
    meaning: 'Trở nên... / Trở thành... (Biến đổi trạng thái)',
    structure: 'Tính từ い bỏ い + く / Tính từ な, Danh từ + に + なります',
    explanation: 'Biểu thị sự chuyển biến, thay đổi trạng thái của sự vật hiện tượng.',
    examples: [
      { jp: 'だんだん暖かくなります。', vn: 'Trời dần dần trở nên ấm áp.', furigana: 'だんだん あたたかく なります。' },
      { jp: '将来、医者になりたいです。', vn: 'Tương lai tôi muốn trở thành bác sĩ.', furigana: 'しょうらい、いしゃ に なりたい です。' }
    ]
  },
  {
    id: 'n5_30',
    level: 'N5',
    title: '〜とおもいます',
    meaning: 'Tôi nghĩ rằng... (Ý kiến chủ quan)',
    structure: 'Thể thông thường + と思います',
    explanation: 'Bày tỏ suy nghĩ, quan điểm cá nhân hoặc phỏng đoán về một sự việc.',
    examples: [
      { jp: '明日は雨が降ると思います。', vn: 'Tôi nghĩ rằng ngày mai trời sẽ mưa.', furigana: 'あした は あめ が ふる と おもいます。' },
      { jp: '日本の物価は高いと思います。', vn: 'Tôi nghĩ giá cả ở Nhật Bản khá đắt.', furigana: 'にほん の ぶっか は たかい と おもいます。' }
    ]
  },
  {
    id: 'n5_31',
    level: 'N5',
    title: '〜といいました',
    meaning: 'Đã nói rằng... (Trích dẫn lời nói)',
    structure: 'Thể thông thường + と言いました / "Câu trực tiếp" + と言いました',
    explanation: 'Dùng để trích dẫn lại lời nói trực tiếp hoặc gián tiếp của người khác.',
    examples: [
      { jp: '田中さんは「明日休みます」と言いました。', vn: 'Anh Tanaka đã nói rằng: "Ngày mai tôi xin nghỉ".', furigana: 'たなかさん は 「あした やすみます」 と いいました。' },
      { jp: '先生は来週テストがあると言いました。', vn: 'Thầy giáo nói tuần sau sẽ có bài kiểm tra.', furigana: 'せんせい は らいしゅう テスト が ある と いいました。' }
    ]
  },
  {
    id: 'n5_32',
    level: 'N5',
    title: '〜でしょう',
    meaning: 'Có lẽ là... / Phải không? (Phỏng đoán, xác nhận)',
    structure: 'Thể thông thường (bỏ だ) + でしょう',
    explanation: 'Hạ giọng để phỏng đoán sự việc, lên giọng để xác nhận sự đồng tình của người nghe.',
    examples: [
      { jp: '明日はきっといい天気でしょう。', vn: 'Ngày mai chắc hẳn thời tiết sẽ đẹp.', furigana: 'あした は きっと いい てんき でしょう。' },
      { jp: '北海道は寒かったでしょう。', vn: 'Ở Hokkaido chắc là lạnh lắm nhỉ?', furigana: 'ほっかいどう は さむかった でしょう。' }
    ]
  },
  {
    id: 'n5_33',
    level: 'N5',
    title: '〜が好き／嫌い／上手／下手です',
    meaning: 'Thích / Ghét / Giỏi / Kém cái gì',
    structure: 'Chủ ngữ + は + Đối tượng + が + 好き / 嫌い / 上手 / 下手 です',
    explanation: 'Biểu thị sở thích hoặc năng lực đối với một đối tượng cụ thể đi với trợ từ が.',
    examples: [
      { jp: 'わたしは日本料理が好きです。', vn: 'Tôi rất thích món ăn Nhật Bản.', furigana: 'わたし は にほんりょうり が すき です。' },
      { jp: '彼女はピアノがとても上手です。', vn: 'Cô ấy chơi piano rất giỏi.', furigana: 'かのじょ は ピアノ が とても じょうず です。' }
    ]
  },
  {
    id: 'n5_34',
    level: 'N5',
    title: '〜がほしいです',
    meaning: 'Muốn có... (Mong muốn sở hữu)',
    structure: 'Danh từ + が + ほしいです',
    explanation: 'Diễn tả nguyện vọng muốn sở hữu một đồ vật nào đó của bản thân.',
    examples: [
      { jp: '新しいパソコンがほしいです。', vn: 'Tôi muốn có một chiếc máy tính xách tay mới.', furigana: 'あたらしい パソコン が ほしい です。' },
      { jp: '今、時間がほしいです。', vn: 'Bây giờ tôi muốn có thêm thời gian.', furigana: 'いま、じかん が ほしい です。' }
    ]
  },
  {
    id: 'n5_35',
    level: 'N5',
    title: '〜たいです',
    meaning: 'Muốn làm... (Nguyện vọng hành động)',
    structure: 'Động từ thể ます (bỏ ます) + たいです',
    explanation: 'Bày tỏ mong muốn được thực hiện một hành động nào đó của bản thân.',
    examples: [
      { jp: '日本へ旅行に行きたいです。', vn: 'Tôi muốn đi du lịch Nhật Bản.', furigana: 'にほん へ りょこう に いきたい です。' },
      { jp: '冷たい水が飲みたいです。', vn: 'Tôi muốn uống nước lạnh.', furigana: 'つめたい みず が のみたい です。' }
    ]
  },
  {
    id: 'n5_36',
    level: 'N5',
    title: '〜に行きます (Mục đích di chuyển)',
    meaning: 'Đi đâu để làm mục đích gì',
    structure: 'Địa điểm + へ + V (bỏ ます) / Danh từ hành động + に + 行きます / 来ます',
    explanation: 'Chỉ mục đích của việc di chuyển tới một địa điểm nào đó.',
    examples: [
      { jp: 'スーパーへ買い物に行きます。', vn: 'Tôi đi siêu thị để mua sắm.', furigana: 'スーパー へ かいもの に いきます。' },
      { jp: '図書館へ本を借りに行きました。', vn: 'Tôi đã đến thư viện để mượn sách.', furigana: 'としょかん へ ほん を かりに いきました。' }
    ]
  },
  {
    id: 'n5_37',
    level: 'N5',
    title: '〜より〜のほうが',
    meaning: 'A thì... hơn so với B (So sánh hơn)',
    structure: 'A のほうが + B より + Tính từ です',
    explanation: 'Dùng khi so sánh 2 đối tượng và khẳng định A có tính chất nổi trội hơn B.',
    examples: [
      { jp: '飛行機のほうが新幹線より速いです。', vn: 'Máy bay thì nhanh hơn tàu shinkansen.', furigana: 'ひこうき の ほう が しんかんせん より はやい です。' },
      { jp: 'リンゴのほうがバナナより好きです。', vn: 'Tôi thích táo hơn chuối.', furigana: 'リンゴ の ほう が バナナ より すき です。' }
    ]
  },
  {
    id: 'n5_38',
    level: 'N5',
    title: '〜の中で〜がいちばん',
    meaning: 'Trong số... thì... nhất (So sánh nhất)',
    structure: 'Phạm vi + の中で + Cái gì + が いちばん + Tính từ ですか / です',
    explanation: 'Chọn ra một đối tượng đạt mức độ cao nhất trong một phạm vi cụ thể.',
    examples: [
      { jp: 'スポーツの中でサッカーがいちばん好きです。', vn: 'Trong các môn thể thao tôi thích bóng đá nhất.', furigana: 'スポーツ の なか で サッカー が いちばん すき です。' },
      { jp: '一年の中でいつがいちばん寒いですか。', vn: 'Trong một năm thời điểm nào là lạnh nhất?', furigana: 'いちねん の なか で いつ が いちばん さむい ですか。' }
    ]
  },
  {
    id: 'n5_39',
    level: 'N5',
    title: 'もう〜ました',
    meaning: 'Đã làm... xong rồi',
    structure: 'もう + Động từ thể た (ました)',
    explanation: 'Biểu thị hành động đã hoàn tất trước thời điểm hiện tại.',
    examples: [
      { jp: 'もう宿題をしましたか。', vn: 'Bạn đã làm bài tập về nhà xong chưa?', furigana: 'もう しゅくだい を しましたか。' },
      { jp: 'はい、もう昼ご飯を食べました。', vn: 'Vâng, tôi đã ăn trưa rồi.', furigana: 'はい、もう ひるごはん を たべました。' }
    ]
  },
  {
    id: 'n5_40',
    level: 'N5',
    title: 'まだ〜ていません',
    meaning: 'Vẫn chưa làm... xong',
    structure: 'まだ + Động từ thể て + いません',
    explanation: 'Biểu thị một hành vi được kỳ vọng nhưng đến nay vẫn chưa được thực hiện.',
    examples: [
      { jp: 'まだレポートを書いていません。', vn: 'Tôi vẫn chưa viết báo cáo xong.', furigana: 'まだ レポート を かいて いません。' },
      { jp: '荷物はまだ届いていません。', vn: 'Bưu kiện vẫn chưa được giao đến.', furigana: 'にもつ は まだ とどいて いません。' }
    ]
  },
  {
    id: 'n5_41',
    level: 'N5',
    title: '〜すぎます',
    meaning: 'Quá mức... (Vượt quá giới hạn)',
    structure: 'V bỏ ます / Tính từ い bỏ い / Tính từ な bỏ な + すぎます',
    explanation: 'Diễn tả hành động hoặc trạng thái vượt quá mức bình thường, thường mang sắc thái tiêu cực.',
    examples: [
      { jp: '昨夜、お酒を飲みすぎました。', vn: 'Tối qua tôi đã uống quá nhiều rượu.', furigana: 'ゆうべ、おさけ を のみすぎました。' },
      { jp: 'この問題は難しすぎます。', vn: 'Câu hỏi này quá khó.', furigana: 'この もんだい は むずかしすぎます。' }
    ]
  },
  {
    id: 'n5_42',
    level: 'N5',
    title: '〜やすい／にくい',
    meaning: 'Dễ làm... / Khó làm...',
    structure: 'Động từ thể ます (bỏ ます) + やすい / にくい',
    explanation: 'Chỉ mức độ thuận lợi hoặc khó khăn khi tiến hành một thao tác, hành động.',
    examples: [
      { jp: 'このペンは書きやすいです。', vn: 'Cây bút này rất dễ viết.', furigana: 'この ペン は かきやすい です。' },
      { jp: 'この漢字は覚えにくいです。', vn: 'Chữ Hán này rất khó nhớ.', furigana: 'この かんじ は おぼえにくい です。' }
    ]
  },
  {
    id: 'n5_43',
    level: 'N5',
    title: '〜あげます／もらいます／くれます',
    meaning: 'Cho / Nhận / Tặng cho tôi (Hành vi trao nhận)',
    structure: 'Người tặng は Người nhận に Vật を あげます / もらいます / くれます',
    explanation: 'あげます: cho ai đó; もらいます: nhận từ ai đó; くれます: ai đó tặng cho mình hoặc người thân của mình.',
    examples: [
      { jp: '妹に誕生日プレゼントをあげました。', vn: 'Tôi đã tặng quà sinh nhật cho em gái.', furigana: 'いもうと に たんじょうび プレゼント を あげました。' },
      { jp: '田中さんがこの本をくれました。', vn: 'Anh Tanaka đã tặng cuốn sách này cho tôi.', furigana: 'たなかさん が この ほん を くれました。' }
    ]
  },
  {
    id: 'n5_44',
    level: 'N5',
    title: '〜あとで',
    meaning: 'Sau khi làm...',
    structure: 'Động từ thể た / Danh từ + の + あとで',
    explanation: 'Chỉ hành động phía sau xảy ra sau khi hành động phía trước hoàn thành.',
    examples: [
      { jp: 'ご飯を食べたあとで、散歩します。', vn: 'Sau khi ăn cơm xong, tôi sẽ đi dạo.', furigana: 'ごはん を たべた あと で、さんぽ します。' },
      { jp: '仕事のあとで、飲みに行きませんか。', vn: 'Sau giờ làm việc, cùng đi uống nước nhé?', furigana: 'しごと の あと で、のみ に いきませんか。' }
    ]
  },
  {
    id: 'n5_45',
    level: 'N5',
    title: '〜とき',
    meaning: 'Khi... / Vào lúc...',
    structure: 'Thể thông thường / Tính từ / Danh từ + の + とき',
    explanation: 'Xác định thời điểm hoặc hoàn cảnh xảy ra mệnh đề chính.',
    examples: [
      { jp: '暇なとき、音楽を聞きます。', vn: 'Những lúc rảnh rỗi tôi thường nghe nhạc.', furigana: 'ひまな とき、おんがく を ききます。' },
      { jp: '子どものとき、よく川で泳ぎました。', vn: 'Hồi còn bé tôi hay bơi ở sông.', furigana: 'こども の とき、よく かわ で およぎました。' }
    ]
  },
  {
    id: 'n5_46',
    level: 'N5',
    title: '〜たら',
    meaning: 'Nếu... / Sau khi... (Điều kiện giả định & chuỗi sự việc)',
    structure: 'Động từ thể た + ら',
    explanation: 'Đặt ra giả thuyết "nếu xảy ra A" hoặc diễn tả "sau khi hoàn thành A thì sẽ làm B".',
    examples: [
      { jp: '雨が降ったら、出かけません。', vn: 'Nếu trời mưa thì tôi sẽ không ra ngoài.', furigana: 'あめ が ふったら、でかけません。' },
      { jp: '駅に着いたら、電話してください。', vn: 'Khi nào tới ga thì hãy gọi điện cho tôi nhé.', furigana: 'えき に ついたら、でんわ して ください。' }
    ]
  },
  {
    id: 'n5_47',
    level: 'N5',
    title: '〜ても',
    meaning: 'Dù cho... vẫn cứ... (Điều kiện nghịch)',
    structure: 'V thể て / Tính từ い bỏ い + くても / Tính từ な, N + でも',
    explanation: 'Biểu thị sự việc ở vế sau vẫn diễn ra bất chấp điều kiện bất lợi ở vế trước.',
    examples: [
      { jp: '雨が降っても、サッカーをします。', vn: 'Dù trời mưa chúng tôi vẫn chơi bóng đá.', furigana: 'あめ が ふっても、サッカー を します。' },
      { jp: '高くても、このカメラを買いたいです。', vn: 'Dù đắt tôi vẫn muốn mua chiếc máy ảnh này.', furigana: 'たかくても、この カメラ を かいたい です。' }
    ]
  },
  {
    id: 'n5_48',
    level: 'N5',
    title: '〜んです',
    meaning: 'Là vì... / Thật ra là... (Nhấn mạnh giải thích lý do)',
    structure: 'Thể thông thường (Tính từ な / N + な) + んです',
    explanation: 'Dùng trong hội thoại thân mật để giải thích lý do, bối cảnh một cách nhiệt tình hoặc tò mò hỏi han.',
    examples: [
      { jp: 'どうして遅れたんですか。バスが来なかったんです。', vn: 'Sao bạn lại muộn vậy? Là vì xe buýt không tới ạ.', furigana: 'どうして おくれた ん ですか。バス が こなかった ん です。' },
      { jp: '頭が痛いんです。', vn: 'Thật ra là tôi đang bị đau đầu.', furigana: 'あたま が いたい ん です。' }
    ]
  },
  {
    id: 'n5_49',
    level: 'N5',
    title: '〜ので',
    meaning: 'Bởi vì... (Nguyên nhân khách quan, lịch sự)',
    structure: 'Thể thông thường (Tính từ な / N + な) + ので',
    explanation: 'Nêu lý do khách quan nhẹ nhàng, trang trọng hơn から, thường dùng khi xin phép hoặc xin lỗi.',
    examples: [
      { jp: '気分が悪いので、早退してもいいですか。', vn: 'Vì trong người không khỏe nên tôi xin phép về sớm được không ạ?', furigana: 'きぶん が わるい ので、そうたい しても いい ですか。' },
      { jp: '危ないので、触らないでください。', vn: 'Vì nguy hiểm nên xin đừng chạm vào.', furigana: 'あぶない ので、さわらないで ください。' }
    ]
  },
  {
    id: 'n5_50',
    level: 'N5',
    title: '〜とおなじ',
    meaning: 'Giống như... / Cùng một loại với...',
    structure: 'Danh từ + と同じ',
    explanation: 'Dùng để so sánh sự tương đồng hoặc giống nhau hoàn toàn giữa các đối tượng.',
    examples: [
      { jp: 'わたしの傘はあなたのと同じです。', vn: 'Ô của tôi giống hệt ô của bạn.', furigana: 'わたし の かさ は あなた の と おなじ です。' },
      { jp: '彼と同じ意見を持っています。', vn: 'Tôi có cùng ý kiến với anh ấy.', furigana: 'かれ と おなじ いけん を もっています。' }
    ]
  }
];

// N4 GRAMMAR LIST (50 items)
const N4_LIST = [
  {
    id: 'n4_1',
    level: 'N4',
    title: '〜てみます',
    meaning: 'Thử làm... xem sao',
    structure: 'Động từ thể て + みます',
    explanation: 'Làm một hành động nào đó lần đầu tiên để kiểm nghiệm hoặc xem kết quả ra sao.',
    examples: [
      { jp: '日本の納豆を食べてみます。', vn: 'Tôi sẽ ăn thử món natto của Nhật Bản xem sao.', furigana: 'にほん の なっとう を たべて みます。' },
      { jp: 'この靴を履いてみてもいいですか。', vn: 'Tôi có thể đi thử đôi giày này được không?', furigana: 'この くつ を はいて みても いい ですか。' }
    ]
  },
  {
    id: 'n4_2',
    level: 'N4',
    title: '〜てしまいます',
    meaning: 'Đã lỡ... (Tiếc nuối) / Làm xong trọn vẹn',
    structure: 'Động từ thể て + しまいます / しまいました',
    explanation: 'Biểu thị sự tiếc nuối khi lỡ làm điều không mong muốn, hoặc nhấn mạnh hoàn thành dứt điểm toàn bộ.',
    examples: [
      { jp: 'パスポートを忘れてしまいました。', vn: 'Tôi đã lỡ để quên hộ chiếu mất rồi.', furigana: 'パスポート を わすれて しまいました。' },
      { jp: 'この本を全部読んでしまいました。', vn: 'Tôi đã đọc hết sạch cuốn sách này rồi.', furigana: 'この ほん を ぜんぶ よんで しまいました。' }
    ]
  },
  {
    id: 'n4_3',
    level: 'N4',
    title: '〜てあります',
    meaning: 'Được làm sẵn (Trạng thái có chủ ý)',
    structure: 'Tha động từ thể て + あります',
    explanation: 'Diễn tả trạng thái hiện tại là kết quả của một hành động có chủ đích do ai đó đã làm sẵn.',
    examples: [
      { jp: '壁にカレンダーが掛けてあります。', vn: 'Trên tường có treo sẵn cuốn lịch.', furigana: 'かべ に カレンダー が かけて あります。' },
      { jp: 'ホテルの部屋はもう予約してあります。', vn: 'Phòng khách sạn đã được đặt sẵn rồi.', furigana: 'ホテル の へや は もう よやく して あります。' }
    ]
  },
  {
    id: 'n4_4',
    level: 'N4',
    title: '〜ておきます',
    meaning: 'Làm sẵn trước để chuẩn bị',
    structure: 'Động từ thể て + おきます',
    explanation: 'Làm một hành động sẵn sàng để chuẩn bị cho một sự kiện hoặc mục đích trong tương lai.',
    examples: [
      { jp: '旅行の前に切符を買っておきます。', vn: 'Trước chuyến đi tôi sẽ mua vé sẵn.', furigana: 'りょこう の まえ に きっぷ を かって おきます。' },
      { jp: '使った道具は元の場所に戻しておいてください。', vn: 'Dụng cụ sau khi dùng xin hãy cất sẵn lại chỗ cũ.', furigana: 'つかった どうぐ は もと の ばしょ に もどして おいて ください。' }
    ]
  },
  {
    id: 'n4_5',
    level: 'N4',
    title: '〜意向形 + と思う',
    meaning: 'Dự định làm... (Ý chí chủ quan)',
    structure: 'Động từ thể ý chí (Ý hướng) + と思っています / と思う',
    explanation: 'Bày tỏ ý định thực hiện một việc gì đó mà người nói đã suy nghĩ từ trước tới nay.',
    examples: [
      { jp: '週末は家でゆっくり休もうと思います。', vn: 'Cuối tuần tôi định sẽ nghỉ ngơi thảnh thơi ở nhà.', furigana: 'しゅうまつ は いえ で ゆっくり やすもう と おもいます。' },
      { jp: '来年、留学しようと思っています。', vn: 'Tôi đang có dự định năm sau sẽ đi du học.', furigana: 'らいねん、りゅうがく しよう と おもっています。' }
    ]
  },
  {
    id: 'n4_6',
    level: 'N4',
    title: '〜つもりです',
    meaning: 'Dự định chắc chắn làm...',
    structure: 'Động từ thể từ điển / thể ない + つもりです',
    explanation: 'Biểu thị ý định có tính quyết tâm và kế hoạch rõ ràng hơn thể ý chí.',
    examples: [
      { jp: '大学を卒業したら、日本で働くつもりです。', vn: 'Sau khi tốt nghiệp đại học, tôi dự định làm việc ở Nhật.', furigana: 'だいがく を そつぎょう したら、にほん で はたらく つもり です。' },
      { jp: 'たばこはもう吸わないつもりです。', vn: 'Tôi quyết tâm sẽ không hút thuốc nữa.', furigana: 'たばこ は もう すわない つもり です。' }
    ]
  },
  {
    id: 'n4_7',
    level: 'N4',
    title: '〜予定です',
    meaning: 'Theo lịch trình dự kiến sẽ...',
    structure: 'Động từ thể từ điển / Danh từ + の + 予定です',
    explanation: 'Nói về kế hoạch hoặc lịch trình công cộng, công việc đã được lên lịch sẵn.',
    examples: [
      { jp: '会議は午後２時から始まる予定です。', vn: 'Cuộc họp dự kiến bắt đầu từ 2 giờ chiều.', furigana: 'かいぎ は ごご にじ から はじまる よてい です。' },
      { jp: '来月出張の予定です。', vn: 'Tháng sau tôi có lịch trình đi công tác.', furigana: 'らいげつ しゅっちょう の よてい です。' }
    ]
  },
  {
    id: 'n4_8',
    level: 'N4',
    title: '〜はずです',
    meaning: 'Chắc chắn là... / Đáng lẽ phải...',
    structure: 'Thể thông thường (Tính từ な + な / Danh từ + の) + はずです',
    explanation: 'Căn cứ vào dữ kiện đáng tin cậy để đưa ra phán đoán chắc nịch.',
    examples: [
      { jp: '彼は今日来るはずです。', vn: 'Chắc chắn anh ấy sẽ tới vào hôm nay.', furigana: 'かれ は きょう くる はず です。' },
      { jp: '薬を飲んだから、頭痛は治るはずです。', vn: 'Vì đã uống thuốc nên chắc chắn cơn đau đầu sẽ khỏi.', furigana: 'くすり を のんだ から、ずつう は なおる はず です。' }
    ]
  },
  {
    id: 'n4_9',
    level: 'N4',
    title: '〜かもしれません',
    meaning: 'Có lẽ, có thể... (Khả năng khoảng 50%)',
    structure: 'Thể thông thường (Tính từ な, Danh từ bỏ だ) + かもしれません',
    explanation: 'Phỏng đoán mức độ không chắc chắn, sự việc hoàn toàn có khả năng xảy ra.',
    examples: [
      { jp: '午後から雨が降るかもしれません。', vn: 'Từ chiều có thể trời sẽ mưa.', furigana: 'ごご から あめ が ふる かもしれません。' },
      { jp: '田中さんは遅れるかもしれません。', vn: 'Anh Tanaka có lẽ sẽ đến muộn.', furigana: 'たなかさん は おくれる かもしれません。' }
    ]
  },
  {
    id: 'n4_10',
    level: 'N4',
    title: '〜ようです',
    meaning: 'Dường như, có vẻ như... (Cảm nhận giác quan)',
    structure: 'Thể thông thường (Tính từ な + な / Danh từ + の) + ようです',
    explanation: 'Phán đoán dựa trên những gì mắt thấy, tai nghe hoặc cảm nhận trực tiếp.',
    examples: [
      { jp: '隣の部屋にだれかいるようです。', vn: 'Dường như có ai đó trong phòng bên cạnh.', furigana: 'となり の へや に だれか いる よう です。' },
      { jp: '彼は風邪を引いたようです。', vn: 'Có vẻ như anh ấy đã bị cảm lạnh.', furigana: 'かれ は かぜ を ひいた よう です。' }
    ]
  },
  {
    id: 'n4_11',
    level: 'N4',
    title: '〜そうです (Thị giác)',
    meaning: 'Có vẻ sắp... / Trông có vẻ...',
    structure: 'Động từ bỏ ます / Tính từ い bỏ い / Tính từ な bỏ な + そうです',
    explanation: 'Nhìn bề ngoài và cảm thấy sắp sửa xảy ra một hiện tượng hoặc trạng thái.',
    examples: [
      { jp: '今にも雨が降りそうです。', vn: 'Trời trông có vẻ sắp mưa đến nơi rồi.', furigana: 'いま に も あめ が ふりそう です。' },
      { jp: 'このケーキはとても美味しそうです。', vn: 'Chiếc bánh này trông có vẻ rất ngon.', furigana: 'この ケーキ は とても おいしそう です。' }
    ]
  },
  {
    id: 'n4_12',
    level: 'N4',
    title: '〜そうです (Truyền ngôn)',
    meaning: 'Nghe nói là...',
    structure: 'Thể thông thường + そうです',
    explanation: 'Dùng để truyền đạt lại thông tin nghe được từ báo chí, người khác mà không khẳng định.',
    examples: [
      { jp: '天気予報によると、明日は晴れるそうです。', vn: 'Theo dự báo thời tiết, nghe nói ngày mai trời sẽ nắng.', furigana: 'てんきよほう に よると、あした は はれる そう です。' },
      { jp: '田中さんは来月結婚するそうです。', vn: 'Nghe nói anh Tanaka tháng sau sẽ kết hôn.', furigana: 'たなかさん は らいげつ けっこん する そう です。' }
    ]
  },
  {
    id: 'n4_13',
    level: 'N4',
    title: '〜らしいです',
    meaning: 'Nghe nói là, dường như là...',
    structure: 'Thể thông thường (Tính từ な, Danh từ bỏ だ) + らしいです',
    explanation: 'Phỏng đoán dựa trên tin đồn hoặc nguồn tin gián tiếp đáng tin cậy.',
    examples: [
      { jp: 'あの店はとても人気があるらしいです。', vn: 'Nghe nói cửa tiệm đằng kia rất được yêu thích.', furigana: 'あの みせ は とても にんき が ある らしい です。' },
      { jp: '部長は明日休むらしいです。', vn: 'Hình như ngày mai trưởng phòng nghỉ phép.', furigana: 'ぶちょう は あした やすむ らしい です。' }
    ]
  },
  {
    id: 'n4_14',
    level: 'N4',
    title: '〜受身形 (Thể bị động)',
    meaning: 'Bị... / Được... (Chịu tác động)',
    structure: 'Nhóm 1: âm u -> are; Nhóm 2: + rare; Nhóm 3: される / こられる',
    explanation: 'Chủ ngữ là đối tượng tiếp nhận hành động từ người khác thực hiện.',
    examples: [
      { jp: '先生に褒められました。', vn: 'Tôi đã được thầy giáo khen ngợi.', furigana: 'せんせい に ほめられました。' },
      { jp: '雨に降られて濡れました。', vn: 'Tôi bị dính mưa nên ướt sũng.', furigana: 'あめ に ふられて ぬれました。' }
    ]
  },
  {
    id: 'n4_15',
    level: 'N4',
    title: '〜使役形 (Thể sai khiến)',
    meaning: 'Bắt... / Cho phép làm...',
    structure: 'Nhóm 1: âm u -> ase; Nhóm 2: + sase; Nhóm 3: させる / こさせる',
    explanation: 'Người có quyền lực/vị thế cao hơn yêu cầu hoặc cho phép người dưới thực hiện hành vi.',
    examples: [
      { jp: '母は弟に部屋を掃除させました。', vn: 'Mẹ bắt em trai phải dọn dẹp phòng.', furigana: 'はは は おとうと に へや を そうじ させました。' },
      { jp: '先生は生徒に自由に質問させます。', vn: 'Thầy giáo cho phép học sinh đặt câu hỏi tự do.', furigana: 'せんせい は せいと に じゆう に しつもん させます。' }
    ]
  },
  {
    id: 'n4_16',
    level: 'N4',
    title: '〜使役受身 (Thể bị sai khiến)',
    meaning: 'Bị bắt buộc phải làm...',
    structure: 'Động từ thể sai khiến bị động (せられる / させられる)',
    explanation: 'Bị người khác ép buộc phải làm một việc mà bản thân không hề muốn.',
    examples: [
      { jp: 'カラオケで歌を歌わされました。', vn: 'Tôi bị bắt phải hát ở quán karaoke.', furigana: 'カラオケ で うた を うたわされました。' },
      { jp: '子どもはお母さんに野菜を食べさせられました。', vn: 'Đứa bé bị mẹ ép phải ăn rau.', furigana: 'こども は おかあさん に やさい を たべさせられました。' }
    ]
  },
  {
    id: 'n4_17',
    level: 'N4',
    title: '〜てくれる／あげる／もらう',
    meaning: 'Làm giúp / Được làm giúp (Ân huệ hành động)',
    structure: 'Động từ thể て + くれます / あげます / もらいます',
    explanation: 'Thể hiện mối quan hệ trao đổi ân huệ thông qua việc thực hiện hành động.',
    examples: [
      { jp: '友達が引っ越しを手伝ってくれました。', vn: 'Bạn bè đã giúp tôi chuyển nhà.', furigana: 'ともだち が ひっこし を てつだって くれました。' },
      { jp: '先生に日本語を教えてもらいました。', vn: 'Tôi được thầy giáo chỉ dạy tiếng Nhật cho.', furigana: 'せんせい に にほんご を おしえて もらいました。' }
    ]
  },
  {
    id: 'n4_18',
    level: 'N4',
    title: '〜ていただけませんか',
    meaning: 'Làm ơn làm giúp tôi... được không ạ? (Nhờ vả rất lịch sự)',
    structure: 'Động từ thể て + いただけませんか / もらえませんか',
    explanation: 'Cách nhờ vả cấp trên hoặc người lạ giúp đỡ một cách hết sức lịch thiệp.',
    examples: [
      { jp: 'もう一度説明していただけませんか。', vn: 'Làm ơn giải thích lại một lần nữa giúp tôi được không ạ?', furigana: 'もう いちど せつめい して いただけませんか。' },
      { jp: '書き方を教えていただけませんか。', vn: 'Làm ơn chỉ cho tôi cách viết được không ạ?', furigana: 'かきかた を おしえて いただけませんか。' }
    ]
  },
  {
    id: 'n4_19',
    level: 'N4',
    title: '〜なら',
    meaning: 'Nếu là... (Đưa ra gợi ý theo chủ đề)',
    structure: 'Danh từ / Thể thông thường + なら',
    explanation: 'Tiếp nhận chủ đề người đối thoại đưa ra và đưa ra lời khuyên hoặc ý kiến về chủ đề đó.',
    examples: [
      { jp: '京都へ行くなら、秋がおすすめです。', vn: 'Nếu là đi Kyoto thì mùa thu là tuyệt nhất.', furigana: 'きょうと へ いく なら、あき が おすすめ です。' },
      { jp: '日本料理なら、天ぷらがいちばん好きです。', vn: 'Nếu là món ăn Nhật thì tôi thích món tempura nhất.', furigana: 'にほんりょうり なら、てんぷら が いちばん すき です。' }
    ]
  },
  {
    id: 'n4_20',
    level: 'N4',
    title: '〜ば',
    meaning: 'Nếu... (Điều kiện giả định thuận)',
    structure: 'Nhóm 1: âm u -> eba; Nhóm 2: + reba; Tính từ い: bỏ い + ければ',
    explanation: 'Điều kiện giả định tất yếu, nếu thỏa mãn vế A thì vế B sẽ xảy ra.',
    examples: [
      { jp: '安ければ、買います。', vn: 'Nếu rẻ thì tôi sẽ mua.', furigana: 'やすければ、かいます。' },
      { jp: '練習すれば、上手に話せるようになります。', vn: 'Nếu chăm chỉ luyện tập bạn sẽ nói giỏi lên.', furigana: 'れんしゅう すれば、じょうず に はなせる よう に なります。' }
    ]
  },
  {
    id: 'n4_21',
    level: 'N4',
    title: '〜と (Điều kiện tự nhiên)',
    meaning: 'Hễ mà... thì đương nhiên...',
    structure: 'Động từ thể từ điển + と',
    explanation: 'Diễn tả quy luật tự nhiên, chỉ đường, hoặc phản ứng máy móc tất yếu.',
    examples: [
      { jp: 'このボタンを押すと、お釣りが出ます。', vn: 'Hễ ấn nút này thì tiền thừa sẽ chạy ra.', furigana: 'この ボタン を おす と、おつり が でます。' },
      { jp: '春になると、桜が咲きます。', vn: 'Hễ mùa xuân tới là hoa anh đào lại nở rộ.', furigana: 'はる に なる と、さくら が さきます。' }
    ]
  },
  {
    id: 'n4_22',
    level: 'N4',
    title: '〜ようにします',
    meaning: 'Cố gắng tạo thói quen làm...',
    structure: 'Động từ thể từ điển / thể ない + ようにします / ようにしています',
    explanation: 'Biểu thị sự nỗ lực duy trì một thói quen tốt hoặc từ bỏ thói quen xấu hàng ngày.',
    examples: [
      { jp: '毎日野菜をたくさん食べるようにしています。', vn: 'Tôi luôn cố gắng ăn thật nhiều rau mỗi ngày.', furigana: 'まいにち やさい を たくさん たべる よう に しています。' },
      { jp: '夜遅く甘いものを食べないようにします。', vn: 'Tôi sẽ cố gắng không ăn đồ ngọt lúc đêm muộn.', furigana: 'よる おそく あまい もの を たべない よう に します。' }
    ]
  },
  {
    id: 'n4_23',
    level: 'N4',
    title: '〜ようになります',
    meaning: 'Dần dần trở nên có thể làm...',
    structure: 'Động từ thể khả năng + ようになります',
    explanation: 'Biểu thị sự biến đổi năng lực từ chưa thể làm sang đã có thể làm được.',
    examples: [
      { jp: '日本語の新聞が読めるようになりました。', vn: 'Tôi đã dần đọc được báo tiếng Nhật.', furigana: 'にほんご の しんぶん が よめる よう に なりました。' },
      { jp: '一人で泳げるようになりました。', vn: 'Tôi đã biết tự bơi một mình.', furigana: 'ひとり で およげる よう に なりました。' }
    ]
  },
  {
    id: 'n4_24',
    level: 'N4',
    title: '〜ように (Mục đích)',
    meaning: 'Để mà... (Không tự chủ)',
    structure: 'Động từ thể từ điển / thể ない (thường là vô ý chí) + ように',
    explanation: 'Chỉ mục đích nhằm đạt được một trạng thái mong muốn.',
    examples: [
      { jp: '忘れないように、メモを取ります。', vn: 'Để không bị quên, tôi ghi chú lại.', furigana: 'わすれない よう に、メモ を とります。' },
      { jp: '後ろの人にも聞こえるように、大きな声で話してください。', vn: 'Để người phía sau cũng nghe được, xin hãy nói lớn tiếng.', furigana: 'うしろ の ひと に も きこえる よう に、おおきな こえ で はなして ください。' }
    ]
  },
  {
    id: 'n4_25',
    level: 'N4',
    title: '〜ために (Mục đích / Nguyên nhân)',
    meaning: 'Để... (Có ý chí) / Vì (Nguyên nhân)',
    structure: 'Động từ thể từ điển / Danh từ + の + ために',
    explanation: 'Mục đích có chủ đích rõ rệt của con người hoặc nguyên nhân gây nên biến cố.',
    examples: [
      { jp: '新しい家を買うために、貯金しています。', vn: 'Để mua nhà mới, tôi đang tiết kiệm tiền.', furigana: 'あたらしい いえ を かう ため に、ちょきん しています。' },
      { jp: '台風のために、電車が止まりました。', vn: 'Vì cơn bão nên tàu điện đã phải ngừng chạy.', furigana: 'たいふう の ため に、でんしゃ が とまりました。' }
    ]
  },
  {
    id: 'n4_26',
    level: 'N4',
    title: '〜し〜し',
    meaning: 'Vừa... lại vừa... (Liệt kê lý do)',
    structure: 'Thể thông thường + し、Thể thông thường + し',
    explanation: 'Liệt kê từ 2 lý do, nguyên nhân trở lên dẫn đến một phán đoán hoặc kết luận.',
    examples: [
      { jp: 'この店は美味しいし、安いし、いつも混んでいます。', vn: 'Quán này vừa ngon, lại vừa rẻ, nên lúc nào cũng đông khách.', furigana: 'この みせ は おいしい し、やすい し、いつも こんでいます。' },
      { jp: '頭も痛いし、熱もあるから、今日は休みます。', vn: 'Vừa đau đầu lại vừa sốt nên hôm nay tôi xin nghỉ.', furigana: 'あたま も いたい し、ねつ も ある から、きょう は やすみます。' }
    ]
  },
  {
    id: 'n4_27',
    level: 'N4',
    title: '〜のに',
    meaning: 'Dù rằng... thế mà (Bất mãn, bất ngờ)',
    structure: 'Thể thông thường (Tính từ な, Danh từ + な) + のに',
    explanation: 'Nối hai vế đối lập, biểu thị tâm trạng tiếc nuối, bất ngờ hoặc oán trách ngoài dự tính.',
    examples: [
      { jp: '一生懸命勉強したのに、不合格でした。', vn: 'Dù đã học hết sức mình thế mà lại trượt.', furigana: 'いっしょうけんめい べんきょう した のに、ふごうかく でした。' },
      { jp: '約束したのに、彼は来ませんでした。', vn: 'Đã hẹn trước rồi thế mà anh ấy không tới.', furigana: 'やくそく した のに、かれ は きませんでした。' }
    ]
  },
  {
    id: 'n4_28',
    level: 'N4',
    title: '〜ばかり',
    meaning: 'Chỉ toàn là... (Mang sắc thái chê trách)',
    structure: 'Danh từ + ばかり / Động từ thể て + ばかりいる',
    explanation: 'Lặp đi lặp lại một hành động hoặc sự vật quá nhiều, khiến người nói không hài lòng.',
    examples: [
      { jp: '弟は遊んでばかりいます。', vn: 'Em trai tôi suốt ngày chỉ toàn chơi bời.', furigana: 'おとうと は あそんで ばかり います。' },
      { jp: '肉ばかり食べないで、野菜も食べなさい。', vn: 'Đừng có chỉ ăn toàn thịt, hãy ăn cả rau nữa đi.', furigana: 'にく ばかり たべないで、やさい も たべなさい。' }
    ]
  },
  {
    id: 'n4_29',
    level: 'N4',
    title: '〜たばかり',
    meaning: 'Vừa mới làm... xong tức thì',
    structure: 'Động từ thể た + ばかり',
    explanation: 'Theo cảm nhận chủ quan của người nói, sự việc vừa mới hoàn thành cách đây không lâu.',
    examples: [
      { jp: '日本に来たばかりです。', vn: 'Tôi vừa mới tới Nhật Bản thôi.', furigana: 'にほん に きた ばかり です。' },
      { jp: 'さっき昼ご飯を食べたばかりなのに、もうお腹が空きました。', vn: 'Vừa mới ăn trưa lúc nãy xong thế mà đã đói bụng rồi.', furigana: 'さっき ひるごはん を たべた ばかり なのに、もう おなか が すきました。' }
    ]
  },
  {
    id: 'n4_30',
    level: 'N4',
    title: '〜ところです',
    meaning: 'Đúng lúc sắp / đang / vừa mới làm',
    structure: 'V từ điển + ところ / V thể ている + ところ / V thể た + ところ',
    explanation: 'Xác định điểm mốc cực kỳ chuẩn xác của hành động (chuẩn bị làm, đang làm dở, hay vừa dứt).',
    examples: [
      { jp: '今から出かけるところです。', vn: 'Bây giờ tôi đúng lúc đang chuẩn bị đi ra ngoài.', furigana: 'いま から でかける ところ です。' },
      { jp: '今、ご飯を食べているところです。', vn: 'Tôi đúng lúc đang ngồi ăn cơm.', furigana: 'いま、ごはん を たべて いる ところ です。' }
    ]
  },
  {
    id: 'n4_31',
    level: 'N4',
    title: '〜がる／がっている',
    meaning: 'Cảm thấy, tỏ ra... (Cảm xúc ngôi thứ 3)',
    structure: 'Tính từ い bỏ い / Tính từ な bỏ な + がる / がっている',
    explanation: 'Miêu tả cảm xúc, mong muốn của người thứ ba bộc lộ ra ngoài qua nét mặt, cử chỉ.',
    examples: [
      { jp: '子どもが新しいおもちゃを欲しがっています。', vn: 'Đứa bé đang tỏ ra rất muốn có món đồ chơi mới.', furigana: 'こども が あたらしい おもちゃ を ほしがっています。' },
      { jp: '彼は寒がっています。', vn: 'Anh ấy trông có vẻ đang thấy rất lạnh.', furigana: 'かれ は さむがっています。' }
    ]
  },
  {
    id: 'n4_32',
    level: 'N4',
    title: '〜はずがない',
    meaning: 'Tuyệt đối không thể nào có chuyện...',
    structure: 'Thể thông thường + はずがない',
    explanation: 'Phủ định hoàn toàn khả năng xảy ra của một sự việc dựa trên chứng cứ chắc chắn.',
    examples: [
      { jp: 'そんなはずがありません。', vn: 'Không thể nào có chuyện như thế được.', furigana: 'そんな はず が ありません。' },
      { jp: '彼が嘘をつくはずがありません。', vn: 'Anh ấy tuyệt đối không thể nào nói dối được.', furigana: 'かれ が うそ を つく はず が ありません。' }
    ]
  },
  {
    id: 'n4_33',
    level: 'N4',
    title: '〜ずに',
    meaning: 'Làm gì mà không làm... (= ないで)',
    structure: 'Động từ thể ない bỏ ない + ずに (する -> せずに)',
    explanation: 'Cách diễn đạt trang trọng hơn của ないで, làm hành động B trong trạng thái không làm A.',
    examples: [
      { jp: '朝ご飯を食べずに学校へ行きました。', vn: 'Tôi đã đến trường mà không ăn bữa sáng.', furigana: 'あさごはん を たべずに がっこう へ いきました。' },
      { jp: '辞書を見ずに新聞を読みます。', vn: 'Tôi đọc báo mà không cần tra từ điển.', furigana: 'じしょ を みずに しんぶん を よみます。' }
    ]
  },
  {
    id: 'n4_34',
    level: 'N4',
    title: '〜お／ご〜になる (Tôn kính ngữ)',
    meaning: 'Kính thưa quý khách làm...',
    structure: 'お + V nhóm 1,2 bỏ ます + になります / ご + Danh từ hành động + になります',
    explanation: 'Dạng tôn kính ngữ chuẩn mực nâng cao vị thế hành động của đối phương hoặc cấp trên.',
    examples: [
      { jp: '社長はお帰りになりました。', vn: 'Giám đốc đã về nhà rồi ạ.', furigana: 'しゃちょう は おかえり に なりました。' },
      { jp: 'こちらでお名前をご記入ください。', vn: 'Xin quý khách vui lòng điền tên vào đây ạ.', furigana: 'こちら で おなまえ を ごきにゅう ください。' }
    ]
  },
  {
    id: 'n4_35',
    level: 'N4',
    title: '〜お／ご〜する (Khiêm nhường ngữ)',
    meaning: 'Tôi xin phép được làm... cho ngài',
    structure: 'お + V nhóm 1,2 bỏ ます + します / ご + Danh từ hành động + します',
    explanation: 'Hạ thấp hành động của bản thân để biểu thị sự tôn trọng kính cẩn đối với đối phương.',
    examples: [
      { jp: '荷物をお持ちします。', vn: 'Tôi xin phép được xách hành lý giúp ngài.', furigana: 'にもつ を おもち します。' },
      { jp: '明日スケジュールをご連絡します。', vn: 'Ngày mai tôi xin phép liên lạc báo lịch trình.', furigana: 'あした スケジュール を ごれんらく します。' }
    ]
  },
  {
    id: 'n4_36',
    level: 'N4',
    title: '〜なさる／おっしゃる／いらっしゃる',
    meaning: 'Tôn kính ngữ đặc biệt',
    structure: 'Động từ tôn kính từ vựng đặc biệt thay thế động từ thông thường',
    explanation: 'いらっしゃる (đi/đến/ở), おっしゃる (nói), なさる (làm), ご覧になる (xem), 召し上がる (ăn/uống).',
    examples: [
      { jp: '先生は何とおっしゃいましたか。', vn: 'Thầy giáo đã nói điều gì vậy ạ?', furigana: 'せんせい は なん と おっしゃいました か。' },
      { jp: 'どうぞ召し上がってください。', vn: 'Xin mời quý khách dùng bữa ạ.', furigana: 'どうぞ めしあがって ください。' }
    ]
  },
  {
    id: 'n4_37',
    level: 'N4',
    title: '〜まいる／もうす／いただく',
    meaning: 'Khiêm nhường ngữ đặc biệt',
    structure: 'Động từ khiêm nhường từ vựng đặc biệt của người nói',
    explanation: 'まいる (đi/đến), もうす (nói), いただく (ăn/uống/nhận), お目にかかる (gặp), ぞんじる (biết).',
    examples: [
      { jp: '明日１０時に伺います。', vn: 'Ngày mai lúc 10 giờ tôi xin phép tới thăm ạ.', furigana: 'あした じゅうじ に うかがいます。' },
      { jp: 'ナムと申します。どうぞよろしくお願いします。', vn: 'Tôi tên là Nam. Rất mong được giúp đỡ ạ.', furigana: 'ナム と もうします。どうぞ よろしく おねがい します。' }
    ]
  },
  {
    id: 'n4_38',
    level: 'N4',
    title: '〜命令形・禁止形 (Mệnh lệnh & Cấm chỉ)',
    meaning: 'Làm đi! / Cấm không được làm!',
    structure: 'Mệnh lệnh: âm e / ろ; Cấm chỉ: Động từ thể từ điển + な',
    explanation: 'Dùng trong trường hợp khẩn cấp (cứu hộ, biển báo giao thông, cổ vũ thể thao) hoặc cấp trên quát mắng.',
    examples: [
      { jp: '早く走れ！', vn: 'Chạy nhanh lên!', furigana: 'はやく はしれ！' },
      { jp: 'ここにゴミを捨てるな。', vn: 'Cấm vứt rác ở đây.', furigana: 'ここに ゴミ を すてる な。' }
    ]
  },
  {
    id: 'n4_39',
    level: 'N4',
    title: '〜か〜どうか',
    meaning: 'Có... hay không',
    structure: 'Thể thông thường + かどうか',
    explanation: 'Lồng câu hỏi không có từ để hỏi vào trong một mệnh đề câu lớn hơn.',
    examples: [
      { jp: '美味しいかどうか食べてみてください。', vn: 'Hãy ăn thử xem có ngon hay không nhé.', furigana: 'おいしい か どうか たべて みて ください。' },
      { jp: '彼が来るかどうか分かりません。', vn: 'Tôi không biết liệu anh ấy có tới hay không.', furigana: 'かれ が くる か どうか わかりません。' }
    ]
  },
  {
    id: 'n4_40',
    level: 'N4',
    title: '〜疑问 từ + か',
    meaning: 'Ai đó, cái gì đó, ở đâu đó...',
    structure: 'だれか / 何か / どこか / いつか',
    explanation: 'Chỉ đối tượng bất định chưa xác định rõ danh tính hoặc vị trí.',
    examples: [
      { jp: 'だれか部屋にいますか。', vn: 'Có ai đó trong phòng không?', furigana: 'だれか へや に いますか。' },
      { jp: 'のどが渇いたので、何か飲みたいです。', vn: 'Khát nước quá nên tôi muốn uống cái gì đó.', furigana: 'のど が かわいた ので、なにか のみたい です。' }
    ]
  },
  {
    id: 'n4_41',
    level: 'N4',
    title: '〜てよかった',
    meaning: 'Thật may vì đã làm...',
    structure: 'Động từ thể て + よかった',
    explanation: 'Bày tỏ sự nhẹ nhõm, vui mừng vì đã kịp thời thực hiện một hành động đúng đắn.',
    examples: [
      { jp: '傘を持ってきてよかったです。', vn: 'Thật may vì tôi đã mang theo ô.', furigana: 'かさ を もってきて よかった です。' },
      { jp: '先生に相談してよかったです。', vn: 'Thật may vì tôi đã trao đổi trước với thầy giáo.', furigana: 'せんせい に そうだん して よかった です。' }
    ]
  },
  {
    id: 'n4_42',
    level: 'N4',
    title: '〜てもかまいません',
    meaning: 'Dù có làm... cũng không sao cả',
    structure: 'Động từ thể て + もかまいません',
    explanation: 'Cách diễn đạt lịch sự biểu thị sự chấp thuận, không phiền lòng.',
    examples: [
      { jp: '靴を履いたままでもかまいません。', vn: 'Cứ mang cả giày vào cũng không sao đâu ạ.', furigana: 'くつ を はいた まま でも かまいません。' },
      { jp: '明日電話してもかまいませんか。', vn: 'Ngày mai tôi gọi điện có phiền không ạ?', furigana: 'あした でんわ しても かまいません か。' }
    ]
  },
  {
    id: 'n4_43',
    level: 'N4',
    title: '〜なさい',
    meaning: 'Hãy làm... đi (Lời nhắc nhở của người lớn)',
    structure: 'Động từ thể ます (bỏ ます) + なさい',
    explanation: 'Dùng khi cha mẹ nhắc nhở con cái hoặc giáo viên yêu cầu học sinh làm bài.',
    examples: [
      { jp: '早く起きなさい。もう時間ですよ。', vn: 'Dậy nhanh lên con. Đã đến giờ rồi đấy.', furigana: 'はやく おきなさい。もう じかん ですよ。' },
      { jp: '宿題を早く出しなさい。', vn: 'Hãy nộp bài tập về nhà nhanh lên.', furigana: 'しゅくだい を はやく だしなさい。' }
    ]
  },
  {
    id: 'n4_44',
    level: 'N4',
    title: '〜まま',
    meaning: 'Để nguyên trạng thái không đổi...',
    structure: 'Động từ thể た / thể ない / Danh từ + の + まま',
    explanation: 'Hành động tiếp theo diễn ra khi trạng thái trước đó vẫn được giữ nguyên không thay đổi.',
    examples: [
      { jp: 'テレビをつけたまま寝てしまいました。', vn: 'Tôi đã để nguyên tivi bật mà ngủ thiếp đi.', furigana: 'テレビ を つけた まま ねて しまいました。' },
      { jp: '生のまま食べられます。', vn: 'Có thể ăn sống nguyên như vậy.', furigana: 'なま の まま たべられます。' }
    ]
  },
  {
    id: 'n4_45',
    level: 'N4',
    title: '〜っぱなし',
    meaning: 'Bỏ mặc nguyên xi (Bất cẩn, cẩu thả)',
    structure: 'Động từ thể ます (bỏ ます) + っぱなし',
    explanation: 'Để nguyên một trạng thái đáng lẽ phải dọn dẹp hoặc tắt đi, mang ý chê trách.',
    examples: [
      { jp: '水を出しっぱなしにしないでください。', vn: 'Xin đừng xả nước chảy tràn lan như thế.', furigana: 'みず を だしっぱなし に しないで ください。' },
      { jp: '一日中立ちっぱなしで足が痛いです。', vn: 'Đứng suốt cả ngày trời nên chân tôi đau nhức.', furigana: 'いちにちじゅう たちっぱなし で あし が いたい です。' }
    ]
  },
  {
    id: 'n4_46',
    level: 'N4',
    title: '〜方 (かた)',
    meaning: 'Cách làm...',
    structure: 'Động từ thể ます (bỏ ます) + 方',
    explanation: 'Biến động từ thành danh từ chỉ phương pháp, cách thức tiến hành công việc.',
    examples: [
      { jp: 'この漢字の読み方を教えてください。', vn: 'Xin hãy chỉ cho tôi cách đọc chữ Hán này.', furigana: 'この かんじ の よみかた を おしえて ください。' },
      { jp: 'パソコンの使い方が分かりません。', vn: 'Tôi không hiểu cách sử dụng chiếc máy tính này.', furigana: 'パソコン の つかいかた が わかりません。' }
    ]
  },
  {
    id: 'n4_47',
    level: 'N4',
    title: '〜間／間に',
    meaning: 'Trong suốt khi... / Trong khoảng khi...',
    structure: 'Thể từ điển / Danh từ + の + 間 / 間に',
    explanation: '間: hành động diễn ra liên tục song song; 間に: một hành động ngắn xảy ra chèn ngang.',
    examples: [
      { jp: '夏休みの間、ずっと祖母の家にいました。', vn: 'Suốt kỳ nghỉ hè, tôi ở suốt nhà bà ngoại.', furigana: 'なつやすみ の あいだ、ずっと そぼ の いえ に いました。' },
      { jp: '留守の間に泥棒が入りました。', vn: 'Trong lúc vắng nhà, trộm đã lẻn vào.', furigana: 'るす の あいだ に どろぼう が はいりました。' }
    ]
  },
  {
    id: 'n4_48',
    level: 'N4',
    title: '〜始める／終わる',
    meaning: 'Bắt đầu làm... / Kết thúc làm...',
    structure: 'Động từ thể ます (bỏ ます) + 始める / 終わる',
    explanation: 'Chỉ điểm khởi đầu hoặc điểm hoàn tất của một hành trình hành động.',
    examples: [
      { jp: '雨が降り始めました。', vn: 'Trời đã bắt đầu đổ mưa.', furigana: 'あめ が ふりはじめました。' },
      { jp: '本を読み終わったら、返してください。', vn: 'Khi nào đọc xong sách xin hãy trả lại cho tôi.', furigana: 'ほん を よみおわったら、かえして ください。' }
    ]
  },
  {
    id: 'n4_49',
    level: 'N4',
    title: '〜続ける',
    meaning: 'Tiếp tục làm... không ngừng',
    structure: 'Động từ thể ます (bỏ ます) + 続ける',
    explanation: 'Duy trì hành động liên tục trong một khoảng thời gian dài không ngắt quãng.',
    examples: [
      { jp: '諦めないで日本語を勉強し続けます。', vn: 'Tôi sẽ không bỏ cuộc mà tiếp tục kiên trì học tiếng Nhật.', furigana: 'あきらめないで にほんご を べんきょう しつづけます。' },
      { jp: '雨が三日間降り続きました。', vn: 'Mưa đã rơi liên tục suốt 3 ngày liền.', furigana: 'あめ が みっかかん ふりつづけました。' }
    ]
  },
  {
    id: 'n4_50',
    level: 'N4',
    title: '〜やすい／にくい',
    meaning: 'Dễ làm... / Khó làm... (Tính chất khách quan)',
    structure: 'Động từ thể ます (bỏ ます) + やすい / にくい',
    explanation: 'Bản chất sự vật làm cho thao tác trở nên thuận lợi hoặc cản trở.',
    examples: [
      { jp: 'この薬は苦くないので、飲みやすいです。', vn: 'Thuốc này không đắng nên rất dễ uống.', furigana: 'この くすり は にがくない ので、のみやすい です。' },
      { jp: '暗い部屋では文字が読みにくいです。', vn: 'Trong phòng tối thì rất khó đọc chữ.', furigana: 'くらい へや では もじ が よみにくい です。' }
    ]
  }
];

// Load templates for N3, N2, N1 via modular builder
function generateLevelGrammar(level, prefix, count, items) {
  return items.map((item, idx) => ({
    id: `${prefix}_${idx + 1}`,
    level: level,
    title: item.title,
    meaning: item.meaning,
    structure: item.structure,
    explanation: item.explanation,
    examples: item.examples
  }));
}

// Write the master dataset
console.log('[*] Đang biên soạn dữ liệu N3, N2, N1 (Mỗi cấp 50 mẫu ngữ pháp)...');
const scriptBuilderPath = path.join(__dirname, 'grammar_dataset_builder.js');
const datasetBuilder = require(scriptBuilderPath);

const finalGrammarData = {
  N5: N5_LIST,
  N4: N4_LIST,
  N3: datasetBuilder.N3_DATA,
  N2: datasetBuilder.N2_DATA,
  N1: datasetBuilder.N1_DATA
};

console.log(`[✓] N5: ${finalGrammarData.N5.length} mẫu ngữ pháp`);
console.log(`[✓] N4: ${finalGrammarData.N4.length} mẫu ngữ pháp`);
console.log(`[✓] N3: ${finalGrammarData.N3.length} mẫu ngữ pháp`);
console.log(`[✓] N2: ${finalGrammarData.N2.length} mẫu ngữ pháp`);
console.log(`[✓] N1: ${finalGrammarData.N1.length} mẫu ngữ pháp`);

const targetFilePath = path.join(projectRoot, 'lib/grammarData.js');

// Đọc phần CONJUGATION_DRILL_VERBS từ file hiện tại
const currentFileContent = fs.readFileSync(targetFilePath, 'utf8');
const drillIndex = currentFileContent.indexOf('export const CONJUGATION_DRILL_VERBS =');
const drillContent = drillIndex !== -1 ? currentFileContent.slice(drillIndex) : '';

const outputContent = `// Dữ liệu Ngữ pháp Chuẩn JLPT N5 - N1 (Mỗi cấp độ tối thiểu 50 mẫu ngữ pháp đầy đủ ví dụ & âm thanh)
// Tổng cộng hơn 250 mẫu ngữ pháp được biên soạn chuẩn mực theo giáo trình quốc tế

export const GRAMMAR_DATA = ${JSON.stringify(finalGrammarData, null, 2)};

${drillContent}
`;

fs.writeFileSync(targetFilePath, outputContent, 'utf8');
console.log('[✓] Đã ghi thành công vào lib/grammarData.js!');
console.log('=== HOÀN TẤT THÀNH CÔNG ===');
