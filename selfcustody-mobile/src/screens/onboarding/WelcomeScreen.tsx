import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'heroui-native';

export default function WelcomeScreen() {
  const nav = useNavigation<any>();

  const handleCreate = () => {
    nav.navigate('SeedPhrase');
  };

  const handleImport = () => {
    Alert.alert(
      'Import Coming Soon',
      'Wallet import (12 or 24-word seed phrase) is coming in the next release. For now, create a new wallet to explore the app.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.fill}>
      <SafeAreaView style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.logoMark}>⬡</Text>
          <Text style={styles.tagline}>Your keys.{'\n'}Your wealth.</Text>
          <Text style={styles.subtagline}>
            A self-custody wallet built for investors{'\n'}who understand the stakes.
          </Text>
        </View>
        <View style={styles.actions}>
          <Button onPress={handleCreate} style={styles.btn}>
            Create New Wallet
          </Button>
          <Button variant="outline" onPress={handleImport} style={styles.btn}>
            Import Existing Wallet
          </Button>
          <Text style={styles.disclaimer}>
            Your keys are never stored by this app.{'\n'}You are the sole custodian of your assets.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#ffffff' },
  container: { flex: 1, paddingHorizontal: 24 },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  logoMark: { fontSize: 72, color: '#6366F1' },
  tagline: { color: '#0f172a', fontSize: 40, fontWeight: '800', textAlign: 'center', lineHeight: 46 },
  subtagline: { color: '#64748b', fontSize: 17, textAlign: 'center', lineHeight: 24 },
  actions: { paddingBottom: 40, gap: 12 },
  btn: { width: '100%' },
  disclaimer: { color: '#94a3b8', fontSize: 12, textAlign: 'center', lineHeight: 18, marginTop: 8 },
});
