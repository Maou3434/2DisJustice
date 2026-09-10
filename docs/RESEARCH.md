# Research Log & Creative Synthesis

## 1. Objectives & Scope
This research explores visual systems, spatial web architecture, and material metaphors for Abimanyu Jayaganesh's personal engineering portfolio. The brief demands two distinct variations:
1. **Variation A — AI Free Style / Architectural Editorial**: Dimensional typography, asymmetric constructivist layout, physical material contrast, deep engineering telemetry.
2. **Variation B — Ghost of Tsushima-Inspired / Feudal Japanese Cinematic**: Restrained atmospheric palette (Sumi ink, washi cream, wet slate, cinnabar vermilion), *Ma* (negative space), calligraphic energy, wind/fog particle movement, and tactile dimensional artifacts.

---

## 2. Anti-Vibe-Coded Analysis & Deconstruction

Based on *VibeMole StyleMole* research (`vibemole.com/resources/avoid-vibecoded-app-design`) and *ConardLi/garden-skills*:

| Generic "Vibe Coded" AI Trope | Why It Fails | Deliberate Antidote for this Portfolio |
|---|---|---|
| **Nested Cards** (Outer card → inner card → stat tile → badge) | Creates visual clutter and disguises lack of structure | Strip decorative wrappers. Content breathes directly on spatial canvas layers with razor-thin dividing hairline rules (`1px solid rgba(var(--border), 0.12)`). |
| **Purple/Indigo SaaS Gradients & Blurred Glowing Blobs** | Generic hallmark of default AI prompts; lacks brand identity | Strict monochromatic palette with one intentional physical accent: Cinnabar Vermilion (`#C83226`) in Japanese mode; Electric International Amber (`#F59E0B`) in Architectural mode. |
| **Generic 6-Card Feature Grid** | Homogenizes achievements; no visual hierarchy | Asymmetric layout giving primary dominance to top-tier work (e.g. 78M-step PINN Digital Twin for EV batteries) followed by technical architectural schematics. |
| **Pill Badge Spam** (`AI POWERED`, `NEXT GEN`, `INNOVATIVE`) | Desensitizes visitors; pure noise | Minimalist status stamps with real semantic value: patent application numbers (`IP India 202641027735`), algorithmic classifications (`TSP 2-Opt / DirectML`), and metrics. |
| **Vague AI Copy** ("passionate developer", "supercharge", "seamless") | Zero substance; destroys recruiter trust | Concrete engineering specifics: mathematical ODE formulations, real-time Lakehouse pipeline latency, DirectML distance matrices. |
| **Fake Social Proof / Fabricated Metrics** | Destroys credibility | 100% truthful data from Abimanyu's resume: published patents, hackathon rank (IEEE IAS CodeDoc), real research publications. |

---

## 3. Thematic & Visual Research: Variation B (Ghost of Tsushima Cinematic)

### Visual Metaphors & Materiality
- **Sumi (墨 - Ink)**: Fluid particle dynamics, calligraphy strokes that dissolve on scroll, dark ink-wash gradients (`#0B0C0E` to `#14171C`).
- **Washi (和紙 - Japanese Paper)**: Organic fibrous texture, off-white tactile warmth (`#F3EFE6`), high contrast against dark stone.
- **Kaze (風 - Wind)**: Environmental particle field in WebGL/Canvas with directional velocity, simulating wind carrying faint embers or cedar dust across the viewport.
- **Tsuba & Folded Steel**: Interactive 3D katana guard or dimensional ceremonial talisman rendered via WebGL with PBR roughness and metallic sheen.
- **Inkan / Hanko (印鑑 - Red Seal Stamp)**: Square cinnabar stamp marking authorship and authenticity, used sparingly as an interactive emblem.

### What to Borrow Conceptually
- Cinematic widescreen letterboxing and spacious horizontal pacing.
- Asymmetric compositions with pregnant negative space (*Ma*).
- Soundscape design: Optional, muted-by-default subtle tactile chimes / sword unsheathe on deliberate interactions.

### What to Explicitly Avoid
- Do NOT copy Sony/Sucker Punch game logos, character models (Jin Sakai), or copyrighted promotional screenshots.
- Do NOT make a game wiki or fan page. It must remain an authentic, serious portfolio for a Software / Machine Learning Engineer.

---

## 4. Thematic & Visual Research: Variation A (Architectural Editorial)

### Visual Metaphors & Materiality
- **Swiss Modernism meets Technical Blueprint**: High-contrast typography scale (5:1 ratio between display numerals and technical monospace annotations).
- **Spatial Matrix**: Orthographic perspectives, wireframe schematics, dimensional depth through foreground data layers gliding over background system diagrams.
- **Technical Precision**: Clean grid coordinates, live timestamp readouts, telemetry gauges representing Abimanyu's IoT and PINN research.

---

## 5. 3D & Spatial Interaction Design
- **Hero Scene**: Lightweight WebGL/Canvas scene with dual modes:
  - In *Tsushima mode*: Atmospheric wind stream with drifting particulate embers, an interactive dimensional 3D talisman/tsuba responding to mouse tilt with realistic specular highlights.
  - In *Architectural mode*: Interactive 3D topological wireframe representing the battery thermal state manifold (PINN loss surface) or high-frequency IoT sensor telemetry mesh.
- **Performance Budget**:
  - Target: 60 FPS on desktop and modern mobile.
  - Polycount: <15k vertices. Zero heavy external 50MB GLTF downloads; procedural parametric geometries with GLSL shaders.
  - Fallback: Graceful CSS 3D perspective layers if WebGL is unavailable or when `prefers-reduced-motion: reduce` is detected.
