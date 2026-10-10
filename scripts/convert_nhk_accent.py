#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script chuyển đổi database phát âm NHK (ACCDB_unicode.csv)
thành file nhk_pitch_accents.json siêu tinh gọn và tối ưu cho Web.
"""

import csv
import json
import os

def parse_pitch(txt, ac):
    strlen = len(txt)
    acclen = len(ac)
    accent = '0' * (strlen - acclen) + ac
    if '2' in accent:
        return accent.index('2') + 1
    return 0

def kata_to_hira(text):
    return ''.join(chr(ord(c) - 0x60) if 0x30A1 <= ord(c) <= 0x30F6 else c for c in text)

def main():
    csv_path = 'ACCDB_unicode.csv'
    if not os.path.exists(csv_path):
        print(f"Lỗi: Không tìm thấy file {csv_path}")
        return

    print("Đang đọc và xử lý ACCDB_unicode.csv...")
    pitch_map = {}
    total_rows = 0

    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            total_rows += 1
            if len(row) < 19:
                continue

            # row[7]: kanjiexpr (Kanji)
            # row[6]: nhk / kana expression
            # row[15]: midashigo1 (Katakana reading used for accent alignment)
            # row[18]: ac (Binary accent representation)
            kanji = row[7].strip()
            nhk_expr = row[6].strip()
            midashigo1 = row[15].strip()
            ac = row[18].strip()

            if not midashigo1 or not ac:
                continue

            pitch = parse_pitch(midashigo1, ac)
            hira = kata_to_hira(midashigo1)

            # Lưu theo Kanji
            if kanji and kanji not in pitch_map:
                pitch_map[kanji] = pitch

            # Lưu theo Hiragana
            if hira and hira not in pitch_map:
                pitch_map[hira] = pitch

            # Lưu theo dạng Katakana
            if midashigo1 and midashigo1 not in pitch_map:
                pitch_map[midashigo1] = pitch

            # Lưu theo nhk_expr nếu khác
            if nhk_expr and nhk_expr not in pitch_map:
                pitch_map[nhk_expr] = pitch

    print(f"Tổng số dòng CSV đã duyệt: {total_rows}")
    print(f"Tổng số từ vựng độc nhất đã lập chỉ mục: {len(pitch_map)}")

    # Ghi vào cả data/ và public/ để phục vụ linh hoạt
    os.makedirs('data', exist_ok=True)
    out_paths = ['data/nhk_pitch_accents.json', 'public/nhk_pitch_accents.json']

    for p in out_paths:
        with open(p, 'w', encoding='utf-8') as out:
            json.dump(pitch_map, out, ensure_ascii=False, separators=(',', ':'))
        size_mb = os.path.getsize(p) / 1024 / 1024
        print(f"Đã xuất: {p} ({size_mb:.2f} MB)")

if __name__ == '__main__':
    main()
