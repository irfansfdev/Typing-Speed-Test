import { BarChart3, CheckCircle2, Clock, Keyboard, Target, Trash2, Trophy } from "lucide-react";
import type { TestRecord } from "../types";
import { formatTime } from "../utils/typingCalculations";
import { cn } from "../utils/cn";

interface Aggregates {
  bestWPM: number;
  avgWPM: number;
  bestAccuracy: number;
  avgAccuracy: number;
  totalTests: number;
  totalCharsTyped: number;
  totalPracticeTimeSeconds: number;
}

interface Props {
  history: TestRecord[];
  aggregates: Aggregates;
  onClear: () => void;
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", accent)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
        <p className="truncate font-mono text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

export function StatisticsDashboard({ history, aggregates, onClear }: Props) {
  const recent = history.slice(0, 20).slice().reverse();
  const maxWpm = Math.max(1, ...recent.map((r) => r.wpm));

  return (
    <div className="mx-auto w-full max-w-4xl animate-[fadeIn_0.3s_ease-out] space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Your Statistics</h1>
        <p className="text-slate-400">Track your progress across every test.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <SummaryCard icon={Trophy} label="Best WPM" value={`${aggregates.bestWPM}`} accent="bg-violet-500/15 text-violet-300" />
        <SummaryCard icon={BarChart3} label="Average WPM" value={`${aggregates.avgWPM}`} accent="bg-fuchsia-500/15 text-fuchsia-300" />
        <SummaryCard icon={Target} label="Best Accuracy" value={`${aggregates.bestAccuracy}%`} accent="bg-emerald-500/15 text-emerald-300" />
        <SummaryCard icon={CheckCircle2} label="Average Accuracy" value={`${aggregates.avgAccuracy}%`} accent="bg-cyan-500/15 text-cyan-300" />
        <SummaryCard icon={Keyboard} label="Total Tests" value={`${aggregates.totalTests}`} accent="bg-amber-500/15 text-amber-300" />
        <SummaryCard icon={Keyboard} label="Characters Typed" value={`${aggregates.totalCharsTyped}`} accent="bg-sky-500/15 text-sky-300" />
        <SummaryCard
          icon={Clock}
          label="Practice Time"
          value={formatTime(aggregates.totalPracticeTimeSeconds)}
          accent="bg-rose-500/15 text-rose-300"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <BarChart3 className="h-4 w-4 text-violet-300" />
            Recent WPM History
          </h2>
          {history.length > 0 && (
            <button
              onClick={onClear}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-500 transition-colors hover:border-rose-400/30 hover:text-rose-300"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear history
            </button>
          )}
        </div>

        {recent.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-500">
            No tests yet. Complete a typing test to see your progress here.
          </p>
        ) : (
          <div className="flex h-40 items-end gap-1.5 overflow-x-auto pb-1 sm:gap-2">
            {recent.map((record) => (
              <div key={record.id} className="group relative flex flex-1 min-w-[10px] flex-col items-center justify-end">
                <div className="pointer-events-none absolute -top-9 z-10 hidden whitespace-nowrap rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-[11px] text-slate-200 shadow-lg group-hover:block">
                  {record.wpm} wpm · {record.accuracy}%
                </div>
                <div
                  className="w-full rounded-t-sm bg-gradient-to-t from-violet-500/70 to-fuchsia-400/80 transition-all duration-300 group-hover:from-violet-400 group-hover:to-fuchsia-300"
                  style={{ height: `${Math.max(4, (record.wpm / maxWpm) * 100)}%` }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Mode</th>
                <th className="px-4 py-3 font-medium">Difficulty</th>
                <th className="px-4 py-3 font-medium">WPM</th>
                <th className="px-4 py-3 font-medium">Accuracy</th>
                <th className="px-4 py-3 font-medium">Errors</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 10).map((record) => (
                <tr key={record.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 text-slate-400">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2.5 capitalize text-slate-300">{record.mode}</td>
                  <td className="px-4 py-2.5 capitalize text-slate-300">{record.difficulty}</td>
                  <td className="px-4 py-2.5 font-mono font-semibold text-violet-300">{record.wpm}</td>
                  <td className="px-4 py-2.5 font-mono text-emerald-300">{record.accuracy}%</td>
                  <td className="px-4 py-2.5 font-mono text-rose-300">{record.errors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
