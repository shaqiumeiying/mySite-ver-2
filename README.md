<h1 align="center">✨ Welcome to My Portfolio</h1>

<p align="center">
  <em>A modern, minimal personal portfolio — vibe-coded and rebuilt from the ground up.</em>
</p>

<p align="center">
  Unity &amp; VR developer focused on interactive experiences at the intersection of<br>
  <strong>technical systems</strong>, <strong>spatial design</strong>, and <strong>human emotion</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-38BDF8?logo=tailwindcss&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Three.js-R3F-black?logo=threedotjs&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/Framer%20Motion-EF008F?logo=framer&logoColor=white" alt="Framer Motion">
</p>

<p align="center">
  <a href="https://xinyidou.fyi"><strong>🌐 Live Site</strong></a> ·
  <a href="#-the-site">The Site</a> ·
  <a href="#%EF%B8%8F-built-with">Built With</a> ·
  <a href="#-local-setup">Setup</a>
</p>

<p align="center">
  <sub>Migrated from <a href="https://github.com/shaqiumeiying/MySite">MySite</a>.</sub>
</p>

---

## 🎨 The Site

- **Hero** — Headline, bio, social links (GitHub, LinkedIn, Email), and an animated photo loop
- **3D Model Showcase** — Interactive OC model (desktop) or lightweight heartnstars model (tablets/phones), with lazy loading and viewport-aware rendering
- **Featured Projects** — Bento-style grid with full-cover images, hover effects, and internal/external links
- **Project Archive** — Minimal list of games, jams, and prototypes

All wrapped in a **dark theme** with cyan/pink accents, an animated particle starfield, and smooth Framer Motion transitions.

---

## 🛠️ Built With

| Category | Tech |
|----------|------|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Styling** | Tailwind CSS v4 |
| **3D** | React Three Fiber, Three.js, @react-three/drei, @react-three/postprocessing |
| **Motion** | Framer Motion |
| **Icons** | lucide-react |
| **Font** | Sora (variable) |

---

## 🚀 Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## ⚡ Performance

- **Responsive 3D models** — Desktop loads `OC.glb`; tablets/phones load a lighter `heartnstars.glb`
- **Lazy loading** — Canvas and WebGL scenes only mount when near the viewport
- **Frameloop control** — 3D rendering pauses when out of view to save GPU
- **Optimized geometry** — Reduced mesh segments and simpler shadows where possible

---

## 📁 Project Structure

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

## 📄 License

Copyright © 2024–2026 **Xinyi Dou**. All rights reserved.
