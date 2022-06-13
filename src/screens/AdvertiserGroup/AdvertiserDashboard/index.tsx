import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAdvertiser } from "@hooks/advertiser";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserStockCard } from "@components/AdvertiserStockCard";
import { Button } from "@components/Form/Button";

import { Container, Header, Icone, ReturnButton, Title, WithoutAdContainer, NotFind, WithoutAdTitle, AdSection, EditView, Icon, Text, AdImage, AdvertiserActions } from './styles';

export function AdvertiserDashboard() {
  const navigation = useNavigation();

  const { advertiser, hasError } = useAdvertiser();
  console.log("advertiser: ", advertiser)

  if (hasError) {
    Alert.alert("Erro de carregamento", "Ocorreu um erro ao carregar, tente novamente.")
  }

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

