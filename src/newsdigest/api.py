"""FastAPI entrypoint for the news digest service."""

from __future__ import annotations

from fastapi import Depends, FastAPI, Header, HTTPException, Request
from pydantic import BaseModel

from .config import Settings
from .news import DigestResponse, build_digest


class RunRequest(BaseModel):
    topic: str | None = None
    country: str | None = None
    max_headlines: int | None = None


app = FastAPI(title="News Digest Runner")


def get_settings(request: Request) -> Settings:
    settings = getattr(request.app.state, "settings", None)
    if settings is None:
        request.app.state.settings = Settings.from_env()
        settings = request.app.state.settings
    return settings


async def require_token(
    authorization: str | None = Header(default=None),
    settings: Settings = Depends(get_settings),
) -> None:
    if settings.service_token and authorization != f"Bearer {settings.service_token}":
        raise HTTPException(status_code=401, detail="Invalid or missing bearer token")


@app.on_event("startup")
async def load_settings() -> None:
    app.state.settings = Settings.from_env()


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/run", response_model=DigestResponse)
async def run_digest(
    request: RunRequest,
    settings: Settings = Depends(get_settings),
    _auth: None = Depends(require_token),
) -> DigestResponse:
    effective_settings = settings.override(
        topic=request.topic or settings.topic,
        country=request.country or settings.country,
        max_headlines=request.max_headlines or settings.max_headlines,
    )
    return await build_digest(effective_settings)


__all__ = ["app"]
