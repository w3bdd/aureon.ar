# AUREON Architecture & Builders — VPS Deployment Guide

This repository ships with everything needed to deploy the full stack
(React frontend + FastAPI backend + MongoDB) on any Linux virtual private
server using Docker.

```
docker-compose.yml          Orchestrates all three services
backend/Dockerfile          FastAPI + uvicorn on port 8001
frontend/Dockerfile         React build served by nginx on port 80
frontend/nginx.conf         SPA routing + /api reverse proxy + static caching
```

---

## 1. Provision the server

- Ubuntu 24.04 LTS (or 22.04), 1 vCPU / 2 GB RAM minimum, 25 GB disk.
- A registered domain with an **A record** pointing at the server's public IP
  (e.g. `aureonbuilders.com` and `www.aureonbuilders.com`).

## 2. Install Docker

```bash
ssh ubuntu@YOUR_SERVER_IP
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER && newgrp docker
docker compose version   # verify the compose plugin
```

## 3. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 4. Upload the code

Either clone from your Git remote, or copy from your machine:

```bash
git clone <your-repo-url> aureon && cd aureon
# or, from your local machine:
# rsync -avz --exclude node_modules --exclude build ./ ubuntu@YOUR_SERVER_IP:~/aureon
```

## 5. Configure environment

**backend/.env** — point MongoDB at the compose service:

```
MONGO_URL="mongodb://mongo:27017"
DB_NAME="aureon"
CORS_ORIGINS="https://yourdomain.com"
```

**frontend/.env** — leave `REACT_APP_BACKEND_URL` empty (or unset) so the site
calls the API same-origin; nginx proxies `/api/*` to the backend container:

```
REACT_APP_BACKEND_URL=
```

## 6. Build and launch

```bash
docker compose up -d --build
docker compose ps          # all three services "Up"
curl http://localhost/api/health   # -> {"status":"ok","service":"aureon-api"}
```

The site is now live on port 80.

## 7. HTTPS (recommended: Caddy in front)

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
Alternative: `sudo apt install certbot python3-certbot-nginx` and terminate TLS
on a host-level nginx instead.

## 8. Operations

```bash
# Update after a code change
git pull && docker compose up -d --build

# Logs
docker compose logs -f backend
docker compose logs -f frontend

# Database backup (run via cron, e.g. nightly)
docker exec aureon-mongo mongodump --db aureon --archive > backup-$(date +%F).archive

# Restore
docker exec -i aureon-mongo mongorestore --db aureon --archive < backup-YYYY-MM-DD.archive
```

## 9. Enquiry data

Consultation form submissions are stored in the `enquiries` collection of the
MongoDB database (`DB_NAME`). Each submission receives a reference ID in the
format `AUR-YYYY-NNNN` shown to the client on confirmation.

## Troubleshooting

- **Site loads but form fails** — check `docker compose logs backend` and that
  `MONGO_URL` is `mongodb://mongo:27017` (the compose service name).
- **Blank page on refresh of a deep link** — the nginx `try_files ... /index.html`
  fallback handles this; confirm you are serving via the provided nginx.conf.
- **Rebuild not taking effect** — always pass `--build` to `docker compose up -d`.
