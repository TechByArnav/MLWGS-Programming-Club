# MLWGS Programming Club

Official website for the Maggie L. Walker Governor's School Programming Club.

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Landing — mission, workshops, DragonsHack preview |
| About Us | `about.html` | Club mission, Walker Way pillars, leadership |
| DragonsHack | `dragonshack.html` | Annual hackathon — coming soon: late Jan – early Feb |
| Contact | `contact.html` | Contact form + club info |

## Brand Palette (Black + Deep Green, NO yellow)

| Role | Value | Token |
|------|-------|-------|
| Canvas (full black) | `#000000` | `--color-canvas` |
| Card surface | `#0a0a0a` | `--color-surface` |
| Elevated surface | `#111111` | `--color-surface-elevated` |
| Hairline borders | `#1a1a1a` | `--color-border` |
| Primary text | `#e8e8e8` | `--color-text` |
| Muted text | `#8a8a8a` | `--color-text-muted` |
| Deep forest green | `#004d00` | `--color-green` |
| Green hover | `#006600` | `--color-green-hover` |
| Green text on black | `#00ff00` | `--color-green-text` |

## Logo

- `assets/logo.png` — MLWGS dragon logo (your attached PNG)
- `assets/logo.svg` — vector fallback

## Nav Bar (fixed)

- Logo on the left: green dragon icon + "MLWGS Programming Club" ("Programming" in bright green)
- Nav links on the right in a horizontal row: Home, About Us, DragonsHack, Contact
- Active link shows a bright green underline
- Sticky header with hairline bottom border
- Mobile: hamburger menu toggles a vertical link list

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g., `mlwgs-programming-club`).
2. Push this folder's contents to the `main` branch.
3. Go to **Settings → Pages**.
4. Set source to **Deploy from a branch** → `main` / `(root)`.
5. Your site will be live at `https://<your-username>.github.io/mlwgs-programming-club/`.

## Skills Used

1. **brand-identity** — MLWGS color tokens, typography, logo clear-space, voice/tone
2. **accent-color-hierarchy** — Black canvas 60%, deep green 30%, bright green 10% (replaces yellow)
3. **typography-curation** — Switzer/TWK Lausanne + Commit Mono (no AI cliché fonts)
4. **landing-page-design** — Page structure, conversion copy, SEO/AEO meta
5. **impeccable** — Design-direction layer: init → shape → new-work → polish → audit
6. **niche-design-hacks** — Nested radii, alpha borders, dark-mode elevation, `100dvh`
7. **bencho-micro-interactions** — Spring-timed hover/focus/entry motion, weighted deceleration
8. **unslop** — Final audit pass: no glows, gradient text, emoji labels, or uneven spacing
9. **superpowers-workflow** — RED-GREEN-REFACTOR planning, test-driven verification

*Skipped: `remotion-bootstrap` (no video required).*

## Footer

"Made By Arnav" + link to [`github.com/TechByArnav`](https://github.com/TechByArnav) on every page.
