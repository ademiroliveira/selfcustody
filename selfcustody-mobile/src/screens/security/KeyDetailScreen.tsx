import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { SecurityStackParams } from '../../navigation/navigationTypes';
import { useCustodyHealth } from '../../hooks/useCustodyHealth';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { colors } from '../../theme';
import { formatDistanceToNow } from 'date-fns';

type RouteType = RouteProp<SecurityStackParams, 'KeyDetail'>;

export default function KeyDetailScreen() {
  const route = useRoute<RouteType>();
  const custody = useCustodyHealth();
  const key = custody.keys.find((k) => k.id === route.params.keyId);
  if (!key) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>{key.label}</Text>
        <Card style={styles.card}>
          {[
            ['Location', key.location.replace(/-/g, ' ')],
            ['Fingerprint', key.publicKeyFingerprint],
            ['Chains', key.associatedChains.join(', ')],
            ['Last Verified', formatDistanceToNow(key.lastVerifiedAt, { addSuffix: true })],
          ].map(([l, v]) => (
            <View key={l} style={styles.row}>
              <Text style={styles.rowLabel}>{l}</Text>
              <Text style={styles.rowValue}>{v}</Text>
            </View>
          ))}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Backup</Text>
            <Badge label={key.backupStatus.replace('-', ' ')} variant={key.backupStatus === 'backed-up' ? 'positive' : 'negative'} />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, gap: 16 },
  label: { color: colors.text.primary, fontSize: 22, fontWeight: '700' },
  card: {},
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border.subtle },
  rowLabel: { color: colors.text.secondary, fontSize: 14 },
  rowValue: { color: colors.text.primary, fontSize: 14, fontWeight: '500', textAlign: 'right', flex: 1, marginLeft: 16 },
});
