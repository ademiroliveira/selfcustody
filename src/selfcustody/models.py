"""Data structures that describe wallet capabilities."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Iterable, List


@dataclass(frozen=True, slots=True)
class WalletMetadata:
    """Metadata that describes the public characteristics of a wallet."""

    name: str
    description: str
    chains: List[str] = field(default_factory=list)

    def __post_init__(self) -> None:  # pragma: no cover - dataclass validation
        object.__setattr__(self, "chains", [str(chain) for chain in self.chains])
        if not self.name:
            raise ValueError("Wallet name must not be empty")
        if not isinstance(self.description, str) or not self.description:
            raise ValueError("Wallet description must not be empty")
        for chain in self.chains:
            if not chain:
                raise ValueError("Chain identifiers must be non-empty strings")


class WalletPrimitive(ABC):
    """Abstract base for wallet implementations."""

    metadata: WalletMetadata

    @abstractmethod
    def list_accounts(self) -> Iterable[str]:
        """Return an iterable of known account identifiers."""


__all__ = ["WalletMetadata", "WalletPrimitive"]
