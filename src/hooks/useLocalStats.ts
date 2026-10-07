import { useCallback, useEffect, useState } from "react";
import type { TestRecord } from "../types";

const STORAGE_KEY = "typing-platform:history";
const MAX_RECORDS = 200;

function loadHistory(): TestRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function useLocalStats() {
  const [history, setHistory] = useState<TestRecord[]>(() => loadHistory());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // ignore storage errors (e.g. private browsing quota)
    }
  }, [history]);

  const addRecord = useCallback((record: Omit<TestRecord, "id" | "date">) => {
    const full: TestRecord = {
      ...record,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: Date.now(),
    };
    setHistory((prev) => [full, ...prev].slice(0, MAX_RECORDS));
    return full;
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  const bestWPM = history.reduce((max, r) => Math.max(max, r.wpm), 0);
  const avgWPM = history.length
    ? Math.round(history.reduce((sum, r) => sum + r.wpm, 0) / history.length)
    : 0;
  const bestAccuracy = history.reduce((max, r) => Math.max(max, r.accuracy), 0);
  const avgAccuracy = history.length
    ? Math.round((history.reduce((sum, r) => sum + r.accuracy, 0) / history.length) * 10) / 10
    : 0;
  const totalTests = history.length;
  const totalCharsTyped = history.reduce((sum, r) => sum + r.totalChars, 0);
  const totalPracticeTimeSeconds = history.reduce((sum, r) => sum + r.durationSeconds, 0);

  return {
    history,
    addRecord,
    clearHistory,
    aggregates: {
      bestWPM,
      avgWPM,
      bestAccuracy,
      avgAccuracy,
      totalTests,
      totalCharsTyped,
      totalPracticeTimeSeconds,
    },
  };
}
