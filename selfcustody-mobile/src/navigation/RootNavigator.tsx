import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParams } from './navigationTypes';
import { useWalletStore } from '../store/walletStore';
import MainTabNavigator from './MainTabNavigator';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';

const Stack = createNativeStackNavigator<RootStackParams>();

export default function RootNavigator() {
  const isSetup = useWalletStore((s) => s.isSetup);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isSetup ? (
        <Stack.Screen name="Onboarding" component={WelcomeScreen} />
      ) : (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  );
}
