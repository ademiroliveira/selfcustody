import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Avatar, Chip } from 'heroui-native';
import type { Agent } from '../../types/agents';
import { colors } from '../../theme';
import AgentStatusPill from './AgentStatusPill';

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
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.wrap} accessibilityRole="button" accessibilityLabel={`${agent.name}. Status: ${agent.status}${agent.pendingActionCount > 0 ? `. ${agent.pendingActionCount} pending action${agent.pendingActionCount > 1 ? 's' : ''}` : ''}`}>
      <Card variant={agent.status === 'alert' ? 'secondary' : 'default'}>
        <Card.Body style={styles.body}>
          <View style={styles.header}>
            <Avatar size="md">
              <Avatar.Fallback>
                <Text style={styles.emoji}>{agentEmoji[agent.id] ?? '◆'}</Text>
              </Avatar.Fallback>
            </Avatar>
            <View style={styles.info}>
              <Text style={styles.name}>{agent.name}</Text>
              <AgentStatusPill status={agent.status} />
            </View>
            {agent.pendingActionCount > 0 && (
              <Chip color="danger" size="sm">{String(agent.pendingActionCount)}</Chip>
            )}
          </View>
          {agent.lastAction && (
            <Text style={styles.lastAction} numberOfLines={2}>{agent.lastAction}</Text>
          )}
        </Card.Body>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 10 },
  body: { gap: 8 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  emoji: { fontSize: 18, fontWeight: '700' },
  info: { flex: 1, gap: 4 },
  name: { color: colors.text.primary, fontSize: 15, fontWeight: '600' },
  lastAction: { color: colors.text.secondary, fontSize: 13, lineHeight: 18 },
});
