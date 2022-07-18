import React from "react";
import { FlatList } from "react-native";
import { ProductCardList } from "../ProductCardList";
import { Container, ContainerImage, Image, TitleProduct, QuantityAndPrice, UnitMeasurement, Price, ContainerCategory, IconeCategory, Category, ContainerDescription, IconeDescription, Wrap, Description, SubTitle, Separator } from "./styles";

interface Props {
  data: InfoProductProps;
  onPress: () => void;
}

export function InfoProductCard({ data, onPress }: Props) {

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