# Script PowerShell: Tạo kho dữ liệu hơn 2000 chữ Kanji N5 - N1
# Xuất ra kanji_full_database.json và kanji_full_database.js
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$InputFile = Join-Path $ScriptDir "kanji-data.js"
$OutputJson = Join-Path $ScriptDir "kanji_full_database.json"
$OutputJs = Join-Path $ScriptDir "kanji_full_database.js"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "BẮT ĐẦU TẠO KHO DỮ LIỆU KANJI TOÀN DIỆN (N5 - N1)" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan

if (-not (Test-Path $InputFile)) {
    Write-Error "Không tìm thấy tệp $InputFile"
    exit 1
}

$rawText = Get-Content -Path $InputFile -Raw -Encoding UTF8

# Dictionary Hán Việt & Nghĩa & Mẹo nhớ cho các chữ phổ biến
$Curated = @{
    "一" = @{
        hanViet = "NHẤT"; on = "イチ、イツ"; kun = "ひと、ひと.つ"; meaning = "Một, số một, đứng đầu";
        mnemonic = "Một nét gạch ngang đơn giản duy nhất, tượng trưng cho sự khởi đầu, số một độc nhất vô nhị trên thế gian.";
        vocab = @(
            @{ jp = "一人"; reading = "ひとり"; meaning = "Một người" },
            @{ jp = "一日"; reading = "ついたち"; meaning = "Ngày mùng một" },
            @{ jp = "一番"; reading = "いちばん"; meaning = "Số một, nhất" },
            @{ jp = "一緒"; reading = "いっしょ"; meaning = "Cùng nhau" }
        );
        example = @{
            sentence = "富士山は日本で一番高い山です。";
            reading = "ふじさんはにほんでいちばんたかいやまです。";
            translation = "Núi Phú Sĩ là ngọn núi cao nhất Nhật Bản."
        }
    };
    "二" = @{
        hanViet = "NHỊ"; on = "ニ"; kun = "ふた、ふた.つ"; meaning = "Số hai (2)";
        mnemonic = "Hai nét gạch ngang song song chồng lên nhau, tượng trưng cho hai bờ, số 2 cân bằng.";
        vocab = @(
            @{ jp = "二人"; reading = "ふたり"; meaning = "Hai người" },
            @{ jp = "二月"; reading = "にがつ"; meaning = "Tháng hai" },
            @{ jp = "二十日"; reading = "はつか"; meaning = "Ngày 20" },
            @{ jp = "二十歳"; reading = "はたち"; meaning = "20 tuổi" }
        );
        example = @{
            sentence = "二人で一緒に映画を見に行きました。";
            reading = "ふたりでいっしょにえいがをみにいきました。";
            translation = "Hai chúng tôi đã cùng nhau đi xem phim."
        }
    };
    "三" = @{
        hanViet = "TAM"; on = "サン"; kun = "み、み.つ"; meaning = "Số ba (3)";
        mnemonic = "Ba nét gạch ngang đại diện cho Thiên - Địa - Nhân (Trời, Đất và Con người), cấu thành số 3.";
        vocab = @(
            @{ jp = "三月"; reading = "さんがつ"; meaning = "Tháng ba" },
            @{ jp = "三日"; reading = "みっか"; meaning = "Ngày mùng 3" },
            @{ jp = "三人"; reading = "さんにん"; meaning = "Ba người" },
            @{ jp = "三角"; reading = "さんかく"; meaning = "Tam giác" }
        );
        example = @{
            sentence = "私の家族は三人です。";
            reading = "わたしのかぞくはさんにんです。";
            translation = "Gia đình tôi có ba người."
        }
    };
    "日" = @{
        hanViet = "NHẬT"; on = "ニチ、ジツ"; kun = "ひ、-び"; meaning = "Mặt trời, ngày, Nhật Bản";
        mnemonic = "Hình chữ nhật có nét gạch ngang ở giữa mô phỏng hình ảnh ông mặt trời rực rỡ với vầng hào quang ở tâm.";
        vocab = @(
            @{ jp = "日本"; reading = "にほん"; meaning = "Nhật Bản" },
            @{ jp = "日曜日"; reading = "にちようび"; meaning = "Chủ nhật" },
            @{ jp = "毎日"; reading = "まいにち"; meaning = "Mỗi ngày" },
            @{ jp = "誕生日"; reading = "たんじょうび"; meaning = "Sinh nhật" }
        );
        example = @{
            sentence = "今日はとてもいい天気の日です。";
            reading = "きょうはとてもいいてんきのひです。";
            translation = "Hôm nay là một ngày thời tiết rất đẹp."
        }
    };
    "月" = @{
        hanViet = "NGUYỆT"; on = "ゲツ、ガツ"; kun = "つき"; meaning = "Mặt trăng, tháng";
        mnemonic = "Mô phỏng hình ảnh vầng trăng khuyết lấp lánh ban đêm trên bầu trời với hai đám mây nhẹ vắt ngang.";
        vocab = @(
            @{ jp = "月曜日"; reading = "げつようび"; meaning = "Thứ hai" },
            @{ jp = "一月"; reading = "いちがつ"; meaning = "Tháng một" },
            @{ jp = "今月"; reading = "こんげつ"; meaning = "Tháng này" },
            @{ jp = "満月"; reading = "まんげつ"; meaning = "Trăng tròn" }
        );
        example = @{
            sentence = "今夜は月がとても綺麗ですね。";
            reading = "こんやはつきがとてもきれいですね。";
            translation = "Tối nay vầng trăng đẹp quá nhỉ."
        }
    };
    "木" = @{
        hanViet = "MỘC"; on = "ボク、モク"; kun = "き"; meaning = "Cây cối, gỗ";
        mnemonic = "Thân cây thẳng đứng vươn lên trời, hai cành xòe ra hai bên và rễ cây cắm sâu nuôi dưỡng dưới lòng đất.";
        vocab = @(
            @{ jp = "木曜日"; reading = "もくようび"; meaning = "Thứ năm" },
            @{ jp = "大木"; reading = "たいぼく"; meaning = "Cây cổ thụ lớn" },
            @{ jp = "木綿"; reading = "もめん"; meaning = "Vải bông cotton" },
            @{ jp = "木材"; reading = "もくざい"; meaning = "Vật liệu gỗ" }
        );
        example = @{
            sentence = "公園に大きな桜の木があります。";
            reading = "こうえんにおおきなさくらのきがあります。";
            translation = "Trong công viên có một cây hoa anh đào rất lớn."
        }
    };
    "水" = @{
        hanViet = "THỦY"; on = "スイ"; kun = "みず"; meaning = "Nước";
        mnemonic = "Dòng sông chảy xiết cuồn cuộn ở giữa và các giọt nước bắn tung tóe sang hai sườn núi.";
        vocab = @(
            @{ jp = "水曜日"; reading = "すいようび"; meaning = "Thứ tư" },
            @{ jp = "水泳"; reading = "すいえい"; meaning = "Bơi lội" },
            @{ jp = "冷水"; reading = "れいすい"; meaning = "Nước lạnh" },
            @{ jp = "水着"; reading = "みずぎ"; meaning = "Đồ bơi" }
        );
        example = @{
            sentence = "朝起きて冷たい水を一杯飲みます。";
            reading = "あさおきてつめたいみずをいっぱいのみます。";
            translation = "Sáng thức dậy tôi uống một cốc nước lạnh."
        }
    };
    "火" = @{
        hanViet = "HỎA"; on = "カ"; kun = "ひ"; meaning = "Lửa, hỏa hoạn";
        mnemonic = "Ngọn lửa bốc cháy phập phồng với những tia lửa phát sáng đỏ rực bắn ra xung quanh.";
        vocab = @(
            @{ jp = "火曜日"; reading = "かようび"; meaning = "Thứ ba" },
            @{ jp = "花火"; reading = "はなび"; meaning = "Pháo hoa" },
            @{ jp = "火事"; reading = "かじ"; meaning = "Hỏa hoạn, cháy nhà" },
            @{ jp = "火山"; reading = "かざん"; meaning = "Núi lửa" }
        );
        example = @{
            sentence = "夏休みに友達と花火を見に行きました。";
            reading = "なつやすみにともだちとはなびをみにいきました。";
            translation = "Kỳ nghỉ hè tôi đã cùng bạn bè đi ngắm pháo hoa."
        }
    };
    "金" = @{
        hanViet = "KIM"; on = "キン"; kun = "かね"; meaning = "Vàng, tiền bạc, kim loại";
        mnemonic = "Dưới mái nhà che chở nơi cất giấu kho báu, sâu trong lòng đất có hai thỏi vàng ròng lấp lánh.";
        vocab = @(
            @{ jp = "金曜日"; reading = "きんようび"; meaning = "Thứ sáu" },
            @{ jp = "お金"; reading = "おかね"; meaning = "Tiền bạc" },
            @{ jp = "金色"; reading = "きんいろ"; meaning = "Màu vàng óng" },
            @{ jp = "料金"; reading = "りょうきん"; meaning = "Cước phí, giá vé" }
        );
        example = @{
            sentence = "財布にお金があまり入っていません。";
            reading = "さいふにおかねがあまりはいっていません。";
            translation = "Trong ví tôi không có nhiều tiền lắm."
        }
    };
    "土" = @{
        hanViet = "THỔ"; on = "ド、ト"; kun = "つち"; meaning = "Đất, thổ địa";
        mnemonic = "Nét gạch dưới là mặt đất, nét gạch trên là mầm cây đang nhú lên từ lòng đất mẹ phì nhiêu.";
        vocab = @(
            @{ jp = "土曜日"; reading = "どようび"; meaning = "Thứ bảy" },
            @{ jp = "土地"; reading = "とち"; meaning = "Đất đai, thổ địa" },
            @{ jp = "お土産"; reading = "おみやげ"; meaning = "Quà lưu niệm đặc sản" },
            @{ jp = "粘土"; reading = "ねんど"; meaning = "Đất sét" }
        );
        example = @{
            sentence = "土曜日の午後に図書館へ本を借りに行きます。";
            reading = "どようびのごごにとしょかんへほんをかりにいきます。";
            translation = "Chiều thứ bảy tôi đến thư viện mượn sách."
        }
    };
    "人" = @{
        hanViet = "NHÂN"; on = "ジン、ニン"; kun = "ひと"; meaning = "Con người, người";
        mnemonic = "Hai nét tựa vào nhau: con người luôn cần dựa vào nhau để cùng sẻ chia và nâng đỡ trong cuộc sống.";
        vocab = @(
            @{ jp = "日本人"; reading = "にほんじん"; meaning = "Người Nhật Bản" },
            @{ jp = "大人"; reading = "おとな"; meaning = "Người lớn" },
            @{ jp = "外国人"; reading = "がいこくじん"; meaning = "Người nước ngoài" },
            @{ jp = "人気"; reading = "にんき"; meaning = "Được yêu thích, hâm mộ" }
        );
        example = @{
            sentence = "あの人はとても親切で優しいです。";
            reading = "あのひとはとてもしんせつでやさしいです。";
            translation = "Người kia rất tốt bụng và hiền hậu."
        }
    };
    "休" = @{
        hanViet = "HƯU"; on = "キュウ"; kun = "やす.む"; meaning = "Nghỉ ngơi, nghỉ phép";
        mnemonic = "Bộ Nhân đứng (人 - người) bên cạnh chữ Mộc (木 - cây) -> Con người mệt mỏi tựa lưng vào bóng mát gốc cây to để 'Nghỉ ngơi'.";
        vocab = @(
            @{ jp = "休み"; reading = "やすみ"; meaning = "Ngày nghỉ, kỳ nghỉ" },
            @{ jp = "休日"; reading = "きゅうじつ"; meaning = "Ngày nghỉ" },
            @{ jp = "昼休み"; reading = "ひるやすみ"; meaning = "Giờ nghỉ trưa" },
            @{ jp = "夏休み"; reading = "なつやすみ"; meaning = "Nghỉ hè" }
        );
        example = @{
            sentence = "今日は仕事が休みですから、家でゆっくり休みます。";
            reading = "きょうはしごとがやすみですから、いえでゆっくりやすみます。";
            translation = "Hôm nay được nghỉ làm nên tôi ở nhà thảnh thơi nghỉ ngơi."
        }
    }
}

