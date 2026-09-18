"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuX } from "react-icons/lu";

const MESSAGES = [
  "Ask about my projects, skills, or how to reach me",
  "I can email Bahawal directly for you",
];

const VISIBLE_MS = 4500;
const HIDDEN_MIN_MS = 15000;
const HIDDEN_MAX_MS = 20000;
const DISMISS_KEY = "chatbot-bubble-dismissed";

function randomHiddenDelay() {
  return HIDDEN_MIN_MS + Math.random() * (HIDDEN_MAX_MS - HIDDEN_MIN_MS);
}

export function ChatBubblePreview() {
  const [dismissed, setDismissed] = useState(true);
  const [visible, setVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const clear = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    const showBubble = () => {
      setVisible(true);
      timerRef.current = setTimeout(hideBubble, VISIBLE_MS);
    };

    const hideBubble = () => {
      setVisible(false);
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
      timerRef.current = setTimeout(showBubble, randomHiddenDelay());
    };

    timerRef.current = setTimeout(showBubble, 1600);
    return clear;
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    window.sessionStorage.setItem(DISMISS_KEY, "1");
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="chat-preview-bubble relative w-[min(230px,calc(100vw-3rem))] rounded-xl border border-border bg-[#0c1220] px-4 py-3 shadow-xl sm:w-[260px]"
          role="status"
        >
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss suggestion"
            className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-text-faint transition-colors hover:text-text"
          >
            <LuX className="h-3 w-3" aria-hidden="true" />
          </button>
          <p className="pr-4 font-mono text-[11px] font-semibold uppercase tracking-wide text-accent-cyan">
            AI Assistant
          </p>
          <p className="mt-1 pr-2 text-caption leading-snug text-text-muted">
            {MESSAGES[messageIndex]}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
