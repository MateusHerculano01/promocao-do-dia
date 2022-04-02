import React from "react";
import { AdvertisementsCard } from "../../components/AdvertisementsCard";
import { InputSearch } from "../../components/Form/InputSearch";
import { LocationUser } from "../../components/LocationUser";
import { TitleWithNotification } from "../../components/TitleWithNotification";
import {
  Container,
  Header,
  SearchContainer,
  Advertisements,
  AdvertisementsList,
  ContainerBackground
} from "./styles";

export interface Announce {
  title: string;
}

export interface DataListProps {
  id: string;
  type: string;
  announces: Announce[]
}

export function Dashboard() {
  //Requisição vinda do node rota GET /api/advertisements
  const data: DataListProps[] = [
    {
      id: "1",
      type: 'unique',
      announces: [
        { title: 'Anuncie aqui' }
      ]
    },
    {
      id: "2",
      type: 'group',
      announces: [
        { title: 'Anuncie aqui' },
        { title: 'Anuncie aqui' }
      ]
    },
    {
      id: "3",
      type: 'unique',
      announces: [
        { title: 'Anuncie aqui' }
      ]
    },
    {
      id: "4",
      type: 'group',
      announces: [
        { title: 'Anuncie aqui' },
        { title: 'Anuncie aqui' }
      ]
    },
  ];

  return (
    <Container>
      <Header>
        <TitleWithNotification title="Promoção do Dia" />
        <LocationUser
          textLocation="Sua localização"
          location="Bom Jesus de Goiás"
          onPress={() => { }}
        />
      </Header>
      <SearchContainer>
        <InputSearch
          name="searchProduct"
          placeholder="Procure por um produto ou serviço"
        />
      </SearchContainer>
      <Advertisements>
        <AdvertisementsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AdvertisementsCard data={item} key={item.id} />}
        />
      </Advertisements>
    </Container>
  );
}
