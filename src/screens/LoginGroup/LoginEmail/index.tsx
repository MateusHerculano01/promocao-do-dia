import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { InputForm } from "@components/Form/InputForm";
import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, ButtonsContainer } from "./styles";

interface FormData {
  [key: string]: any;
}

const schema = Yup.object().shape({
  email: Yup.string().required('Email obrigatório').email('Insira um e-mail válido'),
});

export function LoginEmail() {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleLoginEmail = useCallback((form: FormData) => {

    navigation.navigate("LoginPassword", { email: form.email });

  }, [navigation]);

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        containerStyle={{ flex: 1 }}
      >
        <Container>

          <ContainerBackground />
          <Svg width={196} height={220} />
          <TextsWelcome>
            <Title>Olá, seja bem vindo</Title>
            <SubTitle>Por favor para continuar informe o email vinculado a sua  conta</SubTitle>
          </TextsWelcome>
          <UserEvents>
            <InputForm
              name="email"
              control={control}
              error={errors.email && errors.email.message}
              autoFocus
              autoCapitalize="none"
              inputType="email-address"
              iconName="call-outline"
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
  )
}