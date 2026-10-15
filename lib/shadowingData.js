// Dữ liệu luyện phát âm Shadowing chuyên sâu phân loại chuẩn theo từng cấp độ JLPT (N1 - N5)
// Thiết kế đặc thù cho kỹ năng nói tự nhiên, phản xạ ngữ điệu Pitch Accent và giao tiếp đời sống

export const LEVEL_SHADOWING_DRILLS = {
  N5: [
    {
      id: 'n5_1',
      theme: 'Chào hỏi & Nhập môn',
      jp: 'こんにちは、初めまして。どうぞよろしくお願いします。',
      reading: 'こんにちは、はじめまして。どうぞよろしくおねがいします。',
      vn: 'Xin chào, rất vui được gặp bạn lần đầu. Rất mong nhận được sự giúp đỡ.',
    },
    {
      id: 'n5_2',
      theme: 'Sinh hoạt thường nhật',
      jp: '毎朝七時に起きて、朝ご飯を食べてから学校へ行きます。',
      reading: 'まいあさしちじにおきて、あさごはんをたべてからがっこうへいきます。',
      vn: 'Mỗi sáng tôi thức dậy lúc 7 giờ, ăn sáng xong rồi đến trường.',
    },
    {
      id: 'n5_3',
      theme: 'Ẩm thực & Khen ngợi',
      jp: 'この日本料理はとても美味しくて、見た目も綺麗ですね。',
      reading: 'このにほんりょうりはとてもおいしくて、みためもきれいですね。',
      vn: 'Món ăn Nhật này vừa rất ngon lại vừa bày trí đẹp mắt nữa nhỉ.',
    },
    {
      id: 'n5_4',
      theme: 'Hỏi đường tại ga',
      jp: 'すみません、一番近い地下鉄の駅はどこにありますか。',
      reading: 'すみません、いちばんちかいちかてつのえきはどこにありますか。',
      vn: 'Xin lỗi, ga tàu điện ngầm gần nhất nằm ở đâu vậy ạ?',
    },
    {
      id: 'n5_5',
      theme: 'Sở thích & Cuối tuần',
      jp: '週末は友達と一緒に映画を見たり、買い物をしたりします。',
      reading: 'しゅうまつはともだちといっしょにえいがをみたり、かいものをしたりします。',
      vn: 'Cuối tuần tôi thường cùng bạn bè đi xem phim hoặc mua sắm.',
    },
    {
      id: 'n5_6',
      theme: 'Học tập & Cảm nhận',
      jp: '日本語の漢字は少し難しいですが、勉強するのがとても楽しいです。',
      reading: 'にほんごのかんじはすこしむずかしいですが、べんきょうするのがとてもたのしいです。',
      vn: 'Chữ Hán tiếng Nhật hơi khó một chút, nhưng việc học rất là thú vị.',
    },
  ],

  N4: [
    {
      id: 'n4_1',
      theme: 'Chỉ đường & Phương hướng',
      jp: 'この道をまっすぐ行って、二つ目の交差点を右に曲がってください。',
      reading: 'このみちをまっすぐいって、ふたつめのこうさてんをみぎにまがってください。',
      vn: 'Hãy đi thẳng con đường này, rồi rẽ phải ở ngã tư thứ hai nhé.',
    },
    {
      id: 'n4_2',
      theme: 'Xin phép nghỉ ốm',
      jp: '今朝から熱があって喉も痛いので、今日の仕事を休んでもよろしいでしょうか。',
      reading: 'けさからねつがあってのどもいたいので、きょうのしごとをやすんでもよろしいでしょうか。',
      vn: 'Từ sáng nay tôi bị sốt và đau họng, liệu tôi có thể xin phép nghỉ làm hôm nay được không ạ?',
    },
    {
      id: 'n4_3',
      theme: 'Nhờ vả lịch sự',
      jp: '来週の日曜日に引っ越しをするんですが、少し手伝っていただけませんか。',
      reading: 'らいしゅうのにちようびにひっこしをするんですが、すこしてつだっていただけませんか。',
      vn: 'Chủ nhật tuần tới tôi chuyển nhà, liệu bạn có thể giúp tôi một tay được không?',
    },
    {
      id: 'n4_4',
      theme: 'Du lịch & Trải nghiệm',
      jp: '京都に行ったら、古いお寺を巡ったり、着物を着て写真を撮ったりしたいです。',
      reading: 'きょうとにいったら、ふるいおてらをめぐったり、きものをきてしゃしんをとったりしたいです。',
      vn: 'Nếu đến Kyoto, tôi muốn đi vãn cảnh chùa cổ và mặc kimono chụp ảnh lưu niệm.',
    },
    {
      id: 'n4_5',
      theme: 'Giải thích lý do',
      jp: '電車が事故で遅れたため、大切な約束の時間に間に合いませんでした。',
      reading: 'でんしゃがじこでおくれたため、たいせつなやくそくのじかんにまにあいませんでした。',
      vn: 'Vì tàu điện bị trễ do sự cố nên tôi đã không kịp giờ hẹn quan trọng.',
    },
    {
      id: 'n4_6',
      theme: 'Khuyên bảo bạn bè',
      jp: '午後から雨が降り出しそうだから、折りたたみ傘を持っていったほうがいいよ。',
      reading: 'ごごからあめがふりだしそうだから、おりたたみがさをもっていったほうがいいよ。',
      vn: 'Từ chiều có vẻ trời sẽ bắt đầu mưa đấy, bạn nên mang theo ô gấp thì hơn.',
    },
  ],

  N3: [
    {
      id: 'n3_1',
      theme: 'Công sở & Chuẩn bị họp',
      jp: '明日のプロジェクト会議の資料は、今日の夕方までに印刷しておきます。',
      reading: 'あしたのぷろじぇくとかいぎのしりょうは、きょうのゆうがたまでにいんさつしておきます。',
      vn: 'Tài liệu cuộc họp dự án ngày mai, tôi sẽ in xong trước chiều tối nay.',
    },
    {
      id: 'n3_2',
      theme: 'Trải nghiệm cá nhân',
      jp: '実際に自分で試してみて初めて、このツールの使いやすさを実感しました。',
      reading: 'じっさいにじぶんでためしてみてはじめて、このつーるのつかいやすさをじっかんしました。',
      vn: 'Chỉ sau khi đích thân dùng thử thì tôi mới thực sự cảm nhận được độ tiện lợi của công cụ này.',
    },
    {
      id: 'n3_3',
      theme: 'Linh hoạt ứng biến',
      jp: 'お客様一人ひとりのご要望に合わせて、柔軟に対応することが大切です。',
      reading: 'おきゃくさまひとりひとりのごようぼうにあわせて、じゅうなんにたいおうすることがたいせつです。',
      vn: 'Điều quan trọng là phải ứng phó linh hoạt cho phù hợp với từng nguyện vọng của khách hàng.',
    },
    {
      id: 'n3_4',
      theme: 'Sức khỏe & Công việc',
      jp: 'どんなに仕事が忙しくても、睡眠不足にならないよう体調管理に気をつけています。',
      reading: 'どんなにしごとがいそがしくても、すいみんぶそくにならないようたいちょうかんりにきをつけています。',
      vn: 'Dù công việc có bận đến mấy, tôi vẫn chú ý giữ gìn sức khỏe để không bị thiếu ngủ.',
    },
    {
      id: 'n3_5',
      theme: 'Đúc kết kinh nghiệm',
      jp: '海外で生活した経験を通して、異文化を受け入れる広い視野が身につきました。',
      reading: 'かいがいでせいかつしたけいけんをとおして、いぶんかをうけいれるひろいしやがみにつきました。',
      vn: 'Qua trải nghiệm sống ở nước ngoài, tôi đã tôi luyện được tầm nhìn rộng mở đón nhận các nền văn hóa khác nhau.',
    },
    {
      id: 'n3_6',
      theme: 'Thông báo tàu bay',
      jp: '天候の急変に伴い、出発時刻が変更になる可能性がございますのでご注意ください。',
      reading: 'てんこうのきゅうへんにともない、しゅっぱつじこくがへんこうになるかのうせいがございますのでごちゅういください。',
      vn: 'Do thời tiết thay đổi đột ngột, có khả năng giờ khởi hành sẽ thay đổi nên xin quý khách chú ý.',
    },
  ],

  N2: [
    {
      id: 'n2_1',
      theme: 'Thương mại & Kính ngữ Keigo',
      jp: 'お忙しいところ誠に恐れ入りますが、添付の企画書をご一読いただけますでしょうか。',
      reading: 'おいそがしいところまことにそれいりますが、てんぷのきかくしょをごいちどくいただけますでしょうか。',
      vn: 'Tôi rất xin lỗi vì làm phiền trong lúc anh/chị đang bận rộn, nhưng kính mong anh/chị xem qua bản đề xuất đính kèm ạ.',
    },
    {
      id: 'n2_2',
      theme: 'Thời sự & Xã hội',
      jp: '少子高齢化が急速に進むにつれて、労働力不足への対策が急務となっている。',
      reading: 'しょうしこうれいかがきゅうそくにすすむにつれて、ろうどうりょくぶそくへのたいさくがきゅうむとなっている。',
      vn: 'Cùng với sự gia tăng nhanh chóng của tình trạng già hóa dân số, các biện pháp ứng phó thiếu hụt lao động đang là nhiệm vụ cấp bách.',
    },
    {
      id: 'n2_3',
      theme: 'Sự kiện & Họp báo',
      jp: '新製品の発表に先立ちまして、開発責任者より開発の経緯をご説明申し上げます。',
      reading: 'しんせいひんのはっぴょうにさきだちまして、かいはつせきにんしゃよりかいはつのけいいをごせつめいもうしあげます。',
      vn: 'Trước khi công bố sản phẩm mới, đại diện phụ trách phát triển xin phép được trình bày tiến trình nghiên cứu chế tạo.',
    },
    {
      id: 'n2_4',
      theme: 'Quan hệ khách hàng',
      jp: 'より質の高いサービスを提供すべく、皆様からの忌憚のないご意見を賜りたく存じます。',
      reading: 'よりしつのたかいさーびすをていきょうすべく、みなさまからのきたんのないごいけんをたまわりたくぞんじます。',
      vn: 'Nhằm cung cấp dịch vụ chất lượng cao hơn nữa, chúng tôi rất mong nhận được những góp ý thẳng thắn không ngần ngại từ quý vị.',
    },
    {
      id: 'n2_5',
      theme: 'Khủng hoảng & Xử lý',
      jp: '予期せぬトラブルに見舞われたものの、的確な初期対応のおかげで混乱を回避できた。',
      reading: 'よきせぬとらぶるにみまわれたものの、てきかくなしょきたいおうのおかげでこんらんをかいひできた。',
      vn: 'Mặc dù gặp phải sự cố ngoài dự kiến, nhưng nhờ ứng phó bước đầu chuẩn xác mà đã tránh được sự hỗn loạn.',
    },
    {
      id: 'n2_6',
      theme: 'Môi trường & Phát triển',
      jp: '環境保全と経済成長をいかに両立させるかが、今まさに問われている。',
      reading: 'かんきょうほぜんとけいざいせいちょうをいかによりょうりつさせるかが、いままさにをとわれている。',
      vn: 'Làm thế nào để song hành hài hòa giữa bảo tồn môi trường và tăng trưởng kinh tế chính là câu hỏi lớn đang đặt ra hiện nay.',
    },
  ],

  N1: [
    {
      id: 'n1_1',
      theme: 'Trí tuệ nhân tạo & Triết học',
      jp: '急速に進化を遂げるAI技術に対し、人間中心の倫理的枠組みを早急に再構築せねばならない。',
      reading: 'きゅうそくにしんかをとげるえーあいきじゅつにたいし、にんげんちゅうしんのりんりてきわくぐみをさっきゅうにさいこうちくせねばならない。',
      vn: 'Trước công nghệ AI đang tiến hóa vượt bậc, chúng ta phải khẩn trương tái cấu trúc các khuôn khổ đạo đức lấy con người làm trung tâm.',
    },
    {
      id: 'n1_2',
      theme: 'Bản lĩnh & Thành công',
      jp: 'いかなる逆境に直面しようとも、不撓不屈の信念を持って初心を貫徹することこそ肝要である。',
      reading: 'いかなるぎゃっきょうにちょくめんしようとも、ふとうふくつのしんねんをもってしょしんをかんてつすることこそかんようである。',
      vn: 'Dù có đối mặt với bất cứ nghịch cảnh nào, giữ vững niềm tin bất khuất kiên định đi đến cùng với chí hướng ban đầu mới là điều cốt lõi.',
    },
    {
      id: 'n1_3',
      theme: 'Văn hóa & Đa nguyên',
      jp: '真の多文化共生社会を築くには、自らの価値観に固執せず他者を寛容に受容する姿勢が不可欠だ。',
      reading: 'しんのたぶんかきょうせいしゃかいをきずくには、みずからのかちかんにこしゅうせずたしゃをかんようにじゅようするしせいがふかけつだ。',
      vn: 'Để xây dựng một xã hội cùng chung sống đa văn hóa thực thụ, thái độ bao dung tiếp nhận người khác mà không cố chấp vào giá trị riêng của mình là điều tất yếu.',
    },
    {
      id: 'n1_4',
      theme: 'Tư duy phản biện',
      jp: '表層的な風潮に迎合することなく、物事の本質と多面的な構造を冷静に見極める洞察力が求められる。',
      reading: 'ひょうそうてきなふうちょうにげいごうすることなく、ものごとのほんしつとためんてきなこうぞうをれいせいにみきわめるどうさつりょくがもとめられる。',
      vn: 'Cần có cái nhìn sâu sắc thấu suốt bản chất và cấu trúc đa chiều của sự vật một cách bình tĩnh, không hùa theo những trào lưu bề nổi.',
    },
    {
      id: 'n1_5',
      theme: 'Chính sách vĩ mô',
      jp: '格差の固定化を是正すべく、持続可能かつ実効性の高い抜本的制度改革を断行すべきである。',
      reading: 'かくさのこていかをぜせいすべく、じぞくかのうかつじっこうせいのたかいばっぽんてきせいどかいかくをだんこうすべきである。',
      vn: 'Nhằm khắc phục tình trạng phân hóa giàu nghèo cố hữu, cần phải kiên quyết thi hành cải cách thể chế căn cơ vừa bền vững vừa có hiệu lực thực thi cao.',
    },
    {
      id: 'n1_6',
      theme: 'Kế thừa & Sáng tạo',
      jp: '古き良き伝統の神髄を継承しつつ、現代の息吹を吹き込んだ新たな普遍的価値を創出すべきだ。',
      reading: 'ふるきよきでんとうのしんずいをけいしょうしつつ、げんだいのいぶきをふきこんだあらたなふへんてきかちをそうしゅつすべきだ。',
      vn: 'Vừa kế thừa tinh hoa truyền thống tốt đẹp lâu đời, chúng ta vừa phải thổi vào đó hơi thở đương đại để kiến tạo nên những giá trị phổ quát mới.',
    },
  ],
};

