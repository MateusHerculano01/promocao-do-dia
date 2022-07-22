import React from "react";
import { getFocusedRouteNameFromRoute, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { hideBottomBar } from "@hooks/hideBottomBar";
import { OffersByCategory } from "@screens/OffersByCategory";
import { ProductsForCategory } from "@screens/ProductsForCategory";
import { InfoProduct } from "@screens/InfoProduct";
import { Dashboard } from "@screens/Dashboard";
import { Notifications } from "@screens/Notifications";
import { Locality } from "@screens/Locality";
import { ResponseScreen } from "@screens/ResponseScreen";

const DashboardStack = createStackNavigator();

export function DashboardRoutes() {
  const route = useRoute();

  const { setHideBottomBarState } = hideBottomBar();

  const tabHiddenRoutes = ["InfoProduct"];

  if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route)!)) {
    setHideBottomBarState(true);
  } else {
    setHideBottomBarState(false);
  }

  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
      <DashboardStack.Screen name="HomeScreen" component={Dashboard} />
      <DashboardStack.Screen name="OffersByCategory" component={OffersByCategory}
      />
      <DashboardStack.Screen name="ProductsForCategory" component={ProductsForCategory} />
      <DashboardStack.Screen name="InfoProduct" component={InfoProduct} />
      <DashboardStack.Screen name="Notifications" component={Notifications} />
      <DashboardStack.Screen name="Locality" component={Locality} />
      <DashboardStack.Screen name="ResponseScreen" component={ResponseScreen} />
    </DashboardStack.Navigator>
  );
}
