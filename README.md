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
| Canvas (full black) | `#000000` | `--canvas` |
| Card surface | `#0a0a0a` | `--surface` |
| Elevated surface | `#111111` | `--surface-elev` |
| Hairline borders | `#141414` | `--border` |
| Primary text | `#e8e8e8` | `--text` |
| Muted text | `#6b6b6b` | `--text-muted` |
| Deep green | `#004d00` | `--green-dim` |
| Bright matrix green | `#00ff41` | `--green` |
| Green hover | `#33ff66` | `--green-hover` |

## Logo

- `assets/logo.png` — MLWGS dragon logo (your attached PNG)
- `assets/logo.svg` — vector fallback

## Nav Bar (fixed — horizontal row)

- Logo on the left: green dragon icon + "MLWGS Programming Club"
- Nav links on the right in a horizontal row: Home, About Us, DragonsHack, Contact
- Active link shows a bright green underline
- Sticky header with hairline bottom border
- Mobile: hamburger menu toggles a vertical link list

## Motion

- Hero entrance animation (fade up with spring easing)
- Scroll-reveal on all cards and sections (IntersectionObserver)
- Springy hover transitions on buttons and cards
- Smooth scroll for anchor links
- Respects `prefers-reduced-motion`

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g., `mlwgs-programming-club`).
2. Push this folder's contents to the `main` branch via GitHub Desktop.
3. Go to **Settings → Pages**.
4. Set source to **Deploy from a branch** → `main` / `(root)`.
5. Your site will be live at `https://<your-username>.github.io/mlwgs-programming-club/`.

## Footer

"Made By Arnav" + link to [`github.com/TechByArnav`](https://github.com/TechByArnav) on every page.
