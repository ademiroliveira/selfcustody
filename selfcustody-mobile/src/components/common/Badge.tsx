import React from 'react';
import { Chip } from 'heroui-native';
import { ViewStyle } from 'react-native';

type BadgeVariant = 'positive' | 'negative' | 'neutral' | 'alert' | 'indigo';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const variantMap: Record<BadgeVariant, 'success' | 'danger' | 'default' | 'warning' | 'primary'> = {
  positive: 'success',
  negative: 'danger',
  neutral: 'default',
  alert: 'warning',
  indigo: 'primary',
};

export default function Badge({ label, variant = 'neutral', style }: BadgeProps) {
  return (
    <Chip color={variantMap[variant]} size="sm" style={style}>
      {label}
    </Chip>
  );
}
