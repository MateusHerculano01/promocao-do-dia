import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { LoginRoutes } from "./login.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "@hooks/auth";

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <LoginRoutes />}
    </NavigationContainer>
  )
}