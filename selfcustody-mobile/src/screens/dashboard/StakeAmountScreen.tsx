import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StakeFlowParams } from '../../navigation/navigationTypes';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Avatar, Card, Button } from 'heroui-native';
import { colors } from '../../theme';
import { STAKING_CONFIG } from '../../mocks/staking.mock';

type RouteType = RouteProp<StakeFlowParams, 'StakeAmount'>;
type NavType = NativeStackNavigationProp<StakeFlowParams, 'StakeAmount'>;

export default function StakeAmountScreen() {
  const route = useRoute<RouteType>();
  const nav = useNavigation<NavType>();
  const portfolio = usePortfolioStore((s) => s.portfolio);
  const [amountText, setAmountText] = useState('');

  const position = portfolio.positions.find((p) => p.asset.id === route.params.assetId);
  if (!position) return null;

  const { asset, balance, balanceUSD, priceUSD } = position;
  const config = STAKING_CONFIG[asset.id];
  if (!config) return null;

  const amountNum = parseFloat(amountText) || 0;
  const amountUSD = amountNum * priceUSD;
  const estimatedYearlyUSD = amountUSD * (config.apy / 100);
  const wouldLeave = balance - amountNum;
  const showLiquidityWarning = amountNum > 0 && wouldLeave < config.liquidityGuardToken;
  const isValid = amountNum >= config.minStakeToken && amountNum <= balance;

  const handleMax = () => {
    const safeMax = Math.max(0, balance - config.liquidityGuardToken);
    setAmountText(safeMax.toString());
  };

  const handleContinue = () => {
    nav.navigate('StakeReview', { assetId: asset.id, amount: amountNum });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Asset header */}
          <View style={styles.header}>
            <Avatar size="lg" style={{ backgroundColor: asset.iconColor + '22' }}>
              <Avatar.Fallback>
                <Text style={[styles.iconText, { color: asset.iconColor }]}>{asset.symbol.slice(0, 1)}</Text>
              </Avatar.Fallback>
            </Avatar>
            <View>
              <Text style={styles.assetName}>{asset.name}</Text>
              <Text style={styles.balanceLabel}>
                Available: {balance.toLocaleString(undefined, { maximumFractionDigits: 6 })} {asset.symbol}
              </Text>
            </View>
          </View>

          {/* Amount input */}
          <Card>
            <Card.Body style={styles.inputCard}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.amountInput}
                  value={amountText}
                  onChangeText={setAmountText}
                  placeholder="0.00"
                  placeholderTextColor={colors.text.tertiary}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  accessibilityLabel={`Stake amount in ${asset.symbol}`}
                />
                <Text style={styles.symbolLabel}>{asset.symbol}</Text>
              </View>

              <Text style={styles.usdEquiv}>
                {amountNum > 0
                  ? `≈ $${amountUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                  : ' '}
              </Text>

              <TouchableOpacity
                style={styles.maxBtn}
                onPress={handleMax}
                accessibilityRole="button"
                accessibilityLabel="Set maximum stakeable amount"
              >
                <Text style={styles.maxBtnText}>MAX</Text>
              </TouchableOpacity>
            </Card.Body>
          </Card>

          {/* Liquidity guardrail */}
          {showLiquidityWarning && (
            <View style={styles.guardrail}>
              <Text style={styles.guardrailText}>
                Keep at least {config.liquidityGuardToken} {asset.symbol} for network fees
              </Text>
            </View>
          )}

          {/* Staking info */}
          <Card>
            <Card.Body style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Protocol</Text>
                <Text style={styles.infoValue}>{config.protocol}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Est. APY</Text>
                <View style={styles.apyBadge}>
                  <Text style={styles.apyText}>{config.apy}%</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Lock period</Text>
                <Text style={styles.infoValue}>{config.lockPeriodLabel}</Text>
              </View>
              {amountNum > 0 && (
                <View style={[styles.infoRow, styles.lastRow]}>
                  <Text style={styles.infoLabel}>Est. yearly rewards</Text>
                  <Text style={[styles.infoValue, { color: colors.accent.green }]}>
                    +${estimatedYearlyUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </Text>
                </View>
              )}
            </Card.Body>
          </Card>

          <Text style={styles.epochNote}>Active in ~2 epochs · ~48 hours after staking</Text>

          <Button
            onPress={handleContinue}
            disabled={!isValid}
            style={[styles.continueBtn, !isValid && styles.continueBtnDisabled]}
            accessibilityLabel="Continue to stake review"
            accessibilityRole="button"
          >
            Continue
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, gap: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingBottom: 4 },
  iconText: { fontSize: 24, fontWeight: '700' },
  assetName: { color: colors.text.primary, fontSize: 18, fontWeight: '700' },
  balanceLabel: { color: colors.text.secondary, fontSize: 14, marginTop: 2 },
  inputCard: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  amountInput: {
    color: colors.text.primary,
    fontSize: 40,
    fontWeight: '700',
    minWidth: 80,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.accent.indigo,
    paddingBottom: 4,
  },
  symbolLabel: { color: colors.text.secondary, fontSize: 20, fontWeight: '600' },
  usdEquiv: { color: colors.text.secondary, fontSize: 16, minHeight: 22 },
  maxBtn: {
    backgroundColor: colors.accent.indigo + '18',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 4,
  },
  maxBtnText: { color: colors.accent.indigo, fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
  guardrail: {
    backgroundColor: colors.accent.amber + '18',
    borderLeftWidth: 3,
    borderLeftColor: colors.accent.amber,
    padding: 12,
    borderRadius: 8,
  },
  guardrailText: { color: colors.accent.amber, fontSize: 13, fontWeight: '500' },
  infoCard: { gap: 0 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  lastRow: { borderBottomWidth: 0 },
  infoLabel: { color: colors.text.secondary, fontSize: 14 },
  infoValue: { color: colors.text.primary, fontSize: 14, fontWeight: '500', textAlign: 'right', flexShrink: 1, maxWidth: '60%' },
  apyBadge: { backgroundColor: colors.accent.green + '18', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  apyText: { color: colors.accent.green, fontSize: 13, fontWeight: '700' },
  epochNote: { color: colors.text.tertiary, fontSize: 13, textAlign: 'center' },
  continueBtn: { width: '100%' },
  continueBtnDisabled: { opacity: 0.4 },
});
