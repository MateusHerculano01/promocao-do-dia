import React from "react";
import { ProductListProps } from "../../screens/SearchForTheCheapest";
import { Container, ProductImg, UserImg, Description, TitleProduct, DataAdverstiser, Pricing, AdverstiserImage } from './styles';

interface Props {
  data: ProductListProps;
}

export function ProductCardList({ data }: Props) {
  return (
    <Container>
      <ProductImg source={data.image} />
      <Description>
        <TitleProduct>{data.titleProduct}</TitleProduct>
        <DataAdverstiser>
          <Pricing>{data.pricing}</Pricing>
          <AdverstiserImage>
            <UserImg source={data.imageUser} />
          </AdverstiserImage>
        </DataAdverstiser>
      </Description>
    </Container>
  )
}