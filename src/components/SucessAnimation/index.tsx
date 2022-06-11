import React from 'react';
import LottieView from 'lottie-react-native';

import sucess from '@assets/sucess_animated.json';

import { Container } from './styles';

export function SucessAnimation() {
  return (
    <Container>
      <LottieView
        source={sucess}
        loop={false}
        autoPlay
        style={{ height: 150 }}
      />
    </Container>
  );
}

