import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ActivityStackParams } from './navigationTypes';
import ActivityScreen from '../screens/activity/ActivityScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<ActivityStackParams>();

export default function ActivityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#ffffff' }, headerTintColor: colors.text.primary, contentStyle: { backgroundColor: colors.bg.primary } }}>
      <Stack.Screen name="ActivityList" component={ActivityScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
