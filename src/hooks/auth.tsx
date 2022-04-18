import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "@services/api";
import { Alert } from "react-native";

type User = {
  token: string;
  user: object;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (data: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  user: User | null;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function signIn({ email, password }: SignInCredentials) {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o-email e a senha.");
    }

    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      console.log('response API:', response)

      const { token, user } = response.data;

      const userData = {
        token,
        user,
      }

      await AsyncStorage.setItem("@Promocaododia:token", token);
      await AsyncStorage.setItem("@Promocaododia:user", JSON.stringify(user));

      setUser(userData);

    } catch (error) {
      Alert.alert("Login", "E-mail e/ou senha inválida.")
    }
  }

  async function loadUserStorageData() {
    const storedUser = await AsyncStorage.getItem("@Promocaododia:user");
    const storedToken = await AsyncStorage.getItem("@Promocaododia:token");

    if (storedUser && storedToken) {
      const userData = JSON.parse(storedUser) as User;
      console.log(userData);
      setUser(userData);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem("@Promocaododia:user");
    await AsyncStorage.removeItem("@Promocaododia:token");

    setUser(null);
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
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, forgotPassword, user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContext, AuthProvider, useAuth }