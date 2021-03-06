import React from "react";
import { ProductCategoryListProps } from "../../screens/ProductsForCategory";
import { Container, ContainerImage, ProductImage, TitleProduct, Price } from "./styles";

interface Props {
  data: ProductCategoryListProps;
  onPress: () => void;
}

export function ProductsOfCategory({ data, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <ContainerImage>
        <ProductImage source={data.imageProduct} />
      </ContainerImage>
      <TitleProduct>{data.titleProduct}</TitleProduct>
      <Price>{data.price}</Price>
    </Container>
  )
}