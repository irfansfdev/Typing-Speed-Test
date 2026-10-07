import { useCallback, useEffect, useState } from "react";
import type { SoundSettings } from "../types";

const STORAGE_KEY = "typing-platform:sound-settings";

const DEFAULTS: SoundSettings = {
  typingSound: false,
  errorSound: false,
  completionSound: false,
};

function loadSettings(): SoundSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

export function useSoundSettings() {
  const [settings, setSettings] = useState<SoundSettings>(() => loadSettings());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const toggle = useCallback((key: keyof SoundSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return { settings, toggle };
}
