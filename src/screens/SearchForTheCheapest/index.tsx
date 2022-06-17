import React from "react";
import { FlatList, ImageSourcePropType, Keyboard } from "react-native";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { InputSearch } from "@components/Form/InputSearch";
import { ProductCardList } from "@components/ProductCardList";
import { ContainerBackground } from "@components/ContainerBackground";
import { TitleWithNotification } from "@components/TitleWithNotification";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { Container, Header, SearchContainer, Separator } from "./styles";

export function SearchForTheCheapest() {
  const navigation = useNavigation();

  const data: ProductDTOS = {
    _id: "kdjsdlkdlkslds0290932lklkdsd",
    advertiser: "kdlskdsldksdskldlksdsd09003",
    name: "Leite ninho",
    size: "400g",
    brand: "Ninho",
    category: "Laticinios",
    price: 400,
    description: "O leite ninho é de leite",
    photos_url: [
      "https://shopee.com.br/Leite-Em-P%C3%B3-Instant%C3%A2neo-Nestl%C3%A9-Ninho-Forti-750g-i.426600469.9180276433",
      "https://github.com/MateusHerculano01.png"
    ],
    adValue: 398
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
          <TitleWithNotification title="Explorar preços e produtos" />
        </Header>
        <SearchContainer>
          <InputSearch
            name="searchProduct"
            placeholder="Procure por um produto ou serviço"
          />
        </SearchContainer>
        {/* <FlatList
          style={{ marginBottom: 10, paddingVertical: 5, paddingHorizontal: 5 }}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={data}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }) => <ProductCardList onPress={() => navigation.navigate('InfoProduct')} data={item} />}
        /> */}
      </Container>
    </TouchableWithoutFeedback>
  )
}