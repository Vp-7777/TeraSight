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

| Tool | Version |
| ---- | ------- |
| Node.js | 22+ |
| Python | 3.12+ |
| Docker Desktop | Latest (with Docker Compose v2) |

## Local Setup

### 1. Clone and configure environment

From the repository root:

```bash
cp .env.example .env
```

On Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

The `.env` file is optional for Docker Compose (service URLs are defined in `docker-compose.yml`). It is required when running services outside Docker.

For **local (non-Docker) development**, edit `.env` and use the commented `localhost` values for `DATABASE_URL`, `REDIS_URL`, and `INFERENCE_SERVICE_URL`.

### 2. Start the full stack with Docker Compose

Ensure Docker Desktop is running, then from the repository root:

```bash
docker compose up --build
```

To run in the background:

```bash
docker compose up --build -d
```

This starts five services:

| Service | Container | Port |
| ------- | --------- | ---- |
| Frontend | `terasight-web` | 3000 |
| Backend API | `terasight-api` | 8000 |
| Inference | `prithviq-inference` | 8001 |
| PostgreSQL | `postgres` | 5432 |
| Redis | `redis` | 6379 |

### 3. Verify services

| Check | URL / Command |
| ----- | ------------- |
| Frontend | http://localhost:3000 |
| API health | http://localhost:8000/health |
| API docs | http://localhost:8000/docs |
| Inference health | http://localhost:8001/health |
| Inference docs | http://localhost:8001/docs |

Expected health responses:

```json
{"status": "ok", "service": "terasight-api"}
{"status": "ok", "service": "prithviq-inference"}
```

Stop the stack:

```bash
docker compose down
```

## Local Development (without Docker)

Run infrastructure and application services separately. PostgreSQL and Redis must be reachable at the URLs in your `.env` (use the `localhost` variants from `.env.example`).

### Infrastructure (PostgreSQL + Redis only)

```bash
docker compose up postgres redis -d
```

### Frontend

```bash
cd terasight-web
npm install
npm run dev
```

Open http://localhost:3000

### Backend API

```bash
cd terasight-api
python -m venv .venv
```

Activate the virtual environment:

- **macOS / Linux:** `source .venv/bin/activate`
- **Windows (PowerShell):** `.venv\Scripts\Activate.ps1`

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### PrithviQ Inference

```bash
cd prithviq-inference
python -m venv .venv
```

Activate the virtual environment (same commands as above), then:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

## Database Migrations

With PostgreSQL running and `DATABASE_URL` set in `.env`:

```bash
cd terasight-api
alembic upgrade head
```

## Current Features (v0.2)

- Dockerized local platform (frontend, API, inference, PostgreSQL, Redis).
- Image upload workflow from the TeraSight web app.
- Mock AI analysis pipeline: Web → API → PrithviQ inference service.
- Independent PrithviQ inference service with a swappable mock analyzer (YOLO integration planned).
- **Core features and logic modules developed for Vishal**:
  - Proportional material density-weighted weight distribution algorithms.
  - Net financial ROI evaluations with negative hazard sycharges.
  - Carbon emissions savings offset tracking.
  - Consolidated geospatial Control Center Sidebar with tabbed analytics and layers.
  - Edge-level cookie-based session redirect middleware guards.

### Test the image analysis flow

1. Start the stack: `docker compose up --build`
2. Open http://localhost:3000
3. Upload a JPEG, PNG, or WebP image and click **Analyze Image**
4. Or call the API directly:

```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@/path/to/image.jpg"
```

## Documentation

See the [`docs/`](docs/) directory for architecture, product specifications, and development guidelines.
