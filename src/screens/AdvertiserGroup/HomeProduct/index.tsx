import React, { useState, useCallback, useEffect } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { LoadAnimation } from "@components/LoadAnimation";
import { ProductCardList } from "@components/ProductCardList";
import { ListDivider } from "@components/ListDivider";
import { Container, Header, Icone, ReturnButton, SearchContainer, Title, TextProduct, ButtonView } from "./styles";
import { NotFind } from "@components/NotFind";

export function HomeProduct() {
  const navigation = useNavigation();
  const [products, setProducts] = useState<ProductDTOS[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDTOS[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    setLoading(true)

    await api.get(`/products`)
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
        if (product.name) {
          const itemProduct = product.name.toUpperCase();
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
    fetchProducts();
  }

  useFocusEffect(
    useCallback(() => {
      setProducts([]);
      setSearch('');
      fetchProducts();
    }, [])
  );

  function handleOpen(id: string) {
    navigation.navigate('Product', { id });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >

      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <Container>

          <ContainerBackground />
          <Header>
            <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
              <Icone name="arrow-back" />
            </ReturnButton>
            <Title>Produtos</Title>
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

          <TextProduct>Seus produtos</TextProduct>

          {loading ? <LoadAnimation />
            :
            (!!products.length && !!filteredProducts.length) ?

              <FlatList
                data={filteredProducts}
                style={{ marginBottom: 10, paddingVertical: 5 }}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                  <ProductCardList
                    data={item}
                    optionSelect={false}
                    onPress={() => handleOpen(item._id)} />
                )}
              />

              :
              <NotFind />
          }

          <ButtonView>

            <Button
              title="Novo produto"
              iconRight
              iconName="add-outline"
              backgroundColor="primary"
              onPress={() => { navigation.navigate("Product", {}) }}
            />

          </ButtonView>

        </Container>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>

  )

}