import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { api } from "@services/api";
import { AdvertiseDTOS } from "@dtos/AdvertiseDTOS";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserStockCard } from "@components/AdvertiserStockCard";
import { Button } from "@components/Form/Button";
import { LoadAnimation } from "@components/LoadAnimation";

import { Container, Header, Icone, ReturnButton, Title, WithoutAdContainer, NotFind, WithoutAdTitle, AdSection, EditView, Icon, Text, AdImage, AdvertiserActions } from './styles';

export function AdvertiserDashboard() {
  const navigation = useNavigation();

  const [advertiser, setAdvertise] = useState<AdvertiseDTOS>({} as AdvertiseDTOS);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   let isMounted = true;

  //   async function fetchAdvertiser() {

  //     setLoading(true);

  //     await api.get('/advertiser/advertise')
  //       .then(response => {
  //         if (isMounted) {
  //           setAdvertise(response.data);
  //           setLoading(false);
  //         };
  //       })
  //       .catch(error => {
  //         console.log('erro da resposta', error.response)

  //       })
  //       .finally(() => {
  //         if (isMounted) {
  //           console.log('teste')

  //           setLoading(false)
  //         }
  //       });
  //   }

  //   fetchAdvertiser();

  //   return () => { isMounted = false };

  // }, [advertiser]);


  useEffect(() => {
    const abortController = new AbortController();

    async function fetchAdvertiser() {

      setLoading(true);

      await api.get('/advertiser/advertise')
        .then(response => {
          setAdvertise(response.data);

          setLoading(false);

        })
        .catch(error => {
          Alert.alert('Erro de carregamento', 'Ocorreu um erro ao carregar, tente novamente mais tarde');

          console.log('erro da resposta', error.response)

        })
        .finally(() => {

          setLoading(false)
        });
    }

    fetchAdvertiser();

    return () => { abortController.abort() };

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

      {loading ?
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

