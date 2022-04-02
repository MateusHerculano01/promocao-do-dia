import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard } from '../screens/Dashboard';
import { OffersByCategory } from '../screens/OffersByCategory';

const DashboardStack = createStackNavigator();

export function DashboardTabStack() {
  return (
    <DashboardStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <DashboardStack.Screen name="HomeScreen" component={Dashboard} />
      <DashboardStack.Screen name="OffersByCategory" component={OffersByCategory} />
    </DashboardStack.Navigator>
  )
}