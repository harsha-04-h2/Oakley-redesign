"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IconsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Cards wipe in from bottom via clipPath
      gsap.from(".icons-card", {
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: "top 78%", 
          toggleActions: "play none none reverse" 
        },
        clipPath: "inset(100% 0 0 0)", // Wipes from bottom
        y: 20,
        duration: 1.1,
        stagger: 0.2,
        ease: "expo.inOut"
      });

      // Section title — letter spacing expand
      gsap.from(".icons-title", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        letterSpacing: "0.5em",
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="icons-section w-full bg-background py-32 px-12 border-b border-surface-container-high/20">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="icons-title font-headline text-7xl font-bold uppercase tracking-normal text-primary mb-16 text-center">
          The Icons
        </h2>
        <div className="grid grid-cols-2 gap-8 h-[600px]">
          
          {/* Holbrook */}
          <motion.div 
            className="icons-card icon-card relative rounded overflow-hidden border border-outline-variant/10 cursor-pointer"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.img 
              className="w-full h-full object-cover" 
              alt="Holbrook" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrDjtUho_kVKtl5DhkRwfy1nl_eew5aCTKliBUmjEkoSaBG4BEu_Mi7eUNfkC3QjloE68lvlZjVXyPIlj5GOz9GIuSZkH3Vsv9ubBec8hgl5YKNxgH5BVK8mvqiqn8fVet64DkCiIWpmAwEW72VpZtBKEjuynUp_CFmVCp-_w3RPJDJbaav8a8uH6AGkW6FejwtbneYpnBeilbON7YhC3HTzxGRi9eSCUxj5xdMxOlz44smZyddcbKGQlo_xDCGSKQjiDGPmb_Rjw" 
              variants={{
                rest:  { scale: 1,    filter: "brightness(0.8)" },
                hover: { scale: 1.08, filter: "brightness(1.05)" }
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <motion.div 
              className="card-overlay absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
              variants={{ rest: { opacity: 1 }, hover: { opacity: 0.3 } }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute bottom-12 left-12 z-10">
              <div className="font-label text-sm tracking-[0.2em] uppercase text-on-surface-variant mb-4">Lifestyle</div>
              <h3 className="font-headline text-5xl font-bold uppercase text-primary mb-4">Holbrook™</h3>
              <motion.div
                className="card-cta font-label font-bold text-primary-container tracking-widest text-sm uppercase"
                variants={{
                  rest:  { y: 20, opacity: 0 },
                  hover: { y: 0,  opacity: 1 }
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                SHOP NOW →
              </motion.div>
            </div>
            {/* Lens flare dot travels across card */}
            <motion.div
              className="lens-flare absolute top-1/2 left-0 w-32 h-32 bg-primary-container rounded-full blur-[80px] pointer-events-none mix-blend-screen"
              variants={{
                rest:  { x: "-100%", opacity: 0 },
                hover: { x: "400%", opacity: [0, 0.6, 0] }
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Radar EV */}
          <motion.div 
            className="icons-card icon-card relative rounded overflow-hidden border border-outline-variant/10 flex items-center justify-center bg-surface-container-highest cursor-pointer"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div 
              className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541625602330-2277a4c4618c?q=80&w=2940&auto=format&fit=crop')] bg-cover mix-blend-overlay"
              variants={{
                rest:  { scale: 1,    filter: "brightness(0.8)" },
                hover: { scale: 1.08, filter: "brightness(1.05)" }
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <motion.div 
              className="card-overlay absolute inset-0 bg-background"
              variants={{ rest: { opacity: 0 }, hover: { opacity: 0.3 } }}
              transition={{ duration: 0.4 }}
            />
            <div className="relative z-10 text-center p-12">
              <h3 className="font-headline text-5xl font-bold uppercase text-primary mb-4">Radar® EV Path</h3>
              <p className="font-label text-sm tracking-widest uppercase text-secondary-container mb-6">Performance Heritage</p>
              <motion.div
                className="card-cta font-label font-bold text-primary-container tracking-widest text-sm uppercase"
                variants={{
                  rest:  { y: 20, opacity: 0 },
                  hover: { y: 0,  opacity: 1 }
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                SHOP NOW →
              </motion.div>
            </div>
            <motion.div
              className="lens-flare absolute top-1/2 left-0 w-32 h-32 bg-primary-container rounded-full blur-[80px] pointer-events-none mix-blend-screen"
              variants={{
                rest:  { x: "-100%", opacity: 0 },
                hover: { x: "400%", opacity: [0, 0.6, 0] }
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
