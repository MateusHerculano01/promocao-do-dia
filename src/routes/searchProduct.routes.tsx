import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { InfoProduct } from "@screens/InfoProduct";
import { SearchForTheCheapest } from "@screens/SearchForTheCheapest";
import { Notifications } from "@screens/Notifications";
import { Locality } from "@screens/Locality";
import { ResponseScreen } from "@screens/ResponseScreen";

const SearchProductStack = createStackNavigator();

export function SearchProductRoutes() {
  return (
    <SearchProductStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SearchForTheCheapest">
      <SearchProductStack.Screen name="SearchForTheCheapest" component={SearchForTheCheapest} />
      <SearchProductStack.Screen name="InfoProduct" component={InfoProduct} />
      <SearchProductStack.Screen name="Notifications" component={Notifications} />
      <SearchProductStack.Screen name="Locality" component={Locality} />
      <SearchProductStack.Screen name="ResponseScreen" component={ResponseScreen} />
    </SearchProductStack.Navigator>
  );
}
