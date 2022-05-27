import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/ProfileGroup/Profile";
import { EditProfile } from "../screens/ProfileGroup/EditProfile";
import { EditPassword } from "../screens/ProfileGroup/EditPassword";
import { RegisterAdvertisement } from "../screens/AdvertiserGroup/RegisterAdvertisement";
import { AdvertiserRoutes } from "./advertiser.routes";

const ProfileStack = createStackNavigator();

export function ProfileRoutes() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileScreen">
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="EditPassword" component={EditPassword} />
      <ProfileStack.Screen name="RegisterAdvertisement" component={RegisterAdvertisement} />
      <ProfileStack.Screen name="Advertiser" component={AdvertiserRoutes} />
    </ProfileStack.Navigator>
  );
}
