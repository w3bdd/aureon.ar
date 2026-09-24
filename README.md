# AUREON Architecture & Builders

Company website — React (CRA/craco + Tailwind + framer-motion + lenis) frontend,
FastAPI + MongoDB backend, deployable to a VPS (full stack) or GitHub Pages
(static frontend).

## Repository layout

```
frontend/                 React app (the whole site experience)
backend/                  FastAPI API: POST /api/enquiries, GET /api/health
backend/Dockerfile        Production image (uses requirements-prod.txt)
frontend/Dockerfile       Build + nginx static serving with /api proxy
frontend/nginx.conf       SPA fallback, /api reverse proxy, asset caching
docker-compose.yml        mongo + backend + frontend (VPS deployment)
.github/workflows/        GitHub Pages deployment pipeline
DEPLOYMENT.md             Step-by-step VPS + GitHub Pages guide
```

## Local development

```bash
cd backend  && pip install -r requirements.txt   # serves on :8001
cd frontend && yarn install && yarn start        # serves on :3000
```

## Contact form modes (selected automatically at build time)

| Environment | Behaviour |
| --- | --- |
| `REACT_APP_BACKEND_URL` set (preview / VPS) | POSTs to the FastAPI backend, stores in MongoDB, returns a reference ID |
| Static host + `REACT_APP_WEB3FORMS_KEY` set | Sends via Web3Forms straight to the company inbox |
| Static host, no key | Opens the visitor's email app with a pre-filled enquiry (mailto fallback) |

## Deployment

See **DEPLOYMENT.md** — VPS (Docker Compose, free HTTPS via Caddy, backups)
and GitHub Pages (automated workflow on every push to `main`).
