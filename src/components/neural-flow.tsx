"use client";

/**
 * Animated neural-network visual for the about/profile section.
 * Pure SVG + CSS (keyframes in globals.css) — deterministic so it is
 * SSR-safe, and it auto-stills under prefers-reduced-motion.
 */

const W = 400;
const H = 300;
const PAD_X = 52;
const PAD_Y = 44;
const LAYERS: number[] = [3, 5, 5, 3];

type Node = { id: string; x: number; y: number; li: number };

const nodes: Node[] = LAYERS.flatMap((count, li) => {
  const x = PAD_X + (li * (W - 2 * PAD_X)) / (LAYERS.length - 1);
  return Array.from({ length: count }, (_, ni) => ({
    id: `${li}-${ni}`,
    x,
    y: count === 1 ? H / 2 : PAD_Y + (ni * (H - 2 * PAD_Y)) / (count - 1),
    li,
  }));
});

const byLayer = LAYERS.map((_, li) => nodes.filter((n) => n.li === li));

const edges: { a: Node; b: Node }[] = [];
for (let li = 0; li < LAYERS.length - 1; li++) {
  for (const a of byLayer[li]) {
    for (const b of byLayer[li + 1]) edges.push({ a, b });
  }
}

export function NeuralFlow() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(120%_120%_at_30%_20%,rgba(118,185,0,0.12),transparent_60%)]"
    >
      <div className="technical-grid absolute inset-0 opacity-40" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="nfGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="nfScan" x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#76b900" stopOpacity="0" />
            <stop offset="0.5" stopColor="#76b900" stopOpacity="0.85" />
            <stop offset="1" stopColor="#76b900" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* faint mesh */}
        {edges.map((e, i) => (
          <line
            key={`m${i}`}
            x1={e.a.x}
            y1={e.a.y}
            x2={e.b.x}
            y2={e.b.y}
            stroke="#76b900"
            strokeOpacity="0.1"
            strokeWidth="0.6"
          />
        ))}

        {/* data packets flowing along ~half the edges */}
        {edges
          .filter((_, i) => i % 2 === 0)
          .map((e, i) => (
            <line
              key={`p${i}`}
              className="nf-pulse"
              x1={e.a.x}
              y1={e.a.y}
              x2={e.b.x}
              y2={e.b.y}
              pathLength={46}
              stroke="#76b900"
              strokeWidth="1.7"
              strokeLinecap="round"
              filter="url(#nfGlow)"
              style={{ animationDelay: `${-((i * 0.43) % 2.6).toFixed(2)}s` }}
            />
          ))}

        {/* scanning evaluation line */}
        <line
          className="nf-scan"
          x1="20"
          y1="0"
          x2={W - 20}
          y2="0"
          stroke="url(#nfScan)"
          strokeWidth="2"
        />

        {/* nodes: pulsing halo + bright core */}
        {nodes.map((n, i) => (
          <g key={n.id}>
            <circle
              className="nf-halo"
              cx={n.x}
              cy={n.y}
              r="7"
              fill="#76b900"
              fillOpacity="0.16"
              style={{ animationDelay: `${((i % 6) * 0.45).toFixed(2)}s` }}
            />
            <circle cx={n.x} cy={n.y} r="3" fill="#76b900" />
            <circle cx={n.x} cy={n.y} r="1.1" fill="#03231a" />
          </g>
        ))}

        {/* HUD corner brackets */}
        <g stroke="#76b900" strokeOpacity="0.4" strokeWidth="1.2" fill="none">
          <path d="M14 30 L14 14 L30 14" />
          <path d={`M${W - 30} 14 L${W - 14} 14 L${W - 14} 30`} />
          <path d={`M14 ${H - 30} L14 ${H - 14} L30 ${H - 14}`} />
          <path d={`M${W - 30} ${H - 14} L${W - 14} ${H - 14} L${W - 14} ${H - 30}`} />
        </g>
      </svg>
    </div>
  );
}
