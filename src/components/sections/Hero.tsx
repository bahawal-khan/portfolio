import { FaGithub } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TypingText } from "@/components/ui/TypingText";
import { hero, owner } from "@/lib/content";
import { HeroBackground } from "./HeroBackground";
import { HeroPortrait } from "./HeroPortrait";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <HeroBackground />

      <Container className="relative py-24 sm:py-28 md:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="order-1 flex flex-col justify-center">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              <p className="font-mono text-caption uppercase tracking-[0.15em] text-accent">
                {hero.intro} <span aria-hidden="true">{hero.wave}</span>
              </p>
            </div>
            <h1 className="mt-3 text-display font-bold tracking-tight text-text">
              BAHAWAL <span className="text-gradient">KHAN</span>
            </h1>
            <p className="mt-2 font-mono text-h3 tracking-[0.08em] text-text-muted">
              {owner.roleDisplay}
            </p>
          </div>

          <div className="order-2 flex items-center justify-center lg:row-span-2 lg:self-stretch">
            <HeroPortrait />
          </div>

          <div className="order-3 flex flex-col justify-center">
            <div className="min-h-[2.75rem] border-l-2 border-accent pl-4">
              <TypingText
                lines={hero.typingLines}
                className="font-mono text-body text-text sm:text-body-lg"
              />
            </div>

            <p className="mt-6 max-w-prose text-body-lg text-text-muted">
              {hero.supportingText}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="#projects">
                View Projects
                <LuArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href={owner.github} variant="secondary">
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                GitHub
              </Button>
              <Button href="#contact" variant="secondary">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
