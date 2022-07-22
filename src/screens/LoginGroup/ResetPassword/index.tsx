import React, { useEffect, useState } from "react";
import { CommonActions, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Keyboard, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { AxiosError } from "axios";
import { api } from "@services/api";

import { InputDefault } from "@components/Form/Input";
import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { LoadSendEmail } from "@components/LoadSendEmail";

import { Container, Header, Icone, ReturnButton, Title, Fields, Content, Svg, TextsView, TitleText, SubTitle, EmailText, SentEmailView, SentEmailText, UserEmailText, SentEmailFailedView, IconFailed, LeftView, HeaderResendView, IconResend, Load } from "./styles";

type NavigationProps = {
  email: string;
}

export function ResetPassword() {

  const navigation = useNavigation();
  const route = useRoute();

  const { email } = route.params as NavigationProps;

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [errorNewPassword, setErrorNewPassword] = useState<string | null>(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string | null>(null);

  const [isLogging, setIsLogging] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorSending, setErrorSending] = useState(false);

  function validate() {
    let error = false;

    if (!code) {
      setErrorCode("Código inválido");
      error = true;
    }

    if (!newPassword) {
      setErrorNewPassword("Preencha a nova senha");
      error = true;
    }

    if (confirmPassword !== newPassword) {
      setErrorConfirmPassword("As senhas não coincidem");
      error = true;
    }

    return !error;
  }

  async function handleForgotPassword() {
    if (validate()) {
      try {

        // setIsLogging(true);

        // await api.put(`/users/reset-password`, {});

        // setIsLogging(false);

        // navigation.navigate("ResponseScreen", {
        //   nextScreenRoute: "EditProfile",
        //   title: "Alterar senha",
        //   message: "Senha alterada com sucesso.",
        //   type: "sucess"
        // });

      } catch (error) {
        setIsLogging(false);

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
          console.log(error.response?.status)
          console.log(error);
          Alert.alert("Editar senha", "Houve um erro ao editar o senha, tente novamente. ❌")
        }
      }

    }

  }

  async function forgotPassword() {

    try {
      setIsSending(true);

      await api.post("/users/forgot", { email });

      setIsSending(false);

    } catch (error) {
      setIsSending(false);
      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        setErrorSending(true);
      }
    }

  }

  function handleResendCode() {
    forgotPassword();
  }

  useEffect(() => {
    forgotPassword();
  }, [email]);

  return (

    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >

      <Container>
        <ContainerBackground />
        <Header>
          <LeftView>
            <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
              <Icone name="arrow-back" />
            </ReturnButton>
            <Title>Recuperar senha</Title>
          </LeftView>

          {!isSending && !errorSending ?
            <HeaderResendView onPress={handleResendCode}>
              <IconResend name="email-sync" />
            </HeaderResendView>
            :
            <></>
          }
        </Header>

        {isSending ?
          <SentEmailView>
            <SentEmailText>Enviando E-mail para</SentEmailText>
            <UserEmailText>{email}</UserEmailText>
            <LoadSendEmail />
          </SentEmailView>
          :
          errorSending ?

            <SentEmailFailedView>
              <SentEmailText>Falha ao enviar E-mail</SentEmailText>
              <IconFailed name="alert-circle" />

              <Button
                title="Tentar novamente"
                iconRight
                iconName="mail-outline"
                backgroundColor="delete"
                isLoading={isSending}
                onPress={handleResendCode}
              />
            </SentEmailFailedView>
            :
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

              <Content>
                <Svg width={180} height={180} />

                <TextsView>
                  <TitleText>Recuperação de senha</TitleText>
                  <SubTitle>Nós enviamos um E-mail contendo o código para</SubTitle>
                  <EmailText>{email}</EmailText>
                </TextsView>
              </Content>

              <Fields>
                <InputDefault
                  name="code"
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  placeholder="Código"
                  iconName="ios-mail-unread-outline"
                  value={code}
                  onChangeText={(text: string) => {
                    setCode(text)
                    setErrorCode(null)
                  }}
                  errorMessage={errorCode}
                />
                <InputDefault
                  name="newPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  placeholder="Nova senha"
                  iconName="lock-closed-outline"
                  value={newPassword}
                  onChangeText={(text: string) => {
                    setNewPassword(text)
                    setErrorNewPassword(null)
                  }}
                  errorMessage={errorNewPassword}
                  isPassword
                  iconRight
                />
                <InputDefault
                  name="confirmPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  placeholder="Confirme sua senha"
                  iconName="lock-closed-outline"
                  value={confirmPassword}
                  onChangeText={(text: string) => {
                    setConfirmPassword(text)
                    setErrorConfirmPassword(null);
                  }}
                  errorMessage={errorConfirmPassword}
                  isPassword
                  iconRight

                />

              </Fields>
              <Button
                title="Salvar"
                iconRight
                iconName="save-outline"
                backgroundColor="primary"
                isLoading={isLogging}
                onPress={handleForgotPassword} />

            </ScrollView>
        }
      </Container>
    </TouchableWithoutFeedback>
  )
}