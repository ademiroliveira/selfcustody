import { usePortfolioStore } from '../store/portfolioStore';

export function usePortfolioMetrics() {
  const portfolio = usePortfolioStore((s) => s.portfolio);
  const topGainer = [...portfolio.positions].sort(
    (a, b) => b.price24hChangePct - a.price24hChangePct,
  )[0];
  const topLoser = [...portfolio.positions].sort(
    (a, b) => a.price24hChangePct - b.price24hChangePct,
  )[0];

  return {
    totalValue: portfolio.totalValueUSD,
    change24h: portfolio.change24hUSD,
    change24hPct: portfolio.change24hPct,
    unrealizedPnL: portfolio.totalUnrealizedPnL,
    unrealizedPnLPct: portfolio.totalUnrealizedPnLPct,
    positionCount: portfolio.positions.length,
    topGainer,
    topLoser,
  };
}
