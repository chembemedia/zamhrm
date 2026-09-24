# ZamConnect People

Human Capital Intelligence Platform for Zambian Organisations.

## Production web stack

The Vercel application lives in `apps/web` and now includes:

- Next.js App Router + TypeScript + Tailwind CSS
- Prisma PostgreSQL schema for organisations, memberships, employees, skills, training, leave, attendance, recruitment and audit logs
- Auth.js credentials authentication with database sessions
- Organisation-scoped dashboard API and middleware-protected routes
- Seed data for a local Zambia HQ workspace

## Local development

1. Start PostgreSQL with the existing Docker Compose setup or use a hosted PostgreSQL database.
2. Configure the web environment:

```bash
cd apps/web
cp .env.example .env.local
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Open `http://localhost:3000` and sign in with the values in `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`. Change the seed password before using a shared environment.

## Vercel deployment

Set the Vercel project root to `apps/web` (or configure the monorepo root directory), then add:

- `DATABASE_URL`: pooled PostgreSQL connection string for runtime traffic
- `DIRECT_URL`: direct PostgreSQL connection string for Prisma migrations
- `NEXTAUTH_SECRET`: long random production secret
- `NEXTAUTH_URL`: production deployment URL
- `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`: only for the initial controlled seed

Recommended deployment commands:

```bash
npx prisma migrate deploy
npm run build
```

For a new database, create and commit a migration locally with `npx prisma migrate dev --name init`, then use `prisma migrate deploy` in CI/Vercel. Do not run `prisma migrate dev` in a production build.

## Security notes

Every dashboard query resolves the authenticated user's active organisation before querying tenant data. Keep secrets out of `NEXT_PUBLIC_*` variables, use a pooled runtime connection, enable database backups, and review retention/access policies before production HR data is loaded.
