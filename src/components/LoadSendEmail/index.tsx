import React from 'react';
import LottieView from 'lottie-react-native';

import loadSendEmail from '@assets/load_send_email.json';

import { Container } from './styles';

export function LoadSendEmail() {
  return (
    <Container>
      <LottieView
        autoPlay
        loop
        source={loadSendEmail}
        style={{ height: 120 }}
      />
    </Container>
  );
}

