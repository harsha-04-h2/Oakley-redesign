"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
      
      gsap.from(".footer-brand", {
        scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
        opacity: 0,
        duration: 1.5,
        delay: 0.6,
        ease: "none"
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.classList.add("glitch");
  };
  
  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.classList.remove("glitch");
  };

  return (
    <footer ref={footerRef} className="w-full bg-[#050505] py-24 px-12 border-t border-surface-container-high/20">
      <div className="max-w-[1440px] mx-auto grid grid-cols-4 gap-12">
        <div className="footer-col flex flex-col gap-4">
          <div className="font-label font-bold text-primary uppercase text-sm tracking-widest mb-4">Shop</div>
          <a href="#" onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="font-body text-on-surface-variant hover:text-white transition-colors" data-text="Sunglasses">Sunglasses</a>
          <a href="#" onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="font-body text-on-surface-variant hover:text-white transition-colors" data-text="Apparel">Apparel</a>
          <a href="#" onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="font-body text-on-surface-variant hover:text-white transition-colors" data-text="Custom">Custom</a>
        </div>
        
        <div className="footer-col flex flex-col gap-4">
          <div className="font-label font-bold text-primary uppercase text-sm tracking-widest mb-4">Support</div>
          <a href="#" onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="font-body text-on-surface-variant hover:text-white transition-colors" data-text="Order Status">Order Status</a>
          <a href="#" onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="font-body text-on-surface-variant hover:text-white transition-colors" data-text="Returns">Returns</a>
          <a href="#" onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="font-body text-on-surface-variant hover:text-white transition-colors" data-text="Warranty">Warranty</a>
        </div>
        
        <div className="footer-col flex flex-col gap-4">
          <div className="font-label font-bold text-primary uppercase text-sm tracking-widest mb-4">Explore</div>
          <a href="#" onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="font-body text-on-surface-variant hover:text-white transition-colors" data-text="Technology">Technology</a>
          <a href="#" onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="font-body text-on-surface-variant hover:text-white transition-colors" data-text="Athletes">Athletes</a>
          <a href="#" onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} className="font-body text-on-surface-variant hover:text-white transition-colors" data-text="Heritage">Heritage</a>
        </div>
        
        <div className="footer-col flex flex-col gap-4">
          <div className="font-label font-bold text-primary uppercase text-sm tracking-widest mb-4">Connect</div>
          <div className="flex gap-4 mb-4">
            <span className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors cursor-pointer">In</span>
            <span className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors cursor-pointer">Tw</span>
            <span className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors cursor-pointer">Yt</span>
          </div>
          <div className="font-body text-on-surface-variant text-sm">Sign up for updates and exclusive access.</div>
          <div className="flex mt-2">
            <input type="email" placeholder="Email Address" className="bg-surface-container-high border-none px-4 py-2 font-body text-white w-full rounded-l outline-none focus:ring-1 focus:ring-primary-container" />
            <button className="bg-primary-container text-black px-4 py-2 font-label font-bold uppercase tracking-widest text-xs rounded-r">→</button>
          </div>
        </div>
      </div>
      
      <div className="footer-brand mt-32 pt-12 border-t border-outline-variant/10 flex justify-between items-center text-on-surface-variant text-sm font-body">
        <div className="text-[12rem] font-black italic tracking-tighter text-white/5 font-headline leading-none select-none">OAKLEY</div>
        <div>© 2026 Oakley, Inc. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
