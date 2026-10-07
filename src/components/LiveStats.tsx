import type { LiveStats as LiveStatsType } from "../types";
import { formatTime } from "../utils/typingCalculations";

interface Props {
  stats: LiveStatsType;
  mode: "timed" | "practice";
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center sm:text-left">
      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`mt-1 font-mono text-xl font-semibold tabular-nums sm:text-2xl ${accent ?? "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

export function LiveStats({ stats, mode }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
      <StatCard label="WPM" value={`${stats.wpm}`} accent="text-violet-300" />
      <StatCard label="Accuracy" value={`${stats.accuracy}%`} accent="text-emerald-300" />
      <StatCard label="Errors" value={`${stats.errors}`} accent={stats.errors > 0 ? "text-rose-300" : "text-white"} />
      <StatCard label="Characters" value={`${stats.totalChars}`} />
      <StatCard label="Correct" value={`${stats.correctChars}`} />
      <StatCard
        label={mode === "timed" ? "Time Left" : "Elapsed"}
        value={formatTime(mode === "timed" ? stats.timeRemaining : stats.elapsedSeconds)}
      />
    </div>
  );
}
