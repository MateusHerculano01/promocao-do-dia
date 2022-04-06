import React from "react";
import { ProductListProps } from "../../screens/SearchForTheCheapest";
import { Container, ProductImg, Description, TitleProduct, DataAdverstiser, Price, PriceOld } from './styles';

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
          <PriceOld>{data.price}</PriceOld>
          <Price>{data.price}</Price>
        </DataAdverstiser>
      </Description>
    </Container>
  )
}