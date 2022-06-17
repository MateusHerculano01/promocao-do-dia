import React from "react";
import { Platform, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SearchProductRoutes } from "./searchProduct.routes";
import { DashboardRoutes } from "./dashboard.routes";
import theme from "@global/styles/theme";
import { ProfileRoutes } from "./profile.routes";
import { RegisterProduct } from "@screens/AdvertiserGroup/RegisterProduct";

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
          paddingVertical: Platform.OS === "ios" ? 40 : 30,
          marginBottom: Platform.OS === "ios" ? 20 : 0,
          paddingTop: Platform.OS === "ios" ? 30 : 0,
          paddingLeft: 10,
          paddingRight: 10,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        },
      }}

    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardRoutes}
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
        component={SearchProductRoutes}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TouchableOpacity style={focused && styles.touch}>
              <Feather name="search" size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileRoutes}
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
