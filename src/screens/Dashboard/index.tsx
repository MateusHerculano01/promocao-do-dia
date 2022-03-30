import React from 'react';
import { InputSearch } from '../../components/Form/InputSearch';
import { LocationUser } from '../../components/LocationUser';
import { TitleWithNotification } from '../../components/TitleWithNotification';

import {
  Container,
  Header,
  SearchContainer
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
      <SearchContainer>
        <InputSearch
          name="searchProduct"
          placeholder='Procure por um produto ou serviço'
        />
      </SearchContainer>

    </Container >
  )
}
