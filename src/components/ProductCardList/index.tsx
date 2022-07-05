import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { Container, Image, InfoProduct, Name, InfoProductView, Price, InfoSize, Icon } from "./styles";

interface Props extends RectButtonProps {
  data: ProductDTOS;
}

export function ProductCardList({ data, onPress, ...rest }: Props) {

  return (
    <Container onPress={onPress} {...rest}>
      <Image source={{ uri: data.photos_url[0] }} />
      <InfoProduct>
        <Name>{data.name}</Name>
        <InfoProductView>
          <Price>{Number(data.price)
            .toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}</Price>
          <InfoSize>{data.size}</InfoSize>
        </InfoProductView>
      </InfoProduct>
      <Icon name="chevron-right" />
    </Container>
  )

}