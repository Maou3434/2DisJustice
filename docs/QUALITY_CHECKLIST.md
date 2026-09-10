# Quality Benchmarks & Definition of Done

This document defines the strict gate-check criteria for each implementation milestone. A stage is marked complete only when all checklist items are verified.

---

## Stage 1 — Foundation & Tokens
- [ ] Vite + React project initialized cleanly with minimal footprint.
- [ ] Typography fonts (Cinzel, Syne, Newsreader, JetBrains Mono) linked and rendering without layout shift (FOUT/FOIT minimized).
- [ ] Dynamic token architecture (`tokens.css`, `theme-tsushima.css`, `theme-architectural.css`) working with hot theme toggle.
- [ ] Global resets and responsive container systems verified across 375px, 768px, 1280px, and 1920px.
- [ ] Keyboard focus states clearly visible and accessible.

---

## Stage 2 — Narrative & Information Architecture
- [ ] 100% truthful data representation matching `data/resume_data.json`:
  - [ ] Abimanyu Jayaganesh's headline, education (VIT Vellore), and competencies.
  - [ ] Experience entries (Automotive Research Centre PINN EV battery, VVDN Technologies, IMIK Technologies).
  - [ ] 4 Major Projects (RetailSink, OpenDesign, Frame Order Restoration, Emotional Dependency).
  - [ ] 2 Published Patents (Garment Colour Matching 202641027735, Physiological Monitoring 202641068237).
  - [ ] Honors (IEEE IAS CodeDoc 2nd Place, NCC Silver Medals, Model UN).
- [ ] Zero generic AI copywriting tropes ("passionate", "seamless", "unlock", "supercharge").
- [ ] Asymmetric layout rhythm: clear visual hierarchy without monotonous 3-column card repetitions.

---

## Stage 3 — 3D & Spatial Dimension
- [ ] Full-screen WebGL Canvas (`SpatialCanvas.jsx`) mounted behind interactive DOM layers.
- [ ] **Tsushima Scene**:
  - [ ] Procedural wind vector field with drifting particles.
  - [ ] Interactive 3D talisman / katana tsuba mesh rotating gently with mouse azimuth.
- [ ] **Architectural Scene**:
  - [ ] 3D topological wireframe representing the PINN loss surface / battery thermal state estimation.
  - [ ] Isometric orthographic projection with subtle elevation response.
- [ ] Performance audit:
  - [ ] Stable 60 FPS on desktop.
  - [ ] Polycount < 15,000 vertices.
  - [ ] Zero memory leaks on theme swap (geometries and materials disposed).
  - [ ] Respects `prefers-reduced-motion` by freezing camera and particle animation.

---

## Stage 4 — Interactive Storytelling & Polish
- [ ] Interactive Project Deep-Dive drawer/modal displaying system architecture, technical challenge, and real results.
- [ ] Patent Exhibition modal/viewer displaying official IP India publication numbers and diagrams.
- [ ] Tactile audio feedback toggle (muted by default) with organic sound synthesis (Web Audio API or lightweight assets).
- [ ] One-click copy interaction for email and phone with visible confirmation state.

---

## Stage 5 — StyleMole Anti-Vibe-Coded Audit & Hardening
- [ ] **No Nested Cards**: Verified that no section wraps cards inside cards inside badges.
- [ ] **No AI Gradients**: Verified absence of purple/indigo glowing blobs.
- [ ] **No Pill Spam**: Verified that badges only display factual classifications or status.
- [ ] **No Fabricated Proof**: Verified that all numbers, patents, and awards are genuine.
- [ ] **Lighthouse Performance Score**: Target ≥ 90 on Desktop and Mobile.
- [ ] **Zero Console Errors**: Verified clean browser console during all interactions and theme toggles.
