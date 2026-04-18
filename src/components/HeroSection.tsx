"use client";

import { useEffect, useRef, useState } from "react";
import NoiseRevealCanvas from "./NoiseRevealCanvas";
import MarqueeBar from "./MarqueeBar";
import gsap from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Initial animations
    const ctx = gsap.context(() => {
      // Headline clipPath reveal
      gsap.fromTo(".hero-headline-word",
        { clipPath: "inset(0 0 100% 0)", y: 50 },
        { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1, stagger: 0.15, ease: "expo.out", delay: 0.6 }
      );

      // Subtext fade up
      gsap.fromTo(".hero-subtext",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = () => {
    setIsScratching(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsScratching(false);
    }, 1200); // text comes back after 1.2s of no movement
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsScratching(false);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Female model (hidden underneath) */}
      <Image
        src="/female.png"
        alt="Oakley Female Model"
        fill
        className="object-cover z-0 scale-105" // slight scale for parallax feel if needed
        priority
      />

      {/* Male model canvas on top */}
      <NoiseRevealCanvas />

      <div 
        className={`absolute inset-0 z-20 pointer-events-none transition-all duration-700 ease-in-out ${isScratching ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
      >
        <HeroContent />
      </div>
      
      <MarqueeBar />
    </section>
  );
}

function HeroContent() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8">
      <div className="text-4xl font-black italic tracking-tighter text-white font-headline leading-none">OAKLEY</div>
      
      <div className="flex flex-col items-center justify-center h-full text-center mt-20">
        <h1 className="font-headline text-[12vw] leading-[0.85] tracking-normal uppercase text-primary drop-shadow-2xl">
          <div className="overflow-hidden inline-block"><span className="hero-headline-word block">ENGINEERED</span></div>
          <br />
          <div className="overflow-hidden inline-block"><span className="hero-headline-word block text-stroke">FOR THE EDGE</span></div>
        </h1>
        
        <div className="hero-subtext mt-8 flex flex-col items-center pointer-events-auto">
          <div className="flex gap-6">
            <a href="#" className="px-8 py-4 bg-primary-container text-black font-label font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2">
              SHOP PERFORMANCE
            </a>
            <a href="#" className="px-8 py-4 bg-transparent border border-white/20 text-primary font-label font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
              EXPLORE TECHNOLOGY
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="material-symbols-outlined text-white">keyboard_arrow_down</span>
      </div>
    </div>
  );
}
