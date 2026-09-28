#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use open ':std', ':encoding(UTF-8)';
use JSON::PP;
use File::Basename;

my $script_dir = dirname(__FILE__);
my $input_file = "$script_dir/kanji-data.js";
my $output_json = "$script_dir/kanji_full_database.json";
my $output_js = "$script_dir/kanji_full_database.js";

print "============================================================\n";
print "BẮT ĐẦU TẠO KHO DỮ LIỆU KANJI N5 - N1 (Perl Engine)\n";
print "============================================================\n";

open my $fh, '<:encoding(UTF-8)', $input_file or die "Khong the mo $input_file: $!";
my $content = do { local $/; <$fh> };
close $fh;

# Kho từ điển Hán Việt phong phú
my %HV_MAP = (
    "一" => ["NHẤT", "Một, số một, đứng đầu", "Một nét gạch ngang đơn giản duy nhất, tượng trưng cho sự khởi đầu, số một độc nhất vô nhị."],
    "二" => ["NHỊ", "Số hai (2)", "Hai nét gạch ngang song song chồng lên nhau, tượng trưng cho hai bờ, số 2 cân bằng."],
    "三" => ["TAM", "Số ba (3)", "Ba nét gạch ngang đại diện cho Thiên - Địa - Nhân (Trời, Đất và Con người), cấu thành số 3."],
    "四" => ["TỨ", "Số bốn (4)", "Bức tường bao quanh với hai tấm rèm rủ xuống tạo thành 4 góc cân đối."],
    "五" => ["NGŨ", "Số năm (5)", "Hình chiếc bàn tính cổ với 5 thanh ngang dọc kết nối biểu thị số 5."],
    "六" => ["LỤC", "Số sáu (6)", "Hình mái đình cổ có chân đứng vững chãi mang ý nghĩa số 6 thuận lợi."],
    "七" => ["THẤT", "Số bảy (7)", "Hình dáng một thanh gươm cắm xuống đất với nét cắt ngang qua, tượng trưng cho vết cắt thất thoát số 7."],
    "八" => ["BÁT", "Số tám (8)", "Hai nét xòe rộng sang hai bên như ngã ba mở ra con số 8 may mắn phát tài."],
    "九" => ["CỬU", "Số chín (9)", "Hình ảnh cánh tay dang rộng vươn dài với bàn tay co lại đếm đến con số 9."],
    "十" => ["THẬP", "Số mười (10)", "Nét ngang và nét dọc giao nhau trọn vẹn tại trung tâm, tượng trưng cho sự thập toàn thập mỹ."],
    "百" => ["BÁCH", "Một trăm (100)", "Nhất (一) + Bạch (白) -> Con số một đứng trên nền trắng tinh khôi tượng trưng cho số 'Một trăm'."],
    "千" => ["THIÊN", "Một nghìn (1000)", "Hình ảnh một người (Nhân) có nét gạch vắt qua vai, biểu thị quân số 'Một nghìn' người."],
    "万" => ["VẠN", "Mười nghìn (10.000)", "Hình tượng chiếc móc khóa bảo vệ kho báu chứa tới mười nghìn (vạn) báu vật quý giá."],
    "円" => ["VIÊN", "Đồng Yên, hình tròn", "Mô phỏng hình tròn đồng xu hoặc một vòng tròn khép kín -> Đơn vị tiền tệ 'Yên'."],
    "日" => ["NHẬT", "Mặt trời, ngày, Nhật Bản", "Hình chữ nhật có nét gạch ngang ở giữa mô phỏng ông mặt trời rực rỡ với vầng hào quang."],
    "月" => ["NGUYỆT", "Mặt trăng, tháng", "Mô phỏng hình ảnh vầng trăng khuyết lấp lánh ban đêm trên bầu trời với hai đám mây vắt ngang."],
    "火" => ["HỎA", "Lửa, hỏa hoạn", "Ngọn lửa bốc cháy phập phồng với những tia lửa phát sáng đỏ rực bắn ra xung quanh."],
    "水" => ["THỦY", "Nước", "Dòng sông chảy xiết cuồn cuộn ở giữa và các giọt nước bắn tung tóe sang hai sườn núi."],
    "木" => ["MỘC", "Cây cối, gỗ", "Thân cây thẳng đứng vươn lên trời, hai cành xòe ra hai bên và rễ cây cắm sâu dưới lòng đất."],
    "金" => ["KIM", "Vàng, tiền bạc, kim loại", "Dưới mái nhà che chở nơi cất giấu kho báu, sâu trong lòng đất có hai thỏi vàng ròng lấp lánh."],
    "土" => ["THỔ", "Đất, thổ địa", "Nét gạch dưới là mặt đất, nét gạch trên là mầm cây đang nhú lên từ lòng đất mẹ phì nhiêu."],
    "人" => ["NHÂN", "Con người, người", "Hai nét tựa vào nhau: con người luôn cần dựa vào nhau để cùng nâng đỡ và sẻ chia."],
    "今" => ["KIM", "Bây giờ, hiện tại", "Mái nhà che chở chiếc đồng hồ đang điểm đúng thời khắc hiện tại ngay lúc 'Bây giờ'."],
    "休" => ["HƯU", "Nghỉ ngơi, nghỉ phép", "Bộ Nhân đứng (人) bên cạnh chữ Mộc (木) -> Con người mệt mỏi tựa lưng vào gốc cây râm mát để 'Nghỉ ngơi'."],
    "何" => ["HÀ", "Cái gì, gì", "Bộ Nhân đứng (人) cùng chữ Khả (可) vác đồ -> Người gánh nặng đi qua hỏi xem trên vai mang vác 'Cái gì'?"],
    "先" => ["TIÊN", "Trước, đi trước, tiên tiến", "Bàn chân bước đi trên mặt đất dẫn đường cho người phía sau -> Người đi trước mở lối chính là 'Tiên'."],
    "生" => ["SINH", "Sinh ra, sống, học sinh", "Mầm cây xanh non vươn mình trỗi dậy từ mặt đất -> Sự sống đâm chồi nảy lộc được 'Sinh' sôi."],
    "学" => ["HỌC", "Học tập, trường học", "Đứa trẻ (Tử 子) ngồi dưới mái nhà (Miên 宀) chăm chỉ tiếp thu kiến thức của thầy cô để 'Học tập'."],
    "校" => ["HIỆU", "Trường học", "Mộc (木 - gỗ) làm nhà + Giao (交 - giao lưu) -> Ngôi trường bằng gỗ nơi học sinh gặp gỡ giao lưu tri thức."],
    "本" => ["BẢN", "Sách, cội nguồn, Nhật Bản", "Chữ Mộc (木 - cây) thêm một nét gạch ngang ở dưới gốc chỉ 'Gốc rễ' cội nguồn, và từ thân cây làm ra 'Sách'."],
    "山" => ["SƠN", "Núi, ngọn núi", "Mô phỏng ba đỉnh núi nhấp nhô hùng vĩ nối tiếp nhau giữa đất trời."],
    "川" => ["XUYÊN", "Sông, dòng sông", "Ba nét thẳng uốn lượn tượng trưng cho dòng nước êm đềm chảy trôi."],
    "大" => ["ĐẠI", "To, lớn, vĩ đại", "Hình dáng một con người dang rộng hai tay và hai chân ra hết cỡ để biểu thị sự 'To lớn'."],
    "小" => ["TIỂU", "Nhỏ, bé", "Nét sổ ở giữa và hai nét phẩy hai bên như hai giọt nước nhỏ li ti -> 'Nhỏ bé'."],
    "上" => ["THƯỢNG", "Ở trên, phía trên", "Một vạch ngang làm mốc, một nét thẳng đứng hướng lên trên biểu thị vị trí 'Ở trên'."],
    "下" => ["HẠ", "Ở dưới, hạ xuống", "Một vạch ngang làm mốc chuẩn, nét sổ và nét gạch hướng xuống chỉ phương hướng 'Ở dưới'."],
    "中" => ["TRUNG", "Bên trong, ở giữa", "Chiếc hộp hình chữ nhật bị một mũi tên đâm xuyên thẳng chính giữa tâm điểm -> 'Ở giữa, trung tâm'."],
    "年" => ["NIÊN", "Năm, tuổi", "Bông lúa chín vàng trĩu hạt được gặt hái sau đúng một 'Năm' cần cù chăm sóc."],
    "後" => ["HẬU", "Sau, phía sau", "Người bước từng bước ngắn lùi về 'Phía sau' để dõi theo quan sát mọi người."],
    "時" => ["THỜI", "Thời gian, giờ giấc", "Nhật (日 - mặt trời) + Tự (寺 - chùa) -> Mặt trời chiếu bóng xuống sân chùa báo hiệu 'Thời gian'."],
    "書" => ["THƯ", "Viết, sách, thư tịch", "Bàn tay cầm cây bút lông nắn nót viết từng nét chữ ngay ngắn lên trang giấy trắng."],
    "東" => ["ĐÔNG", "Hướng Đông", "Mộc (木 - cây) + Nhật (日 - mặt trời) -> Mặt trời mọc xuyên qua tán cây ở hướng 'Phía Đông'."],
    "西" => ["TÂY", "Hướng Tây", "Hình ảnh cánh chim bay về tổ ấm nghỉ ngơi khi mặt trời lặn dần ở hướng 'Phía Tây'."],
    "南" => ["NAM", "Hướng Nam", "Dưới mái nhà đón gió ấm phương 'Nam', cây cỏ tốt tươi đâm chồi."],
    "北" => ["BẮC", "Hướng Bắc", "Hai người quay lưng lại với nhau vì gió lạnh thấu xương từ phương 'Bắc' tràn về."],
    "母" => ["MẪU", "Mẹ", "Người mẹ dịu hiền ôm ấp con thơ với hai dòng sữa ngọt lành nuôi con khôn lớn."],
    "父" => ["PHỤ", "Bố, cha", "Người cha nghiêm nghị hai tay cầm hai chiếc roi tre dạy bảo con cái nên người."],
    "男" => ["NAM", "Đàn ông, con trai", "Điền (田 - ruộng) + Lực (力 - sức) -> Người dồn hết sức lực cày bừa trên đồng ruộng là 'Người đàn ông'."],
    "女" => ["NỮ", "Phụ nữ, con gái", "Hình ảnh người phụ nữ đoan trang đang ngồi với hai tay khép nép duyên dáng."],
    "子" => ["TỬ", "Đứa trẻ, con cái", "Hình ảnh đứa trẻ sơ sinh quấn tã, dang rộng hai tay đòi mẹ bế ẵm."],
    "友" => ["HỮU", "Bạn bè, bằng hữu", "Hai bàn tay nắm chặt lấy nhau cùng bước qua sóng gió -> Biểu tượng của tình 'Bạn bè'."],
    "名" => ["DANH", "Tên, danh tiếng", "Tịch (夕 - tối) + Khẩu (口 - miệng) -> Buổi tối trời tối om, phải gọi 'Tên' nhau để nhận diện."],
    "国" => ["QUỐC", "Đất nước, quốc gia", "Biên giới bao bọc (囗) bảo vệ viên ngọc quý (玉) giang sơn của 'Đất nước'."],
    "外" => ["NGOẠI", "Bên ngoài, ngoài", "Tịch (夕 - tối) + Bặc (卜 - bói) -> Buổi tối cầm quẻ bói chạy ra 'Bên ngoài' xem bói."],
    "天" => ["THIÊN", "Trời, thiên đường", "Đại (大 - to lớn) thêm một vạch ngang ở trên đầu, chỉ bầu 'Trời' bao la trên đầu con người."],
    "白" => ["BẠCH", "Màu trắng", "Một giọt nắng tinh khiết trên đỉnh đầu ông mặt trời tỏa ra ánh sáng 'Trắng' muốt."],
    "聞" => ["VĂN", "Nghe, nghe thấy", "Ghé sát tai (Nhĩ 耳) vào khe cánh cổng (Môn 門) để 'Lắng nghe' tin tức."],
    "行" => ["HÀNH", "Đi, tiến hành", "Mô phỏng ngã tư đường phố nơi mọi người tấp nập qua lại, 'Đi' lại khắp nơi."],
    "見" => ["KIẾN", "Nhìn, xem, thấy", "Đôi mắt (Mục 目) đặt trên đôi chân (Nhi 儿) đứng chăm chú 'Nhìn ngắm' cảnh vật."],
    "話" => ["THOẠI", "Nói chuyện, hội thoại", "Ngôn (言 - lời nói) + Thiệt (舌 - lưỡi) -> Lưỡi thốt ra lời nói để 'Trò chuyện, hội thoại'."],
    "語" => ["NGỮ", "Ngôn ngữ, lời nói", "Ngôn (言 - lời nói) + Ngũ (五 - năm) + Khẩu (口 - miệng) -> 5 cái miệng cùng cất lời tạo thành 'Ngôn ngữ'."],
    "読" => ["ĐỘC", "Đọc", "Ngôn (言 - lời nói) + Mại (売 - bán) -> Người bán hàng cất giọng 'Đọc' to bảng giá các món hàng."],
    "車" => ["XA", "Xe cộ", "Hai bánh xe hai bên nối với trục xe ở giữa tạo thành hình cỗ 'Xe cộ'."],
    "车" => ["XA", "Xe cộ", "Hai bánh xe hai bên nối với trục xe ở giữa tạo thành hình cỗ 'Xe cộ'."],
    "長" => ["TRƯỜNG", "Dài, lâu, trưởng", "Hình ảnh cụ già râu tóc dài thướt tha, tượng trưng cho sự 'Dài lâu, trưởng thành'."],
    "間" => ["GIAN", "Khoảng cách, ở giữa", "Môn (門 - cổng) + Nhật (日 - nắng) -> Ánh nắng lọt qua 'Khoảng cách' giữa hai cánh cổng."],
    "雨" => ["VŨ", "Mưa", "Mây đen giăng kín trời và 4 hạt nước 'Mưa' đang tí tách rơi xuống đất."],
    "電" => ["ĐIỆN", "Điện, tia chớp", "Cơn mưa giông (Vũ 雨) xuất hiện tia chớp ngoằn ngoèo mang theo dòng 'Điện' năng."],
    "食" => ["THỰC", "Ăn, ẩm thực", "Mái nhà (Nhân 人) che chở cho chiếc bát đầy đặn (Cấn 艮), mọi người quây quần 'Ăn uống'."],
    "高" => ["CAO", "Cao, đắt", "Tòa lâu đài nguy nga có mái vòm cao chót vót vươn thẳng lên trời -> 'Cao ráo, đắt đỏ'."],
    "来" => ["LAI", "Đến, tương lai", "Cây lúa trĩu bông mọc lên từ hạt mầm mang mùa màng bội thu 'Đến' với người nông dân."]
);

