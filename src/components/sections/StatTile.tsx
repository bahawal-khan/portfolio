export function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-h3 font-semibold text-accent sm:text-h2">{value}</p>
      <p className="mt-1 font-mono text-caption text-text-faint">{label}</p>
    </div>
  );
}

export function StatsGrid({
  stats,
  wide = false,
  className = "",
}: {
  stats: { label: string; value: string }[];
  wide?: boolean;
  className?: string;
}) {
  if (stats.length === 0) return null;

  return (
    <div
      className={`grid grid-cols-2 gap-x-6 gap-y-4 ${wide ? "sm:grid-cols-4" : "sm:grid-cols-3"} ${className}`}
    >
      {stats.map((stat) => (
        <StatTile key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
}
