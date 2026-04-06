import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParams } from './navigationTypes';
import DashboardStack from './DashboardStack';
import AgentStack from './AgentStack';
import ActivityStack from './ActivityStack';
import EarnStack from './EarnStack';
import SecurityStack from './SecurityStack';
import { colors } from '../theme';
import { useTotalPendingCount } from '../hooks/useApprovalQueue';
import { useCustodyHealth } from '../hooks/useCustodyHealth';

const Tab = createBottomTabNavigator<MainTabParams>();

function TabIcon({ label, emoji, badge }: { label: string; emoji: string; badge?: number }) {
  return (
    <View style={styles.iconWrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      {badge != null && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
        </View>
      )}
    </View>
  );
}

export default function MainTabNavigator() {
  const pendingCount = useTotalPendingCount();
  const custody = useCustodyHealth();
  const securityBadge = custody.overallScore < 80 ? 1 : 0;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#ffffff', borderTopColor: colors.border.default },
        tabBarActiveTintColor: colors.accent.indigo,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="Portfolio"
        component={DashboardStack}
        options={{ tabBarLabel: 'Portfolio', tabBarIcon: () => <TabIcon label="Portfolio" emoji="◈" /> }}
      />
      <Tab.Screen
        name="Agents"
        component={AgentStack}
        options={{ tabBarLabel: 'Agents', tabBarIcon: () => <TabIcon label="Agents" emoji="✦" badge={pendingCount} /> }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityStack}
        options={{ tabBarLabel: 'Activity', tabBarIcon: () => <TabIcon label="Activity" emoji="◷" /> }}
      />
      <Tab.Screen
        name="Earn"
        component={EarnStack}
        options={{ tabBarLabel: 'Earn', tabBarIcon: () => <TabIcon label="Earn" emoji="◎" /> }}
      />
      <Tab.Screen
        name="SecurityTab"
        component={SecurityStack}
        options={{ tabBarLabel: 'Security', tabBarIcon: () => <TabIcon label="Security" emoji="⬡" badge={securityBadge} /> }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 20 },
  badge: { position: 'absolute', top: -4, right: -8, backgroundColor: colors.accent.rose, borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
