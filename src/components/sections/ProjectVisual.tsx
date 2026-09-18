import Image from "next/image";
import type { IconType } from "react-icons";
import {
  LuBot,
  LuHeadset,
  LuLeaf,
  LuMessageCircle,
  LuTrendingDown,
} from "react-icons/lu";
import type { Project } from "@/lib/content";

// No project screenshots exist yet (see the `image` field comment in
// lib/content.ts) — each card gets a distinct icon-on-gradient panel
// instead, keyed by slug, so the zigzag layout still reads as "visual" on
// one side without inventing photography that doesn't exist.
const PROJECT_ICONS: Record<string, IconType> = {
  shopagent: LuBot,
  chatmodel: LuMessageCircle,
  "customer-assistant": LuHeadset,
  "plantcare-ai": LuLeaf,
  churnai: LuTrendingDown,
};

export function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-bg-elevated sm:aspect-[16/10]">
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.name} preview`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const Icon = PROJECT_ICONS[project.slug] ?? LuBot;

  return (
    <div
      className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-accent-muted via-bg-elevated to-bg-elevated-2 sm:aspect-[16/10]"
      aria-hidden="true"
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(76,125,255,0.28),transparent_70%)] blur-2xl" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent-border bg-bg-elevated/80 shadow-[0_0_32px_rgba(76,125,255,0.25)] sm:h-24 sm:w-24">
        <Icon className="h-9 w-9 text-accent sm:h-11 sm:w-11" />
      </div>
    </div>
  );
}
