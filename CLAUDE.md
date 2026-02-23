# Longevity Rooms Frankfurt — MIS Portal

## Project Overview
Management Information System (MIS) for Longevity Rooms Frankfurt, a wellness/longevity facility at Schiller Str. 31, 60313 Frankfurt am Main.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS 3 with Apple Liquid Glass aesthetic
- **Language**: TypeScript
- **AI Chat**: Anthropic Claude API (`/api/chat`)

## Design System
- **Colors**: Forest Green `#2F4F4F`, Bronze `#B87333`, Cream `#F5E6D3`
- **Fonts**: Cormorant Garamond (headings), Lato (body)
- **Glass Morphism**: `backdrop-filter: blur()` on all cards/panels
- **Mobile**: Bottom navigation bar on viewports < 768px

## User Roles
1. **PM** — Project Manager (full access)
2. **Investor** — Financial dashboards + announcements
3. **MD** — Managing Director (full access)
4. **Contractor** — Tasks + documents
5. **Marketing** — Announcements + documents

## Database Tables
- `profiles` — user identity and role
- `tasks` — project tasks with phase/priority/status
- `risks` — risk register with impact/probability
- `budget_categories` — budget vs actual spend
- `announcements` — role-targeted announcements
- `documents` — document metadata with role-based access

## Key Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # Lint check
```

## Environment Variables (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
```

## Language
All UI text is in **German**. AI chat system prompts are role-specific and in German.

## Branding
- Footer: "Powered by DRIPFY.APP" on every page
