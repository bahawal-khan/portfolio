"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LuCheck, LuCopy } from "react-icons/lu";
import type { ChatMessage } from "@/lib/chat";

export function ChatMessageBubble({
  message,
  streaming = false,
}: {
  message: ChatMessage;
  streaming?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently ignore, non-critical affordance
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-lg rounded-br-sm bg-accent px-3.5 py-2.5 text-body text-bg">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex justify-start">
      <div className="max-w-[85%] rounded-lg rounded-bl-sm border border-border bg-bg-elevated-2 px-3.5 py-2.5 text-body text-text">
        <div className="chat-markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content || " "}
          </ReactMarkdown>
          {streaming && (
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-[blink_1s_steps(1)_infinite] bg-accent align-middle" />
          )}
        </div>
        {!streaming && message.content && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy response"
            className="mt-1.5 flex items-center gap-1 font-mono text-caption text-text-faint opacity-0 transition-opacity hover:text-accent focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent group-hover:opacity-100"
          >
            {copied ? (
              <>
                <LuCheck className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <LuCopy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
