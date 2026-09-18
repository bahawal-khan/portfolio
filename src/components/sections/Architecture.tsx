import { Container } from "@/components/ui/Container";
import { LayeredStack, type StackLayer } from "@/components/ui/LayeredStack";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { architecture } from "@/lib/content";

export function Architecture() {
  const layers: StackLayer[] = [
    { title: architecture.root, items: architecture.rootBranches, tint: "blue" },
    { title: architecture.mid, items: architecture.midBranches, tint: "violet" },
    { title: architecture.leaf, items: architecture.leafBranches, tint: "cyan" },
    { title: architecture.sink, tint: "neutral" },
  ];

  return (
    <section id="architecture" className="border-b border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Engineering"
          title="How the technologies connect"
          description="An explanatory view of how the stack layers together — not a claim that every project uses every piece."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14">
          <LayeredStack layers={layers} className="rounded-2xl border border-border bg-bg-elevated/40 px-6 py-10 sm:px-10" />
        </div>
      </Container>
    </section>
  );
}
