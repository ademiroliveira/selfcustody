import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { MOCK_TRANSACTIONS } from '../../mocks/transactions.mock';
import { useApprovalQueue } from '../../hooks/useApprovalQueue';
import { useAgentStore } from '../../store/agentStore';
import TxRow from '../../components/activity/TxRow';
import SuggestionCard from '../../components/agents/SuggestionCard';
import { colors } from '../../theme';

type Tab = 'history' | 'pending';

export default function ActivityScreen() {
  const [tab, setTab] = useState<Tab>('history');
  const approvalQueue = useApprovalQueue();
  const approveAction = useAgentStore((s) => s.approveAction);
  const rejectAction = useAgentStore((s) => s.rejectAction);
  const pendingTxs = MOCK_TRANSACTIONS.filter((t) => t.status === 'pending');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.heading}>Activity</Text>
        <View style={styles.tabs}>
          {(['history', 'pending'] as Tab[]).map((t) => (
            <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.activeTab]} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, tab === t && styles.activeTabText]}>
                {t === 'pending' && (pendingTxs.length + approvalQueue.length) > 0
                  ? `Pending (${pendingTxs.length + approvalQueue.length})`
                  : t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {tab === 'history' ? (
        <FlatList
          data={MOCK_TRANSACTIONS.filter((t) => t.status !== 'pending')}
          keyExtractor={(t) => t.id}
          renderItem={({ item }) => <TxRow tx={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <FlatList
          data={[...approvalQueue.map((a) => ({ type: 'approval' as const, data: a })), ...pendingTxs.map((t) => ({ type: 'tx' as const, data: t }))]}
          keyExtractor={(item) => item.data.id}
          contentContainerStyle={styles.pendingList}
          renderItem={({ item }) =>
            item.type === 'approval' ? (
              <SuggestionCard
                action={item.data as any}
                onApprove={() => approveAction((item.data as any).id)}
                onReject={() => rejectAction((item.data as any).id)}
              />
            ) : (
              <TxRow tx={item.data as any} />
            )
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  heading: { color: colors.text.primary, fontSize: 28, fontWeight: '800', marginBottom: 16 },
  tabs: { flexDirection: 'row', gap: 4, backgroundColor: colors.bg.secondary, borderRadius: 10, padding: 4 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: colors.bg.card },
  tabText: { color: colors.text.tertiary, fontSize: 14, fontWeight: '500' },
  activeTabText: { color: colors.text.primary, fontWeight: '600' },
  separator: { height: 1, backgroundColor: colors.border.subtle, marginHorizontal: 16 },
  pendingList: { padding: 16 },
});
