import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateAcount } from "../screens/SignUpGroup/CreateAcount";

const SignUp = createStackNavigator();

export function SignUpRoutes() {
  return (
    <SignUp.Navigator screenOptions={{ headerShown: false }} initialRouteName="CreateAcount">
      <SignUp.Screen name="CreateAcount" component={CreateAcount} />
    </SignUp.Navigator>
  );
}
