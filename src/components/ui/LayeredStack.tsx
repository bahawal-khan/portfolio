"use client";

import { motion } from "framer-motion";

export type StackLayer = {
  title: string;
  items?: string[];
  tint: "blue" | "violet" | "cyan" | "neutral";
};

const TINTS: Record<StackLayer["tint"], { bg: string; border: string; glow: string; text: string }> = {
  blue: {
    bg: "rgba(76, 125, 255, 0.09)",
    border: "rgba(76, 125, 255, 0.35)",
    glow: "rgba(76, 125, 255, 0.22)",
    text: "#8fabff",
  },
  violet: {
    bg: "rgba(139, 107, 255, 0.09)",
    border: "rgba(139, 107, 255, 0.35)",
    glow: "rgba(139, 107, 255, 0.22)",
    text: "#b9a5ff",
  },
  cyan: {
    bg: "rgba(34, 211, 238, 0.09)",
    border: "rgba(34, 211, 238, 0.35)",
    glow: "rgba(34, 211, 238, 0.22)",
    text: "#67e3f5",
  },
  neutral: {
    bg: "rgba(233, 236, 241, 0.05)",
    border: "rgba(233, 236, 241, 0.18)",
    glow: "rgba(233, 236, 241, 0.12)",
    text: "#c3c9d4",
  },
};

function CurveConnector() {
  return (
    <svg
      viewBox="0 0 24 32"
      className="h-8 w-6 shrink-0"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Hardcoded to match globals.css tokens — SVG presentation attributes
            here are React props, not inline style, so var() resolution isn't
            reliable across browsers. */}
        <linearGradient id="stack-connector-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4c7dff" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <motion.path
        d="M12 0 C 4 10, 20 22, 12 32"
        fill="none"
        stroke="url(#stack-connector-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 5"
        className="connector-dash-flow"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

export function LayeredStack({ layers, className = "" }: { layers: StackLayer[]; className?: string }) {
  return (
    <div className={`flex w-full flex-col items-center ${className}`}>
      {layers.map((layer, i) => {
        const tint = TINTS[layer.tint];
        return (
          <div key={layer.title} className="flex w-full max-w-2xl flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              style={{
                background: `linear-gradient(180deg, ${tint.bg}, transparent)`,
                borderColor: tint.border,
                boxShadow: `0 0 32px -8px ${tint.glow}`,
              }}
              className="w-full rounded-2xl border p-5 sm:p-6"
            >
              <p className="font-mono text-h3 font-semibold" style={{ color: tint.text }}>
                {layer.title}
              </p>
              {layer.items && layer.items.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border px-3 py-1 font-mono text-caption text-text-muted"
                      style={{ borderColor: tint.border }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {i < layers.length - 1 && <CurveConnector />}
          </div>
        );
      })}
    </div>
  );
}
