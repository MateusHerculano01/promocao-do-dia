import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dashboard } from "../screens/Dashboard";
import { OffersByCategory } from "../screens/OffersByCategory";
import { ProductsForCategory } from "../screens/ProductsForCategory";
import { InfoProduct } from "../screens/InfoProduct";

const DashboardStack = createStackNavigator();

export function DashboardTabStack() {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
      <DashboardStack.Screen name="HomeScreen" component={Dashboard} />
      <DashboardStack.Screen name="OffersByCategory" component={OffersByCategory} />
      <DashboardStack.Screen name="ProductsForCategory" component={ProductsForCategory} />
      <DashboardStack.Screen name="InfoProduct" component={InfoProduct} />
    </DashboardStack.Navigator>
  );
}
