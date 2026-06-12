# TeraSight — System Architecture (v1.0)

## Overview

TeraSight follows a modular AI-first architecture where the machine learning inference engine (PrithviQ AI) is isolated from the main application backend. This allows independent scaling, deployment, and future model upgrades without affecting the user-facing platform.

---

# High-Level Architecture

User
  ↓
Next.js Frontend
  ↓
FastAPI Backend API
  ↓
──────────────────────────────────────
│              │                     │
│              │                     │
PostgreSQL   Redis Queue        Object Storage
(Database)   (Jobs/Cache)      (Images & Reports)
│              │                     │
└──────────────┼─────────────────────┘
               ↓
      PrithviQ AI Inference Service
               ↓
    Environmental Intelligence Layer
               ↓
    Reports • ERI • Analytics • AI Recommendations

---

# Core Components

## 1. Frontend (apps/web)

**Technology:**
- Next.js (App Router)
- React
- Tailwind CSS
- TypeScript

**Responsibilities:**
- Authentication.
- Dashboard UI.
- Image upload.
- Detection visualization.
- Reports and analytics.
- Historical comparison views.

---

## 2. Backend API (apps/api)

**Technology:**
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication

**Responsibilities:**
- User management.
- Organization management.
- Site management.
- Image upload handling.
- Job dispatching.
- Report generation.
- API for frontend communication.

---

## 3. PrithviQ AI Inference Service

**Technology:**
- Python
- YOLOv8
- PyTorch
- OpenCV

**Responsibilities:**
- Load trained model.
- Run inference.
- Return structured detection JSON.
- Support future model upgrades without backend changes.

---

## 4. Environmental Intelligence Layer

This layer transforms raw detections into actionable insights.

### Modules
- Environmental Risk Index (ERI).
- Cleanup Cost Estimator.
- Carbon Recovery Calculator.
- AI Recommendation Engine.
- Historical Comparison Engine.

---

## 5. Database Layer

### PostgreSQL
Stores:
- Users.
- Organizations.
- Sites.
- Uploaded images.
- Detection metadata.
- Historical snapshots.
- Reports.

### Redis
Stores:
- Background jobs.
- Queue management.
- Temporary cache.

---

## 6. Storage Layer

Object storage (AWS S3 or MinIO) stores:
- Original uploaded images.
- Annotated output images.
- Generated PDF reports.
- Drone orthomosaic files.

---

# Data Flow

1. User uploads image.
2. Backend stores image in object storage.
3. Backend creates analysis job.
4. Redis queues the job.
5. PrithviQ AI processes the image.
6. Detection results are stored in PostgreSQL.
7. Intelligence Layer computes ERI, cost, carbon, etc.
8. Report generator creates PDF.
9. Frontend displays results to the user.

---

# Monorepo Structure

```
TeraSight/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── shared-types/
│   └── shared-config/
│
├── docs/
├── assets/
├── ml/
│   ├── inference/
│   ├── training/
│   └── registry/
│
└── infrastructure/
    ├── docker/
    ├── compose/
    └── deployment/
```

---

# Design Principles

## Separation of Concerns
The AI engine must remain independent from the application backend.

## AI-First Design
Every workflow is built around AI-generated environmental intelligence.

## Modular Growth
Future modules (drone support, satellite imagery, IoT sensors) should plug into the architecture without major redesign.

## Multi-Tenant Ready
The platform should support multiple organizations with isolated datasets.

## API-Driven
Every feature should be accessible through documented APIs for future mobile apps and third-party integrations.

---

# Future Extensions

- Drone mission management.
- Satellite imagery analysis.
- GIS integration.
- Mobile application.
- Public environmental dashboards.
- Real-time IoT sensor integration.
- Research API & SDK.

---

# Architecture Goal

Build a scalable, AI-native environmental intelligence platform where the machine learning engine can continuously improve while the application layer remains stable, extensible, and enterprise-ready.