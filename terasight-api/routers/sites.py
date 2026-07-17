from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from models.site import Site
from schemas.site import SiteSchema

router = APIRouter(prefix="/api/sites", tags=["sites"])

@router.get("", response_model=list[SiteSchema])
def get_all_sites(db: Session = Depends(get_db)):
    sites = db.query(Site).all()
    return sites

@router.get("/{site_id}", response_model=SiteSchema)
def get_site_by_id(site_id: str, db: Session = Depends(get_db)):
    site = db.query(Site).filter(Site.id == site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    return site
