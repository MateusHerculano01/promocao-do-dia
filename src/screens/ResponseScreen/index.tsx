import React from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ResponseAnimation } from '@components/ResponseAnimation';
import { Button } from '@components/Form/Button';
import { Container, Title, Message } from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: any;
  type: "error" | "sucess";
}

export function ResponseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { title, message, nextScreenRoute, type } = route.params as Params

  return (
    <Container>

      <ResponseAnimation
        type={type}
      />

      <Title style={{ color: type === "sucess" ? theme.colors.blue_default : theme.colors.attention }}>{title}</Title>

      <Message style={{ color: type === "sucess" ? theme.colors.blue_default : theme.colors.attention }}>{message}</Message>

      <Button
        title='Continuar'
        backgroundColor='primary'
        onPress={() => navigation.navigate(nextScreenRoute)}
      />
    </Container>
  );
}