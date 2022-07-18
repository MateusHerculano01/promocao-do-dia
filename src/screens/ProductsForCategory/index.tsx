import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { CommonActions, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { AxiosError } from "axios";

import { api } from "@services/api";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { CategoryDTOS } from "@dtos/CategoryDTOS";

import { ProductsOfCategory } from "@components/ProductsOfCategory";
import { ContainerBackground } from "@components/ContainerBackground";
import { NotFind } from "@components/NotFind";
import { LoadAnimation } from "@components/LoadAnimation";

import { Container, Header, ReturnButton, Icone, Title } from "./styles";

type PropsParams = {
  category: CategoryDTOS,
  advertiser_id: string,
}

export function ProductsForCategory() {
  const navigation = useNavigation();
  const route = useRoute();

  const { category, advertiser_id } = route.params as PropsParams;

  const [products, setProducts] = useState<ProductDTOS[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    setLoading(true)

    await api.get(`/products-announced/products-for-category/${advertiser_id}/${category._id}`)
      .then(response => {

        setProducts(response.data);

      })
      .catch(error => {

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
        }
      })
      .finally(() => setLoading(false))

  }

  function handleNavigation(product_id: string, advertiser_id: string) {
    navigation.navigate('InfoProduct', { product_id, advertiser_id })
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <Container>
      <ContainerBackground />
      <Header>
        <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
          <Icone name="arrowleft" />
        </ReturnButton>
        <Title>{category?.categoryName}</Title>
      </Header>

      {loading ? <LoadAnimation />
        :
        !!products.length ?

          <FlatList
            data={products}
            style={{ paddingVertical: 10 }}
            numColumns={2}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item._id)}
            renderItem={({ item }) => (
              <ProductsOfCategory
                data={item}
                onPress={() => handleNavigation(item._id, item.advertiser._id)}
              />
            )}
          />
          :
          <NotFind />
      }

    </Container>
  )
}