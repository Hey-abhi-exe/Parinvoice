# Deployment Guide

## Overview

This application consists of two parts:
1.  **Backend (Server)**: A Node.js/Express server with Prisma (SQLite for dev, can switch to Postgres for prod).
2.  **Frontend (Client)**: A React/Vite application.

---

## 🌎 Frontend Deployment (Vercel / Netlify)

1.  **Build Command**: `npm run build`
2.  **Output Directory**: `dist`
3.  **Environment Variables**:
    *   `VITE_API_URL`: The URL of your deployed backend (e.g., `https://my-api.railway.app`)

**Vercel Example:**
- Import project from Git.
- Set Root Directory to `client`.
- Add `VITE_API_URL` env var.
- Deploy!

---

## 🚀 Backend Deployment (Railway / Render / Heroku)

1.  **Database**:
    *   For production, you should use PostgreSQL.
    *   Update `server/prisma/schema.prisma` provider to `postgresql`.
    *   Update `DATABASE_URL` in `.env`.

2.  **Environment Variables**:
    *   `PORT`: `3001` (or let the host assign it).
    *   `DATABASE_URL`: Your production connection string.
    *   `JWT_SECRET`: A strong random string.
    *   `GEMINI_API_KEY`: Your Google AI Key.
    *   `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`: For email functionality.

3.  **Start Command**: `npm start` (which runs `node dist/index.js`).

- Deploy!

## ☁️ Render Deployment (Easiest)

This project includes a `render.yaml` "Blueprint" for automatic deployment.

1.  Push your code to GitHub.
2.  Go to **Render.com** -> **Blueprints**.
3.  Click **New Blueprint Instance**.
4.  Select your repository.
5.  Click **Apply**.

Render will automatically detect the Server (Docker) and Client (Static Site) and link them together.


---

## 🐳 Docker Production (Local & VPS)

You can run the full production stack locally or on a VPS (like shared digitalocean droplet) using Docker Compose.

1.  **Requirement**: Install Docker & Docker Compose.
2.  **Command**:
    ```bash
    docker-compose -f docker-compose.prod.yml up --build -d
    ```
3.  **Access**:
    - App: `http://localhost` (Port 80)
    - Server (Internal): `http://localhost:3001`
    - No need to run `npm start` manually.

This setup uses **Nginx** for the frontend and a production-optimized Node image for the server.

---

## ⚠️ Important Notes

*   **CORS**: Ensure `server/src/index.ts` allows the domain of your deployed frontend.
*   **Cron Jobs**: On serverless platforms (like Vercel functions), cron jobs might not persist. Use a platform that supports always-on servers (Railway/Render) or external cron services.
*   **Prisma**: Remember to run `npx prisma migrate deploy` in your build command or post-deploy script on the server.
