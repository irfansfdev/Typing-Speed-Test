import { Award, RotateCcw, Settings2, Sparkles, Timer as TimerIcon } from "lucide-react";
import type { TypingEngineResult } from "../hooks/useTypingEngine";
import { getMotivationalMessage, getPerformanceRating, ratingColor } from "../utils/typingCalculations";
import { cn } from "../utils/cn";

interface Props {
  result: TypingEngineResult;
  onTryAgain: () => void;
  onNewTest: () => void;
}

function Metric({ label, value, highlight }: { label: string; value: string; highlight?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center">
      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className={cn("mt-1.5 font-mono text-2xl font-bold tabular-nums sm:text-3xl", highlight ?? "text-white")}>
        {value}
      </p>
    </div>
  );
}

function Bar({ label, percent, colorClass }: { label: string; percent: number; colorClass: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="font-mono text-slate-300">{Math.round(percent)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className={cn("h-full rounded-full transition-[width] duration-700 ease-out", colorClass)}
          style={{ width: `${Math.min(100, Math.max(2, percent))}%` }}
        />
      </div>
    </div>
  );
}

export function ResultsScreen({ result, onTryAgain, onNewTest }: Props) {
  const rating = getPerformanceRating(result.wpm);
  const message = getMotivationalMessage(result.wpm, result.accuracy);
  const wpmPercent = Math.min(100, (result.wpm / 120) * 100);

  return (
    <div className="animate-[fadeIn_0.4s_ease-out] space-y-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 ring-1 ring-white/10">
          <Award className="h-6 w-6 text-violet-300" />
        </div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Test Complete</h2>
        <p className={cn("text-sm font-semibold uppercase tracking-wide", ratingColor(rating))}>{rating}</p>
        <p className="max-w-md text-sm text-slate-400">{message}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="WPM" value={`${result.wpm}`} highlight="text-violet-300" />
        <Metric label="Accuracy" value={`${result.accuracy}%`} highlight="text-emerald-300" />
        <Metric label="Correct Chars" value={`${result.correctChars}`} />
        <Metric label="Incorrect Chars" value={`${result.incorrectChars}`} highlight={result.incorrectChars > 0 ? "text-rose-300" : "text-white"} />
        <Metric label="Total Characters" value={`${result.totalChars}`} />
        <Metric label="Errors" value={`${result.errors}`} />
        <Metric label="Difficulty" value={result.difficulty[0].toUpperCase() + result.difficulty.slice(1)} />
        <Metric
          label="Duration"
          value={result.mode === "timed" ? `${Math.round(result.durationSeconds / 60)} Minutes` : `${result.elapsedSeconds}s`}
        />
      </div>

      <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <Sparkles className="h-4 w-4 text-violet-300" />
          Performance Summary
        </div>
        <Bar label="Speed (WPM)" percent={wpmPercent} colorClass="bg-gradient-to-r from-violet-500 to-fuchsia-400" />
        <Bar label="Accuracy" percent={result.accuracy} colorClass="bg-gradient-to-r from-emerald-500 to-cyan-400" />
      </div>

      <div className="flex flex-wrap justify-center gap-3 pt-1">
        <button
          onClick={onTryAgain}
          className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-transform hover:scale-[1.03] hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
        <button
          onClick={onNewTest}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <Settings2 className="h-4 w-4" />
          New Test
        </button>
        <button
          onClick={onNewTest}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <TimerIcon className="h-4 w-4" />
          Change Difficulty / Duration
        </button>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
