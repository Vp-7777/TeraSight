from sqlalchemy import String, Integer, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from core.database import Base

class Mission(Base):
    __tablename__ = "missions"

    id: Mapped[str] = mapped_column(String(100), primary_key=True, index=True)
    site_id: Mapped[str] = mapped_column(String(100), ForeignKey("sites.id"), nullable=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    priority: Mapped[str] = mapped_column(String(50), default="Medium", nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Active", nullable=False)
    progress: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    waste_removed_kg: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    carbon_impact: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    team: Mapped[str] = mapped_column(String(255), nullable=False)
    due_date: Mapped[str] = mapped_column(String(100), nullable=False)

    site = relationship("Site", back_populates="missions")
