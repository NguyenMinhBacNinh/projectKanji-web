/**
 * Batch 5B: Cập nhật "Chiết tự bộ thủ cấu thành" & "Hình tượng & mẹo ghi nhớ"
 * Cho 95 chữ Kanji N1 tiếp theo (từ 凪 đến 堪)
 */

const fs = require('fs');
const path = require('path');

const n1bData = {
  "凪": {
    "components": ["几", "止"],
    "equation": "几 (Khung gió thổi) + 止 (Chỉ - dừng lại đứng yên)",
    "mnemonic": "Gió ngừng thổi (几) mặt biển phẳng lặng như tờ (止), biển lặng gió êm, nagi.",
    "illustration": {
      "badge": "🌊",
      "concept": "Biển lặng sóng êm",
      "visualDesc": "Mặt biển phẳng lặng như gương phản chiếu ánh hoàng hôn yên bình."
    }
  },
  "凱": {
    "components": ["豈", "几"],
    "equation": "豈 (Khải - trống trận tấu lên bài ca vui mừng) + 几 (Bệ phong thưởng uy nghi)",
    "mnemonic": "Đánh trống khua chiêng hát vang khúc ca mừng chiến thắng giòn giã trở về, khúc khải hoàn.",
    "illustration": {
      "badge": "🎺",
      "concept": "Khúc ca khải hoàn",
      "visualDesc": "Khải Hoàn Môn sừng sững đón đoàn quân chiến thắng trở về trong tiếng kèn vang."
    }
  },
  "凶": {
    "components": ["凵", "乂"],
    "equation": "凵 (Cái hố sâu sụp bẫy) + 乂 (Dấu chéo cảnh báo nguy hiểm sụp hầm)",
    "mnemonic": "Rơi xuống hố sâu bẫy chông có dấu gạch chéo nguy nan, hung ác, điềm hung, hung hiểm.",
    "illustration": {
      "badge": "⚠️",
      "concept": "Cảnh báo hung hiểm",
      "visualDesc": "Biển tam giác cảnh báo nguy hiểm vực sâu trước mặt."
    }
  },
  "凸": {
    "components": ["凸"],
    "equation": "凸 (Tượng hình khối vật thể có phần giữa nhô cao lên)",
    "mnemonic": "Hình vẽ khối đá nhô hẳn phần đỉnh lên trên, nhô cao, lồi lên (đối lập với lõm).",
    "illustration": {
      "badge": "🔍",
      "concept": "Thấu kính lồi",
      "visualDesc": "Mặt kính lồi cong lên phóng to hình ảnh vật thể bên dưới."
    }
  },
  "凹": {
    "components": ["凹"],
    "equation": "凹 (Tượng hình khối vật thể bị khoét khuyết một khoảng sâu xuống)",
    "mnemonic": "Hình vẽ khối bề mặt bị sụt lún một khoảng trống ở giữa, lõm xuống, trũng xuống.",
    "illustration": {
      "badge": "🥣",
      "concept": "Vết lõm trũng xuống",
      "visualDesc": "Chiếc chén gốm lòng sâu lõm xuống chứa giọt nước trong vắt."
    }
  },
  "刀": {
    "components": ["刀"],
    "equation": "刀 (Tượng hình lưỡi đao có sống cong và mũi nhọn sắc bén)",
    "mnemonic": "Hình vẽ thanh đao với lưỡi chém cong và chuôi cầm chắc chắn, con dao, thanh đao.",
    "illustration": {
      "badge": "🗡️",
      "concept": "Thanh đao sắc bén",
      "visualDesc": "Thanh đao thép sáng loáng với đường cong sắc sảo đầy uy lực."
    }
  },
  "刃": {
    "components": ["刀", "丶"],
    "equation": "刀 (Thanh đao) + 丶 (Dấu chấm chỉ đúng mép lưỡi sắc bén)",
    "mnemonic": "Đánh dấu chấm (丶) ngay trên mép bén nhất của con dao (刀), lưỡi dao, bén nhọn.",
    "illustration": {
      "badge": "🔪",
      "concept": "Mép lưỡi dao sắc lẹm",
      "visualDesc": "Cận cảnh mép lưỡi dao sắc bén phản chiếu vệt sáng lạnh lùng."
    }
  },
  "刈": {
    "components": ["乂", "刂"],
    "equation": "乂 (Cỏ cây đan chéo) + 刂 (Đao - lưỡi dao/liềm cắt phăng)",
    "mnemonic": "Dùng lưỡi hái dao sắc (刂) vung một nhát cắt phăng cỏ dại đan xen (乂), gặt lúa, xén cỏ.",
    "illustration": {
      "badge": "🌾",
      "concept": "Chiếc liềm cắt lúa",
      "visualDesc": "Chiếc liềm sắc bén cắt ngang thân bụi lúa vàng rộm trên cánh đồng."
    }
  },
  "刑": {
    "components": ["开", "刂"],
    "equation": "开 (Kẹp gỗ gông cùm tội nhân) + 刂 (Đao - hình phạt nghiêm khắc)",
    "mnemonic": "Tội phạm bị kẹp chặt vào gông (开) chịu sự trừng phạt của đao luật pháp (刂), hình phạt, pháp hình.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Hình phạt nghiêm minh",
      "visualDesc": "Búa công lý gõ vang tuyên án trừng trị kẻ có tội."
    }
  },
  "削": {
    "components": ["肖", "刂"],
    "equation": "肖 (Tiêu/Tiểu - làm cho nhỏ lại) + 刂 (Đao - lưỡi dao gọt tỉa)",
    "mnemonic": "Dùng dao nhỏ (刂) gọt bớt từng lớp mỏng để vật thể thon gọn lại (肖), gọt giũa, cắt giảm.",
    "illustration": {
      "badge": "✏️",
      "concept": "Gọt nhọn đầu bút",
      "visualDesc": "Lưỡi gọt tỉa từng vòng vỏ gỗ để lộ ngòi chì sắc nét."
    }
  },
  "剖": {
    "components": ["咅", "刂"],
    "equation": "咅 (Phẫu - miệng nhổ toạc ra hai bên) + 刂 (Đao - lưỡi dao mổ xẻ)",
    "mnemonic": "Dùng dao mổ sắc bén (刂) rạch mở đôi để khám phá sâu bên trong (咅), phẫu thuật, giải phẫu.",
    "illustration": {
      "badge": "🔬",
      "concept": "Giải phẫu y khoa",
      "visualDesc": "Mô hình dao phẫu thuật y khoa tinh xảo rạch mở mẫu xét nghiệm."
    }
  },
  "剛": {
    "components": ["岡", "刂"],
    "equation": "岡 (Cương - sống núi đá sừng sững) + 刂 (Đao - lưỡi thép tôi luyện)",
    "mnemonic": "Ý chí vững chãi như núi đá (岡) kết hợp bản lĩnh sắc lạnh của lưỡi gươm (刂), kiên cường, cứng rắn.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Khối đá kiên cường",
      "visualDesc": "Khối đá hoa cương sừng sững không hề suy suyển trước sóng gió."
    }
  },
  "剣": {
    "components": ["僉", "刂"],
    "equation": "僉 (Thiêm - hai bên cân xứng tụ lại mũi nhọn) + 刂 (Đao - vũ khí sắc bén)",
    "mnemonic": "Vũ khí hai lưỡi đối xứng sắc lẹm quy về mũi nhọn đâm xuyên (僉-刂), thanh kiếm, kiếm đạo.",
    "illustration": {
      "badge": "⚔️",
      "concept": "Thanh kiếm báu",
      "visualDesc": "Hai thanh bảo kiếm chéo nhau phát sáng ánh thép lạnh lùng."
    }
  },
  "剤": {
    "components": ["斉", "刂"],
    "equation": "斉 (Tề - cân bằng đều tăm tắp) + 刂 (Đao - dao cắt tỉa định lượng thảo dược)",
    "mnemonic": "Dùng dao sắc (刂) cắt tỉa thảo dược theo tỷ lệ cân đối hoàn hảo (斉), điều chế thuốc, phương tễ.",
    "illustration": {
      "badge": "💊",
      "concept": "Viên thuốc điều chế",
      "visualDesc": "Vỉ thuốc viên con nhộng đủ màu được định lượng chuẩn mực."
    }
  },
  "剰": {
    "components": ["乗", "刂"],
    "equation": "乗 (Thừa - chất lên đầy ắp trên xe) + 刂 (Đao - vạt bớt phần thừa dôi ra)",
    "mnemonic": "Hàng chất đầy ắp trên xe (乗) bị đùn trồi ra ngoài phải dùng dao gạt bớt (刂), thặng dư, phần dư thừa.",
    "illustration": {
      "badge": "📈",
      "concept": "Thặng dư ngân sách",
      "visualDesc": "Biểu đồ kinh tế với cột giá trị thặng dư vượt mức chỉ tiêu ấn định."
    }
  },
  "創": {
    "components": ["倉", "刂"],
    "equation": "倉 (Thương - gom tích tri thức đầy kho) + 刂 (Đao - mũi dao mở nhát rạch tiên phong)",
    "mnemonic": "Từ vốn tri thức tích lũy (倉) vung nhát dao tiên phong mở ra con đường mới (刂), sáng lập, sáng tạo.",
    "illustration": {
      "badge": "💡",
      "concept": "Ý tưởng sáng tạo",
      "visualDesc": "Bóng đèn bật sáng rực rỡ tượng trưng cho ý tưởng sáng tạo đột phá."
    }
  },
  "功": {
    "components": ["工", "力"],
    "equation": "工 (Công - công việc, dự án) + 力 (Lực - dốc toàn bộ sức lực)",
    "mnemonic": "Dốc hết sức lực bền bỉ (力) vào hoàn thành công trình vĩ đại (工), công lao, chiến công, thành tích.",
    "illustration": {
      "badge": "🏅",
      "concept": "Huy chương công trạng",
      "visualDesc": "Tấm huân chương vàng trao tặng cho người có công lao đóng góp lớn."
    }
  },
  "劣": {
    "components": ["少", "力"],
    "equation": "少 (Thiểu - ít ỏi, thiếu hụt) + 力 (Lực - sức mạnh thể chất)",
    "mnemonic": "Sức lực ít ỏi (少-力) không đủ để tranh đua với đối thủ, yếu thế, kém cỏi, lép vế.",
    "illustration": {
      "badge": "📉",
      "concept": "Thế trận lép vế",
      "visualDesc": "Đường biểu đồ đi xuống biểu thị sự sút kém và lép vế trước đối thủ."
    }
  },
  "励": {
    "components": ["厂", "万", "力"],
    "equation": "厉/厂 (Vách đá cheo leo mài giũa) + 力 (Lực - dốc toàn lực vượt qua)",
    "mnemonic": "Dốc toàn bộ sức lực (力) mài giũa ý chí trước vách đá thử thách (厉), nỗ lực, khích lệ, cổ vũ.",
    "illustration": {
      "badge": "👏",
      "concept": "Vỗ tay khích lệ",
      "visualDesc": "Đôi bàn tay vỗ tay nồng nhiệt cổ vũ tinh thần người chiến đấu."
    }
  },
  "劾": {
    "components": ["亥", "力"],
    "equation": "亥 (Hợi - mổ xẻ rạch ròi đến tận cùng) + 力 (Lực - dùng quyền lực truy cứu)",
    "mnemonic": "Dùng quyền lực luật pháp (力) mổ xẻ rạch ròi tận gốc sự thật (亥) để vạch trần kẻ tham quan, đàn hặc.",
    "illustration": {
      "badge": "⚖️",
      "concept": "Bản cáo trạng đàn hặc",
      "visualDesc": "Văn bản tố cáo sai phạm được quan ngự sử dâng lên công đường."
    }
  },
  "勁": {
    "components": ["巠", "力"],
    "equation": "巠 (Kinh - sợi tơ giăng thẳng tắp vững chắc) + 力 (Lực - sức bền dẻo dai)",
    "mnemonic": "Sức mạnh dẻo dai và kiên cường như sợi tơ căng thẳng trước ngọn gió giông (巠-力), cứng cáp, kiên cường.",
    "illustration": {
      "badge": "🎋",
      "concept": "Cây tre kiên cường",
      "visualDesc": "Cây tre uốn mình mềm dẻo nhưng kiên cường trước bão táp giông gió."
    }
  },
  "勅": {
    "components": ["束", "力"],
    "equation": "束 (Thúc - bó buộc, khuôn phép nghiêm ngặt) + 力 (Lực - quyền uy tối thượng)",
    "mnemonic": "Dùng quyền lực tối thượng của quân vương (力) ràng buộc khuôn phép muôn dân (束), sắc chỉ, sắc lệnh.",
    "illustration": {
      "badge": "📜",
      "concept": "Cuộn chiếu chỉ hoàng gia",
      "visualDesc": "Cuộn giấy lụa vàng thêu rồng đóng dấu ngọc tỷ hoàng đế."
    }
  },
  "勘": {
    "components": ["甚", "力"],
    "equation": "甚 (Thậm - xem xét thật kỹ càng đến cùng) + 力 (Lực - dồn tâm lực phán đoán)",
    "mnemonic": "Dồn hết tâm lực (力) suy xét cực kỳ tỉ mỉ mọi ngóc ngách (甚) để đưa ra phán đoán, trực giác, suy xét.",
    "illustration": {
      "badge": "🤔",
      "concept": "Tập trung suy xét",
      "visualDesc": "Khuôn mặt đăm chiêu suy nghĩ thấu đáo trước khi đưa ra trực giác."
    }
  },
  "勧": {
    "components": ["雚", "力"],
    "equation": "雚 (Chim ríu rít lời ngọt ngào) + 力 (Lực - ra sức tác động vào tâm trí)",
    "mnemonic": "Dùng lời lẽ êm dịu tác động hết sức (雚-力) để lay chuyển người khác theo lẽ phải, khuyên nhủ, khuyến khích.",
    "illustration": {
      "badge": "📢",
      "concept": "Lời khuyên chân thành",
      "visualDesc": "Chiếc loa phát thông điệp kêu gọi và khích lệ mọi người cùng tham gia."
    }
  },
  "勲": {
    "components": ["熏", "力"],
    "equation": "熏 (Hun đúc lửa đỏ rực) + 力 (Lực - sức cống hiến quên mình)",
    "mnemonic": "Sức cống hiến xả thân (力) qua bao gian lao lửa đạn hun đúc nên chiến công bất diệt (熏), huân chương, công huân.",
    "illustration": {
      "badge": "🎖️",
      "concept": "Tấm huân chương cao quý",
      "visualDesc": "Huân chương cài áo đính dải ruy băng vinh danh bậc anh hùng."
    }
  },
  "勺": {
    "components": ["勹", "丶"],
    "equation": "勹 (Cái muôi múc tròn có cán) + 丶 (Giọt nước múc được bên trong)",
    "mnemonic": "Hình chiếc muôi múc nước tròn xoe đang giữ lại một giọt nước sánh bên trong, cái muôi, thìa đong.",
    "illustration": {
      "badge": "🥄",
      "concept": "Chiếc muôi múc canh",
      "visualDesc": "Chiếc muôi gỗ múc canh đầy đặn nghi ngút hơi ấm bên nồi súp."
    }
  },
  "匁": {
    "components": ["勹", "乂"],
    "equation": "勹 (Khay đĩa cân đo) + 乂 (Dấu chỉ đồng tiền cổ cân nặng 3.75g)",
    "mnemonic": "Chữ thuần Nhật (Kokuji) dùng để chỉ đơn vị đo trọng lượng bạc cổ bằng một đồng tiền xu (3.75 gram), momme.",
    "illustration": {
      "badge": "🪙",
      "concept": "Đồng tiền cân đo momme",
      "visualDesc": "Chiếc cân tiểu ly cổ xưa cân chỉnh khối bạc bằng đơn vị momme."
    }
  },
  "匠": {
    "components": ["匚", "斤"],
    "equation": "匚 (Hộp đồ nghề chuyên dụng) + 斤 (Chiếc rìu đẽo gọt gỗ tài hoa)",
    "mnemonic": "Người thợ mang theo hộp đồ nghề (匚) với chiếc rìu sắc sảo (斤) tạo nên kiệt tác gỗ, thợ thủ công, nghệ nhân.",
    "illustration": {
      "badge": "🪚",
      "concept": "Bậc thầy mộc nghệ",
      "visualDesc": "Nghệ nhân mộc đang gọt giũa tỉ mỉ từng chi tiết mộng gỗ ăn khớp hoàn hảo."
    }
  },
  "匡": {
    "components": ["匚", "王"],
    "equation": "匚 (Khuôn nắn uốn nắn) + 王 (Vương - vị vua, sự ngay thẳng)",
    "mnemonic": "Đặt vào khuôn phép (匚) để uốn nắn mọi việc chuẩn mực ngay thẳng như đạo vua (王), uốn nắn, cứu giúp.",
    "illustration": {
      "badge": "📐",
      "concept": "Uốn nắn chuẩn mực",
      "visualDesc": "Khung nẹp nắn thân cây non đứng thẳng tắp vươn lên đón nắng."
    }
  },
  "匿": {
    "components": ["匚", "若"],
    "equation": "匚 (Hộp chứa kín đáo) + 若 (Cúi đầu giấu mặt dưới lùm cây)",
    "mnemonic": "Giấu kín thân mình và đồ đạc sâu vào góc khuất kín đáo (匚-若) không cho ai phát hiện, nặc danh, ẩn giấu.",
    "illustration": {
      "badge": "🕵️",
      "concept": "Ẩn danh nặc danh",
      "visualDesc": "Bóng người trùm áo choàng nón rộng che kín mặt biểu thị sự nặc danh."
    }
  },
  "升": {
    "components": ["十", "丿"],
    "equation": "升 (Tượng hình chiếc gáo vuông có cán cầm dùng đong ngũ cốc)",
    "mnemonic": "Chiếc hộp gỗ vuông vức có cán cầm để đong đếm từng đấu thóc gạo (khoảng 1.8 lít), thăng, đấu gạo.",
    "illustration": {
      "badge": "🪵",
      "concept": "Hộp gỗ đong rượu masu",
      "visualDesc": "Chiếc cốc gỗ masu hình vuông đựng đầy rượu sake thơm nồng."
    }
  },
  "卑": {
    "components": ["甶", "十"],
    "equation": "甶 (Chiếc quạt phe phẩy quạt mát) cầm bằng bàn tay tôi tớ phục dịch (十)",
    "mnemonic": "Kẻ tôi tớ hai tay cầm quạt phe phẩy hầu hạ bậc quý tộc, thấp hèn, ti tiện, khiêm nhường.",
    "illustration": {
      "badge": "🙇‍♂️",
      "concept": "Cúi mình khiêm nhường",
      "visualDesc": "Dáng người cúi đầu thấp biểu thị sự tự khiêm nhường trước người khác."
    }
  },
  "卓": {
    "components": ["卜", "日", "十"],
    "equation": "Chiếc bàn cao ba chân dựng thẳng đón ánh mặt trời nổi bật lên khỏi mặt đất",
    "mnemonic": "Chiếc bàn cao thanh nhã đứng vượt lên trên mọi vật xung quanh, trác tuyệt, cái bàn (trác).",
    "illustration": {
      "badge": "🪑",
      "concept": "Chiếc bàn gỗ thanh lịch",
      "visualDesc": "Chiếc bàn trà gỗ tinh xảo đặt trang trọng giữa gian phòng tiếp khách."
    }
  },
  "博": {
    "components": ["十", "尃"],
    "equation": "十 (Mười phương vạn vật) + 尃 (Phổ - trải rộng ban phát khắp nơi)",
    "mnemonic": "Tri thức và lòng nhân trải rộng thấu suốt khắp mười phương nhân gian (十-尃), uyên bác, bác học, bác ái.",
    "illustration": {
      "badge": "🎓",
      "concept": "Bậc học giả uyên bác",
      "visualDesc": "Mũ cử nhân đặt trên tập sách bách khoa biểu thị tri thức sâu rộng."
    }
  },
  "卯": {
    "components": ["卯"],
    "equation": "卯 (Tượng hình hai cánh cửa mở toang đón ánh nắng sớm chi Mão)",
    "mnemonic": "Hai cánh cổng lớn mở toang lúc bình minh chi Mão (5h-7h sáng), chi Mão, cầm tinh con thỏ.",
    "illustration": {
      "badge": "🐇",
      "concept": "Chú thỏ chi Mão",
      "visualDesc": "Chú thỏ trắng tinh khôn ngồi nhấm nháp lá cỏ non dưới nắng sớm."
    }
  },
  "即": {
    "components": ["艮", "卩"],
    "equation": "艮 (Mâm cơm thơm ngon) + 卩 (Người quỳ xuống kề sát miệng sẵn sàng ăn ngay)",
    "mnemonic": "Mâm cơm vừa dọn ra là quỳ xuống ăn ngay lập tức không chần chừ (艮-卩), tức khắc, ngay tức thì.",
    "illustration": {
      "badge": "⚡",
      "concept": "Ngay tức thì",
      "visualDesc": "Tia chớp lóe sáng tức thì biểu trưng cho tốc độ nhanh chóng không chậm trễ."
    }
  },
  "却": {
    "components": ["去", "卩"],
    "equation": "去 (Rời đi, bước lùi) + 卩 (Người quỳ gối xin thoái lui)",
    "mnemonic": "Quỳ gối xin phép bước lùi lại từ chối khéo léo (去-卩), thoái lui, cự tuyệt, khước từ.",
    "illustration": {
      "badge": "✋",
      "concept": "Bàn tay từ chối",
      "visualDesc": "Bàn tay giơ lên lịch thiệp ra hiệu từ chối món quà không nhận."
    }
  },
  "卸": {
    "components": ["午", "卩", "止"],
    "equation": "Cởi bỏ ách xe ngựa dỡ hàng hóa chất đống xuống kho bãi",
    "mnemonic": "Tháo yên cương xe ngựa cho hàng hóa dỡ xuống mặt đất để phân phối số lượng lớn, bán buôn, bán sỉ, dỡ hàng.",
    "illustration": {
      "badge": "📦",
      "concept": "Kho bãi dỡ hàng sỉ",
      "visualDesc": "Xe nâng hàng dỡ từng pallet hàng hóa lớn xếp vào kho phân phối."
    }
  },
  "厄": {
    "components": ["厂", "卩"],
    "equation": "厂 (Vách núi hiểm trở cheo leo) + 卩 (Người bị mắc kẹt co ro dưới chân vách)",
    "mnemonic": "Người co ro mắc kẹt dưới chân vách núi hiểm hóc không lối thoát (厂-卩), tai ách, hoạn nạn, năm hạn.",
    "illustration": {
      "badge": "⚡",
      "concept": "Vận hạn tai ương",
      "visualDesc": "Cây cầu gãy giữa cơn bão biểu thị trắc trở gian nan cần phòng tránh."
    }
  },
  "厘": {
    "components": ["厂", "里"],
    "equation": "厂 (Mái xưởng) + 里 (Làng xóm đo đạc mẫu đất chia nhỏ từng li)",
    "mnemonic": "Phân chia mẫu đất ruộng (里) chi li đến từng milimet tỉ mỉ dưới xưởng (厂), một ly, cực kỳ nhỏ bé.",
    "illustration": {
      "badge": "📏",
      "concept": "Thước chia vạch milimet",
      "visualDesc": "Cây thước cơ khí hiển thị từng vạch chia ly cực kỳ chuẩn xác."
    }
  },
  "厳": {
    "components": ["敢", "厂"],
    "equation": "Trấn giữ nơi vách núi hiểm trở với phong thái quả cảm uy nghi bất khuất",
    "mnemonic": "Đứng sừng sững trên vách đá hiểm trở với thần thái uy nghi khiến ai nấy nể phục, nghiêm trang, nghiêm khắc.",
    "illustration": {
      "badge": "👨‍⚖️",
      "concept": "Thẩm phán nghiêm nghị",
      "visualDesc": "Vị quan tòa nghiêm nghị gõ búa giữ gìn trật tự và phép nước."
    }
  },
  "又": {
    "components": ["又"],
    "equation": "又 (Tượng hình bàn tay phải lặp lại hành động nắm giữ đồ vật)",
    "mnemonic": "Bàn tay phải lại tiếp tục vươn ra cầm nắm đồ vật lần nữa, lại nữa, hơn nữa.",
    "illustration": {
      "badge": "🔁",
      "concept": "Lặp lại thêm một lần",
      "visualDesc": "Mũi tên xoay vòng biểu trưng cho sự lặp lại tiếp diễn."
    }
  },
  "及": {
    "components": ["及"],
    "equation": "及 (Bàn tay vươn ra tóm kịp người đang chạy phía trước)",
    "mnemonic": "Bàn tay vươn dài chộp đuổi kịp người chạy đằng trước trong gang tấc, bắt kịp, đạt đến, phổ cập.",
    "illustration": {
      "badge": "🎯",
      "concept": "Vươn tới đạt đến",
      "visualDesc": "Bàn tay vươn tới chạm đúng đích đến hoàn thành chặng đua."
    }
  },
  "叔": {
    "components": ["上", "小", "又"],
    "equation": "Bàn tay (又) nhặt lượm từng hạt đậu nhỏ (小) gom góp vun đắp gia đình",
    "mnemonic": "Bàn tay người chú siêng năng thu lượm chăm lo cho cháu nhỏ trong nhà, thúc phụ, chú ruột.",
    "illustration": {
      "badge": "👨",
      "concept": "Người chú thân thiện",
      "visualDesc": "Người chú tươi cười khoác vai đứa cháu nhỏ đi dạo công viên."
    }
  },
  "叙": {
    "components": ["余", "又"],
    "equation": "余 (Ta / lời bộc bạch) + 又 (Bàn tay lần giở từng trang ghi chép lại)",
    "mnemonic": "Bàn tay lật giở từng trang ký ức thuật lại đầu đuôi câu chuyện mạch lạc (余-又), tự sự, tường thuật.",
    "illustration": {
      "badge": "📖",
      "concept": "Trang sách tự sự",
      "visualDesc": "Cuốn hồi ký ghi lại những thăng trầm cuộc đời theo dòng thời gian."
    }
  },
  "叡": {
    "components": ["𣫝", "目"],
    "equation": "Đôi mắt sâu thẳm (目) nhìn thấu suốt cội nguồn dòng nước và bản chất vạn vật",
    "mnemonic": "Đôi mắt tinh tường nhìn thấu muôn sự muôn vật sâu sắc, thông tuệ, duệ trí của bậc minh vương.",
    "illustration": {
      "badge": "🦉",
      "concept": "Ánh mắt thông tuệ",
      "visualDesc": "Ánh mắt nhìn xa xăm thấu suốt chân lý vũ trụ của bậc triết nhân."
    }
  },
  "句": {
    "components": ["勹", "口"],
    "equation": "勹 (Bao bọc uốn cong gom lại) + 口 (Miệng thốt ra trọn ý)",
    "mnemonic": "Những lời nói từ miệng (口) được gói ghém gãy gọn trọn vẹn thành một ý (勹), câu văn, câu cú.",
    "illustration": {
      "badge": "✍️",
      "concept": "Dòng câu văn gãy gọn",
      "visualDesc": "Cây bút viết nên một câu văn trau chuốt trên trang giấy trắng."
    }
  },
  "只": {
    "components": ["口", "八"],
    "equation": "口 (Miệng nói) + 八 (Hơi thở phân tán ra nhẹ tênh)",
    "mnemonic": "Miệng thốt ra lời buông nhẹ rằng chẳng có gì to tát, chỉ là, duy nhất, miễn phí.",
    "illustration": {
      "badge": "1️⃣",
      "concept": "Duy nhất một điều",
      "visualDesc": "Ngón tay trỏ giơ lên biểu thị sự duy nhất, chỉ có một."
    }
  },
  "叶": {
    "components": ["口", "十"],
    "equation": "口 (Miệng ước nguyện) + 十 (Mười lời đồng thanh hòa hợp trọn vẹn)",
    "mnemonic": "Mười miệng cùng hòa lời nguyện ước (口-十) khiến mong ước trở thành hiện thực, ứng nghiệm, toại nguyện.",
    "illustration": {
      "badge": "🎋",
      "concept": "Mảnh giấy ước nguyện tanzaku",
      "visualDesc": "Thẻ ước nguyện nhiều màu treo trên nhành tre trong lễ thất tịch bay nhẹ."
    }
  },
  "司": {
    "components": ["司"],
    "equation": "司 (Hình miệng mở ra phát lệnh và cánh tay vung lên chỉ huy)",
    "mnemonic": "Miệng cất tiếng chỉ huy, tay điều hành trật tự công việc đâu ra đấy, quản lý, tư lệnh, ty sở.",
    "illustration": {
      "badge": "👔",
      "concept": "Người điều hành chủ trì",
      "visualDesc": "Bàn làm việc của vị quan tư lệnh với ấn tín và sổ sách điều hành."
    }
  },
  "吉": {
    "components": ["士", "口"],
    "equation": "士 (Kẻ sĩ có tài đức) + 口 (Miệng thốt ra lời hay ý đẹp)",
    "mnemonic": "Bậc hiền sĩ tài đức (士) mở miệng nói ra toàn điều phúc hậu tốt lành (口), cát tường, đại cát.",
    "illustration": {
      "badge": "🥠",
      "concept": "Quẻ xăm cát tường",
      "visualDesc": "Thẻ quẻ xăm may mắn omikuji chữ Đại Cát được buộc lên cành cây cầu phúc."
    }
  },
  "后": {
    "components": ["后"],
    "equation": "后 (Tượng hình người mẹ sinh nở truyền mệnh chỉ huy từ hậu cung)",
    "mnemonic": "Bậc mẫu nghi đức hạnh đứng sau phò tá và ban hành chỉ dụ nơi cung điện, hoàng hậu, vương hậu.",
    "illustration": {
      "badge": "👑",
      "concept": "Vương miện hoàng hậu",
      "visualDesc": "Vương miện phượng hoàng đính ngọc trai lộng lẫy của bậc mẫu nghi."
    }
  },
  "吏": {
    "components": ["一", "口", "十"],
    "equation": "Người cầm thẻ lệnh bằng tay ghi chép sổ sách cho triều đình",
    "mnemonic": "Tay cầm bút mộc mạc ghi chép việc công cho quan phủ, viên chức hành chính, quan lại.",
    "illustration": {
      "badge": "📜",
      "concept": "Quan lại chốn công đường",
      "visualDesc": "Vị nha lại cẩn thận đối chiếu dấu triện trên công văn phủ nha."
    }
  },
  "吐": {
    "components": ["口", "土"],
    "equation": "口 (Miệng) + 土 (Nhổ ra rơi xuống mặt đất)",
    "mnemonic": "Từ miệng (口) tống đồ ứ đọng rơi xuống mặt đất (土), nhả ra, nôn mửa, thốt ra ruột gan.",
    "illustration": {
      "badge": "🤢",
      "concept": "Nôn mửa khó chịu",
      "visualDesc": "Khuôn mặt buồn nôn muốn tống chất độc hại ra khỏi cơ thể."
    }
  },
  "吟": {
    "components": ["口", "今"],
    "equation": "口 (Miệng) + 今 (Kim - tâm trí lúc này đang chìm đắm trong cảm xúc)",
    "mnemonic": "Miệng (口) chậm rãi ngân nga giai điệu chứa chan cảm xúc ngay lúc này (今), ngâm thơ, ngâm vịnh.",
    "illustration": {
      "badge": "🎵",
      "concept": "Ngâm nga khúc ca",
      "visualDesc": "Nốt nhạc du dương bay ra từ bờ môi ngân nga câu hát êm đềm."
    }
  },
  "呂": {
    "components": ["口", "口"],
    "equation": "Hai đốt xương sống xếp chồng nối liền nhau / hai ống sáo đo âm thanh",
    "mnemonic": "Hai đốt xương sống liên kết nâng đỡ lưng / hai ống sáo điều chỉnh âm luật, cung bậc âm luật, họ Lữ.",
    "illustration": {
      "badge": "🎶",
      "concept": "Ống sáo chuẩn âm",
      "visualDesc": "Cặp ống sáo trúc truyền thống tấu lên điệu nhạc hài hòa thanh nhã."
    }
  },
  "呈": {
    "components": ["口", "王"],
    "equation": "口 (Miệng tâu bẩm) + 王 (Vương - vị vua, bậc bề trên đứng thẳng)",
    "mnemonic": "Đứng thẳng người trước mặt vua chúa (王) mở lời tấu trình việc hệ trọng (口), trình báo, dâng lên.",
    "illustration": {
      "badge": "📄",
      "concept": "Tờ sớ tấu trình",
      "visualDesc": "Tờ trình bằng giấy điều trang trọng được mở ra trước công đường."
    }
  },
  "呉": {
    "components": ["口", "天"],
    "equation": "口 (Miệng ca hát hò reo) + 天 (Người dang rộng tay nhảy múa)",
    "mnemonic": "Người vừa dang tay múa vừa há to miệng reo hò trong lễ hội phương nam, nước Ngô, họ Ngô.",
    "illustration": {
      "badge": "🏯",
      "concept": "Thành quách nước Ngô cổ",
      "visualDesc": "Chiến thuyền lướt sóng trên dòng sông Trường Giang thời Tam Quốc."
    }
  },
  "哀": {
    "components": ["衣", "口"],
    "equation": "衣 (Áo tang rách nát) bao quanh 口 (Miệng nghẹn ngào bật khóc)",
    "mnemonic": "Khoác áo tang (衣) nấc nghẹn từng tiếng khóc xé lòng xót thương người đã khuất (口), bi ai, thương cảm.",
    "illustration": {
      "badge": "😢",
      "concept": "Nỗi buồn bi ai",
      "visualDesc": "Giọt lệ rơi trên tà áo trắng trong lễ tưởng niệm trang nghiêm."
    }
  },
  "哉": {
    "components": ["𢦏", "口"],
    "equation": "𢦏 (Binh khí chạm nhau kinh hoàng) + 口 (Miệng thốt lên lời than thở)",
    "mnemonic": "Chứng kiến đao binh khốc liệt, miệng (口) cất tiếng than thở nghẹn ngào, ôi thay, sao mà... thay!",
    "illustration": {
      "badge": "❗",
      "concept": "Lời cảm thán sâu sắc",
      "visualDesc": "Dấu chấm than lớn biểu thị tiếng thở dài đầy cảm khái trước cuộc đời."
    }
  },
  "哲": {
    "components": ["折", "口"],
    "equation": "折 (Chiết - bẻ gãy, phân tích khúc chiết) + 口 (Miệng luận giải thông tuệ)",
    "mnemonic": "Lời nói (口) phân tích bẻ gãy từng ngụy biện rõ ràng khúc chiết (折), triết học, triết nhân.",
    "illustration": {
      "badge": "🤔",
      "concept": "Tượng nhà tư tưởng Rodin",
      "visualDesc": "Bức tượng Người Suy Tưởng trầm ngâm đúc kết tinh hoa triết học nhân loại."
    }
  },
  "唄": {
    "components": ["口", "貝"],
    "equation": "口 (Miệng hát) + 貝 (Bối - báu vật, nhịp phách đàn shamisen)",
    "mnemonic": "Miệng (口) cất tiếng hát du dương theo từng phím đàn quý giá rộn rã (貝), bài ca dân gian Nhật Bản.",
    "illustration": {
      "badge": "🪕",
      "concept": "Cây đàn Shamisen",
      "visualDesc": "Cây đàn shamisen ba dây réo rắt đệm cho điệu hát kouta dân gian."
    }
  },
  "唆": {
    "components": ["口", "夋"],
    "equation": "口 (Miệng thầm thì) + 夋 (Chân bước rón rén xúi giục)",
    "mnemonic": "Dùng miệng lưỡi (口) xúi giục người khác bước vào con đường sai trái (夋), xúi giục, sai bảo toa rập.",
    "illustration": {
      "badge": "🗣️",
      "concept": "Lời xúi giục to nhỏ",
      "visualDesc": "Bóng đen thì thầm vào tai dụ dỗ làm điều phi pháp."
    }
  },
  "唇": {
    "components": ["辰", "口"],
    "equation": "辰 (Khí sắc biến chuyển theo thời tiết) + 口 (Cửa miệng hé mở)",
    "mnemonic": "Lớp da mềm mại bên ngoài khuôn miệng (口) thể hiện rõ sắc thái sức khỏe (辰), đôi môi, thần xỉ.",
    "illustration": {
      "badge": "👄",
      "concept": "Đôi môi hồng hào",
      "visualDesc": "Đôi môi thoa lớp son dưỡng bóng nhẹ nhàng hé nụ cười tươi tắn."
    }
  },
  "唯": {
    "components": ["口", "隹"],
    "equation": "口 (Miệng đáp lời cung kính) + 隹 (Con chim nhỏ ngoan ngoãn lắng nghe)",
    "mnemonic": "Miệng mở lời đáp vâng dạ cung kính trước điều duy nhất đúng đắn, duy nhất, duy tâm.",
    "illustration": {
      "badge": "☝️",
      "concept": "Duy nhất một",
      "visualDesc": "Một ngọn nến duy nhất tỏa ánh sáng ấm áp trong căn phòng tĩnh mịch."
    }
  },
  "唱": {
    "components": ["口", "昌"],
    "equation": "口 (Miệng) + 昌 (Xương - mặt trời đôi sáng rực rỡ, thịnh vượng)",
    "mnemonic": "Cất cao tiếng hát từ miệng (口) làm bừng sáng và vang dội khắp bốn phương (昌), ca xướng, khởi xướng.",
    "illustration": {
      "badge": "🎤",
      "concept": "Ca sĩ cất cao giọng hát",
      "visualDesc": "Chiếc micro sân khấu sáng đèn đón nhận giọng hát bay bổng đầy nội lực."
    }
  },
  "啄": {
    "components": ["口", "豖"],
    "equation": "口 (Chiếc mỏ nhọn) + 豖 (Chú heo/thú cúi gầm chân mổ ăn)",
    "mnemonic": "Chim dùng chiếc mỏ (口) liên tục gõ mổ nhanh xuống thân cây tìm sâu bọ, mổ mồi, chim gõ kiến.",
    "illustration": {
      "badge": "🦜",
      "concept": "Chim gõ kiến mổ cây",
      "visualDesc": "Chú chim gõ kiến kiên trì mổ nhịp nhàng vào thân cây sồi già."
    }
  },
  "啓": {
    "components": ["戸", "攵", "口"],
    "equation": "Tay gõ vào cánh cửa (戸-攵) và cất tiếng gọi khai mở tri thức (口)",
    "mnemonic": "Gõ mở cánh cửa phòng đóng kín để ánh sáng tri thức tràn vào soi tỏ tâm trí, khai sáng, khai khởi.",
    "illustration": {
      "badge": "🚪",
      "concept": "Mở cánh cửa tri thức",
      "visualDesc": "Cánh cửa gỗ mở ra một khoảng trời sáng ngập tràn nắng mai hy vọng."
    }
  },
  "善": {
    "components": ["羊", "言"],
    "equation": "羊 (Dương - con cừu hiền lành thuần khiết) + 言 (Lời nói chan hòa chân thật)",
    "mnemonic": "Lời nói và hành động ôn hòa, thuần khiết như chú cừu non (羊-言), lương thiện, hướng thiện.",
    "illustration": {
      "badge": "😇",
      "concept": "Trái tim lương thiện",
      "visualDesc": "Đôi bàn tay nâng niu chú chim bồ câu trắng mang thông điệp hòa bình."
    }
  },
  "喚": {
    "components": ["口", "奐"],
    "equation": "口 (Miệng) + 奐 (Hoán - người vung tay đổi sắc la to)",
    "mnemonic": "Há to miệng vung tay cất tiếng gào thét vang dội để cảnh báo mọi người (口-奐), la hét, triệu hoán.",
    "illustration": {
      "badge": "📢",
      "concept": "Tiếng loa kêu gọi",
      "visualDesc": "Tiếng còi báo động và loa phóng thanh vang lên khẩn cấp triệu tập."
    }
  },
  "喝": {
    "components": ["口", "曷"],
    "equation": "口 (Miệng) + 曷 (Hạt - cổ họng khát khô vì la hét)",
    "mnemonic": "Mở to miệng quát một tiếng sấm sét làm người khác tỉnh ngộ (khát khô cổ), quát tháo, thiền hét khai ngộ.",
    "illustration": {
      "badge": "⚡",
      "concept": "Tiếng thét thiền khai ngộ",
      "visualDesc": "Vị thiền sư vung thiền trượng quát to một tiếng thức tỉnh đệ tử."
    }
  },
  "喪": {
    "components": ["十", "𠮤", "衣"],
    "equation": "Nhiều người khóc than (𠮤) khoác áo tang phủ xuống tiễn đưa (衣)",
    "mnemonic": "Đám đông rơi lệ nghẹn ngào mặc áo tang trắng đưa tiễn người thân về cõi vĩnh hằng, tang lễ, mất mát.",
    "illustration": {
      "badge": "🕯️",
      "concept": "Ngọn nến lễ tang",
      "visualDesc": "Ngọn nến trắng cháy dịu dàng bên đóa cúc trắng trong không khí trang nghiêm."
    }
  },
  "喬": {
    "components": ["夭", "高"],
    "equation": "Cành cây vươn cao uốn cong duyên dáng trên nền lầu đài",
    "mnemonic": "Cây cổ thụ vươn cành cao ngút ngàn uốn lượn mềm mại trên cao, cao vút, cầu Kiều, kiều mộc.",
    "illustration": {
      "badge": "🌲",
      "concept": "Cây tùng vươn cao kiêu hãnh",
      "visualDesc": "Ngọn cây thông cổ thụ sừng sững vươn mình chạm vào mây xanh."
    }
  },
  "嗣": {
    "components": ["口", "册", "司"],
    "equation": "司 (Quản lý việc hương hỏa) + 册 (Sổ phả hệ truyền đời) + 口 (Miệng đọc sắc lệnh)",
    "mnemonic": "Đọc to gia phả (册-口) trao quyền quản lý hương hỏa sản nghiệp cho con trưởng (司), nối dõi, kế tự.",
    "illustration": {
      "badge": "📜",
      "concept": "Cuộn gia phả truyền đời",
      "visualDesc": "Gia phả dòng tộc bằng lụa ghi chép các thế hệ nối tiếp vinh hiển."
    }
  },
  "嘆": {
    "components": ["口", "𦰩"],
    "equation": "口 (Miệng) + 𦰩 (Thán - nhóm lửa bốc khói cay mắt xót xa)",
    "mnemonic": "Khói cay xộc vào mắt khiến miệng (口) buông tiếng thở dài xót xa ngao ngán, than vãn, than thở.",
    "illustration": {
      "badge": "😮‍💨",
      "concept": "Tiếng thở dài ngao ngán",
      "visualDesc": "Làn hơi thở dài buông ra trong làn sương chiều đầy ưu tư."
    }
  },
  "嘉": {
    "components": ["吉", "壴"],
    "equation": "壴 (Trống lễ gõ vang) + 吉 (Điều tốt lành, cát tường)",
    "mnemonic": "Đánh trống khua chiêng (壴) tưng bừng ăn mừng những sự kiện cát tường tốt đẹp (吉), khen ngợi, gia lễ.",
    "illustration": {
      "badge": "🎉",
      "concept": "Lễ mừng gia khánh",
      "visualDesc": "Pháo hoa giấy rực rỡ tung bay chúc mừng một sự kiện trọng đại viên mãn."
    }
  },
  "嘱": {
    "components": ["口", "属"],
    "equation": "口 (Lời miệng dặn dò) + 属 (Thuộc - người thân tín ruột thịt gắn bó)",
    "mnemonic": "Dùng lời ân cần từ miệng (口) căn dặn gửi gắm tâm nguyện cho người ruột thịt (属), dặn dò, ủy thác.",
    "illustration": {
      "badge": "📜",
      "concept": "Bản di chúc ủy thác",
      "visualDesc": "Lá thư dặn dò được niêm phong sáp cẩn thận gửi gắm người kế thừa."
    }
  },
  "器": {
    "components": ["口", "犬"],
    "equation": "Bốn chiếc chén đĩa xếp quanh (bốn chữ 口) được chú chó trung thành canh gác (犬)",
    "mnemonic": "Bốn góc bày các bát đĩa đồ dùng có chú chó canh giữ cẩn thận, đồ đạc, khí cụ, dung lượng khí chất.",
    "illustration": {
      "badge": "🥣",
      "concept": "Đồ gốm khí cụ",
      "visualDesc": "Bộ chén đĩa gốm mộc tinh xảo bày biện ngay ngắn trên bàn tiệc."
    }
  },
  "噴": {
    "components": ["口", "賁"],
    "equation": "口 (Miệng ống dẫn) + 賁 (Bí - nguồn năng lượng dồn nén bùng nổ)",
    "mnemonic": "Áp lực dồn ứ bất ngờ bung mạnh phụt ra ngoài từ miệng ống (口-賁), phun trào núi lửa, phụt nước.",
    "illustration": {
      "badge": "🌋",
      "concept": "Núi lửa phun trào",
      "visualDesc": "Dòng dung nham đỏ rực phun trào mãnh liệt lên bầu trời đêm."
    }
  },
  "嚇": {
    "components": ["口", "赫"],
    "equation": "口 (Miệng thét) + 赫 (Hách - hai ngọn lửa đỏ rực bừng bừng khí thế)",
    "mnemonic": "Há miệng quát thét với khí thế bừng bừng như hai ngọn lửa thiêu đốt (口-赫) làm đối phương khiếp sợ, dọa dẫm.",
    "illustration": {
      "badge": "😱",
      "concept": "Kinh hãi trước lời đe dọa",
      "visualDesc": "Biểu cảm thảng thốt giật mình lùi bước trước đòn đe dọa bất ngờ."
    }
  },
  "囚": {
    "components": ["囗", "人"],
    "equation": "囗 (Bốn bức tường nhà ngục kín mít) nhốt con người (人) ở giữa",
    "mnemonic": "Con người (人) bị giam chặt trong bốn bức tường ngục tối (囗), tù nhân, giam cầm.",
    "illustration": {
      "badge": "⛓️",
      "concept": "Song sắt nhà tù",
      "visualDesc": "Bóng người sau song sắt trại giam khao khát ánh sáng tự do bên ngoài."
    }
  },
  "圏": {
    "components": ["囗", "巻"],
    "equation": "囗 (Vòng bao quanh) + 巻 (Quyển - cuộn tròn khép kín)",
    "mnemonic": "Vạch một đường ranh giới khép kín bao quanh một phạm vi hoạt động (囗-巻), vòng tròn, phạm vi, khí quyển.",
    "illustration": {
      "badge": "⭕",
      "concept": "Vòng ranh giới phạm vi",
      "visualDesc": "Vòng tròn radar quét tín hiệu hiển thị phạm vi an toàn được kiểm soát."
    }
  },
  "圭": {
    "components": ["土", "土"],
    "equation": "Hai khối đất (土-土) đắp chồng vuông vức mài giũa thành miếng ngọc báu",
    "mnemonic": "Hai tầng đất đất vuông thành sắc cạnh tượng trưng cho đất đai ban phong, miếng ngọc khuê ban cho chư hầu.",
    "illustration": {
      "badge": "💎",
      "concept": "Miếng ngọc khuê cổ",
      "visualDesc": "Thỏi ngọc bích phẳng hình chóp nhọn thời cổ đại biểu trưng vương quyền."
    }
  },
  "坑": {
    "components": ["土", "亢"],
    "equation": "土 (Đất đá đào sâu) + 亢 (Kháng - hốc cao sâu hun hút)",
    "mnemonic": "Đào sâu vào lòng đất (土) tạo thành đường hầm hun hút khai thác khoáng sản (亢), hầm than, hố chôn.",
    "illustration": {
      "badge": "⛏️",
      "concept": "Đường hầm mỏ than",
      "visualDesc": "Đường ray xe gòn dẫn sâu vào lòng hầm mỏ than tối om kiên cố."
    }
  },
  "坪": {
    "components": ["土", "平"],
    "equation": "土 (Đất đai) + 平 (Bình - bằng phẳng, êm đềm)",
    "mnemonic": "Khoảnh đất được san phẳng phiu (土-平) để đo đạc làm nhà (1 tsubo ≈ 3.3m²), tsubo, mẫu đất bằng.",
    "illustration": {
      "badge": "📐",
      "concept": "Đo đạc khoảnh đất tsubo",
      "visualDesc": "Bản vẽ phân lô khu đất hình vuông vức chuẩn bị xây dựng nhà ở."
    }
  },
  "垂": {
    "components": ["垂"],
    "equation": "垂 (Tượng hình cành lá sum suê nặng trĩu rủ xuống sát mặt đất)",
    "mnemonic": "Cành liễu trĩu hạt lá rủ sát mặt nước êm ả, rủ xuống, buông rủ, thùy mị.",
    "illustration": {
      "badge": "🌿",
      "concept": "Cành liễu rủ bóng",
      "visualDesc": "Những nhánh liễu xanh mềm mại buông rủ tha thướt bên bờ hồ nước phẳng lặng."
    }
  },
  "垣": {
    "components": ["土", "亘"],
    "equation": "土 (Đất đắp thành lũy) + 亘 (Cẳng - trải dài liên tục ngút ngàn)",
    "mnemonic": "Dùng đất đá (土) đắp thành bờ lũy trải dài bao bọc che chắn quanh vườn (亘), hàng rào, bờ tường.",
    "illustration": {
      "badge": "🧱",
      "concept": "Bờ tường rào đá",
      "visualDesc": "Hàng rào đá xếp mộc mạc phủ rêu xanh ngăn cách khu vườn thanh tịnh."
    }
  },
  "執": {
    "components": ["幸", "丸"],
    "equation": "Hình người bị còng hai tay (幸) cúi đầu chấp hành mệnh lệnh nghiêm ngặt",
    "mnemonic": "Nắm chặt lấy quyền hành trong tay và kiên quyết thực thi không buông lơi, nắm giữ, chấp hành, cố chấp.",
    "illustration": {
      "badge": "✊",
      "concept": "Nắm chặt quyết tâm",
      "visualDesc": "Nắm đấm giơ cao thể hiện ý chí chấp hành nhiệm vụ kiên định tới cùng."
    }
  },
  "培": {
    "components": ["土", "咅"],
    "equation": "土 (Đất màu mỡ) + 咅 (Phẫu - mầm cây tách vỏ nảy nở)",
    "mnemonic": "Vun đắp đất màu mỡ (土) quanh gốc cây để mầm xanh đâm chồi nở hoa (咅), bồi đắp, bồi dưỡng tài năng.",
    "illustration": {
      "badge": "🌱",
      "concept": "Vun đất bồi dưỡng mầm cây",
      "visualDesc": "Bàn tay ân cần vun lớp đất tơi xốp quanh gốc cây non mới nhú mầm."
    }
  },
  "基": {
    "components": ["其", "土"],
    "equation": "其 (Chiếc mẹt sọt đựng đất đai) đặt vững trên nền đất bằng (土)",
    "mnemonic": "Đổ lớp đất đá nền móng kiên cố (其-土) trước khi dựng xây bất cứ công trình nào, nền móng, cơ sở, cơ bản.",
    "illustration": {
      "badge": "🏛️",
      "concept": "Khối đá móng nền",
      "visualDesc": "Tảng đá móng kiên cố chống đỡ các cột trụ của ngôi đền cổ xưa."
    }
  },
  "堀": {
    "components": ["土", "屈"],
    "equation": "土 (Đất đá đào sâu) + 屈 (Khuất - uốn cong lượn quanh thành)",
    "mnemonic": "Đào rãnh đất uốn lượn (土-屈) dẫn nước bao bọc xung quanh lâu đài chống giặc, hào nước quanh thành.",
    "illustration": {
      "badge": "🏯",
      "concept": "Hào nước quanh thành quách",
      "visualDesc": "Hào nước trong xanh uốn lượn bảo vệ bên ngoài bờ tường thành cổ kính."
    }
  },
  "堅": {
    "components": ["臤", "土"],
    "equation": "臤 (Bàn tay nắm chặt vững vàng) đứng trên nền đất đá cứng cáp (土)",
    "mnemonic": "Đứng vững như bàn thạch trên nền đất cứng (臤-土) không gì lay chuyển nổi, kiên cố, kiên định.",
    "illustration": {
      "badge": "🛡️",
      "concept": "Thành trì kiên cố",
      "visualDesc": "Bức tường thành bằng đá hoa cương vững chãi trước bão táp thời gian."
    }
  },
  "堕": {
    "components": ["阝", "有", "土"],
    "equation": "Đồi đất cao sạt lở (阝-土) sụp đổ trôi tuột xuống vực sâu",
    "mnemonic": "Khối đất trên sườn dốc bị sạt lở rơi ầm ầm xuống vực thẳm sâu hun hút, sa ngã, đoạ lạc, sụp đổ.",
    "illustration": {
      "badge": "🍂",
      "concept": "Chiếc lá rơi rụng sa ngã",
      "visualDesc": "Chiếc lá khô lìa cành chao đảo rơi rụng xuống đất trong chiều thu muộn."
    }
  },
  "堤": {
    "components": ["土", "是"],
    "equation": "土 (Đất đắp) + 是 (Thị - ngay thẳng, chuẩn mực kiên định dưới nắng mặt trời)",
    "mnemonic": "Dải đất đắp cao thẳng tắp kiên định (土-是) ngăn dòng nước lũ tràn vào xóm làng, con đê, đê điều.",
    "illustration": {
      "badge": "🌊",
      "concept": "Con đê chắn sóng",
      "visualDesc": "Con đê bê tông vững chãi chạy dài ngăn sóng biển đánh vào đất liền."
    }
  },
  "堪": {
    "components": ["土", "甚"],
    "equation": "土 (Nền đất) + 甚 (Thậm - sức nặng cực lớn đè xuống)",
    "mnemonic": "Nền đất vững vàng (土) gánh chịu tải trọng cực kỳ nặng nề đè lên mà không lún nứt (甚), kham nổi, chịu đựng.",
    "illustration": {
      "badge": "🏋️",
      "concept": "Sức chịu đựng dẻo dai",
      "visualDesc": "Vận động viên nâng tạ gồng mình chịu đựng khối lượng nặng với ý chí phi thường."
    }
  }
};

