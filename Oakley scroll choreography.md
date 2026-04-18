# Oakley — Scroll Choreography & Micro-Interaction Details

## Purpose
This file defines the exact scroll choreography, easing curves, and micro-interaction
details for every non-hero section. Feed this to Antigravity alongside
`oakley-sections-animation.md` for complete implementation context.

---

## Scroll Choreography Map

```
Page scroll position → Animation trigger map:

0px       → Hero (separate file, skip)
100vh     → Promo bar already visible, marquee running
120vh     → "Choose Your Pursuit" title clips in (top 82%)
130vh     → Tab pills render, grid cards stagger in (top 80%)
180vh     → Prizm section PINS — stays pinned for 600px scroll
780vh     → Prizm unpins → "The Icons" enters viewport
840vh     → Icons: section title letter-spacing expands
860vh     → Icons: cards curtain-wipe in (stagger 0.2s)
920vh     → META section PINS — stays pinned for 800px scroll
1720vh    → META unpins → Athletes section enters
1780vh    → Athletes curtain wipe (stagger 0.18s) + grayscale starts
1820vh    → "WORN BY THE BEST" text slams in
1900vh    → Built For You split entrance
1960vh    → Footer columns stagger, divider draws
```

---

## Custom Easing Curves

```javascript
// Define custom eases at app boot
gsap.registerEase("oakleyOut",   CustomEase.create("oakleyOut",   "M0,0 C0.16,1 0.3,1 1,1"))
gsap.registerEase("oakleySnap",  CustomEase.create("oakleySnap",  "M0,0 C0.87,0 0.13,1 1,1"))
gsap.registerEase("oakleySlam",  CustomEase.create("oakleySlam",  "M0,0 C0.5,-0.5 0.5,1.5 1,1"))

// Usage
gsap.from(".element", { ease: "oakleyOut", duration: 0.9 })
```

---

## Micro-Interaction Details

### Product Card — Cursor-tracking Shine
```javascript
// On mousemove inside each card, update CSS vars for radial gradient shine
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%'
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%'
    card.style.setProperty('--x', x)
    card.style.setProperty('--y', y)
  })
})
```

```css
.product-card::after {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(
    circle 120px at var(--x, 50%) var(--y, 50%),
    rgba(200, 255, 0, 0.07),
    transparent 70%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
.product-card:hover::after { opacity: 1; }
```

---

### Prizm Section — Lens Reveal Mask
```javascript
// On scroll scrub: reveal lens image from center outward using clipPath
gsap.fromTo(".prizm-lens-img",
  { clipPath: "circle(0% at 50% 50%)" },
  {
    clipPath: "circle(100% at 50% 50%)",
    scrollTrigger: {
      trigger: ".prizm-section",
      start: "top 60%",
      end: "top 20%",
      scrub: 2
    }
  }
)
```

---

### META Section — HUD Scan Line
```css
/* Animated scan line sweeps across META glasses */
@keyframes scanLine {
  0%   { top: 0%;   opacity: 0.6; }
  50%  { top: 100%; opacity: 0.3; }
  100% { top: 0%;   opacity: 0; }
}

.meta-scan-line {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #C8FF00, transparent);
  animation: scanLine 3s linear infinite;
  pointer-events: none;
}
```

---

### Athletes — Parallax Depth Layers
```javascript
// Each athlete column scrolls at slightly different rate = depth
const depths = [0.85, 1.0, 0.9]  // scrub multipliers

document.querySelectorAll('.athlete-col').forEach((col, i) => {
  gsap.to(col, {
    yPercent: -10 * depths[i],
    ease: "none",
    scrollTrigger: {
      trigger: ".athletes-section",
      start: "top bottom",
      end: "bottom top",
      scrub: depths[i]
    }
  })
})
```

---

### Built Section — Counter Stat (optional)
```javascript
// Animated counter for "Millions of combinations"
gsap.to(".combo-count", {
  innerText: 1000000,
  duration: 2,
  snap: { innerText: 50000 },
  ease: "power2.out",
  scrollTrigger: { trigger: ".built-section", start: "top 75%" },
  onUpdate: function() {
    this.targets()[0].innerText =
      new Intl.NumberFormat().format(Math.round(this.targets()[0].innerText.replace(/,/g,'')))
  }
})
```

---

## ScrollTrigger Batch (Performance Optimisation)

```javascript
// Use ScrollTrigger.batch for repeated elements (cards, bullets, links)
// Instead of creating individual triggers per element

ScrollTrigger.batch(".product-card", {
  onEnter: els => gsap.from(els, {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power3.out",
    overwrite: true
  }),
  onLeave: els => gsap.to(els, { opacity: 0.3, overwrite: true }),
  onEnterBack: els => gsap.to(els, { opacity: 1, overwrite: true }),
  start: "top 85%",
  batchMax: 4
})

ScrollTrigger.batch(".footer-link", {
  onEnter: els => gsap.from(els, {
    y: 20,
    opacity: 0,
    stagger: 0.06,
    duration: 0.5,
    ease: "power2.out"
  }),
  start: "top 95%"
})
```

---

## Lenis Smooth Scroll Config

```javascript
import Lenis from "@studio-freight/lenis"

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  smoothTouch: false,  // disable on touch — feels unnatural
  touchMultiplier: 2,
  infinite: false
})

// Sync with GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
lenis.on("scroll", ScrollTrigger.update)
```

---

## CSS Custom Properties — Animation Tokens

```css
:root {
  /* Durations */
  --dur-fast:   0.3s;
  --dur-normal: 0.6s;
  --dur-slow:   1.0s;
  --dur-crawl:  1.4s;

  /* Eases (for CSS transitions) */
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out:     cubic-bezier(0.87, 0, 0.13, 1);
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Stagger base */
  --stagger: 0.1s;
}

/* Apply to all transition elements */
.card, .btn, .nav-link, .footer-link {
  transition-timing-function: var(--ease-out-expo);
}
```

---

## Antigravity Implementation Notes

1. **Install packages first:**
```bash
npm install gsap @gsap/react framer-motion @studio-freight/lenis
```

2. **GSAP Club plugins** (SplitText, ScrambleText) require GSAP membership.
   Fallback: use `gsap.utils.toArray` + manual char splitting for scramble effect.

3. **File structure:**
```
src/
├── lib/
│   ├── gsap.ts          ← register plugins, init Lenis
│   └── animations.ts    ← reusable animation functions
├── hooks/
│   └── useScrollAnim.ts ← custom hook wrapping gsap.context
├── components/
│   ├── MarqueeBar.tsx
│   ├── PursuitSection.tsx
│   ├── PrizmSection.tsx
│   ├── IconsSection.tsx
│   ├── MetaSection.tsx
│   ├── AthletesSection.tsx
│   ├── BuiltSection.tsx
│   └── Footer.tsx
```

4. **Always wrap GSAP in context for cleanup:**
```javascript
useGSAP(() => {
  // all gsap.from, ScrollTrigger.create calls here
  return () => ctx.revert() // cleanup on unmount
}, { scope: sectionRef })
```

5. **Test scroll positions in Chrome DevTools:**
   Add `markers: true` to ScrollTrigger during development, remove before ship.