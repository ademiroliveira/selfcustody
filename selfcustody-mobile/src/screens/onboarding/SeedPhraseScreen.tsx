import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, AppState, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useWalletStore } from '../../store/walletStore';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

// Mocked 12-word seed phrase for demo
const MOCK_SEED = [
  'abandon', 'ability', 'capable', 'decade',
  'elegant', 'fortune', 'gallery', 'harbor',
  'impulse', 'journey', 'kingdom', 'lateral',
];

export default function SeedPhraseScreen() {
  const nav = useNavigation<any>();
  const setup = useWalletStore((s) => s.setup);
  const [blurred, setBlurred] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Blur when app goes to background
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      setBlurred(state !== 'active');
    });
    return () => sub.remove();
  }, []);

  const handleContinue = () => {
    if (!confirmed) {
      Alert.alert(
        'Have you written this down?',
        'Your seed phrase cannot be recovered if lost. Make sure it is stored somewhere secure before continuing.',
        [
          { text: 'Not yet', style: 'cancel' },
          { text: "Yes, I've written it down", onPress: () => setup('Primary Wallet', '0xA1b2...C3d4') },
        ],
      );
    } else {
      setup('Primary Wallet', '0xA1b2...C3d4');
    }
  };

  return (
    <LinearGradient colors={['#0d0f1f', '#0A0C14']} style={styles.fill}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Your Recovery Phrase</Text>
        <Text style={styles.subheading}>
          Write these 12 words down in order. This is the only way to recover your wallet.
        </Text>

        <View style={styles.warningRow}>
          <Text style={styles.warningIcon}>⚠</Text>
          <Text style={styles.warningText}>Never share this with anyone. Never photograph it.</Text>
        </View>

        <View style={styles.grid}>
          {MOCK_SEED.map((word, i) => (
            <View key={i} style={styles.wordCard}>
              <Text style={styles.wordIndex}>{i + 1}</Text>
              <Text style={[styles.word, blurred && styles.blurredText]}>
                {blurred ? '••••••' : word}
              </Text>
            </View>
          ))}
        </View>

        {blurred && (
          <TouchableOpacity style={styles.revealBanner} onPress={() => setBlurred(false)}>
            <Text style={styles.revealText}>Tap to reveal — make sure no one is watching</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setConfirmed(!confirmed)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, confirmed && styles.checkboxChecked]}>
            {confirmed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkLabel}>I have written down all 12 words in a secure location</Text>
        </TouchableOpacity>

        <Button
          label="Continue"
          onPress={handleContinue}
          disabled={!confirmed}
          style={styles.btn}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },
  heading: { color: colors.text.primary, fontSize: 26, fontWeight: '800', marginBottom: 8 },
  subheading: { color: colors.text.secondary, fontSize: 15, lineHeight: 22, marginBottom: 16 },
  warningRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(245,158,11,0.1)', borderRadius: 10, padding: 12, marginBottom: 20, gap: 10, borderWidth: 1, borderColor: colors.accent.amber + '44' },
  warningIcon: { fontSize: 18, color: colors.accent.amber },
  warningText: { color: colors.accent.amber, fontSize: 13, flex: 1, fontWeight: '500' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  wordCard: { width: '47%', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg.card, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: colors.border.default, gap: 8 },
  wordIndex: { color: colors.text.tertiary, fontSize: 12, fontWeight: '600', minWidth: 18 },
  word: { color: colors.text.primary, fontSize: 15, fontWeight: '600', fontFamily: 'monospace' },
  blurredText: { color: 'transparent', textShadowColor: colors.text.primary, textShadowRadius: 6 },
  revealBanner: { backgroundColor: colors.bg.elevated, borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: colors.border.default },
  revealText: { color: colors.accent.indigo, fontSize: 14, fontWeight: '500' },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 20 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.border.strong, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  checkboxChecked: { backgroundColor: colors.accent.indigo, borderColor: colors.accent.indigo },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  checkLabel: { color: colors.text.secondary, fontSize: 14, flex: 1, lineHeight: 20 },
  btn: {},
});
