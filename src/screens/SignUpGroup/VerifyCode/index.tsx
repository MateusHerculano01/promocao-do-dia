import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { api } from "@services/api";

import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { InputCode, InputProps } from "@components/InputCode";

import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, InputCodeView, Header, TouchView, ResendText, TitleDefault, ResendView, CountText, Minutes, Separator, Seconds, CounterView, AfterView, AfterButton, AfterText } from "./styles";

type ParamsProps = {
  email: string;
}

const COUNTDOWN_INITIAL_TIME_IN_SECONDS = 2 * 60;

export function VerifyCode() {
  const navigation = useNavigation();
  const route = useRoute();

  const inputRef2 = useRef<any>(null);
  const inputRef3 = useRef<any>(null);
  const inputRef4 = useRef<any>(null);

  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');

  const [errorCode, setErrorCode] = useState(false);

  const [isLogging, setIsLogging] = useState(false);

  const [startCounter, setStartCounter] = useState(false);
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);

  const minutes = Math.floor(totalTimeInSeconds / 60);
  const seconds = totalTimeInSeconds % 60;

  const { email } = route.params as ParamsProps;

  function validate() {
    let error = false;

    if (!code1 || !code2 || !code3 || !code4) {
      setErrorCode(true);
      error = true;
    }

    return error;
  }

  const handleSubmit = useCallback(async () => {
    if (validate()) {
      try {
        setIsLogging(true);

        let verificationCode: string = code1 + code2 + code3 + code4;

        const data = {
          email,
          verificationCode
        }

        await api.post("/verify/email", data);

        setIsLogging(false);

        navigation.navigate('ResponseScreen', {
          nextScreenRoute: 'LoginEmail',
          title: "Criar Conta",
          message: `Agora é só fazer login\ne aproveitar sua conta.`,
          type: "sucess"
        });

      } catch (error) {

        setIsLogging(false);

        return Alert.alert("Verificação", "Código inválido/falha ao enviar, tente novamente.")
      }

    }
  }, []);

  function handleFocusInput2() {
    inputRef2?.current?.focus();
  };

  function handleFocusInput3() {
    inputRef3?.current?.focus();
  };

  function handleFocusInput4() {
    inputRef4?.current?.focus();
  };

  async function handleResendCode(email: string) {
    setStartCounter(true);
    setTotalTimeInSeconds(COUNTDOWN_INITIAL_TIME_IN_SECONDS);

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
    if (totalTimeInSeconds > 0) {
      setTimeout(() => {
        setTotalTimeInSeconds(totalTimeInSeconds - 1);
      }, 1000);
    } else {
      setStartCounter(false);
    }
    console.log(totalTimeInSeconds);
  }, [totalTimeInSeconds]);

  useEffect(() => {

  }, [code1]);


  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding' })}
      enabled
      style={{ flex: 1 }}
    >
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          containerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
        >
          <Container>

            <ContainerBackground />

            <Header>
              <TitleDefault>Confirme sua identidade</TitleDefault>
            </Header>

            <Svg width={240} height={240} />

            <TextsWelcome>
              <Title>Nós enviamos um E-mail contendo o código para</Title>
              <SubTitle>{email}</SubTitle>
            </TextsWelcome>

            <UserEvents>

              <InputCodeView>
                <InputCode
                  value={code1}
                  maxLength={1}
                  onChangeText={setCode1}
                  error={errorCode}
                />
                <InputCode
                  value={code2}
                  maxLength={1}
                  onChangeText={setCode2}
                  error={errorCode}
                />
                <InputCode
                  value={code3}
                  maxLength={1}
                  onChangeText={setCode3}
                  error={errorCode}
                />
                <InputCode
                  value={code4}
                  maxLength={1}
                  onChangeText={setCode4}
                  error={errorCode}
                />

              </InputCodeView>

              <TouchView>
                <CounterView>
                  {startCounter ?
                    <>
                      <Minutes>{minutes.toString().padStart(2, "0")}</Minutes>
                      <Separator>:</Separator>
                      <Seconds>{seconds.toString().padStart(2, "0")}</Seconds>
                    </>
                    :
                    <ResendView onPress={() => handleResendCode('mateusherculano0@gmail.com')} >
                      <ResendText>Reenviar código</ResendText>
                    </ResendView>
                  }
                </CounterView>

                <AfterView>
                  <AfterButton onPress={() => navigation.navigate("LoginEmail")}>
                    <AfterText>Confirmar depois</AfterText>
                  </AfterButton>
                </AfterView>

              </TouchView>

              <Button
                backgroundColor="primary"
                title="Criar conta"
                isLoading={isLogging}
                onPress={handleSubmit}
              />

            </UserEvents>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}