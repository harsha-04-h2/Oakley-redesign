# Oakley Website — Section Animations (All Sections Except Hero)

## Overview
Animate every section of the Oakley desktop website with cinematic, scroll-driven
interactions. Use GSAP ScrollTrigger for all scroll-based reveals. Use Framer Motion
for component state transitions. Use CSS for micro-interactions and loops.
All animations must respect `prefers-reduced-motion`.

---

## SECTION 1 — Tech Feature Bar (Marquee Strip)

### Effect: Infinite scrolling ticker with hover-pause + glow pulse

```css
/* CSS-only marquee */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

/* Each item glows on hover */
.marquee-item:hover {
  color: #C8FF00;
  text-shadow: 0 0 12px rgba(200, 255, 0, 0.6);
  transition: color 0.3s ease, text-shadow 0.3s ease;
}
```

### On Scroll Enter
```javascript
// GSAP — entire bar slides down from -40px on page load
gsap.from(".marquee-bar", {
  y: -40,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  delay: 1.8 // after hero loads
})
```

---

## SECTION 2 — Choose Your Pursuit (Tabs + Product Grid)

### Effect: Magnetic tab pill + staggered card entrance + hover 3D tilt

#### Tab Switcher (Framer Motion)
```tsx
// Animated sliding pill indicator under active tab
<motion.div
  className="tab-pill"
  layoutId="active-tab-pill"
  transition={{ type: "spring", stiffness: 400, damping: 35 }}
/>

// Content swap with AnimatePresence
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
    animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
    exit={{    opacity: 0, y: -16, filter: "blur(4px)" }}
    transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    <ProductGrid tab={activeTab} />
  </motion.div>
</AnimatePresence>
```

#### Section Title Entrance
```javascript
gsap.from(".pursuit-title", {
  scrollTrigger: { trigger: ".pursuit-section", start: "top 82%" },
  y: 50,
  opacity: 0,
  duration: 0.9,
  ease: "expo.out"
})

gsap.from(".pursuit-tabs", {
  scrollTrigger: { trigger: ".pursuit-section", start: "top 78%" },
  y: 30,
  opacity: 0,
  duration: 0.7,
  delay: 0.2,
  ease: "power3.out"
})
```

#### Product Cards — Stagger + 3D Hover Tilt
```tsx
// Stagger entrance
gsap.from(".product-card", {
  scrollTrigger: { trigger: ".product-grid", start: "top 80%" },
  y: 60,
  opacity: 0,
  duration: 0.7,
  stagger: 0.1,
  ease: "power3.out"
})

// 3D tilt on hover (Framer Motion)
<motion.div
  className="product-card"
  whileHover={{ scale: 1.04, rotateX: 4, rotateY: -4 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  style={{ transformPerspective: 800 }}
>
  <motion.div
    className="card-shine"  // pseudo overlay that tracks cursor
    style={{ background: "radial-gradient(circle at var(--x) var(--y), rgba(200,255,0,0.08), transparent 60%)" }}
  />
</motion.div>
```

---

## SECTION 3 — Prizm Lens "See What You've Been MISSING"

### Effect: Scroll-pinned split reveal + parallax lens + staggered bullets

#### Scroll Pin Setup
```javascript
// Pin the entire section while content animates in
const prizm = gsap.timeline({
  scrollTrigger: {
    trigger: ".prizm-section",
    start: "top top",
    end: "+=600",
    pin: true,
    scrub: 1.2,
    anticipatePin: 1
  }
})

// Left text block slides in from left
prizm.from(".prizm-text-col", {
  x: -80,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
}, 0)

// Lens image parallax from right + subtle scale
prizm.from(".prizm-image-col", {
  x: 100,
  opacity: 0,
  scale: 1.08,
  duration: 1,
  ease: "power3.out"
}, 0.1)

// Badge enters first
prizm.from(".prizm-badge", {
  y: -20,
  opacity: 0,
  duration: 0.5
}, 0)
```

#### Headline — "MISSING" Word Scramble Effect
```javascript
// Word-by-word clipPath reveal for main headline
const words = gsap.utils.toArray(".prizm-headline .word")
gsap.from(words, {
  scrollTrigger: { trigger: ".prizm-section", start: "top 75%" },
  yPercent: 110,
  duration: 0.8,
  stagger: 0.1,
  ease: "expo.out",
  clipPath: "inset(0 0 100% 0)"
})

// "MISSING" — scramble text effect using SplitText + ScrambleText plugin
gsap.to(".word-missing", {
  scrollTrigger: { trigger: ".prizm-section", start: "top 70%" },
  scrambleText: {
    text: "MISSING",
    chars: "ABCXYZ!@#$%",
    revealDelay: 0.3,
    speed: 0.5
  },
  duration: 1.2,
  delay: 0.6
})
```

