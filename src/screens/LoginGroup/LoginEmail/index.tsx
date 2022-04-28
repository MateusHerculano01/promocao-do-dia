import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TouchableWithoutFeedback } from "react-native";
import { useAuth } from "@hooks/auth";
import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { InputForm } from "@components/Form/InputForm";
import theme from "@global/styles/theme";
import { Container, TextsWelcome, Title, SubTitle, UserEvents, ButtonsContainer } from "./styles";

import LoginLogo from "../../../assets/login_logo.png";
interface FormData {
  [key: string]: any;
}

interface Props {
  navigation: BottomTabNavigationProp<any, any>;
  route: any;
}

const schema = Yup.object().shape({
  email: Yup.string().required('Email obrigatório').email('Insira um e-mail válido'),
});

export function LoginEmail({ navigation }: Props) {
  const dataAuth = useAuth();
  console.log(dataAuth)
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleLoginEmail = useCallback((form: FormData) => {
    const data = {
      email: form.email,
    }
    console.log(data)

    navigation.navigate("LoginPassword", data)
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <Container>
            <StatusBar
              translucent
              backgroundColor="transparent"
            />
            <ContainerBackground />
            <Image source={LoginLogo} width={200} height={200} />
            <TextsWelcome>
              <Title>Olá, seja bem vindo</Title>
              <SubTitle>Por favor para continuar informe o email vinculado a sua  conta</SubTitle>
            </TextsWelcome>
            <UserEvents>
              <InputForm
                name="email"
                control={control}
                error={errors.email && errors.email.message}
                autoCapitalize="none"
                inputType="email-address"
                iconColor={theme.colors.blue_default}
                iconNameL="call-outline"
                placeholder="E-mail"
                style={{ marginTop: 28 }}
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleLoginEmail)}
              />
              <ButtonsContainer>
                <Button
                  backgroundColor="primary"
                  title="Acesse sua conta"
                  iconRight
                  iconName="arrow-forward-outline"
                  onPress={handleSubmit(handleLoginEmail)}
                />
                <Button
                  backgroundColor="secondary"
                  title="Criar uma nova conta"
                  onPress={() => { navigation.navigate("SignUp") }}
                />
              </ButtonsContainer>
            </UserEvents>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}