// Trình phát âm thanh truyền thống Nhật Bản tổng hợp trực tiếp bằng Web Audio API
// Không cần tải file mp3 bên ngoài, phản hồi tức thì và không bị lỗi mạng

let audioCtx = null;
let isAudioMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setAudioMuted(muted) {
  isAudioMuted = muted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('project_kanji_audio_muted', muted ? '1' : '0');
  }
}

export function getAudioMuted() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('project_kanji_audio_muted') === '1';
  }
  return false;
}

// 1. Tiếng gõ mõ gỗ truyền thống Mokugyo (木魚) hoặc phách gỗ Hyoshigi khi lật thẻ
export function playWoodClapper() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Oscillator tạo âm gõ gỗ trầm
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

  // Bộ lọc tạo tiếng rỗng của thân gỗ
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);
  filter.Q.setValueAtTime(3, now);

  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.13);
}

// 2. Tiếng chuông khánh đền chùa Nhật Bản (Rin / Shō / 鈴) ngân nga khi hoàn thành / thuộc chữ
export function playTempleBell() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const baseFreqs = [528, 1056, 1584, 2112]; // Hài âm chuông đồng
  const gains = [0.35, 0.18, 0.08, 0.04];

  baseFreqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq + (idx === 0 ? 0 : Math.random() * 4 - 2), now);

    gain.gain.setValueAtTime(gains[idx], now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.0);
  });
}

// 3. Tiếng giọt nước bồn đá Suikinkutsu (水琴窟) nhẹ nhàng khi bấm nút
export function playWaterDrop() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(1760, now + 0.05);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.26);
}

// 4. Âm thanh trả lời trắc nghiệm đúng (Thang âm ngũ cung Nhật Bản In-sen)
export function playQuizSuccess() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [587.33, 659.25, 880]; // D5, E5, A5

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.09);

    gain.gain.setValueAtTime(0, now);
    gain.gain.setValueAtTime(0.2, now + i * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.09);
    osc.stop(now + i * 0.09 + 0.65);
  });
}

// 5. Âm thanh trả lời trắc nghiệm sai (Trầm nhẹ, không chói tai)
export function playQuizError() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

  // Lọc tần số cao để âm thanh trầm ấm như tiếng gỗ
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(350, now);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.32);
}

// 6. Tiếng trống Taiko (太鼓) dồn dập khích lệ khi đạt chuỗi hoặc ghi điểm lớn
export function playTaikoDrum() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Lớp 1: Tiếng dùi gõ vào mặt trống (Thump)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.28);

  gain.gain.setValueAtTime(0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.36);
}

// 7. Tiếng đóng dấu triện đỏ Hanko (判子) đanh thép, dứt khoát
export function playHankoStamp() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Lớp va đập đanh (Click)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(420, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

  gain.gain.setValueAtTime(0.6, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}

// 8. Nhạc nền Thiền Định Zen & Đàn tranh Koto cổ truyền (Web Audio API Synthesizer)
let isZenPlaying = false;
let zenTimer = null;

// Thang âm ngũ cung cổ truyền Nhật Bản Hirajoshi (平調子)
const HIRAJOSHI_FREQS = [
  220.00, // A3
  246.94, // B3
  261.63, // C4
  329.63, // E4
  349.23, // F4
  440.00, // A4
  493.88, // B4
  523.25, // C5
  659.25, // E5
  698.46, // F5
];

function playKotoStringPluck(ctx, freq, delay = 0) {
  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // Đàn tranh Koto có âm thanh dây gảy sắc nét rồi ngân vang ấm áp
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, now);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1400, now);
  filter.frequency.exponentialRampToValueAtTime(300, now + 2.0);

  gain.gain.setValueAtTime(0, now);
  gain.gain.setValueAtTime(0.08, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 2.8);
}

export function startZenMusic() {
  if (isAudioMuted || isZenPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isZenPlaying = true;

  const scheduleNextPhrase = () => {
    if (!isZenPlaying || isAudioMuted) return;

    // Chọn ngẫu nhiên 2 - 3 nốt gảy đàn Koto theo giai điệu thiền định
    const noteCount = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < noteCount; i++) {
      const randomNote = HIRAJOSHI_FREQS[Math.floor(Math.random() * HIRAJOSHI_FREQS.length)];
      playKotoStringPluck(ctx, randomNote, i * 0.35);
    }

    // Khoảng nghỉ giữa các khúc gảy ngẫu nhiên từ 3.5s - 6.0s
    const nextInterval = (Math.random() * 2.5 + 3.5) * 1000;
    zenTimer = setTimeout(scheduleNextPhrase, nextInterval);
  };

  scheduleNextPhrase();
}

export function stopZenMusic() {
  isZenPlaying = false;
  if (zenTimer) {
    clearTimeout(zenTimer);
    zenTimer = null;
  }
}

export function toggleZenMusic() {
  if (isZenPlaying) {
    stopZenMusic();
    return false;
  } else {
    startZenMusic();
    return true;
  }
}

export function getZenMusicPlaying() {
  return isZenPlaying;
}


