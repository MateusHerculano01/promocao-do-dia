import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "@services/api";
import { Alert } from "react-native";

export type User = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  isAdvertiser: boolean;
}

type AuthState = {
  token: string;
  user: User;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  isLogging: boolean;
  signIn: (data: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  user: User;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isLogging, setIsLogging] = useState(false);

  async function signIn({ email, password }: SignInCredentials) {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o-email e a senha.");
    }

    setIsLogging(true);

    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ["@Promocaododia:token", token],
        ["@Promocaododia:user", JSON.stringify(user.user)]
      ]);

      setData({ token, user });
      setIsLogging(false);

    } catch (error) {
      Alert.alert("Login", "E-mail e/ou senha inválida.")
      setIsLogging(false);
    }
  }

  async function loadUserStorageData() {
    const token = await AsyncStorage.getItem("@Promocaododia:token");
    const userData = await AsyncStorage.getItem("@Promocaododia:user");

    if (token && userData) {
      const user = JSON.parse(userData);

      setData({ token, user });
    }
  }

  async function signOut() {
    await AsyncStorage.multiRemove(["@Promocaododia:user", "@Promocaododia:token"])

    setData({} as AuthState);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert("Redefinir senha", "Informe o e-mail.");
    }

    await api.post("/users/forgot", { email })
      .then(() => Alert.alert("Redefinir senha", "Enviamos um link no seu e-mail para redefinir sua senha."))
      .catch(() => Alert.alert("Redefinir senha", "Não foi possivel enviar o e-mail para redefinir a senha."))
  }

  useEffect(() => {
    loadUserStorageData();
  }, [data]);

  return (
    <AuthContext.Provider value={{ isLogging, signIn, signOut, forgotPassword, user: data.user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContext, AuthProvider, useAuth }