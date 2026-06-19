from fastapi import FastAPI

from app.routers import analyze, health

app = FastAPI(
    title="PrithviQ Inference",
    description="Independent inference service for the PrithviQ AI environmental vision engine.",
    version="0.2.0",
)

app.include_router(health.router)
app.include_router(analyze.router)


@app.get("/")
async def root() -> dict[str, str]:
    return {"service": "prithviq-inference", "docs": "/docs"}
