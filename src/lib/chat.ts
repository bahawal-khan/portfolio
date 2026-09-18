// Client for the FastAPI + LangGraph portfolio assistant backend
// (backend/app/main.py). Thread identity lives entirely in a server-set
// httpOnly cookie — this client never generates or sends a thread id
// itself, it just uses `credentials: "include"` on every call.

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export const UNAVAILABLE_TEXT =
  "The assistant is temporarily unavailable — feel free to reach out directly via the contact section.";

export type ChatRole = "user" | "assistant";
export type ChatMessage = { id: string; role: ChatRole; content: string };

export async function fetchHistory(): Promise<ChatMessage[]> {
  try {
    const res = await fetch(`${API_BASE}/api/chat/history`, {
      credentials: "include",
    });
    if (!res.ok) return [];
    const data: { messages: { role: ChatRole; content: string }[] } = await res.json();
    return data.messages.map((m, i) => ({ id: `history-${i}`, role: m.role, content: m.content }));
  } catch {
    return [];
  }
}

export async function startNewConversation(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/chat/new`, {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}

type StreamHandlers = {
  onToken: (token: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
};

export async function streamChat(message: string, handlers: StreamHandlers): Promise<void> {
  let settled = false;
  const settle = (fn: () => void) => {
    if (settled) return;
    settled = true;
    fn();
  };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/chat/stream`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  } catch {
    settle(() => handlers.onError(UNAVAILABLE_TEXT));
    return;
  }

  if (!res.ok || !res.body) {
    settle(() => handlers.onError(UNAVAILABLE_TEXT));
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let sepIndex: number;
      while ((sepIndex = buffer.indexOf("\n\n")) !== -1) {
        const rawEvent = buffer.slice(0, sepIndex);
        buffer = buffer.slice(sepIndex + 2);

        let eventName = "message";
        let data = "";
        for (const line of rawEvent.split("\n")) {
          if (line.startsWith("event: ")) eventName = line.slice(7);
          else if (line.startsWith("data: ")) data = line.slice(6);
        }
        if (!data) continue;

        try {
          const parsed = JSON.parse(data);
          if (eventName === "token" && typeof parsed.token === "string") {
            handlers.onToken(parsed.token);
          } else if (eventName === "error") {
            settle(() => handlers.onError(parsed.message || UNAVAILABLE_TEXT));
          } else if (eventName === "done") {
            settle(() => handlers.onDone());
          }
        } catch {
          // ignore a malformed SSE chunk rather than breaking the stream
        }
      }
    }
  } catch {
    settle(() => handlers.onError(UNAVAILABLE_TEXT));
    return;
  }

  settle(() => handlers.onDone());
}
