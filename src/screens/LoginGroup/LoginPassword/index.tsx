import React, { useCallback, useState } from "react";
import { CommonActions, ParamListBase } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TouchableWithoutFeedback } from "react-native";
import { ContainerBackground } from "../../../components/ContainerBackground";
import { Button } from "../../../components/Form/Button";
import { InputForm } from "../../../components/Form/InputForm";
import theme from "../../../global/styles/theme";
import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, ButtonsContainer, Header, ReturnButton, Icone } from "./styles";

interface FormData {
  [key: string]: any;
}

const schema = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória')
});

export function LoginPassword({ navigation, route }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleLoginPassword = useCallback((form: FormData) => {
    const data = {
      password: form.password,
      email: route.params.email
    }
    console.log(data)

    // navigation.navigate("", data)
  }, []);

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
                style={{ marginTop: 28, marginBottom: 50 }}
              />
              <ButtonsContainer>
                <Button
                  backgroundColor="primary"
                  title="Continuar"
                  iconRight
                  iconName="lock-open-outline"
                  onPress={handleSubmit(handleLoginPassword)}
                />
              </ButtonsContainer>
            </UserEvents>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}