import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AgentStackParams } from '../../navigation/navigationTypes';
import { useAgentStore } from '../../store/agentStore';
import { useApprovalQueue } from '../../hooks/useApprovalQueue';
import { useNewsDigest } from '../../hooks/useNewsDigest';
import { Button, Card } from 'heroui-native';
import AgentCard from '../../components/agents/AgentCard';
import SuggestionCard from '../../components/agents/SuggestionCard';
import NewsItem from '../../components/agents/NewsItem';
import SectionHeader from '../../components/common/SectionHeader';
import { colors } from '../../theme';

type Nav = NativeStackNavigationProp<AgentStackParams, 'AgentHub'>;

export default function AgentHubScreen() {
  const nav = useNavigation<Nav>();
  const agents = useAgentStore((s) => s.agents);
  const approveAction = useAgentStore((s) => s.approveAction);
  const rejectAction = useAgentStore((s) => s.rejectAction);
  const approvalQueue = useApprovalQueue();
  const { data: news } = useNewsDigest();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Agents</Text>

        <View style={styles.section}>
          <SectionHeader title="Active Agents" />
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onPress={() => agent.id === 'chat-assistant' ? nav.navigate('Chat', {}) : undefined}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title={approvalQueue.length > 0 ? `Pending Approval (${approvalQueue.length})` : 'Pending Approval'}
          />
          {approvalQueue.length > 0 ? (
            approvalQueue.map((action) => (
              <SuggestionCard
                key={action.id}
                action={action}
                onApprove={() => approveAction(action.id)}
                onReject={() => rejectAction(action.id)}
                onDetails={() => nav.navigate('ApprovalDetail', { actionId: action.id })}
              />
            ))
          ) : (
            <Card>
              <Card.Body style={styles.emptyBody}>
                <Text style={styles.emptyIcon}>✦</Text>
                <Text style={styles.emptyText}>No pending approvals</Text>
                <Text style={styles.emptySubtext}>
                  Agents are watching your portfolio. Any actions requiring your approval will appear here.
                </Text>
              </Card.Body>
            </Card>
          )}
        </View>

        {news && (
          <View style={styles.section}>
            <SectionHeader title="Market Intelligence" />
            {news.items.map((item, i) => (
              <NewsItem key={i} item={item} />
            ))}
          </View>
        )}

        <Button onPress={() => nav.navigate('Chat', {})} style={styles.chatBtn}>
          Ask the AI Assistant
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, paddingBottom: 32 },
  heading: { color: colors.text.primary, fontSize: 28, fontWeight: '800', marginBottom: 20 },
  section: { marginBottom: 24 },
  emptyBody: { alignItems: 'center', paddingVertical: 24, gap: 6 },
  emptyIcon: { fontSize: 24, color: colors.text.tertiary },
  emptyText: { color: colors.text.secondary, fontSize: 15, fontWeight: '600' },
  emptySubtext: { color: colors.text.tertiary, fontSize: 13, textAlign: 'center', lineHeight: 18 },
  chatBtn: { marginTop: 8 },
});