// Hàm trích xuất và chuẩn hóa các câu luyện nói từ Chữ Hán đang học
export function parseKanjiShadowingDrills(cardInfo, currentChar, currentLevel = 'N5') {
  const drills = [];
  if (!cardInfo && !currentChar) return drills;

  const rawSentence = cardInfo?.exampleJp || cardInfo?.example?.sentence || '';
  const rawTranslation = cardInfo?.exampleVn || cardInfo?.example?.translation || '';
  const rawReading = cardInfo?.exampleReading || cardInfo?.example?.reading || '';

  // 1. Nếu câu chứa số thứ tự ① ② hoặc 1. 2. thì tách thành các câu độc lập
  if (rawSentence && (rawSentence.includes('①') || rawSentence.includes('②') || rawSentence.includes('1.') || rawSentence.includes('2.'))) {
    // Tách phần tiếng Nhật
    const jpParts = rawSentence
      .split(/[①②③④⑤]/)
      .map((p) => p.replace(/<[^>]+>/g, '').trim())
      .filter((p) => p.length > 3);

    // Tách phần cách đọc Hiragana
    const readingParts = rawReading
      ? rawReading
          .split(/[①②③④⑤]/)
          .map((p) => p.replace(/<[^>]+>/g, '').trim())
          .filter((p) => p.length > 3)
      : [];

    // Tách phần dịch nghĩa tiếng Việt
    const vnParts = rawTranslation
      .split(/[①②③④⑤]|(?:\b[1-5]\.)/)
      .map((p) => p.trim())
      .filter((p) => p.length > 2);

    jpParts.forEach((jp, idx) => {
      drills.push({
        id: `char_sent_${idx + 1}`,
        theme: `Câu ví dụ ${idx + 1} (${currentChar})`,
        jp: jp,
        vn: vnParts[idx] || rawTranslation,
        reading: readingParts[idx] || '',
        isCharSpecific: true,
      });
    });
  } else if (rawSentence) {
    const cleanJp = rawSentence.replace(/<[^>]+>/g, '').trim();
    if (cleanJp && !cleanJp.includes('と書きます') && !cleanJp.includes('この漢字は')) {
      drills.push({
        id: 'char_sent_main',
        theme: `Câu ví dụ chính (${currentChar})`,
        jp: cleanJp,
        vn: rawTranslation || `Câu ví dụ chứa chữ Hán ${currentChar}`,
        reading: rawReading ? rawReading.replace(/<[^>]+>/g, '').trim() : '',
        isCharSpecific: true,
      });
    }
  }

  // 2. Trích xuất các từ vựng đặc thù của chữ Hán làm bài tập phát âm chuẩn xác
  if (cardInfo?.vocab && Array.isArray(cardInfo.vocab) && cardInfo.vocab.length > 0) {
    cardInfo.vocab.slice(0, 4).forEach((v, idx) => {
      const word = v.word || v.jp?.replace(/<[^>]+>/g, '') || '';
      const reading = v.reading || '';
      const meaning = v.meaning_vi || v.vn || v.meaning || '';
      if (word && word.length >= 1) {
        drills.push({
          id: `char_vocab_${idx + 1}`,
          theme: `Từ vựng ${idx + 1} (${word})`,
          jp: `${word}。`,
          reading: reading ? `${reading}。` : '',
          vn: `${word}: ${meaning}`,
          isCharSpecific: true,
        });
      }
    });
  }

  // 3. Nếu chưa có câu nào, tự động tạo câu ngữ cảnh giao tiếp tự nhiên dựa trên chữ Hán
  if (drills.length === 0 && currentChar) {
    const hanViet = cardInfo?.hanViet || '';
    drills.push({
      id: 'char_auto_1',
      theme: `Câu thực hành (${currentChar})`,
      jp: `日常会話の中で「${currentChar}」の漢字を意識して使いましょう。`,
      reading: `にちじょうかいわのなかで「${currentChar}」のかんじをいしきしてつかいましょう。`,
      vn: `Hãy chủ động sử dụng chữ Hán 「${currentChar}」${hanViet ? ` (${hanViet})` : ''} trong các tình huống giao tiếp đời sống hàng ngày.`,
      isCharSpecific: true,
    });
  }

  return drills;
}
