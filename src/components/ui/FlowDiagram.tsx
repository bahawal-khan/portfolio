"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  LuBot,
  LuBoxes,
  LuCalendarCheck,
  LuCircleCheck,
  LuCircle,
  LuCpu,
  LuDatabase,
  LuGitBranch,
  LuLayers3,
  LuSearch,
  LuSparkles,
  LuUser,
  LuUserCheck,
} from "react-icons/lu";
import type { FlowStep } from "@/lib/content";

const KEYWORD_ICONS: [RegExp, IconType][] = [
  [/\buser\b/i, LuUser],
  [/human|approval|hitl/i, LuUserCheck],
  [/booking/i, LuCalendarCheck],
  [/agent|bot/i, LuBot],
  [/search/i, LuSearch],
  [/recommend/i, LuSparkles],
  [/comparison|selected|model/i, LuGitBranch],
  [/retrieval|embedding|rag/i, LuBoxes],
  [/postgres|memory|database|data\b/i, LuDatabase],
  [/transfer|efficientnet|layers?/i, LuLayers3],
  [/train|fine-tun|stage|classification|bert/i, LuCpu],
  [/action|prediction|response|classification|dataset|images/i, LuCircleCheck],
];

function iconFor(label: string): IconType {
  const match = KEYWORD_ICONS.find(([pattern]) => pattern.test(label));
  return match ? match[1] : LuCircle;
}

function Connector({ compact }: { compact?: boolean }) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3 }}
      className={`connector-flow w-px origin-top rounded-full ${compact ? "h-4" : "h-6"}`}
      aria-hidden="true"
    />
  );
}

function Node({
  label,
  highlight,
  compact,
  delay,
}: {
  label: string;
  highlight?: boolean;
  compact?: boolean;
  delay: number;
}) {
  const Icon = iconFor(label);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`flex max-w-full items-center gap-2.5 rounded-xl border bg-bg-elevated text-center font-mono text-text ${
        compact ? "px-3 py-2 text-caption" : "px-4 py-2.5 text-caption sm:text-body"
      } ${
        highlight
          ? "node-active border-accent-border bg-gradient-to-b from-accent-muted to-bg-elevated"
          : "border-border-hover"
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-full ${
          compact ? "h-5 w-5" : "h-6 w-6"
        } ${highlight ? "bg-accent text-bg" : "bg-bg-elevated-2 text-accent"}`}
      >
        <Icon className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden="true" />
      </span>
      <span className="break-words">{label}</span>
    </motion.div>
  );
}

export function FlowDiagram({
  steps,
  className = "",
  compact = false,
}: {
  steps: FlowStep[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`flex w-full flex-col items-center px-4 ${className}`}>
      {steps.map((step, i) => (
        <div key={`${step.label}-${i}`} className="flex w-full max-w-full flex-col items-center">
          <Node label={step.label} highlight={step.highlight} compact={compact} delay={i * 0.04} />

          {step.branches && step.branches.length > 0 && (
            <>
              <Connector compact={compact} />
              <div className="flex max-w-2xl flex-wrap items-center justify-center gap-2 py-1">
                {step.branches.map((branch, j) => (
                  <motion.div
                    key={branch}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.3, delay: j * 0.05 }}
                    className="max-w-full break-words rounded-full border border-accent-border bg-accent-muted px-3 py-1.5 text-center font-mono text-caption text-accent"
                  >
                    {branch}
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {i < steps.length - 1 && <Connector compact={compact} />}
        </div>
      ))}
    </div>
  );
}
