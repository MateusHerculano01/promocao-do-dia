import React from 'react';
import { TitleWithNotification } from '../../components/TitleWithNotification';

import {
  Container,
  Header
} from './styles';



export function Dashboard() {

  return (
    <Container>
      <Header>
        <TitleWithNotification title="Promoção do Dia" />


      </Header>
    </Container >
  )
}
