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
import { Container, Svg, TextView, Text, UserEvents, Header, ReturnButton, Icone, TitleDefault, Fields } from "./styles";

interface FormData {
  [key: string]: any;
}

interface Props {
  navigation: BottomTabNavigationProp<any, any>;
  route: any;
}

const schemaUser = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória'),
  confirmPassword: Yup.string().required('Confirme a senha'),
});

export function CreatePassword({ navigation, route }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaUser)
  });

  const { name, email } = route.params

  const handleSignUp = useCallback((form: FormData) => {
    const data = {
      name,
      email,
      password: form.password,
      confirmPassword: form.confirmPassword
    }
    console.log(data)

    // navigation.navigate("Home", data)
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
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
              <TitleDefault>Escolha uma senha</TitleDefault>
            </Header>
            <TextView>
              <Text>Escolha uma senha segura, não compartilhe sua senha com ningúem</Text>
            </TextView>
            <Svg width={300} height={300} />
            <UserEvents>
              <Fields>
                <InputForm
                  name="password"
                  control={control}
                  error={errors.password && errors.password.message}
                  placeholder="Senha"
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  iconRight
                  isPassword
                  iconColor={theme.colors.title}
                  iconNameL="lock-closed-outline"
                />
                <InputForm
                  name="confirmPassword"
                  control={control}
                  error={errors.confirmPassword && errors.confirmPassword.message}
                  placeholder="Confirme sua senha"
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  iconRight
                  isPassword
                  iconColor={theme.colors.title}
                  iconNameL="lock-closed-outline"
                />
              </Fields>
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