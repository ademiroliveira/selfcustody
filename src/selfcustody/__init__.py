"""Self-custody toolkit with news digest service bindings."""

from .api import app
from .config import Settings
from .news import DigestResponse, NewsItem, build_digest
from .keystore import KeyStore
from .models import WalletMetadata, WalletPrimitive
from .runtime import WalletRuntimeContext, bootstrap, describe_wallet

__all__ = [
    "app",
    "Settings",
    "DigestResponse",
    "NewsItem",
    "build_digest",
    "KeyStore",
    "WalletMetadata",
    "WalletPrimitive",
    "WalletRuntimeContext",
    "bootstrap",
    "describe_wallet",
]
