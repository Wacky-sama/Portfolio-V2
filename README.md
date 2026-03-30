# Portfolio V2 

A minimalist personal portfolio website with an integrated AI chat assistant powered by Google Gemini. Built with React + TypeScript on the frontend and Deno on the backend.

Live: https://kenjibrocks.com

---

## Features

- AI Chat Assistant — Powered by Gemini 2.5 Flash; knows about my projects, skills, and background
- Minimalist Design — Clean, fast, distraction-free
- Rate Limiting — 100 requests/hour per IP to keep the API costs sane
- CORS Protection — Backend only accepts requests from https://kenjibrocks.com
- Self-Hosted — Running on my own Debian server behind Apache + Cloudflare

---

## Tech Stack

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS

### Backend

- Deno
- Google Gemini 2.5 Flash
- Apache2
- systemd

---

## Project Structure

Portfolio-V2/

- frontend/
    - src/
    - public/
    - dist/
    - .env (Supabase + your custom chat backend)
    - vite.config.ts
- backend/
    - chat.ts
    - .env (Gemini API Key and Port)

---

## Setup & Deployment

### Prerequisites

- Deno installed
- Apache2 with `mod_proxy` and `mod_rewrite` enabled
- A Google Gemini API key

**Frontend**

```bash
cd frontend
npm install
npm run build
# Output goes to frontend/dist/ — point Apache DocumentRoot here
```

**Backend**

```bash
# Create your .env file
cd backend
sudo nano .env
# Fill in GEMINI_API_KEY and PORT
```

**Frontend `.env`**

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_CHAT_API_URL=https://your-domain.com/chat
```

**Backend `.env`**

```bash
GEMINI_API_KEY=your_key_here
PORT=8080
```

**Apache Virtual Host**

```bash
<VirtualHost *:80>
    ServerName your-domain.com
    ServerAlias www.your-domain.com
    DocumentRoot /var/www/Portfolio-V2/frontend/dist

    ProxyPreserveHost On
    ProxyPass "/chat" "http://localhost:8080/chat"
    ProxyPassReverse "/chat" "http://localhost:8080/chat"

    <Directory /var/www/Portfolio-V2/frontend/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^ /index.html [L]
    </Directory>
</VirtualHost>
```

**Enable site configs and modules**

```bash
sudo a2ensite portfolio-v2.conf
sudo a2enmod rewrite proxy proxy_http
sudo systemctl reload apache2
```

**systemd Service (Deno Backend)**

Create the file: 

```bash
sudo nano /etc/systemd/system/edge-deno.service
```

Paste this and change the path `ExecStart`:
```bash
[Unit]
Description=Deno Edge Functions for Portfolio V2
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=wacky
WorkingDirectory=/var/www/Portfolio-V2/backend/
EnvironmentFile=/var/www/Portfolio-V2/backend/.env
ExecStart=/home/wacky/.deno/bin/deno run \
    --allow-net=0.0.0.0:8080,generativelanguage.googleapis.com \
    --allow-env=GEMINI_API_KEY,PORT \
    --unstable-net \
    chat.ts
Restart=always

[Install]
WantedBy=multi-user.target
```

**Reload the daemon and enable the service you just created**

```bash
sudo systemctl daemon-reload
sudo systemctl enable edge-deno
sudo systemctl start edge-deno
```

Note: With or without the `.service`, it will still work!

---

##  Security Notes

- `.env` files are set to 660 (owner + group only, no world read)
- Ownership: `www-data:www-data` with Apache serving `dist/`
- Deno runs with minimal permissions — only the net and env access it actually needs
- CORS restricted to `kenjibrocks.com` or `your-domain.com` only

---