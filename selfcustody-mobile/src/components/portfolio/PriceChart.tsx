import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { PricePoint } from '../../types/portfolio';
import { colors } from '../../theme';

interface PriceChartProps {
  data: PricePoint[];
  color?: string;
  height?: number;
}

// Lightweight SVG-free sparkline using view widths (victor-native has complex peer deps)
export default function PriceChart({ data, color = colors.accent.indigo, height = 80 }: PriceChartProps) {
  const prices = data.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const isPositive = prices[prices.length - 1] >= prices[0];
  const chartColor = isPositive ? colors.accent.green : colors.accent.rose;

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.bars}>
        {prices.map((price, i) => {
          const heightPct = ((price - min) / range) * 0.8 + 0.1;
          return (
            <View
              key={i}
              style={[styles.bar, { height: `${heightPct * 100}%` as any, backgroundColor: chartColor, opacity: i === prices.length - 1 ? 1 : 0.4 }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', borderRadius: 8 },
  bars: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: 1 },
  bar: { flex: 1, minWidth: 2, borderRadius: 1 },
});
