import React from "react";
import { Dimensions, FlatList, Text } from "react-native";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { InfoProductCard } from "@components/InfoProductCard";
import { ContainerBackground } from "@components/ContainerBackground";
import { formatPrice } from "@utils/formatPrice";
import { Category, Container, ContainerCategory, ContainerDescription, ContainerImage, Description, Header, Icone, IconeCategory, IconeDescription, Image, Price, ProductName, QuantityAndPrice, ReturnButton, SubTitle, Title, UnitMeasurement, Wrap } from "./styles";

export function InfoProduct() {
  const navigation = useNavigation();
  const route = useRoute();

  const data = [
    {
      _id: "62d36e65702c053628656ada",
      advertiser: "62c5c2b9d4ec94c0a88c762e",
      name: 'Leite botavo',
      size: '1l',
      brand: 'botavo',
      category: "62c5ca90d4ec94c0a88c764c",
      price: '10,00',
      description: 'leite de saquinho',
      photos: ['57479fd9efb5975fae7c-0a1120e2-82fb-4a64-a576-7ed435755563.png'],
      announced: true,
      adValue: '3,00'
    },
    [
      {
        _id: "62d02c05366ada",
        advertiser: "62c5c2b9d4ec94c0a88c762e",
        name: 'Leite botavo',
        size: '1l',
        brand: 'botavo',
        category: "62c5ca90d4ec94c0a88c764c",
        price: '10,00',
        description: 'leite de saquinho',
        photos: ['57479fd9efb5975fae7c-0a1120e2-82fb-4a64-a576-7ed435755563.png'],
        announced: true,
        adValue: '3,00'
      },
      {
        _id: "da",
        advertiser: "62c5c2b9d4ec94c0a88c762e",
        name: 'Leite botavo',
        size: '1l',
        brand: 'botavo',
        category: "62c5ca90d4ec94c0a88c764c",
        price: '10,00',
        description: 'leite de saquinho',
        photos: ['57479fd9efb5975fae7c-0a1120e2-82fb-4a64-a576-7ed435755563.png'],
        announced: true,
        adValue: '3,00'
      },
      {
        _id: "628656ada",
        advertiser: "62c5c2b9d4ec94c0a88c762e",
        name: 'Leite botavo',
        size: '1l',
        brand: 'botavo',
        category: "62c5ca90d4ec94c0a88c764c",
        price: '10,00',
        description: 'leite de saquinho',
        photos: ['57479fd9efb5975fae7c-0a1120e2-82fb-4a64-a576-7ed435755563.png'],
        announced: true,
        adValue: '3,00'
      },
    ]
  ]

  const _id = data[0]._id;

  return (
    <Container>
      <ContainerBackground />

      <Header>
        <ReturnButton
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        >
          <Icone name="arrowleft" />
        </ReturnButton>
        <Title>Detalhes do produto</Title>
      </Header>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item[0]?._id)}
        renderItem={({ item }) => (
          <>
            <ContainerImage>
              <Image source={{ uri: 'https://m.media-amazon.com/images/I/81j00XpMTHS._AC_SX425_.jpg' }} resizeMode="contain" />
            </ContainerImage>

            <ProductName>Leite ninho</ProductName>

            <QuantityAndPrice>
              <UnitMeasurement>10 l</UnitMeasurement>
              <Price>{formatPrice("20")}</Price>
            </QuantityAndPrice>

            <ContainerCategory>
              <IconeCategory name="ios-filter-outline" />
              <Category>Laticinios</Category>
            </ContainerCategory>

            <ContainerDescription>
              <IconeDescription name="reorder-three-outline" />
              <Wrap>
                <Description>Leite ninho de teste</Description>
              </Wrap>
            </ContainerDescription>
          </>
        )}

      />


      <SubTitle>Produtos semelhantes</SubTitle>

      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => (
          <Text>Teste</Text>
        )}
      />


    </Container>

  );
}
