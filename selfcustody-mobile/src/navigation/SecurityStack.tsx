import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { SecurityStackParams } from './navigationTypes';
import SecurityScreen from '../screens/security/SecurityScreen';
import KeyDetailScreen from '../screens/security/KeyDetailScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<SecurityStackParams>();

export default function SecurityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.bg.secondary }, headerTintColor: colors.text.primary, contentStyle: { backgroundColor: colors.bg.primary } }}>
      <Stack.Screen name="Security" component={SecurityScreen} options={{ headerShown: false }} />
      <Stack.Screen name="KeyDetail" component={KeyDetailScreen} options={{ title: 'Key Details' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}
