import React from 'react';
import { View, Text, Switch, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useWalletStore } from '../../store/walletStore';
import { useAgentStore } from '../../store/agentStore';
import Card from '../../components/common/Card';
import SectionHeader from '../../components/common/SectionHeader';
import { colors } from '../../theme';

export default function SettingsScreen() {
  const { walletName, primaryAddress, reset } = useWalletStore();
  const agents = useAgentStore((s) => s.agents);
  const toggleAgent = useAgentStore((s) => s.toggleAgent);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <SectionHeader title="Wallet" />
          <Card>
            <View style={styles.row}><Text style={styles.label}>Name</Text><Text style={styles.value}>{walletName}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Address</Text><Text style={[styles.value, styles.mono]}>{primaryAddress}</Text></View>
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader title="AI Agents" />
          <Card>
            {agents.map((agent) => (
              <View key={agent.id} style={styles.row}>
                <Text style={styles.label}>{agent.name}</Text>
                <Switch value={agent.isEnabled} thumbColor={agent.isEnabled ? colors.accent.indigo : colors.text.tertiary} trackColor={{ true: colors.accent.indigo + '55', false: colors.border.default }} onValueChange={() => toggleAgent(agent.id)} accessibilityLabel={`${agent.name} agent. ${agent.isEnabled ? 'Enabled' : 'Disabled'}. Tap to toggle`} accessibilityRole="switch" />
              </View>
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Developer" />
          <Card>
            <Text style={styles.devNote}>Reset wallet state, trigger mock events, and clear conversation history from here during demos.</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader title="About" />
          <Card>
            <View style={styles.row}><Text style={styles.label}>Version</Text><Text style={styles.value}>0.1.0 (prototype)</Text></View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  content: { padding: 16, gap: 20, paddingBottom: 40 },
  section: { gap: 0 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border.subtle },
  label: { color: colors.text.secondary, fontSize: 14 },
  value: { color: colors.text.primary, fontSize: 14 },
  mono: { fontFamily: 'monospace', fontSize: 12 },
  devNote: { color: colors.text.secondary, fontSize: 13, lineHeight: 20 },
});
