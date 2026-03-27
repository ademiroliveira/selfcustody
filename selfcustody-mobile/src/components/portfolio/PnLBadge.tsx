import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface PnLBadgeProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

export default function PnLBadge({ value, suffix = '%', prefix = '' }: PnLBadgeProps) {
  const isPositive = value >= 0;
  const color = isPositive ? colors.text.positive : colors.text.negative;
  const sign = isPositive ? '+' : '';
  return (
    <Text style={[styles.text, { color }]}>
      {prefix}{sign}{value.toFixed(2)}{suffix}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 13, fontWeight: '600' },
});
