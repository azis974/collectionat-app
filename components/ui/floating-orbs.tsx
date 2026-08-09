import { cn } from "@/lib/utils";

export interface FloatingOrbsProps {
  /** Blob colors, in CSS color syntax (hex, rgb, etc). 2-4 works best. */
  colors: string[];
  className?: string;
}

const POSITIONS = [
  { top: "8%", left: "12%" },
  { top: "55%", left: "72%" },
  { top: "70%", left: "20%" },
  { top: "15%", left: "68%" },
];

/**
 * Soft, blurred gradient blobs that drift and breathe via CSS only (reuses
 * the existing `float` / `pulse-glow` keyframes from tailwind.config.ts) —
 * a lighter-weight, visually distinct alternative to the WebGL shaders
 * (velaris.tsx / aurora-shader-bg.tsx) for sections that don't need a full
 * canvas. Respects prefers-reduced-motion via the site-wide media query in
 * globals.css.
 */
export default function FloatingOrbs({ colors, className = "" }: FloatingOrbsProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {colors.slice(0, 4).map((color, i) => {
        const pos = POSITIONS[i % POSITIONS.length];
        const size = 260 + i * 60;
        return (
          <div
            key={i}
            className="absolute animate-float rounded-full blur-3xl"
            style={{
              top: pos.top,
              left: pos.left,
              width: size,
              height: size,
              background: color,
              opacity: 0.32,
              animationDuration: `${7 + i * 1.6}s`,
              animationDelay: `${i * -1.4}s`,
            }}
          />
        );
      })}
    </div>
  );
}
