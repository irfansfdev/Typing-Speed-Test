import { cn } from "../utils/cn";

const OPTIONS = [60, 120, 180, 240, 300] as const;

interface Props {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function DurationSelector({ value, onChange, disabled }: Props) {
  return (
    <div role="radiogroup" aria-label="Select duration" className="flex flex-wrap gap-2">
      {OPTIONS.map((seconds) => {
        const active = value === seconds;
        return (
          <button
            key={seconds}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(seconds)}
            className={cn(
              "min-w-[4.2rem] rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
              active
                ? "border-violet-400/40 bg-violet-500/15 text-white"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {seconds / 60} min
          </button>
        );
      })}
    </div>
  );
}
