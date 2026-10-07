import { Volume2, VolumeX } from "lucide-react";
import type { SoundSettings } from "../types";
import { cn } from "../utils/cn";

interface Props {
  settings: SoundSettings;
  onToggle: (key: keyof SoundSettings) => void;
}

const OPTIONS: { key: keyof SoundSettings; label: string; description: string }[] = [
  { key: "typingSound", label: "Typing Sound", description: "Soft click feedback on each correct keystroke" },
  { key: "errorSound", label: "Error Sound", description: "Subtle tone when you type an incorrect character" },
  { key: "completionSound", label: "Completion Sound", description: "Short chime when a test finishes" },
];

function Toggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={active}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative h-7 w-[3.25rem] shrink-0 rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        active ? "border-violet-400/40 bg-violet-500/80" : "border-white/15 bg-white/10"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-[1.35rem] w-[1.35rem] rounded-full bg-white shadow transition-transform duration-200",
          active ? "translate-x-[1.65rem]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

export function SettingsPanel({ settings, onToggle }: Props) {
  const anyEnabled = settings.typingSound || settings.errorSound || settings.completionSound;

  return (
    <div className="mx-auto w-full max-w-2xl animate-[fadeIn_0.3s_ease-out] space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Settings</h1>
        <p className="text-slate-400">Customize your typing experience.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-2.5 text-sm font-semibold text-slate-200">
          {anyEnabled ? <Volume2 className="h-4 w-4 text-violet-300" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
          Sound Feedback
        </div>
        <div className="divide-y divide-white/5">
          {OPTIONS.map((opt) => (
            <div key={opt.key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-slate-200">{opt.label}</p>
                <p className="text-xs text-slate-500">{opt.description}</p>
              </div>
              <Toggle active={settings[opt.key]} onClick={() => onToggle(opt.key)} label={opt.label} />
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-slate-500">All sounds are off by default and generated locally — nothing is downloaded or played in the background.</p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
