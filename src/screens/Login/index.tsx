import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TouchableWithoutFeedback } from "react-native";
import { ContainerBackground } from "../../components/ContainerBackground";
import { Button } from "../../components/Form/Button";
import { InputWithLabel } from "../../components/Form/InputWithLabel";
import theme from "../../global/styles/theme";
import { Container, Svg, TextsWelcome, Title, SubTitle, UserEvents, ButtonsContainer } from "./styles";

export function Login() {
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
            <Svg width={196} height={220} />
            <TextsWelcome>
              <Title>Olá, seja bem vindo</Title>
              <SubTitle>Por favor para continuar informe o email vinculado a sua  conta</SubTitle>
            </TextsWelcome>
            <UserEvents>
              <InputWithLabel
                name="email"
                autoCapitalize="none"
                inputType="email-address"
                iconColor={theme.colors.blue_default}
                iconNameL="call-outline"
                placeholder="E-mail"
                style={{ marginTop: 28, marginBottom: 50 }}
              />
              <ButtonsContainer>
                <Button
                  backgroundColor="primary"
                  title="Acesse sua conta"
                  iconRight
                  iconName="arrow-forward-outline"
                  onPress={() => { }}
                />
                <Button
                  backgroundColor="secondary"
                  title="Criar uma nova conta"
                  onPress={() => { }}
                />
              </ButtonsContainer>
            </UserEvents>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}