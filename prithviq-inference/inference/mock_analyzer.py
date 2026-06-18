"""Deterministic mock analysis — replace with YOLO inference in a future milestone."""

import hashlib
import uuid
from typing import Any

RECOMMENDATIONS = {
    "High": (
        "Immediate cleanup recommended. Plastic concentration is dominant. "
        "Consider community recycling collection and mechanical extraction."
    ),
    "Critical": (
        "Urgent intervention required. Hazardous materials detected alongside dense waste. "
        "Deploy certified cleanup crews and restrict public access until remediation."
    ),
    "Medium": (
        "Scheduled cleanup advised within the next two weeks. Mixed waste categories suggest "
        "sorting stations and targeted collection for metals and organics."
    ),
    "Low": (
        "Routine maintenance sufficient. Low-density waste detected with minimal hazardous "
        "presence. Monitor site monthly and encourage preventive community engagement."
    ),
}


def _seed_from_bytes(image_bytes: bytes) -> int:
    digest = hashlib.sha256(image_bytes).hexdigest()
    return int(digest[:12], 16)


def analyze_image(image_bytes: bytes, _filename: str | None = None) -> dict[str, Any]:
    """Return a deterministic mock analysis derived from image content."""
    if not image_bytes:
        raise ValueError("Image payload is empty")

    seed = _seed_from_bytes(image_bytes)
    analysis_id = f"demo-analysis-{uuid.uuid5(uuid.NAMESPACE_OID, hashlib.sha256(image_bytes).hexdigest()).hex[:8]}"

    plastic_count = 8 + (seed % 18)
    metal_count = 2 + ((seed >> 4) % 8)
    glass_count = 1 + ((seed >> 8) % 6)
    organic_count = 1 + ((seed >> 12) % 7)
    hazardous_count = (seed >> 16) % 4

    detections: list[dict[str, Any]] = [
        {
            "class": "Plastic",
            "count": plastic_count,
            "confidence": round(0.82 + (seed % 15) / 100, 2),
        },
        {
            "class": "Metal",
            "count": metal_count,
            "confidence": round(0.78 + ((seed >> 3) % 18) / 100, 2),
        },
        {
            "class": "Organic",
            "count": organic_count,
            "confidence": round(0.75 + ((seed >> 6) % 20) / 100, 2),
        },
    ]

    if glass_count >= 3:
        detections.append(
            {
                "class": "Glass",
                "count": glass_count,
                "confidence": round(0.74 + ((seed >> 9) % 22) / 100, 2),
            }
        )

    if hazardous_count > 0:
        detections.append(
            {
                "class": "Hazardous Waste",
                "count": hazardous_count,
                "confidence": round(0.7 + ((seed >> 11) % 25) / 100, 2),
            }
        )

    detections.sort(key=lambda item: item["count"], reverse=True)

    total_count = sum(item["count"] for item in detections)
    estimated_waste_kg = round(0.35 * total_count + (seed % 50) / 10, 1)
    environmental_risk_index = min(99, 35 + (seed % 55) + hazardous_count * 8)
    carbon_recovery_score = min(95, 18 + (seed % 40) + metal_count * 2)

    if hazardous_count >= 2 or environmental_risk_index >= 85:
        cleanup_priority = "Critical"
    elif environmental_risk_index >= 65 or plastic_count >= 18:
        cleanup_priority = "High"
    elif environmental_risk_index >= 45:
        cleanup_priority = "Medium"
    else:
        cleanup_priority = "Low"

    return {
        "success": True,
        "analysis_id": analysis_id,
        "summary": {
            "estimated_waste_kg": estimated_waste_kg,
            "environmental_risk_index": environmental_risk_index,
            "carbon_recovery_score": carbon_recovery_score,
            "cleanup_priority": cleanup_priority,
        },
        "detections": detections,
        "recommendation": RECOMMENDATIONS[cleanup_priority],
    }
