from datetime import datetime
from sqlalchemy import String, Integer, ForeignKey, JSON, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from core.database import Base

class Analysis(Base):
    __tablename__ = "analyses"

    id: Mapped[str] = mapped_column(String(100), primary_key=True, index=True)
    site_id: Mapped[str] = mapped_column(String(100), ForeignKey("sites.id"), nullable=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    original_image_path: Mapped[str] = mapped_column(String(512), nullable=True)
    annotated_image_path: Mapped[str] = mapped_column(String(512), nullable=True)
    eri_score: Mapped[int] = mapped_column(Integer, nullable=False)
    detections_payload: Mapped[dict] = mapped_column(JSON, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    site = relationship("Site", back_populates="analyses")
