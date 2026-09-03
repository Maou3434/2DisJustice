---
name: 3d-web-experience
description: "Expert guidelines for building high-performance 3D web experiences using Three.js, React Three Fiber, WebGL shaders, Canvas, and CSS 3D. Covers camera choreography, model pipelines, lighting, and mobile fallbacks."
---

# 3D Web Experience Architecture

## Philosophy
3D in web experiences must serve narrative and spatial depth, not novelty. Avoid random floating geometry or resource-heavy spinning meshes that hurt battery life, performance, and accessibility.

---

## 3D Tech Selection & Rules

| Need | Preferred Tool | Key Considerations |
|---|---|---|
| Deep scene control, custom shaders, lean bundle | **Three.js (vanilla)** or **WebGL Canvas** | Zero framework overhead, granular render loop control |
| React-based UI integration, declarative scenes | **React Three Fiber (@react-three/fiber, @react-three/drei)** | Clean component composition, useFrame hooks, Suspense |
| Low-power / 2.5D layered perspective | **CSS 3D / Perspective transforms / Canvas 2D** | Blazing fast, zero WebGL context overhead, excellent mobile support |

---

## Technical & Performance Rules

### 1. Scene Optimization & Geometry
- **Budget**: Keep total scene polycount under 100k polygons for desktop; under 30k for mobile.
- **Draw Calls**: Batch meshes with `InstancedMesh` or merge static geometries. Target < 50 draw calls per frame.
- **Textures**: Use WebP or KTX2 compressed textures. Max texture size 2048x2048 for hero assets; 1024x1024 for secondary.
- **Lighting**: Favor baked ambient occlusion / environment maps (`PMREMGenerator`) over multiple dynamic shadow-casting lights. Limit shadow maps to one directional light with tight frustum.

### 2. Scroll Choreography & Camera Movement
- Link camera coordinates $(x, y, z)$ and lookAt vectors smoothly to scroll progress (using GSAP `ScrollTrigger` or R3F `useScroll`).
- Use smooth damping / lerp formulas ($v_{current} += (v_{target} - v_{current}) \times 0.05$) to prevent jerky camera motion.
- Separate camera focal length / depth of field for dramatic cinematic shifts.

### 3. Progressive Enhancement & Fallbacks
- **`prefers-reduced-motion`**: When enabled, freeze camera flight, disable auto-rotation, and present static spatial compositions.
- **Mobile / Low-Power Detection**:
  - Test GPU capabilities (e.g. tier detection or WebGL max texture size).
  - On low-end mobile devices, reduce pixel ratio (`Math.min(window.devicePixelRatio, 1.5)`), disable post-processing passes (bloom, depth of field), or fall back to high-resolution pre-rendered 2.5D parallax layers.
- **Lazy Loading & Suspense**: Never block DOM rendering for 3D asset downloads. Render initial page content immediately with a graceful loading reveal for the WebGL canvas.

---

## Spatial Composition Checklist
- [ ] Foreground, midground, and background elements create distinct parallax layers.
- [ ] 3D lighting coordinates match the 2D UI highlights and page ambient color.
- [ ] Canvas is correctly sized with `resize` listener and handles pixel-ratio cleanly.
- [ ] Memory clean-up: Dispose geometries, materials, and textures on component unmount to prevent WebGL context leaks.
