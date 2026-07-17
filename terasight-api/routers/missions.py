from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from models.mission import Mission
from schemas.mission import MissionSchema

router = APIRouter(prefix="/api/missions", tags=["missions"])

@router.get("", response_model=list[MissionSchema])
def get_all_missions(db: Session = Depends(get_db)):
    missions = db.query(Mission).all()
    return missions

@router.get("/{mission_id}", response_model=MissionSchema)
def get_mission_by_id(mission_id: str, db: Session = Depends(get_db)):
    mission = db.query(Mission).filter(Mission.id == mission_id).first()
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    return mission
