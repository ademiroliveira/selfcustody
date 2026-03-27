export type AssetSymbol = 'BTC' | 'ETH' | 'SOL' | 'AVAX' | 'ARB' | 'OP' | 'PENDLE';
export type Chain = 'bitcoin' | 'ethereum' | 'solana' | 'avalanche' | 'arbitrum' | 'optimism';

export interface PricePoint {
  timestamp: number;
  price: number;
}

export interface Asset {
  id: string;
  symbol: AssetSymbol;
  name: string;
  chain: Chain;
  iconColor: string;
  contractAddress?: string;
  decimals: number;
}

export interface Position {
  asset: Asset;
  balance: number;
  balanceUSD: number;
  costBasis: number;
  unrealizedPnL: number;
  unrealizedPnLPct: number;
  priceUSD: number;
  price24hChangePct: number;
  priceHistory: PricePoint[];
  allocationPct: number;
}

export interface Portfolio {
  id: string;
  name: string;
  totalValueUSD: number;
  totalCostBasis: number;
  totalUnrealizedPnL: number;
  totalUnrealizedPnLPct: number;
  change24hUSD: number;
  change24hPct: number;
  positions: Position[];
  lastUpdated: number;
}
