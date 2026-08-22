import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { EarnStackParams } from './navigationTypes';
import EarnHubScreen from '../screens/earn/EarnHubScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<EarnStackParams>();

export default function EarnStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg.primary },
      }}
    >
      <Stack.Screen name="EarnHub" component={EarnHubScreen} />
    </Stack.Navigator>
  );
}
