export interface StakingConfig {
  protocol: string;
  apy: number;
  lockPeriodLabel: string;
  validatorName: string;
  validatorNote: string;
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
    minStakeToken: 0.1,
    feeEstimateUSD: 0.50,
    liquidityGuardToken: 0.01,
  },
};

export const STAKEABLE_ASSET_IDS = Object.keys(STAKING_CONFIG);
