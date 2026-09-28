#!/usr/bin/env perl
# ==============================================================================
# Tool tự động trích xuất và nhập từ vựng (Vocabulary) từ JMdict cho Kanji Database
# Dữ liệu nguồn: JMdict (EDRDG - Japanese-Multilingual Dictionary)
# ==============================================================================

use strict;
use warnings;
no warnings 'once';
use utf8;
use open ':std', ':encoding(UTF-8)';
use JSON::PP;
use File::Basename;
use Getopt::Long;
use Encode qw(decode);

binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');
$| = 1;

# Giải mã tham số dòng lệnh từ UTF-8 (đặc biệt trên môi trường Windows)
@ARGV = map { eval { decode('UTF-8', $_) } || $_ } @ARGV;

# Cấu hình đường dẫn
my $SCRIPT_DIR = dirname(__FILE__);
my $PROJECT_ROOT = "$SCRIPT_DIR/..";
my $JMDICT_XML = "$PROJECT_ROOT/data/JMdict_e.xml";
my $JMDICT_GZ = "$PROJECT_ROOT/data/JMdict_e.gz";
my $KANJI_DATA_FILE = "$PROJECT_ROOT/kanji-data.js";
my $DB_JSON_FILE = "$PROJECT_ROOT/kanji_full_database.json";
my $DB_JS_FILE = "$PROJECT_ROOT/kanji_full_database.js";

# Tham số dòng lệnh
my $opt_kanji = '';
my $opt_level = '';
my $opt_all = 0;
my $opt_count = 4;
my $opt_dry_run = 0;
my $opt_help = 0;

GetOptions(
    'kanji=s'   => \$opt_kanji,
    'level=s'   => \$opt_level,
    'all'       => \$opt_all,
    'count=i'   => \$opt_count,
    'dry-run'   => \$opt_dry_run,
    'help'      => \$opt_help
) or die "Lỗi tham số dòng lệnh. Dùng --help để xem hướng dẫn.\n";

# Hỗ trợ mã Unicode hex nếu người dùng truyền (ví dụ: U+5B66 hoặc 5B66)
if ($opt_kanji && $opt_kanji =~ /^(?:U\+|0x)?([0-9A-Fa-f]{4,5})$/) {
    $opt_kanji = chr(hex($1));
}

if ($opt_help) {
    print << "HELP";
Cách sử dụng:
  perl scripts/importVocabularyFromJMdict.pl [options]

Tùy chọn:
  --kanji <chữ>    Chỉ xử lý 1 chữ Kanji cụ thể (ví dụ: --kanji 学)
  --level <cấp>    Xử lý tất cả Kanji trong 1 cấp độ JLPT (N5, N4, N3, N2, N1)
  --all            Xử lý toàn bộ Kanji trong database (tất cả các cấp)
  --count <số>     Số lượng từ vựng cần lấy cho mỗi Kanji (mặc định: 4)
  --dry-run        Chỉ tìm kiếm và in kết quả, KHÔNG ghi vào database
  --help           Hiển thị trợ giúp này

Ví dụ:
  perl scripts/importVocabularyFromJMdict.pl --kanji 学
  perl scripts/importVocabularyFromJMdict.pl --kanji 学 --dry-run
HELP
    exit 0;
}

# Nếu không truyền tùy chọn nào, mặc định chạy thử với chữ '学'
if (!$opt_kanji && !$opt_level && !$opt_all) {
    $opt_kanji = '学';
    print "[*] Không có tham số chỉ định, mặc định chạy thử với Kanji: 学\n";
}

print "[DEBUG] Bat dau script\n";
# 1. Kiểm tra và giải nén tệp JMdict nếu cần
if (!-f $JMDICT_XML) {
    if (-f $JMDICT_GZ) {
        print "[*] Đang giải nén JMdict_e.gz...\n";
        require IO::Uncompress::Gunzip;
        IO::Uncompress::Gunzip::gunzip($JMDICT_GZ => $JMDICT_XML)
            or die "Lỗi giải nén $JMDICT_GZ: $IO::Uncompress::Gunzip::GunzipError\n";
        print "[✓] Đã giải nén thành công: $JMDICT_XML\n";
    } else {
        die "Lỗi: Không tìm thấy tệp từ điển $JMDICT_XML hoặc $JMDICT_GZ trong thư mục data/!\n";
    }
}
print "[DEBUG] JMdict XML exists\n";

