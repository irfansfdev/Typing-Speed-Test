import { useCallback, useEffect, useState } from "react";
import { Infinity as InfinityIcon, Play, Square } from "lucide-react";
import { DifficultySelector } from "./DifficultySelector";
import { Timer } from "./Timer";
import { LiveStats } from "./LiveStats";
import { TypingText } from "./TypingText";
import { CountdownOverlay } from "./CountdownOverlay";
import { ResultsScreen } from "./ResultsScreen";
import { useTypingEngine, type TypingEngineResult } from "../hooks/useTypingEngine";
import type { Difficulty, SoundSettings } from "../types";

interface Props {
  soundSettings: SoundSettings;
  onSessionFinished: (result: TypingEngineResult) => void;
}

export function PracticeMode({ soundSettings, onSessionFinished }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [lastResult, setLastResult] = useState<TypingEngineResult | null>(null);

  const engine = useTypingEngine({
    difficulty,
    durationSeconds: null,
    soundSettings,
    onFinish: (result) => {
      setLastResult(result);
      onSessionFinished(result);
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
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status, handleEscape]);

  return (
    <div className="mx-auto w-full max-w-4xl">
      {status === "idle" && (
        <div className="animate-[fadeIn_0.3s_ease-out] space-y-8 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Practice Mode</h1>
            <p className="text-slate-400">No timer, no pressure — type for as long as you like.</p>
          </div>

          <div className="mx-auto max-w-xl space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left sm:p-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Difficulty</p>
              <DifficultySelector value={difficulty} onChange={setDifficulty} />
            </div>
            <button
              onClick={() => {
                setLastResult(null);
                engine.begin();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/30 transition-transform hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Play className="h-4 w-4" />
              Start Practicing
            </button>
          </div>
        </div>
      )}

      {status === "countdown" && <CountdownOverlay label={engine.countdownLabel} />}

      {status === "running" && (
        <div className="animate-[fadeIn_0.3s_ease-out] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <InfinityIcon className="h-4 w-4" />
              <span className="font-medium capitalize text-slate-300">{difficulty}</span>
              <span className="text-slate-600">·</span>
              <span>Practice (untimed)</span>
            </div>
            <Timer
              secondsRemaining={0}
              totalSeconds={0}
              mode="practice"
              elapsedSeconds={engine.stats.elapsedSeconds}
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

          <LiveStats stats={engine.stats} mode="practice" />

          <div className="flex justify-center">
            <button
              onClick={() => engine.finish()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/[0.08]"
            >
              <Square className="h-3.5 w-3.5" />
              Stop &amp; See Results (Esc)
            </button>
          </div>
        </div>
      )}

      {status === "finished" && lastResult && (
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
