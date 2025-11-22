"""Configuration helpers for the news digest service."""

from __future__ import annotations

from dataclasses import dataclass, replace
from pathlib import Path
import os


_DEF_NEWS_ENDPOINT = "https://newsapi.org/v2/top-headlines"


@dataclass(slots=True)
class Settings:
    """Runtime configuration loaded from environment variables."""

    newsapi_key: str | None
    newsapi_endpoint: str = _DEF_NEWS_ENDPOINT
    country: str = "us"
    topic: str = "technology"
    max_headlines: int = 5
    sample_path: Path | None = None
    llm_scoring_enabled: bool = False
    openai_api_key: str | None = None
    openai_model: str = "gpt-4o-mini"
    service_token: str | None = None

    @classmethod
    def from_env(cls) -> "Settings":
        sample_path_str = os.getenv("NEWSAPI_SAMPLE_PATH")
        sample_path = Path(sample_path_str) if sample_path_str else None

        api_key = os.getenv("NEWSAPI_KEY")
        if not api_key and not sample_path:
            raise RuntimeError("Set NEWSAPI_KEY or NEWSAPI_SAMPLE_PATH to load news headlines")

        max_headlines = int(os.getenv("MAX_HEADLINES", "5"))
        if max_headlines <= 0:
            raise ValueError("MAX_HEADLINES must be positive")

        llm_scoring_enabled = os.getenv("LLM_SCORING_ENABLED", "false").lower() in (
            "1",
            "true",
            "yes",
            "on",
        )

        return cls(
            newsapi_key=api_key,
            newsapi_endpoint=os.getenv("NEWSAPI_ENDPOINT", _DEF_NEWS_ENDPOINT),
            country=os.getenv("NEWSAPI_COUNTRY", "us"),
            topic=os.getenv("NEWS_TOPIC", "technology"),
            max_headlines=max_headlines,
            sample_path=sample_path,
            llm_scoring_enabled=llm_scoring_enabled,
            openai_api_key=os.getenv("OPENAI_API_KEY"),
            openai_model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            service_token=os.getenv("SERVICE_TOKEN"),
        )

    def override(self, **updates: object) -> "Settings":
        """Return a shallow copy with provided fields replaced."""

        return replace(self, **updates)


__all__ = ["Settings"]
