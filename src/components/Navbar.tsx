"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -80",
        onEnter: () => gsap.to(navRef.current, {
          backgroundColor: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(20px)",
          borderBottomColor: "rgba(255,255,255,0.08)",
          duration: 0.4,
          ease: "power2.out"
        }),
        onLeaveBack: () => gsap.to(navRef.current, {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          borderBottomColor: "transparent",
          duration: 0.4
        })
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header 
      ref={navRef}
      className="navbar w-full border-b border-transparent bg-transparent fixed top-10 left-0 right-0 z-40 transition-colors"
      style={{ top: "auto" }} // since promo bar is relative and takes space, but navbar is sticky/fixed.
    >
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-8 py-6">
        <div className="text-4xl font-black italic tracking-tighter text-white font-headline leading-none">OAKLEY</div>
        <nav className="flex gap-8 items-center">
          <a className="nav-link font-label font-bold tracking-tighter uppercase text-white hover:text-primary-container transition-colors duration-300" href="#">Sunglasses</a>
          <a className="nav-link font-label font-bold tracking-tighter uppercase text-white hover:text-primary-container transition-colors duration-300" href="#">AI Glasses</a>
          <a className="nav-link font-label font-bold tracking-tighter uppercase text-white hover:text-primary-container transition-colors duration-300" href="#">Custom</a>
          <a className="nav-link font-label font-bold tracking-tighter uppercase text-white hover:text-primary-container transition-colors duration-300" href="#">Apparel</a>
          <a className="nav-link font-label font-bold tracking-tighter uppercase text-primary-container hover:text-white transition-colors duration-300" href="#">Explore</a>
        </nav>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-white hover:text-primary-container cursor-pointer transition-colors" data-icon="search">search</span>
            <span className="material-symbols-outlined text-white hover:text-primary-container cursor-pointer transition-colors" data-icon="shopping_bag">shopping_bag</span>
          </div>
          <a className="px-6 py-2 bg-primary-container text-black font-label font-bold uppercase tracking-widest text-xs rounded hover:bg-white transition-colors shadow-[0_10px_20px_rgba(255,90,0,0.2)]" href="#">
            Member Pill
          </a>
        </div>
      </div>
    </header>
  );
}
