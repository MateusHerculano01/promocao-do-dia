import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { api } from "@services/api";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserStockCard } from "@components/AdvertiserStockCard";
import { Button } from "@components/Form/Button";
import { LoadAnimation } from "@components/LoadAnimation";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadAdvertiser() {

      setLoading(true);

      await api.get('/advertiser/advertise')
        .then(response => {
          setAdvertise(response.data);
          setLoading(false);
        })
        .catch(error => console.log(error.response))
    }

    loadAdvertiser();
    setExistAdvertiser(!!Object.keys(advertiser).length)

    return () => { isMounted = false }

  }, [advertiser, existAdvertiser]);

  if (loading) {
    return (
      <LoadAnimation />
    )
  } else {
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


}