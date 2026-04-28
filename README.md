# Altitude UK — Drone Operations Platform

A premium, AI-powered nationwide drone pilot network and operations management platform.

## Architecture Overview

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js with Role-Based Access Control (RBAC)
- **Database**: Prisma ORM (ready for Supabase/PostgreSQL)
- **Maps**: Mapbox GL JS
- **AI**: Integrated Claude API for mission briefing and dispatch (Server-side)

## Project Structure

- `app/`
    - `(marketing)/`: Public-facing website (altitude-hire.com)
    - `(dashboard)/`: Internal authenticated platform for Clients, Pilots, and Admins
    - `api/`: Backend authentication and registration routes
- `components/`
    - `marketing/`: Premium UI sections for the landing page
    - `dashboard/`: Mission builder, feed, and job sheet components
    - `admin/`: Operational command centre tools
- `prisma/`: Database schema and migration tracking

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file with the following:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_MAPBOX_TOKEN="pk.eyJ1Ijo..."
   CLAUDE_API_KEY="sk-ant-..."
   ```

3. **Database Setup**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Locally**:
   ```bash
   npm run dev
   ```

## Roles & Permissions

- **CLIENT**: Create mission briefs, view deliverables, manage projects.
- **PILOT**: Apply to join network, view local missions, submit flight logs/media.
- **ADMIN**: Vet pilots, dispatch missions, global network oversight.

---
© 2026 Altitude UK Operations Ltd.
