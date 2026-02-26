# Site generation prompt for design-capable AI

Hand this document (or the "Prompt" section below) to a design-capable AI or human designer to generate the actual site design and content for devcntr.app.

---

## Context

- **Domain:** devcntr.app
- **Repo:** https://github.com/devcntr-app/devcntr.app-site
- **Stack:** SolidStart (Solid.js full-stack), TypeScript. The app is already scaffolded; routes live in `src/routes/`, root layout in `src/app.tsx`, styles in `src/app.css` (or add a design system later).
- **Related:** Dev Center is a developer tooling application (see https://github.com/devcntr-app/devcntr). The devcntr.app site is the project’s public-facing website.

---

## Goals

- The site may start out **static** (landing + a few pages) but should be structured so we can add **dynamic or interactive features later** (e.g. docs, blog, auth, API-driven content) without a full redesign.
- **Design:** Create a clear, professional, on-brand design. Avoid generic “AI slop” aesthetics. Consider typography, spacing, color, and a simple visual identity that fits a developer-tooling project.
- **Content:** Home page should explain what Dev Center is, who it’s for, and how to get started (download, docs, repo links). Other pages (e.g. /docs, /about) can be added as needed.
- **Accessibility and performance:** Semantic HTML, sensible heading order, focus states, and fast load. Prefer minimal JS where static content suffices.

---

## Prompt (copy-paste for design AI)

**Task:** Design and implement the public website for **Dev Center** at **devcntr.app**.

**Tech:** SolidStart (Solid.js), TypeScript. The repo is already set up with a barebones app: `src/app.tsx` (root layout), `src/routes/` (file-based routing), `src/app.css`. Add or replace with your design system (e.g. Tailwind, UnoCSS, or custom CSS). Do not change the framework.

**Requirements:**

1. **Home page:** Clear value proposition, primary actions (e.g. “Get started”, “View docs”, “GitHub”), and links to the Dev Center app repo and documentation. No placeholder “Lorem” or “Hello world” in the final design.
2. **Structure for growth:** Organize routes and components so we can add more pages later (e.g. `/docs`, `/blog`, `/about`) and, if needed, dynamic content or API routes, without redoing the whole site.
3. **Design:** Create a distinct, professional look (typography, color, layout). Avoid generic template aesthetics. It should feel appropriate for a developer-tooling project.
4. **Accessibility:** Semantic HTML, logical heading hierarchy, visible focus states, and sufficient contrast. Prefer minimal client-side JS for static content.
5. **Performance:** Keep the initial bundle and assets lean; lazy-load or code-split where it makes sense for larger features added later.

**Deliverables:** Implement the design in this repo (SolidStart). Update or add routes, components, and styles. If you use design tokens or a style guide, document them briefly (e.g. in this file or a short DESIGN.md) so future contributors can stay consistent.

---

## After design is applied

- Point the domain devcntr.app to the deployed site (e.g. Vercel, Netlify, or static export).
- Optionally add a redirect or subpath (e.g. devcntr.app/docs) for the Antora docs build from the devcntr repo, if docs are served from this app.

