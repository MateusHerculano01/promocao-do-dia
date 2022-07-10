import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ProductAnnouncedInterface } from "@dtos/ProductAnnouncedDTOS";
import { formatPrice } from "@utils/formatPrice";
import { Container, Image, InfoProduct, Name, InfoProductView, Price, InfoSize, OldPrice, SelectView } from "./styles";

interface Props extends RectButtonProps {
  data: ProductAnnouncedInterface;
  active?: boolean;
  optionSelect: boolean;
}

export function AnnouncedProductCardList({ data, active = false, optionSelect = false, ...rest }: Props) {

  return (
    <Container  {...rest}>
      <Image source={{ uri: data.product.photos_url[0] }} />
      <InfoProduct>
        <Name>{data.product.name}</Name>
        <OldPrice>{formatPrice(data.product.price)}</OldPrice>
        <InfoProductView>
          <Price>{
            formatPrice(data.adValue)
          }</Price>
          <InfoSize>{data.product.size}</InfoSize>
        </InfoProductView>
      </InfoProduct>

      {optionSelect ?
        <SelectView active={active} />
        :
        <></>
      }

    </Container>
  )

}