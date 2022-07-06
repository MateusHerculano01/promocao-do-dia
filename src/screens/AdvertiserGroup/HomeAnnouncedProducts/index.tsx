import React, { useState, useCallback, useEffect } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { ProductAnnouncedInterface } from "@dtos/ProductAnnouncedDTOS";
import theme from "@global/styles/theme";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { LoadAnimation } from "@components/LoadAnimation";
import { ListDivider } from "@components/ListDivider";
import { AnnouncedProductCardList } from "@components/AnnouncedProductCardList";
import { Container, Header, Icone, ReturnButton, SearchContainer, Title, TextProduct, TextEmoji, TextTitle, NotFindView, TextSubtitle, ButtonView, TrashIcon } from "./styles";

export function HomeAnnouncedProducts() {
  const ProductTrashButtonAnimated = Animated.createAnimatedComponent(RectButton);

  const navigation = useNavigation();
  const [products, setProducts] = useState<ProductAnnouncedInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductAnnouncedInterface[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [productsSelected, setProductsSelected] = useState<ProductAnnouncedInterface[]>([]);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const productTrashButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  async function fetchProducts() {
    setLoading(true)

    await api.get(`/products-announced/`)
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
    setFilteredProducts([]);
    fetchProducts();
  }

  function handleProductToggleSelect(product: ProductAnnouncedInterface) {
    let index = productsSelected.findIndex(productsItem => productsItem._id === product._id);
    let productsSlectedCopy = [...productsSelected];

    if (index !== -1) {
      productsSlectedCopy.splice(index, 1);
    } else {
      productsSlectedCopy.push(product);
    }
    setProductsSelected(productsSlectedCopy);
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
            <Title>Produtos anunciados</Title>
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
                keyExtractor={item => String(item._id)}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                  <AnnouncedProductCardList
                    optionSelect
                    data={item}
                    active={productsSelected.findIndex(product => product._id === item._id) !== -1 ? true : false}
                    onPress={() => { handleProductToggleSelect(item) }}
                  />
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
                productTrashButtonStyle,
                {
                  position: 'absolute',
                  bottom: 13,
                  right: 22,
                }
              ]}
            >
              <ProductTrashButtonAnimated
                onPress={() => { }}
                style={styles.button}
              >
                <TrashIcon name="trash" />
                {!!productsSelected.length ?
                  <View style={styles.notification}>
                    <Text style={styles.notificationText}>{productsSelected.length}</Text>
                  </View>
                  :
                  <></>
                }
              </ProductTrashButtonAnimated>
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
  },
  notification: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    top: 8,
    right: 13,
    borderRadius: 10,
    backgroundColor: theme.colors.attention,
  },
  notificationText: {
    fontSize: 10,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.secondary,
  }
});