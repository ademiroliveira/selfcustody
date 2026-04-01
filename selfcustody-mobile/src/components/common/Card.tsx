import React from 'react';
import { Card as HeroCard } from 'heroui-native';
import { ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'alert';
}

export default function Card({ children, style }: CardProps) {
  return (
    <HeroCard style={style}>
      {children}
    </HeroCard>
  );
}
