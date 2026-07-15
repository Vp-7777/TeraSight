from sqlalchemy import String, Float, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from core.database import Base

class Site(Base):
    __tablename__ = "sites"

    id: Mapped[str] = mapped_column(String(100), primary_key=True, index=True)
    label: Mapped[str] = mapped_column(String(255), nullable=False)
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    region: Mapped[str] = mapped_column(String(100), nullable=False)
    organization: Mapped[str] = mapped_column(String(255), nullable=False)
    risk: Mapped[int] = mapped_column(Integer, default=50, nullable=False)
    waste_kg: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    plastic_kg: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    carbon_recovery_pct: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    cleanup_cost_inr: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    last_scan_at: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Medium", nullable=False)
    lat: Mapped[float] = mapped_column(Float, nullable=False)
    lng: Mapped[float] = mapped_column(Float, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)

    analyses = relationship("Analysis", back_populates="site", cascade="all, delete-orphan")
    missions = relationship("Mission", back_populates="site", cascade="all, delete-orphan")
