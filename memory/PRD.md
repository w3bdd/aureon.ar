# PRD — AUREON Architecture & Builders Website

## Original Problem Statement
Create a website (development plan) for Aureon Architecture & Builders — a
family-owned architectural & construction firm (est. 2016, founder Architect
Adrian M. Aureon, Angeles City, Pampanga) — ready for deployment on a virtual
private server. Content from the supplied company profile: tagline "Design.
Build. Endure.", 5 services, 4 sectors, 6-step approach, 7 core values, founder
bio, full corporate contact details. Design directive: Awwwards SOTD-level,
dark premium art direction, kinetic masked-line hero, editorial marquee,
numbered manifesto, framer-motion scroll reveals, lenis smooth scrolling,
parallax hero moment.

## User Personas
- Homeowners / property owners seeking design-and-build or renovation
- Entrepreneurs and developers evaluating the firm's commercial capability
- Institutions researching credentials, process, and trustworthiness
- Prospective clients submitting project consultation enquiries

## Architecture
- Frontend: React 19 (CRA/craco), Tailwind CSS, framer-motion 11, lenis 1.3,
  sonner toasts, lucide icons. Single-page editorial experience, 10 sections.
- Backend: FastAPI + Motor (async MongoDB), Pydantic v2 models with
  PyObjectId/BaseDocument helpers. Endpoints: GET /api/health,
  POST /api/enquiries (validated, returns AUR-YYYY-NNNN reference ID).
- Database: MongoDB via MONGO_URL/DB_NAME env vars; `enquiries` collection.
- VPS deployment kit: backend/Dockerfile, frontend/Dockerfile (nginx),
  frontend/nginx.conf (SPA fallback + /api proxy + static caching),
  docker-compose.yml (mongo + backend + frontend), DEPLOYMENT.md guide.

## Implemented (2026-09-21)
- Signature on-load intro overlay + masked line-by-line hero reveal
  ("Design. Build. Endure.") with mouse parallax and scroll parallax
- Editorial marquee ribbon (services / EST. 2016 / family legacy)
- Numbered manifesto chapters (philosophy), interactive services index
  (5 disciplines with expandable scope chips)
- Portfolio: 8 projects, sector filters with layout animations, crosshair
  spotlight cursor, clipped-corner frames, project detail modal
- 6-step blueprint process grid, core-values grid, founder spotlight
- Consultation enquiry form (sector, services, budget, timeline, location,
  message) posting to MongoDB with sonner toast + reference ID
- Monolithic footer with full corporate contact block
- VPS deployment files + step-by-step DEPLOYMENT.md (Docker, DNS, SSL/Caddy,
  backups, ops commands)

## Verified
- GET /api/health -> ok; POST /api/enquiries -> 201 + reference ID;
  invalid payload -> 422
- E2E: page load, section scroll (lenis), filter click, modal open/close,
  full form submission with confirmation toast (ref AUR-2026-3729)

## Changelog
- 2026-09-21 (later): Fixed navbar bug — framer-motion `animate y` was
  overriding Tailwind `-translate-x-1/2`, pushing the header pill off-screen
  right; restructured with a centering wrapper. Verified in-frame and centered
  at 1920px via browser assertions + screenshots.
- 2026-09-21 (later): Restyled to Tropical Contemporary / Filipino Modern —
  warm charcoal/sand/terracotta/deep-green palette, Fraunces serif replaces
  Cormorant, rounded pills/chips/inputs mixed with clipped architectural
  frames, deep-green marquee band, warmer portfolio photography
  (timber/concrete/glass, tropical landscaping).

## Backlog
- P0: Replace fictional placeholder contact details/CEO info with real data
- P1: Email notifications on new enquiry (Resend-managed integration)
- P1: Admin/inbox view for enquiries (requires auth — JWT or Google Auth)
- P2: Real project photography replacing curated stock images
- P2: CMS-editable portfolio/content
- P2: OG/social meta images + favicon branding

## Next Tasks
1. Confirm real company contact details and swap placeholders
2. Turn on enquiry email notifications via Resend
3. Deploy to VPS following DEPLOYMENT.md
