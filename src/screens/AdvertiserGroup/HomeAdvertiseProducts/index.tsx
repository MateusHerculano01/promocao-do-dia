import React, { useState, useCallback, useEffect } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler } from 'react-native-reanimated';
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { LoadAnimation } from "@components/LoadAnimation";
import { ProductCardList } from "@components/ProductCardList";
import { ListDivider } from "@components/ListDivider";
import theme from "@global/styles/theme";

import { Container, Header, Icone, ReturnButton, SearchContainer, Title, TextProduct, TextEmoji, TextTitle, NotFindView, TextSubtitle, CartIcon } from "./styles";

const ProductCartButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function HomeAdvertiseProducts() {
  const navigation = useNavigation();

  const [products, setProducts] = useState<ProductDTOS[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDTOS[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const productCartButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart() {

    },
    onActive(event) {
      positionX.value = event.translationX;
      positionY.value = event.absoluteY;
    },
    onEnd() {

    }
  });

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
    setFilteredProducts([]);
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
            <Title>Anunciar Produtos</Title>
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

          <TextProduct>0 Produtos selecionados</TextProduct>

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
                    optionSelect={true}
                    onPress={() => handleOpen(item._id)} />
                )}
              />

              :

              <NotFindView>
                <TextEmoji>
                  😕
                </TextEmoji>
                <TextTitle>
                  Ops,
                </TextTitle>
                <TextSubtitle>
                  nenhum produto {'\n'}
                  encontrado
                </TextSubtitle>
              </NotFindView>
          }

          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
              style={[
                productCartButtonStyle,
                {
                  position: 'absolute',
                  bottom: 13,
                  right: 22,
                }
              ]}
            >
              <ProductCartButtonAnimated
                onPress={() => { }}
                style={styles.button}
              >
                <CartIcon name="cart" />
              </ProductCartButtonAnimated>
            </Animated.View>
          </PanGestureHandler>

        </Container>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>

  )

}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary
  }
});