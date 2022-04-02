import React from "react";
import { ProductListProps } from "../../screens/SearchForTheCheapest";
import { Container, ProductImg, UserImg, Description, TitleProduct, DataAdverstiser, Price, AdverstiserImage } from './styles';

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
          <AdverstiserImage>
            <UserImg source={data.imageUser} />
          </AdverstiserImage>
        </DataAdverstiser>
      </Description>
    </Container>
  )
}