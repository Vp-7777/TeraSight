from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from core.database import SessionLocal
from models.site import Site
from models.mission import Mission
from routers import analyze, health


@asynccontextmanager
async def lifespan(app: FastAPI):
    # [Vishal] Seed default telemetry sites & active missions if tables are empty
    db = SessionLocal()
    try:
        if db.query(Site).count() == 0:
            default_sites = [
                Site(
                    id="surat-tapi",
                    label="Surat Tapi River Corridor",
                    city="Surat",
                    region="Gujarat",
                    organization="Surat Municipal Corporation",
                    risk=76,
                    waste_kg=24800.0,
                    plastic_kg=14200.0,
                    carbon_recovery_pct=31,
                    cleanup_cost_inr=2850000.0,
                    last_scan_at="20 Jun 2026, 09:14 IST",
                    status="High",
                    lat=21.1702,
                    lng=72.8311,
                    description="Industrial effluent and plastic accumulation along Tapi River near GIDC corridors."
                ),
                Site(
                    id="ahmedabad-urban",
                    label="Ahmedabad Urban Waste Grid",
                    city="Ahmedabad",
                    region="Gujarat",
                    organization="Ahmedabad Municipal Corporation",
                    risk=65,
                    waste_kg=18500.0,
                    plastic_kg=9200.0,
                    carbon_recovery_pct=25,
                    cleanup_cost_inr=1500000.0,
                    last_scan_at="21 Jun 2026, 11:30 IST",
                    status="Medium",
                    lat=23.0225,
                    lng=72.5714,
                    description="Municipal canal overflow corridors and landfill monitoring hotspots."
                )
            ]
            db.add_all(default_sites)
            db.commit()

            if db.query(Mission).count() == 0:
                default_missions = [
                    Mission(
                        id="m-1",
                        site_id="surat-tapi",
                        name="Tapi River Emergency Response",
                        priority="High",
                        status="Active",
                        progress=72,
                        waste_removed_kg=1840.0,
                        carbon_impact=31,
                        team="SMC Field Unit Alpha",
                        due_date="28 Jun 2026"
                    )
                ]
                db.add_all(default_missions)
                db.commit()
    except Exception as exc:
        print(f"Error seeding initial database values: {exc}")
    finally:
        db.close()
    yield


app = FastAPI(
    title="TeraSight API",
    description="Application backend for the TeraSight environmental intelligence platform.",
    version="0.2.0",
    lifespan=lifespan,
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
