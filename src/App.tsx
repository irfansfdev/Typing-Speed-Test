import { useState } from "react";
import { Header, type View } from "./components/Header";
import { TypingTestView } from "./components/TypingTestView";
import { PracticeMode } from "./components/PracticeMode";
import { StatisticsDashboard } from "./components/StatisticsDashboard";
import { SettingsPanel } from "./components/SettingsPanel";
import { useLocalStats } from "./hooks/useLocalStats";
import { useSoundSettings } from "./hooks/useSoundSettings";
import type { TypingEngineResult } from "./hooks/useTypingEngine";

export default function App() {
  const [view, setView] = useState<View>("test");
  const { history, addRecord, clearHistory, aggregates } = useLocalStats();
  const { settings, toggle } = useSoundSettings();

  function handleFinished(result: TypingEngineResult) {
    addRecord(result);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-10rem] h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative">
        <Header view={view} onChange={setView} />

        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          {view === "test" && <TypingTestView soundSettings={settings} onTestFinished={handleFinished} />}
          {view === "practice" && <PracticeMode soundSettings={settings} onSessionFinished={handleFinished} />}
          {view === "statistics" && (
            <StatisticsDashboard history={history} aggregates={aggregates} onClear={clearHistory} />
          )}
          {view === "settings" && <SettingsPanel settings={settings} onToggle={toggle} />}
        </main>

        <footer className="mx-auto max-w-6xl px-4 pb-10 text-center text-xs text-slate-600 sm:px-6">
          Built for focused, distraction-free typing practice.
        </footer>
      </div>
    </div>
  );
}
