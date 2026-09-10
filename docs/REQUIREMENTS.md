# Project Requirements Specification

## 1. Project Overview
Build a distinctive, deeply designed personal portfolio website for **Abimanyu Jayaganesh**, Computer Science Engineer & Creative Technologist specializing in Physics-Informed ML, Data Systems, and GPU-Accelerated Pipelines.

---

## 2. Functional Requirements
1. **Dual Variation Architecture**:
   - Seamless switcher allowing the user to experience **Variation A (Architectural Editorial)** and **Variation B (Ghost of Tsushima Cinematic)** with instant aesthetic transformation.
   - Preserves state across navigation and respects local preference.
2. **Interactive 3D / Spatial Experience**:
   - Integrated WebGL viewport that adapts dynamically to the selected variation:
     - *Variation B*: Atmospheric wind particles, interactive 3D talisman/tsuba with mouse-driven PBR reflections.
     - *Variation A*: 3D topological manifold representing PINN loss surface / battery thermal state estimation.
   - Interactive camera choreography linked to viewport scroll and mouse cursor movements.
3. **Deep Project Storytelling & Proof of Capability**:
   - Detailed interactive case studies for Abimanyu's 4 major projects:
     - **PINN EV Battery Digital Twin** (Automotive Research Centre, VIT)
     - **RetailSink Lakehouse** (DuckDB, Delta Lake, Medallion Architecture, SCD Type 2)
     - **Frame Order Restoration System** (TSP 2-Opt heuristic, DirectML GPU acceleration)
     - **Emotional Dependency Detection** (Sentence Transformers, XGBoost NLP)
   - Interactive architectural diagrams, telemetry simulation, and algorithmic explanations.
4. **Intellectual Property & Patents Exhibition**:
   - Dedicated showcase for Published Patents:
     - Garment Colour Matching System (IP India 202641027735)
     - Closed-Loop Physiological Monitoring System (IP India 202641068237)
5. **Verifiable Honors & Credentials**:
   - IEEE IAS CodeDoc Hackathon 2nd Place, NCC Silver Medals in Aeromodelling & Shooting, Oracle GenAI Professional, NVIDIA Accelerated Computing CUDA C/C++.
6. **Tactile Interactive Audio (Optional)**:
   - Discreet ambient/interaction sound toggle (muted by default) with subtle organic audio cues (wind chime, blade slide, or tactile mechanical click).
7. **Contact & Direct Outreach**:
   - Direct mailto link, phone quick-copy, LinkedIn, and GitHub links with clean feedback states.

---

## 3. UX & Interaction Requirements
- **Spatial Depth**: Strong z-index stratification (background particle atmosphere -> midground 3D canvas -> foreground typographic and editorial content).
- **Zero Template Fatigue**: Unpredictable yet intuitive layouts, varying section rhythms, generous negative space (*Ma*), and zero monotonous 3-column card grids.
- **Micro-Interactions**: Magnetic buttons, subtle custom cursor (with option to disable on touch devices), fluid hover states with smooth easing curves.

---

## 4. Visual & Aesthetic Requirements
- **Variation A (Architectural Editorial)**:
  - Palette: Deep carbon (`#0A0B0E`), bone white (`#F3F3F0`), technical titanium (`#8E929B`), laser amber (`#F59E0B`).
  - Typography: Syne / Space Grotesk display paired with JetBrains Mono for telemetry and Inter / Instrument Sans for reading.
- **Variation B (Ghost of Tsushima Cinematic)**:
  - Palette: Sumi ink (`#0B0C0E`), washi cream (`#F4EFE6`), weathered slate (`#1C2026`), cinnabar vermilion (`#C83226`).
  - Typography: Cinzel / Cormorant Garamond display paired with Noto Serif / Zen Antique aesthetic, with stamped Inkan seals and vertical Japanese typographic accents.
- **Anti-Vibe-Coded Enforcement**: Strictly zero cards-in-cards, zero purple glow blobs, zero hollow tech buzzwords.

---

## 5. Technical Requirements & Performance Budget
- **Core Stack**: React 19 + Vite + Three.js / WebGL shaders + Vanilla CSS (using CSS custom properties and scoped modular styling).
- **Performance Targets**:
  - Initial JS bundle < 250KB gzipped (code-split 3D engine).
  - 60 FPS smooth rendering on modern devices.
  - Polycount < 15k vertices; zero heavy external model downloads.
- **Accessibility & Devices**:
  - Full keyboard navigability (`Tab`, `Enter`, `Space`, `Escape`).
  - Strict compliance with `prefers-reduced-motion` (disables 3D camera pan and particle drift).
  - Seamless responsive design across mobile (375px+), tablet, laptop, and ultra-wide displays (2560px+).

---

## 6. Constraints & Anti-Requirements
- ❌ Do NOT fabricate metrics, projects, clients, or achievements.
- ❌ Do NOT use copyrighted game assets, Jin Sakai art, or PlayStation trademarks.
- ❌ Do NOT use generic UI component libraries (shadcn, MUI, Bootstrap) without deep custom CSS overrides.
- ❌ Do NOT sacrifice mobile performance for desktop visual spectacle.
