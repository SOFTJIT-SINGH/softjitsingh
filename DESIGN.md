---
name: Softjit Singh - Portfolio
description: Developer portfolio showcasing full-stack and mobile engineering work
colors:
  bg-primary: "#09090b"
  bg-secondary: "#050505"
  bg-surface: "#18181b"
  bg-card: "rgba(24, 24, 27, 0.4)"
  text-primary: "#ffffff"
  text-secondary: "#a1a1aa"
  text-muted: "#71717a"
  accent-blue: "#3b82f6"
  accent-cyan: "#22d3ee"
  accent-purple: "#a855f7"
  border-subtle: "rgba(255, 255, 255, 0.05)"
  border-default: "rgba(255, 255, 255, 0.1)"
  cta-primary-bg: "#ffffff"
  cta-primary-text: "#000000"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.1em"
    textTransform: "uppercase"
rounded:
  full: "9999px"
  xl: "1rem"
  "2xl": "1rem"
  "3xl": "1.5rem"
  phone: "3rem"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "2.5rem"
  "2xl": "3rem"
  section: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.cta-primary-bg}"
    textColor: "{colors.cta-primary-text}"
    rounded: "{rounded.full}"
    padding: "1rem 2rem"
    fontWeight: 700
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "1rem 2rem"
    border: "1px solid rgba(255, 255, 255, 0.1)"
    fontWeight: 700
  chip-tech:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "0.375rem 1rem"
    border: "1px solid rgba(255, 255, 255, 0.1)"
    fontSize: "0.75rem"
  card-project:
    backgroundColor: "rgba(24, 24, 27, 0.5)"
    rounded: "{rounded['2xl']}"
    border: "1px solid rgba(255, 255, 255, 0.05)"
    padding: "{rounded.lg}"
  section-card:
    backgroundColor: "{colors.bg-card}"
    rounded: "{rounded['3xl']}"
    border: "1px solid rgba(255, 255, 255, 0.1)"
    padding: "{rounded.xl}"
    backdropFilter: "blur(12px)"
---

# Design System: Softjit Singh Portfolio

## 1. Overview

**Creative North Star: "The Night Studio"**

A dark, energetic portfolio that feels like walking through a gallery after hours — deep backgrounds, glowing accents, and project work illuminated against the dark. The system is confident and minimal in structure but playful in its lighting: ambient glows, subtle hover lifts, and macOS-browser mockups that frame each project as a finished artifact.

The palette is restrained to a dark neutral core with a triadic blue-cyan-purple accent system. Accents are used sparingly — section markers, bullet points, glow effects — never as dominant surface colors. The energy comes from contrast: pure white CTAs against zinc-950 darkness, ambient glow halos behind mockups, and the single gradient hero text that announces the name.

This system explicitly rejects over-animation and gimmicky motion. Transitions exist to clarify state changes (hover lifts, scroll reveals), not to impress. The portfolio's job is to disappear behind the work.

**Key Characteristics:**
- Dark canvas (zinc-950 / black) with warm-white text
- Triadic accent system (blue, cyan, purple) used as sparing highlights
- Ambient glow via blurred color halos behind mockups
- MacOS browser frame and iPhone frame as project presentation devices
- Glass-morphism section cards with subtle backdrop blur
- Pill-shaped buttons and chips reinforce a soft, approachable feel

## 2. Colors

A dark-restrained palette where deep neutrals carry the surface and a triadic accent system provides directional color without dominating.

