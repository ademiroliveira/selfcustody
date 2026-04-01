import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Tabs } from 'heroui-native';
import { MOCK_TRANSACTIONS } from '../../mocks/transactions.mock';
import { useApprovalQueue } from '../../hooks/useApprovalQueue';
import { useAgentStore } from '../../store/agentStore';
import TxRow from '../../components/activity/TxRow';
import SuggestionCard from '../../components/agents/SuggestionCard';
import { colors } from '../../theme';

export default function ActivityScreen() {
  const [tab, setTab] = useState('history');
  const approvalQueue = useApprovalQueue();
  const approveAction = useAgentStore((s) => s.approveAction);
  const rejectAction = useAgentStore((s) => s.rejectAction);
  const pendingTxs = MOCK_TRANSACTIONS.filter((t) => t.status === 'pending');
  const pendingCount = pendingTxs.length + approvalQueue.length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Tabs value={tab} onValueChange={setTab} style={styles.tabs}>
          <Tabs.List style={styles.tabList}>
            <Tabs.Indicator />
            <Tabs.Trigger value="history">
              <Tabs.Label>History</Tabs.Label>
            </Tabs.Trigger>
            <Tabs.Trigger value="pending">
              <Tabs.Label>{pendingCount > 0 ? `Pending (${pendingCount})` : 'Pending'}</Tabs.Label>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="history" style={styles.content}>
            <FlatList
              data={MOCK_TRANSACTIONS.filter((t) => t.status !== 'pending')}
              keyExtractor={(t) => t.id}
              renderItem={({ item }) => <TxRow tx={item} />}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              showsVerticalScrollIndicator={false}
            />
          </Tabs.Content>

          <Tabs.Content value="pending" style={styles.content}>
            <FlatList
              data={[
                ...approvalQueue.map((a) => ({ type: 'approval' as const, data: a })),
                ...pendingTxs.map((t) => ({ type: 'tx' as const, data: t })),
              ]}
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
              showsVerticalScrollIndicator={false}
            />
          </Tabs.Content>
        </Tabs>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  container: { flex: 1, paddingTop: 16 },
  tabs: { flex: 1 },
  tabList: { marginHorizontal: 16, marginBottom: 8 },
  content: { flex: 1 },
  separator: { height: 1, backgroundColor: colors.border.subtle, marginHorizontal: 16 },
  pendingList: { padding: 16, gap: 8 },
});
