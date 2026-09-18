import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { skillCategories } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="border-b border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Skills"
          description="Grouped by discipline — from classical ML through deep learning, generative and agentic AI, to the retrieval and tooling that ties it together."
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
          {skillCategories.map((category, i) => (
            <ScrollReveal key={category.title} delay={Math.min(i * 0.04, 0.2)}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-border bg-accent-muted text-accent">
                  <SkillIcon icon={category.categoryIcon} className="h-4 w-4" />
                </span>
                <h3 className="text-h3 font-medium text-accent">{category.title}</h3>
                <span className="font-mono text-caption text-text-faint">
                  ({category.items.length})
                </span>
              </div>
              <div
                className="mt-3 h-px w-full bg-gradient-to-r from-border via-border to-transparent"
                aria-hidden="true"
              />

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-7">
                {category.items.map((item, j) => (
                  <ScrollReveal key={item.label} delay={Math.min(j * 0.03, 0.24)} y={10}>
                    <IconBadge icon={item.icon} label={item.label} size="sm" />
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
