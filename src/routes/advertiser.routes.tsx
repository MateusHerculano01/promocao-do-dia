import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AdvertiserDashboard } from "../screens/AdvertiserGroup/AdvertiserDashboard";
import { RegisterAdvertisement } from "../screens/AdvertiserGroup/RegisterAdvertisement";
import { HomeCategory } from "../screens/AdvertiserGroup/HomeCategory";
import { HomeProduct } from "../screens/AdvertiserGroup/HomeProduct";
import { RegisterCategory } from "../screens/AdvertiserGroup/RegisterCategory";
import { ResponseScreen } from "../screens/ResponseScreen";
import { RegisterProduct } from "@screens/AdvertiserGroup/RegisterProduct";

const AdvertiserStack = createStackNavigator();

export function AdvertiserRoutes() {
  return (
    <AdvertiserStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AdvertiserDashboard">
      <AdvertiserStack.Screen name="AdvertiserDashboard" component={AdvertiserDashboard} />
      <AdvertiserStack.Screen name="RegisterAdvertisement" component={RegisterAdvertisement} />
      <AdvertiserStack.Screen name="ResponseScreen" component={ResponseScreen} />
      <AdvertiserStack.Screen name="HomeCategory" component={HomeCategory} />
      <AdvertiserStack.Screen name="Category" component={RegisterCategory} />
      <AdvertiserStack.Screen name="HomeProduct" component={HomeProduct} />
      <AdvertiserStack.Screen name="Product" component={RegisterProduct} />
    </AdvertiserStack.Navigator>
  );
}
