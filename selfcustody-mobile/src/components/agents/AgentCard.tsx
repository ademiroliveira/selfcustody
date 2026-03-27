import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Agent } from '../../types/agents';
import { colors } from '../../theme';
import AgentStatusPill from './AgentStatusPill';
import Card from '../common/Card';

const agentEmoji: Record<string, string> = {
  'portfolio-intelligence': '◈',
  'trade-executor': '⚡',
  'chat-assistant': '◉',
  'threat-monitor': '⬡',
};

interface Props {
  agent: Agent;
  onPress?: () => void;
}

export default function AgentCard({ agent, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card variant={agent.status === 'alert' ? 'alert' : 'default'} style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{agentEmoji[agent.id] ?? '◆'}</Text>
          <View style={styles.info}>
            <Text style={styles.name}>{agent.name}</Text>
            <AgentStatusPill status={agent.status} />
          </View>
          {agent.pendingActionCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{agent.pendingActionCount}</Text>
            </View>
          )}
        </View>
        {agent.lastAction && (
          <Text style={styles.lastAction} numberOfLines={2}>{agent.lastAction}</Text>
        )}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  emoji: { fontSize: 24, marginRight: 12 },
  info: { flex: 1, gap: 4 },
  name: { color: colors.text.primary, fontSize: 15, fontWeight: '600' },
  lastAction: { color: colors.text.secondary, fontSize: 13, lineHeight: 18 },
  badge: { backgroundColor: colors.accent.rose, borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
