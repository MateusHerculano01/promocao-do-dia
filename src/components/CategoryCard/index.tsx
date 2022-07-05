import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { CategoryListProps } from "../../screens/OffersByCategory";
import { Container, ImageCategory, Title } from "./styles";

interface Props extends RectButtonProps {
  data: CategoryListProps;
}

export function CategoryCard({ data, onPress, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      <ImageCategory source={data.image} />
      <Title>{data.title}</Title>
    </Container>
  )
}