# 2. Đọc bảng cấp độ Kanji từ kanji-data.js
my %kanji_level_map;
if (-f $KANJI_DATA_FILE) {
    open my $kfh, '<:encoding(UTF-8)', $KANJI_DATA_FILE or die "Không thể đọc $KANJI_DATA_FILE: $!\n";
    my $content = do { local $/; <$kfh> };
    close $kfh;
    while ($content =~ /([Nn][1-5])\s*:\s*["']([^"']+)["']/g) {
        my $lvl = uc($1);
        my @chars = split(/\s+/, $2);
        for my $c (@chars) {
            $kanji_level_map{$c} = $lvl if length($c);
        }
    }
}
print "[DEBUG] Da doc kanji-data.js (" . scalar(keys %kanji_level_map) . " chu)\n";

# 3. Đọc database hiện tại từ kanji_full_database.json
if (!-f $DB_JSON_FILE) {
    die "Lỗi: Không tìm thấy database $DB_JSON_FILE!\n";
}
open my $dbfh, '<:raw', $DB_JSON_FILE or die "Không thể đọc $DB_JSON_FILE: $!\n";
my $db_raw = do { local $/; <$dbfh> };
close $dbfh;

my $json_coder = JSON::PP->new->utf8->pretty->canonical;
my $database = decode_json($db_raw);
print "[DEBUG] Da doc database (" . scalar(keys %$database) . " entries)\n";

# 4. Xác định danh sách Kanji mục tiêu cần xử lý
my @target_kanji_list;
if ($opt_kanji) {
    # Kiểm tra Kanji có tồn tại trong database không
    if (!exists $database->{$opt_kanji}) {
        die "Lỗi: Chữ Kanji '$opt_kanji' không tồn tại trong database hiện tại. Script chỉ thêm vocabulary vào Kanji đã tồn tại!\n";
    }
    push @target_kanji_list, $opt_kanji;
} elsif ($opt_level) {
    my $target_lvl = uc($opt_level);
    for my $k (sort keys %$database) {
        my $lvl = $database->{$k}{level} || $kanji_level_map{$k} || '';
        if (uc($lvl) eq $target_lvl) {
            push @target_kanji_list, $k;
        }
    }
    print "[*] Tìm thấy " . scalar(@target_kanji_list) . " chữ Kanji thuộc cấp độ $target_lvl.\n";
} elsif ($opt_all) {
    @target_kanji_list = sort keys %$database;
    print "[*] Chế độ toàn bộ: xử lý " . scalar(@target_kanji_list) . " chữ Kanji.\n";
}