#### Feature Bullets — Stagger Reveal
```javascript
gsap.from(".prizm-bullet", {
  scrollTrigger: { trigger: ".prizm-bullets", start: "top 80%" },
  x: -40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.18,
  ease: "power2.out"
})

// Bullet icon pops in with spring
gsap.from(".bullet-icon", {
  scrollTrigger: { trigger: ".prizm-bullets", start: "top 80%" },
  scale: 0,
  duration: 0.4,
  stagger: 0.18,
  delay: 0.1,
  ease: "back.out(2.5)"
})
```

#### Lens Image — Color Saturation Reveal
```javascript
// Lens goes from desaturated to full vivid color on scroll
gsap.fromTo(".prizm-lens-img",
  { filter: "saturate(0) brightness(0.6)" },
  {
    filter: "saturate(1) brightness(1)",
    scrollTrigger: {
      trigger: ".prizm-section",
      start: "top 70%",
      end: "top 30%",
      scrub: 1.5
    }
  }
)
```

---

## SECTION 4 — The Icons (Holbrook + Radar EV Path)

### Effect: Curtain wipe reveal + hover lens flare + magnetic CTA

#### Curtain Wipe Entrance
```javascript
// Cards wipe in from bottom via clipPath
gsap.from(".icons-card", {
  scrollTrigger: { trigger: ".icons-section", start: "top 78%", toggleActions: "play none none reverse" },
  clipPath: "inset(0 0 100% 0)",
  y: 20,
  duration: 1.1,
  stagger: 0.2,
  ease: "expo.inOut"
})

// Section title — letter spacing expand
gsap.from(".icons-title", {
  scrollTrigger: { trigger: ".icons-section", start: "top 82%" },
  letterSpacing: "0.5em",
  opacity: 0,
  duration: 1,
  ease: "power3.out"
})
```

#### Card Hover — Lens Flare + Overlay Reveal
```tsx
// Framer Motion hover state
<motion.div
  className="icon-card"
  initial="rest"
  whileHover="hover"
  animate="rest"
>
  {/* Product image zooms */}
  <motion.img
    variants={{
      rest:  { scale: 1,    filter: "brightness(0.8)" },
      hover: { scale: 1.08, filter: "brightness(1.05)" }
    }}
    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
  />

  {/* Dark overlay fades out on hover */}
  <motion.div
    className="card-overlay"
    variants={{ rest: { opacity: 1 }, hover: { opacity: 0.3 } }}
    transition={{ duration: 0.4 }}
  />

  {/* "SHOP NOW →" CTA slides up on hover */}
  <motion.div
    className="card-cta"
    variants={{
      rest:  { y: 20, opacity: 0 },
      hover: { y: 0,  opacity: 1 }
    }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    SHOP NOW →
  </motion.div>

  {/* Lens flare dot travels across card */}
  <motion.div
    className="lens-flare"
    variants={{
      rest:  { x: "-20%", opacity: 0 },
      hover: { x: "120%", opacity: [0, 0.6, 0] }
    }}
    transition={{ duration: 0.7, ease: "easeInOut" }}
  />
</motion.div>
```

---

## SECTION 5 — Oakley META

### Effect: Scroll-pinned cinematic zoom + HUD callout scan lines + glitch badge

#### Cinematic Section Pin
```javascript
const metaTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".meta-section",
    start: "top top",
    end: "+=800",
    pin: true,
    scrub: 1.8
  }
})

// Background image zooms in slowly (Ken Burns)
metaTl.fromTo(".meta-bg",
  { scale: 1 },
  { scale: 1.18, ease: "none" }
, 0)

// Glasses float up from below + fade in
metaTl.from(".meta-glasses", {
  y: 80,
  opacity: 0,
  scale: 0.9,
  duration: 0.6,
  ease: "expo.out"
}, 0)
```

#### Badge — Glitch Effect
```css
@keyframes glitch {
  0%   { clip-path: inset(40% 0 50% 0); transform: translate(-4px, 0); }
  20%  { clip-path: inset(10% 0 80% 0); transform: translate(4px, 0); }
  40%  { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 0); }
  60%  { clip-path: inset(20% 0 60% 0); transform: translate(0, 0); }
  80%  { clip-path: inset(50% 0 20% 0); transform: translate(2px, 0); }
  100% { clip-path: inset(40% 0 50% 0); transform: translate(-4px, 0); }
}

.meta-badge::before,
.meta-badge::after {
  content: attr(data-text);
  position: absolute;
  color: #C8FF00;
}
.meta-badge::before {
  animation: glitch 2.5s infinite steps(1);
  color: #ff004f;
  left: 2px;
}
.meta-badge::after {
  animation: glitch 2.5s infinite steps(1) reverse;
  color: #00ffcc;
  left: -2px;
}
```

