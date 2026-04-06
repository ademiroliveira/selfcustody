import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParams } from '../../navigation/navigationTypes';
import { Card, Button } from 'heroui-native';
import SectionHeader from '../../components/common/SectionHeader';
import { colors } from '../../theme';
import { STAKING_CONFIG } from '../../mocks/staking.mock';

type NavType = NativeStackNavigationProp<RootStackParams>;

const FEATURED_ASSETS = [
  { id: 'sol', symbol: 'SOL', name: 'Solana', iconColor: '#9945FF', balance: 52.3, balanceUSD: 7427 },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', iconColor: '#627EEA', balance: 2.1, balanceUSD: 6678 },
  { id: 'avax', symbol: 'AVAX', name: 'Avalanche', iconColor: '#E84142', balance: 45.0, balanceUSD: 1845 },
];

export default function EarnHubScreen() {
  const nav = useNavigation<NavType>();

  const handleStake = (assetId: string) => {
    nav.navigate('StakeFlow', { screen: 'StakeAmount', params: { assetId } });
  };

  const solConfig = STAKING_CONFIG['sol'];
  const ethConfig = STAKING_CONFIG['eth'];
  const avaxConfig = STAKING_CONFIG['avax'];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Earn</Text>
          <Text style={styles.subtitle}>Grow your assets through staking</Text>
        </View>

        {/* SOL — Featured / Primary */}
        <Card>
          <Card.Header>
            <View style={styles.cardHeaderRow}>
              <View style={[styles.assetIcon, { backgroundColor: '#9945FF22' }]}>
                <Text style={[styles.iconText, { color: '#9945FF' }]}>S</Text>
              </View>
              <View style={styles.assetTitleBlock}>
                <Text style={styles.assetName}>SOL Native Staking</Text>
                <Text style={styles.protocolLabel}>{solConfig.protocol}</Text>
              </View>
              <View style={styles.apyBadge}>
                <Text style={styles.apyText}>{solConfig.apy}% APY</Text>
              </View>
            </View>
          </Card.Header>
          <Card.Body style={styles.cardBody}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Lock period</Text>
              <Text style={styles.infoValue}>{solConfig.lockPeriodLabel}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Validator</Text>
              <Text style={styles.infoValue}>{solConfig.validatorName}</Text>
            </View>
            <View style={styles.trustRow}>
              <Text style={styles.trustSignal}>No slashing risk · Liquid staking</Text>
            </View>
            <View style={[styles.infoRow, styles.lastRow]}>
              <Text style={styles.infoLabel}>Epoch timing</Text>
              <Text style={styles.infoValue}>Active in ~2 epochs (~48 hrs)</Text>
            </View>
          </Card.Body>
          <Card.Footer>
            <Button
              onPress={() => handleStake('sol')}
              style={styles.stakeBtn}
              accessibilityLabel={`Start staking Solana, ${solConfig.apy}% APY (annual percentage yield)`}
              accessibilityRole="button"
            >
              Start Staking SOL
            </Button>
          </Card.Footer>
        </Card>

        <SectionHeader title="More Staking Options" />

        {/* ETH row */}
        <Card>
          <Card.Body>
            <TouchableOpacity
              style={styles.compactRow}
              onPress={() => handleStake('eth')}
              accessibilityRole="button"
              accessibilityLabel={`Ethereum staking via ${ethConfig.protocol}, ${ethConfig.apy}% APY (annual percentage yield)`}
            >
              <View style={[styles.assetIconSm, { backgroundColor: '#627EEA22' }]}>
                <Text style={[styles.iconTextSm, { color: '#627EEA' }]}>E</Text>
              </View>
              <View style={styles.compactInfo}>
                <Text style={styles.compactName}>Ethereum · {ethConfig.protocol}</Text>
                <Text style={styles.compactSub}>{ethConfig.lockPeriodLabel}</Text>
              </View>
              <View style={styles.compactRight}>
                <Text style={styles.compactApy}>{ethConfig.apy}%</Text>
                <Text style={styles.compactApyLabel}>APY</Text>
              </View>
            </TouchableOpacity>
          </Card.Body>
        </Card>

        {/* AVAX row */}
        <Card>
          <Card.Body>
            <TouchableOpacity
              style={styles.compactRow}
              onPress={() => handleStake('avax')}
              accessibilityRole="button"
              accessibilityLabel={`Avalanche staking via ${avaxConfig.protocol}, ${avaxConfig.apy}% APY (annual percentage yield)`}
            >
              <View style={[styles.assetIconSm, { backgroundColor: '#E8414222' }]}>
                <Text style={[styles.iconTextSm, { color: '#E84142' }]}>A</Text>
              </View>
              <View style={styles.compactInfo}>
                <Text style={styles.compactName}>Avalanche · {avaxConfig.protocol}</Text>
                <Text style={styles.compactSub}>{avaxConfig.lockPeriodLabel}</Text>
              </View>
              <View style={styles.compactRight}>
                <Text style={styles.compactApy}>{avaxConfig.apy}%</Text>
                <Text style={styles.compactApyLabel}>APY</Text>
              </View>
            </TouchableOpacity>
          </Card.Body>
        </Card>

        <Text style={styles.disclaimer}>
          APY estimates are based on current network conditions and may vary. Staking is simulated in this demo.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, gap: 16 },
  header: { paddingBottom: 4 },
  title: { color: colors.text.primary, fontSize: 28, fontWeight: '700' },
  subtitle: { color: colors.text.secondary, fontSize: 15, marginTop: 2 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  assetIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 20, fontWeight: '700' },
  assetTitleBlock: { flex: 1 },
  assetName: { color: colors.text.primary, fontSize: 16, fontWeight: '600' },
  protocolLabel: { color: colors.text.secondary, fontSize: 13, marginTop: 1 },
  apyBadge: { backgroundColor: colors.accent.green + '18', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  apyText: { color: colors.accent.green, fontSize: 13, fontWeight: '700' },
  cardBody: { gap: 0 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: colors.border.subtle },
  lastRow: { borderBottomWidth: 0 },
  infoLabel: { color: colors.text.secondary, fontSize: 14 },
  infoValue: { color: colors.text.primary, fontSize: 14, fontWeight: '500', flexShrink: 1, textAlign: 'right', maxWidth: '60%' },
  trustRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border.subtle },
  trustSignal: { color: colors.accent.green, fontSize: 13, fontWeight: '500' },
  stakeBtn: { width: '100%' },
  compactRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  assetIconSm: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  iconTextSm: { fontSize: 16, fontWeight: '700' },
  compactInfo: { flex: 1 },
  compactName: { color: colors.text.primary, fontSize: 14, fontWeight: '500' },
  compactSub: { color: colors.text.secondary, fontSize: 12, marginTop: 1 },
  compactRight: { alignItems: 'flex-end' },
  compactApy: { color: colors.accent.green, fontSize: 16, fontWeight: '700' },
  compactApyLabel: { color: colors.text.tertiary, fontSize: 11 },
  disclaimer: { color: colors.text.tertiary, fontSize: 12, lineHeight: 17, textAlign: 'center', paddingHorizontal: 8 },
});
