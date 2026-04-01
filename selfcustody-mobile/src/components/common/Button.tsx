import React from 'react';
import { Button as HeroButton } from 'heroui-native';
import { ViewStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

const variantMap: Record<ButtonVariant, 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'> = {
  primary: 'primary',
  secondary: 'outline',
  danger: 'danger',
  ghost: 'ghost',
};

export default function Button({ label, onPress, variant = 'primary', disabled, loading, style }: ButtonProps) {
  return (
    <HeroButton
      variant={variantMap[variant]}
      isDisabled={disabled || loading}
      isLoading={loading}
      onPress={onPress}
      style={style}
    >
      {label}
    </HeroButton>
  );
}
