export interface StakingConfig {
  protocol: string;
  apy: number;
  lockPeriodLabel: string;
  validatorName: string;
  validatorNote: string;
  receiptToken: string;
  receiptNote: string;
  whyThisProtocol: string;
  minStakeToken: number;
  feeEstimateUSD: number;
  liquidityGuardToken: number;
}

export const STAKING_CONFIG: Record<string, StakingConfig> = {
  eth: {
    protocol: 'Lido Finance',
    apy: 4.2,
    lockPeriodLabel: 'Liquid — unstake anytime',
    validatorName: 'Lido (stETH)',
    validatorNote: 'Stake distributed across 30+ professional validators',
    receiptToken: 'stETH',
    receiptNote: "You'll receive stETH — redeemable for ETH anytime",
    whyThisProtocol:
      'Lido is the largest liquid staking protocol on Ethereum, audited by multiple security firms and used by institutions worldwide. Your ETH is spread across 30+ professional validators — no single point of failure.',
    minStakeToken: 0.01,
    feeEstimateUSD: 4.20,
    liquidityGuardToken: 0.005,
  },
  sol: {
    protocol: 'Marinade Finance',
    apy: 6.8,
    lockPeriodLabel: 'Liquid — instant via mSOL',
    validatorName: 'Marinade (mSOL)',
    validatorNote: 'Stake distributed across 450+ validators for decentralization',
    receiptToken: 'mSOL',
    receiptNote: "You'll receive mSOL — redeemable for SOL anytime",
    whyThisProtocol:
      'Marinade distributes your stake across 450+ validators, supporting decentralization on Solana. No lock-up — your mSOL can be swapped back to SOL at any time through any Solana DEX.',
    minStakeToken: 0.01,
    feeEstimateUSD: 0.01,
    liquidityGuardToken: 0.05,
  },
  avax: {
    protocol: 'BENQI Liquid Staking',
    apy: 8.1,
    lockPeriodLabel: 'Liquid — redeem via sAVAX',
    validatorName: 'BENQI (sAVAX)',
    validatorNote: 'Delegated to Avalanche Primary Network validators',
    receiptToken: 'sAVAX',
    receiptNote: "You'll receive sAVAX — redeemable for AVAX anytime",
    whyThisProtocol:
      'BENQI delegates to Avalanche Primary Network validators with strong uptime records. Your sAVAX automatically accrues rewards over time — no claiming needed.',
    minStakeToken: 0.1,
    feeEstimateUSD: 0.50,
    liquidityGuardToken: 0.01,
  },
};

export const STAKEABLE_ASSET_IDS = Object.keys(STAKING_CONFIG);
