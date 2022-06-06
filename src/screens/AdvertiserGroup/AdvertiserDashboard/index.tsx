import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { useAuth } from "@hooks/auth";
import { api } from "@services/api";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserStockCard } from "@components/AdvertiserStockCard";
import { Button } from "@components/Form/Button";
import { Container, Header, Icone, ReturnButton, Title, WithoutAdContainer, NotFind, WithoutAdTitle, AdSection, EditView, Icon, Text, AdImage, AdvertiserActions } from './styles';

type Advertise = {
  _id: string;
  user: string;
  photo_url: string;
  phone: number;
  title: string;
  link: string;
  size: string;
}

export function AdvertiserDashboard() {
  const navigation = useNavigation();

  const [advertiser, setAdvertise] = useState<Advertise>({} as Advertise);
  const [existAdvertiser, setExistAdvertiser] = useState(false);

  async function loadAdvertiser() {

    const response = await api.get('/advertiser/advertise');

    setAdvertise(response.data);
  }

  useEffect(() => {

    loadAdvertiser();
    setExistAdvertiser(!!Object.keys(advertiser).length)

  }, [advertiser, existAdvertiser]);

  return (
    <Container>
      <ContainerBackground />

      <Header>
        <ReturnButton onPress={() => navigation.navigate('ProfileScreen')}>
          <Icone name="arrow-back" />
        </ReturnButton>
        <Title>Área do anunciante</Title>
      </Header>

      {existAdvertiser ?
        <>
          <AdSection>
            <EditView>
              <Icon name="pencil" />
              <Text>Editar anúncio</Text>
            </EditView>
            <AdImage source={{ uri: advertiser.photo_url }} resizeMode="cover" />
          </AdSection>

          <AdvertiserActions>
            <AdvertiserStockCard
              icon="grid-view"
              title="Categorias"
              onPress={() => { navigation.navigate("HomeCategory") }}
            />
            <AdvertiserStockCard
              icon="storefront"
              title="Produtos"
              onPress={() => { }}
            />
            <AdvertiserStockCard
              icon="add-business"
              title="Anunciar produtos"
              onPress={() => { }}
            />
            <AdvertiserStockCard
              icon="shopping-cart"
              title="Produtos anunciados"
              onPress={() => { }}
            />
          </AdvertiserActions>
        </>

        :

        <WithoutAdContainer>
          <NotFind width={340} height={240} />
          <WithoutAdTitle>Nenhum anúncio encontrado</WithoutAdTitle>
          <Button
            backgroundColor="primary"
            title="Cadastrar anúncio"
            iconRight
            iconName="add-outline"
            onPress={() => { navigation.navigate("RegisterAdvertisement") }}
          />
        </WithoutAdContainer>
      }
    </Container>
  )
}