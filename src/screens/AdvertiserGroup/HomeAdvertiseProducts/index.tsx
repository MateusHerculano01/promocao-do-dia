import React, { useState, useCallback, useEffect } from "react";
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { useNotifications } from "@hooks/notifications";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { LoadAnimation } from "@components/LoadAnimation";
import { ProductCardList } from "@components/ProductCardList";
import { NotFind } from "@components/NotFind";
import { ListDivider } from "@components/ListDivider";
import { ModalView } from "@components/ModalView";
import { HeaderButton } from "@components/HeaderButton";
import { NotificationForm } from "../NotificationForm";
import theme from "@global/styles/theme";

import { Container, Header, Icone, ReturnButton, SearchContainer, Title, TextProduct, CartIcon, LeftView, Load } from "./styles";

export function HomeAdvertiseProducts() {
  const ProductCartButtonAnimated = Animated.createAnimatedComponent(RectButton);

  const navigation = useNavigation();
  const { handleRegisterNotification } = useNotifications();

  const [products, setProducts] = useState<ProductDTOS[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDTOS[]>([]);
  const [search, setSearch] = useState<string>('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [productsSelected, setProductsSelected] = useState<ProductDTOS[]>([]);


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

    await api.get(`/products-announced/unannounced-products`)
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

  function handleProductToggleSelect(product: ProductDTOS) {
    let index = productsSelected.findIndex(productsItem => productsItem._id === product._id);
    let productsSlectedCopy = [...productsSelected];

    if (index !== -1) {
      productsSlectedCopy.splice(index, 1);
    } else {
      productsSlectedCopy.push(product);
    }
    setProductsSelected(productsSlectedCopy);
  }

  async function handleAdRegistration(title: string, message: string) {
    setOpenModal(false);

    setNotificationTitle(title);
    setNotificationMessage(message)

    try {
      setIsLoading(true);

      for await (const products_ids of productsSelected) {
        await api.put(`/products-announced/new/${products_ids._id}`);
      }

      await handleRegisterNotification(title, message);

      setIsLoading(false);
      setProductsSelected([]);
      setFilteredProducts([]);
      setSearch('');
      fetchProducts();

      Alert.alert("Anunciar Produtos", "Produtos anunciados com sucesso. ✅")

    } catch (error) {
      setIsLoading(false);

      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.status)

      }

      Alert.alert("Anunciar Produtos", "Houve um erro ao anunciar os produtos, tente novamente mais tarde. ❌")

    }

  }

  function handleOpenModal() {
    setOpenModal(true);
  };

  function handleCloseModal() {
    setOpenModal(false);
  };

  function handleNavigate(id: string | object | any) {
    navigation.navigate("EditAnnouncedProduct", { id })
  }

  useFocusEffect(
    useCallback(() => {
      setProducts([]);
      setSearch('');
      fetchProducts();
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
          <StatusBar
            backgroundColor='transparent'
          />
          <Header>
            <LeftView>
              <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                <Icone name="arrow-back" />
              </ReturnButton>
              <Title>Anunciar Produtos</Title>
            </LeftView>

            {(!!productsSelected.length && productsSelected.length <= 1) && (
              <HeaderButton
                title="Valor de oferta"
                color="edit"
                onPress={() => { handleNavigate(productsSelected[0]._id) }}
              />
            )}
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

          <TextProduct>Selecione produtos para anunciar</TextProduct>

          {loading ? <LoadAnimation />
            :
            (!!products.length && !!filteredProducts.length) ?

              <FlatList
                data={filteredProducts}
                style={{ marginBottom: 10, paddingVertical: 5 }}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                keyExtractor={(item) => String(item._id)}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                  <ProductCardList
                    data={item}
                    optionSelect
                    displayAdValue
                    active={productsSelected.findIndex(product => product._id === item._id) !== -1 ? true : false}
                    onPress={() => { handleProductToggleSelect(item) }} />
                )}
              />

              :

              <NotFind />
          }

          {(!!products.length && !!filteredProducts.length)
            ?
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
                  onPress={handleOpenModal}
                  style={styles.button}
                >

                  {/* <CartIcon name="cart" />
                  {!!productsSelected.length ?
                    <View style={styles.notification}>
                      <Text style={styles.notificationText}>{productsSelected.length}</Text>
                    </View>
                    :
                    <></>
                  } */}
                  {
                    isLoading ? <Load />
                      :
                      <>
                        <CartIcon name="cart" />
                        {
                          productsSelected.length ?
                            <View style={styles.notification}>
                              <Text style={styles.notificationText}>{productsSelected.length}</Text>
                            </View>
                            :
                            <></>

                        }
                      </>
                  }
                </ProductCartButtonAnimated>
              </Animated.View>
            </PanGestureHandler>
            :
            <></>
          }

        </Container>

      </TouchableWithoutFeedback>

      <ModalView visible={openModal} closeModal={handleCloseModal}>
        <NotificationForm
          closeModal={handleCloseModal}
          confirm={handleAdRegistration}
        />
      </ModalView>

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