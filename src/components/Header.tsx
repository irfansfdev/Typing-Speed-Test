import { BarChart3, Keyboard, Settings as SettingsIcon, Timer, Zap } from "lucide-react";
import { cn } from "../utils/cn";

export type View = "test" | "practice" | "statistics" | "settings";

interface Props {
  view: View;
  onChange: (view: View) => void;
}

const NAV: { key: View; label: string; icon: typeof Keyboard }[] = [
  { key: "test", label: "Typing Test", icon: Timer },
  { key: "practice", label: "Practice", icon: Keyboard },
  { key: "statistics", label: "Statistics", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

export function Header({ view, onChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-900/40">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Velocity<span className="text-violet-400">Type</span>
          </span>
        </div>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1 sm:flex">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              aria-current={view === key ? "page" : undefined}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300",
                view === key ? "bg-violet-500/15 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <nav aria-label="Primary navigation mobile" className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-white/[0.02] p-1 sm:hidden">
          {NAV.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              aria-label={label}
              aria-current={view === key ? "page" : undefined}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                view === key ? "bg-violet-500/15 text-white" : "text-slate-400"
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
