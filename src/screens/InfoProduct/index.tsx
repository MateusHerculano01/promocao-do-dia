import React from "react";
import { CommonActions } from '@react-navigation/native';
import { InfoProductCard, InfoProductProps } from "../../components/InfoProductCard";
import { Container, Header, Icone, ReturnButton, Title } from "./styles";
import { ContainerBackground } from "../../components/ContainerBackground";
import { FlatList } from "react-native";

export function InfoProduct({ navigation }: any) {
  const product: InfoProductProps[] = [
    {
      id: '1',
      titleProduct: 'Garrafa Danone sabor morango 1L',
      imageProduct: require('../../assets/static/products/danone.png'),
      // moreImages: {
      //   image1: require('../../assets/static/products/danone.png'),
      //   image2: require('../../assets/static/products/ninho.png')
      // },
      UnitMeasurement: '1 L',
      price: 'R$ 10,00',
      category: 'Laticínios',
      description: 'Aquele iogurte que fez parte da família de muitos brasileiros, está de volta com um portfólio completo. Muitas opções de sabores e formatos, além de saudável e muito gostoso. É uma ótima opção para começar bem o dia',
    }
  ]

  return (
    <Container>
      <ContainerBackground />

      <Header>
        <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
          <Icone name="arrowleft" />
        </ReturnButton>
        <Title>Detalhes do produto</Title>
      </Header>

      <FlatList
        style={{ marginTop: -20, paddingHorizontal:15 }}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        data={product}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <InfoProductCard data={item} />}
      />
      {/* {product.map(itens =>
          <InfoProductCard key={itens.id} data={itens} />
        )} */}
    </Container>
  )
}