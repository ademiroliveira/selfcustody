import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme';

type BadgeVariant = 'positive' | 'negative' | 'neutral' | 'alert' | 'indigo';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  positive: { bg: 'rgba(16,185,129,0.15)', text: colors.accent.green },
  negative: { bg: 'rgba(244,63,94,0.15)', text: colors.accent.rose },
  neutral: { bg: 'rgba(71,85,105,0.3)', text: colors.text.secondary },
  alert: { bg: 'rgba(245,158,11,0.15)', text: colors.accent.amber },
  indigo: { bg: 'rgba(99,102,241,0.15)', text: colors.accent.indigo },
};

export default function Badge({ label, variant = 'neutral', style }: BadgeProps) {
  const { bg, text } = variantColors[variant];
  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  label: { fontSize: 12, fontWeight: '600' },
});
