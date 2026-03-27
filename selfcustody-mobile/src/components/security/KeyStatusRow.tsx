import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { KeyStatus } from '../../types/custody';
import { colors } from '../../theme';
import Badge from '../common/Badge';

interface Props { keyStatus: KeyStatus }

const locationEmoji: Record<string, string> = {
  'device-secure-enclave': '📱',
  'icloud-keychain': '☁',
  'hardware-wallet': '🔒',
  multisig: '🔑',
};

export default function KeyStatusRow({ keyStatus }: Props) {
  const backupColor = keyStatus.backupStatus === 'backed-up' ? 'positive' as const : keyStatus.backupStatus === 'stale' ? 'alert' as const : 'negative' as const;
  return (
    <View style={styles.row}>
      <Text style={styles.emoji}>{locationEmoji[keyStatus.location] ?? '🔑'}</Text>
      <View style={styles.info}>
        <Text style={styles.label}>{keyStatus.label}</Text>
        <Text style={styles.meta}>{keyStatus.publicKeyFingerprint} · {keyStatus.associatedChains.join(', ')}</Text>
      </View>
      <Badge label={keyStatus.backupStatus.replace('-', ' ')} variant={backupColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  emoji: { fontSize: 22 },
  info: { flex: 1 },
  label: { color: colors.text.primary, fontSize: 14, fontWeight: '500' },
  meta: { color: colors.text.tertiary, fontSize: 12, marginTop: 2 },
});
