import { Gauge, Rocket, Zap } from "lucide-react";
import type { Difficulty } from "../types";
import { cn } from "../utils/cn";

const OPTIONS: { value: Difficulty; label: string; description: string; icon: typeof Gauge }[] = [
  { value: "easy", label: "Easy", description: "Everyday words & short sentences", icon: Gauge },
  { value: "medium", label: "Medium", description: "Professional, varied vocabulary", icon: Zap },
  { value: "hard", label: "Hard", description: "Technical terms & symbols", icon: Rocket },
];

interface Props {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
  disabled?: boolean;
}

export function DifficultySelector({ value, onChange, disabled }: Props) {
  return (
    <div role="radiogroup" aria-label="Select difficulty" className="grid grid-cols-3 gap-2 sm:gap-3">
      {OPTIONS.map(({ value: optionValue, label, description, icon: Icon }) => {
        const active = value === optionValue;
        return (
          <button
            key={optionValue}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(optionValue)}
            className={cn(
              "group relative flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3.5 text-center transition-all duration-200 sm:gap-2 sm:py-4",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
              active
                ? "border-violet-400/40 bg-violet-500/10 shadow-[0_0_0_1px_rgba(167,139,250,0.15)]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-colors",
                active ? "text-violet-300" : "text-slate-400 group-hover:text-slate-300"
              )}
            />
            <span className={cn("text-sm font-semibold tracking-wide", active ? "text-white" : "text-slate-200")}>
              {label}
            </span>
            <span className="hidden text-[11px] leading-snug text-slate-500 sm:block">{description}</span>
          </button>
        );
      })}
    </div>
  );
}
