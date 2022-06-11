import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginPassword } from "../screens/LoginGroup/LoginPassword";
import { LoginEmail } from "../screens/LoginGroup/LoginEmail";
import { SignUpRoutes } from "./signUp.routes";
import { Splash } from "../screens/Splash";

const LoginStack = createStackNavigator();

export function LoginRoutes() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="splash">
      <LoginStack.Screen name="splash" component={Splash} />
      <LoginStack.Screen name="LoginEmail" component={LoginEmail} />
      <LoginStack.Screen name="LoginPassword" component={LoginPassword} />
      <LoginStack.Screen name="SignUp" component={SignUpRoutes} />
    </LoginStack.Navigator>
  );
}
