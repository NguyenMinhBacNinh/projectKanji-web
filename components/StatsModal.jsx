'use client';

import { useMemo } from 'react';
import { getStudyStats } from '../lib/srsService';
import { playWoodClapper } from '../lib/traditionalAudio';

export default function StatsModal({
  isOpen,
  onClose,
  levelsData = {},
}) {
  const stats = useMemo(() => {
    return getStudyStats(levelsData);
  }, [levelsData, isOpen]);

  // Sinh dữ liệu 16 tuần gần nhất cho Heatmap
  const heatmapWeeks = useMemo(() => {
    const weeks = [];
    const today = new Date();
    const history = stats.history || {};

    // 16 tuần gần nhất = 112 ngày
    const totalDays = 16 * 7;
    const days = [];

    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = history[dateStr] || 0;

      days.push({
        date: dateStr,
        count,
        dayOfWeek: d.getDay(),
      });
    }

    // Nhóm thành từng tuần (mỗi tuần 7 ngày)
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }, [stats.history]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl karuta-card border-2 border-border-strong shadow-2xl p-5 sm:p-7 flex flex-col gap-5 text-color-sumi relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="karuta-inner-border" />

        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-washi-border relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-torii">📊</span>
            <div>
              <h3 className="font-black text-lg font-kanji text-torii">
                THỐNG KÊ TIẾN ĐỘ & BẢNG VÀNG HỌC TẬP
              </h3>
              <p className="text-xs opacity-70">
                Theo dõi chuỗi ngày học liên tục và mức độ hoàn thành các cấp độ JLPT
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playWoodClapper();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-washi hover:bg-torii text-color-sumi hover:text-white flex items-center justify-center text-sm font-bold border border-washi-border transition-all"
          >
            ✕
          </button>
        </div>

        {/* Top Key Metrics Cards */}
        <div className="grid grid-cols-3 gap-3 relative z-10">
          <div className="bg-washi/80 p-3 sm:p-4 rounded-2xl border border-washi-border flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl animate-bounce">🔥</span>
            <span className="text-[10px] sm:text-xs font-bold opacity-70 uppercase tracking-wider mt-1">
              Chuỗi Ngày Học
            </span>
            <span className="text-xl sm:text-2xl font-black font-kanji text-amber-600 mt-0.5">
              {stats.currentStreak} Ngày
            </span>
          </div>

          <div className="bg-washi/80 p-3 sm:p-4 rounded-2xl border border-washi-border flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl">📚</span>
            <span className="text-[10px] sm:text-xs font-bold opacity-70 uppercase tracking-wider mt-1">
              Lượt Ôn Tập
            </span>
            <span className="text-xl sm:text-2xl font-black font-kanji text-torii mt-0.5">
              {stats.totalReviews.toLocaleString()}
            </span>
          </div>

          <div className="bg-washi/80 p-3 sm:p-4 rounded-2xl border border-washi-border flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl">💮</span>
            <span className="text-[10px] sm:text-xs font-bold opacity-70 uppercase tracking-wider mt-1">
              Chữ Đã Thuộc
            </span>
            <span className="text-xl sm:text-2xl font-black font-kanji text-emerald-600 mt-0.5">
              {stats.totalMasteredOverall} / {stats.totalKanjiOverall}
            </span>
          </div>
        </div>

        {/* 16-Week Activity Heatmap (GitHub / Duolingo Style) */}
        <div className="bg-washi/70 p-4 rounded-2xl border border-washi-border flex flex-col gap-2.5 relative z-10">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-torii">
              <span>📅</span>
              <span>Lịch Điểm Danh Học Tập (16 tuần gần nhất):</span>
            </span>
            <div className="flex items-center gap-1 text-[10px] opacity-70">
              <span>Ít</span>
              <span className="w-2.5 h-2.5 rounded bg-black/10 dark:bg-white/10" />
              <span className="w-2.5 h-2.5 rounded bg-red-300" />
              <span className="w-2.5 h-2.5 rounded bg-red-500" />
              <span className="w-2.5 h-2.5 rounded bg-torii" />
              <span>Nhiều</span>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="w-full overflow-x-auto pb-1">
            <div className="flex items-center gap-1 min-w-[320px] justify-center sm:justify-start">
              {heatmapWeeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => {
                    let cellBg = 'bg-black/5 dark:bg-white/10';
                    if (day.count >= 15) cellBg = 'bg-torii shadow-xs';
                    else if (day.count >= 6) cellBg = 'bg-red-500 text-white';
                    else if (day.count >= 1) cellBg = 'bg-red-300';

                    return (
                      <div
                        key={dIdx}
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded transition-transform hover:scale-125 cursor-pointer ${cellBg}`}
                        title={`${day.date}: ${day.count} lượt ôn tập`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* JLPT Levels Mastery Progress Bars */}
        <div className="flex flex-col gap-2.5 relative z-10">
          <span className="text-xs font-bold opacity-80 uppercase tracking-wider">
            Tiến độ thuộc chữ theo cấp độ JLPT:
          </span>

          {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => {
            const prog = stats.levelProgress[lvl] || { total: 0, mastered: 0, percent: 0 };

            return (
              <div
                key={lvl}
                className="bg-washi/80 p-2.5 rounded-xl border border-washi-border flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-torii font-kanji">JLPT {lvl}</span>
                  <span className="opacity-80">
                    {prog.mastered} / {prog.total} chữ ({prog.percent}%)
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-torii transition-all duration-700"
                    style={{ width: `${prog.percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-washi-border flex items-center justify-between text-[11px] opacity-65 relative z-10">
          <span>⛩️ Mỗi ngày ôn tập 10-15 chữ để giữ ngọn lửa Streak luôn bốc cháy!</span>
          <button
            onClick={() => {
              playWoodClapper();
              onClose();
            }}
            className="text-torii font-bold hover:underline"
          >
            Đóng ✕
          </button>
        </div>
      </div>
    </div>
  );
}
