"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const vertexShaderGLSL = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderGLSL = `
precision highp float;
varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_colorC;

float ribbon(vec2 uv, float freq, float speed, float thickness, float phase) {
  float wave = sin(uv.x * freq + u_time * speed + phase) * 0.16
             + sin(uv.x * freq * 1.7 - u_time * speed * 0.6 + phase * 1.3) * 0.06;
  float d = abs(uv.y - 0.5 - wave);
  return smoothstep(thickness, 0.0, d);
}

void main() {
  vec2 uv = vUv;
  uv.x *= u_resolution.x / u_resolution.y;

  vec3 col = vec3(0.0);
  col += u_colorA * ribbon(uv, 2.4, 0.14, 0.05, 0.0);
  col += u_colorB * ribbon(uv, 3.3, -0.11, 0.035, 2.1);
  col += u_colorC * ribbon(uv, 1.7, 0.08, 0.06, 4.4);
  col = min(col, vec3(1.0));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export interface AuroraShaderBackgroundProps {
  className?: string;
  /** Overall opacity of the effect, applied on the wrapper (0-1). */
  opacity?: number;
  colors?: [string, string, string];
}

const DEFAULT_COLORS: [string, string, string] = ["#60a5fa", "#818cf8", "#a78bfa"];

/**
 * Subtle animated "light ribbons" WebGL background — a second, visually
 * distinct shader effect from components/ui/velaris.tsx (flowing sine bands
 * instead of noise blobs), meant to sit behind content at low opacity.
 * No extra dependencies (raw WebGL), respects prefers-reduced-motion and
 * pauses when the tab is hidden.
 */
export default function AuroraShaderBackground({
  className,
  opacity = 0.35,
  colors = DEFAULT_COLORS,
}: AuroraShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const hexToRgb = (hex: string): [number, number, number] => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255,
    ];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderGLSL);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderGLSL);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const locs = {
      res: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      colorA: gl.getUniformLocation(program, "u_colorA"),
      colorB: gl.getUniformLocation(program, "u_colorB"),
      colorC: gl.getUniformLocation(program, "u_colorC"),
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;

    const resize = () => {
      const width = Math.max(1, Math.floor(container!.clientWidth * dpr));
      const height = Math.max(1, Math.floor(container!.clientHeight * dpr));
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        gl!.viewport(0, 0, width, height);
      }
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let hidden = false;
    const handleVisibility = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let rafId = 0;
    const start = performance.now();

    const [ra, ga, ba] = hexToRgb(colors[0]);
    const [rb, gb, bb] = hexToRgb(colors[1]);
    const [rc, gc, bc] = hexToRgb(colors[2]);

    const render = (now: number) => {
      if (!hidden) {
        const t = prefersReducedMotion ? 0 : (now - start) / 1000;
        gl!.uniform2f(locs.res, canvas!.width, canvas!.height);
        gl!.uniform1f(locs.time, t);
        gl!.uniform3f(locs.colorA, ra, ga, ba);
        gl!.uniform3f(locs.colorB, rb, gb, bb);
        gl!.uniform3f(locs.colorC, rc, gc, bc);
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      }
      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [colors]);

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} style={{ opacity }} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
