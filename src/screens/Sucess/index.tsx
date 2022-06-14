import React from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { SucessAnimation } from '@components/SucessAnimation';
import { Button } from '@components/Form/Button';
import { Container, Title } from './styles';

interface Params {
  title: string;
  nextScreenRoute: any;
}

export function Sucess() {
  const navigation = useNavigation();
  const route = useRoute();

  // useFocusEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => true
  //   );

  //   return () => backHandler.remove();
  // });

  const { title, nextScreenRoute } = route.params as Params

  return (
    <Container>
      <StatusBar
        backgroundColor='transparent'
        translucent
      />
      <SucessAnimation />

      <Title>{title}</Title>

      <Button
        title='Continuar'
        backgroundColor='primary'
        onPress={() => navigation.navigate(nextScreenRoute)}
      />
    </Container>
  );
}