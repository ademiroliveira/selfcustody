import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useWalletStore } from '../../store/walletStore';
import { Button } from 'heroui-native';
import { colors } from '../../theme';

const DEFAULT_NAME = 'My Sovereign Wallet';

export default function WalletNameScreen() {
  const setup = useWalletStore((s) => s.setup);
  const [name, setName] = useState('');

  const handleCreate = () => {
    setup(name.trim() || DEFAULT_NAME, '0xA1b2...C3d4');
  };

  return (
    <View style={styles.fill}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.inner} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.top}>
            <Text style={styles.heading}>Name your wallet</Text>
            <Text style={styles.subheading}>
              This is only stored on your device. Use something memorable.
            </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Alex's Vault"
              placeholderTextColor="#94a3b8"
              maxLength={32}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleCreate}
              accessibilityLabel="Wallet name input"
              accessibilityHint="Enter a memorable name for your wallet"
            />
            <Text style={styles.hint}>Leave blank to use "{DEFAULT_NAME}"</Text>
          </View>
          <View style={styles.bottom}>
            <Button
              onPress={handleCreate}
              style={styles.btn}
              accessibilityLabel="Create wallet"
              accessibilityRole="button"
            >
              Create Wallet
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#ffffff' },
  container: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40, justifyContent: 'space-between' },
  top: { gap: 16 },
  heading: { color: colors.text.primary, fontSize: 26, fontWeight: '800' },
  subheading: { color: colors.text.secondary, fontSize: 15, lineHeight: 22 },
  input: {
    borderWidth: 1.5,
    borderColor: colors.accent.indigo,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 17,
    color: colors.text.primary,
    fontWeight: '500',
  },
  hint: { color: colors.text.tertiary, fontSize: 13 },
  bottom: {},
  btn: { width: '100%' },
});
