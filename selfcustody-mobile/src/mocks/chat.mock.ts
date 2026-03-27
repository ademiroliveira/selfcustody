const CANNED_RESPONSES: Record<string, string> = {
  portfolio: `Your portfolio is currently valued at **$573,421** — up $8,240 (+1.46%) in the last 24 hours.

Your largest position is Bitcoin at 38% ($57,964), followed by PENDLE at 36.2% ($54,360). Both have performed strongly over the past 30 days.

The key risk to watch: PENDLE's outsize allocation. At 36.2%, a 20% drawdown in PENDLE would reduce your total portfolio by ~7.2%.`,

  bitcoin: `Bitcoin currently makes up 38% of your portfolio at $57,964 (0.847 BTC at $68,420/BTC).

Your cost basis was ~$49,600/BTC, giving you an unrealized gain of $15,964 (+38%). On-chain metrics remain constructive — spot ETF inflows hit $1.2B today, which has historically preceded 7-14 day appreciation.

No immediate action recommended, though the current allocation is within a healthy range for a crypto-native portfolio.`,

  risk: `Your top risk factors right now:

1. **Concentration risk**: PENDLE at 36.2% is well above a typical 25% single-asset cap. A sharp DeFi rotation could cause significant drawdown.

2. **Stale approval**: A 6-month-old unlimited USDC approval to a deprecated protocol (flagged by Threat Monitor) — this should be revoked.

3. **Staking yield compression**: Your 2.1 staked ETH is earning 3.2% APR on Lido, down from 3.8%. Better alternatives exist.

Overall custody health is strong at 94/100. Keys are secured and backed up.`,

  rebalance: `Portfolio Intelligence has flagged a rebalance opportunity: trim PENDLE from 36.2% to the 25% target.

**Proposed trade:** Sell 2,650 PENDLE (~$12,004) → Buy 0.1755 BTC

This would improve your estimated Sharpe ratio by +0.18 and reduce concentration risk. The trade requires your approval before execution.

You can approve it from the Agents tab, or ask me to walk you through the reasoning in more detail.`,

  pendle: `Pendle Finance is a yield tokenization protocol — it lets you separate and trade the yield component of yield-bearing assets.

You hold 12,000 PENDLE at $4.53/token ($54,360 total). It's up 54.1% over 30 days, driven by TVL growth to $4.8B and increasing institutional adoption.

The main risks: protocol complexity, smart contract risk (multiple audits completed), and the fact that yield tokenization is still early. Your position is large enough that any DeFi sector rotation could have a material impact.`,

  custody: `Your custody health score is **94/100 (Excellent)**.

All 3 keys are backed up:
- Primary signing key: Device Secure Enclave ✓
- Bitcoin key: Hardware wallet ✓
- Solana key: iCloud Keychain ✓

Last backup: 3 days ago. Recovery test: passed 14 days ago.

One active flag: a stale token approval on your Ethereum address. The Threat Monitor has details — it's worth revoking even if the protocol is likely safe.`,

  'seed phrase': `Your seed phrase (recovery phrase) is the master backup for your wallet. Whoever has your seed phrase has full access to all your funds.

Best practices for self-custody:
• Store on paper or metal (not digitally)
• Keep in a physically secure location (safe, safety deposit box)
• Never photograph or type it into any device
• Consider a second copy in a separate location

Your wallet's seed phrase was generated during onboarding and was never stored by this app. If you haven't backed it up yet, go to Security → Backup Status.`,

  backup: `Your last backup was **3 days ago**. Recovery test: passed 14 days ago.

All keys show "backed-up" status. Best practice is to test your recovery process every 30-90 days to ensure your backup is valid.

Want to schedule a recovery test? Go to Security → Test Recovery.`,

  default: `I'm your self-custody AI assistant. I have full context on your portfolio, custody health, and active agent alerts.

You can ask me things like:
- "What's my biggest risk right now?"
- "Should I rebalance?"
- "Explain my PENDLE position"
- "Is my custody setup secure?"

What would you like to know?`,
};

export function getMockChatResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  for (const [keyword, response] of Object.entries(CANNED_RESPONSES)) {
    if (keyword !== 'default' && lower.includes(keyword)) {
      return response;
    }
  }
  return CANNED_RESPONSES.default;
}
