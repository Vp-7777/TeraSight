from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "terasight-api"
    debug: bool = False
    database_url: str = "postgresql://terasight:terasight@localhost:5432/terasight"
    redis_url: str = "redis://localhost:6379/0"


settings = Settings()
