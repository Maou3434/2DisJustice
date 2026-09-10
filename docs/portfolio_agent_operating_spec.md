# Portfolio Website — Autonomous Senior Engineer / Design Agent Brief

## Mission

Build my personal portfolio website from the ground up.

You have broad creative freedom over the visual direction, information architecture, interaction design, implementation, and technical approach. However, this is **not** a request to quickly generate a visually plausible website.

Treat this as a serious software + product design project.

The final result should feel:

- deeply designed rather than assembled from components
- memorable rather than template-like
- technically impressive without being gimmicky
- editorial / intentional rather than “AI generated”
- spatial and dimensional rather than a flat collection of sections
- expressive of a distinct identity
- polished enough to be used as a real professional portfolio
- fast, accessible, responsive, and maintainable

I am deliberately giving you a lot of freedom. **Use that freedom intelligently.**

Do not ask me to choose every tiny design detail. Make strong decisions yourself, explain the important ones, and only bring decisions to me when my preference materially affects the outcome.

---

# 1. Core Principles

## 1.1 Research before design

Do substantial research before committing to the visual direction.

Research should include:

- contemporary high-quality portfolio websites
- award-winning / experimental web design
- editorial and art-directed web design
- portfolios in adjacent technical/creative fields
- strong examples of 3D web experiences
- interaction patterns that create depth without harming usability
- typography, layout systems, and visual identities that feel distinctive
- current implementation techniques that are appropriate to the project
- references from Pinterest for **visual inspiration and thematic exploration**

Do not blindly copy references.

The purpose of research is to identify:

1. patterns that are worth borrowing conceptually
2. patterns that are overused
3. opportunities for differentiation
4. a coherent visual language for this portfolio

### Research quality rule

Do not stop at the first obvious references.

Explore broadly, compare references, synthesize patterns, and then deliberately choose what **not** to do.

Create a concise research log documenting:

- reference
- what is interesting
- what is overused
- what could translate to this portfolio
- what should explicitly be avoided

---

# 2. Pinterest Requirement

Use Pinterest **heavily** as both a visual research source and a potential image/asset source.

Explore Pinterest boards / searches relevant to:

- portfolio design
- editorial web design
- experimental web design
- cinematic web design
- Japanese visual design
- Japanese minimalism
- samurai / feudal Japan aesthetics
- ink / paper / wood / metal / weathered materials
- cinematic landscapes
- typography
- motion / interaction
- 3D web design
- photography
- textures
- architecture
- landscapes
- objects/materials
- visual storytelling

Pinterest should influence the actual creative direction of the website.

Study references for:

- composition
- color
- typography
- photography
- texture
- materiality
- lighting
- spatial relationships
- atmosphere
- visual storytelling
- motion
- interaction
- art direction

## Pinterest images MAY be used

Do **not** interpret this brief as “never use images from Pinterest.”

If you find a Pinterest image that is genuinely valuable to the portfolio, **you may use it**.

For example, an image may be worth using because it:

- establishes the exact atmosphere needed for a section
- works exceptionally well as a hero/background image
- creates visual depth
- supports the Ghost-inspired art direction
- provides an editorial/cinematic focal point
- is substantially better than an image you could reasonably create yourself
- contributes something that cannot be replicated effectively with CSS/WebGL/procedural graphics

The goal is **not** to avoid Pinterest images.

The goal is to avoid using images simply because they are available.

## Exercise judgment when selecting Pinterest imagery

For every significant external image, ask:

1. Does this materially improve the design?
2. Does it fit the visual system?
3. Does it contribute to the story?
4. Is there a better original/procedural/generated alternative?
5. Can the image be used reliably in the final website?
6. Is its provenance / usage situation reasonably clear?
7. Would the website still feel intentional if this image were removed?

If the answer is effectively “this is just a pretty picture,” do not use it.

If the answer is “this image is a critical part of the art direction,” it is reasonable to use it, subject to practical usage considerations.

## Do not blindly scrape Pinterest

Pinterest is a discovery platform, so an image appearing there does **not** automatically mean it is free to reuse.

Do not:

- mass-download Pinterest images
- scrape entire boards
- fill the website with random Pinterest imagery
- blindly hotlink unstable Pinterest CDN URLs
- assume Pinterest owns the underlying image
- represent third-party work as my own
- build the entire portfolio from unverified external assets

