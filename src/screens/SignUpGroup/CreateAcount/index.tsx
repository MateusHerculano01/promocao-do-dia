import React, { useCallback } from "react";
import { CommonActions } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TouchableWithoutFeedback } from "react-native";
import { ContainerBackground } from "../../../components/ContainerBackground";
import { Button } from "../../../components/Form/Button";
import { InputForm } from "../../../components/Form/InputForm";
import theme from "../../../global/styles/theme";
import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, Header, ReturnButton, Icone, TitleDefault, Fields } from "./styles";

interface FormData {
  [key: string]: any;
}

interface Props {
  navigation: BottomTabNavigationProp<any, any>;
}

const schemaUser = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('Insira um e-mail válido')
});

export function CreateAcount({ navigation }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaUser)
  });

  const handleSignUp = useCallback((form: FormData) => {
    const data = {
      name: form.name,
      email: form.email
    }
    console.log(data)

    navigation.navigate("VerifyCode", data)
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
              <TitleDefault>Criar uma nova conta</TitleDefault>
            </Header>
            <Svg width={240} height={240} />
            <TextsWelcome>
              <Title>Insira a seus dados</Title>
              <SubTitle>Para verificarmos a sua identidade, precisamos de um E-mail válido</SubTitle>
            </TextsWelcome>
            <UserEvents>
              <Fields>
                <InputForm
                  name="name"
                  control={control}
                  error={errors.name && errors.name.message}
                  autoCapitalize="words"
                  autoCorrect
                  inputType="default"
                  iconColor={theme.colors.title}
                  iconNameL="person-circle-outline"
                  placeholder="Nome"
                />
                <InputForm
                  name="email"
                  control={control}
                  error={errors.email && errors.email.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="email-address"
                  iconColor={theme.colors.title}
                  iconNameL="mail-outline"
                  placeholder="E-mail"
                />
              </Fields>
              <Button
                backgroundColor="primary"
                title="Proximo"
                iconRight
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