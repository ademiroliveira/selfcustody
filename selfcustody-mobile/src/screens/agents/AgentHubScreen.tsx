import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AgentStackParams } from '../../navigation/navigationTypes';
import { useAgentStore } from '../../store/agentStore';
import { useApprovalQueue } from '../../hooks/useApprovalQueue';
import { useNewsDigest } from '../../hooks/useNewsDigest';
import AgentCard from '../../components/agents/AgentCard';
import SuggestionCard from '../../components/agents/SuggestionCard';
import NewsItem from '../../components/agents/NewsItem';
import SectionHeader from '../../components/common/SectionHeader';
import Button from '../../components/common/Button';
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
          <SectionHeader title={approvalQueue.length > 0 ? `Pending Approval (${approvalQueue.length})` : 'Pending Approval'} />
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
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>✦</Text>
              <Text style={styles.emptyText}>No pending approvals</Text>
              <Text style={styles.emptySubtext}>Agents are watching your portfolio. Any actions requiring your approval will appear here.</Text>
            </View>
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

        <Button
          label="Ask the AI Assistant"
          onPress={() => nav.navigate('Chat', {})}
          style={styles.chatBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, paddingBottom: 32 },
  heading: { color: colors.text.primary, fontSize: 28, fontWeight: '800', marginBottom: 20 },
  section: { marginBottom: 24 },
  chatBtn: { marginTop: 8 },
  emptyState: { alignItems: 'center', paddingVertical: 24, backgroundColor: colors.bg.card, borderRadius: 16, borderWidth: 1, borderColor: colors.border.subtle },
  emptyIcon: { fontSize: 24, marginBottom: 8, color: colors.text.tertiary },
  emptyText: { color: colors.text.secondary, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  emptySubtext: { color: colors.text.tertiary, fontSize: 13, textAlign: 'center', paddingHorizontal: 24, lineHeight: 18 },
});