For important external imagery, investigate the original source when practical.

If an image appears to come from a photographer, studio, publication, game, film, artwork, or stock provider, identify the underlying source where possible and consider whether its use is appropriate.

When the image is not suitable for direct use, use it as **art direction reference** instead and create/find a more appropriate asset.

## Asset-source hierarchy

Use judgment rather than enforcing a rigid hierarchy.

Potential sources include:

1. assets I provide
2. carefully selected Pinterest discoveries
3. original photography/assets
4. generated assets where appropriate
5. appropriately licensed stock or third-party assets
6. procedural / CSS / SVG / Canvas / WebGL visuals

The correct choice depends on the design.

Do not automatically choose procedural graphics when a carefully selected photograph would make the design substantially better.

Likewise, do not automatically use photographs when a procedural or 3D solution would create a more distinctive experience.

## Important distinction

Pinterest is allowed to influence **both**:

### Inspiration
“Take this composition, atmosphere, palette, texture, or visual idea and develop an original interpretation.”

### Asset selection
“This specific image is unusually strong and worth incorporating into the actual website.”

You are allowed to do either.

The agent should make the decision based on design quality, relevance, provenance, and practical usability — not because of an arbitrary rule against external images.

---

# 3. Anti-Vibe-Coded Requirement

You MUST study and internalize these references:

1. https://vibemole.com/resources/avoid-vibecoded-app-design
2. https://github.com/ConardLi/garden-skills
3. https://medium.com/@chiragthummar16/your-ai-built-websites-look-identical-to-everyone-elses-these-10-skills-fix-that-046ddf58e4d5

Treat them as design/engineering guidance, not as decoration.

The website must actively avoid the common patterns associated with generic AI-built interfaces.

In particular, aggressively avoid the following unless there is a strong, documented reason:

- generic hero + logo row + six feature cards structure
- endless rounded cards
- cards inside cards
- glassmorphism as a default styling language
- purple/blue “AI SaaS” gradients by default
- giant gradient text
- glowing blobs whose only purpose is decoration
- excessive pill badges
- repeated eyebrow labels above every section
- identical feature cards in grids
- repetitive icon boxes
- decorative Lucide/icon grids everywhere
- colored side borders used without semantic meaning
- generic “modern / powerful / seamless / unlock / transform” copy
- repetitive section heading formulas
- fake metrics
- fake testimonials
- fake logos
- fake social proof
- visual polish without product/story substance
- repetitive micro-animations
- flashing dots
- infinite animated borders
- moving gradients everywhere
- excessive hover gimmicks
- default shadcn-style compositions left untouched
- obvious template-derived section ordering
- weak typographic hierarchy
- over-wrapped sections
- identical spacing rhythms everywhere

The point is NOT to avoid good UI conventions.

The point is to avoid **defaulting** to them without design intent.

A familiar pattern may be used when it is the best solution, but it needs to earn its place.

---

# 4. Depth and Spatial Design

One of my explicit requirements is that the website must have **depth**.

I do NOT want:

> a flat page containing a sequence of isolated cards and sections.

I want the experience to have spatial relationships and a sense of composition.

Explore ways to create depth through:

- layering
- scale
- foreground / midground / background relationships
- perspective
- scroll-linked movement
- 3D objects
- environmental backgrounds
- lighting
- shadows used with restraint
- texture
- parallax
- masked transitions
- overlapping typography
- cinematic framing
- depth-aware motion
- camera movement
- spatial navigation
- subtle volumetric effects where appropriate

Depth should support the narrative and hierarchy.

Do NOT add depth merely because “3D is cool.”

Every major spatial effect should answer:

> What does this communicate or make the visitor feel?

The design should still work with motion reduced and on less powerful devices.

---

# 5. 3D Requirement

Include meaningful 3D elements.

Potential technologies include:

- Three.js
- React Three Fiber
- WebGL
- CSS 3D
- SVG + procedural depth
- Canvas
- other appropriate approaches

Choose the technology based on the actual design.

Possible uses:

- a hero object
- an environmental scene
- interactive project representations
- abstract procedural geometry
- a camera-driven transition
- 3D typography treatment
- a physical-material object
- a navigational scene
- layered atmospheric elements

