import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../screens/Dashboard";
import { SearchForTheCheapest } from "../screens/SearchForTheCheapest";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../global/styles/theme";
import { DashboardTabStack } from "./dashboard.routes";
import { ProductsForCategory } from "../screens/ProductsForCategory";

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === "ios" ? 50 : 30,
          paddingBottom: 30,
          paddingTop: 30,
          paddingLeft: 10,
          paddingRight: 10,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        },
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardTabStack}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TouchableOpacity style={focused && styles.touch}>
              <Feather name="home" size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchForTheCheapest}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TouchableOpacity style={focused && styles.touch}>
              <Feather name="search" size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Shopping"
        component={ProductsForCategory}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TouchableOpacity style={focused && styles.touch}>
              <Feather name="shopping-bag" size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Config"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TouchableOpacity style={focused && styles.touch}>
              <Feather name="list" size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  touch: {
    backgroundColor: theme.colors.primary,
    width: 50,
    height: 50,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
