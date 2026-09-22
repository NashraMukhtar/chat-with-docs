# Chat with Docs

Chat with your documents using a RAG (Retrieval-Augmented Generation) pipeline built on Next.js, Postgres with pgvector, the Vercel AI SDK, and Google Gemini.

## Features

- Document chat powered by a RAG pipeline (Gemini embeddings + pgvector search)
- Email/password authentication with session cookies (JWT via `jose`, hashed passwords via `bcryptjs`)
- PostgreSQL database with Drizzle ORM

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Vercel AI SDK](https://ai-sdk.dev) + [Google Gemini](https://ai.google.dev)
- [PostgreSQL](https://www.postgresql.org) with [pgvector](https://github.com/pgvector/pgvector) via [Supabase](https://supabase.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database with the `vector` extension enabled (Supabase supports this out of the box)
- A Gemini API key

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file from the example:

   ```bash
   cp .env.example .env
   ```

3. Fill in the values in `.env`:

   - `DATABASE_URL` — Postgres connection string
   - `SUPABASE_URL` — your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
   - `GEMINI_API_KEY` — Google Gemini API key
   - `AUTH_SECRET` — secret used to sign session JWTs
   - `DEMO_EMAIL` / `DEMO_PASSWORD` — credentials for the seeded demo user

4. Run the database migrations:

   ```bash
   npx drizzle-kit migrate
   ```

5. (Optional) Seed the demo user:

   ```bash
   npx tsx src/db/seed.ts
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run start` — start the production server
- `npm run lint` — run ESLint

## Database

Migrations live in [`drizzle/`](drizzle/) and the schema is defined in [`src/db/schema.ts`](src/db/schema.ts).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs)
- [Vercel AI SDK Documentation](https://ai-sdk.dev/docs)