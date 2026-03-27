import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Transaction } from '../../types/transactions';
import { colors } from '../../theme';
import Badge from '../common/Badge';

interface Props { tx: Transaction }

const typeEmoji: Record<string, string> = {
  send: '↑', receive: '↓', swap: '⇄', stake: '⬡', unstake: '⬡', approve: '✓', 'agent-trade': '⚡',
};

export default function TxRow({ tx }: Props) {
  const isOut = tx.type === 'send' || tx.type === 'swap' || tx.type === 'stake' || tx.type === 'agent-trade';
  const sign = isOut ? '-' : '+';
  const amountColor = isOut ? colors.text.negative : colors.text.positive;

  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: tx.asset.iconColor + '22' }]}>
        <Text style={{ color: tx.asset.iconColor, fontSize: 16 }}>{typeEmoji[tx.type] ?? '·'}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.type}>{tx.type.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())} {tx.asset.symbol}</Text>
        <Text style={styles.time}>{new Date(tx.timestamp).toLocaleDateString()}</Text>
        {tx.initiatedBy !== 'user' && <Badge label="Agent" variant="indigo" />}
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, { color: amountColor }]}>{sign}${tx.amountUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
        <Badge label={tx.status} variant={tx.status === 'confirmed' ? 'positive' : tx.status === 'pending' ? 'alert' : 'negative'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, gap: 12 },
  icon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, gap: 3 },
  type: { color: colors.text.primary, fontSize: 14, fontWeight: '500' },
  time: { color: colors.text.tertiary, fontSize: 12 },
  right: { alignItems: 'flex-end', gap: 4 },
  amount: { fontSize: 14, fontWeight: '600' },
});
