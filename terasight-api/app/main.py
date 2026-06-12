from fastapi import FastAPI

from routers import health

app = FastAPI(
    title="TeraSight API",
    description="Application backend for the TeraSight environmental intelligence platform.",
    version="0.1.0",
)

app.include_router(health.router)


@app.get("/")
async def root() -> dict[str, str]:
    return {"service": "terasight-api", "docs": "/docs"}
