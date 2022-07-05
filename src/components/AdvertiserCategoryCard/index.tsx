import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { CategoryDTOS } from "@dtos/CategoryDTOS";
import { Container, Image, Name, Icon } from "./styles";

type Props = RectButtonProps & {
  data: CategoryDTOS;
}

export function AdvertiserCategoryCard({ data, ...rest }: Props) {

  return (
    <Container {...rest}>
      <Image source={{ uri: data.photo_url }} />
      <Name>{data.categoryName}</Name>
      <Icon name="chevron-right" />
    </Container>
  )

}