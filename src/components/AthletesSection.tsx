"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AthletesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Curtain Reveal - 3 Athletes
      gsap.from(".athlete-col", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        },
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        stagger: 0.18,
        ease: "expo.inOut"
      });

      // Grayscale to Color on Scroll
      gsap.fromTo(".athlete-img",
        { filter: "grayscale(100%) brightness(0.7)" },
        {
          filter: "grayscale(0%) brightness(1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1
          },
          stagger: 0.15
        }
      );

      // Center Headline - "WORN BY THE BEST"
      const worn = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }
      });

      worn
        .from(".worn-line-1", {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
          clipPath: "inset(0 0 100% 0)"
        })
        .from(".worn-line-2", {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
          clipPath: "inset(0 0 100% 0)"
        }, "-=0.5");

      // Parallax Depth Layers
      const depths = [0.85, 1.0, 0.9];
      const cols = gsap.utils.toArray<HTMLElement>(".athlete-col");
      cols.forEach((col, i) => {
        gsap.to(col, {
          yPercent: -10 * depths[i],
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: depths[i]
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const athletes = [
    { src: "/athlete_biker.png", translateY: "translate-y-0" },
    { src: "/athlete_snowboarder.png", translateY: "translate-y-16" },
    { src: "/athlete_runner.png", translateY: "translate-y-0" },
  ];

  return (
    <section ref={sectionRef} className="athletes-section w-full bg-background py-32 px-12 border-b border-surface-container-high/20">
      <div className="relative max-w-[1440px] mx-auto">
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 font-headline text-[10rem] font-black uppercase tracking-normal text-primary whitespace-nowrap mix-blend-difference pointer-events-none text-center leading-[0.8]">
          <div className="overflow-hidden inline-block"><span className="worn-line-1 block">Worn By</span></div><br/>
          <div className="overflow-hidden inline-block"><span className="worn-line-2 block">The Best</span></div>
        </h2>
        
        <div className="grid grid-cols-3 gap-6">
          {athletes.map((athlete, i) => (
            <motion.div
              key={i}
              className={`athlete-col h-[800px] rounded overflow-hidden relative group ${athlete.translateY}`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <img 
                className="athlete-img w-full h-full object-cover transition-all duration-1000" 
                alt="Oakley Athlete" 
                src={athlete.src} 
              />
              <motion.div
                className="athlete-vignette absolute inset-0 bg-background/40"
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
