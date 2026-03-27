import { useEffect } from 'react';
import { priceEmitter } from '../services/priceSimulator';
import { usePortfolioStore } from '../store/portfolioStore';

export function usePriceSimulator() {
  const updatePrice = usePortfolioStore((s) => s.updatePrice);

  useEffect(() => {
    priceEmitter.on('tick', ({ assetId, price }) => updatePrice(assetId, price));
    return () => priceEmitter.off('tick', ({ assetId, price }) => updatePrice(assetId, price));
  }, [updatePrice]);
}
