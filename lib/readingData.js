// Dữ liệu Đọc hiểu Dokkai JLPT (Tổng hợp 150 bài: N5, N4, N3, N2, N1) kèm Furigana, dịch nghĩa và trắc nghiệm

import { READING_N5 } from './readingDataN5';
import { READING_N4 } from './readingDataN4';
import { READING_N3 } from './readingDataN3';
import { READING_N2 } from './readingDataN2';
import { READING_N1 } from './readingDataN1';

export { READING_N5, READING_N4, READING_N3, READING_N2, READING_N1 };

export const READING_DATA_BY_LEVEL = {
  N5: READING_N5,
  N4: READING_N4,
  N3: READING_N3,
  N2: READING_N2,
  N1: READING_N1,
};

export const READING_ARTICLES = [
  ...READING_N5,
  ...READING_N4,
  ...READING_N3,
  ...READING_N2,
  ...READING_N1,
];
