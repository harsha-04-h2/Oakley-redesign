"use client";

import { useEffect, useRef } from "react";

export type TrailPoint = {
  x: number;
  y: number;
  age: number;
  vx: number;
  vy: number;
  radius: number;
};

export function useMouseTrail(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const points = useRef<TrailPoint[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const vx = e.clientX - lastPos.current.x;
      const vy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(vx * vx + vy * vy);
      
      points.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        age: 0,
        vx,
        vy,
        // Make the radius significantly larger and more dynamic based on speed for a "playful" feel
        radius: 120 + Math.min(speed * 1.2, 100),
      });

      // Allow more points to be kept alive for a longer, more dramatic trail
      if (points.current.length > 60) {
        points.current.shift();
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleInitialPos = (e: MouseEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
      window.removeEventListener("mousemove", handleInitialPos);
    };

    window.addEventListener("mousemove", handleInitialPos);
    canvas.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleInitialPos);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [canvasRef]);

  return points;
}
