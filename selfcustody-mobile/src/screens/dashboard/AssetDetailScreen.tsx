import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { DashboardStackParams } from '../../navigation/navigationTypes';
import { usePortfolioStore } from '../../store/portfolioStore';
import { useAgentStore } from '../../store/agentStore';
import PriceChart from '../../components/portfolio/PriceChart';
import PnLBadge from '../../components/portfolio/PnLBadge';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import SectionHeader from '../../components/common/SectionHeader';
import { colors } from '../../theme';

type RouteType = RouteProp<DashboardStackParams, 'AssetDetail'>;

export default function AssetDetailScreen() {
  const route = useRoute<RouteType>();
  const portfolio = usePortfolioStore((s) => s.portfolio);
  const allActions = useAgentStore((s) => s.allActions);

  const position = portfolio.positions.find((p) => p.asset.id === route.params.assetId);
  if (!position) return null;

  const { asset, priceUSD, price24hChangePct, balance, balanceUSD, costBasis, unrealizedPnL, unrealizedPnLPct, priceHistory } = position;
  const relatedActions = allActions.filter((a) => a.payload && (a.payload.sellAsset === asset.symbol || a.payload.buyAsset === asset.symbol));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: asset.iconColor + '22' }]}>
            <Text style={[styles.iconText, { color: asset.iconColor }]}>{asset.symbol.slice(0, 1)}</Text>
          </View>
          <View>
            <Text style={styles.name}>{asset.name}</Text>
            <Text style={styles.price}>${priceUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
            <PnLBadge value={price24hChangePct} suffix="% (24h)" />
          </View>
        </View>

        <PriceChart data={priceHistory} color={asset.iconColor} height={100} />

        <Card style={styles.card}>
          <SectionHeader title="Your Position" />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Balance</Text>
            <Text style={styles.statValue}>{balance.toLocaleString(undefined, { maximumFractionDigits: 6 })} {asset.symbol}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Value</Text>
            <Text style={styles.statValue}>${balanceUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Cost Basis</Text>
            <Text style={styles.statValue}>${costBasis.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Unrealized P&L</Text>
            <PnLBadge value={unrealizedPnLPct} suffix="%" prefix={`$${Math.abs(unrealizedPnL).toLocaleString(undefined, { maximumFractionDigits: 0 })} · `} />
          </View>
        </Card>

        {relatedActions.length > 0 && (
          <Card variant="alert" style={styles.card}>
            <Text style={styles.agentNote}>⚡ Agent action pending for {asset.symbol}</Text>
            <Text style={styles.agentDetail}>{relatedActions[0].summary}</Text>
          </Card>
        )}

        <View style={styles.actions}>
          <Button label="Send" onPress={() => {}} style={styles.actionBtn} variant="secondary" />
          <Button label="Receive" onPress={() => {}} style={styles.actionBtn} variant="secondary" />
          <Button label="Swap" onPress={() => {}} style={styles.actionBtn} variant="secondary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, gap: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingBottom: 8 },
  iconCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 24, fontWeight: '700' },
  name: { color: colors.text.secondary, fontSize: 14 },
  price: { color: colors.text.primary, fontSize: 28, fontWeight: '700' },
  card: {},
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border.subtle },
  statLabel: { color: colors.text.secondary, fontSize: 14 },
  statValue: { color: colors.text.primary, fontSize: 14, fontWeight: '500' },
  agentNote: { color: colors.accent.amber, fontSize: 14, fontWeight: '600', marginBottom: 4 },
  agentDetail: { color: colors.text.secondary, fontSize: 13 },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1 },
});
