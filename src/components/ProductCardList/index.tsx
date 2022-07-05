import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { Container, Image, InfoProduct, Name, InfoProductView, Price, InfoSize, Icon, SelectView } from "./styles";

interface Props extends RectButtonProps {
  data: ProductDTOS;
  optionSelect: boolean;
}

export function ProductCardList({ data, optionSelect, onPress, ...rest }: Props) {

  function formatPrice() {
    const format = data.price.replace(',', '.');
    const formated = parseFloat(format).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return formated;
  }

  return (
    <Container onPress={onPress} {...rest}>
      <Image source={{ uri: data.photos_url[0] }} />
      <InfoProduct>
        <Name>{data.name}</Name>
        <InfoProductView>
          <Price>{
            formatPrice()
          }</Price>
          <InfoSize>{data.size}</InfoSize>
        </InfoProductView>
      </InfoProduct>

      {optionSelect ?
        <SelectView />
        :
        <Icon name="chevron-right" />
      }
    </Container>
  )

}