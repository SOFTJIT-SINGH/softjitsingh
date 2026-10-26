---
name: Softjit Singh - Portfolio
description: Developer portfolio in the "Astral Observatory" system — every shipped project is a star on a chart
colors:
  night: "#0a0f1e"
  night-2: "#10172b"
  line: "#1f2a44"
  cream: "#f2ede4"
  mist: "#95a1b8"
  mint: "#7cf2c9"
  amber: "#f4b860"
  gold: "#d8b46a"
  code-bg: "#070b16"
  phone-bezel: "#0b0b0f"
  whatsapp: "#25d366"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.6rem, 7vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariantNumeric: "oldstyle-nums"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.25rem–1.875rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem / 1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.6875rem–0.75rem"
    fontWeight: 400
    textTransform: "lowercase"
rounded:
  control: "0.375rem"
  card: "0.5rem"
  frame: "0.75rem"
  phone: "15% / 6.8% (outer), 12.5% / 5.6% (screen)"
  portrait-arch: "9999px top, 0.5rem bottom"
spacing:
  gutter: "1.25rem (phone) / 2.5rem (md+)"
  container: "72rem (max-w-6xl)"
  section: "6rem–8rem vertical"
components:
  button-primary:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.night}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.25rem"
    hover: "background cream + light band sweeps across"
  button-secondary:
    backgroundColor: "transparent"
    border: "1px solid {colors.line}"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
  chip-tech:
    border: "1px solid {colors.line}"
    textColor: "{colors.mist}"
    font: "{typography.label}"
    rounded: "0.25rem"
  card:
    backgroundColor: "rgba(16,23,43,0.6)"
    border: "1px solid {colors.line}"
    rounded: "{rounded.card}"
    hover: "border mint/40 + pointer-following spotlight"
  section-label:
    text: "chart i · in your pocket"
    font: "{typography.label}"
    color: "{colors.mint} (amber for mobile, amber for business)"
---

# Design System: Softjit Singh Portfolio

## 1. Overview

**Creative North Star: "The Astral Observatory"**

Softjit is the astronomer, and the site is his chart of the sky. Every project he has shipped is a star: mint for web, amber for mobile. Lines join projects that share less-common tech. A brass astrolabe turns slowly behind the hero, and each section is a numbered chart ("chart i · in your pocket").

The magic lives in the **art and the details**, never in the words. Copy stays plain, specific and first-person, so a recruiter can scan it in seconds. The theme should feel like opening an old star atlas that turns out to be a live instrument.

**Key characteristics**
- Deep navy night canvas, cream text, three accents each with one job: mint (web), amber (mobile), gold (the astral layer).
- Fraunces serif display with old-style figures; Geist for reading; Geist Mono for labels and code.
- One signature visual: the project constellation over the astrolabe. Everything else supports it.
- Real device frames: slim near-black phone bezel for mobile, browser window for web; screenshots shown whole.
- Motion is generous but purposeful, and switches off completely under `prefers-reduced-motion`.

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `night` | `#0a0f1e` | Page canvas. `body` background. |
| `night-2` | `#10172b` | Card and panel surfaces (often at 40–60% opacity). |
| `line` | `#1f2a44` | Borders, rules, inactive dots, tracks. |
| `cream` | `#f2ede4` | Headings and primary text. |
| `mist` | `#95a1b8` | Body copy, captions, labels. |
| `mint` | `#7cf2c9` | Web projects, primary buttons, links, active states. |
| `amber` | `#f4b860` | Mobile projects, "open to work", business band label. |
| `gold` | `#d8b46a` | The astral layer only: astrolabe, chart-rule stars, constellation traces, portrait arch, cursor glow, menu. |

Rules
- **Colour encodes meaning.** Mint = web, amber = mobile everywhere (stars, labels, dots, glows). Don't swap them for decoration.
- **Gold is for ornament, not for text you must read.** Body text never sits in gold.
- Hero and business band may use one large radial gradient of deep indigo (`#16224a` / `#1a2550`) fading to `night`. No other gradient backgrounds.
- WhatsApp buttons keep WhatsApp green (`#25d366`) on /hire and /contact because local customers recognise it.

## 3. Typography

