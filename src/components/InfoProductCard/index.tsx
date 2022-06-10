import React from "react";
import { FlatList, ImageSourcePropType } from "react-native";
import { ProductListProps } from "../../screens/SearchForTheCheapest";
import { ProductCardList } from "../ProductCardList";
import { Container, ContainerImage, Image, TitleProduct, QuantityAndPrice, UnitMeasurement, Price, ContainerCategory, IconeCategory, Category, ContainerDescription, IconeDescription, Wrap, Description, SubTitle, Separator } from "./styles";

export interface InfoProductProps {
  id: string;
  titleProduct: string;
  imageProduct: ImageSourcePropType;
  //moreImages: Images,
  UnitMeasurement: string;
  price: string;
  category: string;
  description: string;
}

interface Props {
  data: InfoProductProps;
  onPress: () => void;
}

export function InfoProductCard({ data, onPress }: Props) {
  const productsInTheSameCategory: ProductListProps[] = [
    {
      id: '1',
      imageProduct: require('../../assets/static/products/ninho.png'),
      titleProduct: 'Leite em pó em lata Ninho 400g',
      price: 'R$ 15,00',
      category: 'Laticínios',
    },
    {
      id: '2',
      imageProduct: require('../../assets/static/products/ninho.png'),
      titleProduct: 'Leite em pó em lata Ninho 400g',
      price: 'R$ 15,00',
      category: 'Laticínios',
    },
    {
      id: '3',
      imageProduct: require('../../assets/static/products/ninho.png'),
      titleProduct: 'Leite em pó em lata Ninho 400g',
      price: 'R$ 15,00',
      category: 'Laticínios',
    },
  ]
  return (
    <Container>
      <ContainerImage>
        <Image source={data.imageProduct} />
      </ContainerImage>

      <TitleProduct>{data.titleProduct}</TitleProduct>

      <QuantityAndPrice>
        <UnitMeasurement>{data.UnitMeasurement}</UnitMeasurement>
        <Price>{data.price}</Price>
      </QuantityAndPrice>

      <ContainerCategory>
        <IconeCategory name="ios-filter-outline" />
        <Category>{data.category}</Category>
      </ContainerCategory>

      <ContainerDescription>
        <IconeDescription name="reorder-three-outline" />
        <Wrap>
          <Description>{data.description}</Description>
        </Wrap>
      </ContainerDescription>

      <SubTitle>Produtos semelhantes</SubTitle>

      <FlatList
        showsVerticalScrollIndicator={false}
        horizontal={false}
        data={productsInTheSameCategory}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <Separator />}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <ProductCardList onPress={onPress} data={item} />}
      />
    </Container>
  )
}