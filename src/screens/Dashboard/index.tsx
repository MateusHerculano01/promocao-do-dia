import React from 'react';
import { AdvertisementsCard } from '../../components/AdvertisementsCard';
import { InputSearch } from '../../components/Form/InputSearch';
import { LocationUser } from '../../components/LocationUser';
import { TitleWithNotification } from '../../components/TitleWithNotification';

import {
  Container,
  Header,
  SearchContainer,
  Advertisements,
  AdvertisementsList
} from './styles';

export interface DataListProps {
  id: string;
  title: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      title: 'Anúncio'
    },
    {
      id: '2',
      title: 'Anúncio'
    },
    {
      id: '3',
      title: 'Anúncio'
    },
    {
      id: '4',
      title: 'Anúncio'
    },
    {
      id: '5',
      title: 'Anúncio'
    },
    {
      id: '6',
      title: 'Anúncio'
    },
  ]
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

      <Advertisements>

        <AdvertisementsList
          data={data}
          keyExtractor={item => item.id}

          renderItem={({ item }) => <AdvertisementsCard data={item} />}
        />

      </Advertisements>

    </Container >
  )
}
