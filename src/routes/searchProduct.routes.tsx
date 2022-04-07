import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { InfoProduct } from "../screens/InfoProduct";
import { AppRoutes } from "./app.routes";

const SearchProductStack = createStackNavigator();

export function SearchProductRoutes() {
  return (
    <SearchProductStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SearchForTheCheapest">
      <SearchProductStack.Screen name="SearchForTheCheapest" component={AppRoutes} />
      <SearchProductStack.Screen name="InfoProduct" component={InfoProduct} />
    </SearchProductStack.Navigator>
  );
}
