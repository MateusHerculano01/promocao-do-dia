import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { Container, ProductImg, Description, TitleProduct, DataAdverstiser, Price, PriceOld } from './styles';

interface Props extends RectButtonProps {
  data: ProductDTOS;
}

export function ProductCardList({ data, onPress, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      <ProductImg source={{ uri: data.photos_url[0] }} resizeMode="contain" />
      <Description>
        <TitleProduct>{data.name}</TitleProduct>
        <DataAdverstiser>
          {data.adValue ?
            <>
              <PriceOld>{data.price}</PriceOld>
              <Price>{data.adValue}</Price>
            </>
            :
            <Price>{data.price}</Price>
          }

        </DataAdverstiser>
      </Description>
    </Container>
  )
}