"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { LuX } from "react-icons/lu";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import type { Project } from "@/lib/content";
import { StatsGrid } from "./StatTile";

export function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const stats = [...(project.datasetStats ?? []), ...(project.trainingStats ?? [])];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        role="presentation"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-10 backdrop-blur-sm sm:p-6"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${project.slug}-modal-title`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl rounded-2xl border border-border bg-bg-elevated p-6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.6)] sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-accent-border hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <LuX className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="flex flex-wrap items-center gap-3 pr-10">
            <h3 id={`${project.slug}-modal-title`} className="text-h2 font-semibold text-text">
              {project.name}
            </h3>
            {project.status && (
              <span className="rounded-full border border-accent-border bg-accent-muted px-2.5 py-0.5 font-mono text-caption text-accent">
                {project.status}
              </span>
            )}
          </div>

          <p className="mt-3 text-body text-text-muted">{project.description}</p>

          {project.capabilities && (
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {project.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-center gap-2 font-mono text-caption text-text-muted"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {capability}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6">
            <FlowDiagram
              steps={project.flow}
              className="rounded-xl border border-border bg-bg-elevated-2/60 py-6"
            />
          </div>

          {stats.length > 0 && <StatsGrid stats={stats} wide className="mt-6" />}

          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-6">
              <StatsGrid
                wide
                stats={project.metrics.map((m) => ({ label: m.label, value: m.display }))}
              />
              {project.metricsNote && (
                <p className="mt-3 font-mono text-caption text-text-faint">
                  {project.metricsNote}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-border bg-bg-elevated-2 px-2 py-1 font-mono text-caption text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
