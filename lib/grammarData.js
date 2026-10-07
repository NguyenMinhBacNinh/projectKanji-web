// Dữ liệu Ngữ pháp JLPT N5 - N1 và Quy tắc chia động từ tiếng Nhật

export const GRAMMAR_DATA = {
  N5: [
    {
      id: 'n5_1',
      level: 'N5',
      title: '〜は〜です',
      meaning: 'A là B (Khẳng định cơ bản)',
      structure: 'Danh từ 1 + は + Danh từ 2 + です',
      explanation: 'Dùng để giới thiệu danh tính, nghề nghiệp, quốc tịch hoặc trạng thái cơ bản của chủ ngữ.',
      examples: [
        {
          jp: 'わたしは学生です。',
          vn: 'Tôi là học sinh.',
          furigana: 'わたしは がくせい です。',
        },
        {
          jp: 'これは日本語の本です。',
          vn: 'Đây là cuốn sách tiếng Nhật.',
          furigana: 'これは にほんご の ほん です。',
        },
      ],
    },
    {
      id: 'n5_2',
      level: 'N5',
      title: '〜があります／います',
      meaning: 'Có (sự tồn tại của đồ vật / người, con vật)',
      structure: 'Địa điểm + に + Vật (が あります) / Người, động vật (が います)',
      explanation: 'あります dùng cho vật vô tri vô giác, cây cối. います dùng cho sinh vật cử động được (người, động vật).',
      examples: [
        {
          jp: '机の上に本があります。',
          vn: 'Trên bàn có cuốn sách.',
          furigana: 'つくえ の うえ に ほん が あります。',
        },
        {
          jp: '庭に猫がいます。',
          vn: 'Trong vườn có một con mèo.',
          furigana: 'にわ に ねこ が います。',
        },
      ],
    },
    {
      id: 'n5_3',
      level: 'N5',
      title: '〜てください',
      meaning: 'Hãy làm V (Đề nghị, yêu cầu lịch sự)',
      structure: 'Động từ thể て + ください',
      explanation: 'Dùng khi muốn yêu cầu, nhờ vả đối phương làm một hành động nào đó một cách lịch sự.',
      examples: [
        {
          jp: '日本語で話してください。',
          vn: 'Xin hãy nói bằng tiếng Nhật.',
          furigana: 'にほんご で はなして ください。',
        },
        {
          jp: 'ここに名前を書いてください。',
          vn: 'Xin hãy viết tên vào đây.',
          furigana: 'ここ に なまえ を かいて ください。',
        },
      ],
    },
    {
      id: 'n5_4',
      level: 'N5',
      title: '〜てもいいです',
      meaning: 'Được phép làm V (Xin phép, cho phép)',
      structure: 'Động từ thể て + もいいです',
      explanation: 'Dùng để diễn tả sự cho phép hoặc xin phép ai đó được thực hiện hành động.',
      examples: [
        {
          jp: '写真を撮ってもいいですか。',
          vn: 'Tôi có thể chụp ảnh được không?',
          furigana: 'しゃしん を とっても いい ですか。',
        },
        {
          jp: 'ここで休んでもいいです。',
          vn: 'Bạn có thể nghỉ ngơi ở đây.',
          furigana: 'ここ で やすんでも いい です。',
        },
      ],
    },
    {
      id: 'n5_5',
      level: 'N5',
      title: '〜たいです',
      meaning: 'Muốn làm V (Mong muốn của bản thân)',
      structure: 'Động từ thể ます (bỏ ます) + たいです',
      explanation: 'Bày tỏ mong muốn của người nói. Khi hỏi đối phương dùng 〜たいですか。',
      examples: [
        {
          jp: '日本へ旅行に行きたいです。',
          vn: 'Tôi muốn đi du lịch Nhật Bản.',
          furigana: 'にほん へ りょこう に いきたい です。',
        },
        {
          jp: '新しい車を買いたいです。',
          vn: 'Tôi muốn mua một chiếc xe hơi mới.',
          furigana: 'あたらしい くるま を かいたい です。',
        },
      ],
    },
  ],
  N4: [
    {
      id: 'n4_1',
      level: 'N4',
      title: '〜てみる',
      meaning: 'Thử làm gì đó',
      structure: 'Động từ thể て + みる',
      explanation: 'Hành động thử làm một việc gì đó lần đầu xem kết quả ra sao.',
      examples: [
        {
          jp: '納豆を食べてみます。',
          vn: 'Tôi sẽ ăn thử món Natto.',
          furigana: 'なっとう を たべて みます。',
        },
        {
          jp: 'この服を着てみてもいいですか。',
          vn: 'Tôi có thể mặc thử bộ quần áo này không?',
          furigana: 'この ふく を きて みても いい ですか。',
        },
      ],
    },
    {
      id: 'n4_2',
      level: 'N4',
      title: '〜てしまう',
      meaning: 'Lỡ làm / Đã hoàn thành xong hết',
      structure: 'Động từ thể て + しまう (hội thoại: ちゃう / じゃう)',
      explanation: '1. Diễn tả hành động đã hoàn tất trọn vẹn. 2. Diễn tả sự tiếc nuối, hối tiếc vì đã lỡ làm điều gì.',
      examples: [
        {
          jp: '宿題を全部やってしまいました。',
          vn: 'Tôi đã làm xong sạch bài tập về nhà rồi.',
          furigana: 'しゅくだい を ぜんぶ やって しまいました。',
        },
        {
          jp: '財布を電車に忘れてしまいました。',
          vn: 'Tôi lỡ để quên ví trên tàu điện rồi.',
          furigana: 'さいふ を でんしゃ に わすれて しまいました。',
        },
      ],
    },
    {
      id: 'n4_3',
      level: 'N4',
      title: '〜なければならない',
      meaning: 'Phải làm gì (Bắt buộc)',
      structure: 'Động từ thể ない (bỏ い) + ければならない',
      explanation: 'Diễn tả nghĩa vụ, bổn phận hoặc việc bắt buộc phải làm theo quy định hay hoàn cảnh.',
      examples: [
        {
          jp: '毎日薬を飲まなければなりません。',
          vn: 'Mỗi ngày tôi đều phải uống thuốc.',
          furigana: 'まいにち くすり を のまなければ なりません。',
        },
      ],
    },
    {
      id: 'n4_4',
      level: 'N4',
      title: '〜かもしれない',
      meaning: 'Có lẽ, có thể là...',
      structure: 'Động từ / Tính từ / Danh từ (thể ngắn) + かもしれない',
      explanation: 'Phỏng đoán của người nói với mức độ chắc chắn khoảng 50%.',
      examples: [
        {
          jp: '明日は雨が降るかもしれません。',
          vn: 'Ngày mai có thể trời sẽ mưa.',
          furigana: 'あした は あめ が ふる かもしれません。',
        },
      ],
    },
  ],
  N3: [
    {
      id: 'n3_1',
      level: 'N3',
      title: '〜わけではない',
      meaning: 'Không hẳn là, không có nghĩa là...',
      structure: 'Thể thông thường (Pi) + わけではない',
      explanation: 'Phủ định một phần nhận định, không hoàn toàn đúng trong mọi trường hợp.',
      examples: [
        {
          jp: '日本料理が嫌いなわけではありません。',
          vn: 'Không hẳn là tôi ghét món ăn Nhật đâu.',
          furigana: 'にほんりょうり が きらいな わけではありません。',
        },
      ],
    },
    {
      id: 'n3_2',
      level: 'N3',
      title: '〜に違いない (にちがいない)',
      meaning: 'Chắc chắn là, nhất định là...',
      structure: 'Thể thông thường (Pi) + に違いない',
      explanation: 'Sự phán đoán với độ tin cậy và tự tin cực kỳ cao của người nói dựa trên căn cứ.',
      examples: [
        {
          jp: '彼が犯人に違いない。',
          vn: 'Chắc chắn anh ta là thủ phạm.',
          furigana: 'かれ が はんにん に ちがいない。',
        },
      ],
    },
    {
      id: 'n3_3',
      level: 'N3',
      title: '〜をはじめ (〜をはじめとして)',
      meaning: 'Trước tiên phải kể đến..., tiêu biểu là...',
      structure: 'Danh từ + をはじめ / をはじめとして',
      explanation: 'Đưa ra một ví dụ đại diện, tiêu biểu nhất trong số nhiều đối tượng.',
      examples: [
        {
          jp: '富士山をはじめ、日本には美しい山が多い。',
          vn: 'Tiêu biểu là núi Phú Sĩ, Nhật Bản có rất nhiều ngọn núi đẹp.',
          furigana: 'ふじさん を はじめ、にほん には うつくしい やま が おおい。',
        },
      ],
    },
  ],
  N2: [
    {
      id: 'n2_1',
      level: 'N2',
      title: '〜ざるを得ない (ざるをえない)',
      meaning: 'Đành phải, buộc phải làm...',
      structure: 'Động từ thể ない (bỏ ない) + ざるを得ない (する -> せざるを得ない)',
      explanation: 'Dù không muốn nhưng do hoàn cảnh hoặc áp lực khách quan nên bắt buộc phải làm.',
      examples: [
        {
          jp: '台風のため、旅行は中止せざるを得ない。',
          vn: 'Vì bão nên đành phải hủy chuyến du lịch.',
          furigana: 'たいふう の ため、りょこう は ちゅうし せざるをえない。',
        },
      ],
    },
    {
      id: 'n2_2',
      level: 'N2',
      title: '〜にすぎない',
      meaning: 'Chỉ là..., chẳng qua chỉ là...',
      structure: 'Thể thông thường (Pi) + にすぎない',
      explanation: 'Nhấn mạnh tính chất bình thường, không có gì to tát hoặc đánh giá thấp sự việc.',
      examples: [
        {
          jp: '私はただの学生にすぎません。',
          vn: 'Tôi chẳng qua chỉ là một người học sinh bình thường.',
          furigana: 'わたし は ただ の がくせい に すぎません。',
        },
      ],
    },
  ],
  N1: [
    {
      id: 'n1_1',
      level: 'N1',
      title: '〜を皮切りに (〜をかわきりに)',
      meaning: 'Khởi đầu bằng..., mở màn với...',
      structure: 'Danh từ + を皮切りにして / を皮切りとして',
      explanation: 'Một sự kiện khởi đầu, theo sau là hàng loạt các sự kiện tương tự liên tiếp diễn ra.',
      examples: [
        {
          jp: '東京公演を皮切りに、全国ツアーが始まる。',
          vn: 'Khởi đầu với buổi diễn tại Tokyo, chuyến lưu diễn toàn quốc bắt đầu.',
          furigana: 'とうきょう こうえん を かわきりに、ぜんこく ツアー が はじまる。',
        },
      ],
    },
  ],
};

