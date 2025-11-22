from __future__ import annotations

import asyncio
import os
from pathlib import Path
import unittest
from unittest.mock import patch

from selfcustody.config import Settings
from selfcustody.news import build_digest


class SettingsTestCase(unittest.TestCase):
    def test_missing_configuration(self) -> None:
        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaises(RuntimeError):
                Settings.from_env()


class DigestTestCase(unittest.IsolatedAsyncioTestCase):
    async def test_digest_uses_sample_and_scoring(self) -> None:
        sample_path = Path(__file__).resolve().parent.parent / "research" / "sample_newsapi_response.json"
        settings = Settings(
            newsapi_key="sample",
            sample_path=sample_path,
            topic="custody",
            max_headlines=2,
            llm_scoring_enabled=True,
            openai_api_key=None,
        )

        digest = await build_digest(settings)
        self.assertEqual(len(digest.items), 2)
        self.assertEqual(digest.scoring_mode, "keyword")
        self.assertTrue(all(item.score is not None for item in digest.items))


if __name__ == "__main__":
    asyncio.run(unittest.main())
