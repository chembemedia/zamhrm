# ZamConnect People

Human Capital Intelligence Platform for Zambian Organisations.

This repository contains the first MVP foundation for ZamConnect People: a Next.js web dashboard, FastAPI API, and PostgreSQL data layer.

## MVP foundation

- Multi-tenant company, branch, department, and team structure
- Role-aware application shell for Super Admin, Company Admin, HR Practitioner, Manager, and Employee
- Employee digital profiles
- Skill DNA and workforce intelligence summary
- FastAPI health and dashboard endpoints
- PostgreSQL schema with audit log foundation
- Docker Compose development environment

## Run locally

```bash
docker compose up --build
```

- Web: http://localhost:3000
- API: http://localhost:8000/docs
- API health: http://localhost:8000/health

To run without Docker, start PostgreSQL and set `DATABASE_URL`, then run the API from `apps/api` and the web app from `apps/web`.

## Environment

Copy `.env.example` to `.env`. The example values are for local development only. Do not commit credentials.

## Project structure

```text
apps/web        Next.js dashboard
apps/api        FastAPI service
infra           PostgreSQL initialization
```

The API currently uses SQLAlchemy's `create_all` for the initial MVP foundation. Add Alembic migrations before production deployment.
