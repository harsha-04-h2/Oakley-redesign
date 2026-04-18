"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const tabs = ["Cycling", "Snow", "Surf", "Run"];

export default function PursuitSection() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".pursuit-title", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out"
      });

      gsap.from(".pursuit-tabs", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pursuit-section w-full bg-background py-32 px-12 border-b border-surface-container-high/20">
      <div className="max-w-[1440px] mx-auto w-full">
        <h2 className="pursuit-title font-headline text-6xl font-bold uppercase tracking-normal text-primary mb-12">
          Choose Your Pursuit
        </h2>
        
        <div className="pursuit-tabs relative flex gap-6 mb-16 border-b border-outline-variant/20 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-8 py-4 font-label uppercase tracking-widest text-sm font-bold transition-colors ${
                activeTab === tab ? "text-black" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  className="absolute inset-0 bg-primary-container rounded-sm -z-10"
                  layoutId="active-tab-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProductGrid tab={activeTab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProductGrid({ tab }: { tab: string }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, gridRef);
    return () => ctx.revert();
  }, [tab]);

  // Handle card shine effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + "%";
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + "%";
    card.style.setProperty("--x", x);
    card.style.setProperty("--y", y);
  };

  const products = [
    {
      id: 1,
      name: `KATO™ ${tab}`,
      image: "/kato-sapphire.png"
    },
    {
      id: 2,
      name: `SUTRO™ ${tab}`,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      name: `JAWBREAKER™ ${tab}`,
      image: "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      name: `ENCODER™ ${tab}`,
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div ref={gridRef} className="product-grid grid grid-cols-4 gap-6">
      {products.map((item) => (
        <motion.div
          key={item.id}
          className="product-card relative h-[400px] bg-surface-container-low rounded border border-outline-variant/10 overflow-hidden cursor-pointer group"
          whileHover={{ scale: 1.04, rotateX: 4, rotateY: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ transformPerspective: 800 }}
          onMouseMove={handleMouseMove}
        >
          {/* Image */}
          <img 
            src={item.image} 
            alt={item.name} 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500" 
          />

          {/* Card Shine */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
            style={{ background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(200,255,0,0.15), transparent 60%)" }}
          />
          
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-surface-bright group-hover:opacity-0 transition-opacity" />
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="font-label text-xs tracking-widest uppercase text-on-surface-variant mb-2 group-hover:text-black transition-colors shadow-sm">
              {tab} Performance
            </div>
            <div className="font-headline text-2xl uppercase text-primary group-hover:text-black transition-colors drop-shadow-md">
              {item.name}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
