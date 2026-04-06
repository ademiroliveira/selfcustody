import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme';

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export default function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action && (
        <TouchableOpacity onPress={onAction} accessibilityRole="button" accessibilityLabel={action}>
          <Text style={styles.action}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { color: colors.text.tertiary, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  action: { color: colors.accent.indigo, fontSize: 13, fontWeight: '500' },
});
