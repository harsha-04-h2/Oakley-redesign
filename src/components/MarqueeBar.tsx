"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MarqueeBar() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(marqueeRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 1.8 // after hero loads
      });
    });
    return () => ctx.revert();
  }, []);

  const items = [
    "// PRIZM™ LENS TECHNOLOGY",
    "// O-MATTER™ FRAMES",
    "// UNOBTAINIUM® GRIP",
    "// IMPACT PROTECTION",
    "// HIGH DEFINITION OPTICS®",
    "// PRIZM™ LENS TECHNOLOGY",
    "// O-MATTER™ FRAMES",
  ];

  return (
    <div 
      ref={marqueeRef}
      className="marquee-bar absolute bottom-0 w-full overflow-hidden bg-surface-container-high/50 backdrop-blur-md py-3 border-t border-outline-variant/10 z-20"
    >
      <div className="marquee-track flex whitespace-nowrap gap-12 font-label uppercase text-xs tracking-widest text-on-surface opacity-70">
        {items.map((item, i) => (
          <span key={i} className="marquee-item cursor-default">{item}</span>
        ))}
        {/* Duplicate for seamless infinite scroll */}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="marquee-item cursor-default">{item}</span>
        ))}
      </div>
    </div>
  );
}
