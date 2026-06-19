from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from routers import analyze, health

app = FastAPI(
    title="TeraSight API",
    description="Application backend for the TeraSight environmental intelligence platform.",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(analyze.router)


@app.get("/")
async def root() -> dict[str, str]:
    return {"service": "terasight-api", "docs": "/docs"}
