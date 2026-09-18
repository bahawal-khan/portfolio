import { HeroVisual } from "./HeroVisual";

// Subtle AI/technology backdrop: faint grid + soft blue/cyan glow + a
// low-opacity node network. Deliberately restrained — must never compete
// with the headline or the portrait (spec section 6).
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid" />

      <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(76,125,255,0.12),transparent_65%)] blur-3xl motion-safe:animate-drift" />
      <div className="absolute -left-32 bottom-[-6rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.09),transparent_65%)] blur-3xl" />

      <div className="absolute -right-16 top-8 h-[26rem] w-[26rem] opacity-[0.12] motion-safe:animate-drift [animation-duration:36s]">
        <HeroVisual />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}
