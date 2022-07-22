import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/ProfileGroup/Profile";
import { EditProfile } from "../screens/ProfileGroup/EditProfile";
import { EditPassword } from "../screens/ProfileGroup/EditPassword";
import { AdvertiserRoutes } from "./advertiser.routes";
import { ResponseScreen } from "../screens/ResponseScreen";
import { Notifications } from "@screens/Notifications";
import { Locality } from "@screens/Locality";

const ProfileStack = createStackNavigator();

export function ProfileRoutes() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileScreen">
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
      <ProfileStack.Screen name="ResponseScreen" component={ResponseScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="EditPassword" component={EditPassword} />
      <ProfileStack.Screen name="Advertiser" component={AdvertiserRoutes} />
      <ProfileStack.Screen name="Notifications" component={Notifications} />
      <ProfileStack.Screen name="Locality" component={Locality} />
    </ProfileStack.Navigator>
  );
}
