"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { LuFileText, LuMenu, LuX } from "react-icons/lu";
import { Container } from "@/components/ui/Container";
import { navLinks, owner, resume } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observerRef.current?.observe(section));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-mono text-body font-medium text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          BAHAWAL <span className="text-accent">KHAN</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "page" : undefined}
              className={`relative py-1 font-mono text-caption transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active === link.href
                  ? "text-accent"
                  : "text-text-muted hover:text-accent"
              }`}
            >
              {link.label}
              {active === link.href && (
                <span className="absolute -bottom-[1px] left-0 h-px w-full bg-accent" aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={owner.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href={owner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href={resume.resumeHref}
            download
            aria-label="Download résumé"
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-caption text-text-muted transition-colors hover:border-accent-border hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <LuFileText className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
        >
          {open ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-bg/95 backdrop-blur-md lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active === link.href ? "page" : undefined}
                className={`rounded-md px-2 py-2.5 font-mono text-body transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  active === link.href
                    ? "bg-bg-elevated text-accent"
                    : "text-text-muted hover:bg-bg-elevated hover:text-accent"
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3 flex items-center gap-4 border-t border-border px-2 pt-4">
              <a
                href={owner.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-text-muted transition-colors hover:text-accent"
                onClick={() => setOpen(false)}
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href={owner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-text-muted transition-colors hover:text-accent"
                onClick={() => setOpen(false)}
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href={resume.resumeHref}
                download
                className="flex items-center gap-1.5 font-mono text-caption text-text-muted transition-colors hover:text-accent"
                onClick={() => setOpen(false)}
              >
                <LuFileText className="h-4 w-4" aria-hidden="true" />
                Resume
              </a>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
