// Static SVG node network — stands in for the Phase 2 R3F hero and will
// also serve as its no-WebGL / prefers-reduced-motion fallback.
const nodes = [
  { x: 60, y: 40 },
  { x: 180, y: 90 },
  { x: 300, y: 50 },
  { x: 90, y: 180 },
  { x: 230, y: 210 },
  { x: 340, y: 170 },
  { x: 150, y: 280 },
  { x: 280, y: 320 },
  { x: 60, y: 340 },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [4, 2],
  [4, 5],
  [3, 6],
  [4, 7],
  [6, 8],
  [6, 7],
];

export function HeroVisual() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of an interconnected node network representing AI systems"
    >
      <g stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i % 3 === 0 ? 5 : 3}
            fill="var(--accent)"
            fillOpacity={i % 3 === 0 ? 0.9 : 0.6}
            className="animate-pulse"
            style={{ animationDelay: `${i * 220}ms`, animationDuration: "3s" }}
          />
        ))}
      </g>
    </svg>
  );
}
