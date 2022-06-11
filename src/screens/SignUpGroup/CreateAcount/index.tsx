import React, { useCallback } from "react";
import { CommonActions } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { InputForm } from "@components/Form/InputForm";
import theme from "@global/styles/theme";
import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, Header, ReturnButton, Icone, TitleDefault, Fields } from "./styles";

interface FormData {
  [key: string]: any;
}

const schemaUser = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('Insira um e-mail válido')
});

export function CreateAcount() {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaUser)
  });

  const handleSignUp = useCallback((form: FormData) => {
    if (form.email) {
      Alert.alert(
        "Criar conta",
        `Será criado um usuário com o e-mail ${form.email} deseja continuar?`,
        [
          {
            text: "Cancelar",
            onPress: () => { },
            style: "cancel"
          },
          {
            text: "Continuar",
            onPress: () => {
              navigation.navigate("CreatePassword", { name: form.name, email: form.email })
            }
          }
        ]
      );

      const data = {
        name: form.name,
        email: form.email
      }

      console.log(data)

    }

  }, [navigation]);

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
                  returnKeyType="next"
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
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleSignUp)}
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