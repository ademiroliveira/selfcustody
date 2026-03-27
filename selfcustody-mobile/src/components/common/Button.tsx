import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { colors } from '../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export default function Button({ label, onPress, variant = 'primary', disabled, loading, style }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], (disabled || loading) && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' ? colors.accent.indigo : '#fff'} />
      ) : (
        <Text style={[styles.label, variant === 'ghost' && styles.ghostLabel, variant === 'danger' && styles.dangerLabel]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 12, paddingVertical: 14, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: colors.accent.indigo },
  secondary: { backgroundColor: colors.bg.elevated, borderWidth: 1, borderColor: colors.border.default },
  danger: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.accent.rose },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.5 },
  label: { color: colors.text.primary, fontSize: 16, fontWeight: '600' },
  ghostLabel: { color: colors.accent.indigo },
  dangerLabel: { color: colors.accent.rose },
});
