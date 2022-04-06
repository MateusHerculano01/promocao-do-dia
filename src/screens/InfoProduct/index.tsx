import React from "react";
import { CommonActions } from '@react-navigation/native';
import { InfoProductCard, InfoProductProps } from "../../components/InfoProductCard";
import { Container, ContainerScroll, Header, Icone, ReturnButton, Title, SubTitle } from "./styles";
import { ContainerBackground } from "../../components/ContainerBackground";

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
      <ContainerScroll>
        <Header>
          <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <Icone name="arrowleft" />
          </ReturnButton>
          <Title>Detalhes do produto</Title>
        </Header>

        {product.map(itens =>
          <InfoProductCard key={itens.id} data={itens} />
        )}

        <SubTitle>Produtos semelhantes</SubTitle>
      </ContainerScroll>

    </Container>
  )
}