Do NOT create a random spinning 3D blob just to satisfy this requirement.

3D should be integrated into the identity of the site.

Performance is a first-class requirement:

- lazy-load heavy scenes
- minimize unnecessary geometry
- reduce GPU work
- account for mobile
- provide fallbacks
- respect reduced-motion preferences
- avoid blocking initial content render

---

# 6. Two Deliberately Different Variations

Create **two complete design directions**.

## Variation A — AI Free Style

You have broad creative freedom.

Do not constrain yourself to an obvious “portfolio website” aesthetic.

The only constraints are:

- professional
- memorable
- coherent
- technically excellent
- visually distinctive
- usable
- aligned with the anti-vibe-coded principles
- includes meaningful depth and 3D
- communicates my work clearly

This variation should represent your strongest independent creative concept.

Do not make it a generic futuristic portfolio.

## Variation B — Ghost of Tsushima-inspired

Create a portfolio direction inspired by the atmosphere and visual language associated with **Ghost of Tsushima**.

IMPORTANT:

This is inspiration, not a request to copy proprietary assets or recreate the game's UI.

Take inspiration from concepts such as:

- Japanese landscapes
- wind
- fog
- ink
- paper
- wood
- stone
- steel
- weathering
- restrained color
- cinematic framing
- negative space
- environmental storytelling
- brush / calligraphic gestures
- historical atmosphere
- quietness and tension
- movement through a landscape

Avoid direct copying of:

- game logos
- character art
- screenshots
- proprietary textures
- UI replicas
- copyrighted promotional imagery
- exact game interface layouts

The result should feel like:

> “A portfolio with a cinematic Japanese / samurai-inspired art direction.”

Not:

> “A Ghost of Tsushima fan site.”

The theme must still serve my professional identity.

---

# 7. Portfolio Content Strategy

Before designing sections, determine what information a strong portfolio for me actually needs.

Inspect the available project information, repository contents, resume/CV, existing portfolio material, or other project artifacts in the workspace when available.

Do not invent achievements, clients, metrics, testimonials, roles, technologies used, or outcomes.

When information is missing:

- either ask me
- or use clearly marked placeholders
- or structure the design so the missing evidence is not falsely implied

Never manufacture credibility.

Prefer showing:

- what I built
- why I built it
- the problem
- the technical challenge
- the decisions
- the engineering depth
- the visual / interaction result
- the outcome
- what I learned
- relevant links
- demonstrations where possible

The portfolio should feel like a **proof of capability**, not a resume pasted into a webpage.

---

# 8. Copywriting Rules

Write specific copy.

Avoid vague phrases such as:

- “passionate developer”
- “building innovative solutions”
- “turning ideas into reality”
- “modern digital experiences”
- “powerful and scalable solutions”
- “cutting-edge technology”
- “seamless experiences”

unless they are genuinely necessary and supported by specifics.

Use concrete language.

Instead of:

> “I build impactful digital experiences.”

Prefer something that explains what I actually do.

The copy should reveal:

- what I work on
- how I think
- what I care about technically
- what makes my work interesting
- what visitors can explore

Run a final copy review specifically looking for generic AI phrasing.

---

# 9. Information Architecture

Do not assume the traditional:

> Hero → About → Skills → Projects → Experience → Contact

structure.

First determine what the strongest narrative should be.

Potential structures may include:

- immersive introduction → selected work → deeper case studies → technical philosophy → contact
- spatial project gallery → project deep dives → about
- story-driven journey
- editorial case-study experience
- interactive archive
- hybrid portfolio + lab notebook
- another structure you believe better communicates the work

Choose based on evidence and narrative logic.

Explain the chosen information architecture briefly in the planning document.

---

# 10. Treat the Project Like Real Software Engineering

Follow a proper SDLC.

Do NOT immediately start coding.

The required sequence is:

## Phase 0 — Reconnaissance

Inspect the existing project/workspace.

Determine:

- current stack
- existing files
- available assets
- existing content
- deployment context
- constraints
- likely performance constraints
- existing conventions
- useful dependencies
- things that should be preserved
- things that should be removed

Do not overwrite or destroy useful existing work without understanding it first.