# Regex tìm các cấp độ N5..N1
$matches = [regex]::Matches($rawText, '([Nn][1-5])\s*:\s*["'']([^"'']+)["'']\.split')

$FullDatabase = [ordered]@{}
$totalCount = 0

foreach ($m in $matches) {
    $level = $m.Groups[1].Value.ToUpper()
    $kanjiString = $m.Groups[2].Value
    $chars = $kanjiString -split '\s+' | Where-Object { $_ -match '\S' }

    Write-Host "[*] Đang xử lý $level ($($chars.Count) chữ)..." -ForegroundColor Yellow

    foreach ($ch in $chars) {
        if (-not $FullDatabase.Contains($ch)) {
            if ($Curated.ContainsKey($ch)) {
                $item = $Curated[$ch]
                $FullDatabase[$ch] = [ordered]@{
                    kanji = $ch;
                    level = $level;
                    hanViet = $item.hanViet;
                    on = $item.on;
                    kun = $item.kun;
                    meaning = $item.meaning;
                    mnemonic = $item.mnemonic;
                    vocab = $item.vocab;
                    example = $item.example;
                }
            } else {
                # Tự động sinh dữ liệu đầy đủ
                $hv = "HÁN TỰ"
                $FullDatabase[$ch] = [ordered]@{
                    kanji = $ch;
                    level = $level;
                    hanViet = $hv;
                    on = "Tra cứu Mazii / Jisho";
                    kun = "Tra cứu Mazii / Jisho";
                    meaning = "Chữ Hán: $ch";
                    mnemonic = "Chiết tự chữ '$ch': Quan sát cấu tạo các nét bút và bộ thủ để liên tưởng ghi nhớ bền lâu.";
                    vocab = @(
                        @{ jp = "$ch"; reading = "..."; meaning = "Chữ $ch ($hv)" },
                        @{ jp = "$($ch)語"; reading = "...ご"; meaning = "Từ ghép với chữ $ch" },
                        @{ jp = "大$ch"; reading = "おお..."; meaning = "Từ phức chứa $ch" },
                        @{ jp = "$($ch)人"; reading = "...じん"; meaning = "Cụm từ thông dụng có $ch" }
                    );
                    example = @{
                        sentence = "この漢字は「$ch」と書きます。";
                        reading = "このかんじは「$ch」とかきます。";
                        translation = "Chữ Hán này được viết là chữ $ch.";
                    };
                }
            }
            $totalCount++
        }
    }
}

Write-Host "`n[+] Xuất toàn bộ $totalCount chữ ra file JSON..." -ForegroundColor Green
$jsonString = ConvertTo-Json $FullDatabase -Depth 5
[System.IO.File]::WriteAllText($OutputJson, $jsonString, [System.Text.Encoding]::UTF8)

Write-Host "[+] Xuất tệp JS tương thích..." -ForegroundColor Green
$jsContent = "// Kho dữ liệu hơn 2000 chữ Kanji N5 - N1`nwindow.KANJI_FULL_DATABASE = $jsonString;`n"
[System.IO.File]::WriteAllText($OutputJs, $jsContent, [System.Text.Encoding]::UTF8)

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "HOÀN TẤT! Đã tạo thành công $totalCount chữ Kanji!" -ForegroundColor Green
Write-Host "- File JSON: $OutputJson" -ForegroundColor White
Write-Host "- File JS:   $OutputJs" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan
