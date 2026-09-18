import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="border-b border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          description="Five systems, one flagship — real architectures, real metrics, and how each one actually fits together."
        />

        <div className="mt-14 flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} delay={0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}