#### Headline — "OAKLEY META" Split Typography Reveal
```javascript
// "OAKLEY" slides in from left
gsap.from(".meta-word-oakley", {
  scrollTrigger: { trigger: ".meta-section", start: "top 75%" },
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "expo.out"
})

// "META" — outlined text, slides from right
gsap.from(".meta-word-meta", {
  scrollTrigger: { trigger: ".meta-section", start: "top 75%" },
  x: 100,
  opacity: 0,
  duration: 1,
  delay: 0.15,
  ease: "expo.out"
})
```

#### HUD Callout Chips — Scan Line Entrance
```tsx
// Left chip scans in from left with horizontal line
<motion.div
  className="hud-chip chip-left"
  initial={{ x: -80, opacity: 0, scaleX: 0 }}
  whileInView={{ x: 0, opacity: 1, scaleX: 1 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
>
  <motion.div
    className="chip-line"  // horizontal connector line
    initial={{ width: 0 }}
    whileInView={{ width: "100%" }}
    transition={{ duration: 0.5, delay: 0.6 }}
  />
  <span>Micro-OLED HUD</span>
</motion.div>

// Right chip mirrors
<motion.div
  className="hud-chip chip-right"
  initial={{ x: 80, opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  <span>Real-time AI Coaching</span>
</motion.div>
```

#### Glasses Float Animation (Idle)
```css
@keyframes float {
  0%,  100% { transform: translateY(0px) rotate(-0.5deg); }
  50%       { transform: translateY(-14px) rotate(0.5deg); }
}

.meta-glasses {
  animation: float 4s ease-in-out infinite;
}
```

---

## SECTION 6 — Worn by the Best

### Effect: Grayscale-to-color wipe + stagger curtain + center text cinematic

#### Curtain Reveal — 3 Athletes
```javascript
// Each column wipes from bottom via clipPath
gsap.from(".athlete-col", {
  scrollTrigger: {
    trigger: ".athletes-section",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  clipPath: "inset(100% 0 0 0)",
  duration: 1.2,
  stagger: 0.18,
  ease: "expo.inOut"
})
```

#### Grayscale → Color on Scroll
```javascript
gsap.fromTo(".athlete-img",
  { filter: "grayscale(100%) brightness(0.7)" },
  {
    filter: "grayscale(0%) brightness(1)",
    scrollTrigger: {
      trigger: ".athletes-section",
      start: "top 60%",
      end: "top 20%",
      scrub: 1
    },
    stagger: 0.15
  }
)
```

#### Center Headline — "WORN BY THE BEST"
```javascript
// Massive text slams in with impact
const worn = gsap.timeline({
  scrollTrigger: { trigger: ".athletes-section", start: "top 65%" }
})

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
  }, "-=0.5")
```

#### Hover — Vignette Zoom
```tsx
<motion.div
  className="athlete-col"
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  <motion.div
    className="athlete-vignette"
    whileHover={{ opacity: 0.4 }}
    transition={{ duration: 0.4 }}
  />
</motion.div>
```

---

## SECTION 7 — Built for You. Only.

### Effect: Split entrance + glasses idle float + CTA magnetic button

#### Split Entrance
```javascript
// Text column slides from left
gsap.from(".built-text-col", {
  scrollTrigger: { trigger: ".built-section", start: "top 78%" },
  x: -70,
  opacity: 0,
  duration: 1,
  ease: "expo.out"
})

// Glasses image floats in from right
gsap.from(".built-glasses-col", {
  scrollTrigger: { trigger: ".built-section", start: "top 78%" },
  x: 70,
  opacity: 0,
  duration: 1,
  delay: 0.15,
  ease: "expo.out"
})
```

#### Headline — Word by Word
```javascript
gsap.from(".built-word", {
  scrollTrigger: { trigger: ".built-section", start: "top 75%" },
  y: "110%",
  duration: 0.75,
  stagger: 0.08,
  ease: "expo.out",
  clipPath: "inset(0 0 100% 0)"
})
```

#### Glasses — Idle Float
```css
@keyframes gentleFloat {
  0%, 100% { transform: translateY(0px) rotate(1deg); }
  50%       { transform: translateY(-12px) rotate(-1deg); }
}

.built-glasses {
  animation: gentleFloat 5s ease-in-out infinite;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
}
```

