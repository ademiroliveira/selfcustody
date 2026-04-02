import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, AppState, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWalletStore } from '../../store/walletStore';
import { Button, Card, Alert as HeroAlert } from 'heroui-native';
import { colors } from '../../theme';

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
    <View style={styles.fill}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Your Recovery Phrase</Text>
          <Text style={styles.subheading}>
            Write these 12 words down in order. This is the only way to recover your wallet.
          </Text>

          <HeroAlert status="warning" style={styles.warning}>
            <HeroAlert.Indicator />
            <HeroAlert.Content>
              <HeroAlert.Title>Never share this with anyone</HeroAlert.Title>
              <HeroAlert.Description>Never photograph your seed phrase or store it digitally.</HeroAlert.Description>
            </HeroAlert.Content>
          </HeroAlert>

          <View style={styles.grid}>
            {MOCK_SEED.map((word, i) => (
              <Card key={i} style={styles.wordCard}>
                <Card.Body style={styles.wordBody}>
                  <Text style={styles.wordIndex}>{i + 1}</Text>
                  <Text style={[styles.word, blurred && styles.blurredText]}>
                    {blurred ? '••••••' : word}
                  </Text>
                </Card.Body>
              </Card>
            ))}
          </View>

          {blurred && (
            <TouchableOpacity onPress={() => setBlurred(false)} accessibilityRole="button" accessibilityLabel="Reveal seed phrase. Make sure no one is watching">
              <Card style={styles.revealCard}>
                <Card.Body>
                  <Text style={styles.revealText}>Tap to reveal — make sure no one is watching</Text>
                </Card.Body>
              </Card>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setConfirmed(!confirmed)}
            activeOpacity={0.7}
            accessibilityRole="checkbox"
            accessibilityLabel="I have written down all 12 words in a secure location"
            accessibilityState={{ checked: confirmed }}
          >
            <View style={[styles.checkbox, confirmed && styles.checkboxChecked]}>
              {confirmed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkLabel}>I have written down all 12 words in a secure location</Text>
          </TouchableOpacity>

          <Button
            onPress={handleContinue}
            isDisabled={!confirmed}
          >
            Continue
          </Button>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#ffffff' },
  container: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 32, gap: 16 },
  heading: { color: colors.text.primary, fontSize: 26, fontWeight: '800' },
  subheading: { color: colors.text.secondary, fontSize: 15, lineHeight: 22 },
  warning: { marginVertical: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  wordCard: { width: '47%' },
  wordBody: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12 },
  wordIndex: { color: colors.text.tertiary, fontSize: 12, fontWeight: '600', minWidth: 18 },
  word: { color: colors.text.primary, fontSize: 15, fontWeight: '600', fontFamily: 'monospace' },
  blurredText: { color: 'transparent', textShadowColor: colors.text.primary, textShadowRadius: 6 },
  revealCard: { alignItems: 'center' },
  revealText: { color: colors.accent.indigo, fontSize: 14, fontWeight: '500', textAlign: 'center' },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.border.strong, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  checkboxChecked: { backgroundColor: colors.accent.indigo, borderColor: colors.accent.indigo },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  checkLabel: { color: colors.text.secondary, fontSize: 14, flex: 1, lineHeight: 20 },
});
