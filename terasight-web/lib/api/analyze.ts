import type { AnalysisResult } from "@/lib/types/analysis";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

export class AnalyzeApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "AnalyzeApiError";
  }
}

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new AnalyzeApiError(
      "Unable to reach the TeraSight API. Check that the backend is running.",
    );
  }

  if (!response.ok) {
    let message = "Analysis failed. Please try again.";

    try {
      const payload = (await response.json()) as { detail?: string | { msg: string }[] };
      if (typeof payload.detail === "string") {
        message = payload.detail;
      } else if (Array.isArray(payload.detail) && payload.detail[0]?.msg) {
        message = payload.detail[0].msg;
      }
    } catch {
      // Keep default message when error body is not JSON.
    }

    throw new AnalyzeApiError(message, response.status);
  }

  return response.json() as Promise<AnalysisResult>;
}
