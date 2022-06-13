import React, { useCallback } from "react";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/auth";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { InputForm } from "@components/Form/InputForm";

import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, Header, ReturnButton, Icone, ForgotView, ForgotText } from "./styles";

interface FormData {
  [key: string]: any;
}

type ParamsProps = {
  email: string;
}

const schema = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória')
});

export function LoginPassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { email } = route.params as ParamsProps;

  const { signIn, forgotPassword, isLogging } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleLoginPassword = useCallback(async (form: FormData) => {

    const data = {
      password: form.password,
      email
    }

    signIn(data);

  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding' })}
      enabled
    >
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          containerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
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
            </Header>
            <Svg width={240} height={240} />
            <TextsWelcome>
              <Title>Insira a sua senha</Title>
              <SubTitle>Digite a senha que utilizou na criação da sua conta, ela pode conter números e letras</SubTitle>
            </TextsWelcome>
            <UserEvents>
              <InputForm
                name="password"
                control={control}
                error={errors.password && errors.password.message}
                autoCapitalize="none"
                autoCorrect={false}
                inputType="default"
                isPassword={true}
                iconColor={theme.colors.blue_default}
                iconRight={true}
                iconNameL="lock-closed-outline"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleLoginPassword)}
              />
              <ForgotView
                onPress={() => forgotPassword(email)}
              >
                <ForgotText>Esqueceu sua senha?</ForgotText>
              </ForgotView>
              <Button
                backgroundColor="primary"
                title="Continuar"
                iconRight
                isLoading={isLogging}
                iconName="lock-open-outline"
                onPress={handleSubmit(handleLoginPassword)}
              />
            </UserEvents>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}