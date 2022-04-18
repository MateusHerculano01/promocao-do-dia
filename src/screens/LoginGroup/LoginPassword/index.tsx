import React, { useCallback, useContext, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TouchableWithoutFeedback } from "react-native";
import { ContainerBackground } from "../../../components/ContainerBackground";
import { Button } from "../../../components/Form/Button";
import { InputForm } from "../../../components/Form/InputForm";
import theme from "../../../global/styles/theme";
import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, Header, ReturnButton, Icone, ForgotView, ForgotText } from "./styles";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useAuth } from "@hooks/auth";

interface FormData {
  [key: string]: any;
}

interface Props {
  navigation: BottomTabNavigationProp<any, any>;
  route: any;
}

const schema = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória')
});

export function LoginPassword({ navigation, route }: Props) {
  const { signIn, forgotPassword } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleLoginPassword = useCallback(async (form: FormData) => {
    try {
      const data = {
        password: form.password,
        email: route.params.email
      }
      signIn(data)
      // navigation.navigate("Home", data)
    } catch (error) {

    }
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
                onPress={() => forgotPassword(route.params.email)}
              >
                <ForgotText>Esqueceu sua senha?</ForgotText>
              </ForgotView>
              <Button
                backgroundColor="primary"
                title="Continuar"
                iconRight
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