# Invoice SaaS MVP

A minimal, premium-styled Invoice SaaS application built with a modern tech stack.

## Tech Stack
- **Frontend**: React (Vite), TypeScript, Vanilla CSS (Premium Dark Mode)
- **Backend**: Node.js, Express, TypeScript
- **Database**: SQLite (via Prisma ORM)
- **PDF Generation**: @react-pdf/renderer
- **Authentication**: JWT + bcrypt

## Prerequisites
- Node.js (v18+)
- Docker (optional)

## Getting Started (Local Development)

1. **Install Dependencies**
   ```bash
   # Server
   cd server
   npm install
   
   # Client
   cd ../client
   npm install
   ```

2. **Setup Database**
   ```bash
   cd server
   cp .env.example .env # (Already created)
   npx prisma db push
   ```

3. **Run Application**
   Open two terminals:
   
   Terminal 1 (Server):
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 (Client):
   ```bash
   cd client
   npm run dev
   ```

4. **Access App**
   Open [http://localhost:5173](http://localhost:5173)

## Running with Docker

```bash
docker-compose up --build
```

## Features
- **User Authentication**: Register and Login securely.
- **Client Management**: Add, view, and delete clients.
- **Invoice Creation**: Create invoices with multiple line items.
- **PDF Generation**: Instantly download professional PDF invoices.
- **Dashboard**: Track payment status and invoice history.
