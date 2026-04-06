import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'heroui-native';
import type { AgentAction } from '../../types/agents';
import { colors } from '../../theme';

interface Props {
  action: AgentAction;
  onApprove?: () => void;
  onReject?: () => void;
  onDetails?: () => void;
}

export default function SuggestionCard({ action, onApprove, onReject, onDetails }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card style={styles.wrap}>
      <Card.Body style={styles.body}>
        <Text style={styles.title}>{action.title}</Text>
        <Text style={styles.summary} numberOfLines={expanded ? undefined : 2}>{action.reasoning}</Text>
        {action.evidence && expanded && (
          <View style={styles.evidenceList}>
            {action.evidence.map((e, i) => (
              <Text key={i} style={styles.evidence}>· {e}</Text>
            ))}
          </View>
        )}
        {action.isReversible && action.reversibilityNote && (
          <Text style={styles.reversible}>↩ {action.reversibilityNote}</Text>
        )}
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          accessibilityRole="button"
          accessibilityLabel={expanded ? 'Collapse reasoning' : 'Expand reasoning'}
        >
          <Text style={styles.expandLink}>{expanded ? 'Show less' : 'Show full reasoning'}</Text>
        </TouchableOpacity>
        {action.requiresApproval && action.approvalStatus === 'pending' && (
          <View style={styles.actions}>
            <Button
              onPress={onApprove ?? (() => {})}
              style={styles.actionBtn}
              accessibilityLabel="Approve this action"
              accessibilityRole="button"
            >
              Approve
            </Button>
            <Button
              variant="outline"
              onPress={onReject ?? (() => {})}
              style={styles.actionBtn}
              accessibilityLabel="Reject this action"
              accessibilityRole="button"
            >
              Reject
            </Button>
          </View>
        )}
      </Card.Body>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 10 },
  body: { gap: 8 },
  title: { color: colors.text.primary, fontSize: 15, fontWeight: '700' },
  summary: { color: colors.text.secondary, fontSize: 14, lineHeight: 20 },
  evidenceList: {},
  evidence: { color: colors.text.secondary, fontSize: 13, lineHeight: 20 },
  reversible: { color: colors.accent.green, fontSize: 12 },
  expandLink: { color: colors.accent.indigo, fontSize: 13 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 4 },
  actionBtn: { flex: 1 },
});
