import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

export default function WelcomeScreen() {
  const nav = useNavigation<any>();

  const handleCreate = () => {
    nav.navigate('SeedPhrase');
  };

  return (
    <LinearGradient colors={['#0d0f1f', '#0A0C14']} style={styles.fill}>
      <SafeAreaView style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.logoMark}>⬡</Text>
          <Text style={styles.tagline}>Your keys.{'\n'}Your wealth.</Text>
          <Text style={styles.subtagline}>
            A self-custody wallet built for investors{'\n'}who understand the stakes.
          </Text>
        </View>
        <View style={styles.actions}>
          <Button label="Create New Wallet" onPress={handleCreate} style={styles.primaryBtn} />
          <Button label="Import Existing Wallet" onPress={handleCreate} variant="secondary" style={styles.secondaryBtn} />
          <Text style={styles.disclaimer}>
            Your keys are never stored by this app.{'\n'}You are the sole custodian of your assets.
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24 },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  logoMark: { fontSize: 64, color: colors.accent.indigo },
  tagline: { color: colors.text.primary, fontSize: 40, fontWeight: '800', textAlign: 'center', lineHeight: 46 },
  subtagline: { color: colors.text.secondary, fontSize: 17, textAlign: 'center', lineHeight: 24 },
  actions: { paddingBottom: 40, gap: 12 },
  primaryBtn: {},
  secondaryBtn: {},
  disclaimer: { color: colors.text.tertiary, fontSize: 12, textAlign: 'center', lineHeight: 18, marginTop: 8 },
});
