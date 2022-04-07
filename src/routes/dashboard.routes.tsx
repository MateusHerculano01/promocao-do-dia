import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OffersByCategory } from "../screens/OffersByCategory";
import { ProductsForCategory } from "../screens/ProductsForCategory";
import { InfoProduct } from "../screens/InfoProduct";
import { AppRoutes } from "./app.routes";

const DashboardStack = createStackNavigator();

export function DashboardRoutes() {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
      <DashboardStack.Screen name="HomeScreen" component={AppRoutes} />
      <DashboardStack.Screen name="OffersByCategory" component={OffersByCategory} />
      <DashboardStack.Screen name="ProductsForCategory" component={ProductsForCategory} />
      <DashboardStack.Screen name="InfoProduct" component={InfoProduct} />
    </DashboardStack.Navigator>
  );
}
