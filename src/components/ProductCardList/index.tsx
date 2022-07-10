import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { Container, Image, InfoProduct, Name, InfoProductView, Price, InfoSize, Icon, SelectView, OldPrice } from "./styles";
import { formatPrice } from "@utils/formatPrice";

interface Props extends RectButtonProps {
  data: ProductDTOS;
  optionSelect: boolean;
  active?: boolean;
  displayAdValue?: boolean;
}

export function ProductCardList({ data, optionSelect, active = false, displayAdValue = false, onPress, ...rest }: Props) {

  return (
    <Container onPress={onPress} {...rest}>
      <Image source={{ uri: data.photos_url[0] }} />
      <InfoProduct>
        <Name>{data.name}</Name>
        {(!!data.adValue && displayAdValue) ?
          <>
            <OldPrice>{formatPrice(data.price)}</OldPrice>

            <InfoProductView>
              <Price>{
                formatPrice(data.adValue)
              }</Price>
              <InfoSize>{data.size}</InfoSize>
            </InfoProductView>

          </>

          :

          <InfoProductView>
            <Price>{
              formatPrice(data.price)
            }</Price>
            <InfoSize>{data.size}</InfoSize>
          </InfoProductView>
        }
      </InfoProduct>

      {optionSelect ?
        <SelectView active={active} />
        :
        <Icon name="chevron-right" />
      }
    </Container>
  )

}