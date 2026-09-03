---
name: anti-vibecoded-design
description: "Audit and eliminate generic 'vibe coded' and AI-generated design patterns. Enforces authentic product evidence, concrete copywriting, custom typographic hierarchy, and structural restraint."
---

# Anti-Vibe-Coded Design & Quality Audit Skill

Based on the StyleMole design principles (vibemole.com/resources/avoid-vibecoded-app-design) and modern web design standards.

## Purpose
Prevent interfaces from falling into the generic, auto-generated aesthetic trap where an application looks polished at a glance but screams "default AI prompt output."

---

## The Anti-Vibe-Coded Blocklist

### 1. Structure & Layout Clichés
- ❌ **Nested Cards**: No outer card → inner card → stat card → badge → icon tile.
  - *Fix*: Remove at least one wrapper layer per section. Let content breathe on the background plane.
- ❌ **Generic 6-Feature Grids**: Six identical cards with identical icon boxes and 2 lines of text.
  - *Fix*: Create visual dominance for the primary feature or showcase a real workflow/evidence instead of 6 equal tiles.
- ❌ **Pill Badge Spam**: Eyebrow labels (`AI POWERED`, `NEXT GEN`, `BUILT FOR FOUNDERS`) above every single heading.
  - *Fix*: Use badges only for semantic status or concrete proof; never as pure decoration.
- ❌ **One-Sided Colored Borders**: Random left/top colored strips on cards without semantic meaning.
  - *Fix*: Reserve color accents strictly for data categories, alert severity, or intentional interaction focus.

### 2. Visual & Styling Clichés
- ❌ **Default Purple/Indigo Gradients & Blurred Glowing Blobs**:
  - *Fix*: Establish a curated, restrained color palette (e.g. monochromatic charcoal/slate with a single vibrant or natural earthy accent).
- ❌ **Glassmorphism as a Crutch**: Translucent glass backgrounds with heavy backdrop-blur applied to everything to disguise weak information hierarchy.
  - *Fix*: Use purposeful material contrast (matte surfaces, paper texture, subtle high-contrast borders).
- ❌ **Default Lucide Icon Everywhere**: Placing an icon inside a rounded square next to every sentence.
  - *Fix*: Replace decorative icons with actual technical diagrams, code snippets, visual artifacts, or typography.

### 3. Copywriting Clichés
- ❌ **Empty Tech Jargon**: "Seamless", "Supercharge", "Unlock powerful insights", "Transform your workflow", "Turning ideas into reality", "Passionate developer".
  - *Fix*: Use concrete verbs and specific nouns: "Analyzed 45k AST nodes", "Reduced latency by 42ms", "Built a custom WebGL particle simulation".
- ❌ **Repeated Heading Formulas**: "Everything you need to...", "Built for...", "Designed for...".
  - *Fix*: Name the actual technical action or domain capability.

### 4. Authenticity & Evidence Clichés
- ❌ **Fake Social Proof & Fabricated Metrics**: No fake client logos, fake 5-star quotes, or arbitrary numbers ("99.9% faster", "100+ satisfied clients").
  - *Fix*: Show actual commit histories, real problem statements, architectural trade-offs, interactive sandboxes, and genuine technical learnings.

### 5. Motion & Micro-interaction Clichés
- ❌ **Pulsing Dots & Infinite Animated Borders**: Blinking lights and moving gradient borders that distract rather than inform.
  - *Fix*: Motion must be tied to user interaction (scroll-driven camera, cursor perspective, tactile button press, state change).

---

## The StyleMole Self-Audit Checklist

Before committing any component or page:
1. [ ] **Wrapper Count**: Did we remove unnecessary container cards?
2. [ ] **Copy Test**: Does any sentence sound like generic SaaS? If so, replace with technical specifics.
3. [ ] **Palette Discipline**: Is the color palette restrained (≤ 3-4 intentional colors)?
4. [ ] **Evidence Test**: Is every claim supported by real project work, code, or demonstrable artifact?
5. [ ] **Typography Hierarchy**: Is there strong contrast in scale, weight, and tracking between display and body text?
