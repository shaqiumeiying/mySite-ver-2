# Diana's Portfolio

A modern, minimal personal portfolio—vibe-coded and rebuilt from the ground up. Migrated from [MySite](https://github.com/shaqiumeiying/MySite).

Unity & VR developer focused on interactive experiences at the intersection of technical systems, spatial design, and human emotion.

---

## The Site

- **Hero** — Headline, bio, social links (GitHub, LinkedIn, Email), and an animated photo loop
- **3D Model Showcase** — Interactive OC model (desktop) or lightweight heartnstars model (tablets/phones), with lazy loading and viewport-aware rendering
- **Featured Projects** — Bento-style grid with full-cover images, hover effects, and internal/external links
- **Project Archive** — Minimal list of games, jams, and prototypes

All wrapped in a dark theme with cyan/pink accents, animated particle starfield, and smooth Framer Motion transitions.

---

## Built With

| Category | Tech |
|----------|------|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Styling** | Tailwind CSS v4 |
| **3D** | React Three Fiber, Three.js, @react-three/drei, @react-three/postprocessing |
| **Motion** | Framer Motion |
| **Icons** | lucide-react |
| **Font** | Sora (variable) |

---

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Performance

- **Responsive 3D models** — Desktop loads OC.glb; tablets/phones load a lighter heartnstars.glb
- **Lazy loading** — Canvas and WebGL scenes only mount when near the viewport
- **Frameloop control** — 3D rendering pauses when out of view to save GPU
- **Optimized geometry** — Reduced mesh segments and simpler shadows where possible

---

## Project Structure

```
app/
  page.tsx              # Home page assembly
  layout.tsx
  projects/[id]/        # Dynamic project detail routes
components/
  HeroSection.tsx       # Photo loop, bio, social links
  ModelViewer.tsx       # 3D showcase (R3F)
  ParticleBackground.tsx
  TechInterlude.tsx     # Skill web (optional)
  ProjectsBento.tsx
  ProjectArchive.tsx
  Navbar.tsx
data/
  projects.json
  archive.json
public/
  models/               # OC.glb, heartnstars.glb
  images/
  icons/
```

---

## License

Copyright © 2024–2026 Xinyi Dou. All rights reserved.
