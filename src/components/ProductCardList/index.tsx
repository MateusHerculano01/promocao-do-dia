import React from "react";
import { ProductListProps } from "../../screens/SearchForTheCheapest";
import { Container, ProductImg, Description, TitleProduct, DataAdverstiser, Price } from './styles';

interface Props {
  data: ProductListProps;
}

export function ProductCardList({ data }: Props) {
  return (
    <Container>
      <ProductImg source={data.imageProduct} />
      <Description>
        <TitleProduct>{data.titleProduct}</TitleProduct>
        <DataAdverstiser>
          <Price>{data.pricing}</Price>
        </DataAdverstiser>
      </Description>
    </Container>
  )
}