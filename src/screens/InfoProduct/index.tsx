import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";

import { AxiosError } from "axios";
import { api } from "@services/api";
import { ProductDTOS } from "@dtos/ProductDTOS";

import { ContainerBackground } from "@components/ContainerBackground";
import { ProductCardList } from "@components/ProductCardList";
import { ListDivider } from "@components/ListDivider";
import { LoadCart } from "@components/LoadCart";

import { formatPrice } from "@utils/formatPrice";

import { Category, Container, ContainerCategory, ContainerDescription, ContainerImage, Description, Header, Icone, IconeCategory, IconeDescription, Image, Price, ProductName, QuantityAndPrice, ReturnButton, SubTitle, Title, UnitMeasurement, Wrap } from "./styles";

type NavigationProps = {
  advertiser_id: string;
  product_id: string;
}

export function InfoProduct() {
  const navigation = useNavigation();
  const route = useRoute();

  const { product_id, advertiser_id } = route.params as NavigationProps;

  const [product, setProduct] = useState<ProductDTOS[]>([]);
  const [similiars, setSimiliars] = useState<ProductDTOS[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductInfo = useCallback(async (advertiser_id: string, product_id: string) => {
    try {
      setIsLoading(true);

      const response = await api.get(`/products-announced/info/${advertiser_id}/${product_id}`);

      setProduct(response.data);

      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);

      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.statusText)
        console.log(error.response?.status)
        console.log(error)
      }
    }

  }, []);

  const fetchSimiliarsProducts = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/products-announced/similiars-products/${advertiser_id}/${product_id}`,);

      setSimiliars(response.data);

      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);

      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.statusText)
        console.log(error.response?.status)
        console.log(error)
      }
    }

  }, [advertiser_id, product_id]);

  function handleNavigateInfoProduct(product_id: string, advertiser_id: string) {
    fetchProductInfo(advertiser_id, product_id);
  }

  useEffect(() => {
    fetchProductInfo(advertiser_id, product_id);
    fetchSimiliarsProducts();
  }, [advertiser_id, product_id]);

  if (isLoading) {
    return <LoadCart />
  }

  return (
    <Container>
      <ContainerBackground />

      <Header>
        <ReturnButton
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        >
          <Icone name="arrowleft" />
        </ReturnButton>
        <Title>Detalhes do produto</Title>
      </Header>

      <FlatList
        key={"#"}
        data={product}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <>
            <ContainerImage>
              <Image source={{ uri: item.photos_url[0] }} resizeMode="contain" />
            </ContainerImage>

            <ProductName>{item.name}</ProductName>

            <QuantityAndPrice>
              <UnitMeasurement>{item.size}</UnitMeasurement>
              {item.adValue ?
                <Price>{formatPrice(item.adValue)}</Price>
                :
                <Price>{formatPrice(item.price)}</Price>
              }

            </QuantityAndPrice>

            <ContainerCategory>
              <IconeCategory name="ios-filter-outline" />
              <Category>{item.category.categoryName}</Category>
            </ContainerCategory>

            <ContainerDescription center={!(item.description.length > 38)}>
              <IconeDescription name="reorder-three-outline" />
              <Wrap>
                <Description>{item.description}</Description>
              </Wrap>
            </ContainerDescription>
          </>
        )}

        ListFooterComponent={() => (
          !!similiars.length ?
            <>
              <SubTitle>Produtos semelhantes</SubTitle>

              <FlatList
                key={"_"}
                data={similiars}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => String(item._id)}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                  <ProductCardList
                    data={item}
                    optionSelect={false}
                    displayAdValue
                    onPress={() => handleNavigateInfoProduct(item._id, item.advertiser._id)}
                  />
                )}
              />
            </>
            :
            <></>
        )}

      />

    </Container>

  );
}
