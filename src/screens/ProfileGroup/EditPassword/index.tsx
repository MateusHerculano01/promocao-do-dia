import React from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CommonActions } from '@react-navigation/native';
import { ContainerBackground } from "@components/ContainerBackground";
import { InputForm } from "@components/Form/InputForm";
import { Button } from "@components/Form/Button";
import { Container, Header, Icone, ReturnButton, Title, Form, Fields } from "./styles";

interface FormData {
  [key: string]: any;
}

const schema = Yup.object().shape({
  oldPassword: Yup.string().required('Senha antiga é obrigatória'),
  newPassword: Yup.string().required('Nova senha é obrigatória'),
  confirmPassword: Yup.string().required('Confirmação de senha obrigatório'),
});

export function EditPassword({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function handleEditProfile(form: FormData) {
    const data = {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    }

    if (form.newPassword !== form.confirmPassword) {
      return Alert.alert("Editar senha", "As senhas não coincidem.")
    }

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding' })}
      enabled
      style={{ flex: 1 }}
    >
      <ScrollView showsHorizontalScrollIndicator={false}>

        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          containerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
        >

          <Container>
            <ContainerBackground />
            <Header>
              <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                <Icone name="arrow-back" />
              </ReturnButton>
              <Title>Editar senha</Title>
            </Header>
            <Form>
              <Fields>
                <InputForm
                  name="oldPassword"
                  control={control}
                  error={errors.oldPassword && errors.oldPassword.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  placeholder="Senha antiga"
                  iconName="lock-open-outline"
                  isPassword
                  iconRight
                />
                <InputForm
                  name="newPassword"
                  control={control}
                  error={errors.newPassword && errors.newPassword.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  placeholder="Nova senha"
                  iconName="lock-closed-outline"
                  isPassword
                  iconRight
                />
                <InputForm
                  name="confirmPassword"
                  control={control}
                  error={errors.confirmPassword && errors.confirmPassword.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  placeholder="Confirme sua senha"
                  iconName="lock-closed-outline"
                  isPassword
                  iconRight
                />

              </Fields>
              <Button
                title="Salvar"
                iconRight
                iconName="save-outline"
                backgroundColor="primary"
                onPress={handleSubmit(handleEditProfile)} />
            </Form>
          </Container>
        </TouchableWithoutFeedback>

      </ScrollView>
    </KeyboardAvoidingView >
  )
}