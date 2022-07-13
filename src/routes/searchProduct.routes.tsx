import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { InfoProduct } from "@screens/InfoProduct";
import { SearchForTheCheapest } from "@screens/SearchForTheCheapest";
import { Notifications } from "@screens/Notifications";

const SearchProductStack = createStackNavigator();

export function SearchProductRoutes() {
  return (
    <SearchProductStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SearchForTheCheapest">
      <SearchProductStack.Screen name="SearchForTheCheapest" component={SearchForTheCheapest} />
      <SearchProductStack.Screen name="InfoProduct" component={InfoProduct} />
      <SearchProductStack.Screen name="Notifications" component={Notifications} />
    </SearchProductStack.Navigator>
  );
}
