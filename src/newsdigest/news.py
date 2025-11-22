"""News digest assembly and scoring helpers."""

from __future__ import annotations

from datetime import datetime
import json
from pathlib import Path
from typing import Iterable

import httpx
from openai import AsyncOpenAI
from pydantic import BaseModel, Field

from .config import Settings


class NewsItem(BaseModel):
    title: str
    description: str | None = None
    url: str
    published_at: datetime | None = Field(default=None, alias="publishedAt")
    source: str | None = None
    score: float | None = None
    reasoning: str | None = None

    class Config:
        populate_by_name = True


class DigestResponse(BaseModel):
    generated_at: datetime
    topic: str
    country: str
    scoring_mode: str | None = None
    items: list[NewsItem]


async def _load_sample(path: Path) -> list[NewsItem]:
    payload = json.loads(path.read_text())
    articles = payload.get("articles", []) if isinstance(payload, dict) else []
    return _parse_articles(articles)


async def fetch_top_headlines(settings: Settings, client: httpx.AsyncClient | None = None) -> list[NewsItem]:
    if settings.sample_path:
        return await _load_sample(settings.sample_path)

    if not settings.newsapi_key:
        raise RuntimeError("NEWSAPI_KEY must be configured when not using sample data")

    owns_client = client is None
    http_client = client or httpx.AsyncClient(timeout=15)

    try:
        response = await http_client.get(
            settings.newsapi_endpoint,
            params={
                "apiKey": settings.newsapi_key,
                "country": settings.country,
                "pageSize": settings.max_headlines,
                "q": settings.topic,
            },
        )
        response.raise_for_status()
    finally:
        if owns_client:
            await http_client.aclose()

    payload = response.json()
    if payload.get("status") != "ok":
        raise RuntimeError(f"NewsAPI returned unexpected status: {payload.get('status')}")

    return _parse_articles(payload.get("articles", []))


def _parse_articles(raw_articles: Iterable[dict]) -> list[NewsItem]:
    parsed: list[NewsItem] = []
    for raw in raw_articles:
        source_name = None
        if isinstance(raw, dict):
            source = raw.get("source")
            if isinstance(source, dict):
                source_name = source.get("name")
        try:
            parsed.append(
                NewsItem(
                    title=raw.get("title", ""),
                    description=raw.get("description"),
                    url=raw.get("url", ""),
                    publishedAt=raw.get("publishedAt"),
                    source=source_name,
                )
            )
        except Exception:
            continue
    return parsed


async def _keyword_scores(items: list[NewsItem], topic: str) -> tuple[str, list[NewsItem]]:
    topic_words = {word.lower() for word in topic.split() if word}
    for item in items:
        haystack = f"{item.title} {item.description or ''}".lower()
        matches = sum(word in haystack for word in topic_words)
        item.score = min(1.0, max(0.1, matches / max(1, len(topic_words)))) if topic_words else 0.5
        item.reasoning = "Keyword heuristic score"
    return "keyword", items


async def _llm_scores(
    items: list[NewsItem],
    topic: str,
    client: AsyncOpenAI,
    model: str,
) -> tuple[str, list[NewsItem]]:
    prompt_items = [
        {
            "title": item.title,
            "description": item.description or "",
            "url": item.url,
        }
        for item in items
    ]
    response = await client.chat.completions.create(
        model=model,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a news analyst. Score each headline for relevance to the"
                    f" topic '{topic}'. Return JSON with a 'scores' array where each"
                    " element is {\"title\": string, \"score\": number between 0 and 1,"
                    " \"reasoning\": short string}."
                ),
            },
            {
                "role": "user",
                "content": json.dumps({"headlines": prompt_items}, ensure_ascii=False),
            },
        ],
        temperature=0,
    )
    content = response.choices[0].message.content or ""
    parsed = json.loads(content)
    scores = parsed.get("scores", []) if isinstance(parsed, dict) else []
    reasoning_lookup = {entry.get("title"): entry for entry in scores if isinstance(entry, dict)}

    for item in items:
        scored = reasoning_lookup.get(item.title)
        if scored:
            try:
                item.score = float(scored.get("score"))
                item.reasoning = scored.get("reasoning") or "LLM assessment"
            except (TypeError, ValueError):
                continue
    return "openai", items


async def apply_scoring(settings: Settings, items: list[NewsItem]) -> tuple[str | None, list[NewsItem]]:
    if not settings.llm_scoring_enabled:
        return None, items

    if settings.openai_api_key:
        try:
            client = AsyncOpenAI(api_key=settings.openai_api_key)
            return await _llm_scores(items, settings.topic, client, settings.openai_model)
        except Exception:
            # Fall back to heuristic scoring if the LLM call fails
            return await _keyword_scores(items, settings.topic)

    return await _keyword_scores(items, settings.topic)


async def build_digest(
    settings: Settings,
    client: httpx.AsyncClient | None = None,
) -> DigestResponse:
    articles = await fetch_top_headlines(settings, client)
    scoring_mode, scored = await apply_scoring(settings, articles)

    limited_items = scored[: settings.max_headlines]
    return DigestResponse(
        generated_at=datetime.utcnow(),
        topic=settings.topic,
        country=settings.country,
        scoring_mode=scoring_mode,
        items=limited_items,
    )


__all__ = ["NewsItem", "DigestResponse", "build_digest", "fetch_top_headlines"]
