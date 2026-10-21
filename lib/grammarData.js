// Dữ liệu Ngữ pháp Chuẩn JLPT N5 - N1 (Mỗi cấp độ tối thiểu 50 mẫu ngữ pháp đầy đủ ví dụ & âm thanh)
// Tổng cộng hơn 250 mẫu ngữ pháp được biên soạn chuẩn mực theo giáo trình quốc tế

export const GRAMMAR_DATA = {
  "N5": [
    {
      "id": "n5_1",
      "level": "N5",
      "title": "〜は〜です",
      "meaning": "A là B (Khẳng định cơ bản)",
      "structure": "Danh từ 1 + は + Danh từ 2 + です",
      "explanation": "Dùng để giới thiệu danh tính, nghề nghiệp, quốc tịch hoặc trạng thái cơ bản của chủ ngữ.",
      "examples": [
        {
          "jp": "わたしは学生です。",
          "vn": "Tôi là học sinh.",
          "furigana": "わたしは がくせい です。"
        },
        {
          "jp": "これは日本語の本です。",
          "vn": "Đây là cuốn sách tiếng Nhật.",
          "furigana": "これは にほんご の ほん です。"
        }
      ]
    },
    {
      "id": "n5_2",
      "level": "N5",
      "title": "〜は〜ではありません",
      "meaning": "A không phải là B (Phủ định lịch sự)",
      "structure": "Danh từ 1 + は + Danh từ 2 + ではありません / じゃありません",
      "explanation": "Dạng phủ định lịch sự của 〜です trong câu định danh.",
      "examples": [
        {
          "jp": "彼は先生ではありません。",
          "vn": "Anh ấy không phải là giáo viên.",
          "furigana": "かれ は せんせい ではありません。"
        },
        {
          "jp": "今日は日曜日じゃありません。",
          "vn": "Hôm nay không phải là chủ nhật.",
          "furigana": "きょう は にちようび じゃありません。"
        }
      ]
    },
    {
      "id": "n5_3",
      "level": "N5",
      "title": "〜ですか",
      "meaning": "Có phải là... không? (Câu hỏi nghi vấn)",
      "structure": "Mệnh đề + か",
      "explanation": "Thêm trợ từ か vào cuối câu để tạo thành câu hỏi lịch sự.",
      "examples": [
        {
          "jp": "お元気ですか。",
          "vn": "Bạn có khỏe không?",
          "furigana": "おげんき ですか。"
        },
        {
          "jp": "これはあなたの傘ですか。",
          "vn": "Đây có phải chiếc ô của bạn không?",
          "furigana": "これは あなた の かさ ですか。"
        }
      ]
    },
    {
      "id": "n5_4",
      "level": "N5",
      "title": "〜も",
      "meaning": "Cũng... (Trợ từ đồng nhất)",
      "structure": "Danh từ + も",
      "explanation": "Dùng thay thế cho trợ từ は/が/を khi muốn biểu thị tính chất tương tự.",
      "examples": [
        {
          "jp": "わたしもベトナム人です。",
          "vn": "Tôi cũng là người Việt Nam.",
          "furigana": "わたし も ベトナムじん です。"
        },
        {
          "jp": "兄も英語を勉強しています。",
          "vn": "Anh trai tôi cũng đang học tiếng Anh.",
          "furigana": "あに も えいご を べんきょう しています。"
        }
      ]
    },
    {
      "id": "n5_5",
      "level": "N5",
      "title": "〜の",
      "meaning": "Của / Thuộc về (Trợ từ liên kết danh từ)",
      "structure": "Danh từ 1 + の + Danh từ 2",
      "explanation": "Biểu thị sự sở hữu, nguồn gốc, xuất xứ hoặc làm rõ bổ nghĩa cho danh từ sau.",
      "examples": [
        {
          "jp": "これは私の車です。",
          "vn": "Đây là xe ô tô của tôi.",
          "furigana": "これは わたし の くるま です。"
        },
        {
          "jp": "日本の桜はとても美しいです。",
          "vn": "Hoa anh đào của Nhật Bản rất đẹp.",
          "furigana": "にほん の さくら は とても うつくしい です。"
        }
      ]
    },
    {
      "id": "n5_6",
      "level": "N5",
      "title": "〜があります／います",
      "meaning": "Có (Sự tồn tại của đồ vật / sinh vật)",
      "structure": "Địa điểm + に + Vật (が あります) / Người, động vật (が います)",
      "explanation": "あります dùng cho vật vô tri vô giác, cây cối. います dùng cho sinh vật cử động được (người, động vật).",
      "examples": [
        {
          "jp": "机の上に本があります。",
          "vn": "Trên bàn có cuốn sách.",
          "furigana": "つくえ の うえ に ほん が あります。"
        },
        {
          "jp": "庭に猫がいます。",
          "vn": "Trong vườn có một con mèo.",
          "furigana": "にわ に ねこ が います。"
        }
      ]
    },
    {
      "id": "n5_7",
      "level": "N5",
      "title": "〜へ行きます／来ます／帰ります",
      "meaning": "Đi / Đến / Về (Chỉ phương hướng chuyển động)",
      "structure": "Địa điểm + へ / に + 行きます / 来ます / 帰ります",
      "explanation": "Trợ từ へ (đọc là e) hoặc に chỉ đích đến của hành động di chuyển.",
      "examples": [
        {
          "jp": "来週、日本へ行きます。",
          "vn": "Tuần sau tôi sẽ đi Nhật Bản.",
          "furigana": "らいしゅう、にほん へ いきます。"
        },
        {
          "jp": "毎日６時にうちへ帰ります。",
          "vn": "Mỗi ngày tôi về nhà lúc 6 giờ.",
          "furigana": "まいにち ろくじ に うち へ かえります。"
        }
      ]
    },
    {
      "id": "n5_8",
      "level": "N5",
      "title": "〜を〜ます",
      "meaning": "Tác động hành động lên tân ngữ",
      "structure": "Danh từ + を + Động từ tha động từ",
      "explanation": "Trợ từ を chỉ đối tượng trực tiếp chịu tác động của hành động.",
      "examples": [
        {
          "jp": "毎朝パンを食べます。",
          "vn": "Mỗi sáng tôi ăn bánh mì.",
          "furigana": "まいあさ パン を たべます。"
        },
        {
          "jp": "音楽を聞きます。",
          "vn": "Tôi nghe âm nhạc.",
          "furigana": "おんがく を ききます。"
        }
      ]
    },
    {
      "id": "n5_9",
      "level": "N5",
      "title": "〜で (Địa điểm / Phương tiện)",
      "meaning": "Tại (nơi diễn ra hành động) / Bằng (phương tiện, công cụ)",
      "structure": "Địa điểm + で + Hành động / Phương tiện + で",
      "explanation": "Chỉ nơi diễn ra hành vi hoặc công cụ, phương tiện thực hiện hành động.",
      "examples": [
        {
          "jp": "図書館で勉強します。",
          "vn": "Tôi học bài tại thư viện.",
          "furigana": "としょかん で べんきょう します。"
        },
        {
          "jp": "電車で会社へ行きます。",
          "vn": "Tôi đi đến công ty bằng tàu điện.",
          "furigana": "でんしゃ で かいしゃ へ いきます。"
        }
      ]
    },
    {
      "id": "n5_10",
      "level": "N5",
      "title": "〜に (Thời gian cụ thể)",
      "meaning": "Vào lúc (Thời điểm diễn ra hành động)",
      "structure": "Thời gian có con số + に + Động từ",
      "explanation": "Dùng cho thời điểm có số giờ, ngày, tháng, năm cụ thể.",
      "examples": [
        {
          "jp": "毎朝７時に起きます。",
          "vn": "Mỗi sáng tôi thức dậy vào lúc 7 giờ.",
          "furigana": "まいあさ しちじ に おきます。"
        },
        {
          "jp": "日曜日に買い物に行きます。",
          "vn": "Tôi đi mua sắm vào chủ nhật.",
          "furigana": "にちようび に かいもの に いきます。"
        }
      ]
    },
    {
      "id": "n5_11",
      "level": "N5",
      "title": "〜と (Cùng với / Và)",
      "meaning": "Cùng với ai / Và (liệt kê danh từ)",
      "structure": "Danh từ 1 + と + Danh từ 2 / Người + と",
      "explanation": "Dùng để nối các danh từ hoặc chỉ đối tượng cùng tham gia hành động.",
      "examples": [
        {
          "jp": "友達と映画を見ました。",
          "vn": "Tôi đã xem phim cùng bạn bè.",
          "furigana": "ともだち と えいが を みました。"
        },
        {
          "jp": "机の上にペンとノートがあります。",
          "vn": "Trên bàn có bút và vở.",
          "furigana": "つくえ の うえ に ペン と ノート が あります。"
        }
      ]
    },
    {
      "id": "n5_12",
      "level": "N5",
      "title": "〜から〜まで",
      "meaning": "Từ... đến... (Thời gian & Không gian)",
      "structure": "Điểm bắt đầu + から + Điểm kết thúc + まで",
      "explanation": "Chỉ phạm vi thời gian hoặc quãng đường từ điểm xuất phát đến đích.",
      "examples": [
        {
          "jp": "銀行は９時から３時までです。",
          "vn": "Ngân hàng mở cửa từ 9 giờ đến 3 giờ.",
          "furigana": "ぎんこう は くじ から さんじ まで です。"
        },
        {
          "jp": "ハノイから東京まで飛行機で行きます。",
          "vn": "Đi từ Hà Nội đến Tokyo bằng máy bay.",
          "furigana": "ハノイ から とうきょう まで ひこうき で いきます。"
        }
      ]
    },
    {
      "id": "n5_13",
      "level": "N5",
      "title": "〜ませんか",
      "meaning": "Cùng làm... với tôi nhé? (Rủ rê, mời mọc lịch sự)",
      "structure": "Động từ thể ます (bỏ ます) + ませんか",
      "explanation": "Dùng để rủ đối phương cùng làm một việc gì đó, thăm dò ý kiến lịch sự.",
      "examples": [
        {
          "jp": "いっしょにお茶を飲みませんか。",
          "vn": "Cùng uống trà với tôi nhé?",
          "furigana": "いっしょ に おちゃ を のみませんか。"
        },
        {
          "jp": "明日、映画を見に行きませんか。",
          "vn": "Ngày mai cùng đi xem phim nhé?",
          "furigana": "あした、えいが を み に いきませんか。"
        }
      ]
    },
    {
      "id": "n5_14",
      "level": "N5",
      "title": "〜ましょう",
      "meaning": "Cùng làm... nào! (Đồng thuận, kêu gọi)",
      "structure": "Động từ thể ます (bỏ ます) + ましょう",
      "explanation": "Dùng để hưởng ứng lời mời hoặc chủ động đề nghị cùng thực hiện.",
      "examples": [
        {
          "jp": "ちょっと休みましょう。",
          "vn": "Cùng nghỉ một chút nào.",
          "furigana": "ちょっと やすみましょう。"
        },
        {
          "jp": "いっしょに昼ご飯を食べましょう。",
          "vn": "Cùng nhau ăn trưa nhé.",
          "furigana": "いっしょ に ひるごはん を たべましょう。"
        }
      ]
    },
    {
      "id": "n5_15",
      "level": "N5",
      "title": "〜ましょうか",
      "meaning": "Để tôi làm giúp bạn nhé? (Đề nghị giúp đỡ)",
      "structure": "Động từ thể ます (bỏ ます) + ましょうか",
      "explanation": "Người nói chủ động đề nghị làm một hành động giúp đỡ đối phương.",
      "examples": [
        {
          "jp": "窓を開けましょうか。",
          "vn": "Để tôi mở cửa sổ giúp bạn nhé?",
          "furigana": "まど を あけましょうか。"
        },
        {
          "jp": "荷物を持ちましょうか。",
          "vn": "Để tôi xách hành lý giúp bạn nhé?",
          "furigana": "にもつ を もちましょうか。"
        }
      ]
    },
    {
      "id": "n5_16",
      "level": "N5",
      "title": "〜てください",
      "meaning": "Xin hãy làm V (Yêu cầu, đề nghị lịch sự)",
      "structure": "Động từ thể て + ください",
      "explanation": "Dùng khi muốn yêu cầu, nhờ vả đối phương làm việc gì đó một cách lịch sự.",
      "examples": [
        {
          "jp": "日本語で話してください。",
          "vn": "Xin hãy nói bằng tiếng Nhật.",
          "furigana": "にほんご で はなして ください。"
        },
        {
          "jp": "ここに名前を書いてください。",
          "vn": "Xin hãy viết tên vào đây.",
          "furigana": "ここに なまえ を かいて ください。"
        }
      ]
    },
    {
      "id": "n5_17",
      "level": "N5",
      "title": "〜ています (Đang làm / Trạng thái)",
      "meaning": "Đang làm V / Đang trong trạng thái...",
      "structure": "Động từ thể て + います",
      "explanation": "Chỉ hành động đang diễn ra tại thời điểm nói hoặc trạng thái là kết quả của hành động trước đó.",
      "examples": [
        {
          "jp": "今、日本語を勉強しています。",
          "vn": "Bây giờ tôi đang học tiếng Nhật.",
          "furigana": "いま、にほんご を べんきょう しています。"
        },
        {
          "jp": "山田さんは結婚しています。",
          "vn": "Anh Yamada đã kết hôn.",
          "furigana": "やまださん は けっこん しています。"
        }
      ]
    },
    {
      "id": "n5_18",
      "level": "N5",
      "title": "〜てもいいです",
      "meaning": "Làm... cũng được (Cho phép làm gì)",
      "structure": "Động từ thể て + もいいです",
      "explanation": "Biểu thị sự cho phép đối phương làm gì đó hoặc hỏi xin phép khi đổi thành câu hỏi.",
      "examples": [
        {
          "jp": "写真を撮ってもいいですか。",
          "vn": "Tôi có thể chụp ảnh ở đây được không?",
          "furigana": "しゃしん を とっても いい ですか。"
        },
        {
          "jp": "ここでタバコを吸ってもいいです。",
          "vn": "Hút thuốc ở đây cũng được.",
          "furigana": "ここで タバコ を すっても いい です。"
        }
      ]
    },
    {
      "id": "n5_19",
      "level": "N5",
      "title": "〜てはいけません",
      "meaning": "Không được phép làm... (Cấm chỉ lịch sự)",
      "structure": "Động từ thể て + はいけません",
      "explanation": "Dùng để cấm đoán hoặc nêu quy định không được phép làm gì.",
      "examples": [
        {
          "jp": "ここで車を止めてはいけません。",
          "vn": "Không được dừng xe ở đây.",
          "furigana": "ここで くるま を とめて は いけません。"
        },
        {
          "jp": "美術館でフラッシュを使ってはいけません。",
          "vn": "Không được dùng đèn flash trong bảo tàng.",
          "furigana": "びじゅつかん で フラッシュ を つかって は いけません。"
        }
      ]
    },
    {
      "id": "n5_20",
      "level": "N5",
      "title": "〜から (Nguyên nhân chủ quan)",
      "meaning": "Vì... nên... (Nêu lý do)",
      "structure": "Mệnh đề nguyên nhân + から、Mệnh đề kết quả",
      "explanation": "Nêu lý do, căn cứ chủ quan dẫn tới hành động hoặc quyết định.",
      "examples": [
        {
          "jp": "時間がありませんから、タクシーで行きましょう。",
          "vn": "Vì không có thời gian nên hãy đi bằng taxi nào.",
          "furigana": "じかん が ありません から、タクシー で いきましょう。"
        },
        {
          "jp": "寒いから、ドアを閉めてください。",
          "vn": "Vì trời lạnh nên xin hãy đóng cửa lại.",
          "furigana": "さむい から、ドア を しめて ください。"
        }
      ]
    },
    {
      "id": "n5_21",
      "level": "N5",
      "title": "〜て、〜 (Nối hành động / Tính từ)",
      "meaning": "Làm... rồi làm... / Vừa... vừa...",
      "structure": "V thể て / Tính từ い bỏ い + くて / Tính từ な bỏ な + で",
      "explanation": "Dùng để nối các hành động xảy ra theo trình tự thời gian hoặc nối nhiều đặc điểm tính chất.",
      "examples": [
        {
          "jp": "朝起きて、顔を洗って、ご飯を食べます。",
          "vn": "Sáng dậy, rửa mặt, rồi ăn cơm.",
          "furigana": "あさ おきて、かお を あらって、ごはん を たべます。"
        },
        {
          "jp": "この部屋は広くて、明るいです。",
          "vn": "Căn phòng này vừa rộng lại vừa sáng sủa.",
          "furigana": "この へや は ひろくて、あかるい です。"
        }
      ]
    },
    {
      "id": "n5_22",
      "level": "N5",
      "title": "〜ないでください",
      "meaning": "Xin đừng làm... (Yêu cầu không làm gì)",
      "structure": "Động từ thể ない + でください",
      "explanation": "Yêu cầu, nhờ vả đối phương không thực hiện một hành động nào đó.",
      "examples": [
        {
          "jp": "ここで走らないでください。",
          "vn": "Xin đừng chạy ở đây.",
          "furigana": "ここで はしらないで ください。"
        },
        {
          "jp": "心配しないでください。",
          "vn": "Xin đừng lo lắng.",
          "furigana": "しんぱい しないで ください。"
        }
      ]
    },
    {
      "id": "n5_23",
      "level": "N5",
      "title": "〜なければなりません",
      "meaning": "Phải làm... (Bắt buộc, nghĩa vụ)",
      "structure": "Động từ thể ない (bỏ い) + ければなりません",
      "explanation": "Diễn tả hành động bắt buộc phải thực hiện do quy định hoặc hoàn cảnh tất yếu.",
      "examples": [
        {
          "jp": "毎日薬を飲まなければなりません。",
          "vn": "Mỗi ngày tôi phải uống thuốc.",
          "furigana": "まいにち くすり を のまなければ なりません。"
        },
        {
          "jp": "パスポートを見せなければなりません。",
          "vn": "Bạn phải xuất trình hộ chiếu.",
          "furigana": "パスポート を みせなければ なりません。"
        }
      ]
    },
    {
      "id": "n5_24",
      "level": "N5",
      "title": "〜なくてもいいです",
      "meaning": "Không cần làm... cũng được",
      "structure": "Động từ thể ない (bỏ い) + くてもいいです",
      "explanation": "Biểu thị sự không bắt buộc phải làm một việc nào đó.",
      "examples": [
        {
          "jp": "明日は来なくてもいいです。",
          "vn": "Ngày mai bạn không cần đến cũng được.",
          "furigana": "あした は こなくても いい です。"
        },
        {
          "jp": "傘を持っていかなくてもいいです。",
          "vn": "Không cần mang ô đi cũng được.",
          "furigana": "かさ を もっていかなくても いい です。"
        }
      ]
    },
    {
      "id": "n5_25",
      "level": "N5",
      "title": "〜ことができます",
      "meaning": "Có thể làm... (Khả năng / Năng lực)",
      "structure": "Động từ thể nguyên dạng (thể từ điển) + ことができます",
      "explanation": "Biểu thị năng lực của bản thân có thể làm gì hoặc hoàn cảnh cho phép làm việc đó.",
      "examples": [
        {
          "jp": "日本語を話すことができます。",
          "vn": "Tôi có thể nói tiếng Nhật.",
          "furigana": "にほんご を はなす こと が できます。"
        },
        {
          "jp": "カードで払うことができますか。",
          "vn": "Tôi có thể thanh toán bằng thẻ được không?",
          "furigana": "カード で はらう こと が できますか。"
        }
      ]
    },
    {
      "id": "n5_26",
      "level": "N5",
      "title": "〜まえに",
      "meaning": "Trước khi làm...",
      "structure": "Động từ thể từ điển / Danh từ + の + まえに",
      "explanation": "Chỉ hành động phía sau xảy ra trước hành động hoặc thời điểm ở vế まえに.",
      "examples": [
        {
          "jp": "寝る前に本を読みます。",
          "vn": "Trước khi ngủ tôi đọc sách.",
          "furigana": "ねる まえ に ほん を よみます。"
        },
        {
          "jp": "食事の前に手を洗います。",
          "vn": "Trước bữa ăn tôi rửa tay.",
          "furigana": "しょくじ の まえ に て を あらいます。"
        }
      ]
    },
    {
      "id": "n5_27",
      "level": "N5",
      "title": "〜たことがあります",
      "meaning": "Đã từng làm... (Kinh nghiệm quá khứ)",
      "structure": "Động từ thể た + ことがあります",
      "explanation": "Nói về trải nghiệm, kinh nghiệm trong quá khứ của người nói.",
      "examples": [
        {
          "jp": "富士山に登ったことがあります。",
          "vn": "Tôi đã từng leo núi Phú Sĩ.",
          "furigana": "ふじさん に のぼった こと が あります。"
        },
        {
          "jp": "すしを食べたことがありません。",
          "vn": "Tôi chưa từng ăn sushi bao giờ.",
          "furigana": "すし を たべた こと が ありません。"
        }
      ]
    },
    {
      "id": "n5_28",
      "level": "N5",
      "title": "〜たり〜たりします",
      "meaning": "Lúc thì làm... lúc thì làm... (Liệt kê hành động)",
      "structure": "Động từ 1 (thể た) + り、Động từ 2 (thể た) + り します",
      "explanation": "Liệt kê một vài hành động tiêu biểu không nhất thiết theo thứ tự thời gian.",
      "examples": [
        {
          "jp": "休みの日は本を読んだり散歩したりします。",
          "vn": "Ngày nghỉ lúc thì tôi đọc sách, lúc thì đi dạo.",
          "furigana": "やすみ の ひ は ほん を よんだり さんぽ したり します。"
        },
        {
          "jp": "昨日は買い物をしたり映画を見たりしました。",
          "vn": "Hôm qua tôi đã đi mua sắm và xem phim.",
          "furigana": "きのう は かいもの を したり えいが を みたり しました。"
        }
      ]
    },
    {
      "id": "n5_29",
      "level": "N5",
      "title": "〜くなります／になります",
      "meaning": "Trở nên... / Trở thành... (Biến đổi trạng thái)",
      "structure": "Tính từ い bỏ い + く / Tính từ な, Danh từ + に + なります",
      "explanation": "Biểu thị sự chuyển biến, thay đổi trạng thái của sự vật hiện tượng.",
      "examples": [
        {
          "jp": "だんだん暖かくなります。",
          "vn": "Trời dần dần trở nên ấm áp.",
          "furigana": "だんだん あたたかく なります。"
        },
        {
          "jp": "将来、医者になりたいです。",
          "vn": "Tương lai tôi muốn trở thành bác sĩ.",
          "furigana": "しょうらい、いしゃ に なりたい です。"
        }
      ]
    },
    {
      "id": "n5_30",
      "level": "N5",
      "title": "〜とおもいます",
      "meaning": "Tôi nghĩ rằng... (Ý kiến chủ quan)",
      "structure": "Thể thông thường + と思います",
      "explanation": "Bày tỏ suy nghĩ, quan điểm cá nhân hoặc phỏng đoán về một sự việc.",
      "examples": [
        {
          "jp": "明日は雨が降ると思います。",
          "vn": "Tôi nghĩ rằng ngày mai trời sẽ mưa.",
          "furigana": "あした は あめ が ふる と おもいます。"
        },
        {
          "jp": "日本の物価は高いと思います。",
          "vn": "Tôi nghĩ giá cả ở Nhật Bản khá đắt.",
          "furigana": "にほん の ぶっか は たかい と おもいます。"
        }
      ]
    },
    {
      "id": "n5_31",
      "level": "N5",
      "title": "〜といいました",
      "meaning": "Đã nói rằng... (Trích dẫn lời nói)",
      "structure": "Thể thông thường + と言いました / \"Câu trực tiếp\" + と言いました",
      "explanation": "Dùng để trích dẫn lại lời nói trực tiếp hoặc gián tiếp của người khác.",
      "examples": [
        {
          "jp": "田中さんは「明日休みます」と言いました。",
          "vn": "Anh Tanaka đã nói rằng: \"Ngày mai tôi xin nghỉ\".",
          "furigana": "たなかさん は 「あした やすみます」 と いいました。"
        },
        {
          "jp": "先生は来週テストがあると言いました。",
          "vn": "Thầy giáo nói tuần sau sẽ có bài kiểm tra.",
          "furigana": "せんせい は らいしゅう テスト が ある と いいました。"
        }
      ]
    },
    {
      "id": "n5_32",
      "level": "N5",
      "title": "〜でしょう",
      "meaning": "Có lẽ là... / Phải không? (Phỏng đoán, xác nhận)",
      "structure": "Thể thông thường (bỏ だ) + でしょう",
      "explanation": "Hạ giọng để phỏng đoán sự việc, lên giọng để xác nhận sự đồng tình của người nghe.",
      "examples": [
        {
          "jp": "明日はきっといい天気でしょう。",
          "vn": "Ngày mai chắc hẳn thời tiết sẽ đẹp.",
          "furigana": "あした は きっと いい てんき でしょう。"
        },
        {
          "jp": "北海道は寒かったでしょう。",
          "vn": "Ở Hokkaido chắc là lạnh lắm nhỉ?",
          "furigana": "ほっかいどう は さむかった でしょう。"
        }
      ]
    },
    {
      "id": "n5_33",
      "level": "N5",
      "title": "〜が好き／嫌い／上手／下手です",
      "meaning": "Thích / Ghét / Giỏi / Kém cái gì",
      "structure": "Chủ ngữ + は + Đối tượng + が + 好き / 嫌い / 上手 / 下手 です",
      "explanation": "Biểu thị sở thích hoặc năng lực đối với một đối tượng cụ thể đi với trợ từ が.",
      "examples": [
        {
          "jp": "わたしは日本料理が好きです。",
          "vn": "Tôi rất thích món ăn Nhật Bản.",
          "furigana": "わたし は にほんりょうり が すき です。"
        },
        {
          "jp": "彼女はピアノがとても上手です。",
          "vn": "Cô ấy chơi piano rất giỏi.",
          "furigana": "かのじょ は ピアノ が とても じょうず です。"
        }
      ]
    },
    {
      "id": "n5_34",
      "level": "N5",
      "title": "〜がほしいです",
      "meaning": "Muốn có... (Mong muốn sở hữu)",
      "structure": "Danh từ + が + ほしいです",
      "explanation": "Diễn tả nguyện vọng muốn sở hữu một đồ vật nào đó của bản thân.",
      "examples": [
        {
          "jp": "新しいパソコンがほしいです。",
          "vn": "Tôi muốn có một chiếc máy tính xách tay mới.",
          "furigana": "あたらしい パソコン が ほしい です。"
        },
        {
          "jp": "今、時間がほしいです。",
          "vn": "Bây giờ tôi muốn có thêm thời gian.",
          "furigana": "いま、じかん が ほしい です。"
        }
      ]
    },
    {
      "id": "n5_35",
      "level": "N5",
      "title": "〜たいです",
      "meaning": "Muốn làm... (Nguyện vọng hành động)",
      "structure": "Động từ thể ます (bỏ ます) + たいです",
      "explanation": "Bày tỏ mong muốn được thực hiện một hành động nào đó của bản thân.",
      "examples": [
        {
          "jp": "日本へ旅行に行きたいです。",
          "vn": "Tôi muốn đi du lịch Nhật Bản.",
          "furigana": "にほん へ りょこう に いきたい です。"
        },
        {
          "jp": "冷たい水が飲みたいです。",
          "vn": "Tôi muốn uống nước lạnh.",
          "furigana": "つめたい みず が のみたい です。"
        }
      ]
    },
    {
      "id": "n5_36",
      "level": "N5",
      "title": "〜に行きます (Mục đích di chuyển)",
      "meaning": "Đi đâu để làm mục đích gì",
      "structure": "Địa điểm + へ + V (bỏ ます) / Danh từ hành động + に + 行きます / 来ます",
      "explanation": "Chỉ mục đích của việc di chuyển tới một địa điểm nào đó.",
      "examples": [
        {
          "jp": "スーパーへ買い物に行きます。",
          "vn": "Tôi đi siêu thị để mua sắm.",
          "furigana": "スーパー へ かいもの に いきます。"
        },
        {
          "jp": "図書館へ本を借りに行きました。",
          "vn": "Tôi đã đến thư viện để mượn sách.",
          "furigana": "としょかん へ ほん を かりに いきました。"
        }
      ]
    },
    {
      "id": "n5_37",
      "level": "N5",
      "title": "〜より〜のほうが",
      "meaning": "A thì... hơn so với B (So sánh hơn)",
      "structure": "A のほうが + B より + Tính từ です",
      "explanation": "Dùng khi so sánh 2 đối tượng và khẳng định A có tính chất nổi trội hơn B.",
      "examples": [
        {
          "jp": "飛行機のほうが新幹線より速いです。",
          "vn": "Máy bay thì nhanh hơn tàu shinkansen.",
          "furigana": "ひこうき の ほう が しんかんせん より はやい です。"
        },
        {
          "jp": "リンゴのほうがバナナより好きです。",
          "vn": "Tôi thích táo hơn chuối.",
          "furigana": "リンゴ の ほう が バナナ より すき です。"
        }
      ]
    },
    {
      "id": "n5_38",
      "level": "N5",
      "title": "〜の中で〜がいちばん",
      "meaning": "Trong số... thì... nhất (So sánh nhất)",
      "structure": "Phạm vi + の中で + Cái gì + が いちばん + Tính từ ですか / です",
      "explanation": "Chọn ra một đối tượng đạt mức độ cao nhất trong một phạm vi cụ thể.",
      "examples": [
        {
          "jp": "スポーツの中でサッカーがいちばん好きです。",
          "vn": "Trong các môn thể thao tôi thích bóng đá nhất.",
          "furigana": "スポーツ の なか で サッカー が いちばん すき です。"
        },
        {
          "jp": "一年の中でいつがいちばん寒いですか。",
          "vn": "Trong một năm thời điểm nào là lạnh nhất?",
          "furigana": "いちねん の なか で いつ が いちばん さむい ですか。"
        }
      ]
    },
    {
      "id": "n5_39",
      "level": "N5",
      "title": "もう〜ました",
      "meaning": "Đã làm... xong rồi",
      "structure": "もう + Động từ thể た (ました)",
      "explanation": "Biểu thị hành động đã hoàn tất trước thời điểm hiện tại.",
      "examples": [
        {
          "jp": "もう宿題をしましたか。",
          "vn": "Bạn đã làm bài tập về nhà xong chưa?",
          "furigana": "もう しゅくだい を しましたか。"
        },
        {
          "jp": "はい、もう昼ご飯を食べました。",
          "vn": "Vâng, tôi đã ăn trưa rồi.",
          "furigana": "はい、もう ひるごはん を たべました。"
        }
      ]
    },
    {
      "id": "n5_40",
      "level": "N5",
      "title": "まだ〜ていません",
      "meaning": "Vẫn chưa làm... xong",
      "structure": "まだ + Động từ thể て + いません",
      "explanation": "Biểu thị một hành vi được kỳ vọng nhưng đến nay vẫn chưa được thực hiện.",
      "examples": [
        {
          "jp": "まだレポートを書いていません。",
          "vn": "Tôi vẫn chưa viết báo cáo xong.",
          "furigana": "まだ レポート を かいて いません。"
        },
        {
          "jp": "荷物はまだ届いていません。",
          "vn": "Bưu kiện vẫn chưa được giao đến.",
          "furigana": "にもつ は まだ とどいて いません。"
        }
      ]
    },
    {
      "id": "n5_41",
      "level": "N5",
      "title": "〜すぎます",
      "meaning": "Quá mức... (Vượt quá giới hạn)",
      "structure": "V bỏ ます / Tính từ い bỏ い / Tính từ な bỏ な + すぎます",
      "explanation": "Diễn tả hành động hoặc trạng thái vượt quá mức bình thường, thường mang sắc thái tiêu cực.",
      "examples": [
        {
          "jp": "昨夜、お酒を飲みすぎました。",
          "vn": "Tối qua tôi đã uống quá nhiều rượu.",
          "furigana": "ゆうべ、おさけ を のみすぎました。"
        },
        {
          "jp": "この問題は難しすぎます。",
          "vn": "Câu hỏi này quá khó.",
          "furigana": "この もんだい は むずかしすぎます。"
        }
      ]
    },
    {
      "id": "n5_42",
      "level": "N5",
      "title": "〜やすい／にくい",
      "meaning": "Dễ làm... / Khó làm...",
      "structure": "Động từ thể ます (bỏ ます) + やすい / にくい",
      "explanation": "Chỉ mức độ thuận lợi hoặc khó khăn khi tiến hành một thao tác, hành động.",
      "examples": [
        {
          "jp": "このペンは書きやすいです。",
          "vn": "Cây bút này rất dễ viết.",
          "furigana": "この ペン は かきやすい です。"
        },
        {
          "jp": "この漢字は覚えにくいです。",
          "vn": "Chữ Hán này rất khó nhớ.",
          "furigana": "この かんじ は おぼえにくい です。"
        }
      ]
    },
    {
      "id": "n5_43",
      "level": "N5",
      "title": "〜あげます／もらいます／くれます",
      "meaning": "Cho / Nhận / Tặng cho tôi (Hành vi trao nhận)",
      "structure": "Người tặng は Người nhận に Vật を あげます / もらいます / くれます",
      "explanation": "あげます: cho ai đó; もらいます: nhận từ ai đó; くれます: ai đó tặng cho mình hoặc người thân của mình.",
      "examples": [
        {
          "jp": "妹に誕生日プレゼントをあげました。",
          "vn": "Tôi đã tặng quà sinh nhật cho em gái.",
          "furigana": "いもうと に たんじょうび プレゼント を あげました。"
        },
        {
          "jp": "田中さんがこの本をくれました。",
          "vn": "Anh Tanaka đã tặng cuốn sách này cho tôi.",
          "furigana": "たなかさん が この ほん を くれました。"
        }
      ]
    },
    {
      "id": "n5_44",
      "level": "N5",
      "title": "〜あとで",
      "meaning": "Sau khi làm...",
      "structure": "Động từ thể た / Danh từ + の + あとで",
      "explanation": "Chỉ hành động phía sau xảy ra sau khi hành động phía trước hoàn thành.",
      "examples": [
        {
          "jp": "ご飯を食べたあとで、散歩します。",
          "vn": "Sau khi ăn cơm xong, tôi sẽ đi dạo.",
          "furigana": "ごはん を たべた あと で、さんぽ します。"
        },
        {
          "jp": "仕事のあとで、飲みに行きませんか。",
          "vn": "Sau giờ làm việc, cùng đi uống nước nhé?",
          "furigana": "しごと の あと で、のみ に いきませんか。"
        }
      ]
    },
    {
      "id": "n5_45",
      "level": "N5",
      "title": "〜とき",
      "meaning": "Khi... / Vào lúc...",
      "structure": "Thể thông thường / Tính từ / Danh từ + の + とき",
      "explanation": "Xác định thời điểm hoặc hoàn cảnh xảy ra mệnh đề chính.",
      "examples": [
        {
          "jp": "暇なとき、音楽を聞きます。",
          "vn": "Những lúc rảnh rỗi tôi thường nghe nhạc.",
          "furigana": "ひまな とき、おんがく を ききます。"
        },
        {
          "jp": "子どものとき、よく川で泳ぎました。",
          "vn": "Hồi còn bé tôi hay bơi ở sông.",
          "furigana": "こども の とき、よく かわ で およぎました。"
        }
      ]
    },
    {
      "id": "n5_46",
      "level": "N5",
      "title": "〜たら",
      "meaning": "Nếu... / Sau khi... (Điều kiện giả định & chuỗi sự việc)",
      "structure": "Động từ thể た + ら",
      "explanation": "Đặt ra giả thuyết \"nếu xảy ra A\" hoặc diễn tả \"sau khi hoàn thành A thì sẽ làm B\".",
      "examples": [
        {
          "jp": "雨が降ったら、出かけません。",
          "vn": "Nếu trời mưa thì tôi sẽ không ra ngoài.",
          "furigana": "あめ が ふったら、でかけません。"
        },
        {
          "jp": "駅に着いたら、電話してください。",
          "vn": "Khi nào tới ga thì hãy gọi điện cho tôi nhé.",
          "furigana": "えき に ついたら、でんわ して ください。"
        }
      ]
    },
    {
      "id": "n5_47",
      "level": "N5",
      "title": "〜ても",
      "meaning": "Dù cho... vẫn cứ... (Điều kiện nghịch)",
      "structure": "V thể て / Tính từ い bỏ い + くても / Tính từ な, N + でも",
      "explanation": "Biểu thị sự việc ở vế sau vẫn diễn ra bất chấp điều kiện bất lợi ở vế trước.",
      "examples": [
        {
          "jp": "雨が降っても、サッカーをします。",
          "vn": "Dù trời mưa chúng tôi vẫn chơi bóng đá.",
          "furigana": "あめ が ふっても、サッカー を します。"
        },
        {
          "jp": "高くても、このカメラを買いたいです。",
          "vn": "Dù đắt tôi vẫn muốn mua chiếc máy ảnh này.",
          "furigana": "たかくても、この カメラ を かいたい です。"
        }
      ]
    },
    {
      "id": "n5_48",
      "level": "N5",
      "title": "〜んです",
      "meaning": "Là vì... / Thật ra là... (Nhấn mạnh giải thích lý do)",
      "structure": "Thể thông thường (Tính từ な / N + な) + んです",
      "explanation": "Dùng trong hội thoại thân mật để giải thích lý do, bối cảnh một cách nhiệt tình hoặc tò mò hỏi han.",
      "examples": [
        {
          "jp": "どうして遅れたんですか。バスが来なかったんです。",
          "vn": "Sao bạn lại muộn vậy? Là vì xe buýt không tới ạ.",
          "furigana": "どうして おくれた ん ですか。バス が こなかった ん です。"
        },
        {
          "jp": "頭が痛いんです。",
          "vn": "Thật ra là tôi đang bị đau đầu.",
          "furigana": "あたま が いたい ん です。"
        }
      ]
    },
    {
      "id": "n5_49",
      "level": "N5",
      "title": "〜ので",
      "meaning": "Bởi vì... (Nguyên nhân khách quan, lịch sự)",
      "structure": "Thể thông thường (Tính từ な / N + な) + ので",
      "explanation": "Nêu lý do khách quan nhẹ nhàng, trang trọng hơn から, thường dùng khi xin phép hoặc xin lỗi.",
      "examples": [
        {
          "jp": "気分が悪いので、早退してもいいですか。",
          "vn": "Vì trong người không khỏe nên tôi xin phép về sớm được không ạ?",
          "furigana": "きぶん が わるい ので、そうたい しても いい ですか。"
        },
        {
          "jp": "危ないので、触らないでください。",
          "vn": "Vì nguy hiểm nên xin đừng chạm vào.",
          "furigana": "あぶない ので、さわらないで ください。"
        }
      ]
    },
    {
      "id": "n5_50",
      "level": "N5",
      "title": "〜とおなじ",
      "meaning": "Giống như... / Cùng một loại với...",
      "structure": "Danh từ + と同じ",
      "explanation": "Dùng để so sánh sự tương đồng hoặc giống nhau hoàn toàn giữa các đối tượng.",
      "examples": [
        {
          "jp": "わたしの傘はあなたのと同じです。",
          "vn": "Ô của tôi giống hệt ô của bạn.",
          "furigana": "わたし の かさ は あなた の と おなじ です。"
        },
        {
          "jp": "彼と同じ意見を持っています。",
          "vn": "Tôi có cùng ý kiến với anh ấy.",
          "furigana": "かれ と おなじ いけん を もっています。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "n4_1",
      "level": "N4",
      "title": "〜てみます",
      "meaning": "Thử làm... xem sao",
      "structure": "Động từ thể て + みます",
      "explanation": "Làm một hành động nào đó lần đầu tiên để kiểm nghiệm hoặc xem kết quả ra sao.",
      "examples": [
        {
          "jp": "日本の納豆を食べてみます。",
          "vn": "Tôi sẽ ăn thử món natto của Nhật Bản xem sao.",
          "furigana": "にほん の なっとう を たべて みます。"
        },
        {
          "jp": "この靴を履いてみてもいいですか。",
          "vn": "Tôi có thể đi thử đôi giày này được không?",
          "furigana": "この くつ を はいて みても いい ですか。"
        }
      ]
    },
    {
      "id": "n4_2",
      "level": "N4",
      "title": "〜てしまいます",
      "meaning": "Đã lỡ... (Tiếc nuối) / Làm xong trọn vẹn",
      "structure": "Động từ thể て + しまいます / しまいました",
      "explanation": "Biểu thị sự tiếc nuối khi lỡ làm điều không mong muốn, hoặc nhấn mạnh hoàn thành dứt điểm toàn bộ.",
      "examples": [
        {
          "jp": "パスポートを忘れてしまいました。",
          "vn": "Tôi đã lỡ để quên hộ chiếu mất rồi.",
          "furigana": "パスポート を わすれて しまいました。"
        },
        {
          "jp": "この本を全部読んでしまいました。",
          "vn": "Tôi đã đọc hết sạch cuốn sách này rồi.",
          "furigana": "この ほん を ぜんぶ よんで しまいました。"
        }
      ]
    },
    {
      "id": "n4_3",
      "level": "N4",
      "title": "〜てあります",
      "meaning": "Được làm sẵn (Trạng thái có chủ ý)",
      "structure": "Tha động từ thể て + あります",
      "explanation": "Diễn tả trạng thái hiện tại là kết quả của một hành động có chủ đích do ai đó đã làm sẵn.",
      "examples": [
        {
          "jp": "壁にカレンダーが掛けてあります。",
          "vn": "Trên tường có treo sẵn cuốn lịch.",
          "furigana": "かべ に カレンダー が かけて あります。"
        },
        {
          "jp": "ホテルの部屋はもう予約してあります。",
          "vn": "Phòng khách sạn đã được đặt sẵn rồi.",
          "furigana": "ホテル の へや は もう よやく して あります。"
        }
      ]
    },
    {
      "id": "n4_4",
      "level": "N4",
      "title": "〜ておきます",
      "meaning": "Làm sẵn trước để chuẩn bị",
      "structure": "Động từ thể て + おきます",
      "explanation": "Làm một hành động sẵn sàng để chuẩn bị cho một sự kiện hoặc mục đích trong tương lai.",
      "examples": [
        {
          "jp": "旅行の前に切符を買っておきます。",
          "vn": "Trước chuyến đi tôi sẽ mua vé sẵn.",
          "furigana": "りょこう の まえ に きっぷ を かって おきます。"
        },
        {
          "jp": "使った道具は元の場所に戻しておいてください。",
          "vn": "Dụng cụ sau khi dùng xin hãy cất sẵn lại chỗ cũ.",
          "furigana": "つかった どうぐ は もと の ばしょ に もどして おいて ください。"
        }
      ]
    },
    {
      "id": "n4_5",
      "level": "N4",
      "title": "〜意向形 + と思う",
      "meaning": "Dự định làm... (Ý chí chủ quan)",
      "structure": "Động từ thể ý chí (Ý hướng) + と思っています / と思う",
      "explanation": "Bày tỏ ý định thực hiện một việc gì đó mà người nói đã suy nghĩ từ trước tới nay.",
      "examples": [
        {
          "jp": "週末は家でゆっくり休もうと思います。",
          "vn": "Cuối tuần tôi định sẽ nghỉ ngơi thảnh thơi ở nhà.",
          "furigana": "しゅうまつ は いえ で ゆっくり やすもう と おもいます。"
        },
        {
          "jp": "来年、留学しようと思っています。",
          "vn": "Tôi đang có dự định năm sau sẽ đi du học.",
          "furigana": "らいねん、りゅうがく しよう と おもっています。"
        }
      ]
    },
    {
      "id": "n4_6",
      "level": "N4",
      "title": "〜つもりです",
      "meaning": "Dự định chắc chắn làm...",
      "structure": "Động từ thể từ điển / thể ない + つもりです",
      "explanation": "Biểu thị ý định có tính quyết tâm và kế hoạch rõ ràng hơn thể ý chí.",
      "examples": [
        {
          "jp": "大学を卒業したら、日本で働くつもりです。",
          "vn": "Sau khi tốt nghiệp đại học, tôi dự định làm việc ở Nhật.",
          "furigana": "だいがく を そつぎょう したら、にほん で はたらく つもり です。"
        },
        {
          "jp": "たばこはもう吸わないつもりです。",
          "vn": "Tôi quyết tâm sẽ không hút thuốc nữa.",
          "furigana": "たばこ は もう すわない つもり です。"
        }
      ]
    },
    {
      "id": "n4_7",
      "level": "N4",
      "title": "〜予定です",
      "meaning": "Theo lịch trình dự kiến sẽ...",
      "structure": "Động từ thể từ điển / Danh từ + の + 予定です",
      "explanation": "Nói về kế hoạch hoặc lịch trình công cộng, công việc đã được lên lịch sẵn.",
      "examples": [
        {
          "jp": "会議は午後２時から始まる予定です。",
          "vn": "Cuộc họp dự kiến bắt đầu từ 2 giờ chiều.",
          "furigana": "かいぎ は ごご にじ から はじまる よてい です。"
        },
        {
          "jp": "来月出張の予定です。",
          "vn": "Tháng sau tôi có lịch trình đi công tác.",
          "furigana": "らいげつ しゅっちょう の よてい です。"
        }
      ]
    },
    {
      "id": "n4_8",
      "level": "N4",
      "title": "〜はずです",
      "meaning": "Chắc chắn là... / Đáng lẽ phải...",
      "structure": "Thể thông thường (Tính từ な + な / Danh từ + の) + はずです",
      "explanation": "Căn cứ vào dữ kiện đáng tin cậy để đưa ra phán đoán chắc nịch.",
      "examples": [
        {
          "jp": "彼は今日来るはずです。",
          "vn": "Chắc chắn anh ấy sẽ tới vào hôm nay.",
          "furigana": "かれ は きょう くる はず です。"
        },
        {
          "jp": "薬を飲んだから、頭痛は治るはずです。",
          "vn": "Vì đã uống thuốc nên chắc chắn cơn đau đầu sẽ khỏi.",
          "furigana": "くすり を のんだ から、ずつう は なおる はず です。"
        }
      ]
    },
    {
      "id": "n4_9",
      "level": "N4",
      "title": "〜かもしれません",
      "meaning": "Có lẽ, có thể... (Khả năng khoảng 50%)",
      "structure": "Thể thông thường (Tính từ な, Danh từ bỏ だ) + かもしれません",
      "explanation": "Phỏng đoán mức độ không chắc chắn, sự việc hoàn toàn có khả năng xảy ra.",
      "examples": [
        {
          "jp": "午後から雨が降るかもしれません。",
          "vn": "Từ chiều có thể trời sẽ mưa.",
          "furigana": "ごご から あめ が ふる かもしれません。"
        },
        {
          "jp": "田中さんは遅れるかもしれません。",
          "vn": "Anh Tanaka có lẽ sẽ đến muộn.",
          "furigana": "たなかさん は おくれる かもしれません。"
        }
      ]
    },
    {
      "id": "n4_10",
      "level": "N4",
      "title": "〜ようです",
      "meaning": "Dường như, có vẻ như... (Cảm nhận giác quan)",
      "structure": "Thể thông thường (Tính từ な + な / Danh từ + の) + ようです",
      "explanation": "Phán đoán dựa trên những gì mắt thấy, tai nghe hoặc cảm nhận trực tiếp.",
      "examples": [
        {
          "jp": "隣の部屋にだれかいるようです。",
          "vn": "Dường như có ai đó trong phòng bên cạnh.",
          "furigana": "となり の へや に だれか いる よう です。"
        },
        {
          "jp": "彼は風邪を引いたようです。",
          "vn": "Có vẻ như anh ấy đã bị cảm lạnh.",
          "furigana": "かれ は かぜ を ひいた よう です。"
        }
      ]
    },
    {
      "id": "n4_11",
      "level": "N4",
      "title": "〜そうです (Thị giác)",
      "meaning": "Có vẻ sắp... / Trông có vẻ...",
      "structure": "Động từ bỏ ます / Tính từ い bỏ い / Tính từ な bỏ な + そうです",
      "explanation": "Nhìn bề ngoài và cảm thấy sắp sửa xảy ra một hiện tượng hoặc trạng thái.",
      "examples": [
        {
          "jp": "今にも雨が降りそうです。",
          "vn": "Trời trông có vẻ sắp mưa đến nơi rồi.",
          "furigana": "いま に も あめ が ふりそう です。"
        },
        {
          "jp": "このケーキはとても美味しそうです。",
          "vn": "Chiếc bánh này trông có vẻ rất ngon.",
          "furigana": "この ケーキ は とても おいしそう です。"
        }
      ]
    },
    {
      "id": "n4_12",
      "level": "N4",
      "title": "〜そうです (Truyền ngôn)",
      "meaning": "Nghe nói là...",
      "structure": "Thể thông thường + そうです",
      "explanation": "Dùng để truyền đạt lại thông tin nghe được từ báo chí, người khác mà không khẳng định.",
      "examples": [
        {
          "jp": "天気予報によると、明日は晴れるそうです。",
          "vn": "Theo dự báo thời tiết, nghe nói ngày mai trời sẽ nắng.",
          "furigana": "てんきよほう に よると、あした は はれる そう です。"
        },
        {
          "jp": "田中さんは来月結婚するそうです。",
          "vn": "Nghe nói anh Tanaka tháng sau sẽ kết hôn.",
          "furigana": "たなかさん は らいげつ けっこん する そう です。"
        }
      ]
    },
    {
      "id": "n4_13",
      "level": "N4",
      "title": "〜らしいです",
      "meaning": "Nghe nói là, dường như là...",
      "structure": "Thể thông thường (Tính từ な, Danh từ bỏ だ) + らしいです",
      "explanation": "Phỏng đoán dựa trên tin đồn hoặc nguồn tin gián tiếp đáng tin cậy.",
      "examples": [
        {
          "jp": "あの店はとても人気があるらしいです。",
          "vn": "Nghe nói cửa tiệm đằng kia rất được yêu thích.",
          "furigana": "あの みせ は とても にんき が ある らしい です。"
        },
        {
          "jp": "部長は明日休むらしいです。",
          "vn": "Hình như ngày mai trưởng phòng nghỉ phép.",
          "furigana": "ぶちょう は あした やすむ らしい です。"
        }
      ]
    },
    {
      "id": "n4_14",
      "level": "N4",
      "title": "〜受身形 (Thể bị động)",
      "meaning": "Bị... / Được... (Chịu tác động)",
      "structure": "Nhóm 1: âm u -> are; Nhóm 2: + rare; Nhóm 3: される / こられる",
      "explanation": "Chủ ngữ là đối tượng tiếp nhận hành động từ người khác thực hiện.",
      "examples": [
        {
          "jp": "先生に褒められました。",
          "vn": "Tôi đã được thầy giáo khen ngợi.",
          "furigana": "せんせい に ほめられました。"
        },
        {
          "jp": "雨に降られて濡れました。",
          "vn": "Tôi bị dính mưa nên ướt sũng.",
          "furigana": "あめ に ふられて ぬれました。"
        }
      ]
    },
    {
      "id": "n4_15",
      "level": "N4",
      "title": "〜使役形 (Thể sai khiến)",
      "meaning": "Bắt... / Cho phép làm...",
      "structure": "Nhóm 1: âm u -> ase; Nhóm 2: + sase; Nhóm 3: させる / こさせる",
      "explanation": "Người có quyền lực/vị thế cao hơn yêu cầu hoặc cho phép người dưới thực hiện hành vi.",
      "examples": [
        {
          "jp": "母は弟に部屋を掃除させました。",
          "vn": "Mẹ bắt em trai phải dọn dẹp phòng.",
          "furigana": "はは は おとうと に へや を そうじ させました。"
        },
        {
          "jp": "先生は生徒に自由に質問させます。",
          "vn": "Thầy giáo cho phép học sinh đặt câu hỏi tự do.",
          "furigana": "せんせい は せいと に じゆう に しつもん させます。"
        }
      ]
    },
    {
      "id": "n4_16",
      "level": "N4",
      "title": "〜使役受身 (Thể bị sai khiến)",
      "meaning": "Bị bắt buộc phải làm...",
      "structure": "Động từ thể sai khiến bị động (せられる / させられる)",
      "explanation": "Bị người khác ép buộc phải làm một việc mà bản thân không hề muốn.",
      "examples": [
        {
          "jp": "カラオケで歌を歌わされました。",
          "vn": "Tôi bị bắt phải hát ở quán karaoke.",
          "furigana": "カラオケ で うた を うたわされました。"
        },
        {
          "jp": "子どもはお母さんに野菜を食べさせられました。",
          "vn": "Đứa bé bị mẹ ép phải ăn rau.",
          "furigana": "こども は おかあさん に やさい を たべさせられました。"
        }
      ]
    },
    {
      "id": "n4_17",
      "level": "N4",
      "title": "〜てくれる／あげる／もらう",
      "meaning": "Làm giúp / Được làm giúp (Ân huệ hành động)",
      "structure": "Động từ thể て + くれます / あげます / もらいます",
      "explanation": "Thể hiện mối quan hệ trao đổi ân huệ thông qua việc thực hiện hành động.",
      "examples": [
        {
          "jp": "友達が引っ越しを手伝ってくれました。",
          "vn": "Bạn bè đã giúp tôi chuyển nhà.",
          "furigana": "ともだち が ひっこし を てつだって くれました。"
        },
        {
          "jp": "先生に日本語を教えてもらいました。",
          "vn": "Tôi được thầy giáo chỉ dạy tiếng Nhật cho.",
          "furigana": "せんせい に にほんご を おしえて もらいました。"
        }
      ]
    },
    {
      "id": "n4_18",
      "level": "N4",
      "title": "〜ていただけませんか",
      "meaning": "Làm ơn làm giúp tôi... được không ạ? (Nhờ vả rất lịch sự)",
      "structure": "Động từ thể て + いただけませんか / もらえませんか",
      "explanation": "Cách nhờ vả cấp trên hoặc người lạ giúp đỡ một cách hết sức lịch thiệp.",
      "examples": [
        {
          "jp": "もう一度説明していただけませんか。",
          "vn": "Làm ơn giải thích lại một lần nữa giúp tôi được không ạ?",
          "furigana": "もう いちど せつめい して いただけませんか。"
        },
        {
          "jp": "書き方を教えていただけませんか。",
          "vn": "Làm ơn chỉ cho tôi cách viết được không ạ?",
          "furigana": "かきかた を おしえて いただけませんか。"
        }
      ]
    },
    {
      "id": "n4_19",
      "level": "N4",
      "title": "〜なら",
      "meaning": "Nếu là... (Đưa ra gợi ý theo chủ đề)",
      "structure": "Danh từ / Thể thông thường + なら",
      "explanation": "Tiếp nhận chủ đề người đối thoại đưa ra và đưa ra lời khuyên hoặc ý kiến về chủ đề đó.",
      "examples": [
        {
          "jp": "京都へ行くなら、秋がおすすめです。",
          "vn": "Nếu là đi Kyoto thì mùa thu là tuyệt nhất.",
          "furigana": "きょうと へ いく なら、あき が おすすめ です。"
        },
        {
          "jp": "日本料理なら、天ぷらがいちばん好きです。",
          "vn": "Nếu là món ăn Nhật thì tôi thích món tempura nhất.",
          "furigana": "にほんりょうり なら、てんぷら が いちばん すき です。"
        }
      ]
    },
    {
      "id": "n4_20",
      "level": "N4",
      "title": "〜ば",
      "meaning": "Nếu... (Điều kiện giả định thuận)",
      "structure": "Nhóm 1: âm u -> eba; Nhóm 2: + reba; Tính từ い: bỏ い + ければ",
      "explanation": "Điều kiện giả định tất yếu, nếu thỏa mãn vế A thì vế B sẽ xảy ra.",
      "examples": [
        {
          "jp": "安ければ、買います。",
          "vn": "Nếu rẻ thì tôi sẽ mua.",
          "furigana": "やすければ、かいます。"
        },
        {
          "jp": "練習すれば、上手に話せるようになります。",
          "vn": "Nếu chăm chỉ luyện tập bạn sẽ nói giỏi lên.",
          "furigana": "れんしゅう すれば、じょうず に はなせる よう に なります。"
        }
      ]
    },
    {
      "id": "n4_21",
      "level": "N4",
      "title": "〜と (Điều kiện tự nhiên)",
      "meaning": "Hễ mà... thì đương nhiên...",
      "structure": "Động từ thể từ điển + と",
      "explanation": "Diễn tả quy luật tự nhiên, chỉ đường, hoặc phản ứng máy móc tất yếu.",
      "examples": [
        {
          "jp": "このボタンを押すと、お釣りが出ます。",
          "vn": "Hễ ấn nút này thì tiền thừa sẽ chạy ra.",
          "furigana": "この ボタン を おす と、おつり が でます。"
        },
        {
          "jp": "春になると、桜が咲きます。",
          "vn": "Hễ mùa xuân tới là hoa anh đào lại nở rộ.",
          "furigana": "はる に なる と、さくら が さきます。"
        }
      ]
    },
    {
      "id": "n4_22",
      "level": "N4",
      "title": "〜ようにします",
      "meaning": "Cố gắng tạo thói quen làm...",
      "structure": "Động từ thể từ điển / thể ない + ようにします / ようにしています",
      "explanation": "Biểu thị sự nỗ lực duy trì một thói quen tốt hoặc từ bỏ thói quen xấu hàng ngày.",
      "examples": [
        {
          "jp": "毎日野菜をたくさん食べるようにしています。",
          "vn": "Tôi luôn cố gắng ăn thật nhiều rau mỗi ngày.",
          "furigana": "まいにち やさい を たくさん たべる よう に しています。"
        },
        {
          "jp": "夜遅く甘いものを食べないようにします。",
          "vn": "Tôi sẽ cố gắng không ăn đồ ngọt lúc đêm muộn.",
          "furigana": "よる おそく あまい もの を たべない よう に します。"
        }
      ]
    },
    {
      "id": "n4_23",
      "level": "N4",
      "title": "〜ようになります",
      "meaning": "Dần dần trở nên có thể làm...",
      "structure": "Động từ thể khả năng + ようになります",
      "explanation": "Biểu thị sự biến đổi năng lực từ chưa thể làm sang đã có thể làm được.",
      "examples": [
        {
          "jp": "日本語の新聞が読めるようになりました。",
          "vn": "Tôi đã dần đọc được báo tiếng Nhật.",
          "furigana": "にほんご の しんぶん が よめる よう に なりました。"
        },
        {
          "jp": "一人で泳げるようになりました。",
          "vn": "Tôi đã biết tự bơi một mình.",
          "furigana": "ひとり で およげる よう に なりました。"
        }
      ]
    },
    {
      "id": "n4_24",
      "level": "N4",
      "title": "〜ように (Mục đích)",
      "meaning": "Để mà... (Không tự chủ)",
      "structure": "Động từ thể từ điển / thể ない (thường là vô ý chí) + ように",
      "explanation": "Chỉ mục đích nhằm đạt được một trạng thái mong muốn.",
      "examples": [
        {
          "jp": "忘れないように、メモを取ります。",
          "vn": "Để không bị quên, tôi ghi chú lại.",
          "furigana": "わすれない よう に、メモ を とります。"
        },
        {
          "jp": "後ろの人にも聞こえるように、大きな声で話してください。",
          "vn": "Để người phía sau cũng nghe được, xin hãy nói lớn tiếng.",
          "furigana": "うしろ の ひと に も きこえる よう に、おおきな こえ で はなして ください。"
        }
      ]
    },
    {
      "id": "n4_25",
      "level": "N4",
      "title": "〜ために (Mục đích / Nguyên nhân)",
      "meaning": "Để... (Có ý chí) / Vì (Nguyên nhân)",
      "structure": "Động từ thể từ điển / Danh từ + の + ために",
      "explanation": "Mục đích có chủ đích rõ rệt của con người hoặc nguyên nhân gây nên biến cố.",
      "examples": [
        {
          "jp": "新しい家を買うために、貯金しています。",
          "vn": "Để mua nhà mới, tôi đang tiết kiệm tiền.",
          "furigana": "あたらしい いえ を かう ため に、ちょきん しています。"
        },
        {
          "jp": "台風のために、電車が止まりました。",
          "vn": "Vì cơn bão nên tàu điện đã phải ngừng chạy.",
          "furigana": "たいふう の ため に、でんしゃ が とまりました。"
        }
      ]
    },
    {
      "id": "n4_26",
      "level": "N4",
      "title": "〜し〜し",
      "meaning": "Vừa... lại vừa... (Liệt kê lý do)",
      "structure": "Thể thông thường + し、Thể thông thường + し",
      "explanation": "Liệt kê từ 2 lý do, nguyên nhân trở lên dẫn đến một phán đoán hoặc kết luận.",
      "examples": [
        {
          "jp": "この店は美味しいし、安いし、いつも混んでいます。",
          "vn": "Quán này vừa ngon, lại vừa rẻ, nên lúc nào cũng đông khách.",
          "furigana": "この みせ は おいしい し、やすい し、いつも こんでいます。"
        },
        {
          "jp": "頭も痛いし、熱もあるから、今日は休みます。",
          "vn": "Vừa đau đầu lại vừa sốt nên hôm nay tôi xin nghỉ.",
          "furigana": "あたま も いたい し、ねつ も ある から、きょう は やすみます。"
        }
      ]
    },
    {
      "id": "n4_27",
      "level": "N4",
      "title": "〜のに",
      "meaning": "Dù rằng... thế mà (Bất mãn, bất ngờ)",
      "structure": "Thể thông thường (Tính từ な, Danh từ + な) + のに",
      "explanation": "Nối hai vế đối lập, biểu thị tâm trạng tiếc nuối, bất ngờ hoặc oán trách ngoài dự tính.",
      "examples": [
        {
          "jp": "一生懸命勉強したのに、不合格でした。",
          "vn": "Dù đã học hết sức mình thế mà lại trượt.",
          "furigana": "いっしょうけんめい べんきょう した のに、ふごうかく でした。"
        },
        {
          "jp": "約束したのに、彼は来ませんでした。",
          "vn": "Đã hẹn trước rồi thế mà anh ấy không tới.",
          "furigana": "やくそく した のに、かれ は きませんでした。"
        }
      ]
    },
    {
      "id": "n4_28",
      "level": "N4",
      "title": "〜ばかり",
      "meaning": "Chỉ toàn là... (Mang sắc thái chê trách)",
      "structure": "Danh từ + ばかり / Động từ thể て + ばかりいる",
      "explanation": "Lặp đi lặp lại một hành động hoặc sự vật quá nhiều, khiến người nói không hài lòng.",
      "examples": [
        {
          "jp": "弟は遊んでばかりいます。",
          "vn": "Em trai tôi suốt ngày chỉ toàn chơi bời.",
          "furigana": "おとうと は あそんで ばかり います。"
        },
        {
          "jp": "肉ばかり食べないで、野菜も食べなさい。",
          "vn": "Đừng có chỉ ăn toàn thịt, hãy ăn cả rau nữa đi.",
          "furigana": "にく ばかり たべないで、やさい も たべなさい。"
        }
      ]
    },
    {
      "id": "n4_29",
      "level": "N4",
      "title": "〜たばかり",
      "meaning": "Vừa mới làm... xong tức thì",
      "structure": "Động từ thể た + ばかり",
      "explanation": "Theo cảm nhận chủ quan của người nói, sự việc vừa mới hoàn thành cách đây không lâu.",
      "examples": [
        {
          "jp": "日本に来たばかりです。",
          "vn": "Tôi vừa mới tới Nhật Bản thôi.",
          "furigana": "にほん に きた ばかり です。"
        },
        {
          "jp": "さっき昼ご飯を食べたばかりなのに、もうお腹が空きました。",
          "vn": "Vừa mới ăn trưa lúc nãy xong thế mà đã đói bụng rồi.",
          "furigana": "さっき ひるごはん を たべた ばかり なのに、もう おなか が すきました。"
        }
      ]
    },
    {
      "id": "n4_30",
      "level": "N4",
      "title": "〜ところです",
      "meaning": "Đúng lúc sắp / đang / vừa mới làm",
      "structure": "V từ điển + ところ / V thể ている + ところ / V thể た + ところ",
      "explanation": "Xác định điểm mốc cực kỳ chuẩn xác của hành động (chuẩn bị làm, đang làm dở, hay vừa dứt).",
      "examples": [
        {
          "jp": "今から出かけるところです。",
          "vn": "Bây giờ tôi đúng lúc đang chuẩn bị đi ra ngoài.",
          "furigana": "いま から でかける ところ です。"
        },
        {
          "jp": "今、ご飯を食べているところです。",
          "vn": "Tôi đúng lúc đang ngồi ăn cơm.",
          "furigana": "いま、ごはん を たべて いる ところ です。"
        }
      ]
    },
    {
      "id": "n4_31",
      "level": "N4",
      "title": "〜がる／がっている",
      "meaning": "Cảm thấy, tỏ ra... (Cảm xúc ngôi thứ 3)",
      "structure": "Tính từ い bỏ い / Tính từ な bỏ な + がる / がっている",
      "explanation": "Miêu tả cảm xúc, mong muốn của người thứ ba bộc lộ ra ngoài qua nét mặt, cử chỉ.",
      "examples": [
        {
          "jp": "子どもが新しいおもちゃを欲しがっています。",
          "vn": "Đứa bé đang tỏ ra rất muốn có món đồ chơi mới.",
          "furigana": "こども が あたらしい おもちゃ を ほしがっています。"
        },
        {
          "jp": "彼は寒がっています。",
          "vn": "Anh ấy trông có vẻ đang thấy rất lạnh.",
          "furigana": "かれ は さむがっています。"
        }
      ]
    },
    {
      "id": "n4_32",
      "level": "N4",
      "title": "〜はずがない",
      "meaning": "Tuyệt đối không thể nào có chuyện...",
      "structure": "Thể thông thường + はずがない",
      "explanation": "Phủ định hoàn toàn khả năng xảy ra của một sự việc dựa trên chứng cứ chắc chắn.",
      "examples": [
        {
          "jp": "そんなはずがありません。",
          "vn": "Không thể nào có chuyện như thế được.",
          "furigana": "そんな はず が ありません。"
        },
        {
          "jp": "彼が嘘をつくはずがありません。",
          "vn": "Anh ấy tuyệt đối không thể nào nói dối được.",
          "furigana": "かれ が うそ を つく はず が ありません。"
        }
      ]
    },
    {
      "id": "n4_33",
      "level": "N4",
      "title": "〜ずに",
      "meaning": "Làm gì mà không làm... (= ないで)",
      "structure": "Động từ thể ない bỏ ない + ずに (する -> せずに)",
      "explanation": "Cách diễn đạt trang trọng hơn của ないで, làm hành động B trong trạng thái không làm A.",
      "examples": [
        {
          "jp": "朝ご飯を食べずに学校へ行きました。",
          "vn": "Tôi đã đến trường mà không ăn bữa sáng.",
          "furigana": "あさごはん を たべずに がっこう へ いきました。"
        },
        {
          "jp": "辞書を見ずに新聞を読みます。",
          "vn": "Tôi đọc báo mà không cần tra từ điển.",
          "furigana": "じしょ を みずに しんぶん を よみます。"
        }
      ]
    },
    {
      "id": "n4_34",
      "level": "N4",
      "title": "〜お／ご〜になる (Tôn kính ngữ)",
      "meaning": "Kính thưa quý khách làm...",
      "structure": "お + V nhóm 1,2 bỏ ます + になります / ご + Danh từ hành động + になります",
      "explanation": "Dạng tôn kính ngữ chuẩn mực nâng cao vị thế hành động của đối phương hoặc cấp trên.",
      "examples": [
        {
          "jp": "社長はお帰りになりました。",
          "vn": "Giám đốc đã về nhà rồi ạ.",
          "furigana": "しゃちょう は おかえり に なりました。"
        },
        {
          "jp": "こちらでお名前をご記入ください。",
          "vn": "Xin quý khách vui lòng điền tên vào đây ạ.",
          "furigana": "こちら で おなまえ を ごきにゅう ください。"
        }
      ]
    },
    {
      "id": "n4_35",
      "level": "N4",
      "title": "〜お／ご〜する (Khiêm nhường ngữ)",
      "meaning": "Tôi xin phép được làm... cho ngài",
      "structure": "お + V nhóm 1,2 bỏ ます + します / ご + Danh từ hành động + します",
      "explanation": "Hạ thấp hành động của bản thân để biểu thị sự tôn trọng kính cẩn đối với đối phương.",
      "examples": [
        {
          "jp": "荷物をお持ちします。",
          "vn": "Tôi xin phép được xách hành lý giúp ngài.",
          "furigana": "にもつ を おもち します。"
        },
        {
          "jp": "明日スケジュールをご連絡します。",
          "vn": "Ngày mai tôi xin phép liên lạc báo lịch trình.",
          "furigana": "あした スケジュール を ごれんらく します。"
        }
      ]
    },
    {
      "id": "n4_36",
      "level": "N4",
      "title": "〜なさる／おっしゃる／いらっしゃる",
      "meaning": "Tôn kính ngữ đặc biệt",
      "structure": "Động từ tôn kính từ vựng đặc biệt thay thế động từ thông thường",
      "explanation": "いらっしゃる (đi/đến/ở), おっしゃる (nói), なさる (làm), ご覧になる (xem), 召し上がる (ăn/uống).",
      "examples": [
        {
          "jp": "先生は何とおっしゃいましたか。",
          "vn": "Thầy giáo đã nói điều gì vậy ạ?",
          "furigana": "せんせい は なん と おっしゃいました か。"
        },
        {
          "jp": "どうぞ召し上がってください。",
          "vn": "Xin mời quý khách dùng bữa ạ.",
          "furigana": "どうぞ めしあがって ください。"
        }
      ]
    },
    {
      "id": "n4_37",
      "level": "N4",
      "title": "〜まいる／もうす／いただく",
      "meaning": "Khiêm nhường ngữ đặc biệt",
      "structure": "Động từ khiêm nhường từ vựng đặc biệt của người nói",
      "explanation": "まいる (đi/đến), もうす (nói), いただく (ăn/uống/nhận), お目にかかる (gặp), ぞんじる (biết).",
      "examples": [
        {
          "jp": "明日１０時に伺います。",
          "vn": "Ngày mai lúc 10 giờ tôi xin phép tới thăm ạ.",
          "furigana": "あした じゅうじ に うかがいます。"
        },
        {
          "jp": "ナムと申します。どうぞよろしくお願いします。",
          "vn": "Tôi tên là Nam. Rất mong được giúp đỡ ạ.",
          "furigana": "ナム と もうします。どうぞ よろしく おねがい します。"
        }
      ]
    },
    {
      "id": "n4_38",
      "level": "N4",
      "title": "〜命令形・禁止形 (Mệnh lệnh & Cấm chỉ)",
      "meaning": "Làm đi! / Cấm không được làm!",
      "structure": "Mệnh lệnh: âm e / ろ; Cấm chỉ: Động từ thể từ điển + な",
      "explanation": "Dùng trong trường hợp khẩn cấp (cứu hộ, biển báo giao thông, cổ vũ thể thao) hoặc cấp trên quát mắng.",
      "examples": [
        {
          "jp": "早く走れ！",
          "vn": "Chạy nhanh lên!",
          "furigana": "はやく はしれ！"
        },
        {
          "jp": "ここにゴミを捨てるな。",
          "vn": "Cấm vứt rác ở đây.",
          "furigana": "ここに ゴミ を すてる な。"
        }
      ]
    },
    {
      "id": "n4_39",
      "level": "N4",
      "title": "〜か〜どうか",
      "meaning": "Có... hay không",
      "structure": "Thể thông thường + かどうか",
      "explanation": "Lồng câu hỏi không có từ để hỏi vào trong một mệnh đề câu lớn hơn.",
      "examples": [
        {
          "jp": "美味しいかどうか食べてみてください。",
          "vn": "Hãy ăn thử xem có ngon hay không nhé.",
          "furigana": "おいしい か どうか たべて みて ください。"
        },
        {
          "jp": "彼が来るかどうか分かりません。",
          "vn": "Tôi không biết liệu anh ấy có tới hay không.",
          "furigana": "かれ が くる か どうか わかりません。"
        }
      ]
    },
    {
      "id": "n4_40",
      "level": "N4",
      "title": "〜疑问 từ + か",
      "meaning": "Ai đó, cái gì đó, ở đâu đó...",
      "structure": "だれか / 何か / どこか / いつか",
      "explanation": "Chỉ đối tượng bất định chưa xác định rõ danh tính hoặc vị trí.",
      "examples": [
        {
          "jp": "だれか部屋にいますか。",
          "vn": "Có ai đó trong phòng không?",
          "furigana": "だれか へや に いますか。"
        },
        {
          "jp": "のどが渇いたので、何か飲みたいです。",
          "vn": "Khát nước quá nên tôi muốn uống cái gì đó.",
          "furigana": "のど が かわいた ので、なにか のみたい です。"
        }
      ]
    },
    {
      "id": "n4_41",
      "level": "N4",
      "title": "〜てよかった",
      "meaning": "Thật may vì đã làm...",
      "structure": "Động từ thể て + よかった",
      "explanation": "Bày tỏ sự nhẹ nhõm, vui mừng vì đã kịp thời thực hiện một hành động đúng đắn.",
      "examples": [
        {
          "jp": "傘を持ってきてよかったです。",
          "vn": "Thật may vì tôi đã mang theo ô.",
          "furigana": "かさ を もってきて よかった です。"
        },
        {
          "jp": "先生に相談してよかったです。",
          "vn": "Thật may vì tôi đã trao đổi trước với thầy giáo.",
          "furigana": "せんせい に そうだん して よかった です。"
        }
      ]
    },
    {
      "id": "n4_42",
      "level": "N4",
      "title": "〜てもかまいません",
      "meaning": "Dù có làm... cũng không sao cả",
      "structure": "Động từ thể て + もかまいません",
      "explanation": "Cách diễn đạt lịch sự biểu thị sự chấp thuận, không phiền lòng.",
      "examples": [
        {
          "jp": "靴を履いたままでもかまいません。",
          "vn": "Cứ mang cả giày vào cũng không sao đâu ạ.",
          "furigana": "くつ を はいた まま でも かまいません。"
        },
        {
          "jp": "明日電話してもかまいませんか。",
          "vn": "Ngày mai tôi gọi điện có phiền không ạ?",
          "furigana": "あした でんわ しても かまいません か。"
        }
      ]
    },
    {
      "id": "n4_43",
      "level": "N4",
      "title": "〜なさい",
      "meaning": "Hãy làm... đi (Lời nhắc nhở của người lớn)",
      "structure": "Động từ thể ます (bỏ ます) + なさい",
      "explanation": "Dùng khi cha mẹ nhắc nhở con cái hoặc giáo viên yêu cầu học sinh làm bài.",
      "examples": [
        {
          "jp": "早く起きなさい。もう時間ですよ。",
          "vn": "Dậy nhanh lên con. Đã đến giờ rồi đấy.",
          "furigana": "はやく おきなさい。もう じかん ですよ。"
        },
        {
          "jp": "宿題を早く出しなさい。",
          "vn": "Hãy nộp bài tập về nhà nhanh lên.",
          "furigana": "しゅくだい を はやく だしなさい。"
        }
      ]
    },
    {
      "id": "n4_44",
      "level": "N4",
      "title": "〜まま",
      "meaning": "Để nguyên trạng thái không đổi...",
      "structure": "Động từ thể た / thể ない / Danh từ + の + まま",
      "explanation": "Hành động tiếp theo diễn ra khi trạng thái trước đó vẫn được giữ nguyên không thay đổi.",
      "examples": [
        {
          "jp": "テレビをつけたまま寝てしまいました。",
          "vn": "Tôi đã để nguyên tivi bật mà ngủ thiếp đi.",
          "furigana": "テレビ を つけた まま ねて しまいました。"
        },
        {
          "jp": "生のまま食べられます。",
          "vn": "Có thể ăn sống nguyên như vậy.",
          "furigana": "なま の まま たべられます。"
        }
      ]
    },
    {
      "id": "n4_45",
      "level": "N4",
      "title": "〜っぱなし",
      "meaning": "Bỏ mặc nguyên xi (Bất cẩn, cẩu thả)",
      "structure": "Động từ thể ます (bỏ ます) + っぱなし",
      "explanation": "Để nguyên một trạng thái đáng lẽ phải dọn dẹp hoặc tắt đi, mang ý chê trách.",
      "examples": [
        {
          "jp": "水を出しっぱなしにしないでください。",
          "vn": "Xin đừng xả nước chảy tràn lan như thế.",
          "furigana": "みず を だしっぱなし に しないで ください。"
        },
        {
          "jp": "一日中立ちっぱなしで足が痛いです。",
          "vn": "Đứng suốt cả ngày trời nên chân tôi đau nhức.",
          "furigana": "いちにちじゅう たちっぱなし で あし が いたい です。"
        }
      ]
    },
    {
      "id": "n4_46",
      "level": "N4",
      "title": "〜方 (かた)",
      "meaning": "Cách làm...",
      "structure": "Động từ thể ます (bỏ ます) + 方",
      "explanation": "Biến động từ thành danh từ chỉ phương pháp, cách thức tiến hành công việc.",
      "examples": [
        {
          "jp": "この漢字の読み方を教えてください。",
          "vn": "Xin hãy chỉ cho tôi cách đọc chữ Hán này.",
          "furigana": "この かんじ の よみかた を おしえて ください。"
        },
        {
          "jp": "パソコンの使い方が分かりません。",
          "vn": "Tôi không hiểu cách sử dụng chiếc máy tính này.",
          "furigana": "パソコン の つかいかた が わかりません。"
        }
      ]
    },
    {
      "id": "n4_47",
      "level": "N4",
      "title": "〜間／間に",
      "meaning": "Trong suốt khi... / Trong khoảng khi...",
      "structure": "Thể từ điển / Danh từ + の + 間 / 間に",
      "explanation": "間: hành động diễn ra liên tục song song; 間に: một hành động ngắn xảy ra chèn ngang.",
      "examples": [
        {
          "jp": "夏休みの間、ずっと祖母の家にいました。",
          "vn": "Suốt kỳ nghỉ hè, tôi ở suốt nhà bà ngoại.",
          "furigana": "なつやすみ の あいだ、ずっと そぼ の いえ に いました。"
        },
        {
          "jp": "留守の間に泥棒が入りました。",
          "vn": "Trong lúc vắng nhà, trộm đã lẻn vào.",
          "furigana": "るす の あいだ に どろぼう が はいりました。"
        }
      ]
    },
    {
      "id": "n4_48",
      "level": "N4",
      "title": "〜始める／終わる",
      "meaning": "Bắt đầu làm... / Kết thúc làm...",
      "structure": "Động từ thể ます (bỏ ます) + 始める / 終わる",
      "explanation": "Chỉ điểm khởi đầu hoặc điểm hoàn tất của một hành trình hành động.",
      "examples": [
        {
          "jp": "雨が降り始めました。",
          "vn": "Trời đã bắt đầu đổ mưa.",
          "furigana": "あめ が ふりはじめました。"
        },
        {
          "jp": "本を読み終わったら、返してください。",
          "vn": "Khi nào đọc xong sách xin hãy trả lại cho tôi.",
          "furigana": "ほん を よみおわったら、かえして ください。"
        }
      ]
    },
    {
      "id": "n4_49",
      "level": "N4",
      "title": "〜続ける",
      "meaning": "Tiếp tục làm... không ngừng",
      "structure": "Động từ thể ます (bỏ ます) + 続ける",
      "explanation": "Duy trì hành động liên tục trong một khoảng thời gian dài không ngắt quãng.",
      "examples": [
        {
          "jp": "諦めないで日本語を勉強し続けます。",
          "vn": "Tôi sẽ không bỏ cuộc mà tiếp tục kiên trì học tiếng Nhật.",
          "furigana": "あきらめないで にほんご を べんきょう しつづけます。"
        },
        {
          "jp": "雨が三日間降り続きました。",
          "vn": "Mưa đã rơi liên tục suốt 3 ngày liền.",
          "furigana": "あめ が みっかかん ふりつづけました。"
        }
      ]
    },
    {
      "id": "n4_50",
      "level": "N4",
      "title": "〜やすい／にくい",
      "meaning": "Dễ làm... / Khó làm... (Tính chất khách quan)",
      "structure": "Động từ thể ます (bỏ ます) + やすい / にくい",
      "explanation": "Bản chất sự vật làm cho thao tác trở nên thuận lợi hoặc cản trở.",
      "examples": [
        {
          "jp": "この薬は苦くないので、飲みやすいです。",
          "vn": "Thuốc này không đắng nên rất dễ uống.",
          "furigana": "この くすり は にがくない ので、のみやすい です。"
        },
        {
          "jp": "暗い部屋では文字が読みにくいです。",
          "vn": "Trong phòng tối thì rất khó đọc chữ.",
          "furigana": "くらい へや では もじ が よみにくい です。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "n3_1",
      "level": "N3",
      "title": "〜に関して",
      "meaning": "Liên quan đến... / Về vấn đề...",
      "structure": "Danh từ + に関して / に関する + Danh từ",
      "explanation": "Dùng trong ngữ cảnh trang trọng, phát biểu, nghiên cứu để diễn tả chủ đề liên quan.",
      "examples": [
        {
          "jp": "環境問題に関してレポートを書きました。",
          "vn": "Tôi đã viết báo cáo liên quan đến vấn đề môi trường.",
          "furigana": "かんきょう もんだい に かんして レポート を かきました。"
        },
        {
          "jp": "事件に関する詳しい情報はまだありません。",
          "vn": "Chưa có thông tin chi tiết liên quan đến vụ việc.",
          "furigana": "じけん に かんする くわしい じょうほう は まだ ありません。"
        }
      ]
    },
    {
      "id": "n3_2",
      "level": "N3",
      "title": "〜に対して",
      "meaning": "Đối với... / Trái ngược với...",
      "structure": "Danh từ + に対して / に対する + Danh từ (hoặc Mệnh đề thể thường + のに対して)",
      "explanation": "Chỉ đối tượng hướng đến hoặc dùng để so sánh hai vế có tính chất tương phản rõ rệt.",
      "examples": [
        {
          "jp": "目上の人に対して敬語を使います。",
          "vn": "Dùng kính ngữ đối với người bề trên.",
          "furigana": "めうえ の ひと に たいして けいご を つかいます。"
        },
        {
          "jp": "兄が無口なのに対して、弟はとてもおしゃべりだ。",
          "vn": "Trái ngược với người anh ít nói, cậu em lại rất thích nói chuyện.",
          "furigana": "あに が むくち な の に たいして、おとうと は とても おしゃべり だ。"
        }
      ]
    },
    {
      "id": "n3_3",
      "level": "N3",
      "title": "〜について",
      "meaning": "Về... (nội dung chủ đề)",
      "structure": "Danh từ + について / についての + Danh từ",
      "explanation": "Nêu lên đối tượng, chủ đề mà người nói đang suy nghĩ, nghiên cứu hoặc thảo luận.",
      "examples": [
        {
          "jp": "日本の歴史について勉強しています。",
          "vn": "Tôi đang tìm hiểu về lịch sử Nhật Bản.",
          "furigana": "にほん の れきし について べんきょう しています。"
        },
        {
          "jp": "将来の進路について先生と相談した。",
          "vn": "Tôi đã trao đổi với thầy giáo về định hướng tương lai.",
          "furigana": "しょうらい の しんろ について せんせい と そうだん した。"
        }
      ]
    },
    {
      "id": "n3_4",
      "level": "N3",
      "title": "〜にとって",
      "meaning": "Đối với... (dưới góc nhìn, lập trường đánh giá)",
      "structure": "Danh từ (chỉ người/tổ chức) + にとって / にとっての + Danh từ",
      "explanation": "Đưa ra nhận xét, đánh giá từ góc độ, lập trường của một đối tượng cụ thể.",
      "examples": [
        {
          "jp": "私にとって家族が一番大切です。",
          "vn": "Đối với tôi, gia đình là điều quan trọng nhất.",
          "furigana": "わたし にとって かぞく が いちばん たいせつ です。"
        },
        {
          "jp": "留学生にとってビザの更新はとても重要な問題だ。",
          "vn": "Đối với du học sinh, việc gia hạn visa là một vấn đề cực kỳ quan trọng.",
          "furigana": "りゅうがくせい にとって ビザ の こうしん は とても じゅうよう な もんだい だ。"
        }
      ]
    },
    {
      "id": "n3_5",
      "level": "N3",
      "title": "〜によって／による",
      "meaning": "Do... / Bằng cách... / Tùy theo...",
      "structure": "Danh từ + によって / により / による + Danh từ",
      "explanation": "Chỉ nguyên nhân, phương tiện cách thức thực hiện hoặc sự khác biệt tùy theo đối tượng.",
      "examples": [
        {
          "jp": "台風によって電車が止まりました。",
          "vn": "Do bão nên tàu điện đã ngừng hoạt động.",
          "furigana": "たいふう によって でんしゃ が とまりました。"
        },
        {
          "jp": "人によって考え方が違います。",
          "vn": "Tùy theo mỗi người mà cách suy nghĩ sẽ khác nhau.",
          "furigana": "ひと によって かんがえかた が ちがいます。"
        }
      ]
    },
    {
      "id": "n3_6",
      "level": "N3",
      "title": "〜によると／によれば",
      "meaning": "Theo như... (trích dẫn nguồn tin)",
      "structure": "Danh từ (chỉ nguồn tin) + によると / によれば + ...そうだ / ということだ",
      "explanation": "Dùng để dẫn nguồn thông tin nghe được hoặc đọc được từ báo đài, người khác.",
      "examples": [
        {
          "jp": "天気予報によると、明日は雨が降るそうです。",
          "vn": "Theo dự báo thời tiết thì ngày mai trời sẽ mưa.",
          "furigana": "てんきよほう によると、あした は あめ が ふる そう です。"
        },
        {
          "jp": "友達の話によれば、あのレストランはおいしいらしい。",
          "vn": "Theo lời bạn tôi thì nghe nói nhà hàng đó ngon lắm.",
          "furigana": "ともだち の はなし によれば、あの レストラン は おいしい らしい。"
        }
      ]
    },
    {
      "id": "n3_7",
      "level": "N3",
      "title": "〜を通じて／を通して",
      "meaning": "Thông qua... / Suốt cả...",
      "structure": "Danh từ + を通じて (をつうじて) / を通して (をとおして)",
      "explanation": "Chỉ phương tiện gián tiếp để đạt mục đích, hoặc khoảng thời gian kéo dài suốt một quá trình.",
      "examples": [
        {
          "jp": "インターネットを通じて世界中のニュースを知ることができる。",
          "vn": "Thông qua Internet, ta có thể biết tin tức trên toàn thế giới.",
          "furigana": "インターネット を つうじて せかいじゅう の ニュース を しる こと が できる。"
        },
        {
          "jp": "この地域は四季を通じて暖かい気候です。",
          "vn": "Khu vực này có khí hậu ấm áp suốt bốn mùa.",
          "furigana": "この ちいき は しき を とおして あたたかい きこう です。"
        }
      ]
    },
    {
      "id": "n3_8",
      "level": "N3",
      "title": "〜を中心に",
      "meaning": "Lấy... làm trung tâm / Trọng tâm là...",
      "structure": "Danh từ + を中心に / を中心として / を中心にした + Danh từ",
      "explanation": "Chỉ đối tượng, khu vực, vấn đề quan trọng cốt lõi nhất được đưa ra làm điểm quy tụ.",
      "examples": [
        {
          "jp": "駅前を中心に新しい商店街が開発されている。",
          "vn": "Khu phố mua sắm mới đang được phát triển với trọng tâm là quanh ga.",
          "furigana": "えきまえ を ちゅうしん に あたらしい しょうてんがい が かいはつ されている。"
        },
        {
          "jp": "文法を中心に対策を進めます。",
          "vn": "Chúng tôi sẽ đẩy mạnh ôn thi với ngữ pháp làm trọng tâm.",
          "furigana": "ぶんぽう を ちゅうしん に たいさく を すすめます。"
        }
      ]
    },
    {
      "id": "n3_9",
      "level": "N3",
      "title": "〜をはじめ",
      "meaning": "Trước tiên phải kể đến... / Tiêu biểu là...",
      "structure": "Danh từ + をはじめ / をはじめとして / をはじめとする + Danh từ",
      "explanation": "Đưa ra một ví dụ điển hình nhất trong một nhóm tập hợp.",
      "examples": [
        {
          "jp": "富士山をはじめ、日本には美しい山がたくさんあります。",
          "vn": "Trước tiên phải kể đến núi Phú Sĩ, Nhật Bản có rất nhiều ngọn núi đẹp.",
          "furigana": "ふじさん を はじめ、にほん に は うつくしい やま が たくさん あります。"
        },
        {
          "jp": "校長先生をはじめ、先生方に感謝申し上げます。",
          "vn": "Tôi xin cảm ơn các thầy cô giáo, tiêu biểu là thầy hiệu trưởng.",
          "furigana": "こうちょう せんせい を はじめ、せんせいがた に かんしゃ もうしあげます。"
        }
      ]
    },
    {
      "id": "n3_10",
      "level": "N3",
      "title": "〜にわたって",
      "meaning": "Suốt / Trải dài khắp (thời gian, không gian, quy mô)",
      "structure": "Danh từ (thời gian, địa điểm, số lượng) + にわたって / にわたり / にわたる + Danh từ",
      "explanation": "Nhấn mạnh quy mô lớn, kéo dài liên tục về không gian hoặc thời gian.",
      "examples": [
        {
          "jp": "会議は３日間にわたって行われました。",
          "vn": "Cuộc họp đã diễn ra kéo dài suốt 3 ngày.",
          "furigana": "かいぎ は みっかかん に わたって おこなわれました。"
        },
        {
          "jp": "台風は広い範囲にわたって被害を与えた。",
          "vn": "Cơn bão đã gây thiệt hại trên một phạm vi rất rộng lớn.",
          "furigana": "たいふう は ひろい はんい に わたって ひがい を あたえた。"
        }
      ]
    },
    {
      "id": "n3_11",
      "level": "N3",
      "title": "〜おきに",
      "meaning": "Cứ cách... lại...",
      "structure": "Từ chỉ số lượng / thời gian + おきに",
      "explanation": "Chỉ khoảng cách đều đặn lặp đi lặp lại về thời gian hoặc không gian.",
      "examples": [
        {
          "jp": "このバスは１５分おきに出発します。",
          "vn": "Chuyến xe buýt này cứ cách 15 phút lại xuất phát một chuyến.",
          "furigana": "この バス は じゅうごふん おき に しゅっぱつ します。"
        },
        {
          "jp": "道路には５メートルおきに街灯が並んでいる。",
          "vn": "Trên đường, cứ cách 5 mét lại có một cột đèn đường.",
          "furigana": "どうろ に は ごメートル おき に がいとう が ならんでいる。"
        }
      ]
    },
    {
      "id": "n3_12",
      "level": "N3",
      "title": "〜たびに",
      "meaning": "Mỗi lần... lại...",
      "structure": "Động từ thể từ điển / Danh từ + の + たびに",
      "explanation": "Mỗi khi có một sự việc A xảy ra thì việc B luôn luôn diễn ra theo cùng.",
      "examples": [
        {
          "jp": "この曲を聴くたびに、故郷を思い出します。",
          "vn": "Mỗi lần nghe ca khúc này, tôi lại nhớ về quê hương.",
          "furigana": "この きょく を きく たび に、こきょう を おもいだします。"
        },
        {
          "jp": "母は旅行のたびに、お土産をたくさん買ってきます。",
          "vn": "Mỗi lần đi du lịch mẹ tôi đều mua rất nhiều quà lưu niệm về.",
          "furigana": "はは は りょこう の たび に、おみやげ を たくさん かってきます。"
        }
      ]
    },
    {
      "id": "n3_13",
      "level": "N3",
      "title": "〜ついでに",
      "meaning": "Nhân tiện... / Tiện thể...",
      "structure": "Động từ thể từ điển/thể た / Danh từ + の + ついでに",
      "explanation": "Tận dụng khi đang thực hiện việc chính A để kết hợp làm luôn việc phụ B.",
      "examples": [
        {
          "jp": "買い物のついでに、郵便局へ寄りました。",
          "vn": "Tiện thể đi mua sắm, tôi đã ghé vào bưu điện.",
          "furigana": "かいもの の ついで に、ゆうびんきょく へ よりました。"
        },
        {
          "jp": "コンビニへ行くなら、ついでにお茶を買ってきて。",
          "vn": "Nếu cậu đi cửa hàng tiện lợi thì tiện thể mua giúp chai trà nhé.",
          "furigana": "コンビニ へ いく なら、ついで に おちゃ を かってきて。"
        }
      ]
    },
    {
      "id": "n3_14",
      "level": "N3",
      "title": "〜最中に",
      "meaning": "Đang giữa lúc... thì bất ngờ xảy ra chuyện",
      "structure": "Động từ thể ている / Danh từ + の + 最中に (さいちゅうに)",
      "explanation": "Một hành động bất ngờ xen ngang vào đúng lúc đang cao trào làm gián đoạn.",
      "examples": [
        {
          "jp": "食事の最中に電話がかかってきた。",
          "vn": "Đúng lúc đang ăn cơm thì điện thoại reo.",
          "furigana": "しょくじ の さいちゅう に でんわ が かかってきた。"
        },
        {
          "jp": "スピーチをしている最中に、マイクが壊れてしまった。",
          "vn": "Đang giữa lúc phát biểu thì mic bỗng nhiên bị hỏng.",
          "furigana": "スピーチ を している さいちゅう に、マイク が こわれて しまった。"
        }
      ]
    },
    {
      "id": "n3_15",
      "level": "N3",
      "title": "〜うちに",
      "meaning": "Trong lúc còn... / Trong khi đang... thì biến chuyển",
      "structure": "Động từ thể từ điển/thể ない/thể ている / Tính từ / Danh từ + の + うちに",
      "explanation": "Tranh thủ làm việc gì trước khi điều kiện thay đổi, hoặc sự thay đổi diễn ra tự nhiên trong khoảng thời gian đó.",
      "examples": [
        {
          "jp": "温かいうちに召し上がってください。",
          "vn": "Xin mời dùng bữa trong lúc đồ ăn còn nóng.",
          "furigana": "あたたかい うち に めしあがってください。"
        },
        {
          "jp": "本を読んでいるうちに、眠くなってしまった。",
          "vn": "Trong lúc đang đọc sách thì tôi buồn ngủ lúc nào không hay.",
          "furigana": "ほん を よんでいる うち に、ねむく なって しまった。"
        }
      ]
    },
    {
      "id": "n3_16",
      "level": "N3",
      "title": "〜から〜にかけて",
      "meaning": "Từ... đến khoảng... (ước chừng)",
      "structure": "Danh từ 1 + から + Danh từ 2 + にかけて",
      "explanation": "Biểu thị khoảng thời gian hoặc không gian có ranh giới đầu cuối tương đối mờ nhạt, ước chừng.",
      "examples": [
        {
          "jp": "今夜から明日の朝にかけて大雨になるでしょう。",
          "vn": "Từ đêm nay đến khoảng sáng mai có khả năng sẽ có mưa to.",
          "furigana": "こんや から あした の あさ に かけて おおあめ に なる でしょう。"
        },
        {
          "jp": "九州から四国にかけて台風が接近しています。",
          "vn": "Cơn bão đang tiếp cận vùng từ Kyushu tới Shikoku.",
          "furigana": "きゅうしゅう から しこく に かけて たいふう が せっきん しています。"
        }
      ]
    },
    {
      "id": "n3_17",
      "level": "N3",
      "title": "〜において／における",
      "meaning": "Tại / Ở / Trong (thời điểm, địa điểm, lĩnh vực)",
      "structure": "Danh từ + において / における + Danh từ",
      "explanation": "Diễn đạt trang trọng tương đương trợ từ で, dùng nhiều trong văn viết và phát biểu.",
      "examples": [
        {
          "jp": "東京ドームにおいてコンサートが開催された。",
          "vn": "Buổi hòa nhạc đã được tổ chức tại Tokyo Dome.",
          "furigana": "とうきょう ドーム において コンサート が かいさい された。"
        },
        {
          "jp": "現代社会におけるインターネットの役割は大きい。",
          "vn": "Vai trò của Internet trong xã hội hiện đại là vô cùng lớn.",
          "furigana": "げんだい しゃかい における インターネット の やくわり は おおきい。"
        }
      ]
    },
    {
      "id": "n3_18",
      "level": "N3",
      "title": "〜に沿って",
      "meaning": "Dọc theo... / Men theo... / Tuân theo...",
      "structure": "Danh từ + に沿って (にそって) / に沿う + Danh từ",
      "explanation": "Hành động đi theo tuyến đường, bờ sông hoặc thực hiện bám sát theo kế hoạch, tiêu chuẩn.",
      "examples": [
        {
          "jp": "川に沿って散歩するのが好きです。",
          "vn": "Tôi thích đi dạo men theo bờ sông.",
          "furigana": "かわ に そって さんぽ する の が すき です。"
        },
        {
          "jp": "マニュアルに沿って作業を進めてください。",
          "vn": "Hãy tiến hành công việc tuân theo sách hướng dẫn.",
          "furigana": "マニュアル に そって さぎょう を すすめて ください。"
        }
      ]
    },
    {
      "id": "n3_19",
      "level": "N3",
      "title": "〜に基づいて",
      "meaning": "Dựa trên... / Căn cứ vào...",
      "structure": "Danh từ + に基づいて (にもとづいて) / に基づく + Danh từ",
      "explanation": "Lấy dữ liệu, thực tế, pháp luật hoặc kinh nghiệm làm cơ sở vững chắc để hành động.",
      "examples": [
        {
          "jp": "実際のデータに基づいて計画を立てました。",
          "vn": "Tôi đã lập kế hoạch dựa trên dữ liệu thực tế.",
          "furigana": "じっさい の データ に もとづいて けいかく を たてました。"
        },
        {
          "jp": "法律に基づいて正しく処理してください。",
          "vn": "Hãy xử lý đúng đắn căn cứ theo quy định của pháp luật.",
          "furigana": "ほうりつ に もとづいて ただしく しょり して ください。"
        }
      ]
    },
    {
      "id": "n3_20",
      "level": "N3",
      "title": "〜のもとで／のもとに",
      "meaning": "Dưới sự hướng dẫn... / Dưới điều kiện...",
      "structure": "Danh từ + のもとで / のもとに",
      "explanation": "Dưới sự bao bọc, dạy dỗ của thầy cô, cha mẹ hoặc dưới một điều kiện danh nghĩa nào đó.",
      "examples": [
        {
          "jp": "厳しい指導のもとで練習に励んでいます。",
          "vn": "Chúng tôi đang nỗ lực luyện tập dưới sự chỉ dẫn nghiêm khắc.",
          "furigana": "きびしい しどう の もと で れんしゅう に はげんで います。"
        },
        {
          "jp": "青空のもとでピクニックを楽しんだ。",
          "vn": "Chúng tôi đã tận hưởng buổi dã ngoại dưới bầu trời trong xanh.",
          "furigana": "あおぞら の もと で ピクニック を たのしんだ。"
        }
      ]
    },
    {
      "id": "n3_21",
      "level": "N3",
      "title": "〜に応えて",
      "meaning": "Đáp lại... / Hưởng ứng...",
      "structure": "Danh từ + に応えて (にこたえて) / に応える + Danh từ",
      "explanation": "Hành động nhằm đáp ứng mong đợi, nguyện vọng, kỳ vọng của người khác.",
      "examples": [
        {
          "jp": "ファンの期待に応えて、アンコール曲を歌った。",
          "vn": "Đáp lại sự kỳ vọng của người hâm mộ, ca sĩ đã hát bài hát encore.",
          "furigana": "ファン の きたい に こたえて、アンコール きょく を うたった。"
        },
        {
          "jp": "市民の要望に応えて、新しい図書館が建てられた。",
          "vn": "Đáp ứng nguyện vọng của người dân, một thư viện mới đã được xây dựng.",
          "furigana": "しみん の ようぼう に こたえて、あたらしい としょかん が たてられた。"
        }
      ]
    },
    {
      "id": "n3_22",
      "level": "N3",
      "title": "〜向けに／向きだ",
      "meaning": "Dành riêng cho... / Phù hợp với...",
      "structure": "Danh từ + 向け (むけ) / 向き (むき)",
      "explanation": "向け là thiết kế chủ ý nhắm vào đối tượng đó; 向き là ngẫu nhiên có tính chất thích hợp.",
      "examples": [
        {
          "jp": "この本は初心者向けに書かれています。",
          "vn": "Cuốn sách này được viết dành riêng cho người mới bắt đầu.",
          "furigana": "この ほん は しんしんしゃ むけ に かかれて います。"
        },
        {
          "jp": "この部屋は日当たりがいいので、植物を育てる向きだ。",
          "vn": "Phòng này nhiều ánh sáng nên rất phù hợp để trồng cây cảnh.",
          "furigana": "この へや は ひあたり が いい ので、しょくぶつ を そだてる むき だ。"
        }
      ]
    },
    {
      "id": "n3_23",
      "level": "N3",
      "title": "〜わけだ",
      "meaning": "Thảo nào mà... / Đương nhiên là thế",
      "structure": "Thể thông thường (Naな/Nである) + わけだ",
      "explanation": "Hiểu ra nguyên nhân vì sao sự việc lại diễn ra như vậy (\"À, hóa ra là như thế\").",
      "examples": [
        {
          "jp": "気温が３５度もあるのか。暑いわけだ。",
          "vn": "Nhiệt độ tận 35 độ cơ à? Thảo nào mà nóng thế.",
          "furigana": "きおん が さんじゅうご ど も ある の か。あつい わけ だ。"
        },
        {
          "jp": "彼は日本に５年も住んでいるから、日本語が上手なわけだ。",
          "vn": "Anh ấy sống ở Nhật tận 5 năm rồi, thảo nào giỏi tiếng Nhật thế.",
          "furigana": "かれ は にほん に ごねん も すんでいる から、にほんご が じょうず な わけ だ。"
        }
      ]
    },
    {
      "id": "n3_24",
      "level": "N3",
      "title": "〜わけがない",
      "meaning": "Không có lý nào... / Tuyệt đối không thể...",
      "structure": "Thể thông thường (Naな/Nの) + わけがない",
      "explanation": "Khẳng định mạnh mẽ dựa trên lý lẽ logic rằng việc đó hoàn toàn không thể xảy ra.",
      "examples": [
        {
          "jp": "彼が嘘をつくわけがありません。",
          "vn": "Không có lý nào anh ấy lại nói dối đâu.",
          "furigana": "かれ が うそ を つく わけ が ありません。"
        },
        {
          "jp": "こんなに難しい試験に一日で合格できるわけがない。",
          "vn": "Một kỳ thi khó thế này thì không có lý nào đỗ chỉ trong một ngày học.",
          "furigana": "こんな に むずかしい しけん に いちにち で ごうかく できる わけ が ない。"
        }
      ]
    },
    {
      "id": "n3_25",
      "level": "N3",
      "title": "〜わけではない",
      "meaning": "Không hẳn là... / Không nhất thiết là...",
      "structure": "Thể thông thường (Naな/Nの) + わけではない",
      "explanation": "Phủ định một phần, làm giảm tính khẳng định tuyệt đối để tránh hiểu lầm.",
      "examples": [
        {
          "jp": "嫌いなわけではないが、あまり食べたくない。",
          "vn": "Không hẳn là tôi ghét, nhưng tôi không muốn ăn lắm.",
          "furigana": "きらい な わけ ではない が、あまり たべたくない。"
        },
        {
          "jp": "高いものが必ずしも良いわけではない。",
          "vn": "Đồ đắt tiền không hẳn lúc nào cũng là đồ tốt.",
          "furigana": "たかい もの が かならずしも よい わけ ではない。"
        }
      ]
    },
    {
      "id": "n3_26",
      "level": "N3",
      "title": "〜わけにはいかない",
      "meaning": "Không thể (vì đạo đức, trách nhiệm, áp lực tâm lý)",
      "structure": "Động từ thể từ điển / thể ない + わけにはいかない",
      "explanation": "Về mặt khả năng thì làm được, nhưng do bổn phận hoặc lương tâm cấm cản nên không thể làm.",
      "examples": [
        {
          "jp": "明日は大事な試験があるので、休むわけにはいかない。",
          "vn": "Mai có bài thi quan trọng nên tôi không thể nghỉ được.",
          "furigana": "あした は だいじ な しけん が ある ので、やすむ わけ に は いかない。"
        },
        {
          "jp": "約束したからには、行かないわけにはいかない。",
          "vn": "Một khi đã hứa rồi thì tôi không thể không đi.",
          "furigana": "やくそく した から に は、いかない わけ に は いかない。"
        }
      ]
    },
    {
      "id": "n3_27",
      "level": "N3",
      "title": "〜どころではない",
      "meaning": "Không phải lúc... / Đâu có tâm trí đâu mà...",
      "structure": "Danh từ / Động từ thể từ điển/thể ている + どころではない",
      "explanation": "Tình thế quá bận rộn, căng thẳng khiến bản thân không thể thực hiện hành động kia.",
      "examples": [
        {
          "jp": "忙しくて、旅行どころではありません。",
          "vn": "Bận rộn quá chừng, lúc này không phải lúc nghĩ đến chuyện đi du lịch.",
          "furigana": "いそがしくて、りょこう どころ ではありません。"
        },
        {
          "jp": "風邪で熱があって、勉強どころじゃないよ。",
          "vn": "Tôi đang bị sốt vì cảm cúm, tâm trí đâu mà học hành nữa chứ.",
          "furigana": "かぜ で ねつ が あって、べんきょう どころ じゃ ない よ。"
        }
      ]
    },
    {
      "id": "n3_28",
      "level": "N3",
      "title": "〜ものだ",
      "meaning": "Là thứ hiển nhiên / Thường hay... (hoài niệm)",
      "structure": "Động từ thể từ điển / thể た + ものだ",
      "explanation": "Nói về chân lý quy luật tự nhiên, hoặc nhớ lại thói quen sâu sắc trong quá khứ.",
      "examples": [
        {
          "jp": "子供の頃はよくこの川で泳いだものだ。",
          "vn": "Hồi bé tôi thường hay bơi ở khúc sông này.",
          "furigana": "こども の ころ は よく この かわ で およいだ もの だ。"
        },
        {
          "jp": "親はいつでも子供を心配するものだ。",
          "vn": "Cha mẹ thì lúc nào cũng lo lắng cho con cái, đó là lẽ tự nhiên.",
          "furigana": "おや は いつでも こども を しんぱい する もの だ。"
        }
      ]
    },
    {
      "id": "n3_29",
      "level": "N3",
      "title": "〜ものではない",
      "meaning": "Không nên... / Đừng có... (lời khuyên đạo đức)",
      "structure": "Động từ thể từ điển + ものではない",
      "explanation": "Khuyên nhủ hoặc răn đe chuẩn mực xã hội không nên làm một điều gì đó.",
      "examples": [
        {
          "jp": "人の悪口を言うものではありません。",
          "vn": "Không nên nói xấu sau lưng người khác.",
          "furigana": "ひと の わるくち を いう もの ではありません。"
        },
        {
          "jp": "そんな失礼な態度は取るものではない。",
          "vn": "Không được tỏ thái độ thất lễ như vậy.",
          "furigana": "そんな しつれい な たいど は とる もの ではない。"
        }
      ]
    },
    {
      "id": "n3_30",
      "level": "N3",
      "title": "〜ことにしている",
      "meaning": "Tự mình duy trì thói quen...",
      "structure": "Động từ thể từ điển / thể ない + ことにしている",
      "explanation": "Biểu thị một nguyên tắc, thói quen do chính bản thân tự giác quyết định và duy trì.",
      "examples": [
        {
          "jp": "健康のために、毎朝ジョギングすることにしている。",
          "vn": "Vì sức khỏe, tôi tự đặt thói quen chạy bộ mỗi buổi sáng.",
          "furigana": "けんこう の ため に、まいあさ ジョギング する こと に している。"
        },
        {
          "jp": "夜遅くには甘いものを食べないことにしています。",
          "vn": "Tôi giữ thói quen không ăn đồ ngọt vào đêm muộn.",
          "furigana": "よる おそく に は あまい もの を たべない こと に しています。"
        }
      ]
    },
    {
      "id": "n3_31",
      "level": "N3",
      "title": "〜ことになっている",
      "meaning": "Quy định là... / Được sắp đặt là...",
      "structure": "Động từ thể từ điển / thể ない + ことになっている",
      "explanation": "Quy tắc tổ chức, luật lệ, thỏa thuận hoặc lịch trình do tập thể ấn định mà cá nhân phải tuân theo.",
      "examples": [
        {
          "jp": "法律で二十歳未満はお酒を飲んではいけないことになっている。",
          "vn": "Theo luật thì người dưới 20 tuổi không được phép uống rượu.",
          "furigana": "ほうりつ で はたち みまん は おさけ を のんでは いけない こと に なっている。"
        },
        {
          "jp": "来週の月曜日に社長と面談することになっています。",
          "vn": "Tôi đã có lịch hẹn phỏng vấn với giám đốc vào thứ Hai tuần tới.",
          "furigana": "らいしゅう の げつようび に しゃちょう と めんだん する こと に なっている。"
        }
      ]
    },
    {
      "id": "n3_32",
      "level": "N3",
      "title": "〜ことはない",
      "meaning": "Không cần thiết phải...",
      "structure": "Động từ thể từ điển + ことはない",
      "explanation": "Đưa ra lời khuyên người nghe không cần phải quá lo lắng hay cố sức làm điều đó.",
      "examples": [
        {
          "jp": "そんなに心配することはありませんよ。",
          "vn": "Cậu không cần phải lo lắng thái quá như vậy đâu.",
          "furigana": "そんな に しんぱい する こと は ありません よ。"
        },
        {
          "jp": "時間はまだ十分あるから、急ぐことはない。",
          "vn": "Vẫn còn thừa thời gian nên không cần phải vội vã đâu.",
          "furigana": "じかん は まだ じゅうぶん ある から、いそぐ こと は ない。"
        }
      ]
    },
    {
      "id": "n3_33",
      "level": "N3",
      "title": "〜たとたん",
      "meaning": "Vừa mới... thì ngay lập tức...",
      "structure": "Động từ thể た + とたん（に）",
      "explanation": "Hành động A vừa dứt thì biến cố B bất ngờ ập đến ngay sau đó, nằm ngoài dự liệu.",
      "examples": [
        {
          "jp": "窓を開けたとたん、冷たい風が入ってきた。",
          "vn": "Vừa mới mở cửa sổ ra thì ngay lập tức một luồng gió lạnh lùa vào.",
          "furigana": "まど を あけた とたん、つめたい かぜ が はいってきた。"
        },
        {
          "jp": "薬を飲んだとたんに、痛みが消えました。",
          "vn": "Vừa uống viên thuốc xong thì cơn đau lập tức biến mất.",
          "furigana": "くすり を のんだ とたん に、いたみ が きえました。"
        }
      ]
    },
    {
      "id": "n3_34",
      "level": "N3",
      "title": "〜たきり",
      "meaning": "Kể từ sau khi... thì bặt vô âm tín / mãi chưa...",
      "structure": "Động từ thể た + きり",
      "explanation": "Sau một hành động ban đầu, trạng thái không hề thay đổi hoặc không có hành động tiếp diễn nào sau đó.",
      "examples": [
        {
          "jp": "彼は「ちょっと出かける」と言ったきり、帰ってこない。",
          "vn": "Anh ấy chỉ nói \"ra ngoài chút\" rồi từ đó đến giờ mãi chưa thấy về.",
          "furigana": "かれ は 「ちょっと でかける」 と いった きり、かえってこない。"
        },
        {
          "jp": "一度会ったきり、その後連絡を取っていない。",
          "vn": "Kể từ sau một lần gặp gỡ đó, tôi bặt tin tức không liên lạc gì nữa.",
          "furigana": "いちど あった きり、その ご れんらく を とっていない。"
        }
      ]
    },
    {
      "id": "n3_35",
      "level": "N3",
      "title": "〜ふりをする",
      "meaning": "Giả vờ như...",
      "structure": "Thể thông thường (Naな/Nの) + ふりをする",
      "explanation": "Cố tình biểu hiện cử chỉ, hành vi bề ngoài khác hẳn với bản chất hoặc sự thật bên trong.",
      "examples": [
        {
          "jp": "聞こえないふりをして、通り過ぎた。",
          "vn": "Tôi giả vờ như không nghe thấy rồi bước qua luôn.",
          "furigana": "きこえない ふり を して、とおりすぎた。"
        },
        {
          "jp": "彼女は知っているのに、知らないふりをした。",
          "vn": "Cô ấy biết rõ mười mươi nhưng lại giả vờ như không biết gì.",
          "furigana": "かのじょ は しっている のに、しらない ふり を した。"
        }
      ]
    },
    {
      "id": "n3_36",
      "level": "N3",
      "title": "〜っぽい",
      "meaning": "Có vẻ... / Hơi có tính chất...",
      "structure": "Danh từ / Động từ thể ます (bỏ ます) / Tính từ い (bỏ い) + っぽい",
      "explanation": "Mang đặc tính, khuynh hướng thiên về một trạng thái nào đó (thường mang sắc thái tiêu cực nhẹ).",
      "examples": [
        {
          "jp": "あの人は怒りっぽい性格です。",
          "vn": "Người đó tính tình rất dễ nổi nóng.",
          "furigana": "あの ひと は おこりっぽい せいかく です。"
        },
        {
          "jp": "このスープは少し水っぽいですね。",
          "vn": "Món súp này hơi có vẻ loãng nhờ nhờ như nước nhỉ.",
          "furigana": "この スープ は すこし みずっぽい です ね。"
        }
      ]
    },
    {
      "id": "n3_37",
      "level": "N3",
      "title": "〜気味",
      "meaning": "Có cảm giác hơi... / Có triệu chứng...",
      "structure": "Danh từ / Động từ thể ます (bỏ ます) + 気味 (ぎみ)",
      "explanation": "Chỉ trạng thái có một chút biểu hiện, dấu hiệu không tốt (ốm sốt, căng thẳng).",
      "examples": [
        {
          "jp": "風邪気味なので、今夜は早く寝ます。",
          "vn": "Tôi cảm giác hơi có dấu hiệu cảm cúm nên tối nay sẽ đi ngủ sớm.",
          "furigana": "かぜぎみ なので、こんや は はやく ねます。"
        },
        {
          "jp": "最近、仕事が忙しくて寝不足気味だ。",
          "vn": "Dạo này công việc bận rộn nên tôi hơi có cảm giác thiếu ngủ.",
          "furigana": "さいきん、しごと が いそがしくて ねぶそくぎみ だ。"
        }
      ]
    },
    {
      "id": "n3_38",
      "level": "N3",
      "title": "〜がち",
      "meaning": "Thường hay... / Dễ có xu hướng... (xấu)",
      "structure": "Danh từ / Động từ thể ます (bỏ ます) + がち",
      "explanation": "Diễn tả tần suất thường xuyên xảy ra một hiện tượng tiêu cực hoặc tật xấu.",
      "examples": [
        {
          "jp": "冬は風邪を引きがちです。",
          "vn": "Mùa đông người ta thường hay bị cảm lạnh.",
          "furigana": "ふゆ は かぜ を ひきがち です。"
        },
        {
          "jp": "一人暮らしの若者は野菜が不足しがちだ。",
          "vn": "Thanh niên sống một mình thường hay bị thiếu rau củ.",
          "furigana": "ひとりぐらし の わかもの は やさい が ふそく しがち だ。"
        }
      ]
    },
    {
      "id": "n3_39",
      "level": "N3",
      "title": "〜だらけ",
      "meaning": "Toàn là... / Đầy rẫy...",
      "structure": "Danh từ + だらけ",
      "explanation": "Bao phủ khắp bề mặt hoặc ngập tràn toàn những thứ bẩn thỉu, lỗi lầm, khó chịu.",
      "examples": [
        {
          "jp": "この作文は間違いだらけです。",
          "vn": "Bài văn này đầy rẫy lỗi sai.",
          "furigana": "この さくぶん は まちがい だらけ です。"
        },
        {
          "jp": "雨の中を走ったので、泥だらけになった。",
          "vn": "Vì chạy trong mưa nên người tôi dính đầy bùn đất.",
          "furigana": "あめ の なか を はしった ので、どろ だらけ に なった。"
        }
      ]
    },
    {
      "id": "n3_40",
      "level": "N3",
      "title": "〜きれない",
      "meaning": "Không thể hết được / Quá nhiều không xuể",
      "structure": "Động từ thể ます (bỏ ます) + きれない",
      "explanation": "Số lượng quá nhiều hoặc mức độ quá lớn khiến không thể hoàn thành trọn vẹn tới cùng.",
      "examples": [
        {
          "jp": "料理が多すぎて、全部は食べきれません。",
          "vn": "Món ăn nhiều quá, tôi không thể nào ăn hết được.",
          "furigana": "りょうり が おおすぎて、ぜんぶ は たべきれません。"
        },
        {
          "jp": "数えきれないほどの星が夜空に輝いている。",
          "vn": "Vô số vì sao không thể đếm xuể đang tỏa sáng trên bầu trời đêm.",
          "furigana": "かぞえきれない ほど の ほし が よぞら に かがやいている。"
        }
      ]
    },
    {
      "id": "n3_41",
      "level": "N3",
      "title": "〜抜く",
      "meaning": "Làm đến cùng / Kiên trì vượt qua gian khổ",
      "structure": "Động từ thể ます (bỏ ます) + 抜く (ぬく)",
      "explanation": "Nỗ lực phi thường vượt qua muôn vàn trắc trở để hoàn tất hành động.",
      "examples": [
        {
          "jp": "最後までフルマラソンを走り抜いた。",
          "vn": "Tôi đã kiên trì chạy đến cùng hết chặng full marathon.",
          "furigana": "さいご まで フルマラソン を はしりぬいた。"
        },
        {
          "jp": "悩み抜いて、会社を辞める決心をした。",
          "vn": "Sau khi trăn trở suy nghĩ đến cùng, tôi đã quyết định nghỉ việc.",
          "furigana": "なやみぬいて、かいしゃ を やめる けっしん を した。"
        }
      ]
    },
    {
      "id": "n3_42",
      "level": "N3",
      "title": "〜かけ／かける",
      "meaning": "Đang dở dang... / Chưa xong",
      "structure": "Động từ thể ます (bỏ ます) + かけ / かける",
      "explanation": "Hành động đang diễn ra giữa chừng thì dừng lại, chưa hoàn tất trọn vẹn.",
      "examples": [
        {
          "jp": "テーブルの上に飲みかけのコーヒーがある。",
          "vn": "Trên bàn có cốc cà phê đang uống dở.",
          "furigana": "テーブル の うえ に のみかけ の コーヒー が ある。"
        },
        {
          "jp": "手紙を書きかけたまま、出かけてしまった。",
          "vn": "Tôi bỏ dở bức thư đang viết dở mà đi ra ngoài.",
          "furigana": "てがみ を かきかけた まま、でかけて しまった。"
        }
      ]
    },
    {
      "id": "n3_43",
      "level": "N3",
      "title": "〜さえ",
      "meaning": "Thậm chí... / Ngay cả...",
      "structure": "Danh từ + さえ",
      "explanation": "Lấy ra một trường hợp cực đoan điển hình nhất để ngụ ý các trường hợp khác cũng như vậy.",
      "examples": [
        {
          "jp": "ひらがなさえ読めないのに、漢字は無理です。",
          "vn": "Ngay cả hiragana còn chưa đọc được thì chữ Hán là bất khả thi.",
          "furigana": "ひらがな さえ よめない のに、かんじ は むり です。"
        },
        {
          "jp": "忙しすぎて、昼ご飯を食べる時間さえなかった。",
          "vn": "Tôi bận đến mức thậm chí còn chẳng có thời gian ăn bữa trưa.",
          "furigana": "いそがしすぎて、ひるごはん を たべる じかん さえ なかった。"
        }
      ]
    },
    {
      "id": "n3_44",
      "level": "N3",
      "title": "〜さえ〜ば",
      "meaning": "Chỉ cần... là đủ",
      "structure": "Danh từ + さえ + Động từ thể điều kiện (ば)",
      "explanation": "Nhấn mạnh điều kiện tối thiểu duy nhất, nếu đạt được điều đó thì mọi chuyện đều ổn thỏa.",
      "examples": [
        {
          "jp": "薬を飲みさえすれば、すぐに治りますよ。",
          "vn": "Chỉ cần uống thuốc là cậu sẽ khỏi ngay thôi.",
          "furigana": "くすり を のみ さえ すれば、すぐ に なおります よ。"
        },
        {
          "jp": "お金さえあれば何でも買えるというわけではない。",
          "vn": "Không hẳn là chỉ cần có tiền thì thứ gì cũng mua được.",
          "furigana": "おかね さえ あれば なんでも かえる という わけ ではない。"
        }
      ]
    },
    {
      "id": "n3_45",
      "level": "N3",
      "title": "〜こそ",
      "meaning": "Chính là... (nhấn mạnh cao độ)",
      "structure": "Danh từ + こそ / Động từ thể て + こそ",
      "explanation": "Dùng để nhấn mạnh dứt khoát vào một đối tượng hoặc lý do cụ thể.",
      "examples": [
        {
          "jp": "今年こそ絶対にJLPTに合格してみせる。",
          "vn": "Chính năm nay tôi nhất định sẽ đỗ JLPT cho xem.",
          "furigana": "ことし こそ ぜったい に JLPT に ごうかく してみせる。"
        },
        {
          "jp": "こちらこそ、どうぞよろしくお願いします。",
          "vn": "Chính tôi mới là người phải nhờ cậy sự giúp đỡ của quý vị.",
          "furigana": "こちら こそ、どうぞ よろしく おねがいします。"
        }
      ]
    },
    {
      "id": "n3_46",
      "level": "N3",
      "title": "〜なんか／なんて",
      "meaning": "Mấy thứ như là... / Cỡ như... (hạ thấp, coi nhẹ)",
      "structure": "Danh từ / Động từ thể từ điển + なんか / なんて",
      "explanation": "Biểu thị sự coi nhẹ, khiêm tốn hoặc ngạc nhiên trước một sự việc bất ngờ.",
      "examples": [
        {
          "jp": "お化けなんか怖くないよ。",
          "vn": "Mấy thứ như ma quỷ tớ chẳng sợ đâu.",
          "furigana": "おばけ なんか こわくない よ。"
        },
        {
          "jp": "彼が結婚するなんて信じられない。",
          "vn": "Cái chuyện cậu ấy lấy vợ quả thật không thể tin nổi.",
          "furigana": "かれ が けっこん する なんて しんじられない。"
        }
      ]
    },
    {
      "id": "n3_47",
      "level": "N3",
      "title": "〜おかげで",
      "meaning": "Nhờ có... (kết quả tích cực)",
      "structure": "Thể thông thường (Naな/Nの) + おかげで",
      "explanation": "Bày tỏ lòng biết ơn đối với sự giúp đỡ hoặc nguyên nhân dẫn tới thành quả tốt đẹp.",
      "examples": [
        {
          "jp": "先生のおかげで、試験に合格できました。",
          "vn": "Nhờ có thầy cô mà em đã thi đỗ kỳ thi.",
          "furigana": "せんせい の おかげ で、しけん に ごうかく できました。"
        },
        {
          "jp": "薬を飲んだおかげで、熱が下がった。",
          "vn": "Nhờ uống thuốc mà cơn sốt đã hạ.",
          "furigana": "くすり を のんだ おかげ で、ねつ が さがった。"
        }
      ]
    },
    {
      "id": "n3_48",
      "level": "N3",
      "title": "〜せいで",
      "meaning": "Do... / Tại vì... (kết quả tiêu cực)",
      "structure": "Thể thông thường (Naな/Nの) + せいで / せいだ",
      "explanation": "Đổ lỗi, quy trách nhiệm cho một nguyên nhân nào đó gây ra hậu quả xấu xí.",
      "examples": [
        {
          "jp": "夜更かしをしたせいで、今朝寝坊してしまった。",
          "vn": "Tại vì thức khuya nên sáng nay tôi đã ngủ quên.",
          "furigana": "よふかし を した せい で、けさ ねぼう して しまった。"
        },
        {
          "jp": "雨のせいで、サッカーの試合が中止になった。",
          "vn": "Do trời mưa nên trận đấu bóng đá đã bị hủy.",
          "furigana": "あめ の せい で、サッカー の しあい が ちゅうし に なった。"
        }
      ]
    },
    {
      "id": "n3_49",
      "level": "N3",
      "title": "〜とおりに／どおりに",
      "meaning": "Đúng theo như...",
      "structure": "Động từ thể từ điển/thể た / Danh từ + どおりに / のとおりに",
      "explanation": "Hành động mô phỏng hoặc tuân thủ chính xác theo những gì nhìn thấy, nghe thấy hoặc kế hoạch đã định.",
      "examples": [
        {
          "jp": "レシピのとおりに料理を作ったら、美味しくできた。",
          "vn": "Làm đúng theo sách công thức thì món ăn ra rất ngon.",
          "furigana": "レシピ の とおり に りょうり を つくったら、おいしく できた。"
        },
        {
          "jp": "計画どおりに工事が進んでいます。",
          "vn": "Công trình đang tiến triển đúng theo như kế hoạch.",
          "furigana": "けいかく どおり に こうじ が すすんで います。"
        }
      ]
    },
    {
      "id": "n3_50",
      "level": "N3",
      "title": "〜一方だ",
      "meaning": "Càng ngày càng có chiều hướng... (một chiều)",
      "structure": "Động từ thể từ điển + 一方だ (いっぽうだ)",
      "explanation": "Diễn tả một sự biến đổi đang tiếp tục diễn ra không ngừng theo một chiều hướng (thường là xấu đi).",
      "examples": [
        {
          "jp": "物価は上がる一方だ。",
          "vn": "Giá cả hàng hóa thì càng ngày càng leo thang một chiều.",
          "furigana": "ぶっか は あがる いっぽう だ。"
        },
        {
          "jp": "祖父の病状は悪化する一方です。",
          "vn": "Bệnh tình của ông tôi cứ ngày một chuyển biến xấu đi.",
          "furigana": "そふ の びょうじょう は あっか する いっぽう です。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "n2_1",
      "level": "N2",
      "title": "〜際（に）／際は",
      "meaning": "Khi... / Vào dịp... (Trang trọng)",
      "structure": "Động từ thể từ điển / thể た / Danh từ + の + 際（に）",
      "explanation": "Cách nói trang trọng của とき, thường dùng trong thông báo, hướng dẫn công việc chính thức.",
      "examples": [
        {
          "jp": "お降りの際は、足元にご注意ください。",
          "vn": "Khi xuống xe, xin quý khách chú ý bước chân.",
          "furigana": "おおり の さい は、あしもと に ごちゅうい ください。"
        },
        {
          "jp": "日本を訪問した際に、首相と会談を行った。",
          "vn": "Vào dịp sang thăm Nhật Bản, tôi đã có buổi hội đàm với Thủ tướng.",
          "furigana": "にほん を ほうもん した さい に、しゅしょう と かいだん を おこなった。"
        }
      ]
    },
    {
      "id": "n2_2",
      "level": "N2",
      "title": "〜に際して／にあたって",
      "meaning": "Khi bắt đầu... / Nhân dịp sự kiện quan trọng...",
      "structure": "Động từ thể từ điển / Danh từ + に際して / にあたって",
      "explanation": "Dùng tại thời điểm bắt đầu một sự kiện mang tính trọng đại, bước ngoặt đời người hay dự án lớn.",
      "examples": [
        {
          "jp": "新年のご挨拶にあたり、一言申し上げます。",
          "vn": "Nhân dịp lời chúc mừng năm mới, tôi xin phép được phát biểu đôi lời.",
          "furigana": "しんねん の ごあいさつ に あたり、ひとこと もうしあげます。"
        },
        {
          "jp": "契約の締結に際して、重要な書類を確認した。",
          "vn": "Khi tiến hành ký kết hợp đồng, chúng tôi đã rà soát lại các tài liệu quan trọng.",
          "furigana": "けいやく の ていけつ に さいして、じゅうよう な しょるい を かくにん した。"
        }
      ]
    },
    {
      "id": "n2_3",
      "level": "N2",
      "title": "〜を契機に／をきっかけに",
      "meaning": "Nhân cơ hội... / Bắt nguồn từ bước ngoặt...",
      "structure": "Danh từ + を契機に（をけいきに） / をきっかけに",
      "explanation": "Chỉ sự kiện ngẫu nhiên hoặc biến cố làm bệ phóng khởi đầu cho một sự đổi thay lớn lao.",
      "examples": [
        {
          "jp": "留学をきっかけに、日本の文化に興味を持つようになった。",
          "vn": "Bắt nguồn từ chuyến du học, tôi bắt đầu hứng thú với văn hóa Nhật Bản.",
          "furigana": "りゅうがく を きっかけ に、にほん の ぶんか に きょうみ を もつ ように なった。"
        },
        {
          "jp": "病気を契機に、タバコをきっぱりやめた。",
          "vn": "Từ bước ngoặt cơn bạo bệnh, tôi đã bỏ hẳn thuốc lá.",
          "furigana": "びょうき を けいき に、タバコ を きっぱり やめた。"
        }
      ]
    },
    {
      "id": "n2_4",
      "level": "N2",
      "title": "〜折に",
      "meaning": "Vào dịp... / Khi có cơ hội...",
      "structure": "Động từ thể từ điển / thể た / Danh từ + の + 折に（おりに）",
      "explanation": "Từ ngữ trang trọng và tao nhã, nói về việc tận dụng một dịp thuận lợi để làm điều gì.",
      "examples": [
        {
          "jp": "近くにお越しの折には、ぜひお立ち寄りください。",
          "vn": "Khi có dịp ghé qua vùng này, xin mời bạn ghé chơi nhà tôi.",
          "furigana": "ちかく に おこし の おり に は、ぜひ おたちより ください。"
        },
        {
          "jp": "出張の折に、古い友人と再会した。",
          "vn": "Nhân dịp đi công tác, tôi đã có cuộc hội ngộ với người bạn cũ.",
          "furigana": "しゅっちょう の おり に、ふるい ゆうじん と さいかい した。"
        }
      ]
    },
    {
      "id": "n2_5",
      "level": "N2",
      "title": "〜上で",
      "meaning": "Sau khi... thì mới... / Về phương diện...",
      "structure": "Động từ thể た + 上で / Danh từ + の + 上で",
      "explanation": "Nhấn mạnh hành động trước là bước chuẩn bị tiền đề thiết yếu rồi mới tiến hành hành động sau.",
      "examples": [
        {
          "jp": "よく考えた上で、結論を出します。",
          "vn": "Sau khi cân nhắc kỹ lưỡng, tôi sẽ đưa ra kết luận.",
          "furigana": "よく かんがえた うえ で、けつろん を だします。"
        },
        {
          "jp": "仕事を進める上で、チームワークが欠かせない。",
          "vn": "Trên phương diện thúc đẩy công việc, tinh thần đồng đội là không thể thiếu.",
          "furigana": "しごと を すすめる うえ で、チームワーク が かかせない。"
        }
      ]
    },
    {
      "id": "n2_6",
      "level": "N2",
      "title": "〜次第",
      "meaning": "Ngay sau khi... là sẽ làm ngay",
      "structure": "Động từ thể ます (bỏ ます) + 次第（しだい）",
      "explanation": "Dùng trong công việc khi hành động trước vừa xong là ngay lập tức sẽ hành động tiếp theo.",
      "examples": [
        {
          "jp": "雨が止み次第、出発しましょう。",
          "vn": "Ngay khi cơn mưa vừa tạnh, chúng ta hãy xuất phát.",
          "furigana": "あめ が やみ しだい、しゅっぱつ しましょう。"
        },
        {
          "jp": "担当者が戻り次第、折り返しお電話いたします。",
          "vn": "Ngay khi người phụ trách quay về, chúng tôi sẽ gọi lại ngay cho quý khách.",
          "furigana": "たんとうしゃ が もどり しだい、おりかえし おでんわ いたします。"
        }
      ]
    },
    {
      "id": "n2_7",
      "level": "N2",
      "title": "〜次第だ／次第で",
      "meaning": "Tùy thuộc vào... / Do tình hình nên thành ra...",
      "structure": "Danh từ + 次第だ / 次第で / 次第では",
      "explanation": "Chỉ nguyên nhân lý do sâu xa dẫn tới tình trạng hiện tại, hoặc tính chất phụ thuộc vào yếu tố biến động.",
      "examples": [
        {
          "jp": "合否はあなたの努力次第です。",
          "vn": "Đỗ hay trượt hoàn toàn tùy thuộc vào sự nỗ lực của chính bạn.",
          "furigana": "ごうひ は あなた の どりょく しだい です。"
        },
        {
          "jp": "このような経緯でご報告申し上げた次第です。",
          "vn": "Chính vì diễn biến sự tình như vậy nên tôi mới xin báo cáo tường tận.",
          "furigana": "この ような けいい で ごほうこく もうしあげた しだい です。"
        }
      ]
    },
    {
      "id": "n2_8",
      "level": "N2",
      "title": "〜に先立って／に先立ち",
      "meaning": "Trước khi bắt đầu... (chuẩn bị việc hệ trọng)",
      "structure": "Danh từ / Động từ thể từ điển + に先立って（にさきだって）",
      "explanation": "Thực hiện một việc chuẩn bị, tiền trạm hoặc thủ tục trước khi tiến hành một sự kiện quan trọng.",
      "examples": [
        {
          "jp": "映画の公開に先立って、試写会が行われた。",
          "vn": "Trước khi bộ phim công chiếu, buổi chiếu thử đã được tổ chức.",
          "furigana": "えいが の こうかい に さきだって、ししゃかい が おこなわれた。"
        },
        {
          "jp": "新製品の発売に先立ち、記者会見を開きます。",
          "vn": "Trước thềm ra mắt sản phẩm mới, chúng tôi sẽ mở họp báo.",
          "furigana": "しんせいひん の はつばい に さきだち、きしゃかいけん を ひらきます。"
        }
      ]
    },
    {
      "id": "n2_9",
      "level": "N2",
      "title": "〜一方で",
      "meaning": "Một mặt thì... nhưng mặt khác lại...",
      "structure": "Thể thông thường (Naな/である, Nである) + 一方で（いっぽうで）",
      "explanation": "So sánh hai khía cạnh đối lập hoặc đồng thời tồn tại song song của cùng một sự vật hiện tượng.",
      "examples": [
        {
          "jp": "都会は便利な一方で、生活費が高い。",
          "vn": "Đô thị một mặt tiện nghi nhưng mặt khác chi phí sinh hoạt lại đắt đỏ.",
          "furigana": "とかい は べんり な いっぽう で、せいかつひ が たかい。"
        },
        {
          "jp": "子供が生まれて嬉しい一方で、重い責任も感じる。",
          "vn": "Con chào đời một mặt rất vui mừng nhưng mặt khác cũng thấy gánh nặng trách nhiệm.",
          "furigana": "こども が うまれて うれしい いっぽう で、おもい せきにん も かんじる。"
        }
      ]
    },
    {
      "id": "n2_10",
      "level": "N2",
      "title": "〜反面",
      "meaning": "Trái lại... / Mặt trái của vấn đề...",
      "structure": "Thể thông thường (Naな/である) + 反面（はんめん）",
      "explanation": "Nhấn mạnh sự tương phản giữa mặt tốt và mặt trái bất lợi vốn có của một sự việc.",
      "examples": [
        {
          "jp": "この薬は効果が高い反面、副作用も強い。",
          "vn": "Loại thuốc này hiệu quả rất cao nhưng mặt trái lại có tác dụng phụ mạnh.",
          "furigana": "この くすり は こうか が たかい はんめん、ふくさよう も つよい。"
        },
        {
          "jp": "一人暮らしは自由な反面、寂しさを感じることもある。",
          "vn": "Sống một mình thì tự do nhưng ngược lại cũng có lúc cảm thấy cô đơn.",
          "furigana": "ひとりぐらし は じゆう な はんめん、さびしさ を かんじる こと も ある。"
        }
      ]
    },
    {
      "id": "n2_11",
      "level": "N2",
      "title": "〜に反して",
      "meaning": "Trái ngược với... / Ngược hẳn với kỳ vọng",
      "structure": "Danh từ + に反して（にはんして） / に反する + Danh từ",
      "explanation": "Kết quả diễn ra hoàn toàn trái ngược với mong đợi, dự đoán, quy tắc hay ước nguyện.",
      "examples": [
        {
          "jp": "親の期待に反して、彼は大学へ行かなかった。",
          "vn": "Trái ngược với kỳ vọng của cha mẹ, anh ấy đã không học đại học.",
          "furigana": "おや の きたい に はんして、かれ は だいがく へ いかなかった。"
        },
        {
          "jp": "予想に反して、今年の冬は暖かかった。",
          "vn": "Ngược với dự đoán ban đầu, mùa đông năm nay lại ấm áp.",
          "furigana": "よそう に はんして、ことし の ふゆ は あたたかかった。"
        }
      ]
    },
    {
      "id": "n2_12",
      "level": "N2",
      "title": "〜に比べて",
      "meaning": "So với... (so sánh tương đối)",
      "structure": "Danh từ / Mệnh đề + のに比べて",
      "explanation": "Dùng để so sánh sự chênh lệch mức độ, tính chất giữa hai sự vật hoặc thời kỳ.",
      "examples": [
        {
          "jp": "去年に比べて、今年の夏は格段に暑い。",
          "vn": "So với năm ngoái, mùa hè năm nay nóng bức hơn hẳn.",
          "furigana": "きょねん に くらべて、ことし の なつ は かくだん に あつい。"
        },
        {
          "jp": "兄に比べて、弟のほうが几帳面な性格だ。",
          "vn": "So với anh trai thì người em trai có tính cách ngăn nắp tỉ mỉ hơn.",
          "furigana": "あに に くらべて、おとうと の ほう が きちょうめん な せいかく だ。"
        }
      ]
    },
    {
      "id": "n2_13",
      "level": "N2",
      "title": "〜ばかりか／ばかりでなく",
      "meaning": "Không chỉ... mà ngay cả... cũng...",
      "structure": "Thể thông thường (Naな/である, Nである) + ばかりか / ばかりでなく",
      "explanation": "Không dừng lại ở mức độ thông thường của vế trước, mà vế sau còn cộng thêm mức độ cao hơn nữa.",
      "examples": [
        {
          "jp": "彼は漢字ばかりか、平仮名さえ読めない。",
          "vn": "Anh ấy chẳng những không đọc được chữ Hán mà ngay cả Hiragana cũng chịu.",
          "furigana": "かれ は かんじ ばかりか、ひらがな さえ よめない。"
        },
        {
          "jp": "彼女は英語ばかりでなく、フランス語も流暢に話せる。",
          "vn": "Cô ấy không chỉ nói được tiếng Anh mà còn nói lưu loát cả tiếng Pháp.",
          "furigana": "かのじょ は えいご ばかりでなく、フランスご も りゅうちょう に はなせる。"
        }
      ]
    },
    {
      "id": "n2_14",
      "level": "N2",
      "title": "〜のみならず",
      "meaning": "Không chỉ riêng... mà còn cả... (Văn viết cao cấp)",
      "structure": "Thể thông thường (Naである, Nである) + のみならず",
      "explanation": "Biểu hiện văn viết trang trọng, chỉ sự việc không hạn định ở phạm vi hẹp mà lan tỏa sang phạm vi rộng.",
      "examples": [
        {
          "jp": "この問題は日本のみならず、世界全体に影響を及ぼしている。",
          "vn": "Vấn đề này không chỉ tác động tới Nhật Bản mà tới toàn bộ thế giới.",
          "furigana": "この もんだい は にほん のみならず、せかい ぜんたい に えいきょう を およぼして いる。"
        },
        {
          "jp": "若者のみならず、高齢者の間でもスマホが普及している。",
          "vn": "Không chỉ thanh niên mà ngay cả trong giới người cao tuổi smartphone cũng rất phổ biến.",
          "furigana": "わかもの のみならず、こうれいしゃ の あいだ でも スマホ が ふきゅう して いる。"
        }
      ]
    },
    {
      "id": "n2_15",
      "level": "N2",
      "title": "〜に限らず",
      "meaning": "Không chỉ riêng... mà cả...",
      "structure": "Danh từ + に限らず（にかぎらず）",
      "explanation": "Không phân biệt hay giới hạn ở một nhóm đối tượng, thời gian mà bao quát cả phạm vi lớn hơn.",
      "examples": [
        {
          "jp": "男性に限らず、女性も力仕事に従事している。",
          "vn": "Không chỉ nam giới mà cả nữ giới cũng tham gia công việc nặng nhọc.",
          "furigana": "だんせい に かぎらず、じょせい も ちからしごと に じゅうじ して いる。"
        },
        {
          "jp": "平日に限らず、週末もこのカフェは混雑している。",
          "vn": "Không chỉ ngày thường mà cả cuối tuần quán cà phê này cũng rất đông khách.",
          "furigana": "へいじつ に かぎらず、しゅうまつ も この カフェ は こんざつ して いる。"
        }
      ]
    },
    {
      "id": "n2_16",
      "level": "N2",
      "title": "〜をはじめとして",
      "meaning": "Tiêu biểu trước tiên là... / Đại diện là...",
      "structure": "Danh từ + をはじめとして / をはじめとする + Danh từ",
      "explanation": "Nêu ra một điển hình nổi bật nhất để làm đại diện cho cả một tập thể đông đảo.",
      "examples": [
        {
          "jp": "アジアをはじめとして、世界各地に支店を展開している。",
          "vn": "Tiêu biểu trước hết là châu Á, chúng tôi đang mở rộng chi nhánh ra khắp thế giới.",
          "furigana": "アジア を はじめとして、せかい かくち に してん を てんかい して いる。"
        },
        {
          "jp": "家族をはじめとして、多くの人々に支えられてきた。",
          "vn": "Đầu tiên là gia đình, tôi đã được bao bọc bởi rất nhiều người.",
          "furigana": "かぞく を はじめとして、おおく の ひとびと に ささえられて きた。"
        }
      ]
    },
    {
      "id": "n2_17",
      "level": "N2",
      "title": "〜上に",
      "meaning": "Thêm vào đó... / Không những... mà lại còn...",
      "structure": "Thể thông thường (Naな/である, Nの/である) + 上に（うえに）",
      "explanation": "Cộng dồn các yếu tố cùng chiều (cùng tốt hoặc cùng xấu) để tăng sức nặng diễn đạt.",
      "examples": [
        {
          "jp": "このアパートは家賃が安い上に、駅からも近い。",
          "vn": "Căn hộ này tiền thuê vừa rẻ, thêm vào đó lại còn gần nhà ga.",
          "furigana": "この アパート は やちん が やすい うえ に、えき から も ちかい。"
        },
        {
          "jp": "道に迷った上に、雨まで降ってきた。",
          "vn": "Đã bị lạc đường rồi lại thêm trời còn đổ mưa xuống nữa.",
          "furigana": "みち に まよった うえ に、あめ まで ふって きた。"
        }
      ]
    },
    {
      "id": "n2_18",
      "level": "N2",
      "title": "〜どころか",
      "meaning": "Chẳng những không... mà trái lại còn...",
      "structure": "Thể thông thường (Na/N) + どころか",
      "explanation": "Bác bỏ hoàn toàn mức độ ban đầu, thực tế tồi tệ hơn hoặc cách biệt rất xa so với tưởng tượng.",
      "examples": [
        {
          "jp": "貯金どころか、借金まで抱えている。",
          "vn": "Chẳng những không tiết kiệm được đồng nào, trái lại còn đang gánh nợ ngập đầu.",
          "furigana": "ちょきん どころか、しゃっきん まで かかえて いる。"
        },
        {
          "jp": "風邪は治るどころか、ますます悪化している。",
          "vn": "Bệnh cảm chẳng những không khỏi mà ngày càng trầm trọng hơn.",
          "furigana": "かぜ は なおる どころか、ますます あっか して いる。"
        }
      ]
    },
    {
      "id": "n2_19",
      "level": "N2",
      "title": "〜に限って",
      "meaning": "Đúng vào cái lúc... thì xui xẻo / Chỉ riêng ai đó thì không bao giờ...",
      "structure": "Danh từ + に限って（にかぎって）",
      "explanation": "Dùng cho sự trùng hợp trớ trêu xui xẻo, hoặc bày tỏ niềm tin tuyệt đối người đó không bao giờ làm điều sai.",
      "examples": [
        {
          "jp": "傘を持っていない日に限って、雨が降る。",
          "vn": "Cứ đúng vào cái ngày không mang ô thì trời lại đổ mưa rào.",
          "furigana": "かさ を もっていない ひ に かぎって、あめ が ふる。"
        },
        {
          "jp": "うちの息子に限って、そんな悪事をするはずがない。",
          "vn": "Riêng con trai tôi thì tuyệt đối không thể nào làm chuyện xấu xa đó.",
          "furigana": "うち の むすこ に かぎって、そんな あくじ を する はず が ない。"
        }
      ]
    },
    {
      "id": "n2_20",
      "level": "N2",
      "title": "〜に限り",
      "meaning": "Chỉ riêng đối tượng này là ngoại lệ (Đặc quyền)",
      "structure": "Danh từ + に限り（にかぎり）",
      "explanation": "Dùng trong thông báo chính thức, ưu đãi dành riêng cho một nhóm đối tượng đặc biệt.",
      "examples": [
        {
          "jp": "本日ご来店のお客様に限り、全品１０％割引いたします。",
          "vn": "Chỉ riêng quý khách đến cửa hàng hôm nay sẽ được giảm giá toàn bộ 10%.",
          "furigana": "ほんじつ ごらいてん の おきゃくさま に かぎり、ぜんぴん じゅっぱーせんと わりびき いたします。"
        },
        {
          "jp": "女性に限り、デザートを無料でサービスします。",
          "vn": "Dành riêng cho phái nữ, quán sẽ tặng tráng miệng miễn phí.",
          "furigana": "じょせい に かぎり、デザート を むりょう で サービス します。"
        }
      ]
    },
    {
      "id": "n2_21",
      "level": "N2",
      "title": "〜限りは",
      "meaning": "Chừng nào mà còn... thì...",
      "structure": "Động từ thể từ điển/thể ない / Danh từ + である + 限りは（かぎりは）",
      "explanation": "Trong suốt khoảng thời gian điều kiện tiên quyết vẫn còn duy trì thì hệ quả vẫn không đổi.",
      "examples": [
        {
          "jp": "生きている限りは、夢を諦めたくない。",
          "vn": "Chừng nào còn sống, tôi còn không muốn từ bỏ ước mơ của mình.",
          "furigana": "いきて いる かぎり は、ゆめ を あきらめたくない。"
        },
        {
          "jp": "学生である限りは、勉強を第一に考えるべきだ。",
          "vn": "Chừng nào còn là sinh viên thì nên coi việc học là ưu tiên số một.",
          "furigana": "がくせい で ある かぎり は、べんきょう を だいいち に かんがえる べき だ。"
        }
      ]
    },
    {
      "id": "n2_22",
      "level": "N2",
      "title": "〜限りでは",
      "meaning": "Theo như trong phạm vi (biết, nghe, tìm hiểu)...",
      "structure": "Động từ thể từ điển/thể た + 限りでは（かぎりでは）",
      "explanation": "Giới hạn phạm vi nhận thức, thông tin của bản thân khi đưa ra một phán đoán khách quan.",
      "examples": [
        {
          "jp": "私が調べた限りでは、そのデータに誤りはありませんでした。",
          "vn": "Theo như phạm vi tôi đã điều tra thì số liệu không có sai sót nào.",
          "furigana": "わたし が しらべた かぎり では、その データ に あやまり は ありません でした。"
        },
        {
          "jp": "私の知る限りでは、彼は非常に誠実な人物だ。",
          "vn": "Trong giới hạn hiểu biết của tôi thì anh ấy là người vô cùng trung thực.",
          "furigana": "わたし の しる かぎり では、かれ は ひじょう に せいじつ な じんぶつ だ。"
        }
      ]
    },
    {
      "id": "n2_23",
      "level": "N2",
      "title": "〜ない限り",
      "meaning": "Trừ phi... / Nếu không... thì không thể",
      "structure": "Động từ thể ない + 限り（かぎり）",
      "explanation": "Nếu điều kiện A không được hoàn thành thỏa đáng thì kết quả B tuyệt đối không thể xảy ra.",
      "examples": [
        {
          "jp": "本人が謝罪しない限り、許すことはできない。",
          "vn": "Trừ phi đích thân người đó xin lỗi, còn không thì tôi không thể tha thứ.",
          "furigana": "ほんにん が しゃざい しない かぎり、ゆるす こと は できない。"
        },
        {
          "jp": "雨が止まない限り、試合は再開されない。",
          "vn": "Nếu trời không dứt mưa thì trận đấu sẽ không được tiếp tục.",
          "furigana": "あめ が やまない かぎり、しあい は さいかい されない。"
        }
      ]
    },
    {
      "id": "n2_24",
      "level": "N2",
      "title": "〜に応えて",
      "meaning": "Hưởng ứng... / Đáp ứng nguyện vọng...",
      "structure": "Danh từ + に応えて（にこたえて） / に応える + Danh từ",
      "explanation": "Hành động nhằm đáp lại sự mong mỏi, yêu cầu hoặc niềm tin yêu của người khác.",
      "examples": [
        {
          "jp": "市民の強い要望に応えて、公園に防犯カメラを設置した。",
          "vn": "Đáp lại nguyện vọng tha thiết của người dân, công viên đã lắp camera an ninh.",
          "furigana": "しみん の つよい ようぼう に こたえて、こうえん に ぼうはん カメラ を せっち した。"
        },
        {
          "jp": "親の期待に応えられるよう、精一杯頑張ります。",
          "vn": "Tôi sẽ nỗ lực hết mình để có thể đáp ứng được kỳ vọng của cha mẹ.",
          "furigana": "おや の きたい に こたえられる よう、せいいっぱい がんばります。"
        }
      ]
    },
    {
      "id": "n2_25",
      "level": "N2",
      "title": "〜に応じて",
      "meaning": "Tùy theo... / Tương ứng với...",
      "structure": "Danh từ + に応じて（におうじて） / に応じた + Danh từ",
      "explanation": "Thay đổi cách làm hoặc mức độ sao cho cân xứng, hài hòa với lứa tuổi, thu nhập, hoàn cảnh.",
      "examples": [
        {
          "jp": "能力や経験に応じて、給料が決定されます。",
          "vn": "Mức lương sẽ được quyết định tương ứng với năng lực và kinh nghiệm.",
          "furigana": "のうりょく や けいけん に おうじて、きゅうりょう が けってい されます。"
        },
        {
          "jp": "季節に応じて、部屋のインテリアを変えるのが楽しみだ。",
          "vn": "Thay đổi nội thất căn phòng cho hợp theo từng mùa là niềm vui của tôi.",
          "furigana": "きせつ に おうじて、へや の インテリア を かえる の が たのしみ だ。"
        }
      ]
    },
    {
      "id": "n2_26",
      "level": "N2",
      "title": "〜に伴って",
      "meaning": "Cùng với sự biến đổi kéo theo...",
      "structure": "Động từ thể từ điển / Danh từ + に伴って（にともなって） / に伴い",
      "explanation": "Chỉ sự biến đổi đồng thời trên quy mô lớn, một sự việc thay đổi dẫn tới hệ quả kéo theo.",
      "examples": [
        {
          "jp": "人口の増加に伴って、住宅不足が深刻になっている。",
          "vn": "Cùng với sự gia tăng dân số, tình trạng khan hiếm nhà ở ngày càng trầm trọng.",
          "furigana": "じんこう の ぞうか に ともなって、じゅうたく ふそく が しんこく に なって いる。"
        },
        {
          "jp": "技術の進歩に伴い、生活様式も大きく変化した。",
          "vn": "Kéo theo sự tiến bộ của công nghệ, lối sống sinh hoạt cũng biến đổi sâu sắc.",
          "furigana": "ぎじゅつ の しんぽ に ともない、せいかつ ようしき も おおきく へんか した。"
        }
      ]
    },
    {
      "id": "n2_27",
      "level": "N2",
      "title": "〜に従って",
      "meaning": "Càng... càng... / Tuân theo quy định...",
      "structure": "Động từ thể từ điển / Danh từ + に従って（にしたがって） / に従い",
      "explanation": "Một quá trình biến đổi tỷ lệ thuận tự nhiên, hoặc hành động tuân thủ theo chỉ dẫn, mệnh lệnh.",
      "examples": [
        {
          "jp": "標高が高くなるに従って、気温が下がっていく。",
          "vn": "Càng lên cao thì nhiệt độ càng hạ thấp dần.",
          "furigana": "ひょうこう が たかく なる に したがって、きおん が さがって いく。"
        },
        {
          "jp": "係員の指示に従って、避難してください。",
          "vn": "Xin hãy tuân thủ theo sự chỉ đạo của nhân viên để sơ tán an toàn.",
          "furigana": "かかりいん の しじ に したがって、ひなん して ください。"
        }
      ]
    },
    {
      "id": "n2_28",
      "level": "N2",
      "title": "〜につれて",
      "meaning": "Cùng với sự biến đổi tỉ lệ thuận...",
      "structure": "Động từ thể từ điển / Danh từ + につれて",
      "explanation": "Diễn tả sự thay đổi diễn ra tự nhiên từng bước song hành cùng với một tiến trình khác.",
      "examples": [
        {
          "jp": "年を取るにつれて、物忘れが多くなった。",
          "vn": "Cùng với tuổi tác ngày một nhiều, chứng đãng trí cũng tăng lên.",
          "furigana": "とし を とる に つれて、ものわすれ が おおく なった。"
        },
        {
          "jp": "台風が近づくにつれて、風雨が激しくなってきた。",
          "vn": "Bão càng tới gần thì mưa gió càng trở nên dữ dội.",
          "furigana": "たいふう が ちかづく に つれて、ふうう が はげしく なって きた。"
        }
      ]
    },
    {
      "id": "n2_29",
      "level": "N2",
      "title": "〜に違いない",
      "meaning": "Chắc chắn là... (Suy đoán có cơ sở)",
      "structure": "Thể thông thường (Na/N) + に違いない（にちがいない）",
      "explanation": "Người nói có trực cảm hoặc bằng chứng rõ ràng để khẳng định chắc chắn 90-100%.",
      "examples": [
        {
          "jp": "明かりがついているから、彼は部屋にいるに違いない。",
          "vn": "Đèn đang sáng nên chắc chắn anh ấy đang ở trong phòng.",
          "furigana": "あかり が ついている から、かれ は へや に いる に ちがいない。"
        },
        {
          "jp": "あんなに練習したのだから、彼らが勝つに違いない。",
          "vn": "Đã luyện tập cật lực như thế thì chắc chắn họ sẽ giành thắng lợi.",
          "furigana": "あんな に れんしゅう した の だから、かれら が かつ に ちがいない。"
        }
      ]
    },
    {
      "id": "n2_30",
      "level": "N2",
      "title": "〜に相違ない",
      "meaning": "Tuyệt đối chắc chắn không sai (Văn phong trang trọng)",
      "structure": "Thể thông thường (Na/N) + に相違ない（にそういない）",
      "explanation": "Khẳng định đanh thép mang tính chứng cứ trong văn bản hành chính, pháp luật hoặc phát biểu hùng biện.",
      "examples": [
        {
          "jp": "現場に残された指紋から、犯人は彼に相違ない。",
          "vn": "Căn cứ dấu vân tay để lại hiện trường, thủ phạm chắc chắn là hắn không sai.",
          "furigana": "げんば に のこされた しもん から、はんにん は かれ に そういない。"
        },
        {
          "jp": "この発見が将来の医学に大きく貢献することは相違ない。",
          "vn": "Phát hiện này chắc chắn sẽ đóng góp to lớn cho nền y học tương lai.",
          "furigana": "この はっけん が しょうらい の いがく に おおきく こうけん する こと は そういない。"
        }
      ]
    },
    {
      "id": "n2_31",
      "level": "N2",
      "title": "〜っこない",
      "meaning": "Tuyệt đối không thể nào... (Khẩu ngữ phủ định mạnh)",
      "structure": "Động từ thể ます (bỏ ます) + っこない",
      "explanation": "Bác bỏ hoàn toàn khả năng có thể diễn ra sự việc theo quan điểm chủ quan của người nói.",
      "examples": [
        {
          "jp": "こんな難しい問題、小学生に解けっこないよ。",
          "vn": "Bài toán khó cỡ này thì học sinh tiểu học tuyệt đối không giải nổi đâu.",
          "furigana": "こんな むずかしい もんだい、しょうがくせい に とけっこない よ。"
        },
        {
          "jp": "一日でこの本を全部読めっこない。",
          "vn": "Chỉ trong một ngày thì đời nào đọc hết nổi cuốn sách dày cộp này.",
          "furigana": "いちにち で この ほん を ぜんぶ よめっこない。"
        }
      ]
    },
    {
      "id": "n2_32",
      "level": "N2",
      "title": "〜かねる",
      "meaning": "Khó lòng mà... / Không thể nào (Từ chối lịch sự)",
      "structure": "Động từ thể ます (bỏ ます) + かねる",
      "explanation": "Thấu hiểu cảm xúc của đối phương nhưng do quy tắc công vụ nên đành phải từ chối tế nhị.",
      "examples": [
        {
          "jp": "お客様のご要望には応じかねますので、ご了承ください。",
          "vn": "Chúng tôi khó lòng đáp ứng yêu cầu của quý khách, kính mong thứ lỗi.",
          "furigana": "おきゃくさま の ごようぼう に は おうじかねます ので、ごりょうしょう ください。"
        },
        {
          "jp": "その件につきましては、私の一存では決めかねます。",
          "vn": "Về việc đó thì một mình tôi khó lòng tự tiện quyết định được.",
          "furigana": "その けん に つきまして は、わたし の いちぞん では きめかねます。"
        }
      ]
    },
    {
      "id": "n2_33",
      "level": "N2",
      "title": "〜かねない",
      "meaning": "Có nguy cơ / Rất có thể sẽ dẫn tới họa...",
      "structure": "Động từ thể ます (bỏ ます) + かねない",
      "explanation": "Cảnh báo về một hậu quả xấu, tai nạn hoặc rủi ro nghiêm trọng có thể xảy ra nếu sơ suất.",
      "examples": [
        {
          "jp": "スピードを出しすぎると、大事故を起こしかねない。",
          "vn": "Nếu phóng quá tốc độ thì rất dễ gây ra tai nạn thảm khốc.",
          "furigana": "スピード を だしすぎる と、だいじこ を おこしかねない。"
        },
        {
          "jp": "そんな乱暴な発言をすると、誤解を招きかねません。",
          "vn": "Phát ngôn bừa bãi như vậy rất dễ dẫn tới sự hiểu lầm tai hại.",
          "furigana": "そんな らんぼう な はつげん を する と、ごかい を まねきかねません。"
        }
      ]
    },
    {
      "id": "n2_34",
      "level": "N2",
      "title": "〜おそれがある",
      "meaning": "E ngại rằng... / Có nguy cơ xảy ra sự cố",
      "structure": "Động từ thể từ điển/thể ない / Danh từ + の + おそれがある",
      "explanation": "Dùng trong các bản tin cảnh báo thời tiết, y tế, xã hội về nguy cơ bùng phát hiểm họa.",
      "examples": [
        {
          "jp": "大雨により河川が氾濫するおそれがあります。",
          "vn": "Do mưa to, có nguy cơ nước sông sẽ dâng cao tràn bờ.",
          "furigana": "おおあめ により かせん が はんらん する おそれ が あります。"
        },
        {
          "jp": "このままでは景気がさらに悪化するおそれがある。",
          "vn": "Cứ đà này thì e rằng tình hình kinh tế sẽ còn suy thoái nặng nề hơn.",
          "furigana": "この まま では けいき が さらに あっか する おそれ が ある。"
        }
      ]
    },
    {
      "id": "n2_35",
      "level": "N2",
      "title": "〜にすぎない",
      "meaning": "Chẳng qua chỉ là... không hơn không kém",
      "structure": "Thể thông thường (Naである/Nである) + にすぎない",
      "explanation": "Hạ thấp mức độ quan trọng, nhấn mạnh sự việc chỉ dừng lại ở phạm vi đơn giản.",
      "examples": [
        {
          "jp": "私は自分の仕事を果たしたにすぎません。",
          "vn": "Tôi chẳng qua chỉ làm tròn bổn phận công việc của mình mà thôi.",
          "furigana": "わたし は じぶん の しごと を はたした に すぎません。"
        },
        {
          "jp": "それは単なる噂にすぎないから、気にしないで。",
          "vn": "Đó chẳng qua chỉ là tin đồn nhảm thôi, đừng để tâm làm gì.",
          "furigana": "それ は たんなる うわさ に すぎない から、き に しないで。"
        }
      ]
    },
    {
      "id": "n2_36",
      "level": "N2",
      "title": "〜にほかならない",
      "meaning": "Chính là... chứ không gì khác",
      "structure": "Danh từ + にほかならない",
      "explanation": "Khẳng định dứt khoát rằng lý do duy nhất cốt lõi nhất chính là đối tượng đó.",
      "examples": [
        {
          "jp": "彼の成功は、日々の絶え間ない努力の結果にほかならない。",
          "vn": "Thành công của anh ấy chính là kết quả của sự nỗ lực không ngừng nghỉ.",
          "furigana": "かれ の せいこう は、ひび の たえまない どりょく の けっか に ほかならない。"
        },
        {
          "jp": "親が子供を叱るのは、愛情にほかならない。",
          "vn": "Cha mẹ trách mắng con cái thì không gì khác chính là vì tình yêu thương.",
          "furigana": "おや が こども を しかる の は、あいじょう に ほかならない。"
        }
      ]
    },
    {
      "id": "n2_37",
      "level": "N2",
      "title": "〜ざるを得ない",
      "meaning": "Đành phải... / Buộc lòng không thể không...",
      "structure": "Động từ thể ない (bỏ ない) + ざるを得ない (する -> せざるを得ない)",
      "explanation": "Dù trong lòng không hề muốn nhưng trước sức ép của tình thế đành phải miễn cưỡng thực hiện.",
      "examples": [
        {
          "jp": "これだけ証拠が揃っては、罪を認めざるを得ない。",
          "vn": "Bằng chứng đã rành rành thế này thì đành phải cúi đầu nhận tội.",
          "furigana": "これ だけ しょうこ が そろっては、つみ を みとめざるをえない。"
        },
        {
          "jp": "台風が直撃するため、旅行は延期せざるを得ない。",
          "vn": "Do bão đổ bộ trực tiếp nên chúng tôi đành lòng phải hoãn chuyến du lịch.",
          "furigana": "たいふう が ちょくげき する ため、りょこう は えんき せざるをえない。"
        }
      ]
    },
    {
      "id": "n2_38",
      "level": "N2",
      "title": "〜を余儀なくされる",
      "meaning": "Buộc phải... / Không còn cách nào khác (ngậm ngùi)",
      "structure": "Danh từ + を余儀なくされる（をよぎなくされる）",
      "explanation": "Do biến cố ngoại cảnh nghiêm trọng ập đến buộc phải hủy bỏ kế hoạch hoặc chịu thay đổi đau lòng.",
      "examples": [
        {
          "jp": "資金不足により、事業の中止を余儀なくされた。",
          "vn": "Do cạn kiệt nguồn vốn nên dự án buộc lòng phải chịu dừng lại.",
          "furigana": "しきん ふそく により、じぎょう の ちゅうし を よぎなく された。"
        },
        {
          "jp": "怪我のため、選手生活の引退を余儀なくされた。",
          "vn": "Bởi vì chấn thương, anh ấy buộc phải giã từ sự nghiệp thi đấu.",
          "furigana": "けが の ため、せんしゅ せいかつ の いんたい を よぎなく された。"
        }
      ]
    },
    {
      "id": "n2_39",
      "level": "N2",
      "title": "〜に決まっている",
      "meaning": "Nhất định là... / Rõ rành rành là như vậy",
      "structure": "Thể thông thường (Na/N) + に決まっている（にきまっている）",
      "explanation": "Phán đoán quả quyết mang đậm niềm tin cá nhân dựa trên cảm nhận trực quan rõ ràng.",
      "examples": [
        {
          "jp": "あんなに練習したのだから、合格するに決まっている。",
          "vn": "Đã ôn luyện cật lực đến thế thì nhất định là đỗ rồi.",
          "furigana": "あんな に れんしゅう した の だから、ごうかく する に きまって いる。"
        },
        {
          "jp": "そんな甘い話、嘘に決まっているよ。",
          "vn": "Chuyện ngon ăn dễ dàng như thế rõ ràng là đồ lừa đảo rồi.",
          "furigana": "そんな あまい はなし、うそ に きまって いる よ。"
        }
      ]
    },
    {
      "id": "n2_40",
      "level": "N2",
      "title": "〜わけにはいかない",
      "meaning": "Không thể làm được (Vì bổn phận lương tâm đạo đức)",
      "structure": "Động từ thể từ điển / thể ない + わけにはいかない",
      "explanation": "Dù thể lực làm được nhưng do phép tắc xã hội hoặc lương tâm không cho phép.",
      "examples": [
        {
          "jp": "親切にしてくれた人を裏切るわけにはいかない。",
          "vn": "Tôi không thể nào phản bội người đã từng đối đãi tử tế với mình.",
          "furigana": "しんせつ に してくれた ひと を うらぎる わけ に は いかない。"
        },
        {
          "jp": "大事な商談だから、遅刻するわけにはいかない。",
          "vn": "Đây là buổi đàm phán quan trọng nên tôi không thể đến muộn được.",
          "furigana": "だいじ な しょうだん だから、ちこく する わけ に は いかない。"
        }
      ]
    },
    {
      "id": "n2_41",
      "level": "N2",
      "title": "〜まい",
      "meaning": "Quyết không làm... / Có lẽ là không...",
      "structure": "Động từ nhóm 1: thể từ điển + まい / Nhóm 2, 3: bỏ ます + まい",
      "explanation": "Thể hiện ý chí kiên quyết không lặp lại sai lầm, hoặc suy đoán tiêu cực trang trọng.",
      "examples": [
        {
          "jp": "二度とあのような失敗は繰り返すまいと誓った。",
          "vn": "Tôi đã tự thề quyết không bao giờ lặp lại thất bại cay đắng đó nữa.",
          "furigana": "にど と あの ような しっぱい は くりかえすまい と ちかった。"
        },
        {
          "jp": "彼のような誠実な男が嘘をつくはずはあるまい。",
          "vn": "Một người đứng đắn như anh ấy thì có lẽ nào lại đi nói dối.",
          "furigana": "かれ の ような せいじつ な おとこ が うそ を つく はず は あるまい。"
        }
      ]
    },
    {
      "id": "n2_42",
      "level": "N2",
      "title": "〜ことだ",
      "meaning": "Nên... / Cần phải... (Lời khuyên chân thành)",
      "structure": "Động từ thể từ điển / thể ない + ことだ",
      "explanation": "Đưa ra lời khuyên nhủ trực tiếp, chân thành từ góc độ người từng trải.",
      "examples": [
        {
          "jp": "日本語が上手になりたければ、毎日話すことだ。",
          "vn": "Nếu muốn giỏi tiếng Nhật thì điều tốt nhất là nên luyện nói hàng ngày.",
          "furigana": "にほんご が じょうず に なりたければ、まいにち はなす こと だ。"
        },
        {
          "jp": "風邪を早く治したければ、暖かくして寝ることだ。",
          "vn": "Muốn mau khỏi cảm cúm thì nên giữ ấm rồi đi ngủ sớm.",
          "furigana": "かぜ を はやく なおしたければ、あたたかく して ねる こと だ。"
        }
      ]
    },
    {
      "id": "n2_43",
      "level": "N2",
      "title": "〜ものがある",
      "meaning": "Có cảm giác rất... / Quả thật chứa đựng sự...",
      "structure": "Thể thông thường (Naな) + ものがある",
      "explanation": "Bày tỏ sự xúc động sâu sắc trong tâm can khi chứng kiến một điều gì đáng khâm phục.",
      "examples": [
        {
          "jp": "彼の情熱的な歌声には、人の心を打つものがある。",
          "vn": "Giọng hát đầy nhiệt huyết của anh ấy có một sức hút chạm tới đáy tim người nghe.",
          "furigana": "かれ の じょうねつてき な うたごえ に は、ひと の こころ を うつ もの が ある。"
        },
        {
          "jp": "昔の友人が成功した姿を見るのは、感慨深いものがある。",
          "vn": "Nhìn cảnh bạn bè xưa thành đạt, quả thật trong lòng dấy lên bao nỗi xúc động.",
          "furigana": "むかし の ゆうじん が せいこう した すがた を みる の は、かんがいぶかい もの が ある。"
        }
      ]
    },
    {
      "id": "n2_44",
      "level": "N2",
      "title": "〜ことか",
      "meaning": "Biết bao nhiêu... / Khôn xiết! (Cảm thán)",
      "structure": "Từ để hỏi (どんなに, どれほど, 何度) + Thể thông thường + ことか",
      "explanation": "Nhấn mạnh mức độ cảm xúc dâng trào tột độ về nỗi nhớ, sự gian nan hay niềm hân hoan.",
      "examples": [
        {
          "jp": "合格の知らせを聞いて、どんなに嬉しかったことか。",
          "vn": "Nghe tin đỗ đạt, tôi đã vui sướng biết dường nào!",
          "furigana": "ごうかく の しらせ を きいて、どんな に うれしかった こと か。"
        },
        {
          "jp": "日本に来てから、何度国へ帰りたいと思ったことか。",
          "vn": "Kể từ khi sang Nhật Bản, đã biết bao nhiêu lần tôi muốn bỏ về nước.",
          "furigana": "にほん に きて から、なんど くに へ かえりたい と おもった こと か。"
        }
      ]
    },
    {
      "id": "n2_45",
      "level": "N2",
      "title": "〜に越したことはない",
      "meaning": "Không gì tốt bằng... / Tốt nhất là nên...",
      "structure": "Thể thông thường (Naである/Nである) + に越したことはない（にこしたことはない）",
      "explanation": "Nêu lên điều kiện lý tưởng nhất mà ai cũng đều mong muốn.",
      "examples": [
        {
          "jp": "用心するに越したことはありません。",
          "vn": "Cẩn tắc vô áy náy, thận trọng đề phòng thì không bao giờ là thừa.",
          "furigana": "ようじん する に こした こと は ありません。"
        },
        {
          "jp": "給料は高いに越したことはないが、やりがいも大切だ。",
          "vn": "Lương cao thì không gì bằng rồi, nhưng sự hứng thú trong công việc cũng rất cần.",
          "furigana": "きゅうりょう は たかい に こした こと は ない が、やりがい も たいせつ だ。"
        }
      ]
    },
    {
      "id": "n2_46",
      "level": "N2",
      "title": "〜抜く",
      "meaning": "Làm đến cùng / Kiên định vượt thử thách",
      "structure": "Động từ thể ます (bỏ ます) + 抜く（ぬく）",
      "explanation": "Hành động vượt qua mọi gian khổ, áp lực tột độ để đi trọn vẹn đến đích cuối.",
      "examples": [
        {
          "jp": "どんな困難があっても、初志を貫き抜く覚悟だ。",
          "vn": "Dù khó khăn thế nào, tôi cũng giác ngộ kiên định giữ vững chí hướng ban đầu tới cùng.",
          "furigana": "どんな こんなん が あっても、しょし を つらぬきぬく かくご だ。"
        },
        {
          "jp": "過酷な試練を耐え抜いた者だけが成功を掴める。",
          "vn": "Chỉ những ai kiên gan chịu đựng đến cùng qua thử thách khắc nghiệt mới chạm tay tới thành công.",
          "furigana": "かこく な しれん を たえぬいた もの だけ が せいこう を つかめる。"
        }
      ]
    },
    {
      "id": "n2_47",
      "level": "N2",
      "title": "〜甲斐がある／甲斐もなく",
      "meaning": "Bõ công / Thật uổng công vô ích",
      "structure": "Động từ thể た / Danh từ + の + 甲斐がある（かいがある） / 甲斐もなく",
      "explanation": "Nói về việc bỏ ra công sức, nỗ lực và nhận lại kết quả xứng đáng (hoặc uổng phí).",
      "examples": [
        {
          "jp": "一生懸命勉強した甲斐があって、無事に合格できた。",
          "vn": "Bõ công đèn sách miệt mài, tôi đã thuận lợi đỗ kỳ thi.",
          "furigana": "いっしょうけんめい べんきょう した かい が あって、ぶじ に ごうかく できた。"
        },
        {
          "jp": "必死の手当の甲斐もなく、愛犬は息を引き取った。",
          "vn": "Bao nỗ lực cứu chữa uổng công vô ích, chú cún cưng đã trút hơi thở cuối cùng.",
          "furigana": "ひっし の てあて の かい も なく、あいけん は いき を ひきとった。"
        }
      ]
    },
    {
      "id": "n2_48",
      "level": "N2",
      "title": "〜末に",
      "meaning": "Sau một hồi... rốt cuộc thì...",
      "structure": "Động từ thể た / Danh từ + の + 末に（すえに）",
      "explanation": "Trải qua một thời gian dài dằn vặt, thương lượng hoặc suy ngẫm, cuối cùng cũng đi đến kết quả.",
      "examples": [
        {
          "jp": "悩みに悩んだ末に、会社を設立することを決めた。",
          "vn": "Sau chuỗi ngày trăn trở khôn nguôi, tôi đã quyết định lập công ty riêng.",
          "furigana": "なやみ に なやんだ すえ に、かいしゃ を せつりつ する こと を きめた。"
        },
        {
          "jp": "激しい議論の末、新しい方針が採択された。",
          "vn": "Sau hồi tranh luận nảy lửa, định hướng mới cuối cùng đã được biểu quyết thông qua.",
          "furigana": "はげしい ぎろん の すえ、あたらしい ほうしん が さいたく された。"
        }
      ]
    },
    {
      "id": "n2_49",
      "level": "N2",
      "title": "〜あげく",
      "meaning": "Sau bao nhiêu phen... rốt cuộc chuốc lấy kết cục buồn",
      "structure": "Động từ thể た / Danh từ + の + あげく（に）",
      "explanation": "Trải qua nhiều vất vả, tranh cãi kéo dài nhưng cuối cùng lại dẫn tới một kết cục đáng tiếc.",
      "examples": [
        {
          "jp": "さんざん迷ったあげく、何も買わずに店を出た。",
          "vn": "Sau một hồi phân vân mãi, rốt cuộc tôi chẳng mua gì mà bước ra khỏi quán.",
          "furigana": "さんざん まよった あげく、なにも かわずに みせ を でた。"
        },
        {
          "jp": "口論のあげくに、二人は絶交してしまった。",
          "vn": "Sau một hồi cãi vã lớn tiếng, cả hai người đã cắt đứt quan hệ với nhau.",
          "furigana": "こうろん の あげく に、ふたり は ぜっこう して しまった。"
        }
      ]
    },
    {
      "id": "n2_50",
      "level": "N2",
      "title": "〜つつある",
      "meaning": "Đang dần dần... (tiến trình biến đổi)",
      "structure": "Động từ thể ます (bỏ ます) + つつある",
      "explanation": "Diễn tả một sự đổi thay lớn lao của xã hội, khí hậu hoặc tình trạng đang trong tiến trình chuyển biến.",
      "examples": [
        {
          "jp": "景気は少しずつ回復しつつある。",
          "vn": "Nền kinh tế đang từng bước dần dần phục hồi trở lại.",
          "furigana": "けいき は すこしずつ かいふく しつつある。"
        },
        {
          "jp": "地球温暖化の影響で、各地の氷河が解けつつある。",
          "vn": "Dưới tác động của sự nóng lên toàn cầu, các dòng sông băng đang dần tan chảy.",
          "furigana": "ちきゅう おんだんか の えいきょう で、かくち の ひょうが が とけつつある。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "n1_1",
      "level": "N1",
      "title": "〜であれ〜であれ",
      "meaning": "Dù là... hay là... (không phân biệt)",
      "structure": "Danh từ 1 + であれ + Danh từ 2 + であれ",
      "explanation": "Dù rơi vào trường hợp nào đi chăng nữa thì kết quả hay quy tắc vẫn áp dụng bình đẳng tuyệt đối.",
      "examples": [
        {
          "jp": "理由が何であれ、暴力を振るうことは許されない。",
          "vn": "Dù lý do có là gì đi nữa, hành vi bạo lực là không thể tha thứ.",
          "furigana": "りゆう が なん であれ、ぼうりょく を ふるう こと は ゆるされない。"
        },
        {
          "jp": "大人であれ子供であれ、ルールは守らなければならない。",
          "vn": "Dù là người lớn hay trẻ nhỏ thì đều phải tuân thủ luật lệ.",
          "furigana": "おとな であれ こども であれ、ルール は まもらなければ ならない。"
        }
      ]
    },
    {
      "id": "n1_2",
      "level": "N1",
      "title": "〜とあって",
      "meaning": "Chính vì hoàn cảnh đặc biệt đó nên...",
      "structure": "Thể thông thường (Na/N) + とあって",
      "explanation": "Bởi vì rơi vào một thời điểm, sự kiện đặc biệt hiếm có nên dẫn tới kết quả tất yếu tương ứng.",
      "examples": [
        {
          "jp": "人気アイドルのコンサートとあって、会場は満員だった。",
          "vn": "Chính vì là concert của thần tượng đình đám nên khán phòng chật kín không còn chỗ trống.",
          "furigana": "にんき アイドル の コンサート と あって、かいじょう は まんいん だった。"
        },
        {
          "jp": "連休初日とあって、高速道路は大渋滞している。",
          "vn": "Đúng ngày đầu tiên của kỳ nghỉ lễ nên đường cao tốc tắc nghẽn nghiêm trọng.",
          "furigana": "れんきゅう しょにち と あって、こうそくどうろ は だいじゅうたい して いる。"
        }
      ]
    },
    {
      "id": "n1_3",
      "level": "N1",
      "title": "〜とあれば",
      "meaning": "Nếu quả thực vì... thì sẵn lòng làm tất cả",
      "structure": "Thể thông thường (Na/N) + とあれば",
      "explanation": "Nếu rơi vào điều kiện hay yêu cầu cấp bách đó thì người nói sẵn sàng chấp nhận mọi gian khó để thực hiện.",
      "examples": [
        {
          "jp": "子供のためとあれば、どんな苦労もいとわない。",
          "vn": "Nếu là vì tương lai của con cái thì bất kể gian khổ nhường nào tôi cũng cam lòng.",
          "furigana": "こども の ため と あれば、どんな くろう も いとわない。"
        },
        {
          "jp": "大統領の頼みとあれば、断るわけにはいかない。",
          "vn": "Nếu quả là lời nhờ cậy của Tổng thống thì không thể nào chối từ.",
          "furigana": "だいとうりょう の たのみ と あれば、ことわる わけ に は いかない。"
        }
      ]
    },
    {
      "id": "n1_4",
      "level": "N1",
      "title": "〜ならでは／ならではの",
      "meaning": "Chỉ có ở... mới có được (Đặc quyền độc nhất)",
      "structure": "Danh từ + ならでは / ならではの + Danh từ",
      "explanation": "Đánh giá cao phẩm chất đặc thù độc nhất vô nhị mà chỉ riêng chủ thể đó mới sở hữu nổi.",
      "examples": [
        {
          "jp": "これは京都ならではの伝統的なお菓子です。",
          "vn": "Đây là món bánh truyền thống mà chỉ có ở Kyoto mới thưởng thức được.",
          "furigana": "これ は きょうと ならでは の でんとうてき な おかし です。"
        },
        {
          "jp": "一流のプロならではの素晴らしい技術に感動した。",
          "vn": "Tôi vô cùng xúc động trước kỹ nghệ tuyệt hảo chỉ có ở bậc thầy chuyên nghiệp đỉnh cao.",
          "furigana": "いちりゅう の プロ ならでは の すばらしい ぎじゅつ に かんどう した。"
        }
      ]
    },
    {
      "id": "n1_5",
      "level": "N1",
      "title": "〜たるもの",
      "meaning": "Đã ở cương vị... thì phải xứng đáng với tư cách",
      "structure": "Danh từ (chỉ thân phận, chức vị xã hội) + たるもの",
      "explanation": "Nhắc nhở người đang nắm giữ một cương vị cao quý (bác sĩ, lãnh đạo, thầy giáo) phải có phong thái và trách nhiệm tương xứng.",
      "examples": [
        {
          "jp": "医者たるもの、患者の命を最優先に考えるべきだ。",
          "vn": "Đã là một người thầy thuốc thì phải đặt sinh mạng bệnh nhân lên ưu tiên hàng đầu.",
          "furigana": "いしゃ たる もの、かんじゃ の いのち を さいゆうせん に かんがえる べき だ。"
        },
        {
          "jp": "国の指導者たる者は、私利私欲を捨てなければならない。",
          "vn": "Người ở cương vị lãnh đạo quốc gia thì phải biết gạt bỏ tư lợi cá nhân.",
          "furigana": "くに の しどうしゃ たる もの は、しりしよく を すてなければ ならない。"
        }
      ]
    },
    {
      "id": "n1_6",
      "level": "N1",
      "title": "〜に至る／に至るまで",
      "meaning": "Đạt đến mức độ... / Trải dài cho tới tận...",
      "structure": "Danh từ / Động từ thể từ điển + に至る（にいたる） / に至るまで",
      "explanation": "Chỉ một tiến trình phát triển đạt đến quy mô đỉnh điểm, hoặc liệt kê chi tiết tới tận từng chân tơ kẽ tóc.",
      "examples": [
        {
          "jp": "服装から髪型に至るまで、校則で厳しく定められている。",
          "vn": "Từ trang phục cho đến tận kiểu tóc đều bị nội quy nhà trường siết chặt nghiêm ngặt.",
          "furigana": "ふくそう から かみがた に いたる まで、こうそく で きびしく さだめられて いる。"
        },
        {
          "jp": "事態がここに至っては、警察に通報するしかない。",
          "vn": "Tình thế đã rơi vào bước đường cùng này rồi thì chỉ còn nước báo cảnh sát.",
          "furigana": "じたい が ここ に いたっては、けいさつ に つうほう する しか ない。"
        }
      ]
    },
    {
      "id": "n1_7",
      "level": "N1",
      "title": "〜極まる／極まりない",
      "meaning": "Vô cùng... / Tột cùng (Bất bình, nguy hiểm)",
      "structure": "Tính từ な (bỏ な) + 極まる（きわまる） / 極まりない（きわまりない）",
      "explanation": "Nhấn mạnh một trạng thái tiêu cực đã chạm tới giới hạn tột cùng (vô lễ, nguy hiểm, thô thiển).",
      "examples": [
        {
          "jp": "あのような不誠実な態度は、失礼極まりない。",
          "vn": "Thái độ vô trách nhiệm kiểu đó quả thật là thất lễ đến tột cùng.",
          "furigana": "あの ような ふせいじつ な たいど は、しつれい きわまりない。"
        },
        {
          "jp": "命綱なしで高所に登るとは、危険極まる行為だ。",
          "vn": "Trèo lên nơi cao chót vót mà không có dây an toàn là một hành vi nguy hiểm tột độ.",
          "furigana": "いのちづな なし で こうしょ に のぼる と は、きけん きわまる こうい だ。"
        }
      ]
    },
    {
      "id": "n1_8",
      "level": "N1",
      "title": "〜ごとき／ごとく",
      "meaning": "Như là... / Tựa như... (Văn viết cổ kính)",
      "structure": "Danh từ + の / Động từ thể từ điển/thể た + ごとき / ごとく",
      "explanation": "Cách so sánh ẩn dụ thi vị mang đậm phong vị cổ điển, tương đương với ような / ように.",
      "examples": [
        {
          "jp": "光陰矢のごとし。時間はあっという間に過ぎ去る。",
          "vn": "Thời gian thoăn thoắt tựa bóng câu qua cửa sổ, trôi qua trong chớp mắt.",
          "furigana": "こういん や の ごとし。じかん は あっというま に すぎさる。"
        },
        {
          "jp": "私のごとき未熟者に、そのような大役は務まりません。",
          "vn": "Một kẻ non nớt kém cỏi như tôi thì khó lòng gánh vác nổi trọng trách to lớn ấy.",
          "furigana": "わたし の ごとき みじゅくもの に、その ような たいやく は つとまりません。"
        }
      ]
    },
    {
      "id": "n1_9",
      "level": "N1",
      "title": "〜ずくめ",
      "meaning": "Toàn là... ngập tràn (Hạnh phúc hoặc toàn màu sắc)",
      "structure": "Danh từ + ずくめ",
      "explanation": "Chỉ sự việc ngập tràn toàn những điều cùng một màu sắc, tính chất (vui mừng hoặc bao trùm toàn đen).",
      "examples": [
        {
          "jp": "昇進して赤ちゃんも生まれ、今年はいいことずくめの一年だった。",
          "vn": "Vừa thăng chức lại vừa đón con chào đời, năm nay quả là một năm tràn ngập niềm vui.",
          "furigana": "しょうしん して あかちゃん も うまれ、ことし は いい こと ずくめ の いちねん だった。"
        },
        {
          "jp": "彼女は黒ずくめの服を着て現れた。",
          "vn": "Cô ấy xuất hiện trong một bộ trang phục đen tuyền từ đầu đến chân.",
          "furigana": "かのじょ は くろずくめ の ふく を きて あらわれた。"
        }
      ]
    },
    {
      "id": "n1_10",
      "level": "N1",
      "title": "〜まみれ",
      "meaning": "Bám dính đầy... (chất dơ bẩn, tiêu cực)",
      "structure": "Danh từ + まみれ",
      "explanation": "Khắp toàn bộ bề mặt cơ thể hoặc vật thể bị bao bọc nhơ nhớp bởi máu, bùn, bụi, mồ hôi hoặc nợ nần.",
      "examples": [
        {
          "jp": "子供たちが泥まみれになってサッカーをしている。",
          "vn": "Lũ trẻ đang đá bóng với người lấm lem đầy bùn đất.",
          "furigana": "こどもたち が どろまみれ に なって サッカー を して いる。"
        },
        {
          "jp": "会社が倒産し、彼は借金まみれの生活を送っている。",
          "vn": "Công ty phá sản, anh ấy đang phải sống trong chuỗi ngày nợ nần bủa vây ngập đầu.",
          "furigana": "かいしゃ が とうさん し、かれ は しゃっきんまみれ の せいかつ を おくって いる。"
        }
      ]
    },
    {
      "id": "n1_11",
      "level": "N1",
      "title": "〜きらいがある",
      "meaning": "Có khuynh hướng... (thói quen, tật xấu đáng lo ngại)",
      "structure": "Động từ thể từ điển/thể ない / Danh từ + の + きらいがある",
      "explanation": "Phê bình một tính cách tiêu cực hoặc khuynh hướng xấu lặp đi lặp lại ở một người hay tổ chức.",
      "examples": [
        {
          "jp": "彼は物事を一人で抱え込みすぎるきらいがある。",
          "vn": "Anh ấy có tật xấu là việc gì cũng hay ôm đồm một mình quá mức.",
          "furigana": "かれ は ものごと を ひとり で かかえこみすぎる きらい が ある。"
        },
        {
          "jp": "若者は何でもネットの情報を鵜呑みにするきらいがある。",
          "vn": "Giới trẻ hiện nay có chiều hướng hay tin sái cổ mọi thông tin trên mạng.",
          "furigana": "わかもの は なんでも ネット の じょうほう を うのみ に する きらい が ある。"
        }
      ]
    },
    {
      "id": "n1_12",
      "level": "N1",
      "title": "〜を皮切りに",
      "meaning": "Khởi đầu với... rồi liên tiếp lan rộng bùng nổ",
      "structure": "Danh từ + を皮切りに（をかわきりに） / を皮切りにして",
      "explanation": "Hành động mở màn đầu tiên châm ngòi cho một chuỗi các sự kiện cùng loại bùng nổ liên tiếp.",
      "examples": [
        {
          "jp": "東京公演を皮切りに、全国１０都市でツアーが開催される。",
          "vn": "Mở màn bằng đêm diễn ở Tokyo, chuyến lưu diễn sẽ lan rộng khắp 10 thành phố cả nước.",
          "furigana": "とうきょう こうえん を かわきり に、ぜんこく じゅっとし で ツアー が かいさい される。"
        },
        {
          "jp": "あの投手の好投を皮切りにして、チームの連勝が始まった。",
          "vn": "Bắt đầu từ màn ném bóng xuất sắc của cầu thủ đó, chuỗi trận toàn thắng của đội bắt đầu.",
          "furigana": "あの とうしゅ の こうとう を かわきり に して、チーム の れんしょう が はじまった。"
        }
      ]
    },
    {
      "id": "n1_13",
      "level": "N1",
      "title": "〜をもって",
      "meaning": "Bằng... / Lấy thời điểm... làm mốc kết thúc",
      "structure": "Danh từ + をもって",
      "explanation": "Dùng trong thông báo chính thức để ấn định thời khắc kết thúc, hoặc phương thức tiến hành trang trọng.",
      "examples": [
        {
          "jp": "本日をもって、当店は閉店させていただきます。",
          "vn": "Kể từ ngày hôm nay, cửa hàng chúng tôi xin phép được chính thức đóng cửa.",
          "furigana": "ほんじつ を もって、とうてん は へいてん させていただきます。"
        },
        {
          "jp": "持ち前の熱意をもって、困難を乗り越えた。",
          "vn": "Bằng chính nhiệt huyết vốn có, anh ấy đã vượt qua mọi khó khăn.",
          "furigana": "もちまえ の ねつい を もって、こんなん を のりこえた。"
        }
      ]
    },
    {
      "id": "n1_14",
      "level": "N1",
      "title": "〜を限りに",
      "meaning": "Kể từ thời điểm này trở đi sẽ chấm dứt hẳn...",
      "structure": "Danh từ (thời gian) + を限りに（おかぎりに）",
      "explanation": "Tuyên bố dứt khoát chấm dứt một thói quen hoặc hoạt động kéo dài bấy lâu nay.",
      "examples": [
        {
          "jp": "今日を限りに、タバコをやめることに決めた。",
          "vn": "Chấm dứt kể từ ngày hôm nay, tôi quyết định sẽ bỏ hẳn thuốc lá.",
          "furigana": "きょう を かぎり に、タバコ を やめる こと に きめた。"
        },
        {
          "jp": "今シーズンを限りに現役を引退することを表明した。",
          "vn": "Anh ấy đã tuyên bố sẽ chính thức giải nghệ sau mùa giải này.",
          "furigana": "こん シーズン を かぎり に げんえき を いんたい する こと を ひょうめい した。"
        }
      ]
    },
    {
      "id": "n1_15",
      "level": "N1",
      "title": "〜をおいて〜ない",
      "meaning": "Ngoài đối tượng này ra thì không một ai khác có thể...",
      "structure": "Danh từ + をおいて〜ない",
      "explanation": "Tán dương đối tượng đó là lựa chọn duy nhất hoàn hảo, không có bất kỳ ai sánh bằng.",
      "examples": [
        {
          "jp": "この難役を演じられる俳優は、彼をおいて他にはいない。",
          "vn": "Diễn viên có thể đảm nhận vai diễn gai góc này thì ngoài anh ấy ra chẳng còn ai khác.",
          "furigana": "この なんやく を えんじられる はいゆう は、かれ を おいて ほか に は いない。"
        },
        {
          "jp": "リーダーに適任な人物は、彼女をおいて考えられない。",
          "vn": "Người xứng đáng làm thủ lĩnh thì ngoài cô ấy ra tôi không thể nghĩ tới ai khác.",
          "furigana": "リーダー に てきにん な じんぶつ は、かのじょ を おいて かんがえられない。"
        }
      ]
    },
    {
      "id": "n1_16",
      "level": "N1",
      "title": "〜をよそに",
      "meaning": "Mặc kệ... / Bỏ ngoài tai sự lo lắng, phản đối",
      "structure": "Danh từ + をよそに",
      "explanation": "Bất chấp dư luận, sự can ngăn hoặc ánh nhìn lo âu của người xung quanh để khăng khăng hành động.",
      "examples": [
        {
          "jp": "親の心配をよそに、息子は夜遅くまで遊び歩いている。",
          "vn": "Bỏ ngoài tai sự lo lắng thắt lòng của cha mẹ, đứa con trai vẫn đi chơi đàn đúm thâu đêm.",
          "furigana": "おや の しんぱい を よそに、むすこ は よる おそく まで あそびあるいて いる。"
        },
        {
          "jp": "周囲の反対をよそに、二人は結婚を決行した。",
          "vn": "Mặc kệ sự phản đối quyết liệt của mọi người xung quanh, hai người vẫn tiến hành hôn lễ.",
          "furigana": "しゅうい の はんたい を よそに、ふたり は けっこん を けっこう した。"
        }
      ]
    },
    {
      "id": "n1_17",
      "level": "N1",
      "title": "〜をものともせずに",
      "meaning": "Bất chấp hiểm nguy, gian lao... (Khí phách hiên ngang)",
      "structure": "Danh từ + をものともせずに",
      "explanation": "Ca ngợi lòng dũng cảm kiên cường không chịu lùi bước trước bão táp, bệnh tật hay gian khổ.",
      "examples": [
        {
          "jp": "消防士たちは猛烈な炎をものともせずに、救助活動を続けた。",
          "vn": "Những người lính cứu hỏa bất chấp ngọn lửa bùng cháy dữ dội, vẫn kiên cường cứu người.",
          "furigana": "しょうぼうしたち は もうれつ な ほのお を ものともせずに、きゅうじょ かつどう を つづけた。"
        },
        {
          "jp": "彼は重い障害をものともせずに、世界記録を樹立した。",
          "vn": "Vượt qua khiếm khuyết nặng nề của thân thể, anh ấy đã xác lập kỷ lục thế giới.",
          "furigana": "かれ は おもい しょうがい を ものともせずに、せかい きろく を じゅりつ した。"
        }
      ]
    },
    {
      "id": "n1_18",
      "level": "N1",
      "title": "〜なくしては／なしには",
      "meaning": "Nếu không có... thì tuyệt đối không thể thành công",
      "structure": "Danh từ + なくしては / なしには + ...ない",
      "explanation": "Khẳng định yếu tố trước là điều kiện tiên quyết cốt tử, thiếu nó thì vế sau hoàn toàn bất khả thi.",
      "examples": [
        {
          "jp": "皆様のご協力なくしては、この成功はあり得ませんでした。",
          "vn": "Nếu không có sự chung tay của quý vị thì thành công này tuyệt đối không thể có được.",
          "furigana": "みなさま の ごきょうりょく なくして は、この せいこう は ありえません でした。"
        },
        {
          "jp": "不断の努力なしには、夢を実現することはできない。",
          "vn": "Nếu thiếu vắng sự nỗ lực không ngừng nghỉ thì không thể nào biến giấc mơ thành hiện thực.",
          "furigana": "ふだん の どりょく なし に は、ゆめ を じつげん する こと は できない。"
        }
      ]
    },
    {
      "id": "n1_19",
      "level": "N1",
      "title": "〜ばこそ",
      "meaning": "Chính vì... nên mới dám làm thế",
      "structure": "Động từ thể điều kiện (ば) + こそ / Danh từ + であればこそ",
      "explanation": "Nhấn mạnh lý do sâu xa cao đẹp ẩn giấu đằng sau hành động nhìn có vẻ khắt khe bên ngoài.",
      "examples": [
        {
          "jp": "愛していればこそ、あえて厳しく叱るのです。",
          "vn": "Chính vì yêu thương con nên tôi mới nghiêm khắc răn dạy như vậy.",
          "furigana": "あいして いれば こそ、あえて きびしく しかる の です。"
        },
        {
          "jp": "健康であればこそ、毎日仕事に打ち込むことができる。",
          "vn": "Chính vì có được sức khỏe dồi dào nên tôi mới có thể cống hiến hết mình cho công việc.",
          "furigana": "けんこう で あれば こそ、まいにち しごと に うちこむ こと が できる。"
        }
      ]
    },
    {
      "id": "n1_20",
      "level": "N1",
      "title": "〜あっての",
      "meaning": "Chính nhờ có sự tồn tại của... thì mới có...",
      "structure": "Danh từ 1 + あっての + Danh từ 2",
      "explanation": "Nhấn mạnh Danh từ 1 là nền tảng sống còn, nếu không có nó thì Danh từ 2 hoàn toàn vô nghĩa.",
      "examples": [
        {
          "jp": "お客様あっての我が社です。感謝の気持ちを忘れてはならない。",
          "vn": "Chính nhờ có khách hàng mà công ty chúng tôi mới tồn tại. Tuyệt đối không được quên ơn.",
          "furigana": "おきゃくさま あって の わがしゃ です。かんしゃ の きもち を わすれて は ならない。"
        },
        {
          "jp": "命あっての物種だ。無理をして体を壊してはいけない。",
          "vn": "Còn nước còn tát, có mạng sống thì mới có tương lai. Đừng cố quá mà tổn hại thân thể.",
          "furigana": "いのち あって の ものだね だ。むり を して からだ を こわして は いけない。"
        }
      ]
    },
    {
      "id": "n1_21",
      "level": "N1",
      "title": "〜からある／からする／からの",
      "meaning": "Lên tới hơn... / Đáng giá tới hơn... (Số lượng khủng)",
      "structure": "Số từ (khoảng cách, trọng lượng) + からある / (giá tiền) + からする / (số người) + からの",
      "explanation": "Nhấn mạnh con số hoặc quy mô khổng lồ vượt xa mức tưởng tượng thông thường.",
      "examples": [
        {
          "jp": "彼は重さ５０キロからある荷物を軽々と持ち上げた。",
          "vn": "Anh ấy nâng bổng hành lý nặng tới hơn 50kg một cách nhẹ tênh.",
          "furigana": "かれ は おもさ ごじゅっキロ から ある にもつ を かるがる と もちあげた。"
        },
        {
          "jp": "一着１００万円からする高級ドレスを身にまとっている。",
          "vn": "Cô ấy khoác lên mình bộ đầm cao cấp trị giá lên tới hơn 1 triệu yên.",
          "furigana": "いっちゃく ひゃくまんえん から する こうきゅう ドレス を み に まとって いる。"
        }
      ]
    },
    {
      "id": "n1_22",
      "level": "N1",
      "title": "〜だに",
      "meaning": "Thậm chí ngay cả trong suy nghĩ, tưởng tượng cũng...",
      "structure": "Động từ thể từ điển / Danh từ + だに",
      "explanation": "Chỉ nội việc nghĩ tới thôi đã thấy kinh hoàng, chưa nói gì đến việc trải nghiệm thực tế.",
      "examples": [
        {
          "jp": "あのような大惨事は、想像するだに恐ろしい。",
          "vn": "Thảm họa kinh hoàng tầm cỡ ấy, chỉ mới tưởng tượng thôi đã thấy rùng mình sợ hãi.",
          "furigana": "あの ような だいさんじ は、そうぞう する だに おそろしい。"
        },
        {
          "jp": "まさか自分が選ばれるとは、夢にだに思わなかった。",
          "vn": "Chẳng ngờ bản thân lại được lựa chọn, ngay cả trong mơ tôi cũng chưa từng dám nghĩ tới.",
          "furigana": "まさか じぶん が えらばれる と は、ゆめ に だに おもわなかった。"
        }
      ]
    },
    {
      "id": "n1_23",
      "level": "N1",
      "title": "〜すら",
      "meaning": "Đến cả... / Ngay cả... (Cách nói đanh thép của さえ)",
      "structure": "Danh từ + すら",
      "explanation": "Đưa ra ví dụ căn bản nhất mà còn không đạt được để nhấn mạnh sự bất khả thi toàn diện.",
      "examples": [
        {
          "jp": "あまりのショックに、声すら出なかった。",
          "vn": "Vì quá bàng hoàng sốc nặng, ngay cả tiếng khóc tôi cũng không thốt ra nổi.",
          "furigana": "あまり の ショック に、こえ すら でなかった。"
        },
        {
          "jp": "親友の名前すら忘れてしまうほど衰弱していた。",
          "vn": "Cơ thể suy nhược đến mức ngay cả tên người bạn thân nhất anh ấy cũng quên béng.",
          "furigana": "しんゆう の なまえ すら わすれて しまう ほど すいじゃく して いた。"
        }
      ]
    },
    {
      "id": "n1_24",
      "level": "N1",
      "title": "〜たりとも〜ない",
      "meaning": "Dù chỉ một... cũng tuyệt đối không...",
      "structure": "Số đếm 1 (1 giây, 1 giọt, 1 xu) + たりとも + ...ない",
      "explanation": "Nhấn mạnh tính tuyệt đối khắt khe, không được lãng phí hay sai sót dẫu chỉ một đơn vị nhỏ nhất.",
      "examples": [
        {
          "jp": "試験終了まで、一分たりとも無駄にしてはならない。",
          "vn": "Cho đến khi hết giờ thi, dù chỉ một phút cũng tuyệt đối không được lãng phí.",
          "furigana": "しけん しゅうりょう まで、いっぷん たりとも むだ に して は ならない。"
        },
        {
          "jp": "税金は一円たりとも無駄遣いすることは許されない。",
          "vn": "Tiền thuế của dân thì dẫu chỉ một yên cũng không được phép tiêu xài phung phí.",
          "furigana": "ぜいきん は いちえん たりとも むだづかい する こと は ゆるされない。"
        }
      ]
    },
    {
      "id": "n1_25",
      "level": "N1",
      "title": "〜と相まって",
      "meaning": "Cùng hòa quyện với... tạo nên hiệu quả nhân đôi",
      "structure": "Danh từ + と相まって（とあいまって）",
      "explanation": "Hai nhân tố tuyệt vời kết hợp tương trợ lẫn nhau tạo nên một kết quả phi thường và ấn tượng.",
      "examples": [
        {
          "jp": "美しい歌声が照明の効果と相まって、幻想的な世界を作り出した。",
          "vn": "Giọng hát du dương hòa quyện cùng hiệu ứng ánh sáng đã tạo nên một không gian huyền ảo.",
          "furigana": "うつくしい うたごえ が しょうめい の こうか と あいまって、げんそうてき な せかい を つくりだした。"
        },
        {
          "jp": "原料の良さが職人の技と相まって、極上の銘酒が完成した。",
          "vn": "Nguyên liệu hảo hạng quyện cùng tay nghề nghệ nhân đã tạo nên danh tửu tuyệt đỉnh.",
          "furigana": "げんりょう の よさ が しょくにん の わざ と あいまって、ごくじょう の めいしゅ が かんせい した。"
        }
      ]
    },
    {
      "id": "n1_26",
      "level": "N1",
      "title": "〜にかこつけて",
      "meaning": "Lấy cớ là... để làm chuyện khác",
      "structure": "Danh từ + にかこつけて",
      "explanation": "Mượn danh nghĩa một lý do nghe có vẻ hợp lý để che đậy mục đích vụ lợi ngầm bên trong.",
      "examples": [
        {
          "jp": "出張にかこつけて、温泉旅行を満喫してきた。",
          "vn": "Lấy cớ là đi công tác, anh ta đã thỏa thuê tận hưởng chuyến du lịch suối nước nóng.",
          "furigana": "しゅっちょう に かこつけて、おんせん りょこう を まんきつ して きた。"
        },
        {
          "jp": "病気にかこつけて、面倒な仕事をサボった。",
          "vn": "Lấy cớ ốm đau để trốn tránh đùn đẩy công việc phiền toái.",
          "furigana": "びょうき に かこつけて、めんどう な しごと を サボった。"
        }
      ]
    },
    {
      "id": "n1_27",
      "level": "N1",
      "title": "〜にかかわる",
      "meaning": "Ảnh hưởng nghiêm trọng tới... (danh dự, sinh mạng)",
      "structure": "Danh từ + にかかわる",
      "explanation": "Chỉ mối nguy hại đe dọa trực tiếp tới những giá trị cốt lõi thiêng liêng nhất.",
      "examples": [
        {
          "jp": "これは会社の信用にかかわる重大な問題だ。",
          "vn": "Đây là vấn đề trọng đại đe dọa trực tiếp tới uy tín sống còn của cả công ty.",
          "furigana": "これ は かいしゃ の しんよう に かかわる じゅうだい な もんだい だ。"
        },
        {
          "jp": "人の命にかかわるミスを決して犯してはならない。",
          "vn": "Tuyệt đối không bao giờ được phép phạm phải sai sót nguy hiểm tới tính mạng con người.",
          "furigana": "ひと の いのち に かかわる ミス を けっして おかして は ならない。"
        }
      ]
    },
    {
      "id": "n1_28",
      "level": "N1",
      "title": "〜にとどまらず",
      "meaning": "Không dừng lại ở... mà lan rộng toàn diện",
      "structure": "Danh từ / Động từ thể từ điển + にとどまらず",
      "explanation": "Sự việc không bị giới hạn trong phạm vi hẹp ban đầu mà bành trướng lan ra phạm vi lớn hơn nhiều.",
      "examples": [
        {
          "jp": "アニメの人気は日本国内にとどまらず、世界中に広がっている。",
          "vn": "Sức hút của anime không chỉ dừng lại trong nước Nhật mà đã lan rộng khắp toàn cầu.",
          "furigana": "アニメ の にんき は にほん こくない に とどまらず、せかいじゅう に ひろがって いる。"
        },
        {
          "jp": "被害は建物にとどまらず、人的被害にも及んだ。",
          "vn": "Thiệt hại không chỉ dừng lại ở nhà cửa vật chất mà còn lan sang cả thương vong về người.",
          "furigana": "ひがい は たてもの に とどまらず、じんてき ひがい に も およんだ。"
        }
      ]
    },
    {
      "id": "n1_29",
      "level": "N1",
      "title": "〜に耐える／に耐えない",
      "meaning": "Đáng để... / Không nỡ nghe nhìn (đau đớn, thô bỉ)",
      "structure": "Động từ thể từ điển / Danh từ + に耐える（にたえる） / に耐えない",
      "explanation": "Có đủ giá trị thẩm mỹ để thưởng thức, hoặc ngược lại quá kinh khủng đến mức không đành lòng nghe nhìn.",
      "examples": [
        {
          "jp": "この古典文学は、何度読んでも鑑賞に耐える名作だ。",
          "vn": "Tác phẩm văn học cổ điển này đọc bao nhiêu lần vẫn là kiệt tác bõ công thưởng thức.",
          "furigana": "この こてん ぶんがく は、なんど よんでも かんしょう に たえる めいさく だ。"
        },
        {
          "jp": "あまりの惨状に、目も当てられない、見るに耐えない光景だった。",
          "vn": "Cảnh tượng tan hoang quá thảm khốc, thực sự không nỡ nhìn nổi.",
          "furigana": "あまり の さんじょう に、め も あてられない、みる に たえない こうけい だった。"
        }
      ]
    },
    {
      "id": "n1_30",
      "level": "N1",
      "title": "〜に堪えない",
      "meaning": "Vô cùng... khôn xiết (cảm kích, ân hận)",
      "structure": "Danh từ (cảm xúc: 感謝, 遺憾) + に堪えない（にたえない）",
      "explanation": "Cảm xúc quá dâng trào mãnh liệt đến mức tâm can không thể kiềm nén nổi.",
      "examples": [
        {
          "jp": "長年のご支援に対し、感謝の念に堪えません。",
          "vn": "Trước sự ủng hộ suốt bao năm qua, trong lòng tôi trào dâng niềm cảm kích khôn xiết.",
          "furigana": "ながねん の ごしえん に たいし、かんしゃ の ねん に たえません。"
        },
        {
          "jp": "このような不祥事を起こし、痛恨の極み、遺憾の念に堪えない。",
          "vn": "Để xảy ra sự cố đáng tiếc nhường này, tôi vô cùng ân hận đau xót khôn nguôi.",
          "furigana": "この ような ふしょうじ を おこし、つうこん の きわみ、いかん の ねん に たえない。"
        }
      ]
    },
    {
      "id": "n1_31",
      "level": "N1",
      "title": "〜に足る",
      "meaning": "Đáng để... / Đủ tư cách để...",
      "structure": "Động từ thể từ điển / Danh từ + に足る（にたる）",
      "explanation": "Có đầy đủ phẩm chất, độ tin cậy để hoàn toàn xứng đáng nhận được sự tin tưởng hoặc khen ngợi.",
      "examples": [
        {
          "jp": "彼は信頼に足る誠実なビジネスパートナーだ。",
          "vn": "Anh ấy là đối tác làm ăn chân chính, hoàn toàn xứng đáng để đặt trọn niềm tin.",
          "furigana": "かれ は しんらい に たる せいじつ な ビジネス パートナー だ。"
        },
        {
          "jp": "取るに足らない小さなミスだから、気にするな。",
          "vn": "Lỗi nhỏ nhặt chẳng đáng bận tâm đâu, đừng băn khoăn làm gì.",
          "furigana": "とる に たらない ちいさな ミス だから、き に する な。"
        }
      ]
    },
    {
      "id": "n1_32",
      "level": "N1",
      "title": "〜に足らない",
      "meaning": "Không đáng để... / Chẳng bõ để bận tâm",
      "structure": "Động từ thể từ điển / Danh từ + に足らない（にたらない）",
      "explanation": "Giá trị quá nhỏ nhoi hoặc tầm thường đến mức không cần phải tốn công sức suy nghĩ hay nhắc tới.",
      "examples": [
        {
          "jp": "そんなくだらない噂話など、聞くに足らない。",
          "vn": "Mấy chuyện tin đồn nhảm nhí tầm phào đó chẳng đáng để lắng tai nghe.",
          "furigana": "そんな くだらない うわさばなし など、きく に たらない。"
        },
        {
          "jp": "恐れるに足らない相手だから、落ち着いて戦おう。",
          "vn": "Đối thủ không có gì đáng phải sợ hãi cả, hãy bình tĩnh thi đấu.",
          "furigana": "おそれる に たらない あいて だから、おちついて たたかおう。"
        }
      ]
    },
    {
      "id": "n1_33",
      "level": "N1",
      "title": "〜まじき",
      "meaning": "Tuyệt đối không được phép có (Đối với cương vị đó)",
      "structure": "Động từ thể từ điển (する -> すまじき) + まじき + Danh từ",
      "explanation": "Đứng trên lập trường danh dự nghề nghiệp hoặc đạo đức, một hành vi bôi nhọ thanh danh là điều cấm kỵ.",
      "examples": [
        {
          "jp": "生徒を傷つけるとは、教師にあるまじき言動だ。",
          "vn": "Làm tổn thương học trò là hành vi lời nói không thể nào chấp nhận nổi ở một người giáo viên.",
          "furigana": "せいと を きずつける と は、きょうし に あるまじき げんどう だ。"
        },
        {
          "jp": "賄賂を受け取るなど、公務員として許すまじき犯罪だ。",
          "vn": "Ăn hối lộ là một tội ác không thể dung thứ đối với người công chức nhà nước.",
          "furigana": "わいろ を うけとる など、こうむいん として ゆるすまじき はんざい だ。"
        }
      ]
    },
    {
      "id": "n1_34",
      "level": "N1",
      "title": "〜べからず／べからざる",
      "meaning": "Cấm tuyệt đối / Điều không thể...",
      "structure": "Động từ thể từ điển (する -> すべからず) + べからず",
      "explanation": "Văn phong mệnh lệnh cấm chỉ cổ điển uy nghiêm xuất hiện trên biển hiệu công cộng hoặc giáo huấn.",
      "examples": [
        {
          "jp": "芝生に入るべからず。",
          "vn": "Cấm giẫm chân lên thảm cỏ.",
          "furigana": "しばふ に はいる べからず。"
        },
        {
          "jp": "彼が残した功績は、決して欠くべからざるものだ。",
          "vn": "Chiến công mà ông để lại là thứ tuyệt đối không thể nào thiếu sót được.",
          "furigana": "かれ が のこした こうせき は、けっして かく べからざる もの だ。"
        }
      ]
    },
    {
      "id": "n1_35",
      "level": "N1",
      "title": "〜べく",
      "meaning": "Với ý chí quyết tâm để... nên đã hành động",
      "structure": "Động từ thể từ điển (する -> すべく) + べく",
      "explanation": "Văn phong trang trọng, biểu thị ý chí và mục tiêu cháy bỏng thôi thúc thực hiện hành động lớn.",
      "examples": [
        {
          "jp": "優勝を果たすべく、チーム全員で厳しい特訓を重ねてきた。",
          "vn": "Với quyết tâm giành ngôi vô địch, toàn đội đã cùng nhau trải qua đợt tập huấn khắc nghiệt.",
          "furigana": "ゆうしょう を はたす べく、チーム ぜんいん で きびしい とっくん を かさねて きた。"
        },
        {
          "jp": "真実を確かめるべく、現地へ向かった。",
          "vn": "Nhằm mục đích xác thực chân tướng sự thật, tôi đã đích thân lên đường tới hiện trường.",
          "furigana": "しんじつ を たしかめる べく、げんち へ むかった。"
        }
      ]
    },
    {
      "id": "n1_36",
      "level": "N1",
      "title": "〜べくもない",
      "meaning": "Tuyệt đối không thể nào hy vọng nổi",
      "structure": "Động từ thể từ điển (する -> すべく) + べくもない",
      "explanation": "Trước hiện thực quá phũ phàng, hoàn toàn không có mảy may cơ hội để mơ tưởng hay so bì.",
      "examples": [
        {
          "jp": "プロの選手に素人が敵うべくもない。",
          "vn": "Dân nghiệp dư thì tuyệt đối làm sao có cửa địch nổi vận động viên chuyên nghiệp.",
          "furigana": "プロ の せんしゅ に しろうと が かなう べく も ない。"
        },
        {
          "jp": "当時の状況を今となっては知るべくもない。",
          "vn": "Tình cảnh của thời điểm đó thì đến tận bây giờ hoàn toàn chẳng thể nào hay biết nổi.",
          "furigana": "とうじ の じょうきょう を いま と なっては しる べく も ない。"
        }
      ]
    },
    {
      "id": "n1_37",
      "level": "N1",
      "title": "〜んばかりに",
      "meaning": "Tựa như sắp sửa... đến nơi rồi",
      "structure": "Động từ thể ない (bỏ ない) + んばかりに (する -> せんばかりに)",
      "explanation": "Mô tả dáng vẻ, biểu cảm sinh động chân thực đến mức ngỡ như hành động sắp sửa phát tác ngay tức khắc.",
      "examples": [
        {
          "jp": "彼女は今にも泣き出さんばかりの顔をしていた。",
          "vn": "Khuôn mặt cô ấy méo mó tựa như sắp sửa bật khóc òa lên đến nơi.",
          "furigana": "かのじょ は いま に も なきださん ばかり の かお を して いた。"
        },
        {
          "jp": "飛び上がらんばかりに喜んだ。",
          "vn": "Tôi mừng rỡ tột độ tựa như muốn nhảy cẫng lên tận trần nhà.",
          "furigana": "とびあがらん ばかり に よろこんだ。"
        }
      ]
    },
    {
      "id": "n1_38",
      "level": "N1",
      "title": "〜んがために",
      "meaning": "Chính vì mục đích cao cả mà sẵn sàng dấn thân",
      "structure": "Động từ thể ない (bỏ ない) + んがために (する -> せんがために)",
      "explanation": "Mang sắc thái trang trọng, quyết tâm làm việc lớn dẫu có phải đánh đổi hay hy sinh.",
      "examples": [
        {
          "jp": "夢を実現せんがために、身を粉にして働いた。",
          "vn": "Chính là vì để hiện thực hóa ước mơ lớn lao, anh ấy đã làm việc không quản ngày đêm.",
          "furigana": "ゆめ を じつげん せん が ため に、み を こ に して はたらいた。"
        },
        {
          "jp": "真実を明らかにせんがため、調査団が結成された。",
          "vn": "Nhằm mục đích tối thượng là làm sáng tỏ chân tướng, một đoàn điều tra đã được thành lập.",
          "furigana": "しんじつ を あきらか に せん が ため、ちょうさだん が けっせい された。"
        }
      ]
    },
    {
      "id": "n1_39",
      "level": "N1",
      "title": "〜まいとする",
      "meaning": "Cố kìm nén không để lộ... ra ngoài",
      "structure": "Động từ nhóm 1: thể từ điển + まい / Nhóm 2, 3: bỏ ます + まい + とする",
      "explanation": "Nỗ lực gượng ép điều khiển cảm xúc bản thân để không bật khóc, không run rẩy trước mặt người khác.",
      "examples": [
        {
          "jp": "涙をこぼすまいと、必死に唇を噛みしめた。",
          "vn": "Cố nén giọt nước mắt không để rơi xuống, cô ấy đã cắn chặt bờ môi.",
          "furigana": "なみだ を こぼすまい と、ひっし に くちびる を かみしめた。"
        },
        {
          "jp": "動揺を悟られまいとして、平気な顔を作った。",
          "vn": "Cố che giấu không để ai nhận ra sự hoang mang, anh ấy giả bộ làm mặt tỉnh bơ.",
          "furigana": "どうよう を さとられまい と して、へいき な かお を つくった。"
        }
      ]
    },
    {
      "id": "n1_40",
      "level": "N1",
      "title": "〜を禁じ得ない",
      "meaning": "Không thể kiềm chế nổi dòng cảm xúc...",
      "structure": "Danh từ + を禁じ得ない（をきんじえない）",
      "explanation": "Cảm xúc căm phẫn, thương cảm, ngạc nhiên trỗi dậy quá đỗi mãnh liệt, không có cách nào ngăn lại được.",
      "examples": [
        {
          "jp": "犯人の身勝手な供述に、激しい怒りを禁じ得ない。",
          "vn": "Trước lời khai ích kỷ ngạo mạn của tên tội phạm, tôi không thể kìm nén nổi cơn thịnh nộ.",
          "furigana": "はんにん の みがって な きょうじゅつ に、はげしい いかり を きんじえない。"
        },
        {
          "jp": "被害者たちの悲惨な境遇に、深い同情を禁じ得ない。",
          "vn": "Trước cảnh ngộ xót xa của các nạn nhân, tôi không nén nổi niềm trắc ẩn sâu sắc.",
          "furigana": "ひがいしゃたち の ひさん な きょうぐう に、ふかい どうじょう を きんじえない。"
        }
      ]
    },
    {
      "id": "n1_41",
      "level": "N1",
      "title": "〜を余儀なくさせる",
      "meaning": "Đẩy vào tình thế buộc người khác phải...",
      "structure": "Danh từ + を余儀なくさせる（をよぎなくさせる）",
      "explanation": "Chủ ngữ thường là thiên tai, suy thoái kinh tế... đẩy con người vào nghịch cảnh ép buộc.",
      "examples": [
        {
          "jp": "突然の噴火が、住民たちに避難を余儀なくさせた。",
          "vn": "Vụ núi lửa phun trào bất ngờ đã buộc toàn bộ cư dân phải tức tốc sơ tán.",
          "furigana": "とつぜん の ふんか が、じゅうみんたち に ひなん を よぎなく させた。"
        },
        {
          "jp": "不況が多くの企業にリストラを余儀なくさせている。",
          "vn": "Tình trạng suy thoái đang buộc hàng loạt doanh nghiệp phải cắt giảm nhân sự đau đớn.",
          "furigana": "ふきょう が おおく の きぎょう に リストラ を よぎなく させて いる。"
        }
      ]
    },
    {
      "id": "n1_42",
      "level": "N1",
      "title": "〜といえども",
      "meaning": "Dẫu cho có là... đi chăng nữa thì cũng không ngoại lệ",
      "structure": "Danh từ / Thể thông thường + といえども",
      "explanation": "Dù là bậc vĩ nhân, cao thủ hay người thân tín thì các quy luật và đạo lý cuộc đời vẫn không thiên vị.",
      "examples": [
        {
          "jp": "親といえども、子供のプライバシーを侵害してはならない。",
          "vn": "Dẫu có là cha mẹ đi chăng nữa cũng không được phép xâm phạm quyền riêng tư của con cái.",
          "furigana": "おや と いえども、こども の プライバシー を しんがい して は ならない。"
        },
        {
          "jp": "百戦錬磨の達人といえども、油断すれば敗北する。",
          "vn": "Dù là bậc cao thủ trăm trận trăm thắng nhưng nếu chủ quan khinh địch ắt sẽ bại trận.",
          "furigana": "ひゃくせんれんま の たつじん と いえども、ゆだん すれば はいぼく する。"
        }
      ]
    },
    {
      "id": "n1_43",
      "level": "N1",
      "title": "〜なり〜なり",
      "meaning": "Hoặc là... hoặc là... (đưa ra các gợi ý lựa chọn)",
      "structure": "Danh từ / Động từ thể từ điển + なり ... なり",
      "explanation": "Gợi ý đưa ra một vài phương án khả thi để đối phương tự do chọn lấy một cách giải quyết.",
      "examples": [
        {
          "jp": "分からないことがあれば、電話するなりメールするなりしてください。",
          "vn": "Nếu có điều gì chưa rõ, anh hãy gọi điện thoại hoặc gửi email đều được.",
          "furigana": "わからない こと が あれば、でんわ する なり メール する なり して ください。"
        },
        {
          "jp": "お茶なりコーヒーなり、お好きなものをどうぞ。",
          "vn": "Hoặc là trà hoặc là cà phê, xin mời anh cứ dùng thứ mình thích.",
          "furigana": "おちゃ なり コーヒー なり、おすき な もの を どうぞ。"
        }
      ]
    },
    {
      "id": "n1_44",
      "level": "N1",
      "title": "〜つ〜つ",
      "meaning": "Lúc thì... lúc lại... (hai hành động song hành đảo ngược)",
      "structure": "Động từ thể ます (bỏ ます) + つ ... + つ",
      "explanation": "Miêu tả hai trạng thái hoặc hành động đối lập liên tục đan xen qua lại (đuổi - bắt, nâng - hạ, chìm - nổi).",
      "examples": [
        {
          "jp": "二人のランナーは抜きつ抜かれつの大接戦を繰り広げた。",
          "vn": "Hai vận động viên đã tạo nên màn rượt đuổi nghẹt thở, lúc thì vượt lên, lúc lại bị tụt lại.",
          "furigana": "ふたり の ランナー は ぬきつ ぬかれつ の だいせっせん を くりひろげた。"
        },
        {
          "jp": "押しつ押されつの満員電車で通勤する。",
          "vn": "Tôi đi làm trên chuyến tàu điện đông nghịt người, cảnh chen chúc xô đẩy nhau liên hồi.",
          "furigana": "おしつ おされつ の まんいんでんしゃ で つうきん する。"
        }
      ]
    },
    {
      "id": "n1_45",
      "level": "N1",
      "title": "〜ともなく／ともなしに",
      "meaning": "Bâng quơ, vô thức không chủ đích cụ thể",
      "structure": "Động từ thể từ điển + ともなく / ともなしに",
      "explanation": "Hành động diễn ra một cách tình cờ tự nhiên trong vô thức, không hề có mục đích hoạch định từ trước.",
      "examples": [
        {
          "jp": "見るともなく窓の外を眺めていたら、虹が見えた。",
          "vn": "Tôi bâng quơ nhìn ra ngoài cửa sổ thì tình cờ thấy cầu vồng xuất hiện.",
          "furigana": "みる と も なく まど の そと を ながめて いたら、にじ が みえた。"
        },
        {
          "jp": "聞くともなしに耳に入ってきた会話に驚いた。",
          "vn": "Vô tình nghe loáng thoáng câu chuyện người ta nói mà tôi giật cả mình.",
          "furigana": "きく と も なし に みみ に はいって きた かいわ に おどろいた。"
        }
      ]
    },
    {
      "id": "n1_46",
      "level": "N1",
      "title": "〜ならいざ知らず",
      "meaning": "Nếu là ai khác thì còn hiểu được, đằng này lại là...",
      "structure": "Danh từ / Mệnh đề + ならいざ知らず（ならいざしらず）",
      "explanation": "So sánh tương phản để chê trách một đối tượng đáng lẽ phải làm tốt hơn nhưng lại làm đáng thất vọng.",
      "examples": [
        {
          "jp": "子供ならいざ知らず、大人がそんなわがままを言ってはいけない。",
          "vn": "Nếu là trẻ con thì còn châm chước được, đằng này người lớn mà vòi vĩnh ích kỷ thế là không nên.",
          "furigana": "こども なら いざ しらず、おとな が そんな わがまま を いって は いけない。"
        },
        {
          "jp": "昔ならいざ知らず、現代ではそれは常識外れだ。",
          "vn": "Nếu là thời xưa thì không nói, chứ thời nay chuyện đó quả là phi lý lập dị.",
          "furigana": "むかし なら いざ しらず、げんだい では それ は じょうしきはずれ だ。"
        }
      ]
    },
    {
      "id": "n1_47",
      "level": "N1",
      "title": "〜からといって",
      "meaning": "Không phải cứ bảo là... thì muốn sao cũng được",
      "structure": "Thể thông thường + からといって",
      "explanation": "Phủ định nhận định phiến diện; không thể vin vào lý do đó để biện minh cho hành vi sai trái.",
      "examples": [
        {
          "jp": "お金持ちだからといって、幸せとは限らない。",
          "vn": "Không phải cứ giàu có thì nhất định sẽ hạnh phúc đâu.",
          "furigana": "おかねもち だからといって、しあわせ と は かぎらない。"
        },
        {
          "jp": "忙しいからといって、連絡を怠っていいわけがない。",
          "vn": "Dẫu có bận rộn đến đâu chăng nữa cũng không có lý nào được phép lơ là việc liên lạc.",
          "furigana": "いそがしい からといって、れんらく を おこたって いい わけ が ない。"
        }
      ]
    },
    {
      "id": "n1_48",
      "level": "N1",
      "title": "〜始末だ",
      "meaning": "Rốt cuộc lại trượt dài rơi vào kết cục thảm hại",
      "structure": "Động từ thể từ điển / thể た + 始末だ（しまつだ）",
      "explanation": "Sau một chuỗi những hành động sai lầm hoặc quản lý tồi tệ, cuối cùng đã chuốc lấy kết cục thảm hại.",
      "examples": [
        {
          "jp": "彼は浪費を重ねたあげく、借金取りに追われる始末だ。",
          "vn": "Sau chuỗi ngày tiêu xài hoang phí, rốt cuộc anh ta rơi vào cảnh bị chủ nợ rượt đuổi ráo riết.",
          "furigana": "かれ は ろうひ を かさねた あげく、しゃっきんとり に おわれる しまつ だ。"
        },
        {
          "jp": "夜遅くまでゲームばかりして、朝は起きられない始末だ。",
          "vn": "Suốt ngày cày game thâu đêm, rốt cuộc sáng ra lại không tài nào dậy nổi.",
          "furigana": "よる おそく まで ゲーム ばかり して、あさ は おきられない しまつ だ。"
        }
      ]
    },
    {
      "id": "n1_49",
      "level": "N1",
      "title": "〜が早いか",
      "meaning": "Vừa dứt hành động... là lập tức hành động khác ập tới như chớp",
      "structure": "Động từ thể từ điển / thể た + が早いか（がはやいか）",
      "explanation": "Khoảnh khắc hành động A vừa dứt điểm thì hành động B nối tiếp gần như đồng thời chớp nhoáng.",
      "examples": [
        {
          "jp": "終業のベルが鳴るが早いか、生徒たちは教室を飛び出していった。",
          "vn": "Chuông tan trường vừa dứt tiếng là lũ học sinh lập tức ùa ra khỏi lớp như bầy ong vỡ tổ.",
          "furigana": "しゅうぎょう の ベル が なる が はやい か、せいとたち は きょうしつ を とびだして いった。"
        },
        {
          "jp": "彼はベッドに入るが早いか、ぐっすり眠りについた。",
          "vn": "Vừa ngả lưng xuống giường là anh ấy đã chìm ngay vào giấc ngủ say sưa.",
          "furigana": "かれ は ベッド に はいる が はやい か、ぐっすり ねむり に ついた。"
        }
      ]
    },
    {
      "id": "n1_50",
      "level": "N1",
      "title": "〜そばから",
      "meaning": "Vừa mới làm xong vế trước thì vế sau lại tái diễn",
      "structure": "Động từ thể từ điển / thể た + そばから",
      "explanation": "Vừa mới tốn công sức hoàn thành xong thì sự việc lại bị đảo ngược hoặc lặp lại khiến uổng công.",
      "examples": [
        {
          "jp": "片付けるそばから、子供がおもちゃを散らかしてしまう。",
          "vn": "Vừa mới dọn dẹp xong thì đứa con lại bày bừa đồ chơi ra khắp nhà.",
          "furigana": "かたづける そば から、こども が おもちゃ を ちらかして しまう。"
        },
        {
          "jp": "覚えるそばから、新しい単語を忘れてしまう。",
          "vn": "Vừa mới học thuộc xong thì tôi lại quên béng mất từ mới.",
          "furigana": "おぼえる そば から、あたらしい たんご を わすれて しまう。"
        }
      ]
    }
  ]
};

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

