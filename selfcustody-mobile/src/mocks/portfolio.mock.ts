import type { Portfolio, Position, PricePoint } from '../types/portfolio';

function generatePriceHistory(basePrice: number, volatility: number, days = 30): PricePoint[] {
  const points: PricePoint[] = [];
  let price = basePrice * (1 - (Math.sin(0) * 0.15));
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    const t = i / days;
    const trend = Math.sin(t * Math.PI * 2) * volatility * basePrice;
    const noise = (Math.sin(t * 137.5) * 0.5 + Math.sin(t * 251.3) * 0.3) * 0.02 * basePrice;
    price = basePrice * (1 - volatility * 0.5) + trend + noise;
    price = Math.max(price * 0.5, price);
    points.push({ timestamp: now - i * 86400000, price: Math.round(price * 100) / 100 });
  }
  return points;
}

export const MOCK_PORTFOLIO: Portfolio = {
  id: 'wallet-01',
  name: 'Primary Wallet',
  totalValueUSD: 573421,
  totalCostBasis: 410000,
  totalUnrealizedPnL: 163421,
  totalUnrealizedPnLPct: 39.86,
  change24hUSD: 8240,
  change24hPct: 1.46,
  lastUpdated: Date.now(),
  positions: [
    {
      asset: { id: 'btc', symbol: 'BTC', name: 'Bitcoin', chain: 'bitcoin', iconColor: '#F7931A', decimals: 8 },
      balance: 0.847,
      balanceUSD: 57964,
      costBasis: 42000,
      unrealizedPnL: 15964,
      unrealizedPnLPct: 38.01,
      priceUSD: 68420,
      price24hChangePct: 2.1,
      priceHistory: generatePriceHistory(68420, 0.12),
      allocationPct: 38,
    },
    {
      asset: { id: 'pendle', symbol: 'PENDLE', name: 'Pendle', chain: 'ethereum', iconColor: '#7B68EE', decimals: 18 },
      balance: 12000,
      balanceUSD: 54360,
      costBasis: 18000,
      unrealizedPnL: 36360,
      unrealizedPnLPct: 201.99,
      priceUSD: 4.53,
      price24hChangePct: 3.7,
      priceHistory: generatePriceHistory(4.53, 0.28),
      allocationPct: 36.2,
    },
    {
      asset: { id: 'op', symbol: 'OP', name: 'Optimism', chain: 'optimism', iconColor: '#FF0420', decimals: 18 },
      balance: 5200,
      balanceUSD: 14924,
      costBasis: 9800,
      unrealizedPnL: 5124,
      unrealizedPnLPct: 52.28,
      priceUSD: 2.87,
      price24hChangePct: 1.2,
      priceHistory: generatePriceHistory(2.87, 0.22),
      allocationPct: 9.9,
    },
    {
      asset: { id: 'eth', symbol: 'ETH', name: 'Ethereum', chain: 'ethereum', iconColor: '#627EEA', decimals: 18 },
      balance: 4.21,
      balanceUSD: 13388,
      costBasis: 11000,
      unrealizedPnL: 2388,
      unrealizedPnLPct: 21.71,
      priceUSD: 3180,
      price24hChangePct: 0.8,
      priceHistory: generatePriceHistory(3180, 0.10),
      allocationPct: 8.8,
    },
    {
      asset: { id: 'arb', symbol: 'ARB', name: 'Arbitrum', chain: 'arbitrum', iconColor: '#28A0F0', decimals: 18 },
      balance: 8400,
      balanceUSD: 10416,
      costBasis: 7200,
      unrealizedPnL: 3216,
      unrealizedPnLPct: 44.66,
      priceUSD: 1.24,
      price24hChangePct: 2.4,
      priceHistory: generatePriceHistory(1.24, 0.18),
      allocationPct: 6.9,
    },
    {
      asset: { id: 'sol', symbol: 'SOL', name: 'Solana', chain: 'solana', iconColor: '#9945FF', decimals: 9 },
      balance: 52.3,
      balanceUSD: 7427,
      costBasis: 5100,
      unrealizedPnL: 2327,
      unrealizedPnLPct: 45.62,
      priceUSD: 142,
      price24hChangePct: 1.9,
      priceHistory: generatePriceHistory(142, 0.20),
      allocationPct: 4.9,
    },
    {
      asset: { id: 'avax', symbol: 'AVAX', name: 'Avalanche', chain: 'avalanche', iconColor: '#E84142', decimals: 18 },
      balance: 120,
      balanceUSD: 4620,
      costBasis: 5200,
      unrealizedPnL: -580,
      unrealizedPnLPct: -11.15,
      priceUSD: 38.5,
      price24hChangePct: -0.9,
      priceHistory: generatePriceHistory(38.5, 0.16),
      allocationPct: 3.1,
    },
  ],
};
