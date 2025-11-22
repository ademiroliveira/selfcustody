"""Standalone news digest service components."""

from .api import app
from .config import Settings
from .news import DigestResponse, NewsItem, build_digest

__all__ = ["app", "Settings", "DigestResponse", "NewsItem", "build_digest"]
