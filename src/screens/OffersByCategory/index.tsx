import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, Text } from "react-native";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CommonActions, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { AxiosError } from "axios";
import { api } from "@services/api";
import { CategoryDTOS } from "@dtos/CategoryDTOS";
import { ProductAnnouncedDTOS } from "@dtos/ProductAnnouncedDTOS";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { NotFind } from "@components/NotFind";
import { AnnouncedProductCardList } from "@components/AnnouncedProductCardList";
import { LoadAnimation } from "@components/LoadAnimation";
import { LoadCart } from "@components/LoadCart";
import { ListDivider } from "@components/ListDivider";

import { Container, Header, SearchContainer, ReturnButton, Icone, Title, CategoryCard, ImageCategory, CategoryName } from "./styles";

type NavigationProps = {
  id: string;
}

export function OffersByCategory() {
  const navigation = useNavigation();
  const route = useRoute();

  // const { id } = route.params as NavigationProps;

  const [categories, setCategories] = useState<CategoryDTOS[]>([]);
  const [products, setProducts] = useState<ProductAnnouncedDTOS[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductAnnouncedDTOS[]>([]);
  const [search, setSearch] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCategories() {
    setIsLoading(true)

    await api.get(`/categories/62c5c2b9d4ec94c0a88c762e`)
      .then(response => {

        setCategories(response.data);

      })
      .catch(error => {

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
        }
      })
      .finally(() => setIsLoading(false))

    fetchProducts();

  }

  async function fetchProducts() {
    setLoading(true)

    await api.get(`/products-announced/products-by-advertiser/62c5c2b9d4ec94c0a88c762e`)
      .then(response => {

        setProducts(response.data);
        setFilteredProducts(response.data);

      })
      .catch(error => {

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
        }
      })
      .finally(() => setLoading(false))

  }

  function handleSearchFilter(searchText: string) {
    if (searchText) {
      const newProducts = products.filter(product => {
        if (product?.product?.name) {
          const itemProduct = product?.product?.name.toUpperCase();
          const textSearch = searchText.toUpperCase();

          return itemProduct.indexOf(textSearch) > -1;
        }
      });

      setFilteredProducts(newProducts);
      setSearch(searchText);

    } else {
      setFilteredProducts(products);
      setSearch(searchText);
    }
  }

  function handleClear() {
    setSearch('');
    setFilteredProducts([]);
    fetchCategories();
  }

  useEffect(() => {
    fetchCategories();
    setSearch('');
  }, []);

  if (isLoading) {
    return <LoadCart />
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container>
        <ContainerBackground />
        <Header>
          <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <Icone name="arrowleft" />
          </ReturnButton>
          <Title>Ofertas {categories[0]?.advertiser.title}</Title>
        </Header>
        <SearchContainer>
          <InputSearch
            name="searchProduct"
            placeholder="Procure por um produto"
            defaultValue={search}
            value={search}
            onChangeText={handleSearchFilter}
            onClear={handleClear}
          />
        </SearchContainer>

        {loading ? <LoadAnimation />
          :
          !!search ?

            (!!products.length && !!filteredProducts.length) ?

              <FlatList
                key={'_'}
                data={filteredProducts}
                style={{ marginBottom: 10, paddingVertical: 15 }}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                numColumns={1}
                keyExtractor={item => String(item._id)}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                  <AnnouncedProductCardList
                    optionSelect={false}
                    data={item}
                    onPress={() => { }}
                  />
                )}
              />

              :
              <NotFind />

            :

            (!!categories.length) ?

              <FlatList
                key={'#'}
                data={categories}
                numColumns={2}
                horizontal={false}
                keyExtractor={(item) => String(item._id)}
                style={{ paddingVertical: 15, paddingHorizontal: 16 }}
                renderItem={({ item }) => (
                  <CategoryCard>
                    <ImageCategory source={{ uri: item.photo_url }} resizeMode="contain" />
                    <CategoryName>{item.categoryName}</CategoryName>
                  </CategoryCard>
                )}
              />

              :

              <NotFind />
        }

      </Container>
    </TouchableWithoutFeedback>
  )
}