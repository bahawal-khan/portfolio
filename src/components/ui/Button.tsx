import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-body font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-accent text-bg hover:bg-accent-hover active:bg-accent-hover",
  secondary:
    "border border-border text-text hover:border-accent-border hover:text-accent active:border-accent",
};

type Variant = keyof typeof variants;

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  title?: string;
};

export function Button({
  variant = "primary",
  className = "",
  href,
  children,
  onClick,
  type = "button",
  disabled,
  title,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
        >
          {children}
        </a>
      );
    }
    if (href.startsWith("mailto:") || href.startsWith("tel:") || /\.[a-z0-9]{2,4}$/i.test(href)) {
      return (
        <a href={href} className={cls} title={title}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} title={title}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} title={title}>
      {children}
    </button>
  );
}
