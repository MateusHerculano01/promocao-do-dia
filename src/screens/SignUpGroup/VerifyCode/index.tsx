import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, BackHandler, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from "react-native";
import { CommonActions, useRoute, useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ContainerBackground } from "../../../components/ContainerBackground";
import { Button } from "../../../components/Form/Button";
import { InputCode } from "../../../components/InputCode";
import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, InputCodeView, Header, TouchView, ResendText, TitleDefault, ResendView, CountText } from "./styles";
import { api } from "@services/api";

interface FormData {
  [key: string]: any;
}

type ParamsProps = {
  email: string;
}

const schemaVerify = Yup.object().shape({
  firstInput: Yup.string().required('Código obrigatório'),
  secondInput: Yup.string().required('Código obrigatório'),
  thirdInput: Yup.string().required('Código obrigatório'),
  fourthInput: Yup.string().required('Código obrigatório'),
});

export function VerifyCode() {
  const navigation = useNavigation();
  const route = useRoute();

  const [isLogging, setIsLogging] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaVerify)
  });

  const { email } = route.params as ParamsProps;

  const handleSignUp = useCallback(async (form: FormData) => {
    try {
      setIsLogging(true);

      const codesInput: FormData = {
        firstcode: form.firstInput,
        secondcode: form.secondInput,
        thirdcode: form.thirdInput,
        fourthcode: form.fourthInput
      }

      let verificationCode: string = '';

      for (const codes in codesInput) {
        verificationCode += codesInput[codes]
      }

      const data = {
        email,
        verificationCode
      }

      await api.post("/verify/email", data);

      setIsLogging(false);

      navigation.navigate('Sucess', {
        nextScreenRoute: 'LoginEmail',
        title: `Agora é só fazer login\ne aproveitar sua conta.`
      });

    } catch (error) {

      setIsLogging(false);

      return Alert.alert("Verificação", "Código inválido/falha ao enviar, tente novamente.")
    }

  }, []);

  async function handleResendCode(email: string) {
    const data = {
      email
    }

    if (!email) {
      return Alert.alert("Verificação", "Falha ao enviar código de verificação.");
    }
    await api.post("/verify/resend", data)
      .then(() => {

        Alert.alert("Verificação", "Um novo código foi enviado para seu e-mail.")
      })
      .catch(error => console.log(error.response));
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

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
                  returnKeyType="next"
                />
                <InputCode
                  name="secondInput"
                  control={control}
                  error={errors.secondInput}
                  returnKeyType="next"
                />
                <InputCode
                  name="thirdInput"
                  control={control}
                  error={errors.thirdInput}
                  returnKeyType="next"
                />
                <InputCode
                  name="fourthInput"
                  control={control}
                  error={errors.fourthInput}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleSignUp)}
                />
              </InputCodeView>
              <TouchView>
                <ResendView onPress={() => handleResendCode(email)} >
                  <ResendText>Reenviar código</ResendText>
                </ResendView>
              </TouchView>
              <Button
                backgroundColor="primary"
                title="Criar conta"
                isLoading={isLogging}
                onPress={handleSubmit(handleSignUp)}
              />
            </UserEvents>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}