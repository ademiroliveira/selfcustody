import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'heroui-native';
import type { Portfolio } from '../../types/portfolio';
import { colors } from '../../theme';
import PnLBadge from './PnLBadge';

interface Props {
  portfolio: Portfolio;
  custodyScore: number;
  onCustodyPress?: () => void;
}

export default function PortfolioSummaryCard({ portfolio, custodyScore, onCustodyPress }: Props) {
  const scoreColor = custodyScore >= 90 ? colors.accent.green : custodyScore >= 70 ? colors.accent.amber : colors.accent.rose;
  return (
    <Card>
      <Card.Body style={styles.body}>
        <Text style={styles.label}>Total Portfolio</Text>
        <Text style={styles.value}>
          ${portfolio.totalValueUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </Text>
        <View style={styles.row}>
          <PnLBadge value={portfolio.change24hPct} suffix="% today" />
          <Text style={styles.separator}> · </Text>
          <PnLBadge value={portfolio.totalUnrealizedPnLPct} suffix="% all time" />
        </View>
        <TouchableOpacity style={styles.healthBar} onPress={onCustodyPress} accessibilityRole="button" accessibilityLabel={`Custody health score ${custodyScore} out of 100. Tap to view details`}>
          <View style={styles.healthTrack}>
            <View style={[styles.healthFill, { width: `${custodyScore}%` as any, backgroundColor: scoreColor }]} />
          </View>
          <Text style={[styles.healthLabel, { color: scoreColor }]}>Custody {custodyScore}/100</Text>
        </TouchableOpacity>
      </Card.Body>
    </Card>
  );
}

const styles = StyleSheet.create({
  body: { gap: 8 },
  label: { color: colors.text.secondary, fontSize: 13, fontWeight: '500' },
  value: { color: colors.text.primary, fontSize: 40, fontWeight: '700', letterSpacing: -1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  separator: { color: colors.text.tertiary },
  healthBar: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  healthTrack: { flex: 1, height: 4, backgroundColor: colors.bg.elevated, borderRadius: 2, overflow: 'hidden' },
  healthFill: { height: '100%', borderRadius: 2 },
  healthLabel: { fontSize: 12, fontWeight: '600', minWidth: 90 },
});
