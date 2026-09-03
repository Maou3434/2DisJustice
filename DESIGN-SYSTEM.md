# Design System & Token Specifications

## 1. Design Principles
1. **Material Authenticity**: Surfaces must evoke tangible matter (wet stone, raw washi paper, folded steel, matte titanium, architectural vellum).
2. **Strict Contrast Hierarchy**: Every section has one dominant focal anchor; secondary details never fight for attention.
3. **Restrained Accent Discipline**: Maximum of ONE high-chroma accent color per theme.
4. **Anti-Cliché Typography**: Intentional pairings with deliberate contrast between display titles and technical annotations.

---

## 2. Typography System

### Google Fonts Preloads
- **Display Sans / Experimental**: `Syne` (Weights 600, 700, 800)
- **Cinematic Classical Serif**: `Cinzel Decorative` (Weights 600, 700) & `Cormorant Garamond` (Weights 400, 600)
- **Editorial Text Serif**: `Newsreader` / `Lora`
- **Modern Clean Sans**: `Plus Jakarta Sans` / `Inter Tight`
- **Technical Monospace**: `JetBrains Mono` / `Space Mono`

### Type Scale (Augmented Fourth: 1.414 ratio)
| Token | Size (Desktop) | Size (Mobile) | Line Height | Tracking | Usage |
|---|---|---|---|---|---|
| `--text-hero` | 4.5rem (72px) | 2.5rem (40px) | 1.05 | -0.03em | Primary hero statement |
| `--text-h1` | 3.25rem (52px) | 2.0rem (32px) | 1.15 | -0.02em | Section titles |
| `--text-h2` | 2.25rem (36px) | 1.5rem (24px) | 1.25 | -0.01em | Project & company names |
| `--text-h3` | 1.5rem (24px) | 1.25rem (20px) | 1.35 | 0em | Subsection headers |
| `--text-body` | 1.0rem (16px) | 0.9375rem (15px) | 1.65 | 0.01em | Paragraphs, case descriptions |
| `--text-caption` | 0.8125rem (13px) | 0.75rem (12px) | 1.4 | 0.05em | Badges, meta tags, timestamps |
| `--text-mono` | 0.8125rem (13px) | 0.75rem (12px) | 1.5 | 0.02em | Code snippets, metrics, ODE equations |

---

## 3. Thematic Color Systems

### Variation B: Ghost of Tsushima Cinematic
```css
[data-theme="tsushima"] {
  /* Canvas & Ground Surfaces */
  --bg-primary: #0C0D10;         /* Deep Sumi soot ink */
  --bg-surface: #14161B;         /* Wet mountain slate */
  --bg-surface-elevated: #1B1E26;/* Chiseled granite */
  --bg-overlay: rgba(12, 13, 16, 0.85);

  /* Text & Ink */
  --text-primary: #F4EFE6;       /* Hand-pressed washi cream */
  --text-secondary: #C2BBB0;     /* Bleached flax */
  --text-muted: #7E786E;         /* Weathered wood grain */

  /* Singular Cinnabar Accent (Inkan / Seal Stamp) */
  --accent-primary: #C83226;     /* Imperial cinnabar vermilion */
  --accent-subtle: rgba(200, 50, 38, 0.15);
  --accent-glow: rgba(200, 50, 38, 0.35);

  /* Borders & Rules */
  --border-subtle: rgba(244, 239, 230, 0.08);
  --border-prominent: rgba(244, 239, 230, 0.18);
  --border-accent: rgba(200, 50, 38, 0.5);

  /* Geometry & Radius */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;
  --radius-full: 9999px;

  /* Fonts */
  --font-display: 'Cinzel Decorative', 'Cormorant Garamond', serif;
  --font-body: 'Newsreader', serif;
  --font-mono: 'Space Mono', monospace;
}
```

### Variation A: Architectural Editorial
```css
[data-theme="architectural"] {
  /* Canvas & Ground Surfaces */
  --bg-primary: #090A0D;         /* Pure carbon substrate */
  --bg-surface: #111318;         /* Dark titanium alloy */
  --bg-surface-elevated: #181B22;/* Precision machined plate */
  --bg-overlay: rgba(9, 10, 13, 0.9);

  /* Text & Contrast */
  --text-primary: #F6F7F9;       /* Cold chalk white */
  --text-secondary: #B4B9C4;     /* Technical anodized silver */
  --text-muted: #646B7B;         /* Deep graphite */

  /* Laser Precision Accent (Signal Amber / Safety Ochre) */
  --accent-primary: #F59E0B;     /* Calibrated signal amber */
  --accent-subtle: rgba(245, 158, 11, 0.12);
  --accent-glow: rgba(245, 158, 11, 0.3);

  /* Borders & Precision Grids */
  --border-subtle: rgba(246, 247, 249, 0.09);
  --border-prominent: rgba(246, 247, 249, 0.22);
  --border-accent: rgba(245, 158, 11, 0.6);

  /* Geometry & Radius (Razor sharp constructivist) */
  --radius-sm: 0px;
  --radius-md: 2px;
  --radius-lg: 3px;
  --radius-full: 0px;

  /* Fonts */
  --font-display: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 4. Spacing Language (8pt Grid)
- `--space-1`: 0.25rem (4px)
- `--space-2`: 0.5rem (8px)
- `--space-3`: 0.75rem (12px)
- `--space-4`: 1.0rem (16px)
- `--space-6`: 1.5rem (24px)
- `--space-8`: 2.0rem (32px)
- `--space-12`: 3.0rem (48px)
- `--space-16`: 4.0rem (64px)
- `--space-24`: 6.0rem (96px)
- `--space-32`: 8.0rem (128px)

---

## 5. Motion Principles
- **Tsushima Motion**:
  - Timing: 600ms – 1000ms.
  - Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (organic deceleration, mimicking a brush sweep or drifting leaf).
- **Architectural Motion**:
  - Timing: 200ms – 400ms.
  - Easing: `cubic-bezier(0.2, 0, 0, 1)` (tactile, mechanical, and crisp).
- **Reduced Motion**: All animations disabled when `@media (prefers-reduced-motion: reduce)` is active.
