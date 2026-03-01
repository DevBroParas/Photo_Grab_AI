# Event AI Photo App - Backend

Backend service for the Event AI Photo App, built with **Node.js + Express + TypeScript**, using **PostgreSQL (Neon)** with **Drizzle ORM** and OAuth login via **Google/GitHub**.

## What is implemented right now

- Express server with JSON + cookie parsing
- CORS configured for frontend at `http://localhost:5173`
- OAuth login with Passport:
  - Google (`passport-google-oauth20`)
  - GitHub (`passport-github2`)
- JWT auth stored in an `httpOnly` cookie (`token`)
- Protected auth endpoint to fetch current user
- Event CRUD (currently: create, list user events, get single event, delete)
- Drizzle schema for:
  - `users`
  - `events`
  - `photos`
  - `faces`
  - `face_photos`

## Tech stack

- Runtime: Node.js
- Framework: Express 5
- Language: TypeScript (ESM / NodeNext)
- Auth: Passport + OAuth + JWT
- Database: PostgreSQL (Neon)
- ORM: Drizzle ORM + Drizzle Kit

## Project structure

```txt
backend/
  src/
    auth/
      auth.controller.ts
      auth.routes.ts
      passport.ts
    controllers/
      event.controller.ts
    db/
      index.ts
      schema.ts
    middleware/
      auth.middleware.ts
    routes/
      event.routes.ts
    types/
      express.d.ts
    index.ts
  drizzle.config.ts
  tsconfig.json
  package.json
```

## Environment variables

Create a `.env` file in `backend/`:

```env
PORT=8080
DATABASE_URL=postgresql://...
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

AI_SERVICE_URL=...
```

Notes:
- `CLOUDINARY_*` and `AI_SERVICE_URL` are present in env but not yet used in the currently wired routes/controllers.
- OAuth callback URLs in code are:
  - `/api/auth/google/callback`
  - `/api/auth/github/callback`

## Install and run

```bash
cd backend
npm install
npm run dev
```

Server starts on `PORT` (defaults to `8080`).

## Build and production run

```bash
npm run build
npm start
```

## Database (Drizzle)

Push schema changes to DB:

```bash
npm run push
```

Drizzle config:
- schema: `./src/db/schema.ts`
- output: `./drizzle`
- dialect: `postgresql`

## API routes

Base URL: `http://localhost:8080`

### Health

- `GET /`
  - Response: `API is running`

### Auth routes

- `GET /api/auth/google`
  - Starts Google OAuth flow

- `GET /api/auth/google/callback`
  - Handles Google callback
  - Sets `token` cookie
  - Redirects to `http://localhost:5173/dashboard`

- `GET /api/auth/github`
  - Starts GitHub OAuth flow

- `GET /api/auth/github/callback`
  - Handles GitHub callback
  - Sets `token` cookie
  - Redirects to `http://localhost:5173/dashboard`

- `POST /api/auth/logout`
  - Clears `token` cookie

- `GET /api/auth/me` (protected)
  - Returns current logged-in user from DB

### Event routes (all protected)

- `POST /api/events`
  - Body: `{ "name": "My Event" }`
  - Creates an event for current user

- `GET /api/events`
  - Returns events owned by current user

- `GET /api/events/:id`
  - Returns one event only if owned by current user

- `DELETE /api/events/:id`
  - Deletes one event only if owned by current user

## Authentication flow (current)

1. User clicks Google/GitHub login from frontend.
2. Backend completes OAuth and finds/creates user in `users` table.
3. Backend signs JWT (`id`, `email`) with `JWT_SECRET` (7d expiry).
4. JWT is stored in cookie `token` (`httpOnly`, `sameSite=lax`, `secure=false` in current code).
5. Protected routes read `req.cookies.token`, verify JWT, fetch user, and attach `req.user`.

## Current limitations / next backend milestones

- No upload/photo/face endpoints wired yet (only schema exists)
- `secure` cookie flag is `false` (should be `true` in production HTTPS)
- CORS/frontend URL and redirect URL are hardcoded to localhost
- No migration files/seed scripts yet (currently using `drizzle-kit push`)

## Scripts

- `npm run dev` - run with `tsx --watch`
- `npm run build` - compile TypeScript to `dist/`
- `npm start` - run compiled server
- `npm run push` - push Drizzle schema to database
