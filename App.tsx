import React from "react";
import { ThemeProvider } from "styled-components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import theme from "./src/global/styles/theme";
import { AuthProvider } from "./src/hooks/auth";
import { Routes } from "./src/routes";
import { StatusBar } from "react-native";

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
