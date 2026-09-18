import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatsGrid } from "./StatTile";
import { about } from "@/lib/content";

const quickFacts = [
  { label: "CGPA", value: "3.06" },
  { label: "Semester", value: "7th" },
  { label: "Program", value: "BS CS" },
];

export function About() {
  return (
    <section id="about" className="border-b border-border py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
          <div>
            <SectionHeading eyebrow="About" title={about.headline} />
            <div className="mt-6 max-w-prose space-y-6">
              <p className="text-body-lg text-text-muted">{about.paragraphs[0]}</p>
              <StatsGrid stats={quickFacts} className="max-w-sm" />
              {about.paragraphs.slice(1).map((p, i) => (
                <p key={i} className="text-body-lg text-text-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start">
            {about.progression.map((stage, i) => (
              <div key={stage} className="flex items-stretch gap-4">
                <div className="flex flex-col items-center">
                  <ScrollReveal delay={i * 0.05} y={0}>
                    <span
                      className={`flex h-3 w-3 shrink-0 rounded-full ${
                        i === about.progression.length - 1
                          ? "bg-accent-cyan shadow-[0_0_10px_2px_rgba(34,211,238,0.5)]"
                          : "bg-accent"
                      }`}
                    />
                  </ScrollReveal>
                  {i < about.progression.length - 1 && (
                    <span className="my-1 w-px flex-1 bg-gradient-to-b from-accent-border to-transparent" />
                  )}
                </div>
                <ScrollReveal delay={i * 0.05} y={0} className="pb-8">
                  <span className="font-mono text-body-lg text-text">
                    {stage}
                  </span>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