# 5. Hàm trích xuất và xếp hạng vocabulary từ JMdict cho 1 Kanji
sub extract_vocabulary_for_kanji {
    my ($target_char, $target_level) = @_;

    print "[DEBUG] Bat dau quet JMdict cho $target_char...\n";
    open my $fh, '<:encoding(UTF-8)', $JMDICT_XML or die "Không thể mở $JMDICT_XML: $!\n";

    my $entry_str = '';
    my @candidates;
    my $entries_checked = 0;

    while (my $line = <$fh>) {
        if ($line =~ /<entry>/) {
            $entry_str = $line;
        } elsif (length($entry_str)) {
            $entry_str .= $line;
            if ($line =~ /<\/entry>/) {
                $entries_checked++;
                # Kiểm tra entry có chứa chữ Kanji mục tiêu không
                if ($entry_str =~ /<keb>[^<]*\Q$target_char\E[^<]*<\/keb>/) {
                    my @kebs;
                    while ($entry_str =~ /<keb>(.*?)<\/keb>/g) {
                        push @kebs, $1;
                    }

                    my @ke_pris;
                    while ($entry_str =~ /<ke_pri>(.*?)<\/ke_pri>/g) {
                        push @ke_pris, $1;
                    }

                    my @rebs;
                    while ($entry_str =~ /<reb>(.*?)<\/reb>/g) {
                        push @rebs, $1;
                    }

                    my @re_pris;
                    while ($entry_str =~ /<re_pri>(.*?)<\/re_pri>/g) {
                        push @re_pris, $1;
                    }

                    my @glosses;
                    while ($entry_str =~ /<gloss>(.*?)<\/gloss>/g) {
                        push @glosses, $1;
                    }

                    my @miscs;
                    while ($entry_str =~ /<misc>&(arch|rare|obsc|sl|col|id|yojik|sens|obs|vulg);<\/misc>/g) {
                        push @miscs, $1;
                    }

                    my %all_pri = map { $_ => 1 } (@ke_pris, @re_pris);

                    for my $k (@kebs) {
                        next unless $k =~ /\Q$target_char\E/;

                        # Lấy reading đầu tiên phù hợp
                        my $reading = $rebs[0] || '';
                        next unless length($reading);

                        # English gloss rút gọn
                        my $gloss = join('; ', @glosses[0 .. ($#glosses > 2 ? 2 : $#glosses)]);
                        $gloss =~ s/\s+/ /g;
                        $gloss =~ s/^\s+|\s+$//g;

                        push @candidates, {
                            word => $k,
                            reading => $reading,
                            pri => [keys %all_pri],
                            gloss => $gloss,
                            misc => \@miscs
                        };
                        last; # Lấy 1 dạng keb tiêu biểu của mỗi entry
                    }
                }
                $entry_str = '';
            }
        }
    }
    close $fh;
    print "[DEBUG] Da doc xong XML ($entries_checked entries), tim thay " . scalar(@candidates) . " ung vien\n";

    # 6. Thuật toán xếp hạng từ vựng (Scoring & Priority Ranking)
    for my $c (@candidates) {
        my $score = 0;
        my $word = $c->{word};

        # (A) Điểm ưu tiên dựa trên tag tần suất của JMdict
        my $has_pri = 0;
        my $nf_val = 999;
        for my $p (@{$c->{pri}}) {
            if ($p eq 'ichi1') { $score += 60; $has_pri = 1; }
            elsif ($p eq 'news1') { $score += 50; $has_pri = 1; }
            elsif ($p eq 'spec1') { $score += 40; $has_pri = 1; }
            elsif ($p eq 'ichi2') { $score += 25; $has_pri = 1; }
            elsif ($p eq 'news2') { $score += 20; $has_pri = 1; }
            elsif ($p =~ /^nf(\d{2})$/) {
                $nf_val = int($1);
                $score += (50 - $nf_val) * 2; # nf01 -> +98 điểm, nf25 -> +50 điểm
                $has_pri = 1;
            }
        }

        # Từ không có tag ưu tiên nào bị trừ điểm để tránh từ hiếm/chuyên ngành
        unless ($has_pri) {
            $score -= 100;
        }

        # (B) Cấu trúc từ vựng tiếng Nhật
        my @chars = split(//, $word);
        my $kanji_count = grep { /\p{Han}/ } @chars;
        my $kana_count = grep { /\p{Hiragana}|\p{Katakana}/ } @chars;

        # Từ gốc kun-yomi: 1 chữ Kanji + okurigana (ví dụ: 学ぶ, 行く, 食べる, 大きい)
        # Đây là từ vựng nền tảng quan trọng hàng đầu trong giảng dạy tiếng Nhật
        if ($kanji_count == 1 && $kana_count > 0 && $chars[0] eq $target_char) {
            $score += 150;
        }

        # Từ ghép 2 chữ Kanji (thể thức phổ biến và chuẩn mực nhất)
        if ($kanji_count == 2 && $kana_count == 0) {
            $score += 40;
        } elsif ($kanji_count == 3 && $kana_count == 0) {
            $score -= 15;
        } elsif ($kanji_count >= 4) {
            $score -= 50; # Tránh từ ghép quá dài, phức tạp (ví dụ: 大学院生, 小学校長)
        }

        # (C) Mức độ phù hợp với trình độ người học (JLPT level của chữ đi kèm)
        my $all_target_tier = 1;
        for my $ch (@chars) {
            next unless $ch =~ /\p{Han}/;
            next if $ch eq $target_char;
            my $ch_lvl = $kanji_level_map{$ch} || 'UNKNOWN';

            if ($target_level eq 'N5' || $target_level eq 'N4') {
                if ($ch_lvl eq 'N5') {
                    $score += 30; # Ghép với chữ N5 khác -> cực kỳ phù hợp cho người học cơ bản
                } elsif ($ch_lvl eq 'N4') {
                    $score += 10;
                    $all_target_tier = 0;
                } elsif ($ch_lvl eq 'N3') {
                    $score -= 15;
                    $all_target_tier = 0;
                } elsif ($ch_lvl eq 'N2') {
                    $score -= 35;
                    $all_target_tier = 0;
                } elsif ($ch_lvl eq 'N1') {
                    $score -= 55;
                    $all_target_tier = 0;
                } else {
                    $score -= 80;
                    $all_target_tier = 0;
                }
            } else {
                # Đối với cấp độ cao hơn (N3-N1), cộng điểm nếu chữ đi kèm nằm trong Joyo
                if ($ch_lvl =~ /^N[1-5]$/) {
                    $score += 15;
                } else {
                    $score -= 50;
                }
            }
        }

        if ($all_target_tier && $kanji_count >= 1) {
            $score += 25;
        }

        # (D) Tránh từ hiếm, cổ xưa, thô tục, tiếng lóng
        if (@{$c->{misc}}) {
            $score -= 60;
        }

        $c->{score} = $score;
        $c->{nf} = $nf_val;
    }

    # Sắp xếp giảm dần theo điểm số
    my @sorted = sort { $b->{score} <=> $a->{score} } @candidates;

    # Loại bỏ duplicate trùng từ (word) hoặc trùng cách đọc (reading)
    my %seen_word;
    my @selected;
    for my $c (@sorted) {
        next if $seen_word{$c->{word}};
        $seen_word{$c->{word}} = 1;
        push @selected, $c;
        last if scalar(@selected) >= $opt_count;
    }

    return (\@candidates, \@sorted, \@selected);
}

# 7. Tiến hành xử lý cho từng Kanji
my $total_updated = 0;

for my $target_char (@target_kanji_list) {
    my $target_level = $database->{$target_char}{level} || $kanji_level_map{$target_char} || 'N5';

    print "\n==================================================\n";
    print "Kanji: $target_char\n";
    print "Level: $target_level\n";

    my ($all_cand_ref, $sorted_ref, $selected_ref) = extract_vocabulary_for_kanji($target_char, $target_level);

    print "Candidates found: " . scalar(@$all_cand_ref) . "\n";
    print "--------------------------------------------------\n";
    print "Top 10 Candidates:\n";
    for my $i (0 .. 9) {
        last if $i >= @$sorted_ref;
        my $c = $sorted_ref->[$i];
        my $pri_str = join(',', @{$c->{pri}});
        print sprintf("  %2d. %s (%s) [Score: %3d, nf: %2d, pri: %s] -> %s\n",
            $i + 1, $c->{word}, $c->{reading}, $c->{score}, $c->{nf}, $pri_str, $c->{gloss});
    }

    print "--------------------------------------------------\n";
    print "Selected:\n";
    my @new_vocab_entries;
    for my $i (0 .. $#$selected_ref) {
        my $c = $selected_ref->[$i];
        print sprintf("  %d. %s（%s）: %s\n", $i + 1, $c->{word}, $c->{reading}, $c->{gloss});

        push @new_vocab_entries, {
            word        => $c->{word},
            reading     => $c->{reading},
            meaning     => $c->{gloss},
            meaning_vi  => $c->{gloss},
            jp          => $c->{word}
        };
    }

    # 8. Cập nhật vào database nếu không phải dry-run
    if (!$opt_dry_run) {
        # Đảm bảo không ghi đè mất các trường dữ liệu hiện tại (hanViet, meaning, mnemonic, example...)
        # Chỉ cập nhật mảng vocab
        $database->{$target_char}{vocab} = \@new_vocab_entries;
        $total_updated++;
    }
}

# 9. Ghi lại dữ liệu vào tệp database nếu có thay đổi
if (!$opt_dry_run && $total_updated > 0) {
    print "\n==================================================\n";
    print "ĐANG CẬP NHẬT DATABASE...\n";

    # Ghi file JSON
    my $json_output = $json_coder->encode($database);
    open my $out_json, '>:raw', $DB_JSON_FILE or die "Không thể ghi $DB_JSON_FILE: $!\n";
    print $out_json $json_output;
    close $out_json;
    print "[✓] Đã lưu database JSON: $DB_JSON_FILE\n";

    # Ghi file JS (window.KANJI_FULL_DATABASE)
    open my $out_js, '>:raw', $DB_JS_FILE or die "Không thể ghi $DB_JS_FILE: $!\n";
    print $out_js "// Kho du lieu Kanji N5-N1\n";
    print $out_js "window.KANJI_FULL_DATABASE = $json_output;\n";
    close $out_js;
    print "[✓] Đã lưu database JS:   $DB_JS_FILE\n";

    print "==================================================\n";
    print "HOÀN TẤT CẬP NHẬT CHO $total_updated CHỮ KANJI!\n";
} elsif ($opt_dry_run) {
    print "\n[*] Chế độ DRY-RUN: Không có dữ liệu nào bị thay đổi trong database.\n";
}

print "==================================================\n";
