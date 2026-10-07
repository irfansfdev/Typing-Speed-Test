import type { Difficulty } from "./data/typingTexts";

export type { Difficulty };

export type DurationOption = 60 | 120 | 180 | 240 | 300;

export type TestStatus = "idle" | "countdown" | "running" | "finished";

export interface LiveStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  errors: number;
  elapsedSeconds: number;
  timeRemaining: number;
  progress: number;
}

export interface TestRecord {
  id: string;
  date: number;
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  errors: number;
  difficulty: Difficulty;
  durationSeconds: number;
  mode: "timed" | "practice";
}

export interface SoundSettings {
  typingSound: boolean;
  errorSound: boolean;
  completionSound: boolean;
}
