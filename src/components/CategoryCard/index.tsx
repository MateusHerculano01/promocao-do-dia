import React from "react";
import { CategoryListProps } from "../../screens/OffersByCategory";
import { Container, ImageCategory, Title } from "./styles";

interface Props {
  data: CategoryListProps;
  onPress: () => void;
}

export function CategoryCard({ data, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <ImageCategory source={data.image} />
      <Title>{data.title}</Title>
    </Container>
  )
}