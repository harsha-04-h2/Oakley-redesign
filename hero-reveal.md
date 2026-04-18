# Hero Section: Mouse Trail Reveal + Noise Texture Transition

## Overview
Build a full-screen hero section for an Oakley website where:
- The **male model** (image 1: orange-tinted Prizm glasses) is the BASE visible layer
- The **female model** (image 2: teal/white glasses) is HIDDEN underneath
- When the user moves their cursor over the male model, a **circular noise-distortion reveal** exposes the female model underneath — like scratching away a surface
- The reveal uses a **canvas-based mouse trail** with Perlin noise / grain texture fill

## Tech Stack
- React + TypeScript
- Framer Motion (motion/react)
- HTML5 Canvas for the noise trail effect
- Tailwind CSS
- GSAP for any timeline sequencing

## File Structure
Create these files:
- `components/HeroSection.tsx` — main hero wrapper
- `components/NoiseRevealCanvas.tsx` — the canvas layer handling mouse trail + noise
- `hooks/useMouseTrail.ts` — tracks cursor position + velocity
- `utils/noise.ts` — Simplex/Perlin noise implementation

## Behavior Spec

### Default State
- Male model fills full viewport (100vw × 100vh), object-fit: cover
- Female model is positioned absolutely behind male model, same dimensions
- A canvas overlay sits on top of BOTH images (z-index: 10), fully transparent initially

### On Mouse Move
1. Track cursor x, y position over the hero section
2. At each frame, draw a circle on the canvas at cursor position
3. Circle radius = 80–120px (grows slightly with cursor velocity)
4. Fill the circle with **animated Perlin noise texture** — grainy, organic, not smooth
5. Use `globalCompositeOperation = 'destination-out'` on a MASK canvas to "erase" the male model layer — revealing the female model beneath
6. The trail should persist for ~1.2 seconds then FADE OUT with a dissolve effect (use requestAnimationFrame decay: multiply alpha by 0.96 each frame)
7. The noise fill inside each circle should animate/shift over time (offset the noise seed by time)

### Noise Fill Details
- Use Simplex noise: `noise(x * 0.015 + time, y * 0.015 + time)`
- Map noise value (−1 to 1) → opacity (0 to 1) for a grain/static TV effect
- Pixels with noise > 0.1 are transparent (reveal female), pixels < 0.1 are opaque (keep male)
- This creates a scratchy, film-grain texture at the reveal boundary

### Canvas Architecture
Use two canvases:
- `maskCanvas`: composites the noise reveal mask (updates every frame)
- `trailCanvas`: renders the fading trail dots with noise fill

### Animation on Page Load
- Male model: fade in from black, `opacity 0 → 1`, duration 1.4s, ease expo.out
- Female model: already present but fully hidden behind male
- Headline text: clipPath reveal word-by-word, delay 0.6s after image loads
- Subtext: fade up, delay 1.1s

## Canvas Code Pattern
```typescript
// In useMouseTrail.ts
const points = useRef<Array<{x: number, y: number, age: number, vx: number, vy: number}>>([])

useEffect(() => {
  const onMove = (e: MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const vx = e.clientX - lastPos.current.x
    const vy = e.clientY - lastPos.current.y
    const speed = Math.sqrt(vx*vx + vy*vy)
    points.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      age: 0,
      vx, vy,
      radius: 80 + Math.min(speed * 0.8, 60)
    })
    lastPos.current = { x: e.clientX, y: e.clientY }
  }
  // ...RAF loop
}, [])
```

```typescript
// In NoiseRevealCanvas.tsx — draw loop
const draw = (time: number) => {
  ctx.clearRect(0, 0, w, h)
  
  for (const pt of points.current) {
    pt.age++
    const alpha = Math.max(0, 1 - pt.age / 72) // 72 frames ≈ 1.2s at 60fps
    
    // Draw noise-filled circle
    const imageData = ctx.createImageData(pt.radius * 2, pt.radius * 2)
    for (let px = 0; px < pt.radius * 2; px++) {
      for (let py = 0; py < pt.radius * 2; py++) {
        const dx = px - pt.radius
        const dy = py - pt.radius
        if (dx*dx + dy*dy > pt.radius * pt.radius) continue
        
        const n = simplex.noise3D(
          (pt.x + dx) * 0.018,
          (pt.y + dy) * 0.018,
          time * 0.0008
        )
        const inCircle = 1 - Math.sqrt(dx*dx + dy*dy) / pt.radius // vignette
        const a = n > 0.05 ? Math.floor(255 * alpha * inCircle) : 0
        
        const i = (py * pt.radius * 2 + px) * 4
        imageData.data[i] = 255
        imageData.data[i+1] = 255
        imageData.data[i+2] = 255
        imageData.data[i+3] = a
      }
    }
    ctx.putImageData(imageData, pt.x - pt.radius, pt.y - pt.radius)
  }
  
  // Remove old points
  points.current = points.current.filter(p => p.age < 72)
  requestAnimationFrame(draw)
}
```

## Hero Content Layout
────────────────────────────────────────────┐
│  OAKLEY logo (top left, white)              │
│                                             │
│  [Full bleed model image — male default]    │
│  [Female revealed on cursor trail]          │
│                                             │
│  ENGINEERED          ← massive headline     │
│  FOR THE EDGE        ← neon green accent    │
│                                             │
│  [SHOP PERFORMANCE] [EXPLORE TECHNOLOGY]   │
│                                             │
│  ↓ scroll indicator (animated chevron)     │
└─────────────────────────────────────────────┘

## Typography
- Headline: `Bebas Neue` or `Anton`, clamp(4rem, 8vw, 9rem)
- "FOR THE EDGE" in Oakley neon: `#C8FF00`
- Subtext: `DM Sans`, 16px, white 70% opacity
- CTA buttons: uppercase, letter-spacing 0.12em, pill shape

## Colors
```css
--bg: #0A0A0A
--accent: #C8FF00  /* Oakley neon */
--text: #F0F0F0
--overlay: rgba(0,0,0,0.3)
```

## Performance Notes
- Use `offscreenCanvas` if available for noise calculation
- Cap points array to 40 items max
- Use `will-change: transform` on image layers
- Wrap all GSAP in `gsap.context()` for cleanup
- Honor `prefers-reduced-motion`: disable canvas effect, show static female model instead