export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  errors: number;
}

/** Standard WPM formula: (correct characters / 5) / elapsed minutes. */
export function calculateWPM(correctChars: number, elapsedMs: number): number {
  const elapsedMinutes = elapsedMs / 60000;
  if (!elapsedMinutes || elapsedMinutes <= 0 || !isFinite(elapsedMinutes)) return 0;
  const wpm = correctChars / 5 / elapsedMinutes;
  if (!isFinite(wpm) || isNaN(wpm) || wpm < 0) return 0;
  return Math.round(wpm);
}

export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars <= 0) return 100;
  const acc = (correctChars / totalChars) * 100;
  if (!isFinite(acc) || isNaN(acc)) return 100;
  return Math.max(0, Math.min(100, Math.round(acc * 10) / 10));
}

export function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export type PerformanceRating =
  | "Beginner"
  | "Developing"
  | "Average"
  | "Fast"
  | "Advanced"
  | "Expert";

export function getPerformanceRating(wpm: number): PerformanceRating {
  if (wpm <= 20) return "Beginner";
  if (wpm <= 40) return "Developing";
  if (wpm <= 60) return "Average";
  if (wpm <= 80) return "Fast";
  if (wpm <= 100) return "Advanced";
  return "Expert";
}

export function getMotivationalMessage(wpm: number, accuracy: number): string {
  const rating = getPerformanceRating(wpm);
  if (accuracy < 85) {
    return "Solid effort — slow down slightly and focus on precision to boost accuracy.";
  }
  switch (rating) {
    case "Beginner":
      return "Great start! Keep practicing to build muscle memory.";
    case "Developing":
      return "Nice work! Your speed is steadily improving.";
    case "Average":
      return "You're finding your rhythm — consistency will push you higher.";
    case "Fast":
      return "Excellent typing speed! You're well above average.";
    case "Advanced":
      return "You're seriously fast! Keep refining your accuracy.";
    case "Expert":
      return "Outstanding! You're typing at a professional, elite level.";
    default:
      return "Keep practicing!";
  }
}

export function ratingColor(rating: PerformanceRating): string {
  switch (rating) {
    case "Beginner":
      return "text-rose-400";
    case "Developing":
      return "text-orange-400";
    case "Average":
      return "text-amber-400";
    case "Fast":
      return "text-lime-400";
    case "Advanced":
      return "text-emerald-400";
    case "Expert":
      return "text-cyan-400";
    default:
      return "text-slate-400";
  }
}
