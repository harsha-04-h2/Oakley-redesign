"use client";

import { useEffect, useRef } from "react";
import { useMouseTrail } from "@/hooks/useMouseTrail";

export default function NoiseRevealCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const points = useMouseTrail(canvasRef);
  const rafRef = useRef<number | null>(null);
  const maleImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Preload male image for drawing on canvas
    const img = new Image();
    img.src = "/male.png";
    img.onload = () => {
      maleImageRef.current = img;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      // Clear main canvas
      ctx.clearRect(0, 0, w, h);
      
      if (!prefersReducedMotion && maleImageRef.current) {
        const img = maleImageRef.current;
        
        // Draw male image covering the canvas (object-fit: cover equivalent)
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;
        let drawW, drawH, drawX, drawY;

        if (imgRatio > canvasRatio) {
          drawH = h;
          drawW = h * imgRatio;
          drawX = (w - drawW) / 2;
          drawY = 0;
        } else {
          drawW = w;
          drawH = w / imgRatio;
          drawX = 0;
          drawY = (h - drawH) / 2;
        }
        
        // Draw male image as base
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // Erase using smooth radial gradients
        ctx.globalCompositeOperation = "destination-out";
        
        for (const pt of points.current) {
          pt.age++;
          const alpha = Math.max(0, 1 - pt.age / 100); // smoothly fade out over 100 frames for a longer tail
          
          if (alpha <= 0) continue;

          // Create very soft, large brush gradient
          const radius = pt.radius * 2.2; // Significant increase in brush size
          const gradient = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius);
          
          // Smooth ease for the alpha
          const easeAlpha = alpha * alpha * (3 - 2 * alpha);
          
          gradient.addColorStop(0, `rgba(0, 0, 0, ${easeAlpha})`);
          gradient.addColorStop(0.5, `rgba(0, 0, 0, ${easeAlpha * 0.7})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        points.current = points.current.filter((p) => p.age < 100);
      } else if (maleImageRef.current) {
        // Fallback for reduced motion: just draw male image
        const img = maleImageRef.current;
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;
        let drawW, drawH, drawX, drawY;

        if (imgRatio > canvasRatio) {
          drawH = h;
          drawW = h * imgRatio;
          drawX = (w - drawW) / 2;
          drawY = 0;
        } else {
          drawW = w;
          drawH = w / imgRatio;
          drawX = 0;
          drawY = (h - drawH) / 2;
        }
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }
      
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10"
      style={{ pointerEvents: 'auto' }}
    />
  );
}
