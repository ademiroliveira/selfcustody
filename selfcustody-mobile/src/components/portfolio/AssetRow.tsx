import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Position } from '../../types/portfolio';
import { colors } from '../../theme';
import PnLBadge from './PnLBadge';

interface AssetRowProps {
  position: Position;
  onPress?: () => void;
}

export default function AssetRow({ position, onPress }: AssetRowProps) {
  const { asset, balanceUSD, balance, price24hChangePct, allocationPct } = position;
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconCircle, { backgroundColor: asset.iconColor + '22' }]}>
        <Text style={[styles.iconText, { color: asset.iconColor }]}>{asset.symbol.slice(0, 1)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.symbol}>{asset.symbol}</Text>
        <Text style={styles.balance}>{balance.toLocaleString(undefined, { maximumFractionDigits: 4 })} · {allocationPct.toFixed(1)}%</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.value}>${balanceUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
        <PnLBadge value={price24hChangePct} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  iconText: { fontSize: 16, fontWeight: '700' },
  info: { flex: 1 },
  symbol: { color: colors.text.primary, fontSize: 15, fontWeight: '600' },
  balance: { color: colors.text.secondary, fontSize: 13, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  value: { color: colors.text.primary, fontSize: 15, fontWeight: '600' },
});
