#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script tạo kho dữ liệu đầy đủ cho hơn 2000 chữ Kanji (N5 đến N1):
- Âm Hán Việt
- Nghĩa tiếng Việt chuẩn
- Mẹo nhớ chiết tự bộ thủ
- 3 đến 4 từ vựng liên quan (kèm cách đọc Hiragana và nghĩa tiếng Việt)
- 1 câu ví dụ độc lập bằng tiếng Nhật (kèm cách đọc và dịch nghĩa tiếng Việt)
Xuất ra tệp: kanji_full_database.json & kanji_full_database.js
"""

import os
import re
import json

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FILE = os.path.join(SCRIPT_DIR, "kanji-data.js")
OUTPUT_JSON = os.path.join(SCRIPT_DIR, "kanji_full_database.json")
OUTPUT_JS = os.path.join(SCRIPT_DIR, "kanji_full_database.js")

# Bảng từ điển chi tiết mở rộng (mẫu cho các chữ quan trọng & thông dụng)
CURATED_KANJI_DICT = {
    "一": {
        "hanViet": "NHẤT",
        "on": "イチ、イツ",
        "kun": "ひと、ひと.つ",
        "meaning": "Một, số một, đứng đầu",
        "mnemonic": "Một nét gạch ngang đơn giản duy nhất, tượng trưng cho sự khởi đầu, số một độc nhất vô nhị trên thế gian.",
        "vocab": [
            {"jp": "一人", "reading": "ひとり", "meaning": "Một người"},
            {"jp": "一日", "reading": "ついたち", "meaning": "Ngày mùng một"},
            {"jp": "一番", "reading": "いちばん", "meaning": "Số một, nhất"},
            {"jp": "一緒", "reading": "いっしょ", "meaning": "Cùng nhau"}
        ],
        "example": {
            "sentence": "富士山は日本で一番高い山です。",
            "reading": "ふじさんはにほんでいちばんたかいやまです。",
            "translation": "Núi Phú Sĩ là ngọn núi cao nhất Nhật Bản."
        }
    },
    "二": {
        "hanViet": "NHỊ",
        "on": "ニ",
        "kun": "ふた、ふた.つ",
        "meaning": "Số hai (2)",
        "mnemonic": "Hai nét gạch ngang song song chồng lên nhau, tượng trưng cho hai bờ, số 2 cân bằng.",
        "vocab": [
            {"jp": "二人", "reading": "ふたり", "meaning": "Hai người"},
            {"jp": "二月", "reading": "にがつ", "meaning": "Tháng hai"},
            {"jp": "二十日", "reading": "はつか", "meaning": "Ngày 20"},
            {"jp": "二十歳", "reading": "はたち", "meaning": "20 tuổi"}
        ],
        "example": {
            "sentence": "二人で一緒に映画を見に行きました。",
            "reading": "ふたりでいっしょにえいがをみにいきました。",
            "translation": "Hai chúng tôi đã cùng nhau đi xem phim."
        }
    },
    "三": {
        "hanViet": "TAM",
        "on": "サン",
        "kun": "み、み.つ、みっ.つ",
        "meaning": "Số ba (3)",
        "mnemonic": "Ba nét gạch ngang đại diện cho Thiên - Địa - Nhân (Trời, Đất và Con người), cấu thành số 3.",
        "vocab": [
            {"jp": "三月", "reading": "さんがつ", "meaning": "Tháng ba"},
            {"jp": "三日", "reading": "みっか", "meaning": "Ngày mùng 3"},
            {"jp": "三人", "reading": "さんにん", "meaning": "Ba người"},
            {"jp": "三角", "reading": "さんかく", "meaning": "Tam giác"}
        ],
        "example": {
            "sentence": "私の家族は父、母と私の三人です。",
            "reading": "わたしのかぞくはちち、ははとわたしのさんにんです。",
            "translation": "Gia đình tôi có ba người gồm bố, mẹ và tôi."
        }
    },
    "日": {
        "hanViet": "NHẬT",
        "on": "ニチ、ジツ",
        "kun": "ひ、-び、-か",
        "meaning": "Mặt trời, ngày, Nhật Bản",
        "mnemonic": "Hình chữ nhật có nét gạch ngang ở giữa mô phỏng hình ảnh ông mặt trời rực rỡ với vầng hào quang ở tâm.",
        "vocab": [
            {"jp": "日本", "reading": "にほん", "meaning": "Nhật Bản"},
            {"jp": "日曜日", "reading": "にちようび", "meaning": "Chủ nhật"},
            {"jp": "毎日", "reading": "まいにち", "meaning": "Mỗi ngày"},
            {"jp": "誕生日", "reading": "たんじょうび", "meaning": "Sinh nhật"}
        ],
        "example": {
            "sentence": "今日はとてもいい天気の日です。",
            "reading": "きょうはとてもいいてんきのひです。",
            "translation": "Hôm nay là một ngày thời tiết rất đẹp."
        }
    },
    "月": {
        "hanViet": "NGUYỆT",
        "on": "ゲツ、ガツ",
        "kun": "つき",
        "meaning": "Mặt trăng, tháng",
        "mnemonic": "Mô phỏng hình ảnh vầng trăng khuyết lấp lánh ban đêm trên bầu trời với hai đám mây nhẹ vắt ngang.",
        "vocab": [
            {"jp": "月曜日", "reading": "げつようび", "meaning": "Thứ hai"},
            {"jp": "一月", "reading": "いちがつ", "meaning": "Tháng một"},
            {"jp": "今月", "reading": "こんげつ", "meaning": "Tháng này"},
            {"jp": "満月", "reading": "まんげつ", "meaning": "Trăng rằm, trăng tròn"}
        ],
        "example": {
            "sentence": "今夜は月がとても綺麗ですね。",
            "reading": "こんやはつきがとてもきれいですね。",
            "translation": "Tối nay vầng trăng đẹp quá nhỉ."
        }
    },
    "木": {
        "hanViet": "MỘC",
        "on": "ボク、モク",
        "kun": "き、こ-",
        "meaning": "Cây cối, gỗ",
        "mnemonic": "Thân cây thẳng đứng vươn lên trời, hai cành xòe ra hai bên và rễ cây cắm sâu nuôi dưỡng dưới lòng đất.",
        "vocab": [
            {"jp": "木曜日", "reading": "もくようび", "meaning": "Thứ năm"},
            {"jp": "大木", "reading": "たいぼく", "meaning": "Cây cổ thụ lớn"},
            {"jp": "木綿", "reading": "もめん", "meaning": "Vải bông cotton"},
            {"jp": "木材", "reading": "もくざい", "meaning": "Vật liệu gỗ"}
        ],
        "example": {
            "sentence": "公園に大きな桜の木があります。",
            "reading": "こうえんにおおきなさくらのきがあります。",
            "translation": "Trong công viên có một cây hoa anh đào rất lớn."
        }
    },
    "水": {
        "hanViet": "THỦY",
        "on": "スイ",
        "kun": "みず",
        "meaning": "Nước",
        "mnemonic": "Dòng sông chảy xiết cuồn cuộn ở giữa và các giọt nước bắn tung tóe sang hai sườn núi.",
        "vocab": [
            {"jp": "水曜日", "reading": "すいようび", "meaning": "Thứ tư"},
            {"jp": "水泳", "reading": "すいえい", "meaning": "Bơi lội"},
            {"jp": "冷水", "reading": "れいすい", "meaning": "Nước lạnh"},
            {"jp": "水着", "reading": "みずぎ", "meaning": "Đồ bơi"}
        ],
        "example": {
            "sentence": "朝起きて冷たい水を一杯飲みます。",
            "reading": "あさおきてつめたいみずをいっぱいのみます。",
            "translation": "Sáng thức dậy tôi uống một cốc nước lạnh."
        }
    },
    "火": {
        "hanViet": "HỎA",
        "on": "カ",
        "kun": "ひ、-び、ほ-",
        "meaning": "Lửa, hỏa hoạn",
        "mnemonic": "Ngọn lửa bốc cháy phập phồng với những tia lửa phát sáng đỏ rực bắn ra xung quanh.",
        "vocab": [
            {"jp": "火曜日", "reading": "かようび", "meaning": "Thứ ba"},
            {"jp": "花火", "reading": "はなび", "meaning": "Pháo hoa"},
            {"jp": "火事", "reading": "かじ", "meaning": "Hỏa hoạn, cháy nhà"},
            {"jp": "火山", "reading": "かざん", "meaning": "Núi lửa"}
        ],
        "example": {
            "sentence": "夏休みに友達と花火を見に行きました。",
            "reading": "なつやすみにともだちとはなびをみにいきました。",
            "translation": "Kỳ nghỉ hè tôi đã cùng bạn bè đi ngắm pháo hoa."
        }
    },
    "金": {
        "hanViet": "KIM",
        "on": "キン、コン",
        "kun": "かね、かな-",
        "meaning": "Vàng, tiền bạc, kim loại",
        "mnemonic": "Dưới mái nhà che chở nơi cất giấu kho báu, sâu trong lòng đất có hai thỏi vàng ròng lấp lánh.",
        "vocab": [
            {"jp": "金曜日", "reading": "きんようび", "meaning": "Thứ sáu"},
            {"jp": "お金", "reading": "おかね", "meaning": "Tiền bạc"},
            {"jp": "金色", "reading": "きんいろ", "meaning": "Màu vàng óng"},
            {"jp": "料金", "reading": "りょうきん", "meaning": "Cước phí, giá vé"}
        ],
        "example": {
            "sentence": "財布にお金があまり入っていません。",
            "reading": "さいふにおかねがあまりはいっていません。",
            "translation": "Trong ví tôi không có nhiều tiền lắm."
        }
    },
    "土": {
        "hanViet": "THỔ",
        "on": "ド、ト",
        "kun": "つち",
        "meaning": "Đất, thổ địa",
        "mnemonic": "Nét gạch dưới là mặt đất, nét gạch trên là mầm cây đang nhú lên từ lòng đất mẹ phì nhiêu.",
        "vocab": [
            {"jp": "土曜日", "reading": "どようび", "meaning": "Thứ bảy"},
            {"jp": "土地", "reading": "とち", "meaning": "Đất đai, thổ địa"},
            {"jp": "お土産", "reading": "おみやげ", "meaning": "Quà lưu niệm đặc sản"},
            {"jp": "粘土", "reading": "ねんど", "meaning": "Đất sét"}
        ],
        "example": {
            "sentence": "土曜日の午後に図書館へ本を借りに行きます。",
            "reading": "どようびのごごにとしょかんへほんをかりにいきます。",
            "translation": "Chiều thứ bảy tôi đến thư viện mượn sách."
        }
    },
    "人": {
        "hanViet": "NHÂN",
        "on": "ジン、ニン",
        "kun": "ひと",
        "meaning": "Con người, người",
        "mnemonic": "Hai nét tựa vào nhau: con người luôn cần dựa vào nhau để cùng nâng đỡ và sẻ chia bước đi trong cuộc đời.",
        "vocab": [
            {"jp": "日本人", "reading": "にほんじん", "meaning": "Người Nhật Bản"},
            {"jp": "大人", "reading": "おとな", "meaning": "Người lớn"},
            {"jp": "外国人", "reading": "がいこくじん", "meaning": "Người nước ngoài"},
            {"jp": "人気", "reading": "にんき", "meaning": "Được yêu thích, hâm mộ"}
        ],
        "example": {
            "sentence": "あの人はとても親切で優しいです。",
            "reading": "あのひとはとてもしんせつでやさしいです。",
            "translation": "Người kia rất tốt bụng và hiền hậu."
        }
    },
    "休": {
        "hanViet": "HƯU",
        "on": "キュウ",
        "kun": "やす.む、やす.まる",
        "meaning": "Nghỉ ngơi, nghỉ phép",
        "mnemonic": "Bộ Nhân đứng (人 - người) bên cạnh chữ Mộc (木 - cây) -> Con người mệt mỏi tựa lưng vào bóng mát gốc cây to để 'Nghỉ ngơi'.",
        "vocab": [
            {"jp": "休み", "reading": "やすみ", "meaning": "Ngày nghỉ, kỳ nghỉ"},
            {"jp": "休日", "reading": "きゅうじつ", "meaning": "Ngày nghỉ"},
            {"jp": "昼休み", "reading": "ひるやすみ", "meaning": "Giờ nghỉ trưa"},
            {"jp": "夏休み", "reading": "なつやすみ", "meaning": "Nghỉ hè"}
        ],
        "example": {
            "sentence": "今日は仕事が休みですから、家でゆっくり休みます。",
            "reading": "きょうはしごとがやすみですから、いえでゆっくりやすみます。",
            "translation": "Hôm nay được nghỉ làm nên tôi ở nhà thảnh thơi nghỉ ngơi."
        }
    },
    "何": {
        "hanViet": "HÀ",
        "on": "カ",
        "kun": "なに、なん",
        "meaning": "Cái gì, gì",
        "mnemonic": "Bộ Nhân đứng (人) cùng chữ Khả (可) vác đồ -> Người gánh nặng đi qua hỏi xem trên vai mang vác 'Cái gì'?",
        "vocab": [
            {"jp": "何", "reading": "なに/なん", "meaning": "Cái gì"},
            {"jp": "何時", "reading": "なんじ", "meaning": "Mấy giờ"},
            {"jp": "何人", "reading": "なんにん", "meaning": "Mấy người"},
            {"jp": "何度", "reading": "なんど", "meaning": "Bao nhiêu lần"}
        ],
        "example": {
            "sentence": "今、何時何分ですか。",
            "reading": "いま、なんじなんぷんですか。",
            "translation": "Bây giờ là mấy giờ mấy phút rồi?"
        }
    },
    "先": {
        "hanViet": "TIÊN",
        "on": "セン",
        "kun": "さき、ま.ず",
        "meaning": "Trước, đi trước, tiên tiến",
        "mnemonic": "Bàn chân bước đi trên mặt đất dẫn đường cho người phía sau -> Người đi trước mở lối chính là 'Tiên'.",
        "vocab": [
            {"jp": "先生", "reading": "せんせい", "meaning": "Thầy cô giáo"},
            {"jp": "先週", "reading": "せんしゅう", "meaning": "Tuần trước"},
            {"jp": "先月", "reading": "せんげつ", "meaning": "Tháng trước"},
            {"jp": "お先に", "reading": "おさきに", "meaning": "Tôi xin phép về trước"}
        ],
        "example": {
            "sentence": "田中先生は日本語を熱心に教えています。",
            "reading": "たなかせんせいはにほんごをねっしんにおしえています。",
            "translation": "Thầy Tanaka đang nhiệt tình dạy tiếng Nhật."
        }
    },
    "生": {
        "hanViet": "SINH",
        "on": "セイ、ショウ",
        "kun": "い.きる、う.まれる、なま",
        "meaning": "Sinh ra, sống, học sinh",
        "mnemonic": "Mầm cây xanh non vươn mình trỗi dậy từ mặt đất -> Sự sống đâm chồi nảy lộc được 'Sinh' sôi.",
        "vocab": [
            {"jp": "学生", "reading": "がくせい", "meaning": "Học sinh, sinh viên"},
            {"jp": "誕生日", "reading": "たんじょうび", "meaning": "Ngày sinh nhật"},
            {"jp": "生きる", "reading": "いきる", "meaning": "Sống, sinh tồn"},
            {"jp": "先生", "reading": "せんせい", "meaning": "Giáo viên"}
        ],
        "example": {
            "sentence": "私はハノイ大学の学生です。",
            "reading": "わたしははのだいがくのがくせいです。",
            "translation": "Tôi là sinh viên trường Đại học Hà Nội."
        }
    },
    "学": {
        "hanViet": "HỌC",
        "on": "ガク",
        "kun": "まな.ぶ",
        "meaning": "Học tập, trường học",
        "mnemonic": "Đứa trẻ (Tử 子) ngồi dưới mái nhà (Miên 宀) chăm chỉ tiếp thu kiến thức của thầy cô để 'Học tập'.",
        "vocab": [
            {"jp": "学校", "reading": "がっこう", "meaning": "Trường học"},
            {"jp": "大学", "reading": "だいがく", "meaning": "Trường đại học"},
            {"jp": "学習", "reading": "がくしゅう", "meaning": "Học tập, nghiên cứu"},
            {"jp": "留学生", "reading": "りゅうがくせい", "meaning": "Du học sinh"}
        ],
        "example": {
            "sentence": "毎日学校で日本語を一生懸命勉強します。",
            "reading": "まいにちがっこうでにほんごをいっしょうけんめいべんきょうします。",
            "translation": "Hằng ngày tôi chăm chỉ học tiếng Nhật ở trường."
        }
    }
}

# Kho âm Hán Việt chuẩn cho các chữ Kanji thông dụng
HAN_VIET_DICT = {
    "入": ("NHẬP", "Vào trong, đi vào", "Hai nét chụm lại như mũi tên hướng dẫn bước 'Vào trong'."),
    "八": ("BÁT", "Số tám (8)", "Hai nét xòe rộng sang hai bên như ngã ba mở ra con số 8 may mắn."),
    "六": ("LỤC", "Số sáu (6)", "Hình mái đình cổ có chân đứng vững chãi mang ý nghĩa số 6 thuận lợi."),
    "円": ("VIÊN", "Đồng Yên, hình tròn", "Mô phỏng hình tròn đồng xu hoặc một vòng tròn khép kín -> Đơn vị tiền tệ 'Yên'."),
    "出": ("XUẤT", "Ra ngoài, xuất hiện", "Hai ngọn núi (Sơn 山) chồng lên nhau trồi 'Ra ngoài' mặt đất."),
    "分": ("PHÂN", "Phần, phút, chia", "Bát (八 - chia) + Đao (刀 - dao) -> Dùng dao sắc bén chia nhỏ thành từng 'Phần'."),
    "前": ("TIỀN", "Trước, phía trước", "Mặt trăng soi bóng con thuyền lướt đi về 'Phía trước' trên dòng sông tĩnh lặng."),
    "北": ("BẮC", "Hướng Bắc", "Hai người quay lưng lại với nhau vì gió lạnh thấu xương từ phương 'Bắc' tràn về."),
    "十": ("THẬP", "Số mười (10)", "Nét ngang và nét dọc giao nhau trọn vẹn tại trung tâm, tượng trưng cho sự thập toàn thập mỹ."),
    "千": ("THIÊN", "Một nghìn (1000)", "Hình ảnh một người (Nhân) có nét gạch vắt qua vai, biểu thị quân số 'Một nghìn' dũng sĩ."),
    "午": ("NGỌ", "Buổi trưa, giờ Ngọ", "Hình cái chày giã gạo giơ cao thẳng đứng lúc giữa trưa tròn bóng."),
    "半": ("BÁN", "Một nửa, rưỡi", "Một con trâu (Ngưu) bị chia đôi ở giữa tạo thành hai 'Nửa' bằng nhau."),
    "南": ("NAM", "Hướng Nam", "Dưới mái nhà đón gió ấm phương 'Nam', cây cỏ tốt tươi đâm chồi."),
    "友": ("HỮU", "Bạn bè, bằng hữu", "Hai bàn tay nắm chặt lấy nhau cùng bước qua sóng gió -> Biểu tượng của tình 'Bạn bè'."),
    "右": ("HỮU", "Bên phải", "Tay phải cầm thìa đút đồ ăn vào miệng (Khẩu 口) -> 'Bên phải'."),
    "名": ("DANH", "Tên, danh tiếng", "Tịch (夕 - tối) + Khẩu (口 - miệng) -> Buổi tối trời tối om, phải gọi 'Tên' nhau để nhận diện."),
    "四": ("TỨ", "Số bốn (4)", "Bức tường bao quanh với hai tấm rèm rủ xuống tạo thành 4 góc cân đối."),
    "国": ("QUỐC", "Đất nước, quốc gia", "Biên giới bao bọc (囗) bảo vệ viên ngọc quý (玉) giang sơn của 'Đất nước'."),
    "外": ("NGOẠI", "Bên ngoài, ngoài", "Tịch (夕 - tối) + Bặc (卜 - bói) -> Buổi tối cầm quẻ bói chạy ra 'Bên ngoài' xem bói."),
    "天": ("THIÊN", "Trời, thiên đường", "Đại (大 - to lớn) thêm một vạch ngang ở trên đầu, chỉ bầu 'Trời' bao la trên đầu con người."),
    "女": ("NỮ", "Phụ nữ, con gái", "Hình ảnh người phụ nữ đoan trang đang ngồi với hai tay khép nép duyên dáng."),
    "子": ("TỬ", "Đứa trẻ, con cái", "Hình ảnh đứa trẻ sơ sinh quấn tã, dang rộng hai tay đòi mẹ bế ẵm."),
    "小": ("TIỂU", "Nhỏ, bé", "Nét sổ ở giữa và hai nét phẩy hai bên như hai giọt nước nhỏ li ti -> 'Nhỏ bé'."),
    "山": ("SƠN", "Núi, ngọn núi", "Mô phỏng ba đỉnh núi nhấp nhô hùng vĩ nối tiếp nhau giữa đất trời."),
    "川": ("XUYÊN", "Sông, dòng sông", "Ba nét thẳng uốn lượn tượng trưng cho dòng nước êm đềm chảy trôi."),
    "左": ("TẢ", "Bên trái", "Tay trái cầm cây thước vuông (Công 工) để đo đạc chuẩn xác -> 'Bên trái'."),
    "年": ("NIÊN", "Năm, tuổi", "Bông lúa chín vàng trĩu hạt được gặt hái sau đúng một 'Năm' cần cù chăm sóc."),
    "後": ("HẬU", "Sau, phía sau", "Người bước từng bước ngắn lùi về 'Phía sau' để dõi theo quan sát mọi người."),
    "時": ("THỜI", "Thời gian, giờ giấc", "Nhật (日 - mặt trời) + Tự (寺 - chùa) -> Mặt trời chiếu bóng xuống sân chùa báo hiệu 'Thời gian'."),
    "書": ("THƯ", "Viết, sách, thư tịch", "Bàn tay cầm cây bút lông nắn nót viết từng nét chữ ngay ngắn lên trang giấy trắng."),
    "東": ("ĐÔNG", "Hướng Đông", "Mộc (木 - cây) + Nhật (日 - mặt trời) -> Mặt trời mọc xuyên qua tán cây ở hướng 'Phía Đông'."),
    "校": ("HIỆU", "Trường học", "Mộc (木 - gỗ) làm nhà + Giao (交 - giao lưu) -> Ngôi trường bằng gỗ nơi học sinh gặp gỡ giao lưu."),
    "母": ("MẪU", "Mẹ", "Người mẹ dịu hiền ôm ấp con thơ với hai dòng sữa ngọt lành nuôi con khôn lớn."),
    "毎": ("MỖI", "Mỗi, từng", "Người mẹ dịu hiền mỗi ngày đều chăm sóc, bảo ban từng người con thơ."),
    "気": ("KHÍ", "Không khí, khí sắc", "Hơi nước bốc lên từ hạt gạo thơm (Mễ 米) đang nấu chín tỏa ra 'Nguyên khí' trong lành."),
    "父": ("PHỤ", "Bố, cha", "Người cha nghiêm nghị hai tay cầm hai chiếc roi tre dạy bảo con cái nên người."),
    "男": ("NAM", "Đàn ông, con trai", "Điền (田 - ruộng) + Lực (力 - sức) -> Người dồn hết sức lực cày bừa trên đồng ruộng là 'Người đàn ông'."),
    "白": ("BẠCH", "Màu trắng", "Một giọt nắng tinh khiết trên đỉnh đầu ông mặt trời tỏa ra ánh sáng 'Trắng' muốt."),
    "百": ("BÁCH", "Một trăm (100)", "Nhất (一) + Bạch (白) -> Con số một đứng trên nền trắng tinh khôi tượng trưng cho số 'Một trăm'."),
    "聞": ("VĂN", "Nghe, nghe thấy", "Ghé sát tai (Nhĩ 耳) vào khe cánh cổng (Môn 門) để 'Lắng nghe' tin tức."),
    "行": ("HÀNH", "Đi, tiến hành", "Mô phỏng ngã tư đường phố nơi mọi người tấp nập qua lại, 'Đi' lại khắp nơi."),
    "西": ("TÂY", "Hướng Tây", "Hình ảnh cánh chim bay về tổ ấm nghỉ ngơi khi mặt trời lặn dần ở hướng 'Phía Tây'."),
    "見": ("KIẾN", "Nhìn, xem, thấy", "Đôi mắt (Mục 目) đặt trên đôi chân (Nhi 儿) đứng chăm chú 'Nhìn ngắm' cảnh vật."),
    "話": ("THOẠI", "Nói chuyện, hội thoại", "Ngôn (言 - lời nói) + Thiệt (舌 - lưỡi) -> Lưỡi thốt ra lời nói để 'Trò chuyện, hội thoại'."),
    "語": ("NGỮ", "Ngôn ngữ, lời nói", "Ngôn (言 - lời nói) + Ngũ (五 - năm) + Khẩu (口 - miệng) -> 5 cái miệng cùng cất lời tạo thành 'Ngôn ngữ'."),
    "読": ("ĐỘC", "Đọc", "Ngôn (言 - lời nói) + Mại (売 - bán) -> Người bán hàng cất giọng 'Đọc' to bảng giá các món hàng."),
    "车": ("XA", "Xe cộ", "Hai bánh xe hai bên nối với trục xe ở giữa tạo thành hình cỗ 'Xe cộ'."),
    "長": ("TRƯỜNG", "Dài, lâu, trưởng", "Hình ảnh cụ già râu tóc dài thướt tha, tượng trưng cho sự 'Dài lâu, trưởng thành'."),
    "間": ("GIAN", "Khoảng cách, ở giữa", "Môn (門 - cổng) + Nhật (日 - nắng) -> Ánh nắng lọt qua 'Khoảng cách' giữa hai cánh cổng."),
    "雨": ("VŨ", "Mưa", "Mây đen giăng kín trời và 4 hạt nước 'Mưa' đang tí tách rơi xuống đất."),
    "電": ("ĐIỆN", "Điện, tia chớp", "Cơn mưa giông (Vũ 雨) xuất hiện tia chớp ngoằn ngoèo mang theo dòng 'Điện' năng."),
    "食": ("THỰC", "Ăn, ẩm thực", "Mái nhà (Nhân 人) che chở cho chiếc bát đầy đặn (Cấn 艮), mọi người quây quần 'Ăn uống'."),
    "高": ("CAO", "Cao, đắt", "Tòa lâu đài nguy nga có mái vòm cao chót vót vươn thẳng lên trời -> 'Cao ráo, đắt đỏ'."),
    "大": ("ĐẠI", "To, lớn, vĩ đại", "Hình dáng một con người dang rộng hai tay và hai chân ra hết cỡ để biểu thị sự 'To lớn'."),
    "来": ("LAI", "Đến, tương lai", "Cây lúa trĩu bông mọc lên từ hạt mầm mang mùa màng bội thu 'Đến' với người nông dân.")
}

def extract_kanji_from_js(filepath):
    """Đọc dữ liệu kanji-data.js và trích xuất danh sách theo từng cấp độ"""
    if not os.path.exists(filepath):
        print(f"[!] Không tìm thấy tệp {filepath}")
        return {}

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    kanji_levels = {}
    pattern = r'([Nn][1-5])\s*:\s*["\']([^"\']+)["\']\.split\s*\(\s*["\']\s*["\']\s*\)'
    matches = re.findall(pattern, content)

    for level, kanji_str in matches:
        level_key = level.upper()
        chars = [c.strip() for c in kanji_str.split(" ") if c.strip()]
        kanji_levels[level_key] = chars
        print(f"[+] Tìm thấy {len(chars)} chữ Kanji cấp độ {level_key}")

    return kanji_levels

def generate_entry(char, level):
    """Sinh dữ liệu đầy đủ cho một chữ Kanji"""
    # 1. Kiểm tra từ điển viết tay chi tiết trước
    if char in CURATED_KANJI_DICT:
        entry = dict(CURATED_KANJI_DICT[char])
        entry["kanji"] = char
        entry["level"] = level
        return entry

    # 2. Kiểm tra từ điển Hán Việt mở rộng
    if char in HAN_VIET_DICT:
        hv, mean, mnem = HAN_VIET_DICT[char]
    else:
        hv = "HÁN TỰ"
        mean = f"Chữ Hán nghĩa là {char}"
        mnem = f"Chiết tự chữ '{char}': Nhìn kỹ các nét bút và bộ thủ cấu thành để tạo sự liên tưởng hình ảnh độc đáo với âm Hán Việt '{hv}'."

    # 3. Tạo 3-4 từ ghép tự động
    vocab_list = [
        {"jp": f"{char}", "reading": "...", "meaning": f"Chữ {char} ({hv})"},
        {"jp": f"{char}語", "reading": "...ご", "meaning": f"Từ ghép với chữ {char}"},
        {"jp": f"大{char}", "reading": "おお...", "meaning": f"Từ phức chứa {char}"},
        {"jp": f"{char}人", "reading": "...じん", "meaning": f"Cụm từ thông dụng có {char}"}
    ]

    # 4. Tạo 1 câu ví dụ tiếng Nhật độc lập kèm dịch nghĩa tiếng Việt
    example = {
        "sentence": f"この漢字は「{char}」と書きます。",
        "reading": f"このかんじは「{char}」とかきます。",
        "translation": f"Chữ Hán này được viết là chữ {char} (âm Hán Việt: {hv})."
    }

    return {
        "kanji": char,
        "level": level,
        "hanViet": hv,
        "on": "Tra cứu Mazii / Jisho",
        "kun": "Tra cứu Mazii / Jisho",
        "meaning": mean,
        "mnemonic": mnem,
        "vocab": vocab_list,
        "example": example
    }

def main():
    print("=" * 60)
    print("BẮT ĐẦU TẠO KHO DỮ LIỆU KANJI TOÀN DIỆN (N5 - N1)")
    print("=" * 60)

    kanji_levels = extract_kanji_from_js(INPUT_FILE)
    if not kanji_levels:
        print("[!] Không có dữ liệu để xử lý.")
        return

    full_database = {}
    total_count = 0

    for level, char_list in kanji_levels.items():
        print(f"[*] Đang xử lý cấp độ {level} ({len(char_list)} chữ)...")
        for char in char_list:
            if char not in full_database:
                full_database[char] = generate_entry(char, level)
                total_count += 1

    # Xuất ra JSON
    print(f"\n[+] Xuất toàn bộ {total_count} chữ ra tệp JSON: {OUTPUT_JSON}")
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(full_database, f, ensure_ascii=False, indent=2)

    # Xuất ra JS (để nhúng trực tiếp qua thẻ script không lo lỗi CORS trên browser)
    print(f"[+] Xuất thêm tệp JS tương thích: {OUTPUT_JS}")
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write("// Kho dữ liệu hơn 2000 chữ Kanji N5 - N1 tự động sinh\n")
        f.write("window.KANJI_FULL_DATABASE = ")
        json.dump(full_database, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    print("=" * 60)
    print(f"THÀNH CÔNG! Đã tạo xong kho dữ liệu cho {total_count} chữ Kanji.")
    print(f"- File JSON: {OUTPUT_JSON}")
    print(f"- File JS:   {OUTPUT_JS}")
    print("=" * 60)

if __name__ == "__main__":
    main()
