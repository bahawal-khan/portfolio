"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { LuExternalLink, LuLayoutPanelTop } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Project } from "@/lib/content";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({
  project,
  index,
  delay = 0,
}: {
  project: Project;
  index: number;
  delay?: number;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const reverse = index % 2 === 1;
  const tags = project.tech.slice(0, 4);

  return (
    <>
      <article
        id={project.slug}
        className="scroll-mt-24 rounded-2xl border border-border bg-bg-elevated/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-border hover:bg-bg-elevated/70 hover:shadow-[0_20px_50px_-20px_rgba(76,125,255,0.4)] sm:p-6"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-10">
          <ScrollReveal
            x={reverse ? 40 : -40}
            y={0}
            delay={delay}
            className={reverse ? "md:order-2" : "md:order-1"}
          >
            <ProjectVisual project={project} />
          </ScrollReveal>

          <ScrollReveal
            x={reverse ? -40 : 40}
            y={0}
            delay={delay + 0.08}
            className={reverse ? "md:order-1" : "md:order-2"}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-h3 font-semibold text-text">{project.name}</h3>
              {project.flagshipLabel && (
                <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-caption font-medium text-bg">
                  Flagship
                </span>
              )}
              {project.status && (
                <span className="rounded-full border border-accent-border bg-accent-muted px-2.5 py-0.5 font-mono text-caption text-accent">
                  {project.status}
                </span>
              )}
            </div>

            <p className="mt-3 line-clamp-2 text-body text-text-muted">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border bg-bg-elevated-2 px-2 py-1 font-mono text-caption text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button href={project.liveUrl} className="px-4 py-2 text-caption">
                  <LuExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live Demo
                </Button>
              )}
              {!project.liveUrl && project.liveUrlComingSoon && (
                <Button disabled className="px-4 py-2 text-caption" title="Not deployed yet">
                  <LuExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live Demo — Coming Soon
                </Button>
              )}
              <Button href={project.github} variant="secondary" className="px-4 py-2 text-caption">
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                GitHub
              </Button>
              <Button
                variant="secondary"
                onClick={() => setDetailsOpen(true)}
                className="px-4 py-2 text-caption"
              >
                <LuLayoutPanelTop className="h-4 w-4" aria-hidden="true" />
                View Details
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </article>

      {detailsOpen && (
        <ProjectDetailsModal project={project} onClose={() => setDetailsOpen(false)} />
      )}
    </>
  );
}