- **Display / headings:** Fraunces (variable, `opsz`), weight 400, tight tracking, `oldstyle-nums`. Italic + mint (or amber) for the one emphasised phrase in a heading ("*show up.*").
- **Body:** Geist 16–18px, line-height ~1.65, `mist` colour, max ~70ch.
- **Labels:** Geist Mono 11–12px, lowercase. Section labels: `chart {roman} · {name}`.
- **Numbers:** serif with old-style figures in prose and headings; counters and tables use `tabular-nums` (lining) so they don't jitter.
- Hero headline animates word by word on load (`.hero-word`).

## 4. Depth and light

Depth comes from light, not shadows:
1. **Glows:** soft radial glows behind devices (mint for web, amber for mobile), a breathing gold glow behind the portrait.
2. **Spotlight:** cards inside a `SpotlightGrid` get a mint light that follows the pointer.
3. **Frame shadows:** deep, soft drop shadows only on device frames and the featured pricing card.
4. **Gold rules:** sections are separated by a 1px line with a gold ✦ in the middle (`.chart-rule`).

## 5. Components

- **Navbar:** transparent over the homepage hero, sticky with blur elsewhere. Desktop links get a gold underline that draws from the centre. Phone: three-line icon that folds into ✕; panel unfolds with staggered links and ✦ markers.
- **Constellation (hero):** canvas, one star per project, featured stars larger and labelled. Hover/tap shows a gold-bordered label; hovered star's lines trace outward in gold. Occasional shooting star. Stars avoid the measured headline area.
- **Astrolabe:** SVG; fixed limb (degree ticks, Roman hours), rete turning clockwise (240s), glyph ring turning the other way (180s) naming tech families with planetary glyphs.
- **PhoneFrame:** 9:20 screen, slim `#0b0b0f` bezel, side buttons, tiny camera dot (never a notch over the app), glare sweep and zoom on hover. Wrapped in `Tilt` and `animate-float` where it's a showcase.
- **Browser frame:** title bar with three dots (light up red/amber/green on hover) and a URL pill; screenshot at natural aspect ratio, capped at ~640px tall.
- **CodeSketch:** dark code panel with file name, "simplified sketch" label, line numbers, tiny highlighter (keywords mint, strings amber, comments mist italic).
- **NumbersBoard:** four cards, count-up on view, each with a mini visual (dot grid, equalizer, before/after bar, ring).
- **Journey:** centre line drawn by scroll; items alternate left/right on md+, slide in from their side; latest item amber.
- **MagicPortrait:** photo in an arched observatory window: double gold arch, turning astrolabe behind, orbiting star, twinkles, breathing glow. Centred on small/medium screens.
- **ExploreMeter:** fixed pill, `explored n/N`; at N becomes "✓ all N explored · say hi →".
- **Buttons:** primary mint with a light sweep on hover; secondary outlined `line`; text links underlined with mint at 50%.

## 6. Motion

| Effect | Where | Reduced motion |
|---|---|---|
| Blur-materialise reveal (`[data-reveal]`) | most content | shown instantly |
| Inked heading glow (`data-reveal="title"`) | `main h2` (auto) | off |
| Written label (`data-reveal="ink"`, clip-path) | `chart …` labels (auto) | off |
| Divider: star spins in, rule draws out | `section.chart-rule` (auto) | static |
| Stagger | children of `[data-stagger]` | off |
| Hero load sequence + word-by-word headline | homepage hero | off |
| Astrolabe rotation / bloom-in | hero, portrait | off |
| Constellation drift, packets, gold trace, shooting stars | hero | static stars, instant trace |
| Tilt, float, parallax | devices | off |
| Cursor glow + stardust; tap burst | whole site | glow only |
| Page transition | `app/template.tsx` | off |
| Typewriter | hero | first line, static |

Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)` for reveals; 0.7–1s durations; stagger 70ms per item, capped at 10.

## 7. Do's and don'ts

**Do**
- Keep every claim verifiable; show a receipt under each number.
- Show screenshots whole, in the right device frame.
- Give each project a one-line, benefit-first hook.
- Test at 375px: no horizontal scroll, tap targets ≥ 44px, constellation labels on screen.

**Don't**
- Don't put the theme into the copy ("spells", "incantations") — it reads as a costume.
- Don't use gold for body text, or mint/amber against their meaning.
- Don't add glassmorphism cards, gradient text on names, or generic glow blobs.
- Don't add a fake notch over screenshots or crop them to a strip.
- Don't add motion without a reduced-motion fallback.
