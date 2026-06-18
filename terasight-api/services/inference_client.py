import httpx

from core.config import settings

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
INFERENCE_TIMEOUT_SECONDS = 60.0


class InferenceServiceError(Exception):
    """Raised when the PrithviQ inference service returns an error."""

    def __init__(self, message: str, status_code: int | None = None) -> None:
        super().__init__(message)
        self.status_code = status_code


class InferenceClient:
    def __init__(self, base_url: str | None = None) -> None:
        self.base_url = (base_url or settings.inference_service_url).rstrip("/")

    async def analyze_image(
        self,
        image_bytes: bytes,
        filename: str,
        content_type: str | None,
    ) -> dict:
        files = {
            "file": (
                filename,
                image_bytes,
                content_type or "application/octet-stream",
            )
        }

        try:
            async with httpx.AsyncClient(timeout=INFERENCE_TIMEOUT_SECONDS) as client:
                response = await client.post(
                    f"{self.base_url}/analyze",
                    files=files,
                )
        except httpx.RequestError as exc:
            raise InferenceServiceError(
                "Unable to reach the PrithviQ inference service."
            ) from exc

        if response.status_code >= 400:
            detail = "Inference service request failed."
            try:
                payload = response.json()
                if isinstance(payload, dict) and payload.get("detail"):
                    detail = str(payload["detail"])
            except ValueError:
                if response.text.strip():
                    detail = response.text.strip()
            raise InferenceServiceError(detail, status_code=response.status_code)

        return response.json()


inference_client = InferenceClient()
