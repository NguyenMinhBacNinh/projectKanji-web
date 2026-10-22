// Tổng hợp 210 mục Chào hỏi & Giao tiếp cho toàn bộ 5 cấp độ JLPT (N5 - N1)
const N5 = require('./greetings_n5');
const N4 = require('./greetings_n4');
const N3 = require('./greetings_n3');
const N2 = require('./greetings_n2');
const N1 = require('./greetings_n1');

const ALL_GREETINGS = [
  ...N5,
  ...N4,
  ...N3,
  ...N2,
  ...N1
];

module.exports = {
  N5,
  N4,
  N3,
  N2,
  N1,
  ALL_GREETINGS
};
