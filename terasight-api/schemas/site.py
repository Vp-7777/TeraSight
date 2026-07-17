from pydantic import BaseModel
from typing import Optional

class SiteSchema(BaseModel):
    id: str
    label: str
    city: str
    region: str
    organization: str
    risk: int
    waste_kg: float
    plastic_kg: float
    carbon_recovery_pct: int
    cleanup_cost_inr: float
    last_scan_at: str
    status: str
    lat: float
    lng: float
    description: Optional[str] = None

    class Config:
        from_attributes = True
