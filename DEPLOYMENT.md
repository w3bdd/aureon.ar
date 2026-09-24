# AUREON Architecture & Builders — Deployment Guide

Two supported targets:

- **A. Virtual Private Server** — full stack (site + enquiry API + database) via Docker Compose.
- **B. GitHub Pages** — static site only; the consultation form automatically
  switches to Web3Forms (email delivery) or a pre-filled mailto fallback.

The contact form picks its mode at build time:

| Build environment | Form behaviour |
| --- | --- |
| `REACT_APP_BACKEND_URL` set | POST to FastAPI `/api/enquiries` (MongoDB + reference ID) |
| No backend URL, `REACT_APP_WEB3FORMS_KEY` set | Sends to the company inbox via Web3Forms |
| Neither set | Opens the visitor's email app with a pre-filled message |

---

## A. VPS deployment (full stack)

### Files

```
docker-compose.yml          mongo + backend + frontend
backend/Dockerfile          FastAPI + uvicorn on :8001 (slim requirements-prod.txt)
frontend/Dockerfile         React build served by nginx on :80
frontend/nginx.conf         SPA routing + /api reverse proxy + static caching
```

### 1. Provision the server

- Ubuntu 24.04 LTS (or 22.04), 1 vCPU / 2 GB RAM minimum, 25 GB disk.
- A domain with an **A record** pointing at the server's public IP.

### 2. Install Docker

```bash
ssh ubuntu@YOUR_SERVER_IP
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER && newgrp docker
docker compose version
```

### 3. Firewall

```bash
sudo ufw allow OpenSSH && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp
sudo ufw enable
```

### 4. Upload the code

```bash
git clone <your-repo-url> aureon && cd aureon
# or: rsync -avz --exclude node_modules --exclude build ./ ubuntu@YOUR_SERVER_IP:~/aureon
```

### 5. Configure environment

**backend/.env**:

```
MONGO_URL="mongodb://mongo:27017"
DB_NAME="aureon"
CORS_ORIGINS="https://yourdomain.com"
```

**Frontend**: nothing to set. `frontend/.env` is excluded from the Docker image
(`.dockerignore`), and the Dockerfile builds with `REACT_APP_BACKEND_URL=""`
so the site calls the API same-origin; nginx proxies `/api/*` to the backend.

### 6. Build and launch

```bash
docker compose up -d --build
docker compose ps
curl http://localhost/api/health   # -> {"status":"ok","service":"aureon-api"}
```

### 7. HTTPS (recommended: Caddy in front)

```bash
sudo apt install -y caddy
```

`/etc/caddy/Caddyfile`:

```
yourdomain.com {
    reverse_proxy localhost:80
}
```

```bash
sudo systemctl reload caddy
```

Caddy provisions and renews Let's Encrypt certificates automatically.

### 8. Operations

```bash
git pull && docker compose up -d --build          # update
docker compose logs -f backend                    # logs
docker exec aureon-mongo mongodump --db aureon --archive > backup-$(date +%F).archive   # backup
docker exec -i aureon-mongo mongorestore --db aureon --archive < backup-YYYY-MM-DD.archive  # restore
```

Enquiry submissions live in the `enquiries` collection (`DB_NAME`); each gets a
reference ID in the format `AUR-YYYY-NNNN`.

---

## B. GitHub Pages (static site)

The repo ships with `.github/workflows/deploy-pages.yml` — every push to
`main` that touches `frontend/**` builds and publishes the site.

### 1. Enable Pages

Repo **Settings → Pages → Source: GitHub Actions**.

### 2. (Recommended) Email delivery for the form

1. Create a free access key at https://web3forms.com (verify the destination
   email, e.g. `projects@aureonbuilders.example`).
2. Repo **Settings → Secrets and variables → Actions → Variables → New
   repository variable**: name `WEB3FORMS_KEY`, value = the access key.
   (The key is a public client-side alias, safe to embed in a static bundle.)

Without this variable the form still works: it opens the visitor's email app
with a fully pre-filled enquiry addressed to the company.

### 3. Push to main

```bash
git push origin main
```

The workflow builds `frontend/` with an empty `REACT_APP_BACKEND_URL` (static
mode) and publishes to `https://<user>.github.io/<repo>/` — asset paths are
relative (`"homepage": "."` in `frontend/package.json`), so project sites,
user/organization sites, and custom domains all work.

### 4. (Optional) Custom domain

Add a `frontend/public/CNAME` file containing your domain, point its DNS at
GitHub Pages, and enforce HTTPS in repo settings.

---

## Troubleshooting

- **Form fails on VPS** — `docker compose logs backend`; ensure
  `MONGO_URL=mongodb://mongo:27017` (compose service name).
- **Form fails on Pages** — check the `WEB3FORMS_KEY` variable and that the
  Web3Forms key's email is verified; test from the real Pages URL.
- **Blank page on refresh of a deep link (VPS)** — nginx `try_files` fallback
  handles this; confirm the site is served with the provided `nginx.conf`.
- **Assets 404 on Pages** — ensure the deployed build came from the workflow
  (it builds with relative paths via `"homepage": "."`).
- **Rebuild not taking effect (VPS)** — always pass `--build` to
  `docker compose up -d`.
