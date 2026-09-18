import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { LuFileText, LuMail, LuPhone } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, owner, resume } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(76,125,255,0.10),transparent_60%)]"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Contact"
          title={contact.headline}
          description={contact.text}
          align="center"
          className="mx-auto"
        />

        <ScrollReveal className="mx-auto mt-10 max-w-2xl">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button href={`mailto:${owner.email}`}>
              <LuMail className="h-4 w-4" aria-hidden="true" />
              Email
            </Button>
            <Button href={owner.phoneHref} variant="secondary">
              <LuPhone className="h-4 w-4" aria-hidden="true" />
              {owner.phone}
            </Button>
            <Button href={owner.github} variant="secondary">
              <FaGithub className="h-4 w-4" aria-hidden="true" />
              GitHub
            </Button>
            <Button href={owner.linkedin} variant="secondary">
              <FaLinkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </Button>
            <Button href={resume.resumeHref} variant="secondary">
              <LuFileText className="h-4 w-4" aria-hidden="true" />
              Resume
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
