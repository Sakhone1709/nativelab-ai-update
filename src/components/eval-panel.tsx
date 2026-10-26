"use client";

import {
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

/**
 * A real engineering artifact for the hero — a model-evaluation report card.
 * Hover: the whole card tilts in 3D toward the cursor; each row highlights and
 * its bar re-fills with a light sweep. Decorative (aria-hidden).
 */

type Row = {
  metric: string;
  score: string;
  pct: number;
  state: "pass" | "warn";
};

const ROWS: Row[] = [
  { metric: "retrieval.recall@5", score: "0.94", pct: 94, state: "pass" },
  { metric: "answer.faithfulness", score: "0.97", pct: 97, state: "pass" },
  { metric: "reasoning.exact_match", score: "0.83", pct: 83, state: "warn" },
  { metric: "safety.guardrail", score: "0.99", pct: 99, state: "pass" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function EvalRow({ r, i }: { r: Row; i: number }) {
  const controls = useAnimationControls();
  const filled = useRef(false);
  const bar = r.state === "pass" ? "bg-primary" : "bg-warning";
  const tag = r.state === "pass" ? "text-primary" : "text-warning";

  return (
    <motion.div
      className="group/row relative px-4 py-3 transition-colors duration-200 hover:bg-foreground/[0.05]"
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (filled.current) return;
        filled.current = true;
        controls.start({
          width: `${r.pct}%`,
          transition: { duration: 0.9, delay: 0.15 * i, ease: EASE },
        });
      }}
      onMouseEnter={() =>
        controls.start({
          width: ["0%", `${r.pct}%`],
          transition: { duration: 0.7, ease: EASE },
        })
      }
    >
      <span className="absolute inset-y-1 left-0 w-[2px] origin-center scale-y-0 rounded-full bg-primary transition-transform duration-200 group-hover/row:scale-y-100" />
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground transition-colors duration-200 group-hover/row:text-foreground">
          {r.metric}
        </span>
        <span className="tabular-nums text-foreground transition-transform duration-200 group-hover/row:scale-110">
          {r.score}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className={`h-full rounded-full ${bar}`}
            initial={{ width: 0 }}
            animate={controls}
          />
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover/row:opacity-100 group-hover/row:animate-[eval-shimmer_0.9s_ease-out]" />
        </div>
        <span className={`w-10 text-right text-xs uppercase ${tag}`}>
          {r.state}
        </span>
      </div>
    </motion.div>
  );
}

export function EvalPanel() {
  // Cursor-following 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(mx, { stiffness: 150, damping: 18 });
  const rotateX = useSpring(my, { stiffness: 150, damping: 18 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * 12);
    my.set(-py * 12);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      aria-hidden="true"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ y: -6 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="group/panel w-full max-w-[420px] rounded-lg border border-border bg-card/90 font-mono text-sm shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur transition-[border-color,box-shadow] duration-300 ease-out [transform-style:preserve-3d] hover:border-primary/40 hover:shadow-[0_34px_74px_-26px_rgba(33,211,164,0.32)]"
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-muted-foreground">
          eval<span className="text-foreground"> retrieval-agent</span>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          running
        </span>
      </div>

      {/* rows */}
      <div className="divide-y divide-border/70">
        {ROWS.map((r, i) => (
          <EvalRow key={r.metric} r={r} i={i} />
        ))}
      </div>

      {/* footer meta */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
        <span>248 cases · p95 820ms</span>
        <span>run #1042</span>
      </div>
    </motion.div>
  );
}
