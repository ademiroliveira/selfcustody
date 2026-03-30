import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { AgentStatus } from '../../types/agents';
import { colors } from '../../theme';
import PulsingDot from '../common/PulsingDot';

interface Props { status: AgentStatus }

const statusConfig: Record<AgentStatus, { label: string; color: string }> = {
  idle: { label: 'Idle', color: colors.agent.idle },
  thinking: { label: 'Thinking…', color: colors.agent.thinking },
  alert: { label: 'Alert', color: colors.agent.alert },
  blocked: { label: 'Waiting', color: colors.agent.blocked },
  executing: { label: 'Executing', color: colors.agent.executing },
};

export default function AgentStatusPill({ status }: Props) {
  const { label, color } = statusConfig[status];
  const isActive = status !== 'idle';
  return (
    <View style={[styles.pill, { backgroundColor: color + '22' }]}>
      {isActive ? <PulsingDot color={color} size={6} /> : <View style={[styles.dot, { backgroundColor: color }]} />}
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  label: { fontSize: 13, fontWeight: '700' },
});
