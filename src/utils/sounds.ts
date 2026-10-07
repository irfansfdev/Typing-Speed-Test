let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass =
    window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
}

function beep(frequency: number, durationMs: number, volume: number, type: OscillatorType = "sine") {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + durationMs / 1000);
}

export function playKeySound() {
  beep(620, 35, 0.03, "square");
}

export function playErrorSound() {
  beep(180, 90, 0.05, "sawtooth");
}

export function playCompletionSound() {
  beep(523, 120, 0.06);
  setTimeout(() => beep(659, 120, 0.06), 120);
  setTimeout(() => beep(784, 180, 0.06), 240);
}
