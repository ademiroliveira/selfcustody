import { create } from 'zustand';
import type { Portfolio } from '../types/portfolio';
import { MOCK_PORTFOLIO } from '../mocks/portfolio.mock';

export interface StakedPosition {
  amount: number;
  protocol: string;
  receiptToken: string;
  stakedAt: number;
}

interface PortfolioState {
  portfolio: Portfolio;
  stakedPositions: Record<string, StakedPosition>;
  updatePrice: (assetId: string, newPrice: number) => void;
  stake: (assetId: string, amount: number, protocol: string, receiptToken: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolio: MOCK_PORTFOLIO,
  stakedPositions: {},

  stake: (assetId, amount, protocol, receiptToken) =>
    set((state) => ({
      stakedPositions: {
        ...state.stakedPositions,
        [assetId]: { amount, protocol, receiptToken, stakedAt: Date.now() },
      },
    })),

  updatePrice: (assetId, newPrice) =>
    set((state) => {
      const positions = state.portfolio.positions.map((pos) => {
        if (pos.asset.id !== assetId) return pos;
        const balanceUSD = pos.balance * newPrice;
        const pnl = balanceUSD - pos.costBasis;
        const pnlPct = (pnl / pos.costBasis) * 100;
        return { ...pos, priceUSD: newPrice, balanceUSD, unrealizedPnL: pnl, unrealizedPnLPct: pnlPct };
      });
      const totalValueUSD = positions.reduce((s, p) => s + p.balanceUSD, 0);
      const totalCostBasis = positions.reduce((s, p) => s + p.costBasis, 0);
      const totalUnrealizedPnL = totalValueUSD - totalCostBasis;
      const updatedPositions = positions.map((pos) => ({
        ...pos,
        allocationPct: (pos.balanceUSD / totalValueUSD) * 100,
      }));
      return {
        portfolio: {
          ...state.portfolio,
          positions: updatedPositions,
          totalValueUSD,
          totalCostBasis,
          totalUnrealizedPnL,
          totalUnrealizedPnLPct: (totalUnrealizedPnL / totalCostBasis) * 100,
          lastUpdated: Date.now(),
        },
      };
    }),
}));
