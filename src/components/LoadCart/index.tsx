import React from 'react';

import loadCart from '@assets/load_cart.json';

import { Container, LottieViewContainer } from './styles';

export function LoadCart() {
  return (
    <Container>
      <LottieViewContainer
        source={loadCart}
        autoPlay
        loop
      />
    </Container>
  );
}