# TeraSight — Monorepo Structure

## Objective

TeraSight is built as a modular monorepo where frontend, backend, AI services, and shared packages coexist in a single repository while remaining logically separated.

This architecture enables:
- Independent service scaling.
- Clean separation of concerns.
- Shared type definitions.
- Simplified local development.
- Future cloud-native deployment.

---

# Root Structure

TeraSight/
│
├── apps/
│   ├── web/                # Next.js frontend
│   ├── api/                # FastAPI backend
│   └── inference/          # PrithviQ AI inference service
│
├── packages/
│   ├── shared-types/
│   ├── shared-config/
│   └── ui/
│
├── docs/
├── assets/
├── infrastructure/
│   ├── docker/
│   ├── compose/
│   └── deployment/
│
├── scripts/
│
├── .env.example
├── docker-compose.yml
├── README.md
└── LICENSE

---

# Applications

## apps/web

Technology:
- Next.js 15+
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Responsibilities:
- Authentication UI.
- Dashboard.
- Image upload.
- Report visualization.
- Site management.
- Historical analytics.

---

## apps/api

Technology:
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL

Responsibilities:
- REST API.
- User authentication.
- Organization management.
- Image upload orchestration.
- Report generation.
- Background job dispatch.

---

## apps/inference

Technology:
- Python
- YOLOv8
- PyTorch
- OpenCV

Responsibilities:
- Load PrithviQ AI.
- Execute inference.
- Return structured JSON detections.
- Model version management.

---

# Shared Packages

## shared-types
Common interfaces and schemas.

## shared-config
Environment and application configuration.

## ui
Reusable frontend components (future).

---

# Infrastructure

Contains:
- Dockerfiles.
- Docker Compose.
- Deployment manifests.
- Future Kubernetes configuration.

---

# Design Principles

- API-first architecture.
- AI service isolated from application logic.
- Multi-tenant ready.
- Cloud-native ready.
- Modular and extensible.