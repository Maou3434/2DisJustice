# Technical Architecture & System Design

## 1. Architectural Philosophy
The portfolio website is designed as a high-performance, single-page progressive web application built with **React, Vite, Three.js, and Vanilla CSS**. It implements a dual visual paradigm system that allows complete thematic divergence between **Variation A (Architectural Editorial)** and **Variation B (Ghost of Tsushima Cinematic)** while sharing a single unified data and state foundation.

---

## 2. Directory Structure

```text
Attepm#67/
├── .agents/                    # Workspace custom agent skills and rules
│   ├── rules/portfolio-rules.md
│   └── skills/
├── data/                       # Ground-truth verified project & resume data
│   └── resume_data.json
├── public/                     # Static assets, fonts, icons, audio cues
├── src/
│   ├── components/
│   │   ├── 3d/                 # Three.js canvas & WebGL procedural shaders
│   │   │   ├── SpatialCanvas.jsx
│   │   │   ├── TsushimaScene.jsx   # Wind, mist particles, 3D Talisman
│   │   │   └── ArchitecturalScene.jsx # Topological PINN loss manifold
│   │   ├── navigation/
│   │   │   ├── Header.jsx
│   │   │   └── VariationSwitcher.jsx
│   │   ├── hero/
│   │   │   └── HeroSection.jsx
│   │   ├── experience/
│   │   │   └── ExperienceTimeline.jsx
│   │   ├── projects/
│   │   │   ├── ProjectGallery.jsx
│   │   │   ├── ProjectModal.jsx
│   │   │   └── ArchitectureDiagram.jsx
│   │   ├── patents/
│   │   │   └── PatentExhibition.jsx
│   │   ├── skills/
│   │   │   └── TechnicalMatrix.jsx
│   │   ├── credentials/
│   │   │   └── HonorsSection.jsx
│   │   └── common/
│   │       ├── AudioController.jsx
│   │       ├── CustomCursor.jsx
│   │       └── Footer.jsx
│   ├── context/
│   │   └── ThemeContext.jsx    # Dual variation state (architectural vs tsushima)
│   ├── hooks/
│   │   ├── useScrollProgress.js
│   │   └── useMediaQuery.js
│   ├── styles/
│   │   ├── tokens.css          # Shared variables, layout grids, typography scales
│   │   ├── theme-architectural.css # Variation A tokens
│   │   ├── theme-tsushima.css  # Variation B tokens
│   │   └── index.css           # Global resets, utility classes, typography
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── index.html
```

---

## 3. Dual Variation State & Styling Architecture

The application toggles themes at the root DOM level:
```html
<html data-theme="tsushima" class="theme-transition">
<!-- or data-theme="architectural" -->
```

### Dynamic Token System
CSS custom properties mutate dynamically based on `data-theme`:
- `--bg-primary`, `--bg-surface`, `--text-primary`, `--text-muted`, `--accent-primary`, `--accent-glow`.
- `--font-display`, `--font-body`, `--font-mono`.
- `--border-style`, `--border-radius`, `--shadow-elevation`.

Components reference semantic CSS variables only (`var(--bg-surface)`), ensuring zero code duplication for UI layouts while transforming visual tone, typography, and materiality instantaneously.

---

## 4. 3D & WebGL Pipeline Architecture

### Unified Spatial Viewport (`SpatialCanvas.jsx`)
- Fixed full-screen `<canvas>` with `pointer-events: none` positioned behind the interactive content layer.
- Single unified `requestAnimationFrame` render loop with frame-rate governor (caps at 60 FPS, reduces to 30 FPS on low-power mode).
- Dynamically swaps scenes based on active theme:
  1. **Tsushima Scene**:
     - Particle field: 800 instanced wind points drifting across a Perlin noise vector field.
     - 3D Procedural Talisman / Katana Tsuba mesh rendered with metallic PBR material, responsive to mouse azimuth and elevation angles.
  2. **Architectural Scene**:
     - Interactive 3D wireframe terrain representing the Physics-Informed Neural Network (PINN) loss function / battery thermal manifold.
     - Orthographic camera with isometric projection and subtle rotational drift.

### Memory & Resource Management
- WebGL context loss listeners (`webglcontextlost`, `webglcontextrestored`).
- Complete disposal of BufferGeometry, Materials, and Textures during scene teardown or component unmount.
- Automatic reduced-motion check (`window.matchMedia('(prefers-reduced-motion: reduce)')`) that halts camera animation.

---

## 5. Performance & Build Strategy
1. **Zero External Heavy Dependencies**:
   - Avoid massive UI libraries or bulky animation bundles. Use lightweight Three.js + vanilla CSS transitions.
2. **Code Splitting**:
   - Lazy load the 3D canvas so critical DOM and text content render immediately with first-contentful-paint (FCP) < 0.6s.
3. **Asset Optimization**:
   - SVGs inline or optimized. Zero large uncompressed images.
