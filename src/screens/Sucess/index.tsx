import React from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SucessAnimation } from '@components/SucessAnimation';
import { Button } from '@components/Form/Button';
import { Container, Title, Message } from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: any;
  sucess: boolean;
}

export function Sucess() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { title, message, nextScreenRoute, sucess } = route.params as Params

  console.log(sucess)

  return (
    <Container>
      <StatusBar
        backgroundColor='transparent'
        translucent
      />
      <SucessAnimation />

      <Title style={{ color: sucess ? theme.colors.blue_default : theme.colors.attention }}>{title}</Title>

      <Message style={{ color: sucess ? theme.colors.blue_default : theme.colors.attention }}>{message}</Message>

      <Button
        title='Continuar'
        backgroundColor='primary'
        onPress={() => navigation.navigate(nextScreenRoute)}
      />
    </Container>
  );
}