import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { StakeFlowParams } from './navigationTypes';
import StakeAmountScreen from '../screens/dashboard/StakeAmountScreen';
import StakeReviewScreen from '../screens/dashboard/StakeReviewScreen';
import StakeConfirmScreen from '../screens/dashboard/StakeConfirmScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<StakeFlowParams>();

export default function StakeFlowNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: colors.text.primary,
        headerTitleStyle: { color: colors.text.primary },
        contentStyle: { backgroundColor: colors.bg.primary },
      }}
    >
      <Stack.Screen name="StakeAmount" component={StakeAmountScreen} options={{ title: 'Stake' }} />
      <Stack.Screen name="StakeReview" component={StakeReviewScreen} options={{ title: 'Review' }} />
      <Stack.Screen name="StakeConfirm" component={StakeConfirmScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