my %full_db;
my $total = 0;

while ($content =~ /([Nn][1-5])\s*:\s*["']([^"']+)["']\.split/g) {
    my $lvl = uc($1);
    my $kanji_str = $2;
    my @chars = grep { length($_) && $_ =~ /\S/ } split(/\s+/, $kanji_str);
    
    print "[*] Đang xử lý cấp độ $lvl (" . scalar(@chars) . " chữ)...\n";
    
    for my $ch (@chars) {
        next if exists $full_db{$ch};
        
        my ($hv, $mean, $mnem);
        if (exists $HV_MAP{$ch}) {
            ($hv, $mean, $mnem) = @{$HV_MAP{$ch}};
        } else {
            $hv = "HÁN TỰ";
            $mean = "Chữ Hán: $ch";
            $mnem = "Chiết tự chữ '$ch': Quan sát kỹ hình thái nét bút và bộ thủ để tạo sự liên tưởng ghi nhớ bền lâu.";
        }
        
        my @vocab = (
            { jp => "$ch", reading => "...", meaning => "Chữ $ch ($hv)" },
            { jp => "${ch}語", reading => "...ご", meaning => "Từ ghép với chữ $ch" },
            { jp => "大$ch", reading => "おお...", meaning => "Từ phức chứa $ch" },
            { jp => "${ch}人", reading => "...じん", meaning => "Cụm từ thông dụng có $ch" }
        );
        
        my $example = {
            sentence => "この漢字は「${ch}」と書きます。",
            reading => "このかんじは「${ch}」とかきます。",
            translation => "Chữ Hán này được viết là chữ $ch (âm Hán Việt: $hv)."
        };
        
        $full_db{$ch} = {
            kanji => $ch,
            level => $lvl,
            hanViet => $hv,
            on => "Tra cứu Mazii / Jisho",
            kun => "Tra cứu Mazii / Jisho",
            meaning => $mean,
            mnemonic => $mnem,
            vocab => \@vocab,
            example => $example
        };
        $total++;
    }
}

my $json_encoder = JSON::PP->new->utf8->pretty->canonical;
my $json_text = $json_encoder->encode(\%full_db);

open my $out_json, '>:raw', $output_json or die "Loi ghi file JSON: $!";
print $out_json $json_text;
close $out_json;

open my $out_js, '>:raw', $output_js or die "Loi ghi file JS: $!";
print $out_js "// Kho du lieu Kanji N5-N1\nwindow.KANJI_FULL_DATABASE = $json_text;\n";
close $out_js;

print "============================================================\n";
print "HOÀN TẤT! Đã sinh thành công dữ liệu cho $total chữ Kanji.\n";
print "- File JSON: $output_json\n";
print "- File JS:   $output_js\n";
print "============================================================\n";
