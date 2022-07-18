import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { formatPrice } from "@utils/formatPrice";
import { Container, Image, InfoProduct, Name, InfoProductView, Price, InfoSize, OldPrice, SelectView, Icon, ImageAdvertiser } from "./styles";

interface Props extends RectButtonProps {
  data: ProductDTOS;
  active?: boolean;
  optionSelect: boolean;
  announced?: boolean;
}

export function AnnouncedProductCardList({ data, active = false, optionSelect = false, announced = false, ...rest }: Props) {

  return (
    <Container  {...rest}>
      <Image source={{ uri: data?.photos_url[0] }} />

      <InfoProduct>
        <Name>{data.name}</Name>

        {data.adValue ?
          <OldPrice>{formatPrice(data.price)}</OldPrice>
          :
          <></>
        }

        <InfoProductView>
          {data.adValue ?
            <Price>{
              formatPrice(data.adValue)
            }</Price>
            :
            <Price>{
              formatPrice(data.price)
            }</Price>
          }

          {announced ?
            <ImageAdvertiser source={{ uri: data.advertiser?.photo_url }} resizeMode="cover" />
            :
            <InfoSize>{data.size}</InfoSize>
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