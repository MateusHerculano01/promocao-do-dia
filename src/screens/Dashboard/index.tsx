import React, { useState } from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AdvertisementsCard } from "../../components/AdvertisementsCard";
import { InputSearch } from "../../components/Form/InputSearch";
import { LocationUser } from "../../components/LocationUser";
import { ContainerBackground } from "../../components/ContainerBackground";
import { TitleWithNotification } from "../../components/TitleWithNotification";
import {
  Container,
  Header,
  SearchContainer,
  Advertisements,
  AdvertisementsList,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export interface Announce {
  title: string;
  imageProduct?: any;
}

export interface DataListProps {
  id: string;
  type: string;
  enabled: boolean;
  announces: Announce[];
}

export function Dashboard() {
  const navigation = useNavigation();

  const [search, setSearch] = useState<string>();

  const data: DataListProps[] = [
    {
      id: "1",
      type: "unique",
      enabled: true,
      announces: [
        {
          title: "Anuncie aqui",
          imageProduct: require("../../assets/static/anunciante/zelim.png"),
        },
      ],
    },
    {
      id: "2",
      type: "group",
      enabled: false,
      announces: [{ title: "Anuncie aqui" }, { title: "Anuncie aqui" }],
    },
    {
      id: "3",
      type: "unique",
      enabled: false,
      announces: [{ title: "Anuncie aqui" }],
    },
    {
      id: "4",
      type: "group",
      enabled: false,
      announces: [{ title: "Anuncie aqui" }, { title: "Anuncie aqui" }],
    },
  ];

  const makeRandomId = (id: string) => {
    return id + Math.random() + new Date().getTime();
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container>
        <ContainerBackground />
        <Header>
          <TitleWithNotification title="Promoção do Dia" />
          <LocationUser
            textLocation="Sua localização"
            location="Bom Jesus de Goiás"
            onPress={() => { }}
          />
        </Header>
        <SearchContainer>
          <InputSearch
            name="searchProduct"
            defaultValue={search}
            onChangeText={setSearch}
            onClear={() => { }}
            placeholder="Procure por produtos ou serviços"
          />
        </SearchContainer>
        <Advertisements>
          <AdvertisementsList
            data={data}
            keyExtractor={(item) => makeRandomId(item.id)}
            renderItem={({ item }) => (
              <AdvertisementsCard
                onPress={() =>
                  item.enabled && navigation.navigate("OffersByCategory")
                }
                data={item}
              />
            )}
          />
        </Advertisements>
      </Container>
    </TouchableWithoutFeedback>
  );
}
