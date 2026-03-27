import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DashboardStackParams } from './navigationTypes';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import AssetDetailScreen from '../screens/dashboard/AssetDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<DashboardStackParams>();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.bg.secondary }, headerTintColor: colors.text.primary, headerTitleStyle: { color: colors.text.primary }, contentStyle: { backgroundColor: colors.bg.primary } }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AssetDetail" component={AssetDetailScreen} options={{ title: 'Asset' }} />
    </Stack.Navigator>
  );
}
