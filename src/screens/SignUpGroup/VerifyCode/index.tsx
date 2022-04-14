import React, { useCallback } from "react";
import { CommonActions } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TouchableWithoutFeedback } from "react-native";
import { ContainerBackground } from "../../../components/ContainerBackground";
import { Button } from "../../../components/Form/Button";
import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, InputCodeView, Header, ReturnButton, Icone, TouchView, ResendText, TitleDefault, ResendView, AlterView, AlterText } from "./styles";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { InputCode } from "../../../components/InputCode";
import { api } from "@services/api";

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

  const { name, email, password } = route.params

  const handleSignUp = useCallback(async (form: FormData) => {

    // const codesInput: FormData = {
    //   firstcode: form.firstInput,
    //   secondcode: form.secondInput,
    //   thirdcode: form.thirdInput,
    //   fourthcode: form.fourthInput
    // }

    // let valueCode: string = '';

    // for (const codes in codesInput) {
    //   valueCode += codesInput[codes]
    // }

    const data = {
      // valueCode,
      name,
      email,
      password
    }

    await api.post("/new", data)

    Alert.alert('Cadastro realizado com sucesso!', 'Faça login na aplicação')

    navigation.navigate("LoginEmail", data)
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
              {/* <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                <Icone name="arrow-back" />
              </ReturnButton> */}
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
                <ResendView>
                  <ResendText>Reenviar código</ResendText>
                </ResendView>
                <AlterView onPress={() => navigation.navigate("CreateAcount")}>
                  <AlterText>Alterar E-mail</AlterText>
                </AlterView>
              </TouchView>
              <Button
                backgroundColor="primary"
                title="Criar conta"
                onPress={handleSubmit(handleSignUp)}
              />
            </UserEvents>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}