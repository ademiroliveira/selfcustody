import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface Props {
  score: number;
  label?: string;
}

export default function CustodyHealthBar({ score, label }: Props) {
  const color = score >= 90 ? colors.accent.green : score >= 70 ? colors.accent.amber : colors.accent.rose;
  const levelLabel = score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Warning' : 'Critical';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{label ?? 'Custody Health'}</Text>
        <Text style={[styles.score, { color }]}>{score}/100 · {levelLabel}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${score}%` as any, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: colors.text.secondary, fontSize: 13, fontWeight: '600' },
  score: { fontSize: 13, fontWeight: '700' },
  track: { height: 8, backgroundColor: colors.bg.elevated, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});