const publicDbPath = path.join(__dirname, '../public/kanji_full_database.json');
const rootDbPath = path.join(__dirname, '../kanji_full_database.json');
const jsDbPath = path.join(__dirname, '../kanji_full_database.js');

const db = JSON.parse(fs.readFileSync(publicDbPath, 'utf8'));

let updatedCount = 0;
for (const [char, patch] of Object.entries(n1bData)) {
  if (db[char]) {
    db[char].components = patch.components;
    db[char].equation = patch.equation;
    db[char].mnemonic = patch.mnemonic;
    db[char].illustration = patch.illustration;
    updatedCount++;
  } else {
    console.warn(`Không tìm thấy chữ ${char} trong database!`);
  }
}

// Lưu đồng bộ cả 3 file
fs.writeFileSync(publicDbPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(rootDbPath, JSON.stringify(db, null, 2), 'utf8');
fs.writeFileSync(jsDbPath, `window.KANJI_FULL_DATABASE = ${JSON.stringify(db, null, 2)};\n`, 'utf8');

console.log(`[Batch 5B - N1 Part 2] Đã cập nhật thành công ${updatedCount} / ${Object.keys(n1bData).length} chữ Kanji N1.`);
console.log('Đã lưu thành công cả 3 tệp cơ sở dữ liệu.');
