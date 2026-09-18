import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Container } from "@/components/ui/Container";
import { owner } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-caption text-text-faint">
          © {new Date().getFullYear()} {owner.name} — AI/ML Engineer
        </p>

        <div className="flex items-center gap-4">
          <a
            href={owner.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-text-faint transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a
            href={owner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-text-faint transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <FaLinkedin className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
