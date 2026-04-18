"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PrizmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Pin the entire section while content animates in
      const prizm = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1
        }
      });

      // Left text block slides in from left
      prizm.from(textRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, 0);

      // Lens image parallax from right + subtle scale
      prizm.from(imageRef.current, {
        x: 100,
        opacity: 0,
        scale: 1.08,
        duration: 1,
        ease: "power3.out"
      }, 0.1);

      // Badge enters first
      prizm.from(".prizm-badge", {
        y: -20,
        opacity: 0,
        duration: 0.5
      }, 0);

      // Main headline words
      const words = gsap.utils.toArray(".prizm-headline .word");
      gsap.from(words, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        yPercent: 110,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out",
        clipPath: "inset(0 0 100% 0)"
      });

      // Custom Scramble Effect for "MISSING"
      const missingWord = document.querySelector(".word-missing") as HTMLElement;
      if (missingWord) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          onEnter: () => {
            let iterations = 0;
            const originalText = "MISSING";
            const chars = "ABCXYZ!@#$%";
            const interval = setInterval(() => {
              missingWord.innerText = originalText
                .split("")
                .map((letter, index) => {
                  if (index < iterations) return originalText[index];
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
              
              if (iterations >= originalText.length) clearInterval(interval);
              iterations += 1 / 3;
            }, 30);
          }
        });
      }

      // Feature Bullets - Stagger Reveal
      gsap.from(".prizm-bullet", {
        scrollTrigger: { trigger: ".prizm-bullets", start: "top 80%" },
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.18,
        ease: "power2.out"
      });

      gsap.from(".bullet-icon", {
        scrollTrigger: { trigger: ".prizm-bullets", start: "top 80%" },
        scale: 0,
        duration: 0.4,
        stagger: 0.18,
        delay: 0.1,
        ease: "back.out(2.5)"
      });

      // Lens Image - Color Saturation and Mask Reveal on Scrub
      gsap.fromTo(".prizm-lens-img",
        { 
          filter: "saturate(0) brightness(0.6)",
          clipPath: "circle(0% at 50% 50%)"
        },
        {
          filter: "saturate(1) brightness(1)",
          clipPath: "circle(100% at 50% 50%)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1.5
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="prizm-section w-full bg-background border-b border-surface-container-high/20 h-screen overflow-hidden">
      <div className="grid grid-cols-2 h-full">
        <div ref={textRef} className="flex flex-col justify-center p-24">
          <div className="font-label text-secondary-container tracking-[0.2em] uppercase text-xs font-bold mb-8">
            Optical Superiority
          </div>
          
          <h2 className="prizm-headline font-headline text-8xl font-bold uppercase tracking-normal leading-[0.9] text-primary mb-8 overflow-hidden">
            <span className="word inline-block">See</span> <span className="word inline-block">What</span> <span className="word inline-block">You've</span><br/>
            <span className="word inline-block">Been</span> <span className="word-missing text-secondary-container inline-block">MISSING</span>
          </h2>
          
          <p className="font-body text-on-surface-variant text-lg leading-relaxed mb-12">
            Prizm™ Lens Technology is engineered to enhance color and contrast so you can see more detail. Precision tuned for specific environments.
          </p>
          
          <div className="prizm-bullets flex flex-col gap-6">
            <div className="prizm-bullet flex items-center gap-6 p-6 bg-surface-container-low rounded border border-outline-variant/10">
              <span className="bullet-icon material-symbols-outlined text-secondary-container text-4xl">contrast</span>
              <div>
                <div className="font-label font-bold text-primary uppercase text-sm tracking-wider">Enhanced Contrast</div>
                <div className="font-body text-on-surface-variant mt-2">Reveals subtle details in the environment.</div>
              </div>
            </div>
            
            <div className="prizm-bullet flex items-center gap-6 p-6 bg-surface-container-low rounded border border-outline-variant/10">
              <span className="bullet-icon material-symbols-outlined text-secondary-container text-4xl">palette</span>
              <div>
                <div className="font-label font-bold text-primary uppercase text-sm tracking-wider">Vivid Colors</div>
                <div className="font-body text-on-surface-variant mt-2">Tunes the color spectrum for peak performance.</div>
              </div>
            </div>
          </div>
        </div>
        
        <div ref={imageRef} className="relative h-full overflow-hidden flex items-center">
          <img 
            className="prizm-lens-img w-full h-full object-cover" 
            alt="close up of premium sport sunglasses lens" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAygphnWE5xDUiTbN4zxwSPVk67Nnm6vcn0aR3EwPWl4By1yeT8mH77UVwi9Renz4QQduZbfLaGrXQySckw70hikpTZNI4M1j-lHKhzU027VwzJDhsTQWnWbMBP-GRwBPAPvaFvMIvYAM0UohR9cxI3-Qf9dD7-eBeTz39rzzD9AtHboWv-hnx0vz4YqRuZd-K1eFpkfRWf97CBTU29z0Uio6Lh-D__-XXgHpWLk1Yaa9Vy3Tk0zY0Swl4Mi0P64jy-VaizJE18r-g" 
          />
          <div className="prizm-badge absolute top-8 left-8 bg-[#1A1A2E]/80 backdrop-blur-[20px] border border-white/10 px-4 py-2 rounded font-label text-xs uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary-container rounded-full animate-pulse"></span>
            PRIZM™ Sapphire
          </div>
        </div>
      </div>
    </section>
  );
}
