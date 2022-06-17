import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { api } from "@services/api";
import { AxiosError } from "axios";
import { AdvertiserDTOS } from "@dtos/AdvertiserDTOS";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserStockCard } from "@components/AdvertiserStockCard";
import { Button } from "@components/Form/Button";
import { LoadAnimation } from "@components/LoadAnimation";

import { Container, Header, Icone, ReturnButton, Title, WithoutAdContainer, NotFind, WithoutAdTitle, AdSection, EditView, Icon, Text, AdImage, AdvertiserActions } from './styles';

export function AdvertiserDashboard() {
  const navigation = useNavigation();

  const [advertiser, setAdvertiser] = useState({} as AdvertiserDTOS);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdvertiser = useCallback(async () => {
    setIsLoading(true);

    await api.get('/advertiser/advertise')
      .then(response => {

        setAdvertiser(response.data);

      })
      .catch(error => {
        if (error instanceof AxiosError) {
          console.log(error.response?.data)
        } else {
          Alert.alert("Erro ao carregar", "Ocorreu um erro ao carregar, tente novamente.")
        }
      })
      .finally(() => {
        setIsLoading(false)
      })

  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAdvertiser();
    }, [])
  );


  return (
    <Container>
      <ContainerBackground />

      <Header>
        <ReturnButton onPress={() => navigation.navigate('ProfileScreen')}>
          <Icone name="arrow-back" />
        </ReturnButton>
        <Title>Área do anunciante</Title>
      </Header>

      {isLoading ?
        <LoadAnimation />
        :
        !!Object.keys(advertiser).length ?
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
                onPress={() => { navigation.navigate("HomeProduct") }}
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

