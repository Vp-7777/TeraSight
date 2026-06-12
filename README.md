# TeraSight

**Turning Environmental Imagery into Actionable Intelligence.**

TeraSight is an AI-powered environmental intelligence platform powered by **PrithviQ AI**. This monorepo contains the application frontend, backend API, and independent inference service.

## Repository Structure

```
TeraSight/
├── terasight-web/        # Next.js frontend
├── terasight-api/        # FastAPI application backend
├── prithviq-inference/   # PrithviQ AI inference service (isolated)
├── docs/                 # Project documentation
├── docker-compose.yml    # Local development stack
└── .env.example          # Environment template
```

## Prerequisites

- Node.js 22+
- Python 3.12+
- Docker & Docker Compose

## Quick Start

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Start the full stack with Docker Compose:

   ```bash
   docker compose up --build
   ```

3. Access services:

   | Service            | URL                          |
   | ------------------ | ---------------------------- |
   | Frontend           | http://localhost:3000        |
   | Backend API        | http://localhost:8000        |
   | API Docs           | http://localhost:8000/docs   |
   | Inference Service  | http://localhost:8001        |
   | Inference Docs     | http://localhost:8001/docs   |

## Local Development (without Docker)

### Frontend

```bash
cd terasight-web
npm install
npm run dev
```

### Backend API

```bash
cd terasight-api
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### PrithviQ Inference

```bash
cd prithviq-inference
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

## Health Checks

- `GET /health` on the backend API returns `{ "status": "ok", "service": "terasight-api" }`
- `GET /health` on the inference service returns `{ "status": "ok", "service": "prithviq-inference" }`

## Documentation

See the [`docs/`](docs/) directory for architecture, product specifications, and development guidelines.
