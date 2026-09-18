"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const TYPE_SPEED_MS = 45;
const DELETE_SPEED_MS = 25;
const PAUSE_AFTER_TYPE_MS = 1400;
const PAUSE_AFTER_DELETE_MS = 300;

type Phase = "typing" | "pausing" | "deleting";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

export function TypingText({
  lines,
  className = "",
  cursorClassName = "",
}: {
  lines: string[];
  className?: string;
  cursorClassName?: string;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );

  useEffect(() => {
    if (reducedMotion) return;

    const current = lines[lineIndex % lines.length] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          TYPE_SPEED_MS
        );
      } else {
        timeout = setTimeout(() => setPhase("pausing"), PAUSE_AFTER_TYPE_MS);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 900);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          DELETE_SPEED_MS
        );
      } else {
        timeout = setTimeout(() => {
          setLineIndex((i) => (i + 1) % lines.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE_MS);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, lineIndex, lines, reducedMotion]);

  const staticLine = lines[0] ?? "";
  const displayed = reducedMotion ? staticLine : text;

  return (
    <span className={className}>
      <span aria-hidden="true">
        {displayed}
        {!reducedMotion && (
          <span
            className={`ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-[blink_1s_steps(1)_infinite] bg-accent align-middle ${cursorClassName}`}
          />
        )}
      </span>
      <span className="sr-only">{lines.join(". ")}.</span>
    </span>
  );
}
