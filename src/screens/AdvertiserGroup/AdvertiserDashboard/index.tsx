import React, { useEffect, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/auth";
import { api } from "@services/api";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserStockCard } from "@components/AdvertiserStockCard";
import { Container, Header, Icone, ReturnButton, Title, AdSection, EditView, Icon, Text, AdImage, AdvertiserActions } from './styles';

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

      setAdvertise(response.data)
    }

    loadAdvertiser();
  }, []);

  return (
    <Container>
      <ContainerBackground />

      <Header>
        <ReturnButton onPress={() => navigation.navigate('ProfileScreen')}>
          <Icone name="arrow-back" />
        </ReturnButton>
        <Title>Área do anunciante</Title>
      </Header>

      <AdSection>
        <EditView>
          <Icon name="pencil" />
          <Text>Editar anúncio</Text>
        </EditView>
        <AdImage source={{ uri: advertiser.photo_url }} resizeMode="cover" />
      </AdSection>

      <AdvertiserActions>
        <AdvertiserStockCard icon="grid-view" title="Categorias" />
        <AdvertiserStockCard icon="storefront" title="Produtos" />
        <AdvertiserStockCard icon="add-business" title="Anunciar produtos" />
        <AdvertiserStockCard icon="shopping-cart" title="Produtos anunciados" />
      </AdvertiserActions>
    </Container>
  )
}