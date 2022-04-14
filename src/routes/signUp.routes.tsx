import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateAcount } from "../screens/SignUpGroup/CreateAcount";
import { CreatePassword } from "../screens/SignUpGroup/CreatePassword";
import { VerifyCode } from "../screens/SignUpGroup/VerifyCode";

const SignUp = createStackNavigator();

export function SignUpRoutes() {
  return (
    <SignUp.Navigator screenOptions={{ headerShown: false }} initialRouteName="CreateAcount">
      <SignUp.Screen name="CreateAcount" component={CreateAcount} />
      <SignUp.Screen name="CreatePassword" component={CreatePassword} />
      <SignUp.Screen name="VerifyCode" component={VerifyCode} />
    </SignUp.Navigator>
  );
}
