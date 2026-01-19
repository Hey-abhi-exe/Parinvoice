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

**Railway Example:**
- Import project.
- Set Root Directory to `server`.
- Add variables.
- Add a PostgreSQL plugin and link it as `DATABASE_URL`.
- Deploy!

---

## ⚠️ Important Notes

*   **CORS**: Ensure `server/src/index.ts` allows the domain of your deployed frontend.
*   **Cron Jobs**: On serverless platforms (like Vercel functions), cron jobs might not persist. Use a platform that supports always-on servers (Railway/Render) or external cron services.
*   **Prisma**: Remember to run `npx prisma migrate deploy` in your build command or post-deploy script on the server.
