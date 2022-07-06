import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { Container, Image, InfoProduct, Name, InfoProductView, Price, InfoSize, Icon, SelectView } from "./styles";
import { formatPrice } from "@utils/formatPrice";

interface Props extends RectButtonProps {
  data: ProductDTOS;
  optionSelect: boolean;
  active?: boolean;
}

export function ProductCardList({ data, optionSelect, active = false, onPress, ...rest }: Props) {

  return (
    <Container onPress={onPress} {...rest}>
      <Image source={{ uri: data.photos_url[0] }} />
      <InfoProduct>
        <Name>{data.name}</Name>
        <InfoProductView>
          <Price>{
            formatPrice(data.price)
          }</Price>
          <InfoSize>{data.size}</InfoSize>
        </InfoProductView>
      </InfoProduct>

      {optionSelect ?
        <SelectView active={active} />
        :
        <Icon name="chevron-right" />
      }
    </Container>
  )

}