"""Runtime helpers that orchestrate wallets and key stores."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable

from .keystore import KeyStore
from .models import WalletMetadata, WalletPrimitive


@dataclass(slots=True)
class WalletRuntimeContext:
    """Context container linking a wallet implementation to its key store."""

    wallet: WalletPrimitive
    keystore: KeyStore

    def __post_init__(self) -> None:
        if not isinstance(self.wallet, WalletPrimitive):
            raise TypeError("wallet must implement WalletPrimitive")
        if not isinstance(self.wallet.metadata, WalletMetadata):
            raise TypeError("wallet.metadata must be a WalletMetadata instance")
        if not isinstance(self.keystore, KeyStore):
            raise TypeError("keystore must implement KeyStore")
        if not isinstance(self.keystore.type, str) or not self.keystore.type:
            raise TypeError("keystore.type must be a non-empty string")


def describe_wallet(context: WalletRuntimeContext) -> str:
    """Return a human readable description of the wallet context."""

    metadata = context.wallet.metadata
    chain_list = ", ".join(metadata.chains) if metadata.chains else "none"
    return (
        f"Wallet: {metadata.name}\n"
        f"Description: {metadata.description}\n"
        f"Chains: {chain_list}\n"
        f"Key store type: {context.keystore.type}"
    )


def _ensure_iterable(value: Iterable[str], error_message: str) -> None:
    for item in value:
        if not isinstance(item, str) or not item:
            raise ValueError(error_message)


def bootstrap(context: WalletRuntimeContext) -> None:
    """Validate that the wallet context exposes accounts and signers."""

    signers = context.keystore.list_signers()
    if not signers:
        raise RuntimeError("No signers were discovered in the key store")

    accounts = list(context.wallet.list_accounts())
    if not accounts:
        raise RuntimeError("Wallet must expose at least one account")

    _ensure_iterable(accounts, "Wallet accounts must be non-empty strings")
    _ensure_iterable(signers.keys(), "Signer identifiers must be non-empty strings")


__all__ = ["WalletRuntimeContext", "describe_wallet", "bootstrap"]
