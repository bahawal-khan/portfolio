"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuBot, LuRotateCcw, LuSend, LuX } from "react-icons/lu";
import { ChatBotIcon } from "@/components/chat/ChatBotIcon";
import { ChatBubblePreview } from "@/components/chat/ChatBubblePreview";
import { ChatMessageBubble } from "@/components/chat/ChatMessageBubble";
import {
  fetchHistory,
  startNewConversation,
  streamChat,
  UNAVAILABLE_TEXT,
  type ChatMessage,
} from "@/lib/chat";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Bahawal Khan's AI Assistant 👋\n\nAsk me about his AI/ML journey, projects, skills, GitHub, LinkedIn, resume, or contact details — I can also send him a message directly on your behalf, just ask!",
};

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${Date.now()}-${idCounter}`;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const historyLoadedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [showEntrance, setShowEntrance] = useState(false);
  const [nudging, setNudging] = useState(false);

  useEffect(() => {
    const visited = window.localStorage.getItem("chatbot-visited");
    if (visited) return;
    window.localStorage.setItem("chatbot-visited", "1");
    setShowEntrance(true);
    setNudging(true);
    const enterTimer = setTimeout(() => setShowEntrance(false), 550);
    const nudgeTimer = setTimeout(() => setNudging(false), 3500);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(nudgeTimer);
    };
  }, []);

  useEffect(() => {
    if (!open || historyLoadedRef.current) return;
    historyLoadedRef.current = true;
    fetchHistory().then((history) => {
      if (history.length > 0) setMessages(history);
    });
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streamingId]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  }, [input]);

  const busy = thinking || streamingId !== null;

  const handleSend = async () => {
    const text = input.trim();
    if (!text || busy) return;

    setInput("");
    const userMsg: ChatMessage = { id: nextId(), role: "user", content: text };
    const assistantId = nextId();
    setMessages((prev) => [...prev, userMsg, { id: assistantId, role: "assistant", content: "" }]);
    setThinking(true);
    setStreamingId(assistantId);

    let gotFirstToken = false;
    await streamChat(text, {
      onToken: (token) => {
        if (!gotFirstToken) {
          gotFirstToken = true;
          setThinking(false);
        }
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + token } : m))
        );
      },
      onDone: () => {
        setThinking(false);
        setStreamingId(null);
      },
      onError: (message) => {
        setThinking(false);
        setStreamingId(null);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content || message || UNAVAILABLE_TEXT } : m
          )
        );
      },
    });
  };

  const handleNewConversation = async () => {
    if (busy) return;
    await startNewConversation();
    setMessages([WELCOME]);
    historyLoadedRef.current = true;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!open && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <div className="relative h-16 w-16">
            {/* Pinned to the button's top edge (not flex-stacked above it) so
                it always floats clearly above the button, never drifting
                into page content, at any viewport width. */}
            <div className="absolute right-0 bottom-full mb-3">
              <ChatBubblePreview />
            </div>

            <span
              aria-hidden="true"
              className={`chat-fab-ring pointer-events-none absolute inset-0 rounded-full bg-accent-cyan/40 ${
                nudging ? "chat-fab-ring-nudge" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open Bahawal's AI portfolio assistant"
              className={`chat-fab relative flex h-16 w-16 items-center justify-center rounded-full border border-accent-border bg-bg-elevated p-2.5 text-accent transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                showEntrance ? "chat-fab-enter" : ""
              }`}
            >
              <ChatBotIcon />
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Bahawal's AI portfolio assistant"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-3 top-4 bottom-4 z-[100] flex flex-col overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-2xl sm:inset-x-auto sm:top-auto sm:bottom-6 sm:right-6 sm:h-[min(80vh,800px)] sm:w-[480px] sm:rounded-2xl"
          >
            <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-muted text-accent">
                  <LuBot className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-caption font-medium text-text">Khan Assistant</p>
                  <p className="text-caption text-text-faint">Ask about Bahawal&apos;s work</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleNewConversation}
                  aria-label="Start a new conversation"
                  title="New conversation"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <LuRotateCcw className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <LuX className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <ChatMessageBubble key={m.id} message={m} streaming={m.id === streamingId} />
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-lg rounded-bl-sm border border-border bg-bg-elevated-2 px-3.5 py-2.5">
                    <span className="h-1.5 w-1.5 animate-[blink_1s_steps(1)_infinite] rounded-full bg-text-faint" />
                    <span className="h-1.5 w-1.5 animate-[blink_1s_steps(1)_infinite] rounded-full bg-text-faint [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-[blink_1s_steps(1)_infinite] rounded-full bg-text-faint [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border p-3">
              <div className="flex items-end gap-2 rounded-lg border border-border bg-bg px-3 py-2 focus-within:border-accent-border">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  maxLength={2000}
                  placeholder="Ask about his projects, skills, or how to get in touch..."
                  className="chat-textarea max-h-28 flex-1 resize-none overflow-y-auto bg-transparent text-body text-text placeholder:text-text-faint focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim() || busy}
                  aria-label="Send message"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <LuSend className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
