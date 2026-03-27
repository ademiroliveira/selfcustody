import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'alert';
}

export default function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View style={[styles.card, variant === 'elevated' && styles.elevated, variant === 'alert' && styles.alert, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.bg.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border.subtle },
  elevated: { backgroundColor: colors.bg.elevated, borderColor: colors.border.default },
  alert: { backgroundColor: colors.bg.card, borderColor: colors.accent.rose },
});
