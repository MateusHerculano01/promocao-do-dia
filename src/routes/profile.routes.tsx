import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/Profile";
import { EditProfile } from "../screens/EditProfile";

const ProfileStack = createStackNavigator();

export function ProfileRoutes() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileScreen">
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile}
      />
    </ProfileStack.Navigator>
  );
}
