import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { InfoProduct } from "../screens/InfoProduct";
import { SearchForTheCheapest } from "../screens/SearchForTheCheapest";

const SearchProductStack = createStackNavigator();

export function SearchProductRoutes() {
  return (
    <SearchProductStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SearchForTheCheapest">
      <SearchProductStack.Screen name="SearchForTheCheapest" component={SearchForTheCheapest} />
      <SearchProductStack.Screen name="InfoProduct" component={InfoProduct} />
    </SearchProductStack.Navigator>
  );
}
