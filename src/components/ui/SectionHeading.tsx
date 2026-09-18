export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      {eyebrow && (
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          <span className="font-mono text-caption uppercase tracking-[0.15em] text-accent">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-h1 font-semibold text-text">{title}</h2>
      <span
        className="mt-3 block h-0.5 w-16 rounded-full bg-gradient-to-r from-accent to-accent-cyan"
        aria-hidden="true"
      />
      {description && (
        <p className="mt-5 max-w-prose text-body-lg text-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
