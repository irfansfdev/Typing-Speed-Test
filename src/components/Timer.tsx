import { Clock3 } from "lucide-react";
import { formatTime } from "../utils/typingCalculations";
import { cn } from "../utils/cn";

interface Props {
  secondsRemaining: number;
  totalSeconds: number;
  mode: "timed" | "practice";
  elapsedSeconds?: number;
}

export function Timer({ secondsRemaining, totalSeconds, mode, elapsedSeconds }: Props) {
  const isPractice = mode === "practice";
  const low = !isPractice && secondsRemaining <= 30 && secondsRemaining > 10;
  const critical = !isPractice && secondsRemaining <= 10;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border px-4 py-2.5 transition-colors duration-300",
        critical
          ? "animate-pulse border-rose-400/40 bg-rose-500/10"
          : low
          ? "border-amber-400/30 bg-amber-500/10"
          : "border-white/10 bg-white/[0.04]"
      )}
      role="timer"
      aria-live="polite"
      aria-label={isPractice ? "Elapsed time" : "Time remaining"}
    >
      <Clock3
        className={cn("h-5 w-5", critical ? "text-rose-300" : low ? "text-amber-300" : "text-slate-400")}
      />
      <span
        className={cn(
          "font-mono text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl",
          critical ? "text-rose-200" : low ? "text-amber-200" : "text-white"
        )}
      >
        {isPractice ? formatTime(elapsedSeconds ?? 0) : formatTime(secondsRemaining)}
      </span>
      {!isPractice && (
        <span className="hidden text-xs text-slate-500 sm:inline">/ {formatTime(totalSeconds)}</span>
      )}
    </div>
  );
}
