import React from "react";
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/app.routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import theme from "./src/global/styles/theme";
import { StatusBar } from 'expo-status-bar';
import { Login } from "./src/screens/Login";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style='dark' />
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          {/* <AppRoutes /> */}
          <Login />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
