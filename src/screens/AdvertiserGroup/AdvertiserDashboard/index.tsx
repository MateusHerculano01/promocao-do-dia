import React, { useCallback, useState } from "react";
import { Alert } from "react-native";
import { api } from "@services/api";
import { AxiosError } from "axios";
import { useTheme } from "styled-components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AdvertiserDTOS } from "@dtos/AdvertiserDTOS";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserStockCard } from "@components/AdvertiserStockCard";
import { Button } from "@components/Form/Button";
import { LoadCart } from "@components/LoadCart";

import { Container, Header, Icone, ReturnButton, Title, WithoutAdContainer, NotFind, WithoutAdTitle, AdSection, EditButton, Icon, Text, AdImage, AdvertiserActions } from './styles';

export function AdvertiserDashboard() {
  const navigation = useNavigation();
  const theme = useTheme();

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

  function handleUpdateNavigation() {
    navigation.navigate("RegisterAdvertisement", { action: "update" });
  }

  useFocusEffect(
    useCallback(() => {
      fetchAdvertiser();
    }, [])
  );

  if (isLoading)
    return <LoadCart />

  return (
    <Container>
      <ContainerBackground />

      <Header>
        <ReturnButton onPress={() => navigation.navigate('ProfileScreen')}>
          <Icone name="arrow-back" />
        </ReturnButton>
        <Title>Área do anunciante</Title>
      </Header>

      {!!Object.keys(advertiser).length ?
        <>
          <AdSection>
            <EditButton onPress={handleUpdateNavigation}>
              <Icon name="edit" />
              <Text>Editar anúncio</Text>
            </EditButton>
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
              icon="add-shopping-cart"
              title="Anunciar produtos"
              onPress={() => { navigation.navigate("HomeAdvertiseProducts") }}
            />
            <AdvertiserStockCard
              icon="local-atm"
              iconColor={theme.colors.primary}
              title="Produtos anunciados"
              onPress={() => { navigation.navigate("HomeAnnouncedProducts") }}
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
            onPress={() => { navigation.navigate("RegisterAdvertisement", {}) }}
          />
        </WithoutAdContainer>

      }

    </Container>
  )
}

