from fastapi import APIRouter, File, HTTPException, UploadFile, Depends
from sqlalchemy.orm import Session

from core.database import get_db
from models.analysis import Analysis
from models.site import Site
from schemas.analysis import AnalysisResponse
from services.inference_client import InferenceServiceError, inference_client

router = APIRouter(prefix="/api", tags=["analysis"])

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_image(
    file: UploadFile = File(...),
    site_id: str | None = None,
    db: Session = Depends(get_db)
) -> AnalysisResponse:
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=415,
            detail="Unsupported image type. Upload a JPEG, PNG, or WebP file.",
        )

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    if len(image_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=413,
            detail="Image exceeds the 10 MB upload limit.",
        )

    try:
        result = await inference_client.analyze_image(
            image_bytes=image_bytes,
            filename=file.filename or "upload.jpg",
            content_type=file.content_type,
        )
    except InferenceServiceError as exc:
        status_code = exc.status_code or 502
        if status_code == 502:
            raise HTTPException(
                status_code=502,
                detail="PrithviQ inference service is unavailable.",
            ) from exc
        raise HTTPException(status_code=status_code, detail=str(exc)) from exc

    # [Vishal] Check if site exists to avoid Foreign Key integrity violations
    valid_site_id = None
    if site_id:
        site_record = db.query(Site).filter(Site.id == site_id).first()
        if site_record:
            valid_site_id = site_id

    # [Vishal] Store evaluation results in PostgreSQL
    db_analysis = Analysis(
        id=result["analysis_id"],
        site_id=valid_site_id,
        title=f"Analysis of {file.filename or 'upload.jpg'}",
        original_image_path=f"uploads/{file.filename or 'upload.jpg'}",
        annotated_image_path=f"annotated/{file.filename or 'upload.jpg'}",
        eri_score=result["summary"]["environmental_risk_index"],
        detections_payload={
            "summary": result["summary"],
            "detections": result["detections"],
            "recommendation": result["recommendation"],
        }
    )
    
    try:
        db.add(db_analysis)
        db.commit()
        db.refresh(db_analysis)
    except Exception as db_exc:
        # Log error but do not fail response to client
        print(f"Failed to persist analysis in database: {db_exc}")

    return AnalysisResponse.model_validate(result)
