import type { CSSProperties } from "react";
import { SkillIcon, getIconColor, type SkillIconKey } from "./SkillIcon";

function withAlpha(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function IconBadge({
  icon,
  label,
  size = "md",
}: {
  icon: SkillIconKey;
  label: string;
  size?: "sm" | "md";
}) {
  const dims = size === "sm" ? "2.75rem" : "3.5rem";
  const glyph = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const color = getIconColor(icon);

  const badgeStyle = {
    width: dims,
    height: dims,
    borderColor: withAlpha(color, 0.35),
    ["--badge-glow" as string]: withAlpha(color, 0.55),
  } as CSSProperties;

  return (
    <div className="group flex flex-col items-center gap-2 text-center">
      <div
        style={badgeStyle}
        className="flex items-center justify-center rounded-full border bg-bg-elevated transition-all duration-[250ms] ease-out group-hover:scale-110 group-hover:shadow-[0_0_18px_var(--badge-glow)]"
      >
        <SkillIcon icon={icon} className={glyph} style={{ color }} />
      </div>
      <span className="max-w-[9rem] font-mono text-caption text-text-muted transition-colors duration-[250ms] group-hover:text-text">
        {label}
      </span>
    </div>
  );
}
