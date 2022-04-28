import React from "react";
import { ImageSourcePropType } from "react-native";
import { ContainerBackground } from "../../components/ContainerBackground";
import { ProductsOfCategory } from "../../components/ProductsOfCategory";
import { Container, Header, ReturnButton, Icone, Title, ProductView, ProductCategoryList } from "./styles";
import { CommonActions } from '@react-navigation/native';

export interface ProductCategoryListProps {
  id: string;
  imageProduct: ImageSourcePropType;
  titleProduct: string;
  price: string;
}

export function ProductsForCategory({ navigation }: any) {
  const data: ProductCategoryListProps[] = [
    {
      id: '1',
      imageProduct: require('../../assets/static/products/danone.png'),
      titleProduct: 'Garrafa Danone sabor morango 1L',
      price: 'R$ 10,00'
    },
    {
      id: '2',
      imageProduct: require('../../assets/static/products/ninho.png'),
      titleProduct: 'Leite em pó em lata Ninho 400g',
      price: 'R$ 15,00'
    },
    {
      id: '3',
      imageProduct: require('../../assets/static/products/danone.png'),
      titleProduct: 'Garrafa Danone sabor morango 1L',
      price: 'R$ 10,00'
    },
    {
      id: '4',
      imageProduct: require('../../assets/static/products/ninho.png'),
      titleProduct: 'Leite em pó em lata Ninho 400g',
      price: 'R$ 15,00'
    }, {
      id: '5',
      imageProduct: require('../../assets/static/products/danone.png'),
      titleProduct: 'Garrafa Danone sabor morango 1L',
      price: 'R$ 10,00'
    },
    {
      id: '6',
      imageProduct: require('../../assets/static/products/ninho.png'),
      titleProduct: 'Leite em pó em lata Ninho 400g',
      price: 'R$ 15,00'
    }
  ]
  return (
    <Container>
      <ContainerBackground />
      <Header>
        <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
          {/* <Icone name="arrowleft" /> */}
        </ReturnButton>
        <Title>Categoria</Title>
      </Header>
      <ProductView>
        <ProductCategoryList
          data={data}
          numColumns={2}
          horizontal={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductsOfCategory onPress={() => navigation.navigate('InfoProduct')} data={item} />}
        />
      </ProductView>
    </Container>
  )
}