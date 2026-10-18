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

// Projects with an `image` (a 16:10 screenshot in /public/images) show it;
// the others get a distinct icon-on-gradient panel keyed by slug. Both use
// the same 16:10 frame on every screen size, so a screenshot is never cropped.
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
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-bg-elevated">
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
      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-accent-muted via-bg-elevated to-bg-elevated-2"
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
