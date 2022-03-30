import React from 'react';
import { LocationUser } from '../../components/LocationUser';
import { TitleWithNotification } from '../../components/TitleWithNotification';

import {
  Container,
  Header
} from './styles';



export function Dashboard() {

  return (
    <Container>
      <Header>
        <TitleWithNotification
          title="Promoção do Dia"
        />

        <LocationUser
          textLocation='Sua localização'
          location='Bom Jesus de Goiás'
          onPress={() => { }}
        />
      </Header>
    </Container >
  )
}
