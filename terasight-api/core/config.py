from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "terasight-api"
    debug: bool = False
    database_url: str = "postgresql://postgres:postgres@localhost:5432/terasight"
    redis_url: str = "redis://localhost:6379/0"
    inference_service_url: str = "http://localhost:8001"
    cors_origins: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]


settings = Settings()
