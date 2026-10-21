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

// 8. Hệ thống Nhạc nền Nhật Bản Bản quyền sạch 100% (DOVA Style / Royalty-Free Web Audio Synthesizer)
// Mô phỏng âm hưởng Nhật Bản bản quyền sạch: Koto, Night Dancer Lofi Chill, Sáo Shakuhachi, Hộp nhạc Sakura

export const BGM_TRACKS = [
  {
    id: 'night_dancer_lofi',
    title: 'Night Dancer Lofi Chill',
    subtitle: 'DOVA Style • Lấy cảm hứng từ Night Dancer/J-Pop ban đêm',
    icon: '🌙',
    badge: 'Trending',
    description: 'Nhịp beat Lofi êm đềm, hợp âm Citypop đêm Tokyo thư thái và tăng khả năng tập trung.'
  },
  {
    id: 'koto_zen',
    title: 'Đàn tranh Koto Kyoto',
    subtitle: '平調子 (Hirajoshi) • Thanh tịnh & tịnh tâm học tập',
    icon: '🎋',
    badge: 'Cổ truyền',
    description: 'Âm thanh dây gảy Koto theo thang ngũ cung Hirajoshi truyền thống Nhật Bản.'
  },
  {
    id: 'rain_bamboo',
    title: 'Mưa rào & Sáo trúc Shakuhachi',
    subtitle: '雨の竹林 • Tiếng mưa dịu êm và tiêu sáo Nhật Bản',
    icon: '🌧️',
    badge: 'Tập trung',
    description: 'Tiếng mưa rơi nhẹ nhàng kết hợp tiếng sáo tiêu Shakuhachi trầm ấm giải tỏa căng thẳng.'
  },
  {
    id: 'sakura_musicbox',
    title: 'Hộp nhạc hoa anh đào',
    subtitle: '桜のオルゴール • Giai điệu trong trẻo ký ức Ghibli',
    icon: '🌸',
    badge: 'Ký ức',
    description: 'Chuông hộp nhạc trong suốt ngân vang giai điệu mùa hoa anh đào hoài niệm.'
  }
];

let isZenPlaying = false;
let activeTrackId = 'night_dancer_lofi';
let bgmVolume = 0.5;
let bgmMasterGain = null;
let bgmLoopTimers = [];
let bgmNoiseNode = null;

// Khởi tạo track & volume từ LocalStorage
if (typeof window !== 'undefined') {
  try {
    const savedTrack = localStorage.getItem('project_kanji_bgm_track');
    if (savedTrack && BGM_TRACKS.some(t => t.id === savedTrack)) {
      activeTrackId = savedTrack;
    }
    const savedVol = localStorage.getItem('project_kanji_bgm_volume');
    if (savedVol !== null) {
      bgmVolume = Math.max(0, Math.min(1, parseFloat(savedVol)));
    }
  } catch (e) {}
}

function getBgmMasterGain(ctx) {
  if (!bgmMasterGain || bgmMasterGain.context !== ctx) {
    bgmMasterGain = ctx.createGain();
    bgmMasterGain.gain.setValueAtTime(bgmVolume, ctx.currentTime);
    bgmMasterGain.connect(ctx.destination);
  }
  return bgmMasterGain;
}

export function setMusicVolume(vol) {
  bgmVolume = Math.max(0, Math.min(1, vol));
  if (typeof window !== 'undefined') {
    localStorage.setItem('project_kanji_bgm_volume', bgmVolume.toString());
  }
  if (bgmMasterGain && audioCtx) {
    bgmMasterGain.gain.setValueAtTime(bgmVolume, audioCtx.currentTime);
  }
}

export function getMusicVolume() {
  return bgmVolume;
}

export function setSelectedMusicTrack(trackId) {
  if (!BGM_TRACKS.some(t => t.id === trackId)) return;
  activeTrackId = trackId;
  if (typeof window !== 'undefined') {
    localStorage.setItem('project_kanji_bgm_track', trackId);
  }
  if (isZenPlaying) {
    stopZenMusic();
    startZenMusic();
  }
}

export function getSelectedMusicTrack() {
  return activeTrackId;
}

function clearAllBgmTimers() {
  bgmLoopTimers.forEach(t => clearTimeout(t));
  bgmLoopTimers = [];
  if (bgmNoiseNode) {
    try {
      bgmNoiseNode.stop();
      bgmNoiseNode.disconnect();
    } catch (e) {}
    bgmNoiseNode = null;
  }
}

