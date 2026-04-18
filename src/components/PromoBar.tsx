"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PromoBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(barRef.current, {
        y: -48,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={barRef}
      className="promo-bar w-full bg-primary-container text-black py-2 px-4 text-center font-label text-xs font-bold tracking-widest uppercase z-50 relative"
    >
      <span className="promo-text">Free Shipping on All Orders Over $100.</span>
    </div>
  );
}
