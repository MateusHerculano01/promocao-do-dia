import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Content, Image, Name, Icon, Line } from "./styles";

export type CategoryProps = {
  id: string;
  photo_url: string;
  categoryName: string;
}

type Props = RectButtonProps & {
  data: CategoryProps;
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