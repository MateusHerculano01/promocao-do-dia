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
import { Container, Header, Icone, ReturnButton, SearchContainer, Title, MessageCategory, TextEmoji, TextTitle, NotFindView, TextSubtitle } from "./styles";

export function HomeCategory() {
  const navigation = useNavigation();
  const [categorys, setCategorys] = useState<CategoryDTOS[]>([]);
  const [filteredCategorys, setFilteredCategorys] = useState<CategoryDTOS[]>([]);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function fetchCategorys() {
    setLoading(true)

    await api.get(`/categories`)
      .then(response => {

        setCategorys(response.data);
        setFilteredCategorys(response.data);

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
      const newCategorys = categorys.filter(item => {
        if (item.categoryName) {
          const itemCategory = item.categoryName.toUpperCase();
          const textSearch = searchText.toUpperCase();

          return itemCategory.indexOf(textSearch) > -1;
        }
      });

      setFilteredCategorys(newCategorys);
      setSearch(searchText);

    } else {
      setFilteredCategorys(categorys);
      setSearch(searchText);
    }
  }

  function handleClear() {
    setSearch('');
    setFilteredCategorys([]);
    fetchCategorys();
  }

  function handleOpen(id: string) {
    navigation.navigate('Category', { id });
  }

  useFocusEffect(
    useCallback(() => {
      setCategorys([]);
      setSearch('');
      fetchCategorys();
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
            <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
              <Icone name="arrow-back" />
            </ReturnButton>
            <Title>Categorias</Title>
          </Header>

          <SearchContainer>
            <InputSearch
              name="searchCategory"
              placeholder="Procure por uma categoria"
              defaultValue={search}
              onChangeText={(text) => handleSearchFilter(text)}
              onClear={handleClear}
            />
          </SearchContainer>

          <MessageCategory>Suas categorias</MessageCategory>

          {loading ? <LoadAnimation />
            :
            (!!categorys.length && !!filteredCategorys.length) ?
              <>
                <FlatList
                  data={filteredCategorys}
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