import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, Modal, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { DashboardStackParams } from '../../navigation/navigationTypes';
import { usePortfolioStore } from '../../store/portfolioStore';
import { useAgentStore } from '../../store/agentStore';
import { useWalletStore } from '../../store/walletStore';
import { Avatar, Card, Button } from 'heroui-native';
import PriceChart from '../../components/portfolio/PriceChart';
import PnLBadge from '../../components/portfolio/PnLBadge';
import SectionHeader from '../../components/common/SectionHeader';
import { colors } from '../../theme';

type RouteType = RouteProp<DashboardStackParams, 'AssetDetail'>;

export default function AssetDetailScreen() {
  const route = useRoute<RouteType>();
  const portfolio = usePortfolioStore((s) => s.portfolio);
  const allActions = useAgentStore((s) => s.allActions);
  const primaryAddress = useWalletStore((s) => s.primaryAddress);
  const [receiveVisible, setReceiveVisible] = React.useState(false);

  const position = portfolio.positions.find((p) => p.asset.id === route.params.assetId);
  if (!position) return null;

  const { asset, priceUSD, price24hChangePct, balance, balanceUSD, costBasis, unrealizedPnL, unrealizedPnLPct, priceHistory } = position;
  const relatedActions = allActions.filter((a) => a.payload && (a.payload.sellAsset === asset.symbol || a.payload.buyAsset === asset.symbol));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Avatar size="lg" style={{ backgroundColor: asset.iconColor + '22' }}>
            <Avatar.Fallback>
              <Text style={[styles.iconText, { color: asset.iconColor }]}>{asset.symbol.slice(0, 1)}</Text>
            </Avatar.Fallback>
          </Avatar>
          <View>
            <Text style={styles.name}>{asset.name}</Text>
            <Text style={styles.price}>${priceUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
            <PnLBadge value={price24hChangePct} suffix="% (24h)" />
          </View>
        </View>

        <PriceChart data={priceHistory} color={asset.iconColor} height={100} />

        <Card>
          <Card.Body style={styles.cardBody}>
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
            <View style={[styles.statRow, styles.lastRow]}>
              <Text style={styles.statLabel}>Unrealized P&L</Text>
              <PnLBadge value={unrealizedPnLPct} suffix="%" prefix={`$${Math.abs(unrealizedPnL).toLocaleString(undefined, { maximumFractionDigits: 0 })} · `} />
            </View>
          </Card.Body>
        </Card>

        {relatedActions.length > 0 && (
          <Card>
            <Card.Body>
              <Text style={styles.agentNote}>⚡ Agent action pending for {asset.symbol}</Text>
              <Text style={styles.agentDetail}>{relatedActions[0].summary}</Text>
            </Card.Body>
          </Card>
        )}

        <View style={styles.actions}>
          <Button
            variant="outline"
            onPress={() => Alert.alert('Send — Coming Soon', 'Live transaction sending is coming in the next release.', [{ text: 'OK' }])}
            style={styles.actionBtn}
            accessibilityLabel={`Send ${asset.symbol}`}
          >
            Send
          </Button>
          <Button variant="outline" onPress={() => setReceiveVisible(true)} style={styles.actionBtn} accessibilityLabel={`Receive ${asset.symbol}`}>
            Receive
          </Button>
          <Button
            variant="outline"
            onPress={() => Alert.alert('Swap — Coming Soon', 'Token swaps are coming in the next release.', [{ text: 'OK' }])}
            style={styles.actionBtn}
            accessibilityLabel={`Swap ${asset.symbol}`}
          >
            Swap
          </Button>
        </View>
      </ScrollView>

      <Modal visible={receiveVisible} transparent animationType="slide" onRequestClose={() => setReceiveVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setReceiveVisible(false)} accessibilityRole="button" accessibilityLabel="Close receive address modal">
          <Pressable style={styles.modalSheet} onPress={() => {}} accessible={false}>
            <Card>
              <Card.Header>
                <Text style={styles.modalTitle}>Receive {asset.symbol}</Text>
              </Card.Header>
              <Card.Body style={styles.cardBody}>
                <Text style={styles.statLabel}>Your wallet address</Text>
                <Text style={styles.modalAddress} selectable>{primaryAddress}</Text>
                <Text style={styles.modalHint}>Share this address to receive {asset.symbol} and other assets.</Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="outline" onPress={() => setReceiveVisible(false)} style={{ width: '100%' }}>
                  Close
                </Button>
              </Card.Footer>
            </Card>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, gap: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingBottom: 8 },
  iconText: { fontSize: 24, fontWeight: '700' },
  name: { color: colors.text.secondary, fontSize: 14 },
  price: { color: colors.text.primary, fontSize: 28, fontWeight: '700' },
  cardBody: { gap: 0 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border.subtle },
  lastRow: { borderBottomWidth: 0 },
  statLabel: { color: colors.text.secondary, fontSize: 14 },
  statValue: { color: colors.text.primary, fontSize: 14, fontWeight: '500' },
  agentNote: { color: colors.accent.amber, fontSize: 14, fontWeight: '600', marginBottom: 4 },
  agentDetail: { color: colors.text.secondary, fontSize: 13 },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { margin: 16, marginBottom: 32 },
  modalTitle: { color: colors.text.primary, fontSize: 18, fontWeight: '700' },
  modalAddress: { color: colors.text.primary, fontFamily: 'monospace', fontSize: 13, lineHeight: 20, backgroundColor: colors.bg.secondary, padding: 12, borderRadius: 8 },
  modalHint: { color: colors.text.tertiary, fontSize: 13, lineHeight: 18 },
});
