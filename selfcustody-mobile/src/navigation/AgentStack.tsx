import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AgentStackParams } from './navigationTypes';
import AgentHubScreen from '../screens/agents/AgentHubScreen';
import ChatScreen from '../screens/agents/ChatScreen';
import ApprovalDetailScreen from '../screens/activity/ApprovalDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<AgentStackParams>();

export default function AgentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#ffffff' }, headerTintColor: colors.text.primary, contentStyle: { backgroundColor: colors.bg.primary } }}>
      <Stack.Screen name="AgentHub" component={AgentHubScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'AI Assistant' }} />
      <Stack.Screen name="ApprovalDetail" component={ApprovalDetailScreen} options={{ title: 'Action Review' }} />
    </Stack.Navigator>
  );
}
