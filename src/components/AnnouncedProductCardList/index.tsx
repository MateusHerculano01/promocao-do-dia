import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ProductAnnouncedInterface } from "@dtos/ProductAnnouncedDTOS";
import { formatPrice } from "@utils/formatPrice";
import { Container, Image, InfoProduct, Name, InfoProductView, Price, InfoSize, OldPrice, SelectView, Icon, ImageAdvertiser } from "./styles";

interface Props extends RectButtonProps {
  data: ProductAnnouncedInterface;
  active?: boolean;
  optionSelect: boolean;
  announced?: boolean;
}

export function AnnouncedProductCardList({ data, active = false, optionSelect = false, announced = false, ...rest }: Props) {

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
          {announced ?
            <ImageAdvertiser source={{ uri: data.advertiser?.photo_url }} resizeMode="cover" />
            :
            <InfoSize>{data.product.size}</InfoSize>
          }
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