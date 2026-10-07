import { useCallback, useEffect, useState } from "react";
import { Keyboard, Play } from "lucide-react";
import { DifficultySelector } from "./DifficultySelector";
import { DurationSelector } from "./DurationSelector";
import { Timer } from "./Timer";
import { LiveStats } from "./LiveStats";
import { TypingText } from "./TypingText";
import { CountdownOverlay } from "./CountdownOverlay";
import { ResultsScreen } from "./ResultsScreen";
import { useTypingEngine, type TypingEngineResult } from "../hooks/useTypingEngine";
import type { Difficulty, SoundSettings } from "../types";
import { cn } from "../utils/cn";

interface Props {
  soundSettings: SoundSettings;
  onTestFinished: (result: TypingEngineResult) => void;
}

export function TypingTestView({ soundSettings, onTestFinished }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [duration, setDuration] = useState(60);
  const [lastResult, setLastResult] = useState<TypingEngineResult | null>(null);

  const engine = useTypingEngine({
    difficulty,
    durationSeconds: duration,
    soundSettings,
    onFinish: (result) => {
      setLastResult(result);
      onTestFinished(result);
    },
  });

  const { status } = engine;

  const handleEscape = useCallback(() => {
    engine.resetToIdle();
    setLastResult(null);
  }, [engine.resetToIdle]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && (status === "running" || status === "countdown" || status === "finished")) {
        handleEscape();
      }
      if (e.key === "Enter") {
        const target = e.target as HTMLElement;
        const isButton = target.tagName === "BUTTON";
        if (status === "idle" && !isButton) {
          engine.begin();
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status, engine.begin, handleEscape]);

  const showSetup = status === "idle";
  const showCountdown = status === "countdown";
  const showRunning = status === "running";
  const showResults = status === "finished" && lastResult;

  return (
    <div className="mx-auto w-full max-w-4xl">
      {showSetup && (
        <div className="animate-[fadeIn_0.3s_ease-out] space-y-8 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Test Your Typing Speed</h1>
            <p className="text-slate-400">Improve your speed, accuracy, and confidence.</p>
          </div>

          <div className="mx-auto max-w-xl space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left sm:p-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Difficulty</p>
              <DifficultySelector value={difficulty} onChange={setDifficulty} />
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Duration</p>
              <DurationSelector value={duration} onChange={setDuration} />
            </div>

            <button
              onClick={() => {
                setLastResult(null);
                engine.begin();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-transform hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Play className="h-4 w-4" />
              Start Test
            </button>
            <p className="text-center text-xs text-slate-500">
              Press <kbd className="rounded border border-white/15 px-1.5 py-0.5">Enter</kbd> to start ·{" "}
              <kbd className="rounded border border-white/15 px-1.5 py-0.5">Esc</kbd> to reset anytime
            </p>
          </div>
        </div>
      )}

      {showCountdown && <CountdownOverlay label={engine.countdownLabel} />}

      {showRunning && (
        <div className="animate-[fadeIn_0.3s_ease-out] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Keyboard className="h-4 w-4" />
              <span className="font-medium capitalize text-slate-300">{difficulty}</span>
              <span className="text-slate-600">·</span>
              <span>{duration / 60} min</span>
            </div>
            <Timer
              secondsRemaining={engine.stats.timeRemaining}
              totalSeconds={duration}
              mode="timed"
              elapsedSeconds={engine.stats.elapsedSeconds}
            />
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-[width] duration-200 ease-linear"
              style={{ width: `${engine.stats.progress}%` }}
            />
          </div>

          <TypingText
            text={engine.text}
            input={engine.input}
            disabled={status !== "running"}
            onChangeValue={engine.handleChange}
            inputRef={engine.inputRef}
            onEscape={handleEscape}
          />

          <LiveStats stats={engine.stats} mode="timed" />

          <div className="flex justify-center">
            <button
              onClick={handleEscape}
              className={cn(
                "rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-slate-200"
              )}
            >
              Stop &amp; Reset (Esc)
            </button>
          </div>
        </div>
      )}

      {showResults && (
        <ResultsScreen
          result={lastResult}
          onTryAgain={() => {
            setLastResult(null);
            engine.begin();
          }}
          onNewTest={() => {
            setLastResult(null);
            engine.resetToIdle();
          }}
        />
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