// Động từ mẫu để luyện tập chia thể (Verb Conjugation)
export const CONJUGATION_DRILL_VERBS = [
  {
    dict: '食べる',
    reading: 'たべる',
    meaning: 'Ăn',
    group: 'Nhóm 2 (Ichidan)',
    forms: {
      te: 'たべて',
      ta: 'たべた',
      nai: 'たべない',
      masu: 'たべます',
      potential: 'たべられる',
      passive: 'たべられる',
      causative: 'たべさせる',
    },
  },
  {
    dict: '書く',
    reading: 'かく',
    meaning: 'Viết',
    group: 'Nhóm 1 (Godan)',
    forms: {
      te: 'かいて',
      ta: 'かいた',
      nai: 'かかない',
      masu: 'かきます',
      potential: 'かける',
      passive: 'かかれる',
      causative: 'かかせる',
    },
  },
  {
    dict: '行く',
    reading: 'いく',
    meaning: 'Đi',
    group: 'Nhóm 1 (Godan đặc biệt)',
    forms: {
      te: 'いって',
      ta: 'いった',
      nai: 'いかない',
      masu: 'いきます',
      potential: 'いける',
      passive: 'いかれる',
      causative: 'いかせる',
    },
  },
  {
    dict: '飲む',
    reading: 'のむ',
    meaning: 'Uống',
    group: 'Nhóm 1 (Godan)',
    forms: {
      te: 'のんで',
      ta: 'のんだ',
      nai: 'のまない',
      masu: 'のみます',
      potential: 'のめる',
      passive: 'のまれる',
      causative: 'のませる',
    },
  },
  {
    dict: 'する',
    reading: 'する',
    meaning: 'Làm',
    group: 'Nhóm 3 (Bất quy tắc)',
    forms: {
      te: 'して',
      ta: 'した',
      nai: 'しない',
      masu: 'します',
      potential: 'できる',
      passive: 'される',
      causative: 'させる',
    },
  },
  {
    dict: '来る',
    reading: 'くる',
    meaning: 'Đến',
    group: 'Nhóm 3 (Bất quy tắc)',
    forms: {
      te: 'きて',
      ta: 'きた',
      nai: 'こない',
      masu: 'きます',
      potential: 'こられる',
      passive: 'こられる',
      causative: 'こさせる',
    },
  },
];
