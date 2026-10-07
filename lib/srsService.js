// Hệ thống ôn tập ngắt quãng Spaced Repetition System (SRS) chuẩn SuperMemo SM-2 rút gọn
// Tự động phân bổ lịch ôn tập tối ưu cho từng chữ Hán

const SRS_STORAGE_KEY = 'project_kanji_srs_data_v1';
const STREAK_STORAGE_KEY = 'project_kanji_daily_streak_v1';
const HISTORY_STORAGE_KEY = 'project_kanji_review_history_v1';

// Các mức đánh giá (Ease Ratings)
export const SRS_GRADES = {
  AGAIN: 1, // Chưa nhớ (Ôn lại sau 10 phút / 0 ngày)
  HARD: 2,  // Khó (Ôn lại sau 1 ngày)
  GOOD: 3,  // Tốt (Ôn lại sau 3-4 ngày)
  EASY: 4,  // Dễ (Ôn lại sau 7-10 ngày)
};

export function getSrsData() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(SRS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveSrsData(data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

/**
 * Xử lý đánh giá 1 thẻ theo thuật toán SRS
 * @param {string} char - Chữ Kanji
 * @param {number} grade - 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
 */
export function recordSrsReview(char, grade) {
  const allData = getSrsData();
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  let item = allData[char] || {
    char,
    reps: 0,
    intervalDays: 0,
    easeFactor: 2.5,
    lastReviewed: 0,
    dueDate: now,
    status: 'new', // 'new' | 'learning' | 'review' | 'mastered'
  };

  if (grade === SRS_GRADES.AGAIN) {
    item.reps = 0;
    item.intervalDays = 0;
    item.dueDate = now + 10 * 60 * 1000; // 10 phút sau
    item.status = 'learning';
    item.easeFactor = Math.max(1.3, item.easeFactor - 0.2);
  } else if (grade === SRS_GRADES.HARD) {
    item.intervalDays = 1;
    item.dueDate = now + 1 * dayMs;
    item.status = 'learning';
    item.easeFactor = Math.max(1.3, item.easeFactor - 0.15);
  } else if (grade === SRS_GRADES.GOOD) {
    item.reps += 1;
    if (item.reps === 1) {
      item.intervalDays = 1;
    } else if (item.reps === 2) {
      item.intervalDays = 3;
    } else {
      item.intervalDays = Math.round(item.intervalDays * item.easeFactor);
    }
    item.dueDate = now + item.intervalDays * dayMs;
    item.status = item.intervalDays >= 14 ? 'mastered' : 'review';
  } else if (grade === SRS_GRADES.EASY) {
    item.reps += 1;
    item.easeFactor += 0.15;
    if (item.reps === 1) {
      item.intervalDays = 4;
    } else {
      item.intervalDays = Math.round((item.intervalDays || 3) * item.easeFactor * 1.3);
    }
    item.dueDate = now + item.intervalDays * dayMs;
    item.status = item.intervalDays >= 14 ? 'mastered' : 'review';
  }

  item.lastReviewed = now;
  allData[char] = item;
  saveSrsData(allData);

  // Ghi nhật ký học tập cho Lịch Heatmap & Streak
  recordDailyActivity();

  return item;
}

/**
 * Lấy danh sách các thẻ đến hạn cần ôn tập hôm nay
 */
export function getDueKanjiList(allKanjiList = []) {
  const allData = getSrsData();
  const now = Date.now();

  const dueChars = [];
  for (const char of allKanjiList) {
    const item = allData[char];
    if (!item) {
      // Chữ chưa học bao giờ (New)
    } else if (item.dueDate <= now) {
      // Chữ đã đến hạn ôn tập
      dueChars.push(char);
    }
  }
  return dueChars;
}

/**
 * Ghi nhận lịch sử học tập từng ngày cho Heatmap
 */
export function recordDailyActivity() {
  if (typeof window === 'undefined') return;

  const todayStr = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

  try {
    // 1. Cập nhật lượt học theo ngày
    const historyRaw = localStorage.getItem(HISTORY_STORAGE_KEY);
    const history = historyRaw ? JSON.parse(historyRaw) : {};
    history[todayStr] = (history[todayStr] || 0) + 1;
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));

    // 2. Cập nhật chuỗi ngày liên tiếp (Streak)
    const streakRaw = localStorage.getItem(STREAK_STORAGE_KEY);
    let streakData = streakRaw ? JSON.parse(streakRaw) : { currentStreak: 0, lastDate: '' };

    if (streakData.lastDate !== todayStr) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (streakData.lastDate === yesterday) {
        streakData.currentStreak += 1;
      } else {
        streakData.currentStreak = 1;
      }
      streakData.lastDate = todayStr;
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(streakData));
    }
  } catch (e) {}
}

/**
 * Lấy thông tin Streak và Lịch sử Heatmap 365 ngày
 */
export function getStudyStats(levelsData = {}) {
  if (typeof window === 'undefined') {
    return { currentStreak: 0, totalReviews: 0, history: {}, levelProgress: {} };
  }

  try {
    const streakRaw = localStorage.getItem(STREAK_STORAGE_KEY);
    const streakData = streakRaw ? JSON.parse(streakRaw) : { currentStreak: 0, lastDate: '' };

    const historyRaw = localStorage.getItem(HISTORY_STORAGE_KEY);
    const history = historyRaw ? JSON.parse(historyRaw) : {};

    const srsData = getSrsData();

    // Tính % hoàn thành từng cấp độ JLPT
    const levelProgress = {};
    let totalMasteredOverall = 0;
    let totalKanjiOverall = 0;

    Object.entries(levelsData).forEach(([lvl, list]) => {
      let masteredCount = 0;
      let learningCount = 0;

      list.forEach((char) => {
        const item = srsData[char];
        if (item) {
          if (item.status === 'mastered') masteredCount++;
          else learningCount++;
        }
      });

      totalMasteredOverall += masteredCount;
      totalKanjiOverall += list.length;

      levelProgress[lvl] = {
        total: list.length,
        mastered: masteredCount,
        learning: learningCount,
        percent: list.length > 0 ? Math.round((masteredCount / list.length) * 100) : 0,
      };
    });

    const totalReviews = Object.values(history).reduce((a, b) => a + b, 0);

    return {
      currentStreak: streakData.currentStreak || 0,
      totalReviews,
      history,
      levelProgress,
      totalMasteredOverall,
      totalKanjiOverall,
    };
  } catch (e) {
    return { currentStreak: 0, totalReviews: 0, history: {}, levelProgress: {} };
  }
}
