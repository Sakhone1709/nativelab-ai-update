"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

type AiCoreProps = {
  /** Square size in px. Omit to size it via `className` (e.g. `h-[300px] w-[300px] lg:h-[460px] lg:w-[460px]`). */
  size?: number;
  className?: string;
};

/** A single dot orbiting the core. The wrapper spins; the dot rides its top edge. */
function Orbit({
  diameter,
  duration,
  reverse,
  dotClassName,
  reduce,
}: {
  /** Orbit diameter as a fraction of the container (0–1). */
  diameter: number;
  duration: number;
  reverse?: boolean;
  dotClassName: string;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: `${diameter * 100}%`,
        height: `${diameter * 100}%`,
        marginLeft: `-${diameter * 50}%`,
        marginTop: `-${diameter * 50}%`,
      }}
      animate={reduce ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <span
        className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${dotClassName}`}
      />
    </motion.div>
  );
}

export function AiCore({ size, className }: AiCoreProps) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center text-primary ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "78%",
          height: "78%",
          background:
            "radial-gradient(circle, rgba(33,211,164,0.28), transparent 68%)",
          filter: "blur(10px)",
        }}
        animate={
          reduce ? undefined : { opacity: [0.45, 0.85, 0.45], scale: [0.92, 1.06, 0.92] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sonar pulses radiating outward */}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border border-primary/40"
            style={{ width: "40%", height: "40%" }}
            initial={{ scale: 0.6, opacity: 0.5 }}
            animate={{ scale: 2.3, opacity: 0 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Concentric rings — dashed circles rotate around their own center (fill-box) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        fill="none"
      >
        {/* Static faint guide rings */}
        <circle cx="100" cy="100" r="96" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.5" />

        {/* Outer dashed ring, slow clockwise */}
        <motion.circle
          cx="100"
          cy="100"
          r="88"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeDasharray="2 10"
          strokeLinecap="round"
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
        />

        {/* Mid ring with arc highlights, counter-clockwise */}
        <motion.g
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="72" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          <circle
            cx="100"
            cy="100"
            r="72"
            stroke="currentColor"
            strokeOpacity="0.9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="60 392"
          />
          <circle
            cx="100"
            cy="100"
            r="72"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="24 428"
            strokeDashoffset="-240"
          />
        </motion.g>

        {/* Inner dashed ring, faster clockwise */}
        <motion.circle
          cx="100"
          cy="100"
          r="46"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="1 7"
          strokeLinecap="round"
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />

        {/* Node markers on the outer ring */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={100 + 88 * Math.cos(rad)}
              cy={100 + 88 * Math.sin(rad)}
              r="2"
              fill="currentColor"
              fillOpacity="0.7"
            />
          );
        })}
      </svg>

      {/* Orbiting satellite dots (HTML layer for rock-solid transform-origin) */}
      <Orbit
        diameter={0.88}
        duration={18}
        dotClassName="h-2.5 w-2.5 bg-primary shadow-[0_0_14px_3px_rgba(33,211,164,0.7)]"
        reduce={reduce}
      />
      <Orbit
        diameter={0.62}
        duration={12}
        reverse
        dotClassName="h-2 w-2 bg-primary/90 shadow-[0_0_10px_2px_rgba(33,211,164,0.6)]"
        reduce={reduce}
      />

      {/* Central core */}
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: "30%",
          height: "30%",
          background:
            "radial-gradient(circle at 35% 30%, rgba(120,255,222,0.95), rgba(33,211,164,0.85) 38%, rgba(4,57,39,0.7) 72%, rgba(2,8,6,0.9))",
          boxShadow:
            "0 0 48px rgba(33,211,164,0.55), inset 0 0 24px rgba(2,8,6,0.55)",
        }}
        animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <BrainCircuit className="h-1/2 w-1/2 text-primary-foreground" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}
