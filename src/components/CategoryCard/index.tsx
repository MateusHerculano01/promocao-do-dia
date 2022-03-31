import React from "react";
import { CategoryListProps } from "../../screens/OffersByCategory";
import { Container, ImageCategory, Title } from "./styles";

interface Props {
  data: CategoryListProps;
}

export function CategoryCard({ data }: Props) {
  return (
    <Container>
      <ImageCategory source={data.image} />
      <Title>{data.title}</Title>
    </Container>
  )
}