import React, { useCallback, useState } from "react";
import { CommonActions, useRoute, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { InputForm } from "@components/Form/InputForm";
import theme from "@global/styles/theme";
import { Container, Svg, TextView, Text, UserEvents, Header, ReturnButton, Icone, TitleDefault, Fields } from "./styles";
import { api } from "@services/api";

interface FormData {
  [key: string]: any;
}

type ParamsProps = {
  name: string;
  email: string;
}

const schemaUser = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 digitos'),
  confirmPassword: Yup.string().required('Confirme a senha'),
});

export function CreatePassword() {
  const navigation = useNavigation();
  const route = useRoute();

  const [isLogging, setIsLogging] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaUser)
  });

  const { name, email } = route.params as ParamsProps;

  const handleSignUp = useCallback(async (form: FormData) => {

    const data = {
      name,
      email,
      password: form.password
    }

    try {
      if (!name && !email && !form.password) {
        return Alert.alert("Criar conta", "Informe os dados, (nome, email e senha).")
      }

      if (form.password !== form.confirmPassword) {
        return Alert.alert("Criar conta", "As senhas não coincidem.")
      }

      setIsLogging(true);

      await api.post("/users/new", data);

      setIsLogging(false);

    } catch (error) {
      setIsLogging(false);
      return Alert.alert("Criar conta", "Não foi possivel criar a conta, tente novamente mais tarde.")
    }

    navigation.navigate("VerifyCode", data)

  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding' })}
      enabled
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
          containerStyle={{ flex: 1 }}
        >
          <Container>
            <StatusBar
              translucent
              backgroundColor="transparent"
            />
            <ContainerBackground />
            <Header>
              <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                <Icone name="arrow-back" />
              </ReturnButton>
              <TitleDefault>Escolha uma senha</TitleDefault>
            </Header>
            <TextView>
              <Text>Escolha uma senha segura, não compartilhe sua senha com ningúem</Text>
            </TextView>
            <Svg width={300} height={300} />
            <UserEvents>
              <Fields>
                <InputForm
                  name="password"
                  control={control}
                  error={errors.password && errors.password.message}
                  placeholder="Senha"
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  iconRight
                  isPassword
                  iconColor={theme.colors.title}
                  iconNameL="lock-closed-outline"
                />
                <InputForm
                  name="confirmPassword"
                  control={control}
                  error={errors.confirmPassword && errors.confirmPassword.message}
                  placeholder="Confirme sua senha"
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  iconRight
                  isPassword
                  iconColor={theme.colors.title}
                  iconNameL="lock-closed-outline"
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleSignUp)}
                />
              </Fields>
              <Button
                backgroundColor="primary"
                title="Proximo"
                iconRight
                isLoading={isLogging}
                iconName="arrow-forward-outline"
                onPress={handleSubmit(handleSignUp)}
              />
            </UserEvents>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}