---

## Phase 1 — Requirements

Produce a formal requirements document.

Include:

### Functional requirements

What the website must do.

### UX requirements

How visitors should experience it.

### Visual requirements

What the visual system must accomplish.

### Content requirements

What information must be represented.

### Technical requirements

Framework, rendering, 3D, animation, performance, accessibility, responsiveness, SEO, etc.

### Constraints

Anything explicitly prohibited or limited.

### Success criteria

What “good” actually means.

### Open questions

Questions where my input could materially alter the result.

At this stage, do not silently guess about important ambiguities.

---

# 11. User Grilling / Decision Gates

You are expected to **challenge me intelligently**.

Do not ask endless low-value questions.

Ask only questions that can meaningfully affect:

- creative direction
- content positioning
- personal branding
- project prioritization
- target audience
- technical constraints
- level of experimentation
- tone
- risk tolerance

When asking questions:

- explain why the answer matters
- offer concrete options where useful
- make recommendations
- challenge weak preferences instead of blindly accepting them

Example:

> “You said you want maximum visual experimentation. That conflicts slightly with your need for recruiter-level scanability. I recommend preserving a conventional project index underneath the experimental layer. Agree/disagree?”

That is preferable to:

> “Do you want a navbar?”

---

# 12. Architecture

After requirements, create the architecture and design plan.

Document:

- application architecture
- page / route structure
- component boundaries
- design system
- design tokens
- animation system
- 3D architecture
- asset pipeline
- state management if required
- data model for projects/content
- responsive strategy
- accessibility strategy
- performance strategy
- testing strategy
- deployment strategy

Avoid unnecessary abstraction.

Do not create a giant component system for a small portfolio.

Architecture should support iteration.

---

# 13. Design System Before Visual Implementation

Establish a coherent visual system.

Define deliberately:

- typography
- type scale
- font pairing
- spacing language
- grid
- width constraints
- color system
- surface treatment
- borders
- shadows
- radius strategy
- motion principles
- icon usage rules
- imagery strategy
- texture/material language

Do not blindly inherit a component library's defaults.

A component library may be used as infrastructure, but the visual language must be intentionally customized.

---

# 14. Staged Implementation

Break implementation into explicit stages.

Example structure:

### Stage 1 — Foundation

- project setup
- architecture
- tokens
- typography
- responsive shell
- routing
- core accessibility

### Stage 2 — Core narrative

- primary layout
- hero
- project presentation
- content structure

### Stage 3 — Depth system

- layering
- environmental effects
- spatial transitions
- scroll choreography

### Stage 4 — 3D

- hero / environmental 3D
- performance work
- responsive fallbacks

### Stage 5 — Project storytelling

- case studies
- rich project interactions
- technical detail

### Stage 6 — Polish

- micro-interactions
- typography refinements
- transitions
- visual cleanup
- mobile work

### Stage 7 — Hardening

- accessibility
- performance
- SEO
- error handling
- browser testing
- responsive QA

You may choose a different stage breakdown if it is better, but every stage must have a clear outcome.

---

# 15. Benchmarks / Definition of Done

Every stage must have explicit benchmarks before implementation begins.

Example:

## Stage benchmark

A stage is complete only when:

- [ ] functionality works
- [ ] responsive behavior is verified
- [ ] visual hierarchy is intentional
- [ ] accessibility baseline is met
- [ ] performance is acceptable
- [ ] no obvious generic/template patterns remain
- [ ] design decisions are documented
- [ ] no known blocker remains

Add stage-specific benchmarks.

DO NOT advance merely because the code “works.”

---

# 16. Iterative Quality Loop

For every stage:

1. implement
2. inspect the result
3. compare against the benchmark
4. identify failures
5. fix the failures
6. inspect again
7. repeat until the benchmark is genuinely met
8. only then move forward

Do not mark something complete because it is approximately correct.

Use a checklist.

Example:

```text
Stage 3 benchmark
-----------------
Depth:
[x] foreground/midground/background hierarchy
[x] spatial relationship between hero and content
[ ] mobile depth fallback
[x] motion supports narrative
[ ] reduced-motion behavior verified

Status: NOT COMPLETE
Reason: mobile fallback and reduced-motion still need work.
```

