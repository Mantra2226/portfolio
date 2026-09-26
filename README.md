# John Kamau — Minimalist Developer Portfolio

A high-performance personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS, featuring dark mode support, live GitHub integration, and responsive system design showcases.

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with class-based dark mode
- **Themes:** `next-themes` (light / dark / system)
- **Icons:** `lucide-react` and custom SVG primitives
- **Animations:** `framer-motion`
- **Typography:** Geist Sans & Geist Mono (`next/font/google`)

## Architecture & Project Structure
```
├── app/
│   ├── layout.tsx         # Global layout with font providers, theme provider, metadata
│   ├── page.tsx           # Assembled single-page layout
│   └── globals.css        # Tailwind directives, theme variables, and custom scrollbar
├── components/
│   ├── ThemeProvider.tsx  # next-themes client provider wrapper
│   ├── ThemeToggle.tsx    # Layout-shift-free dark/light mode toggle button
│   ├── Hero.tsx           # Name, live status indicator, 2-sentence bio, quick CTA links
│   ├── FeaturedWork.tsx   # Curated flagship projects with problem/architecture highlights
│   ├── GitHubRepos.tsx    # Live GitHub GraphQL / REST pinned & active repositories
│   ├── TechStack.tsx      # Categorized pills (Languages, Frameworks, Cloud/Databases)
│   ├── Footer.tsx         # Signoff, live Nairobi time zone clock (UTC+3), socials
│   └── icons.tsx          # Scalable vector brand icons (GitHub, LinkedIn)
├── lib/
│   ├── github.ts          # Server-side GitHub API fetcher with revalidation cache
│   └── projects-data.ts   # Static metadata for flagship featured projects
├── public/
│   └── resume.pdf         # Resume document
├── .github/
│   └── workflows/ci.yml   # CI pipeline (Lint, Typecheck, Build)
└── .env.example           # Environment variable template
```

## Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Mantra2226/portofolio.git
cd portofolio
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure:
- `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username (default: `Mantra2226`)
- `GITHUB_TOKEN`: (Optional) GitHub Personal Access Token to query pinned repositories via GraphQL and increase rate limits.

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 4. Build & Validate
```bash
npm run lint         # Run ESLint validation
npx tsc --noEmit     # Run TypeScript type checking
npm run build        # Build production bundle with static page generation
```
