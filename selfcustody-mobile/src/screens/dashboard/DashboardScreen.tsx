import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DashboardStackParams } from '../../navigation/navigationTypes';
import { usePortfolioStore } from '../../store/portfolioStore';
import { useAgentStore } from '../../store/agentStore';
import { useCustodyHealth } from '../../hooks/useCustodyHealth';
import { useAgentEvents } from '../../hooks/useAgentEvents';
import { useNewsDigest } from '../../hooks/useNewsDigest';
import { startPriceSimulator } from '../../services/priceSimulator';
import { startAgentSimulator } from '../../services/agentSimulator';
import PortfolioSummaryCard from '../../components/portfolio/PortfolioSummaryCard';
import AssetRow from '../../components/portfolio/AssetRow';
import SectionHeader from '../../components/common/SectionHeader';
import AgentCard from '../../components/agents/AgentCard';
import NewsItem from '../../components/agents/NewsItem';
import { colors } from '../../theme';

type Nav = NativeStackNavigationProp<DashboardStackParams, 'Dashboard'>;

export default function DashboardScreen() {
  const nav = useNavigation<Nav>();
  const portfolio = usePortfolioStore((s) => s.portfolio);
  const agents = useAgentStore((s) => s.agents);
  const custody = useCustodyHealth();
  const { data: news } = useNewsDigest();
  useAgentEvents();

  useEffect(() => {
    startPriceSimulator();
    startAgentSimulator();
  }, []);

  const alertAgents = agents.filter((a) => a.status === 'alert' || a.pendingActionCount > 0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.walletName}>{portfolio.name}</Text>
        </View>

        <PortfolioSummaryCard
          portfolio={portfolio}
          custodyScore={custody.overallScore}
          onCustodyPress={() => {}}
        />

        <View style={styles.section}>
          <SectionHeader title="Assets" />
          {portfolio.positions.map((pos) => (
            <AssetRow
              key={pos.asset.id}
              position={pos}
              onPress={() => nav.navigate('AssetDetail', { assetId: pos.asset.id })}
            />
          ))}
        </View>

        {alertAgents.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Agent Alerts" action="View all" onAction={() => {}} />
            {alertAgents.slice(0, 2).map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </View>
        )}

        {news && news.items.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Market Intelligence" />
            {news.items.slice(0, 3).map((item, i) => (
              <NewsItem key={i} item={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg.primary },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  header: { paddingTop: 16, paddingBottom: 12 },
  greeting: { color: colors.text.secondary, fontSize: 15 },
  walletName: { color: colors.text.primary, fontSize: 22, fontWeight: '700' },
  section: { marginTop: 24 },
});
