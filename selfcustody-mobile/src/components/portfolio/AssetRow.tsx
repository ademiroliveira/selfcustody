import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'heroui-native';
import type { Position } from '../../types/portfolio';
import { usePortfolioStore } from '../../store/portfolioStore';
import { colors } from '../../theme';
import PnLBadge from './PnLBadge';

interface AssetRowProps {
  position: Position;
  onPress?: () => void;
}

export default function AssetRow({ position, onPress }: AssetRowProps) {
  const { asset, balanceUSD, balance, price24hChangePct, allocationPct } = position;
  const stakedPos = usePortfolioStore((s) => s.stakedPositions[asset.id]);
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${asset.symbol}: ${balance.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${asset.symbol} · $${balanceUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })} · ${price24hChangePct >= 0 ? 'up' : 'down'} ${Math.abs(price24hChangePct).toFixed(1)}% today${stakedPos ? ` · ${stakedPos.amount.toLocaleString(undefined, { maximumFractionDigits: 4 })} staked via ${stakedPos.protocol}` : ''}`}
    >
      <Avatar size="md" style={{ backgroundColor: asset.iconColor + '22' }}>
        <Avatar.Fallback>
          <Text style={[styles.iconText, { color: asset.iconColor }]}>{asset.symbol.slice(0, 1)}</Text>
        </Avatar.Fallback>
      </Avatar>
      <View style={styles.info}>
        <View style={styles.symbolRow}>
          <Text style={styles.symbol}>{asset.symbol}</Text>
          {stakedPos && (
            <View style={styles.stakedChip}>
              <Text style={styles.stakedText}>◎ STAKED</Text>
            </View>
          )}
        </View>
        <Text style={styles.balance}>
          {balance.toLocaleString(undefined, { maximumFractionDigits: 4 })} · {allocationPct.toFixed(1)}%
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.value}>${balanceUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
        <PnLBadge value={price24hChangePct} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  iconText: { fontSize: 16, fontWeight: '700' },
  info: { flex: 1 },
  symbolRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  symbol: { color: colors.text.primary, fontSize: 15, fontWeight: '600' },
  stakedChip: {
    backgroundColor: colors.accent.green + '18',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  stakedText: { color: colors.accent.green, fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
  balance: { color: colors.text.secondary, fontSize: 13, marginTop: 2 },
  right: { alignItems: 'flex-end', gap: 2 },
  value: { color: colors.text.primary, fontSize: 15, fontWeight: '600' },
});
