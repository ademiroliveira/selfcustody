import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { PricePoint } from '../../types/portfolio';
import { colors } from '../../theme';

interface PriceChartProps {
  data: PricePoint[];
  color?: string;
  height?: number;
}

// Taste profile principle 5 — charts as raw data: a bold line, full bleed, no
// axes, no fill, no gridlines. Direction is communicated by PnLBadge's arrow
// and label, so the line itself stays neutral rather than red/green.
const VIEW_W = 100;

function buildPath(prices: number[], viewH: number): string {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  // Inset vertically so the stroke is never clipped at the extremes.
  const pad = 2;
  const usable = viewH - pad * 2;

  return prices
    .map((price, i) => {
      const x = prices.length === 1 ? 0 : (i / (prices.length - 1)) * VIEW_W;
      const y = pad + (1 - (price - min) / range) * usable;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}

export default function PriceChart({ data, color = colors.action.primary, height = 80 }: PriceChartProps) {
  const prices = data.map((d) => d.price);
  if (prices.length < 2) return <View style={[styles.container, { height }]} />;

  return (
    <View style={[styles.container, { height }]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${VIEW_W} ${height}`} preserveAspectRatio="none">
        <Path
          d={buildPath(prices, height)}
          stroke={color}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          // Counteract preserveAspectRatio="none" so the stroke keeps an even
          // weight instead of being stretched horizontally with the viewBox.
          vectorEffect="non-scaling-stroke"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
});
