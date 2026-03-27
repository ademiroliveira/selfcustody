import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { AgentStackParams } from '../../navigation/navigationTypes';
import { useAgentStore } from '../../store/agentStore';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { colors } from '../../theme';

type RouteType = RouteProp<AgentStackParams, 'ApprovalDetail'>;

export default function ApprovalDetailScreen() {
  const route = useRoute<RouteType>();
  const nav = useNavigation();
  const allActions = useAgentStore((s) => s.allActions);
  const approveAction = useAgentStore((s) => s.approveAction);
  const rejectAction = useAgentStore((s) => s.rejectAction);

  const action = allActions.find((a) => a.id === route.params.actionId);
  if (!action) return null;

  const handleApprove = () => { approveAction(action.id); nav.goBack(); };
  const handleReject = () => { rejectAction(action.id); nav.goBack(); };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{action.title}</Text>
        <Text style={styles.agentLabel}>Proposed by: {action.agentId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</Text>

        <Card variant="elevated" style={styles.card}>
          <Text style={styles.sectionLabel}>Reasoning</Text>
          <Text style={styles.reasoning}>{action.reasoning}</Text>
        </Card>

        {action.evidence && (
          <Card style={styles.card}>
            <Text style={styles.sectionLabel}>Evidence</Text>
            {action.evidence.map((e, i) => (
              <Text key={i} style={styles.evidenceItem}>· {e}</Text>
            ))}
          </Card>
        )}

        <Card variant={action.isReversible ? 'default' : 'alert'} style={styles.card}>
          <Text style={styles.sectionLabel}>Reversibility</Text>
          <Text style={[styles.reversible, { color: action.isReversible ? colors.accent.green : colors.accent.rose }]}>
            {action.isReversible ? '✓ Reversible' : '⚠ Not reversible'}
          </Text>
          {action.reversibilityNote && <Text style={styles.reversibleNote}>{action.reversibilityNote}</Text>}
        </Card>

        {action.requiresApproval && action.approvalStatus === 'pending' && (
          <View style={styles.actions}>
            <Button label="Approve" onPress={handleApprove} style={styles.btn} />
            <Button label="Reject" onPress={handleReject} variant="danger" style={styles.btn} />
          </View>
        )}
        {action.approvalStatus !== 'pending' && (
          <Text style={styles.resolved}>
            {action.approvalStatus === 'approved' ? '✓ Approved' : action.approvalStatus === 'rejected' ? '✗ Rejected' : 'Expired'}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, gap: 16 },
  title: { color: colors.text.primary, fontSize: 22, fontWeight: '800', lineHeight: 28 },
  agentLabel: { color: colors.text.secondary, fontSize: 14 },
  card: {},
  sectionLabel: { color: colors.text.tertiary, fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  reasoning: { color: colors.text.primary, fontSize: 15, lineHeight: 22 },
  evidenceItem: { color: colors.text.secondary, fontSize: 14, lineHeight: 22 },
  reversible: { fontSize: 15, fontWeight: '600' },
  reversibleNote: { color: colors.text.secondary, fontSize: 13, marginTop: 4 },
  actions: { flexDirection: 'row', gap: 12 },
  btn: { flex: 1 },
  resolved: { color: colors.text.secondary, fontSize: 16, textAlign: 'center', paddingVertical: 16 },
});
