"""Key-store abstractions."""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Callable, Dict, Iterable

TransactionSigner = Callable[[bytes], bytes]


class KeyStore(ABC):
    """Abstract base for key-store implementations."""

    type: str

    @abstractmethod
    def list_signers(self) -> Dict[str, TransactionSigner]:
        """Return a mapping of account identifiers to signer callables."""

    def sign_payloads(self, items: Iterable[tuple[str, bytes]]) -> Dict[str, bytes]:
        """Convenience method to sign multiple payloads in a batch."""

        signers = self.list_signers()
        results: Dict[str, bytes] = {}
        for account_id, payload in items:
            if account_id not in signers:
                raise KeyError(f"Signer for account '{account_id}' not found")
            results[account_id] = signers[account_id](payload)
        return results


__all__ = ["KeyStore", "TransactionSigner"]
