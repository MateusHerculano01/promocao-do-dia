import React from "react";
import { ImageSourcePropType } from "react-native";
import { ContainerBackground } from "../../components/ContainerBackground";
import { ProductsOfCategory } from "../../components/ProductsOfCategory";
import { Container, Header, ReturnButton, Icone, Title, ProductView, ProductCategoryList } from "./styles";

export interface ProductCategoryListProps {
  id: string;
  imageProduct: ImageSourcePropType;
  titleProduct: string;
  pricing: string;
}

export function ProductsForCategory() {
  const data: ProductCategoryListProps[] = [
    {
      id: '1',
      imageProduct: require('../../assets/static/products/danone.png'),
      titleProduct: 'Garrafa Danone sabor morango 1L',
      pricing: 'R$ 10,00'
    },
    {
      id: '2',
      imageProduct: require('../../assets/static/products/ninho.png'),
      titleProduct: 'Leite em pó em lata Ninho 400g',
      pricing: 'R$ 15,00'
    },
    {
      id: '3',
      imageProduct: require('../../assets/static/products/danone.png'),
      titleProduct: 'Garrafa Danone sabor morango 1L',
      pricing: 'R$ 10,00'
    },
    {
      id: '4',
      imageProduct: require('../../assets/static/products/ninho.png'),
      titleProduct: 'Leite em pó em lata Ninho 400g',
      pricing: 'R$ 15,00'
    }, {
      id: '5',
      imageProduct: require('../../assets/static/products/danone.png'),
      titleProduct: 'Garrafa Danone sabor morango 1L',
      pricing: 'R$ 10,00'
    },
    {
      id: '6',
      imageProduct: require('../../assets/static/products/ninho.png'),
      titleProduct: 'Leite em pó em lata Ninho 400g',
      pricing: 'R$ 15,00'
    }
  ]
  return (
    <Container>
      <ContainerBackground />
      <Header>
        <ReturnButton>
          <Icone name="arrowleft" />
        </ReturnButton>
        <Title>Categoria</Title>
      </Header>
      <ProductView>
        <ProductCategoryList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductsOfCategory data={item} />}
        />
      </ProductView>
    </Container>
  )
}