import mitt from 'mitt';

type PriceEvents = {
  tick: { assetId: string; price: number };
};

export const priceEmitter = mitt<PriceEvents>();

let interval: ReturnType<typeof setInterval> | null = null;

// Volatile prices per asset (seeded from mock)
const prices: Record<string, number> = {
  btc: 68420,
  eth: 3180,
  sol: 142,
  avax: 38.5,
  arb: 1.24,
  op: 2.87,
  pendle: 4.53,
};

export function startPriceSimulator() {
  if (interval) return;
  interval = setInterval(() => {
    for (const [assetId, price] of Object.entries(prices)) {
      const changePct = (Math.random() - 0.5) * 0.01; // ±0.5%
      const newPrice = price * (1 + changePct);
      prices[assetId] = newPrice;
      priceEmitter.emit('tick', { assetId, price: newPrice });
    }
  }, 3000);
}

export function stopPriceSimulator() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}
