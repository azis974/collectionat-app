"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scaleDimensions = () => [1.05, 1];

  const rotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center px-4 pb-20 pt-24 md:pb-32 md:pt-32"
      style={{ perspective: "1200px" }}
    >
      <div className="relative w-full max-w-6xl">
        <motion.div style={{ opacity }} className="mx-auto max-w-3xl text-center">
          {titleComponent}
        </motion.div>
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Card({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        y: translate,
        transformStyle: "preserve-3d",
      }}
      className="mx-auto mt-12 h-[24rem] w-full max-w-5xl rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-2 shadow-glow sm:h-[28rem] md:h-[38rem] md:p-4"
    >
      <div className="size-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
        {children}
      </div>
    </motion.div>
  );
}
