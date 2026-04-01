import React from 'react';
import { Skeleton as HeroSkeleton } from 'heroui-native';
import { ViewStyle } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export default function Skeleton({ width = '100%', height = 16, borderRadius = 8, style }: SkeletonProps) {
  return (
    <HeroSkeleton
      style={[{ width: width as number, height, borderRadius }, style]}
    />
  );
}
