import React, { useCallback, useState } from "react";
import { FlatList, Keyboard, Linking } from "react-native";
import LottieView from 'lottie-react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useAuth } from "@hooks/auth";
import { useNotifications } from "@hooks/notifications";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { AdvertiserFormattedDTOS } from "@dtos/AdvertiserFormattedDTOS";
import { AdvertisementsCard } from "@components/AdvertisementsCard";
import { InputSearch } from "@components/Form/InputSearch";
import { Button } from "@components/Form/Button";
import { LocationUser } from "@components/LocationUser";
import { ContainerBackground } from "@components/ContainerBackground";
import { TitleWithNotification } from "@components/TitleWithNotification";
import { LoadAnimation } from "@components/LoadAnimation";
import { LoadCart } from "@components/LoadCart";
import adNotFind from '@assets/ad_not_find.json';

import { Container, Header, SearchContainer, AdNotFind, Title, SubTitle } from "./styles";

export function Dashboard() {
  const navigation = useNavigation();
  const { signOut, user } = useAuth();
  const { haveNotifications } = useNotifications();

  const [advertisers, setAdvertisers] = useState<AdvertiserFormattedDTOS[]>([]);
  const [filteredAdvertisers, setFilteredAdvertisers] = useState<AdvertiserFormattedDTOS[]>([]);
  const [search, setSearch] = useState<string>('');
  const [city, setCity] = useState('');

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdvertisers = useCallback(async () => {
    setLoading(true)

    await api.get(`/advertiser`)
      .then(response => {

        setAdvertisers(response.data);
        setFilteredAdvertisers(response.data);
      })
      .catch(error => {

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
          if (error.response?.data.message === "Invalid JWT token") {
            signOut();
          }
        }

      })
      .finally(() => setLoading(false))

  }, []);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/users/${user.id}`);

      setCity(data.user.city);
      setIsLoading(false);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)

      }

    }

  }, []);

  function handleSearchFilter(searchText: string) {
    if (searchText) {
      const newAdvertisers = advertisers.filter(advertiser => {
        if (advertiser.title) {
          const itemAdvertiser = advertiser.title.toUpperCase();
          const textSearch = searchText.toUpperCase();

          return itemAdvertiser.indexOf(textSearch) > -1;
        }
      });

      setFilteredAdvertisers(newAdvertisers);
      setSearch(searchText);

    } else {
      setFilteredAdvertisers(advertisers);
      setSearch(searchText);
    }
  }

  function handleClear() {
    setSearch('');
    fetchAdvertisers();
  }

  function handleNavigate(id: string | any) {
    navigation.navigate("OffersByCategory", id);
  }

  function handleNavigateLocality() {
    navigation.navigate("Locality", { dashboard: true, searchCheapest: false })
  }

  function handleSeePlans() {
    Linking.openURL(`whatsapp://send?phone=+5564981612655&text=${encodeURI("Olá, gostaria de saber mais sobre os planos para anunciar a minha empresa no Promoção do Dia")}`);
  }

  useFocusEffect(
    useCallback(() => {
      setSearch('');
      fetchAdvertisers();
      fetchUser();
    }, [])
  );

  const Data: any = [];

  if (isLoading) {
    return <LoadCart />;
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container>
        <ContainerBackground />
        <Header>
          <TitleWithNotification
            title="Promoção do Dia"
            onPress={() => navigation.navigate('Notifications')}
            notificationsActive={haveNotifications()}
          />
          <LocationUser
            textLocation="Sua localização"
            location={city}
            onPress={handleNavigateLocality}
          />
        </Header>

        <SearchContainer>
          <InputSearch
            name="searchProduct"
            placeholder="Procure por um anunciante"
            defaultValue={search}
            value={search}
            onChangeText={handleSearchFilter}
            onClear={handleClear}
          />
        </SearchContainer>


        {loading ? <LoadAnimation />
          :
          // (!!advertisers.length && !!filteredAdvertisers.length) ?


          // <FlatList
          //   data={Data}
          //   keyExtractor={(item) => String(item._id)}
          //   renderItem={({ item }) => (
          //     <AdvertisementsCard
          //       data={item}
          //       onPress={() => handleNavigate(item._id)}
          //     />
          //   )}
          // />

          // :
          <AdNotFind>
            <Title>
              Nenhum anúncio encontrado
              para sua região!
            </Title>

            <LottieView
              autoPlay
              loop
              source={adNotFind}
              style={{ height: 200 }}
            />

            <SubTitle>
              Venha anunciar conosco.
            </SubTitle>

            <Button
              title="Ver planos"
              iconRight
              iconName="arrow-forward-outline"
              backgroundColor="primary"
              onPress={handleSeePlans}
            />
          </AdNotFind>
        }

      </Container>
    </TouchableWithoutFeedback>
  );
}
