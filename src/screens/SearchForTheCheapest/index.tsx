import React, { useState, useCallback } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { ProductAnnouncedDTOS } from "@dtos/ProductAnnouncedDTOS";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { NotFind } from "@components/NotFind";
import { LoadAnimation } from "@components/LoadAnimation";
import { ListDivider } from "@components/ListDivider";
import { AnnouncedProductCardList } from "@components/AnnouncedProductCardList";
import { TitleWithNotification } from "@components/TitleWithNotification";
import { LocationUser } from "@components/LocationUser";

import { Container, Header, SearchContainer, TextSubtitle, Load } from "./styles";

export function SearchForTheCheapest() {

  const navigation = useNavigation();

  const [products, setProducts] = useState<ProductAnnouncedDTOS[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductAnnouncedDTOS[]>([]);
  const [search, setSearch] = useState<string>('');

  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true)

    await api.get<ProductAnnouncedDTOS[]>(`/products-announced`)
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

  }, []);

  function handleSearchFilter(searchText: string) {
    if (searchText) {
      const newProducts = products.filter(product => {
        if (product.product.name) {
          const itemProduct = product.product.name.toUpperCase();
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

  // function handleNavigate(id: string | object | any) {
  //   navigation.navigate("EditAnnouncedProduct", { id, action: "update" })
  // }

  useFocusEffect(
    useCallback(() => {
      setProducts([]);
      setFilteredProducts([]);
      fetchProducts();
      setSearch('');
    }, [])
  );

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
            <TitleWithNotification
              title="Promoção do Dia"
              onPress={() => navigation.navigate('Notifications')}
            />
            <LocationUser
              textLocation="Sua localização"
              location="Bom Jesus de Goiás"
              onPress={() => { }}
            />
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
            (!!products.length && !!filteredProducts.length) ?

              <FlatList
                data={filteredProducts}
                style={{ marginBottom: 10, paddingVertical: 5 }}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                keyExtractor={item => String(item._id)}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                  <AnnouncedProductCardList
                    data={item}
                    optionSelect={false}
                    announced
                  />
                )}
              />

              :

              <NotFind />
          }

        </Container>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>

  )

}
