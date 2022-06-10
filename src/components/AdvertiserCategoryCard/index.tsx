import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { CategoryDTOS } from "@dtos/CategoryDTOS";
import { Container, Content, Image, Name, Icon, Line } from "./styles";

type Props = RectButtonProps & {
  data: CategoryDTOS;
}

export function AdvertiserCategoryCard({ data, ...rest }: Props) {

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />
        <Name>{data.categoryName}</Name>
        <Icon name="chevron-right" />
      </Content>

      <Line />
    </Container>
  )

}