#### CTA Button — Magnetic + Neon Pulse
```tsx
// Magnetic button that follows cursor slightly
const handleMouse = (e: MouseEvent) => {
  const rect = btnRef.current!.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  gsap.to(btnRef.current, {
    x: x * 0.35,
    y: y * 0.35,
    duration: 0.4,
    ease: "power2.out"
  })
}

const handleLeave = () => {
  gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" })
}
```

```css
/* Neon border pulse */
@keyframes neonPulse {
  0%, 100% { box-shadow: 0 0 8px rgba(200,255,0,0.4), inset 0 0 8px rgba(200,255,0,0.1); }
  50%       { box-shadow: 0 0 20px rgba(200,255,0,0.8), inset 0 0 12px rgba(200,255,0,0.2); }
}

.built-cta {
  border: 1px solid #C8FF00;
  animation: neonPulse 2.5s ease-in-out infinite;
}
```

---

## SECTION 8 — Footer

### Effect: Stagger column reveal + link hover underline draw + social icon bounce

#### Column Stagger
```javascript
gsap.from(".footer-col", {
  scrollTrigger: { trigger: "footer", start: "top 90%" },
  y: 40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.12,
  ease: "power3.out"
})

// Top divider line draws from left
gsap.from(".footer-divider", {
  scrollTrigger: { trigger: "footer", start: "top 92%" },
  scaleX: 0,
  transformOrigin: "left center",
  duration: 1,
  ease: "expo.out"
})
```

#### Link Hover — Underline Draw
```css
.footer-link {
  position: relative;
  display: inline-block;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1px;
  background: #C8FF00;
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.footer-link:hover::after {
  width: 100%;
}
```

#### Social Icons — Bounce In
```javascript
gsap.from(".social-icon", {
  scrollTrigger: { trigger: ".footer-socials", start: "top 95%" },
  scale: 0,
  opacity: 0,
  duration: 0.5,
  stagger: 0.08,
  ease: "back.out(2)"
})
```

---

## SECTION 9 — Sticky Promo Bar (Top)

### Effect: Slide down on load + text shimmer loop

#### Load Entrance
```javascript
gsap.from(".promo-bar", {
  y: -48,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out",
  delay: 0.3
})
```

#### Text Shimmer
```css
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.promo-text {
  background: linear-gradient(
    90deg,
    #888 0%, #888 40%,
    #ffffff 50%,
    #888 60%, #888 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 4s linear infinite;
}
```

---

## NAVBAR — Scroll State Transition

```javascript
// Transparent → frosted glass on scroll
ScrollTrigger.create({
  start: "top -80",
  onEnter: () => gsap.to(".navbar", {
    backgroundColor: "rgba(10,10,10,0.85)",
    backdropFilter: "blur(20px)",
    borderBottomColor: "rgba(255,255,255,0.08)",
    duration: 0.4,
    ease: "power2.out"
  }),
  onLeaveBack: () => gsap.to(".navbar", {
    backgroundColor: "transparent",
    backdropFilter: "blur(0px)",
    borderBottomColor: "transparent",
    duration: 0.4
  })
})
```

#### Nav Links — Hover underline + neon dot
```css
.nav-link {
  position: relative;
  padding-bottom: 4px;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 4px; height: 4px;
  border-radius: 50%;
  background: #C8FF00;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.nav-link:hover::before {
  opacity: 1;
  transform: translateX(-50%) scale(1.5);
}
```

---

## Global Animation Config

```javascript
// Register all GSAP plugins once at app entry
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin)

// Smooth scroll
import Lenis from "@studio-freight/lenis"
const lenis = new Lenis({ lerp: 0.08, smooth: true })
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))

// Reduced motion — kill all animations
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.timeScale(0)
  ScrollTrigger.getAll().forEach(st => st.kill())
}
```

---

## Timing Reference

| Section              | Trigger Point | Duration | Ease           |
|---------------------|---------------|----------|----------------|
| Promo bar           | page load     | 0.6s     | power3.out     |
| Marquee bar         | page load     | 0.6s     | power2.out     |
| Pursuit title       | top 82%       | 0.9s     | expo.out       |
| Product cards       | top 80%       | 0.7s     | power3.out     |
| Prizm section pin   | top top       | scrub    | none / 1.2     |
| Icons curtain       | top 78%       | 1.1s     | expo.inOut     |
| META pin            | top top       | scrub    | none / 1.8     |
| META chips          | top 75%       | 0.7s     | [0.16,1,0.3,1] |
| Athletes curtain    | top 75%       | 1.2s     | expo.inOut     |
| Athlete color       | top 60%       | scrub    | none / 1       |
| Built split         | top 78%       | 1.0s     | expo.out       |
| Footer columns      | top 90%       | 0.7s     | power3.out     |