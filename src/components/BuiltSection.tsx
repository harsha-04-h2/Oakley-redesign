"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BuiltSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Split Entrance
      gsap.from(".built-text-col", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        x: -70,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      });

      gsap.from(".built-glasses-col", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        x: 70,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "expo.out"
      });

      // Headline - Word by Word
      gsap.from(".built-word", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: "110%",
        duration: 0.75,
        stagger: 0.08,
        ease: "expo.out",
        clipPath: "inset(0 0 100% 0)"
      });
      
      // Animated Counter
      gsap.to(".combo-count", {
        innerText: 1000000,
        duration: 2,
        snap: { innerText: 50000 },
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        onUpdate: function() {
          const target = this.targets()[0];
          target.innerText = new Intl.NumberFormat().format(Math.round(Number(target.innerText.replace(/,/g, ''))));
        }
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <section ref={sectionRef} className="built-section w-full bg-background border-b border-surface-container-high/20 overflow-hidden">
      <div className="grid grid-cols-2 max-w-[1440px] mx-auto">
        
        <div className="built-glasses-col relative h-[800px] flex items-center justify-center bg-surface-container-high">
          <img 
            className="built-glasses w-full h-full object-cover mix-blend-screen drop-shadow-2xl" 
            alt="exploded view of sunglasses" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNfed6eHjUxvR46Rj5Or-vOpfUF5uGEocemgcMzk-Divyj0KIAw5PA8PV4EqCthxJW9qhKzLfU6CzxPeE4nlDn_vuaLwqPWt1ikFdjrIigavz59xZAbr2BTgH4nIc7E-Oa5HNpWKfrSb_G0T_DMXMCs9dhWvM1y6-M2ejSAbyh9zkSK0VqzU2umV82TykKbtBaLEu0QDljXYziiS-4WToVVIbg43VslDcy3kCLhI3aJeB3fbOLgRVikEz1VFkmZqEY4i62Y9XCbsI" 
          />
        </div>
        
        <div className="built-text-col flex flex-col justify-center p-24 bg-background">
          <h2 className="font-headline text-8xl font-bold uppercase tracking-normal text-primary leading-[0.9]">
            <div className="overflow-hidden inline-block"><span className="built-word inline-block">Built</span></div> <div className="overflow-hidden inline-block"><span className="built-word inline-block">For</span></div> <div className="overflow-hidden inline-block"><span className="built-word inline-block">You.</span></div><br/>
            <div className="overflow-hidden inline-block"><span className="built-word text-on-surface-variant inline-block">Only.</span></div>
          </h2>
          
          <p className="mt-8 font-body text-xl text-on-surface-variant max-w-md">
            <span className="combo-count font-headline text-3xl text-primary block mb-2">0</span>
            combinations. Choose your frame, lens, icons, and earsocks. Make it unmistakably yours.
          </p>
          
          <button 
            ref={btnRef}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            className="built-cta mt-12 px-8 py-5 bg-transparent border border-primary-container text-primary font-label font-bold uppercase tracking-widest text-sm rounded-full hover:bg-primary-container hover:text-black transition-colors flex items-center gap-3 w-max"
          >
            Start Customizing
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
        
      </div>
    </section>
  );
}