### Primary
- **Accent Blue** (#3b82f6): Primary interactive color. Used for section markers, link hover states, active indicators, glow effects behind mobile mockups, and pulse dots. Never used as a surface fill.

### Secondary
- **Accent Cyan** (#22d3ee): Web project section marker, web card bullet points, web glow ambient halos. Distinguishes web section from mobile section.
- **Accent Purple** (#a855f7): Education section marker. Gradient partner in hero name treatment.

### Tertiary
- **Green** (#22c55e): Project card bullet points in the portfolio page.
- **Yellow** (#eab308): Certifications section icon color. Achievement marker.

### Neutral
- **Primary Background** (#09090b / zinc-950): Main page background. The default canvas.
- **Secondary Background** (#050505): Portfolio detail page. One step darker for visual separation.
- **Surface** (rgba(24, 24, 27, 0.4) / zinc-900/40): Section cards with backdrop-blur. Glass-layer surfaces.
- **Card** (rgba(24, 24, 27, 0.5) / zinc-950/50): Project card backgrounds in portfolio grid.
- **Text Primary** (#ffffff): Headings, navigation, primary labels.
- **Text Secondary** (#a1a1aa / gray-400): Body copy, descriptions, metadata.
- **Text Muted** (#71717a / gray-500): Secondary metadata, pending-state labels.
- **Border Subtle** (rgba(255, 255, 255, 0.05)): Section dividers, card borders at rest.
- **Border Default** (rgba(255, 255, 255, 0.1)): Interactive borders, chip borders, button outlines.
- **CTA Background** (#ffffff): Primary call-to-action buttons.
- **CTA Text** (#000000): Text on CTA buttons.

### Named Rules
**The Glow-As-Light Rule.** Ambient colored halos are the only lighting effect. A single blurred circle (blue-500/20, cyan-500/10) behind each mockup provides depth without shadow. Never use drop shadows for ambient lighting; the glow is the light.

## 3. Typography

**Display Font:** Geist (with system-ui, sans-serif fallback)
**Body Font:** Geist (with system-ui, sans-serif fallback)
**Label/Mono Font:** Geist Mono (for small uppercase labels)

**Character:** A single-family system with strong weight contrast. Geist provides the full range from light (hero tagline) to extrabold (hero name, section titles). The mono cut is reserved for small uppercase type labels (project type, tech categories). The pairing is clean, technical, and confident — matching the "creative, energetic, playful" personality without decorative fonts.

### Hierarchy
- **Display** (800, clamp(2.5rem, 8vw, 6rem), 1, -0.02em): Hero name. Used once per page. The single bold statement.
- **Headline** (700, clamp(2rem, 5vw, 3.75rem), 1.1, -0.01em): Section titles ("Mobile Ecosystem", "Web Architecture"). Never more than one per section.
- **Title** (700, clamp(1.25rem, 2.5vw, 1.5rem), 1.2): Card headings, project titles, sub-section headers.
- **Body** (400, 1rem / 1.125rem, 1.6): Descriptions, project summaries, paragraph copy. Line length capped at 75ch.
- **Label** (700, 0.75rem, 0.1em uppercase): Project type labels ("Mobile App", "Web Application"), tech category headers.

## 4. Elevation

The system uses ambient glow and backdrop blur instead of traditional box shadows. Depth is conveyed through three mechanisms:

1. **Ambient color halos** — A blurred circle behind each mockup (blue-500/20 blur-[100px] for mobile, cyan-500/10 blur-[120px] for web). These are the primary depth signal.
2. **Hover scale transforms** — Interactive elements lift on hover via `scale(1.02)` or `scale(1.05)`. The motion is subtle and exponential-eased.
3. **Backdrop blur on section cards** — `bg-zinc-900/40 backdrop-blur-md` creates a frosted-glass depth against the dark canvas.

Traditional `box-shadow` is used sparingly — only on the CTA hover state (white glow) and the iOS dynamic island inset. No card shadows; no button shadows at rest.

## 5. Components

### Buttons
- **Shape:** Pill-shaped, fully rounded (9999px).
- **Primary CTA:** White background, black text. 1rem 2rem padding. Hover: slight scale-up (scale-105), optional white-glow box-shadow. Used for "View Mobile Apps", "View Details", "Source Code" actions.
- **Secondary CTA:** Transparent with thin white border (white/10), white text. Hover: bg-zinc-800 background. Used for "View Web Apps" on hero.
- **Tab Filter:** Pill-shaped, dark background (zinc-800/50) with subtle border. Active tab: white background with black text and glow shadow. Used in PortfolioPage skills section.

### Chips / Tech Stack Tags
- **Style:** Fully rounded, bg-white/5, white/10 border, gray-300 text, 0.75rem font-size. Grouped in flex-wrap rows below project descriptions.
- **State:** Static, no interactive states.

### Section Cards (Glass)
- **Shape:** Rounded-3xl (1.5rem).
- **Background:** bg-zinc-900/40 with backdrop-blur-md.
- **Border:** 1px solid white/10.
- **Padding:** 2rem-2.5rem (p-8 md:p-10).
- **Shadow:** shadow-2xl.
- **Left accent bar:** A colored 0.5rem-wide rounded pill (blue, cyan, purple, green, yellow) as the section heading marker.

### Project Cards (Grid)
- **Shape:** Rounded-2xl (1rem).
- **Background:** bg-zinc-950/50.
- **Border:** 1px solid white/5, hover: white/20.
- **Padding:** 2rem (p-8).
- **Content:** Title, description, bullet points, tech stack chips, source code button.

### Feature Cards (Homepage)
- **Mobile App Card:** Horizontal layout (alternating left/right). iPhone frame (w-[280px] h-[600px], rounded-[3rem], zinc-900 border, ring-white/10) on one side, content on the other. Ambient blue glow behind frame.
- **Web App Card:** Centered layout. Browser window frame (rounded-2xl, zinc-900 title bar with macOS traffic lights, border-white/10). Ambient cyan glow behind. Content above frame.

### Inputs / Fields (Contact Page)
- **Style:** Rounded-lg (0.5rem), 1px solid gray-300 / dark: gray-600 border. Dark: bg-gray-700 text-white.
- **Focus:** Ring-2 ring-blue-500, border-transparent.
- **States:** Focus ring on :focus. Disabled: opacity-50.

### Navigation
- **Type:** No persistent navigation bar. Simple back-link ("← Back") on detail pages. Inline links in header contact bar on portfolio page. Footer with social icon buttons.

## 6. Do's and Don'ts

### Do:
- **Do** use the triadic accent system sparingly — one accent per section, never all three on the same surface.
- **Do** use ambient glow halos behind mockups for depth.
- **Do** use Geist across the full weight range (300-800) for hierarchy.
- **Do** use pill shapes for buttons, chips, and interactive elements.
- **Do** keep CTAs high-contrast: white background, black text.
- **Do** let motion serve understanding: hover lifts, scroll reveals, ease-out curves.

### Don't:
- **Don't** use gradient text except for the hero name treatment.
- **Don't** over-animate or add flashy effects. No bounce, no elastic, no choreographed entrance sequences.
- **Don't** use box shadows as the primary depth mechanism — ambient glow is preferred.
- **Don't** add a persistent navigation bar. The portfolio is a single scroll with section links.
- **Don't** use the accent colors as surface fills or backgrounds.
- **Don't** use decorative fonts. The Geist family is the only typeface.
- **Don't** add card grids with identical icon + heading + text layouts.
