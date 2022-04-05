import React from "react";
import { FlatList, ImageSourcePropType } from "react-native";
import { InputSearch } from "../../components/Form/InputSearch";
import { ProductCardList } from "../../components/ProductCardList";
import { TitleWithNotification } from "../../components/TitleWithNotification";
import { Container, Header, SearchContainer, Separator } from "./styles";
import { ContainerBackground } from "../../components/ContainerBackground";
export interface ProductListProps {
  id: string;
  imageProduct: ImageSourcePropType;
  titleProduct: string;
  pricing: string;
}

export function SearchForTheCheapest() {
  const image = '../../assets/static/products/ninho.png';
  const data: ProductListProps[] = [
    {
      id: '1',
      imageProduct: require(image),
      titleProduct: 'Leite em pó em lata Ninho 400g',
      pricing: 'R$ 15,00'
    },

  ]

  return (
    <Container>
      <ContainerBackground />
      <Header>
        <TitleWithNotification title="Explorar preços e produtos" />
      </Header>
      <SearchContainer>
        <InputSearch
          name="searchProduct"
          placeholder="Procure por um produto ou serviço"
        />
      </SearchContainer>
      <FlatList
        style={{ marginBottom: 10, paddingVertical: 5, paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <ProductCardList data={item} />}
      />
    </Container>
  )
}