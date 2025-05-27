from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str = "sk-"
    environment: str = "development"
    debug: bool = False

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Instantiate settings for import elsewhere
settings = Settings()