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
  const { user } = useAuth();

  const [advertiser, setAdvertise] = useState<Advertise>({} as Advertise);

  useEffect(() => {
    async function loadAdvertiser() {

      const response = await api.get('/advertiser/advertise');

      setAdvertise(response.data);
    }

    loadAdvertiser();
  }, [advertiser]);

  return (
    <Container>
      <ContainerBackground />

      <Header>
        <ReturnButton onPress={() => navigation.navigate('ProfileScreen')}>
          <Icone name="arrow-back" />
        </ReturnButton>
        <Title>Área do anunciante</Title>
      </Header>

      {!Object.keys(advertiser).length ?
        <WithoutAdContainer>
          <NotFind width={340} height={240} />
          <WithoutAdTitle>Nenhum anúncio encontrado</WithoutAdTitle>
          <Button
            backgroundColor="primary"
            title="Cadastrar anúncio"
            iconRight
            iconName="newspaper-outline"
            onPress={() => { navigation.navigate("RegisterAdvertisement") }}
          />
        </WithoutAdContainer>
        :
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
              onPress={() => { }}
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
      }
    </Container>
  )
}