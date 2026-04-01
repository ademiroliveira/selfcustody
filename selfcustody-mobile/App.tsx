import 'react-native-gesture-handler';
import React from 'react';
import { Appearance } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HeroUINativeProvider } from 'heroui-native';
import RootNavigator from './src/navigation/RootNavigator';

Appearance.setColorScheme('light');

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <StatusBar style="dark" backgroundColor="#ffffff" />
              <RootNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </SafeAreaProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
