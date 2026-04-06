import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StakeFlowParams } from '../../navigation/navigationTypes';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Avatar, Card, Button } from 'heroui-native';
import { colors } from '../../theme';
import { STAKING_CONFIG } from '../../mocks/staking.mock';

type RouteType = RouteProp<StakeFlowParams, 'StakeReview'>;
type NavType = NativeStackNavigationProp<StakeFlowParams, 'StakeReview'>;

export default function StakeReviewScreen() {
  const route = useRoute<RouteType>();
  const nav = useNavigation<NavType>();
  const portfolio = usePortfolioStore((s) => s.portfolio);

  const { assetId, amount } = route.params;
  const position = portfolio.positions.find((p) => p.asset.id === assetId);
  if (!position) return null;

  const { asset, priceUSD } = position;
  const config = STAKING_CONFIG[asset.id];
  if (!config) return null;

  const amountUSD = amount * priceUSD;
  const estimatedYearlyUSD = amountUSD * (config.apy / 100);

  const handleConfirm = () => {
    nav.navigate('StakeConfirm', { assetId: asset.id, amount });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Asset header */}
        <View style={styles.header}>
          <Avatar size="lg" style={{ backgroundColor: asset.iconColor + '22' }}>
            <Avatar.Fallback>
              <Text style={[styles.iconText, { color: asset.iconColor }]}>{asset.symbol.slice(0, 1)}</Text>
            </Avatar.Fallback>
          </Avatar>
          <View>
            <Text style={styles.assetName}>{asset.name}</Text>
            <Text style={styles.reviewLabel}>Review your stake</Text>
          </View>
        </View>

        {/* Transaction summary */}
        <Card>
          <Card.Body style={styles.cardBody}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>You are staking</Text>
              <View style={styles.statRight}>
                <Text style={styles.statValueLarge}>
                  {amount.toLocaleString(undefined, { maximumFractionDigits: 6 })} {asset.symbol}
                </Text>
                <Text style={styles.statSubValue}>
                  ${amountUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Protocol</Text>
              <Text style={styles.statValue}>{config.protocol}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Validator</Text>
              <Text style={styles.statValue}>{config.validatorName}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Est. APY</Text>
              <View style={styles.apyBadge}>
                <Text style={styles.apyText}>{config.apy}%</Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Lock period</Text>
              <Text style={styles.statValue}>{config.lockPeriodLabel}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Activation timing</Text>
              <Text style={styles.statValue}>Active next epoch · ~48 hrs</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Est. yearly rewards</Text>
              <Text style={[styles.statValue, { color: colors.accent.green }]}>
                +${estimatedYearlyUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </Text>
            </View>
            <View style={[styles.statRow, styles.lastRow]}>
              <Text style={styles.statLabel}>Network fee</Text>
              <Text style={[styles.statValue, styles.feeText]}>
                ~${config.feeEstimateUSD.toFixed(2)} (estimated)
              </Text>
            </View>
          </Card.Body>
        </Card>

        {/* Validator note */}
        <Card>
          <Card.Body>
            <Text style={styles.validatorNoteTitle}>About this validator</Text>
            <Text style={styles.validatorNote}>{config.validatorNote}</Text>
          </Card.Body>
        </Card>

        {/* Demo disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            Staking is simulated in this demo. No real transaction will be submitted.
          </Text>
        </View>

        <Button onPress={handleConfirm} style={styles.confirmBtn}>
          Confirm & Stake
        </Button>

        <Button variant="outline" onPress={() => nav.goBack()} style={styles.backBtn}>
          Go Back
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, gap: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingBottom: 4 },
  iconText: { fontSize: 24, fontWeight: '700' },
  assetName: { color: colors.text.primary, fontSize: 18, fontWeight: '700' },
  reviewLabel: { color: colors.text.secondary, fontSize: 14, marginTop: 2 },
  cardBody: { gap: 0 },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  lastRow: { borderBottomWidth: 0 },
  statLabel: { color: colors.text.secondary, fontSize: 14 },
  statValue: { color: colors.text.primary, fontSize: 14, fontWeight: '500', textAlign: 'right', flexShrink: 1, maxWidth: '58%' },
  statValueLarge: { color: colors.text.primary, fontSize: 16, fontWeight: '700', textAlign: 'right' },
  statSubValue: { color: colors.text.secondary, fontSize: 13, textAlign: 'right', marginTop: 1 },
  statRight: { alignItems: 'flex-end' },
  feeText: { color: colors.text.tertiary },
  apyBadge: { backgroundColor: colors.accent.green + '18', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  apyText: { color: colors.accent.green, fontSize: 13, fontWeight: '700' },
  validatorNoteTitle: { color: colors.text.primary, fontSize: 13, fontWeight: '600', marginBottom: 4 },
  validatorNote: { color: colors.text.secondary, fontSize: 13, lineHeight: 19 },
  disclaimer: {
    backgroundColor: colors.accent.amber + '14',
    borderLeftWidth: 3,
    borderLeftColor: colors.accent.amber,
    padding: 12,
    borderRadius: 8,
  },
  disclaimerText: { color: colors.accent.amber, fontSize: 13, lineHeight: 18 },
  confirmBtn: { width: '100%' },
  backBtn: { width: '100%' },
});