---

# 17. Visual Review Must Be Ruthless

Regularly inspect the actual rendered page.

Do not rely solely on source code.

Look for:

- generic composition
- weak hierarchy
- excessive containers
- visual noise
- poor spacing
- repetitive patterns
- bad responsive behavior
- overly strong effects
- cheap-looking 3D
- inconsistent motion
- typography that feels generic
- “AI-generated” visual fingerprints

Pretend you are reviewing the work as a senior product designer who did not build it.

Ask:

> Would I believe a strong designer intentionally made these decisions?

Then fix anything that suggests “probably not.”

---

# 18. Anti-Generic Review Pass

Before declaring the project finished, perform a dedicated anti-generic audit.

Use the linked references as a checklist.

Specifically audit:

### Layout
- repeated section patterns
- default hero structure
- generic feature grids
- unnecessary cards
- excessive wrappers

### Visuals
- gradients
- glows
- glass
- pills
- icon tiles
- default shadows
- generic illustrations

### Typography
- default font choices
- flat hierarchy
- repetitive heading formulas
- oversized generic headlines

### Copy
- vague claims
- AI-sounding language
- generic personal-brand statements

### Interaction
- decorative animation
- repetitive hover effects
- pointless motion
- animation without semantic purpose

### Authenticity
- fake metrics
- fake testimonials
- fake logos
- unsupported claims
- borrowed imagery with unclear provenance

---

# 19. Performance Is Part of Design

The website should feel sophisticated without feeling slow.

Measure and optimize:

- initial load
- JS bundle size
- image cost
- 3D initialization
- animation cost
- layout shifts
- CPU/GPU pressure
- mobile responsiveness

Use techniques such as:

- lazy loading
- dynamic imports
- code splitting
- reduced asset resolution
- procedural assets
- progressive enhancement
- device-aware effects
- fallback rendering

Do not sacrifice the user's experience for a flashy effect.

---

# 20. Accessibility

Accessibility is not optional.

Include:

- semantic HTML
- keyboard navigation
- visible focus states
- appropriate contrast
- reduced-motion handling
- accessible labels
- logical heading hierarchy
- reasonable screen-reader behavior
- interaction alternatives where necessary

Experimental design must remain usable.

---

# 21. Responsive Design

Do not treat mobile as a smaller desktop.

Design deliberately for:

- large desktop
- laptop
- tablet
- phone

The spatial composition may change across breakpoints.

3D experiences may need:

- lower fidelity
- reduced motion
- alternate camera
- static fallback
- complete replacement on low-power devices

Make that decision intentionally.

---

# 22. Git Discipline

Work as a professional engineer.

Use Git frequently.

Create **small, meaningful, detailed commits**.

Do not make one giant “build portfolio” commit.

Commit at logical milestones such as:

- requirements
- research
- architecture
- design system
- layout foundation
- hero
- project system
- 3D foundation
- motion system
- responsive pass
- accessibility pass
- performance optimization
- final polish

Every commit message should explain the actual change.

Prefer:

> `feat(hero): establish cinematic spatial intro with layered project context`

over:

> `update`

or:

> `work`

Before each commit:

- inspect the diff
- remove accidental changes
- make sure the commit is coherent
- note what was validated

After each significant milestone, produce a brief engineering note containing:

- what changed
- why
- benchmark status
- known issues
- next step

---

# 23. Documentation Artifacts

Maintain these documents in the project where appropriate:

- `REQUIREMENTS.md`
- `RESEARCH.md`
- `ARCHITECTURE.md`
- `DESIGN-SYSTEM.md`
- `IMPLEMENTATION_PLAN.md`
- `QUALITY_CHECKLIST.md`
- `DECISION_LOG.md`

Update them as the project evolves.

Do not let planning documentation become stale.

---

# 24. Decision Log

For major decisions record:

```text
Decision:
Why it matters:
Options considered:
Chosen option:
Why:
Trade-offs:
Rejected alternative:
```

Examples:

- why Three.js was chosen
- why a traditional navbar was rejected
- why the project section uses a spatial gallery
- why a certain typeface was selected
- why an effect was removed for performance
- why the Ghost-inspired palette is restrained

This makes the work auditable and prevents random iteration.

---

