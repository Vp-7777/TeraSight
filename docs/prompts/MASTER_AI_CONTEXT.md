# TeraSight — Master AI Context

## Project Identity

You are contributing to **TeraSight**, an AI-powered environmental intelligence platform.

### Official Tagline
**Turning Environmental Imagery into Actionable Intelligence.**

### Brand Motto
**See. Understand. Restore.**

### AI Engine
**Powered by PrithviQ AI**, an environmental computer vision engine responsible for waste detection and classification.

---

# Mission

TeraSight transforms environmental imagery into actionable intelligence by combining computer vision, environmental analytics, and AI-generated recommendations.

The platform is designed for NGOs, municipalities, government agencies, researchers, and environmental organizations.

---

# Product Philosophy

TeraSight is NOT simply an object detection application.

It is a decision-support and environmental intelligence platform.

The objective is to convert:
- Images → Detections
- Detections → Insights
- Insights → Decisions
- Decisions → Environmental Action

Every feature should reinforce this workflow.

---

# Technology Stack

## Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Alembic

## AI Layer
- PrithviQ AI
- YOLOv8
- PyTorch
- OpenCV

## Database
- PostgreSQL

## Background Jobs
- Redis
- Celery

## Storage
- S3-compatible object storage (MinIO or AWS S3)

---

# Architecture Principles

1. Keep the AI inference service independent from the backend API.
2. Never tightly couple frontend components with ML internals.
3. Design APIs first.
4. Build modular services that can scale independently.
5. Future features (drone support, GIS, mobile apps) should integrate without architectural redesign.

---

# Current Project Status

## Completed
- Branding finalized.
- Project vision defined.
- Product specification completed.
- System architecture documented.
- Development roadmap documented.

## Current Development Stage
**Phase 1: Monorepo & Workspace Bootstrap**

The current goal is to generate clean production-grade scaffolding before implementing business logic.

---

# AI Coding Instructions

Before generating code:
1. Read PROJECT_VISION.md.
2. Read PRODUCT_SPEC.md.
3. Read SYSTEM_ARCHITECTURE.md.
4. Read ROADMAP.md.
5. Follow this MASTER_AI_CONTEXT.md.

---

# Rules

## Always
- Generate production-quality code.
- Preserve existing architecture.
- Keep code modular and well documented.
- Add clear comments only where necessary.
- Follow clean folder structures.
- Use TypeScript for frontend code.
- Use Python type hints in backend code.

## Never
- Rewrite unrelated files.
- Change architecture without explicit instruction.
- Generate placeholder or fake business logic if real implementation is possible.
- Replace existing working code unnecessarily.
- Introduce breaking changes without explanation.

---

# Long-Term Goal

Build a world-class AI-native environmental intelligence platform where the underlying PrithviQ AI engine can continuously evolve while the TeraSight application remains stable, scalable, and enterprise-ready.

Every code contribution should move the project toward that vision.