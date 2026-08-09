"use client";

import { useEffect, useRef } from "react";

/**
 * Reconstructed placeholder: orbiting-circles-02.tsx imports this file, but it
 * wasn't included when the component was pasted in. This renders a comparable
 * rotating particle sphere with canvas 2D (no extra dependencies) — swap this
 * file for the original implementation if you have it.
 */
export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const POINT_COUNT = 260;
    const points = Array.from({ length: POINT_COUNT }, () => {
      // Roughly even coverage over the sphere surface.
      const u = Math.random();
      const theta = Math.acos(1 - 2 * u);
      const phi = Math.random() * Math.PI * 2;
      return {
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta),
      };
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let hidden = false;
    const handleVisibility = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let rafId = 0;
    let angle = 0;

    const render = () => {
      if (!hidden) {
        angle += prefersReducedMotion ? 0 : 0.004;
        ctx.clearRect(0, 0, width, height);

        const radius = Math.min(width, height) * 0.42;
        const cx = width / 2;
        const cy = height / 2;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const projected = points
          .map((p) => {
            const x = p.x * cosA - p.z * sinA;
            const z = p.x * sinA + p.z * cosA;
            const depthScale = (z + 2) / 3;
            return { x: cx + x * radius, y: cy + p.y * radius, z, depthScale };
          })
          .sort((a, b) => a.z - b.z);

        for (const p of projected) {
          const size = Math.max(0.6, p.depthScale * 2.2);
          const opacity = 0.25 + p.depthScale * 0.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14, 116, 144, ${opacity})`;
          ctx.fill();
        }
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
