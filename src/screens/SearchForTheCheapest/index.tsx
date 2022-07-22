import React, { useState, useCallback } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useNotifications } from "@hooks/notifications";
import { useAuth } from "@hooks/auth";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { NotFind } from "@components/NotFind";
import { ListDivider } from "@components/ListDivider";
import { AnnouncedProductCardList } from "@components/AnnouncedProductCardList";
import { TitleWithNotification } from "@components/TitleWithNotification";
import { LocationUser } from "@components/LocationUser";
import { LoadAnimation } from "@components/LoadAnimation";
import { LoadCart } from "@components/LoadCart";

import { Container, Header, SearchContainer, TextSubtitle, Load } from "./styles";

export function SearchForTheCheapest() {

  const navigation = useNavigation();
  const { signOut, user } = useAuth();
  const { haveNotifications } = useNotifications();

  const [products, setProducts] = useState<ProductDTOS[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDTOS[]>([]);
  const [search, setSearch] = useState<string>('');
  const [city, setCity] = useState('');

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true)

    await api.get<ProductDTOS[]>(`/products-announced`)
      .then(response => {
        response.data.sort((a: ProductDTOS, b: ProductDTOS) => a.name.localeCompare(b.name))

        setProducts([...response.data]);
        setFilteredProducts([...response.data]);
      })
      .catch(error => {

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
          if (error.response?.data.message === "Invalid JWT token") {
            signOut();
          }
        }

      })
      .finally(() => setLoading(false))

  }, []);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/users/${user.id}`);

      setCity(data.user.city);
      setIsLoading(false);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)

      }

    }

  }, []);

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

  function handleOpen(advertiser_id: string, product_id: string) {
    navigation.navigate("InfoProduct", { advertiser_id, product_id });
  }

  function handleNavigateLocality() {
    navigation.navigate("Locality", { dashboard: false, searchCheapest: true })
  }

  function handleClear() {
    setSearch('');
    fetchProducts();
  }

  useFocusEffect(
    useCallback(() => {
      setSearch('');
      fetchProducts();
      fetchUser();
    }, [])
  );

  if (isLoading) {
    return <LoadCart />;
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
            <TitleWithNotification
              title="Promoção do Dia"
              onPress={() => navigation.navigate('Notifications')}
              notificationsActive={haveNotifications()}
            />
            <LocationUser
              textLocation="Sua localização"
              location={city}
              onPress={handleNavigateLocality}
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
                    onPress={() => handleOpen(item.advertiser._id, item._id)}
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