// -------------------------------------------------------------
// TRACK 1: ĐÀN TRANH KOTO (KYOTO HIRAJOSHI)
// -------------------------------------------------------------
const HIRAJOSHI_FREQS = [220.0, 246.94, 261.63, 329.63, 349.23, 440.0, 493.88, 523.25, 659.25, 698.46];

function playKotoStringPluck(ctx, freq, delay = 0) {
  const master = getBgmMasterGain(ctx);
  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, now);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1400, now);
  filter.frequency.exponentialRampToValueAtTime(300, now + 2.0);

  gain.gain.setValueAtTime(0, now);
  gain.gain.setValueAtTime(0.12, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  osc.start(now);
  osc.stop(now + 2.8);
}

function runKotoLoop(ctx) {
  if (!isZenPlaying || isAudioMuted) return;

  const noteCount = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < noteCount; i++) {
    const randomNote = HIRAJOSHI_FREQS[Math.floor(Math.random() * HIRAJOSHI_FREQS.length)];
    playKotoStringPluck(ctx, randomNote, i * 0.35);
  }

  const nextInterval = (Math.random() * 2.5 + 3.5) * 1000;
  const timer = setTimeout(() => runKotoLoop(ctx), nextInterval);
  bgmLoopTimers.push(timer);
}

// -------------------------------------------------------------
// TRACK 2: NIGHT DANCER LOFI CHILL (CITYPOP J-POP DOVA STYLE)
// Hợp âm jazz lofi ban đêm: Gmaj7 -> F#m7 -> Em7 -> Bm7
// -------------------------------------------------------------
const LOFI_CHORDS = [
  { bass: 98.00, chord: [196.00, 246.94, 293.66, 369.99] }, // Gmaj7 (G, B, D, F#)
  { bass: 92.50, chord: [185.00, 220.00, 277.18, 329.63] }, // F#m7 (F#, A, C#, E)
  { bass: 82.41, chord: [164.81, 196.00, 246.94, 293.66] }, // Em7 (E, G, B, D)
  { bass: 123.47, chord: [246.94, 293.66, 369.99, 440.00] } // Bm7 (B, D, F#, A)
];

// Giai điệu điệp khúc kinh điển bài NIGHT DANCER của imase:
// "Doudemo ii you na yoru dakedo... Tokimeki kirameki to kimi mo... Mada tomaranai odoriba no mannaka de... Yoru wo akasou Odorou Night Dancer"
const NIGHT_DANCER_CHORUS_PHRASES = [
  // Đoạn 1: "どうでもいいような 夜だけど" (D D D D B D E F#)
  [
    { f: 293.66, t: 0.06, d: 0.18 }, // D4 (Dou)
    { f: 293.66, t: 0.28, d: 0.18 }, // D4 (de)
    { f: 293.66, t: 0.50, d: 0.18 }, // D4 (mo)
    { f: 293.66, t: 0.72, d: 0.18 }, // D4 (ii)
    { f: 246.94, t: 0.98, d: 0.20 }, // B3 (you)
    { f: 293.66, t: 1.22, d: 0.20 }, // D4 (na)
    { f: 329.63, t: 1.48, d: 0.22 }, // E4 (yo)
    { f: 369.99, t: 1.76, d: 0.48 }, // F#4 (ru da ke do)
  ],
  // Đoạn 2: "響めき 煌めきと 君も" (F# F# F# E D B D)
  [
    { f: 369.99, t: 0.08, d: 0.20 }, // F#4 (To)
    { f: 369.99, t: 0.32, d: 0.20 }, // F#4 (ki)
    { f: 369.99, t: 0.56, d: 0.20 }, // F#4 (me)
    { f: 329.63, t: 0.82, d: 0.22 }, // E4 (ki)
    { f: 293.66, t: 1.08, d: 0.22 }, // D4 (ki ra)
    { f: 246.94, t: 1.34, d: 0.22 }, // B3 (me)
    { f: 293.66, t: 1.62, d: 0.55 }, // D4 (ki to kimi mo)
  ],
  // Đoạn 3: "まだ止まらない 踊り場の真ん中で" (D D D D B D E F#)
  [
    { f: 293.66, t: 0.06, d: 0.18 }, // D4 (Ma)
    { f: 293.66, t: 0.28, d: 0.18 }, // D4 (da)
    { f: 293.66, t: 0.50, d: 0.18 }, // D4 (to)
    { f: 293.66, t: 0.72, d: 0.18 }, // D4 (ma)
    { f: 246.94, t: 0.98, d: 0.20 }, // B3 (ra)
    { f: 293.66, t: 1.22, d: 0.20 }, // D4 (nai)
    { f: 329.63, t: 1.48, d: 0.22 }, // E4 (o)
    { f: 369.99, t: 1.76, d: 0.48 }, // F#4 (do ri ba)
  ],
  // Đoạn 4: "夜を明かそう 踊ろう Night Dancer" (A F# E D B D E D)
  [
    { f: 440.00, t: 0.08, d: 0.24 }, // A4 (Yo)
    { f: 369.99, t: 0.36, d: 0.24 }, // F#4 (ru)
    { f: 329.63, t: 0.64, d: 0.24 }, // E4 (wo)
    { f: 293.66, t: 0.92, d: 0.24 }, // D4 (a ka sou)
    { f: 246.94, t: 1.20, d: 0.20 }, // B3 (o)
    { f: 293.66, t: 1.44, d: 0.20 }, // D4 (do)
    { f: 329.63, t: 1.70, d: 0.22 }, // E4 (Night)
    { f: 293.66, t: 1.96, d: 0.45 }, // D4 (Dancer)
  ],
];

