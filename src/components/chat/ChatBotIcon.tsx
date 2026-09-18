import { LuCog, LuMessageCircle, LuTriangleAlert, LuWrench } from "react-icons/lu";

/**
 * 3D-style cartoon robot mascot for the chat FAB, modeled on bot.jpeg:
 * a rounded gradient head/body with a friendly visor face, orbited by
 * small badge icons. Purely decorative — no interaction logic here.
 */
export function ChatBotIcon() {
  return (
    <div className="chat-bot-icon relative h-full w-full">
      <svg
        viewBox="0 0 64 64"
        className="chat-bot-wobble absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="botHeadGrad" cx="35%" cy="28%" r="75%">
            <stop offset="0%" stopColor="#bfe9ff" />
            <stop offset="45%" stopColor="#5fb2f2" />
            <stop offset="100%" stopColor="#2f6fd6" />
          </radialGradient>
          <radialGradient id="botBodyGrad" cx="35%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#8fd0ff" />
            <stop offset="100%" stopColor="#2f6fd6" />
          </radialGradient>
        </defs>

        {/* antenna */}
        <line x1="32" y1="8" x2="32" y2="14" stroke="#8fd0ff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="6.5" r="2.5" fill="#bfe9ff" />

        {/* ears */}
        <rect x="10" y="24" width="4" height="9" rx="2" fill="#4a8fe0" />
        <rect x="50" y="24" width="4" height="9" rx="2" fill="#4a8fe0" />

        {/* head */}
        <circle cx="32" cy="27" r="16" fill="url(#botHeadGrad)" />
        <ellipse cx="26" cy="20" rx="6" ry="3.5" fill="#ffffff" opacity="0.35" />

        {/* visor */}
        <rect x="20" y="22" width="24" height="12" rx="6" fill="#0c1a30" />
        <circle cx="26.5" cy="28" r="2.3" fill="#7fe3ff">
          <animate attributeName="opacity" values="1;0.25;1" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="37.5" cy="28" r="2.3" fill="#7fe3ff">
          <animate attributeName="opacity" values="1;0.25;1" dur="3.4s" repeatCount="indefinite" />
        </circle>

        {/* body / shoulders */}
        <path d="M18 42c0-6 6.3-10 14-10s14 4 14 10v3c0 2-1.6 3-3.5 3h-21c-1.9 0-3.5-1-3.5-3z" fill="url(#botBodyGrad)" />
        <circle cx="32" cy="50" r="2.4" fill="#245bb8" />
      </svg>

      {/* orbiting badge ring */}
      <div className="chat-bot-orbit pointer-events-none absolute inset-0">
        <span className="chat-bot-badge chat-bot-badge-1 absolute flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white shadow-sm">
          <LuMessageCircle className="h-2.5 w-2.5" aria-hidden="true" />
        </span>
        <span className="chat-bot-badge chat-bot-badge-2 absolute flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white shadow-sm">
          <LuTriangleAlert className="h-2.5 w-2.5" aria-hidden="true" />
        </span>
        <span className="chat-bot-badge chat-bot-badge-3 absolute flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white shadow-sm">
          <LuCog className="h-2.5 w-2.5" aria-hidden="true" />
        </span>
        <span className="chat-bot-badge chat-bot-badge-4 absolute flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white shadow-sm">
          <LuWrench className="h-2.5 w-2.5" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
