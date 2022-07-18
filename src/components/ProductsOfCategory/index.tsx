import React from "react";
import { ProductDTOS } from "@dtos/ProductDTOS";

import { Container, ContainerImage, ProductImage, TitleProduct, Price } from "./styles";

interface Props {
  data: ProductDTOS;
  onPress: () => void;
}

export function ProductsOfCategory({ data, onPress }: Props) {

  return (
    <Container onPress={onPress}>
      <ProductImage source={{ uri: data.photos_url[0] ? data.photos_url[0] : 'nenuma foto' }} />

      <TitleProduct>{data?.name}</TitleProduct>
      {
        data?.adValue ?
          <Price>{data?.adValue}</Price>
          :
          <Price>{data?.price}</Price>
      }

    </Container>
  )
}