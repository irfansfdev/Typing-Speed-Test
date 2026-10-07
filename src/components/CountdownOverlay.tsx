interface Props {
  label: string;
}

export function CountdownOverlay({ label }: Props) {
  const isGo = label === "GO!";
  const isReady = label === "Ready?";

  return (
    <div
      className="flex min-h-[18rem] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] py-16"
      role="status"
      aria-live="assertive"
    >
      <span className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
        {isReady ? "Get Ready" : "Starting In"}
      </span>
      <span
        key={label}
        className={
          isGo
            ? "animate-[pop_0.5s_ease-out] bg-gradient-to-br from-emerald-300 to-cyan-300 bg-clip-text text-7xl font-bold text-transparent sm:text-8xl"
            : "animate-[pop_0.5s_ease-out] text-7xl font-bold text-white sm:text-8xl"
        }
      >
        {label}
      </span>
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
