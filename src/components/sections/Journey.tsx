"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journeyStages } from "@/lib/content";

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.5"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const isCurrent = (i: number) => i === journeyStages.length - 1;

  return (
    <section id="journey" className="border-b border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Technical Journey"
          title="How the skillset was built"
          align="center"
          className="mx-auto"
        />

        <div ref={trackRef} className="relative mx-auto mt-16 max-w-2xl">
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-border"
            aria-hidden="true"
          />
          <motion.div
            style={{ scaleY }}
            className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-accent-cyan to-accent"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {journeyStages.map((stage, i) => (
              <ScrollReveal key={stage.title} delay={Math.min(i * 0.06, 0.3)}>
                <div className="relative flex gap-6 pl-[3.25rem]">
                  <span
                    className={`absolute left-1.5 top-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      isCurrent(i)
                        ? "node-active border-accent-cyan bg-accent-cyan/20"
                        : "border-accent bg-bg"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isCurrent(i) ? "bg-accent-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]" : "bg-accent"
                      }`}
                    />
                  </span>
                  <div>
                    <p className="flex items-center gap-2 font-mono text-caption text-text-faint">
                      Stage {String(i + 1).padStart(2, "0")}
                      {isCurrent(i) && (
                        <span className="rounded-full border border-accent-border bg-accent-muted px-2 py-0.5 text-accent-cyan">
                          Current
                        </span>
                      )}
                    </p>
                    <h3 className="mt-1 text-h3 font-semibold text-text">
                      {stage.title}
                    </h3>
                    <p className="mt-1.5 text-body text-text-muted">{stage.detail}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
