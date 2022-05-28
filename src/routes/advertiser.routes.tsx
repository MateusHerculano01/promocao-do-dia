import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AdvertiserDashboard } from "../screens/AdvertiserGroup/AdvertiserDashboard";
import { RegisterAdvertisement } from "../screens/AdvertiserGroup/RegisterAdvertisement";

const AdvertiserStack = createStackNavigator();

export function AdvertiserRoutes() {
  return (
    <AdvertiserStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AdvertiserDashboard">
      <AdvertiserStack.Screen name="AdvertiserDashboard" component={AdvertiserDashboard} />
      <AdvertiserStack.Screen name="RegisterAdvertisement" component={RegisterAdvertisement} />
    </AdvertiserStack.Navigator>
  );
}
