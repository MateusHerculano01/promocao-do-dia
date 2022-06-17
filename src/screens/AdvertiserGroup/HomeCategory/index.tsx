import React, { useState, useCallback, useEffect } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback } from "react-native";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { CategoryDTOS } from "@dtos/CategoryDTOS";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserCategoryCard } from "@components/AdvertiserCategoryCard";
import { Button } from "@components/Form/Button";
import { LoadAnimation } from "@components/LoadAnimation";
import { Container, Header, Icone, ReturnButton, SearchContainer, Title, CountCategory, TextEmoji, TextTitle, NotFindView, TextSubtitle } from "./styles";

export function HomeCategory() {
  const navigation = useNavigation();
  const [categorys, setCategorys] = useState<CategoryDTOS[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchCategorys() {
    setLoading(true)

    await api.get(`/categories?category=${search}`)
      .then(response => {

        setCategorys(response.data);

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
      fetchCategorys();
      setSearch('');
    }, [])
  );

  useEffect(() => {
    fetchCategorys();
  }, [search])

  function handleOpen(id: string) {
    navigation.navigate('Category', { id });
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
            <Title>Categorias</Title>
          </Header>

          <SearchContainer>
            <InputSearch
              name="searchCategory"
              placeholder="Procure por uma categoria"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </SearchContainer>

          <CountCategory>Suas categorias</CountCategory>

          {loading ? <LoadAnimation />
            :
            (!!categorys.length) ?
              <>
                <FlatList
                  data={categorys}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <AdvertiserCategoryCard
                      data={item}
                      onPress={() => handleOpen(item._id)}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingVertical: 20,
                  }}
                  style={{ marginBottom: 10 }}
                />
              </>

              :

              <NotFindView>
                <TextEmoji>
                  😕
                </TextEmoji>
                <TextTitle>
                  Ops,
                </TextTitle>
                <TextSubtitle>
                  nenhuma categoria {'\n'}
                  encontrada
                </TextSubtitle>
              </NotFindView>
          }

          <Button
            title="Nova categoria"
            iconRight
            iconName="add-outline"
            backgroundColor="primary"
            onPress={() => { navigation.navigate("Category", {}) }}
          />

        </Container>
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>

  )

}