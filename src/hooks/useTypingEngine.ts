import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildInitialText, extendText, type Difficulty } from "../data/typingTexts";
import { calculateAccuracy, calculateWPM } from "../utils/typingCalculations";
import { playCompletionSound, playErrorSound, playKeySound } from "../utils/sounds";
import type { LiveStats, SoundSettings, TestStatus } from "../types";

export interface TypingEngineResult {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  errors: number;
  elapsedSeconds: number;
  difficulty: Difficulty;
  durationSeconds: number;
  mode: "timed" | "practice";
}

interface UseTypingEngineOptions {
  difficulty: Difficulty;
  durationSeconds: number | null;
  soundSettings: SoundSettings;
  onFinish?: (result: TypingEngineResult) => void;
}

const EXTEND_BUFFER = 220;
const COUNTDOWN_SEQUENCE = ["Ready?", "3", "2", "1", "GO!"];
const COUNTDOWN_STEP_MS = 650;

export function useTypingEngine({ difficulty, durationSeconds, soundSettings, onFinish }: UseTypingEngineOptions) {
  const mode: "timed" | "practice" = durationSeconds === null ? "practice" : "timed";

  const [status, setStatus] = useState<TestStatus>("idle");
  const [countdownLabel, setCountdownLabel] = useState("");
  const [textData, setTextData] = useState(() => buildInitialText(difficulty, durationSeconds ?? 120));
  const [input, setInput] = useState("");
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [mistakeKeystrokes, setMistakeKeystrokes] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const finishedRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  // Regenerate the passage set whenever settings change while not mid-test.
  useEffect(() => {
    if (status === "idle") {
      setTextData(buildInitialText(difficulty, durationSeconds ?? 120));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, durationSeconds]);

  // Drive live ticking while the test is running.
  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => setTick((t) => t + 1), 200);
    return () => window.clearInterval(id);
  }, [status]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    clearTimers();
    const elapsedMs = startTime ? Date.now() - startTime : 0;
    const wpm = calculateWPM(correctKeystrokes, elapsedMs);
    const totalChars = correctKeystrokes + mistakeKeystrokes;
    const accuracy = calculateAccuracy(correctKeystrokes, totalChars);
    setStatus("finished");
    const result: TypingEngineResult = {
      wpm,
      accuracy,
      correctChars: correctKeystrokes,
      incorrectChars: mistakeKeystrokes,
      totalChars,
      errors: mistakeKeystrokes,
      elapsedSeconds: Math.max(1, Math.round(elapsedMs / 1000)),
      difficulty,
      durationSeconds: durationSeconds ?? Math.round(elapsedMs / 1000),
      mode,
    };
    if (soundSettings.completionSound) playCompletionSound();
    onFinish?.(result);
  }, [clearTimers, startTime, correctKeystrokes, mistakeKeystrokes, difficulty, durationSeconds, mode, onFinish, soundSettings.completionSound]);

  const begin = useCallback(() => {
    clearTimers();
    finishedRef.current = false;
    setInput("");
    setCorrectKeystrokes(0);
    setMistakeKeystrokes(0);
    setStartTime(null);
    setTextData(buildInitialText(difficulty, durationSeconds ?? 120));
    setStatus("countdown");
    setCountdownLabel(COUNTDOWN_SEQUENCE[0]);

    COUNTDOWN_SEQUENCE.forEach((label, i) => {
      if (i === 0) return;
      const id = window.setTimeout(() => setCountdownLabel(label), i * COUNTDOWN_STEP_MS);
      timeoutsRef.current.push(id);
    });

    const finalId = window.setTimeout(() => {
      setStatus("running");
      setStartTime(Date.now());
      setCountdownLabel("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }, COUNTDOWN_SEQUENCE.length * COUNTDOWN_STEP_MS);
    timeoutsRef.current.push(finalId);
  }, [clearTimers, difficulty, durationSeconds]);

  const resetToIdle = useCallback(() => {
    clearTimers();
    finishedRef.current = false;
    setStatus("idle");
    setCountdownLabel("");
    setInput("");
    setCorrectKeystrokes(0);
    setMistakeKeystrokes(0);
    setStartTime(null);
    setTextData(buildInitialText(difficulty, durationSeconds ?? 120));
  }, [clearTimers, difficulty, durationSeconds]);

  // Auto-finish timed tests once the clock hits zero.
  useEffect(() => {
    if (status !== "running" || mode !== "timed" || !startTime || !durationSeconds) return;
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed >= durationSeconds) {
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, status, mode, startTime, durationSeconds]);

  // Keep a comfortable buffer of upcoming text so the user never runs out.
  useEffect(() => {
    if (status !== "running") return;
    if (textData.text.length - input.length < EXTEND_BUFFER) {
      setTextData((prev) => extendText(difficulty, prev.text, prev.usedIndices));
    }
  }, [input, status, difficulty, textData.text.length]);

  // Trim consumed text from the front so the DOM/string never grows unbounded
  // during very long or very fast sessions. Historical counters are untouched.
  const TRIM_AT = 520;
  const TRIM_KEEP = 220;
  useEffect(() => {
    if (status !== "running") return;
    if (input.length > TRIM_AT) {
      const cut = input.length - TRIM_KEEP;
      setInput((prev) => prev.slice(cut));
      setTextData((prev) => ({ ...prev, text: prev.text.slice(cut) }));
    }
  }, [input, status]);

  const handleChange = useCallback(
    (newValue: string) => {
      if (status !== "running") return;
      const prevValue = input;

      if (newValue.length > prevValue.length) {
        let correctDelta = 0;
        let mistakeDelta = 0;
        for (let i = prevValue.length; i < newValue.length; i++) {
          const expected = textData.text[i];
          if (expected === undefined) break;
          if (newValue[i] === expected) correctDelta++;
          else mistakeDelta++;
        }
        if (correctDelta) setCorrectKeystrokes((c) => c + correctDelta);
        if (mistakeDelta) setMistakeKeystrokes((m) => m + mistakeDelta);
        if (mistakeDelta && soundSettings.errorSound) playErrorSound();
        else if (correctDelta && soundSettings.typingSound) playKeySound();
      }

      const clamped = newValue.length > textData.text.length ? newValue.slice(0, textData.text.length) : newValue;
      setInput(clamped);

      if (clamped.length >= textData.text.length) {
        finish();
      }
    },
    [status, input, textData.text, soundSettings, finish]
  );

  const stats: LiveStats = useMemo(() => {
    const elapsedMs = startTime ? Math.max(0, Date.now() - startTime) : 0;
    const totalChars = correctKeystrokes + mistakeKeystrokes;
    const wpm = calculateWPM(correctKeystrokes, elapsedMs);
    const accuracy = calculateAccuracy(correctKeystrokes, totalChars);
    const elapsedSeconds = elapsedMs / 1000;
    const timeRemaining = mode === "timed" && durationSeconds ? Math.max(0, durationSeconds - elapsedSeconds) : 0;
    const progress =
      mode === "timed" && durationSeconds
        ? Math.min(100, (elapsedSeconds / durationSeconds) * 100)
        : Math.min(100, (input.length / Math.max(1, textData.text.length)) * 100);

    return {
      wpm,
      accuracy,
      correctChars: correctKeystrokes,
      incorrectChars: mistakeKeystrokes,
      totalChars,
      errors: mistakeKeystrokes,
      elapsedSeconds,
      timeRemaining,
      progress,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, startTime, correctKeystrokes, mistakeKeystrokes, mode, durationSeconds, input.length, textData.text.length]);

  return {
    status,
    countdownLabel,
    text: textData.text,
    input,
    stats,
    inputRef,
    mode,
    begin,
    finish,
    resetToIdle,
    handleChange,
  };
}
