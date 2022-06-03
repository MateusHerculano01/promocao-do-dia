import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AdvertiserDashboard } from "../screens/AdvertiserGroup/AdvertiserDashboard";
import { RegisterAdvertisement } from "../screens/AdvertiserGroup/RegisterAdvertisement";
import { HomeCategory } from "../screens/AdvertiserGroup/HomeCategory";
import { RegisterCategory } from "../screens/AdvertiserGroup/RegisterCategory";

const AdvertiserStack = createStackNavigator();

export function AdvertiserRoutes() {
  return (
    <AdvertiserStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AdvertiserDashboard">
      <AdvertiserStack.Screen name="AdvertiserDashboard" component={AdvertiserDashboard} />
      <AdvertiserStack.Screen name="RegisterAdvertisement" component={RegisterAdvertisement} />
      <AdvertiserStack.Screen name="HomeCategory" component={HomeCategory} />
      <AdvertiserStack.Screen name="Category" component={RegisterCategory} />
    </AdvertiserStack.Navigator>
  );
}
