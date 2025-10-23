"""Self-custody wallet toolkit primitives.

This package exposes the foundational interfaces and helpers required to build
wallet applications that keep key ownership on the user's side. The primitives
are intentionally lightweight and dependency free so they can be reused across
server, desktop, or mobile Python runtimes.
"""

from .models import WalletMetadata, WalletPrimitive
from .keystore import KeyStore, TransactionSigner
from .runtime import WalletRuntimeContext, bootstrap, describe_wallet

__all__ = [
    "WalletMetadata",
    "WalletPrimitive",
    "TransactionSigner",
    "KeyStore",
    "WalletRuntimeContext",
    "bootstrap",
    "describe_wallet",
]
