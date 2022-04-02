import React from "react";
import { ProductCategoryListProps } from "../../screens/ProductsForCategory";
import { Container, ContainerImage, ProductImage, TitleProduct, Price } from "./styles";

interface Props {
  data: ProductCategoryListProps;
}

export function ProductsOfCategory({ data }: Props) {
  return (
    <Container>
      <ContainerImage>
        <ProductImage source={data.imageProduct} />
      </ContainerImage>
      <TitleProduct>{data.titleProduct}</TitleProduct>
      <Price>{data.pricing}</Price>
    </Container>
  )
}