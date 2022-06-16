import React from 'react';
import LottieView from 'lottie-react-native';

import sucessAnimation from '@assets/sucess_animated.json';
import errorAnimation from '@assets/error_animated.json';

import { Container } from './styles';

type Props = {
  type: "error" | "sucess";
}

export function ResponseAnimation({ type }: Props) {
  return (
    <Container>
      <LottieView
        source={type === "sucess" ? sucessAnimation : errorAnimation}
        loop={false}
        autoPlay
        style={{ height: 150 }}
      />
    </Container>
  );
}

