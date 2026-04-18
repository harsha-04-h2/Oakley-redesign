"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MetaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const metaTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=800",
          pin: true,
          scrub: 1.8
        }
      });

      // Background image zooms in slowly (Ken Burns)
      metaTl.fromTo(bgRef.current,
        { scale: 1 },
        { scale: 1.18, ease: "none" },
        0
      );

      // Glasses float up from below + fade in
      // Since they also have an idle float animation, we animate a wrapper
      metaTl.from(".meta-glasses-wrapper", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "expo.out"
      }, 0);

      // "OAKLEY" slides in from left
      gsap.from(".meta-word-oakley", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      });

      // "META" — outlined text, slides from right
      gsap.from(".meta-word-meta", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "expo.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="meta-section w-full relative py-40 overflow-hidden bg-background border-b border-surface-container-high/20 h-screen flex items-center justify-center">
      <div 
        ref={bgRef} 
        className="meta-bg absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-container via-background to-background" 
      />
      
      <div className="px-12 relative z-10 flex flex-col items-center text-center w-full">
        <div className="meta-badge font-label text-primary-container tracking-[0.2em] uppercase text-xs font-bold mb-6 border border-primary-container/30 px-6 py-2 rounded-full bg-primary-container/5 relative" data-text="Next Generation">
          Next Generation
        </div>
        
        <h2 className="font-headline text-8xl font-black uppercase tracking-normal text-primary flex gap-4">
          <span className="meta-word-oakley inline-block">Oakley</span> 
          <span className="meta-word-meta inline-block text-stroke opacity-50">Meta</span>
        </h2>
        
        <div className="mt-20 relative w-full max-w-5xl aspect-[21/9] flex items-center justify-center bg-[#1A1A2E]/40 backdrop-blur-3xl rounded-xl border border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
          <div className="meta-glasses-wrapper w-full h-full flex items-center justify-center">
            <img 
              className="meta-glasses w-2/3 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] mix-blend-screen" 
              alt="Oakley Meta Glasses" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy5G-LCenWS9LCkWEH2xpKonSopEMv4qyuxuOgwU-MGM30JVLTIimfpUWrhE8gzW8wp5_0BA3r_7Ja5dCyX8-mrIIC6oU9_WJl6w5nuAZSn5Z0lqVHs6oAr7IO4UwA4F2wRQFd3iXuKkSDqo4GgbFa7QknBJfY6Zs3SXhWEi1_sYHPOPLDu3v73LtOliLXnC7t9BO4OUgve2S5uwcKnOT0X6sDEzATKRgk7GEbvO8SwN7_K5RtWPZqaG6wd0sUBd66vqBemE1fd5U" 
            />
          </div>

          {/* Left HUD Chip */}
          <motion.div
            className="hud-chip chip-left absolute top-1/4 -left-12 bg-surface-container-highest border border-outline-variant/20 px-6 py-4 rounded shadow-2xl flex flex-col items-start gap-2"
            initial={{ x: -80, opacity: 0, scaleX: 0 }}
            whileInView={{ x: 0, opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="chip-line absolute right-[-40px] top-1/2 h-[1px] bg-primary-container"
              initial={{ width: 0 }}
              whileInView={{ width: "40px" }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <span className="font-label text-xs uppercase text-on-surface-variant tracking-wider">Display</span>
            <span className="font-body text-lg font-bold text-primary whitespace-nowrap">Micro-OLED HUD</span>
            <div className="meta-scan-line" />
          </motion.div>

          {/* Right HUD Chip */}
          <motion.div
            className="hud-chip chip-right absolute bottom-1/4 -right-12 bg-surface-container-highest border border-outline-variant/20 px-6 py-4 rounded shadow-2xl flex flex-col items-start gap-2"
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="chip-line absolute left-[-40px] top-1/2 h-[1px] bg-primary-container"
              initial={{ width: 0 }}
              whileInView={{ width: "40px" }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <span className="font-label text-xs uppercase text-on-surface-variant tracking-wider">Intelligence</span>
            <span className="font-body text-lg font-bold text-primary whitespace-nowrap">Real-time AI Coaching</span>
            <div className="meta-scan-line" />
          </motion.div>
        </div>
        
        <a className="mt-16 text-primary font-label font-bold uppercase tracking-widest text-sm pb-2 border-b-2 border-primary-container hover:text-primary-container transition-colors" href="#">
          Discover The Future
        </a>
      </div>
    </section>
  );
}
