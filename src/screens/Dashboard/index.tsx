import React, { useCallback, useState } from "react";
import { FlatList, Keyboard } from "react-native";
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
import adNotFind from '@assets/ad_not_find.json';

import { Container, Header, SearchContainer, AdNotFind, Title, SubTitle } from "./styles";

export function Dashboard() {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { haveNotifications } = useNotifications();

  const [advertisers, setAdvertisers] = useState<AdvertiserFormattedDTOS[]>([]);
  const [filteredAdvertisers, setFilteredAdvertisers] = useState<AdvertiserFormattedDTOS[]>([]);
  const [search, setSearch] = useState<string>('');

  const [loading, setLoading] = useState(false);

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

  useFocusEffect(
    useCallback(() => {
      fetchAdvertisers();
      setSearch('');
    }, [])
  );

  const Data = [
    {
      _id: "62cb0235af4432ba92002090930932352f7+333332ba920352f7",
      size: 'group',
      announces: [{
        _id: "62cb0235af4432ba920352f7",
        photo_url: "https://s2.glbimg.com/PWzElwICb5ItVqUPSQmj6bxMkSY=/620x455/e.glbimg.com/og/ed/f/original/2014/07/29/caverna-melissani-kefalonia-grecia.jpg",
        size: "small",
        title: "User 1",
        user: "62a8d802ec6d6795e136c879",
      }, {
        _id: "62cb0235af4432ba920352f7",
        photo_url: "https://s2.glbimg.com/PWzElwICb5ItVqUPSQmj6bxMkSY=/620x455/e.glbimg.com/og/ed/f/original/2014/07/29/caverna-melissani-kefalonia-grecia.jpg",
        size: "small",
        title: "User 1",
        user: "62a8d802ec6d6795e136c879",
      }]
    },
    {
      _id: "62c20352f8+",
      size: 'full',
      announces: [
        {
          _id: "62c20352f8",
          photo_url: "https://i.pinimg.com/736x/e0/32/3f/e0323f11333441a953310c1fc094cb3c.jpg",
          size: "big",
          title: "User 2",
          user: "62a8d802ec6d6795e136c878",
        }]
    },

    {
      _id: "62cb0235af4352f7+62cb027asddsasad",
      size: 'group',
      announces: [{
        _id: "62cb0235af4432ba920352f7",
        photo_url: "https://s2.glbimg.com/PWzElwICb5ItVqUPSQmj6bxMkSY=/620x455/e.glbimg.com/og/ed/f/original/2014/07/29/caverna-melissani-kefalonia-grecia.jpg",
        size: "small",
        title: "User 1",
        user: "62a8d802ec6d6795e136c879",
      }, {
        _id: "62cb0235af4432ba920352f7",
        photo_url: "https://s2.glbimg.com/PWzElwICb5ItVqUPSQmj6bxMkSY=/620x455/e.glbimg.com/og/ed/f/original/2014/07/29/caverna-melissani-kefalonia-grecia.jpg",
        size: "small",
        title: "User 1",
        user: "62a8d802ec6d6795e136c879",
      }]
    },

  ]

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
            location="Bom Jesus de Goiás"
            onPress={() => { }}
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
          (!!advertisers.length && !!filteredAdvertisers.length) ?

            <FlatList
              data={Data}
              keyExtractor={(item) => String(item._id)}
              renderItem={({ item }) => (
                <AdvertisementsCard
                  onPress={() => handleNavigate(item._id)}
                  data={item}
                />
              )}
            />

            :
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
                onPress={() => { }}
              />
            </AdNotFind>
        }

      </Container>
    </TouchableWithoutFeedback>
  );
}