let lofiStep = 0;

function playLofiBar(ctx) {
  if (!isZenPlaying || isAudioMuted) return;
  const master = getBgmMasterGain(ctx);
  const now = ctx.currentTime;
  const chordData = LOFI_CHORDS[lofiStep % LOFI_CHORDS.length];
  const phraseNotes = NIGHT_DANCER_CHORUS_PHRASES[lofiStep % NIGHT_DANCER_CHORUS_PHRASES.length];

  // 1. Warm Electric Piano (Rhodes chord)
  chordData.chord.forEach((freq) => {
    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.3);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(gain);
    gain.connect(master);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + 2.4);
    oscHarmonic.stop(now + 2.4);
  });

  // 2. Warm Sub Bass
  const bassOsc = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bassOsc.type = 'triangle';
  bassOsc.frequency.setValueAtTime(chordData.bass, now);
  bassGain.gain.setValueAtTime(0, now);
  bassGain.gain.linearRampToValueAtTime(0.08, now + 0.04);
  bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
  bassOsc.connect(bassGain);
  bassGain.connect(master);
  bassOsc.start(now);
  bassOsc.stop(now + 1.9);

  // 3. Lofi Beat Kick & Rim click
  // Kick at 0s
  const kickOsc = ctx.createOscillator();
  const kickGain = ctx.createGain();
  kickOsc.frequency.setValueAtTime(110, now);
  kickOsc.frequency.exponentialRampToValueAtTime(45, now + 0.08);
  kickGain.gain.setValueAtTime(0.11, now);
  kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  kickOsc.connect(kickGain);
  kickGain.connect(master);
  kickOsc.start(now);
  kickOsc.stop(now + 0.16);

  // Rim click at 1.15s (Beat 3)
  const rimOsc = ctx.createOscillator();
  const rimGain = ctx.createGain();
  rimOsc.type = 'triangle';
  rimOsc.frequency.setValueAtTime(750, now + 1.15);
  rimGain.gain.setValueAtTime(0, now);
  rimGain.gain.setValueAtTime(0.035, now + 1.15);
  rimGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.23);
  rimOsc.connect(rimGain);
  rimGain.connect(master);
  rimOsc.start(now + 1.15);
  rimOsc.stop(now + 1.25);

  // 4. Giai điệu rõ nét điệp khúc NIGHT DANCER (Lead Bell Synth)
  phraseNotes.forEach((n) => {
    const noteTime = now + n.t;
    const leadOsc = ctx.createOscillator();
    const leadGain = ctx.createGain();
    const leadFilter = ctx.createBiquadFilter();

    leadOsc.type = 'sine';
    leadOsc.frequency.setValueAtTime(n.f, noteTime);

    leadFilter.type = 'lowpass';
    leadFilter.frequency.setValueAtTime(1800, noteTime);

    leadGain.gain.setValueAtTime(0, noteTime);
    leadGain.gain.linearRampToValueAtTime(0.065, noteTime + 0.015);
    leadGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + n.d);

    leadOsc.connect(leadFilter);
    leadFilter.connect(leadGain);
    leadGain.connect(master);

    leadOsc.start(noteTime);
    leadOsc.stop(noteTime + n.d + 0.05);
  });

  lofiStep++;
  const timer = setTimeout(() => playLofiBar(ctx), 2400); // ~100 BPM 4-beat bar
  bgmLoopTimers.push(timer);
}

