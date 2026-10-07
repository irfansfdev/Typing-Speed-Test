import { useEffect, useRef, type RefObject } from "react";
import { cn } from "../utils/cn";

interface Props {
  text: string;
  input: string;
  disabled: boolean;
  onChangeValue: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onEscape?: () => void;
}

export function TypingText({ text, input, disabled, onChangeValue, inputRef, onEscape }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef<HTMLSpanElement | null>(null);
  const currentIndex = input.length;

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [currentIndex]);

  const chars = text.split("").map((char, i) => {
    let state: "correct" | "incorrect" | "current" | "pending" = "pending";
    if (i < currentIndex) {
      state = input[i] === char ? "correct" : "incorrect";
    } else if (i === currentIndex) {
      state = "current";
    }

    return (
      <span
        key={i}
        ref={state === "current" ? currentRef : undefined}
        className={cn(
          "transition-colors duration-75",
          state === "correct" && "text-emerald-300/90",
          state === "incorrect" && "rounded-[2px] bg-rose-500/40 text-rose-100",
          state === "pending" && "text-slate-500",
          state === "current" && "rounded-[2px] bg-violet-400/30 text-white caret-current animate-[blink_1.1s_steps(1)_infinite]"
        )}
      >
        {char}
      </span>
    );
  });

  return (
    <div
      className="relative cursor-text select-none rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={containerRef}
        className="max-h-40 overflow-hidden font-mono text-lg leading-[2.1rem] tracking-wide whitespace-pre-wrap break-words sm:text-xl sm:leading-[2.4rem]"
        aria-hidden="true"
      >
        {chars}
      </div>

      <label htmlFor="typing-input" className="sr-only">
        Typing input — type the text shown above
      </label>
      <input
        id="typing-input"
        ref={inputRef}
        value={input}
        disabled={disabled}
        onChange={(e) => onChangeValue(e.target.value)}
        onPaste={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onEscape?.();
        }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Type the displayed passage"
        className="absolute inset-0 h-full w-full cursor-text opacity-0"
      />

      <style>{`
        @keyframes blink {
          50% { background-color: transparent; }
        }
      `}</style>
    </div>
  );
}
