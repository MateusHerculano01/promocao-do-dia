import React from "react";
import { ProductAnnouncedDTOS } from "@dtos/ProductAnnouncedDTOS";

import { Container, ContainerImage, ProductImage, TitleProduct, Price } from "./styles";

interface Props {
  data: ProductAnnouncedDTOS;
  onPress: () => void;
}

export function ProductsOfCategory({ data, onPress }: Props) {
  console.log(data)
  return (
    <Container onPress={onPress}>
      {/* <ProductImage source={{ uri: data.product?.photos_url[0] ? data.product?.photos_url[0] : '' }} /> */}
      <ProductImage source={{ uri: 'https://github.com/MateusHerculano01.png' }} resizeMode="contain" />

      <TitleProduct>{data?.product?.name}</TitleProduct>
      {
        data?.product?.adValue ?
          <Price>{data?.product?.adValue}</Price>
          :
          <Price>{data?.product?.price}</Price>
      }

    </Container>
  )
}