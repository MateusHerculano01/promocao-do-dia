import React, { useCallback } from "react";
import { CommonActions } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TouchableWithoutFeedback } from "react-native";
import { ContainerBackground } from "../../../components/ContainerBackground";
import { Button } from "../../../components/Form/Button";
import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, InputCodeView, Header, ReturnButton, Icone, TouchView, ResendText, TitleDefault, ResendView, AlterView, AlterText } from "./styles";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { InputCode } from "../../../components/InputCode";

interface FormData {
  [key: string]: any;
}

interface Props {
  navigation: BottomTabNavigationProp<any, any>;
  route: any;
}

const schemaVerify = Yup.object().shape({
  firstInput: Yup.string().required('Código obrigatório'),
  secondInput: Yup.string().required('Código obrigatório'),
  thirdInput: Yup.string().required('Código obrigatório'),
  fourthInput: Yup.string().required('Código obrigatório'),
});

export function VerifyCode({ navigation, route }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaVerify)
  });

  const { name, email } = route.params

  const handleSignUp = useCallback((form: FormData) => {

    const codesInput: FormData = {
      firstcode: form.firstInput,
      secondcode: form.secondInput,
      thirdcode: form.thirdInput,
      fourthcode: form.fourthInput
    }

    let valueCode: string = '';

    for (const codes in codesInput) {
      valueCode += codesInput[codes]
    }

    const data = {
      valueCode,
      name,
      email
    }
    console.log(data)

    navigation.navigate("CreatePassword", data)
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
              <TitleDefault>Confirme sua identidade</TitleDefault>
            </Header>
            <Svg width={240} height={240} />
            <TextsWelcome>
              <Title>Nós enviamos um E-mail contendo o código para</Title>
              <SubTitle>{email!}</SubTitle>
            </TextsWelcome>
            <UserEvents>
              <InputCodeView>
                <InputCode
                  name="firstInput"
                  control={control}
                  error={errors.firstInput}
                />
                <InputCode
                  name="secondInput"
                  control={control}
                  error={errors.secondInput}
                />
                <InputCode
                  name="thirdInput"
                  control={control}
                  error={errors.thirdInput && errors.thirdInput.message}
                />
                <InputCode
                  name="fourthInput"
                  control={control}
                  error={errors.fourthInput}
                />
              </InputCodeView>
              <TouchView>
                <ResendView>
                  <ResendText>Reenviar código</ResendText>
                </ResendView>
                <AlterView onPress={() => navigation.dispatch(CommonActions.goBack())}>
                  <AlterText>Alterar E-mail</AlterText>
                </AlterView>
              </TouchView>
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