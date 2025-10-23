"""Unit tests for runtime helpers."""

from __future__ import annotations

import unittest
from typing import Callable

from selfcustody import WalletMetadata, bootstrap, describe_wallet
from selfcustody.keystore import KeyStore
from selfcustody.models import WalletPrimitive
from selfcustody.runtime import WalletRuntimeContext


class InMemoryWallet(WalletPrimitive):
    def __init__(self, accounts: list[str], metadata: WalletMetadata) -> None:
        self._accounts = accounts
        self.metadata = metadata

    def list_accounts(self):
        return list(self._accounts)


class InMemoryKeyStore(KeyStore):
    def __init__(self, signers: dict[str, Callable[[bytes], bytes]]) -> None:
        self._signers = signers
        self.type = "in-memory"

    def list_signers(self):
        return dict(self._signers)


class RuntimeTests(unittest.TestCase):
    def setUp(self) -> None:
        self.metadata = WalletMetadata(
            name="Demo Wallet",
            description="In-memory testing wallet",
            chains=["ethereum"],
        )
        self.wallet = InMemoryWallet(["0xabc"], metadata=self.metadata)
        self.keystore = InMemoryKeyStore({"0xabc": lambda payload: payload[::-1]})

    def test_describe_wallet(self) -> None:
        context = WalletRuntimeContext(wallet=self.wallet, keystore=self.keystore)
        description = describe_wallet(context=context)
        self.assertIn("Demo Wallet", description)
        self.assertIn("ethereum", description)
        self.assertIn("in-memory", description)

    def test_bootstrap_success(self) -> None:
        context = WalletRuntimeContext(wallet=self.wallet, keystore=self.keystore)
        bootstrap(context)

    def test_bootstrap_without_signers_raises(self) -> None:
        context = WalletRuntimeContext(
            wallet=self.wallet, keystore=InMemoryKeyStore({})
        )
        with self.assertRaisesRegex(RuntimeError, "No signers"):
            bootstrap(context)

    def test_bootstrap_without_accounts_raises(self) -> None:
        wallet = InMemoryWallet([], metadata=self.metadata)
        context = WalletRuntimeContext(wallet=wallet, keystore=self.keystore)
        with self.assertRaisesRegex(RuntimeError, "at least one account"):
            bootstrap(context)

    def test_sign_payloads_batches(self) -> None:
        context = WalletRuntimeContext(wallet=self.wallet, keystore=self.keystore)
        result = context.keystore.sign_payloads([("0xabc", b"abc")])
        self.assertEqual(result["0xabc"], b"cba")


if __name__ == "__main__":  # pragma: no cover
    unittest.main()
