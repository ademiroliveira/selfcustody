import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StakeFlowParams } from '../../navigation/navigationTypes';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Card, Button } from 'heroui-native';
import { colors } from '../../theme';
import { STAKING_CONFIG } from '../../mocks/staking.mock';

type RouteType = RouteProp<StakeFlowParams, 'StakeConfirm'>;
type NavType = NativeStackNavigationProp<StakeFlowParams, 'StakeConfirm'>;

export default function StakeConfirmScreen() {
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

  const handleGoToEarn = () => {
    // Dismiss the modal stack and navigate to the Earn tab
    nav.getParent()?.navigate('Main' as never, { screen: 'Earn' } as never);
  };

  const handleBackToPortfolio = () => {
    nav.getParent()?.navigate('Main' as never, { screen: 'Portfolio' } as never);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        {/* Success icon */}
        <View style={styles.iconWrap}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Staking Submitted</Text>
        <Text style={styles.subtitle}>
          {amount.toLocaleString(undefined, { maximumFractionDigits: 6 })} {asset.symbol} staked via {config.protocol}
        </Text>

        {/* Rewards highlight */}
        <Card>
          <Card.Body style={styles.rewardsCard}>
            <Text style={styles.rewardsLabel}>Est. annual rewards</Text>
            <Text style={styles.rewardsValue}>
              +${estimatedYearlyUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr
            </Text>
            <Text style={styles.rewardsApy}>at {config.apy}% APY</Text>
          </Card.Body>
        </Card>

        {/* Epoch timing */}
        <View style={styles.epochCard}>
          <Text style={styles.epochTitle}>Activation timeline</Text>
          <View style={styles.epochStep}>
            <View style={[styles.stepDot, { backgroundColor: colors.accent.indigo }]} />
            <Text style={styles.stepText}>Transaction submitted now</Text>
          </View>
          <View style={styles.epochLine} />
          <View style={styles.epochStep}>
            <View style={[styles.stepDot, { backgroundColor: colors.accent.amber }]} />
            <Text style={styles.stepText}>Activating at next epoch boundary</Text>
          </View>
          <View style={styles.epochLine} />
          <View style={styles.epochStep}>
            <View style={[styles.stepDot, { backgroundColor: colors.accent.green }]} />
            <Text style={styles.stepText}>Active — earning rewards in ~48 hrs</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button onPress={handleGoToEarn} style={styles.primaryBtn} accessibilityLabel="Go to Earn Hub" accessibilityRole="button">
            Go to Earn Hub
          </Button>
          <Button variant="outline" onPress={handleBackToPortfolio} style={styles.secondaryBtn} accessibilityLabel="Back to Portfolio" accessibilityRole="button">
            Back to Portfolio
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center', gap: 20 },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent.green + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: { fontSize: 40, color: colors.accent.green },
  title: { color: colors.text.primary, fontSize: 26, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: colors.text.secondary, fontSize: 15, textAlign: 'center', lineHeight: 22 },
  rewardsCard: { alignItems: 'center', gap: 4, paddingVertical: 20 },
  rewardsLabel: { color: colors.text.secondary, fontSize: 14 },
  rewardsValue: { color: colors.accent.green, fontSize: 28, fontWeight: '700' },
  rewardsApy: { color: colors.text.tertiary, fontSize: 13 },
  epochCard: {
    width: '100%',
    backgroundColor: colors.bg.secondary,
    borderRadius: 12,
    padding: 16,
    gap: 0,
  },
  epochTitle: { color: colors.text.primary, fontSize: 13, fontWeight: '600', marginBottom: 12 },
  epochStep: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepDot: { width: 10, height: 10, borderRadius: 5 },
  stepText: { color: colors.text.secondary, fontSize: 13, flex: 1 },
  epochLine: { width: 1, height: 16, backgroundColor: colors.border.default, marginLeft: 4.5, marginVertical: 2 },
  actions: { width: '100%', gap: 10 },
  primaryBtn: { width: '100%' },
  secondaryBtn: { width: '100%' },
});
