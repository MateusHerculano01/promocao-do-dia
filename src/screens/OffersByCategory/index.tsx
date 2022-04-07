import React from "react";
import { ImageSourcePropType } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { CategoryCard } from "../../components/CategoryCard";
import { InputSearch } from "../../components/Form/InputSearch";
import { LocationUser } from "../../components/LocationUser";
import { Container, Header, SearchContainer, CategoryView, CategoryList, ReturnButton, Icone, Title } from "./styles";
import { ContainerBackground } from "../../components/ContainerBackground";

export interface CategoryListProps {
  id: string;
  image: ImageSourcePropType;
  title: string;
}

export function OffersByCategory({ navigation }: any) {
  const data: CategoryListProps[] = [
    {
      id: '1',
      image: require('../../assets/fruitsVegetables/fruitsV.png'),
      title: 'Frutas e Vegetais'
    },
    {
      id: '2',
      image: require('../../assets/fastfood/fastfood.png'),
      title: 'Fast Food'
    },
    {
      id: '3',
      image: require('../../assets/drinks/drinks.png'),
      title: 'Bebidas'
    },
    {
      id: '4',
      image: require('../../assets/meats/meats.png'),
      title: 'Carnes e Peixes'
    },
    {
      id: '5',
      image: require('../../assets/snacks/snacks.png'),
      title: 'Prontos para comer'
    },
    {
      id: '6',
      image: require('../../assets/dairy/dairy.png'),
      title: 'Laticínios'
    },
    {
      id: '7',
      image: require('../../assets/dairy/dairy.png'),
      title: 'Limpeza e Higiene pessoal'
    },

  ]

  return (
    <Container>
      <ContainerBackground />
      <Header>
        <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
          <Icone name="arrowleft" />
        </ReturnButton>
        <Title>Logo Anunciante</Title>
      </Header>
      <SearchContainer>
        <InputSearch
          name="searchProduct"
          placeholder="Procure por um produto"
        />
      </SearchContainer>
      <CategoryView>
        <CategoryList
          data={data}
          numColumns={2}
          horizontal={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CategoryCard onPress={() => navigation.navigate('ProductsForCategory')} data={item} />}
        />
      </CategoryView>
    </Container>
  )
}