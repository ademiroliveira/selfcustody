import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface PulsingDotProps {
  color: string;
  size?: number;
}

export default function PulsingDot({ color, size = 8 }: PulsingDotProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.4, duration: 700, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [scale]);

  return (
    <Animated.View
      style={[styles.dot, { width: size, height: size, borderRadius: size / 2, backgroundColor: color, transform: [{ scale }] }]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {},
});
