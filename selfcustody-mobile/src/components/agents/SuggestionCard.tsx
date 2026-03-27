import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { AgentAction } from '../../types/agents';
import { colors } from '../../theme';
import Button from '../common/Button';
import Card from '../common/Card';

interface Props {
  action: AgentAction;
  onApprove?: () => void;
  onReject?: () => void;
  onDetails?: () => void;
}

export default function SuggestionCard({ action, onApprove, onReject, onDetails }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card variant={action.type === 'threat-flag' ? 'alert' : 'elevated'} style={styles.card}>
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
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.expandLink}>{expanded ? 'Show less' : 'Show full reasoning'}</Text>
      </TouchableOpacity>
      {action.requiresApproval && action.approvalStatus === 'pending' && (
        <View style={styles.actions}>
          <Button label="Approve" onPress={onApprove ?? (() => {})} style={styles.approveBtn} />
          <Button label="Reject" onPress={onReject ?? (() => {})} variant="danger" style={styles.rejectBtn} />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  title: { color: colors.text.primary, fontSize: 15, fontWeight: '700', marginBottom: 8 },
  summary: { color: colors.text.secondary, fontSize: 14, lineHeight: 20, marginBottom: 8 },
  evidenceList: { marginBottom: 8 },
  evidence: { color: colors.text.secondary, fontSize: 13, lineHeight: 20 },
  reversible: { color: colors.accent.green, fontSize: 12, marginBottom: 8 },
  expandLink: { color: colors.accent.indigo, fontSize: 13, marginBottom: 12 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 4 },
  approveBtn: { flex: 1 },
  rejectBtn: { flex: 1 },
});