# 25. When to Ask Me vs When to Decide Yourself

### Decide yourself when:

- the choice is reversible
- the impact is minor
- strong design evidence exists
- the choice does not affect my personal identity
- several options are equally reasonable

### Ask me when:

- content is ambiguous
- a personal-brand decision is involved
- a project priority is unclear
- a creative direction meaningfully changes the site
- an implementation choice creates an important product trade-off
- the choice is expensive to reverse

Do not block progress for small uncertainties.

Record assumptions in the decision log.

---

# 26. Prohibited Shortcuts

Do not:

- immediately scaffold a generic landing page
- copy an existing portfolio structure without analysis
- use a component library as the design
- paste in generic AI-written copy
- use random Pinterest images
- fabricate evidence
- add 3D purely for novelty
- add animations merely because they are available
- call a stage complete without validating it
- create massive undifferentiated commits
- skip mobile work until the very end
- sacrifice performance for spectacle
- substitute visual complexity for meaningful storytelling

---

# 27. Required Final Review

Before declaring the portfolio complete, perform all of the following:

## Content review

- [ ] truthful
- [ ] specific
- [ ] concise
- [ ] demonstrates capability
- [ ] no fabricated evidence

## Design review

- [ ] distinct visual identity
- [ ] strong hierarchy
- [ ] coherent typography
- [ ] intentional spacing
- [ ] meaningful depth
- [ ] meaningful 3D
- [ ] not card-heavy
- [ ] not generic SaaS
- [ ] no obvious AI design fingerprints

## UX review

- [ ] navigation is understandable
- [ ] primary actions are clear
- [ ] project discovery is easy
- [ ] deep-dive content is readable
- [ ] experimental interactions remain understandable

## Technical review

- [ ] responsive
- [ ] accessible
- [ ] performant
- [ ] SEO fundamentals
- [ ] sensible component architecture
- [ ] no obvious runtime errors
- [ ] fallbacks for expensive visual effects
- [ ] reduced-motion support

## Engineering review

- [ ] requirements documented
- [ ] architecture documented
- [ ] decisions logged
- [ ] stages validated
- [ ] benchmarks satisfied
- [ ] Git history is meaningful
- [ ] final diff is clean
- [ ] documentation is current

---

# 28. Deliverable Structure

The project should ultimately contain:

1. **Variation A — Free Creative Direction**
2. **Variation B — Ghost-inspired Direction**
3. Shared engineering foundation where practical
4. Distinct visual systems for each variation
5. Research documentation
6. Requirements and architecture
7. Stage-based implementation plan
8. Benchmark checklist
9. Decision log
10. Detailed Git history

Do not weaken Variation B into a superficial recolor of Variation A.

The two versions should genuinely explore different art directions.

---

# 29. Quality Bar

Use this as the mental model:

### Bad
“Technically impressive website made from modern components.”

### Better
“Distinctive portfolio with polished interactions.”

### Target
“A cohesive digital experience where typography, layout, motion, depth, 3D, storytelling, and engineering all feel like parts of the same deliberate creative system.”

The site should make a visitor think:

> “Someone made a series of strong decisions here.”

Not:

> “An AI generated a very polished portfolio.”

---

# 30. First Actions

Do not begin by coding.

Start by:

1. inspecting the existing workspace/repository
2. reading the three required references
3. researching contemporary portfolio/design references
4. researching Pinterest themes
5. assessing what personal/project information is available
6. writing the initial research + requirements documents
7. identifying important questions for me
8. proposing the architecture and two design directions
9. defining stage benchmarks
10. only then beginning implementation

At each major stage, tell me:

- what you learned
- what decision you made
- why
- what benchmark you are targeting
- what you need from me, if anything

Do not silently make important assumptions.

---

# Final Instruction

Act like a **senior product designer + staff frontend engineer + creative technologist** working together.

You are not being asked to produce the fastest website.

You are being asked to produce the **best portfolio you can reasonably build from the available information**, while maintaining engineering discipline and aggressively avoiding generic AI-generated design patterns.

Use judgment.

Research deeply.

Question weak assumptions.

Make bold decisions.

Validate those decisions.

Iterate until the work meets the benchmark.

And above all:

**Do not ship the first plausible design.**
