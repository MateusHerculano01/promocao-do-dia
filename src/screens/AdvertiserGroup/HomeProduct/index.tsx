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
import { Container, Header, Icone, ReturnButton, SearchContainer, Title, TextProduct, TextEmoji, TextTitle, NotFindView, TextSubtitle, ButtonView } from "./styles";

export function HomeProduct() {
  const navigation = useNavigation();
  const [products, setProducts] = useState<ProductDTOS[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    setLoading(true)

    await api.get(`/products`)
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

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  useEffect(() => {
    fetchProducts();
  }, [search])

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
              onChangeText={(text) => setSearch(text)}
              onClear={() => { }}
            />
          </SearchContainer>

          <TextProduct>Seus produtos</TextProduct>

          {loading ? <LoadAnimation />
            :
            !!products.length ?

              <FlatList
                style={{ marginBottom: 10, paddingVertical: 5 }}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                data={products}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                  <ProductCardList data={item} />
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