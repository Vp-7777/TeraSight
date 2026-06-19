from pydantic import BaseModel, Field


class Detection(BaseModel):
    class_name: str = Field(alias="class")
    count: int
    confidence: float

    model_config = {"populate_by_name": True}


class AnalysisSummary(BaseModel):
    estimated_waste_kg: float
    environmental_risk_index: int
    carbon_recovery_score: int
    cleanup_priority: str


class AnalysisResponse(BaseModel):
    success: bool
    analysis_id: str
    summary: AnalysisSummary
    detections: list[Detection]
    recommendation: str
