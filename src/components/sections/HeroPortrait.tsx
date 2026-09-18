import Image from "next/image";
import { hero } from "@/lib/content";

// Circular portrait treatment per spec section 5: centered face, no
// stretching, soft dark backdrop, thin cyan/blue glow ring, and a very
// subtle secondary orbit ring — respects prefers-reduced-motion via the
// motion-safe: variant (no JS needed).
export function HeroPortrait() {
  return (
    <div className="relative mx-auto aspect-square w-72 sm:w-80 md:w-[24rem] lg:w-[28rem]">
      <div
        className="absolute inset-[-20%] rounded-full bg-[radial-gradient(circle,rgba(76,125,255,0.22),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-[-9%] motion-safe:animate-orbit"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-cyan shadow-[0_0_10px_3px_rgba(34,211,238,0.55)]" />
      </div>
      <div
        className="pointer-events-none absolute inset-[-4%] rounded-full border border-accent-border/40 motion-safe:animate-orbit-reverse"
        aria-hidden="true"
      />

      <div
        className="absolute inset-[6%] rounded-full bg-black/50 blur-2xl"
        style={{ transform: "translateY(14%) scale(0.92)" }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-accent-cyan to-accent p-[3px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55),0_0_44px_rgba(76,125,255,0.32)]">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-bg-elevated">
          <Image
            src={hero.portraitSrc}
            alt={hero.portraitAlt}
            fill
            sizes="(min-width: 1024px) 28rem, (min-width: 768px) 24rem, (min-width: 640px) 20rem, 18rem"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
