from fastapi import FastAPI

from app.routers import health

app = FastAPI(
    title="PrithviQ Inference",
    description="Independent inference service for the PrithviQ AI environmental vision engine.",
    version="0.1.0",
)

app.include_router(health.router)


@app.get("/")
async def root() -> dict[str, str]:
    return {"service": "prithviq-inference", "docs": "/docs"}
