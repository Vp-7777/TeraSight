from pydantic import BaseModel
from typing import Optional

class MissionSchema(BaseModel):
    id: str
    site_id: Optional[str] = None
    name: str
    priority: str
    status: str
    progress: int
    waste_removed_kg: float
    carbon_impact: int
    team: str
    due_date: str

    class Config:
        from_attributes = True