// -------------------------------------------------------------
// TRACK 3: MƯA RÀO & SÁO TRÚC SHAKUHACHI (BAMBOO RAIN)
// -------------------------------------------------------------
const SHAKUHACHI_SCALE = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33]; // D4, F4, G4, A4, C5, D5

function startProceduralRain(ctx) {
  // Tạo tiếng mưa bằng White/Pink noise buffer
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    data[i] = (b0 + b1 + b2) * 0.06;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1100, ctx.currentTime);
  filter.Q.setValueAtTime(0.8, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.05, ctx.currentTime);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(getBgmMasterGain(ctx));

  noise.start();
  bgmNoiseNode = noise;
}

function playShakuhachiNote(ctx) {
  if (!isZenPlaying || isAudioMuted) return;
  const master = getBgmMasterGain(ctx);
  const now = ctx.currentTime;
  const freq = SHAKUHACHI_SCALE[Math.floor(Math.random() * SHAKUHACHI_SCALE.length)];

  const osc = ctx.createOscillator();
  const vibrato = ctx.createOscillator();
  const vibratoGain = ctx.createGain();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  vibrato.frequency.setValueAtTime(4.8, now);
  vibratoGain.gain.setValueAtTime(2.2, now);
  vibrato.connect(osc.frequency);

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, now);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(500, now + 3.0);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.09, now + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

  vibrato.start(now);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  osc.start(now);
  osc.stop(now + 3.4);
  vibrato.stop(now + 3.4);

  const nextDelay = (Math.random() * 2.0 + 3.2) * 1000;
  const timer = setTimeout(() => playShakuhachiNote(ctx), nextDelay);
  bgmLoopTimers.push(timer);
}

// -------------------------------------------------------------
// TRACK 4: HỘP NHẠC SAKURA (MUSIC BOX)
// -------------------------------------------------------------
const MUSICBOX_NOTES = [
  587.33, 659.25, 739.99, 880.00, 987.77, 1174.66, 1318.51 // D5, E5, F#5, A5, B5, D6, E6
];

function playMusicBoxChime(ctx) {
  if (!isZenPlaying || isAudioMuted) return;
  const master = getBgmMasterGain(ctx);
  const now = ctx.currentTime;

  const phraseLength = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < phraseLength; i++) {
    const f = MUSICBOX_NOTES[Math.floor(Math.random() * MUSICBOX_NOTES.length)];
    const noteTime = now + i * 0.38;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, noteTime);

    gain.gain.setValueAtTime(0, noteTime);
    gain.gain.setValueAtTime(0.08, noteTime + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.4);

    osc.connect(gain);
    gain.connect(master);

    osc.start(noteTime);
    osc.stop(noteTime + 1.5);
  }

  const nextInterval = (Math.random() * 2.2 + 2.8) * 1000;
  const timer = setTimeout(() => playMusicBoxChime(ctx), nextInterval);
  bgmLoopTimers.push(timer);
}

// -------------------------------------------------------------
// ĐIỀU KHIỂN CHÍNH (START / STOP / TOGGLE)
// -------------------------------------------------------------
export function startZenMusic() {
  if (isAudioMuted || isZenPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isZenPlaying = true;
  clearAllBgmTimers();

  if (activeTrackId === 'koto_zen') {
    runKotoLoop(ctx);
  } else if (activeTrackId === 'rain_bamboo') {
    startProceduralRain(ctx);
    playShakuhachiNote(ctx);
  } else if (activeTrackId === 'sakura_musicbox') {
    playMusicBoxChime(ctx);
  } else {
    // night_dancer_lofi: Được phát chính thức qua YouTube MV Player của imase (kagoEGKHZvU)
    // Giữ Web Audio synth tĩnh lặng để tránh phát đè lên giọng hát của imase.
  }
}

export function stopZenMusic() {
  isZenPlaying = false;
  clearAllBgmTimers();
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



