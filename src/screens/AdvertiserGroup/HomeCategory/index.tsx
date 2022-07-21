import React, { useState, useCallback } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { CategoryDTOS } from "@dtos/CategoryDTOS";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserCategoryCard } from "@components/AdvertiserCategoryCard";
import { NotFind } from "@components/NotFind";
import { Button } from "@components/Form/Button";
import { LoadAnimation } from "@components/LoadAnimation";
import { ListDivider } from "@components/ListDivider";
import { Container, Header, Icone, ReturnButton, SearchContainer, Title, MessageCategory, ButtonView } from "./styles";

export function HomeCategory() {
  const navigation = useNavigation();

  const [categorys, setCategories] = useState<CategoryDTOS[]>([]);
  const [filteredCategories, setfilteredCategories] = useState<CategoryDTOS[]>([]);
  const [search, setSearch] = useState<string>('');

  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    setLoading(true)

    await api.get(`/categories`)
      .then(response => {
        response.data.sort((a: CategoryDTOS, b: CategoryDTOS) => a.categoryName.localeCompare(b.categoryName));

        setCategories([...response.data]);
        setfilteredCategories([...response.data]);

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
      const newCategorys = categorys.filter(category => {
        if (category.categoryName) {
          const itemCategory = category.categoryName.toUpperCase();
          const textSearch = searchText.toUpperCase();

          return itemCategory.indexOf(textSearch) > -1;
        }
      });

      setfilteredCategories(newCategorys);
      setSearch(searchText);

    } else {
      setfilteredCategories(categorys);
      setSearch(searchText);
    }
  }

  function handleClear() {
    setSearch('');
    fetchCategories();
  }

  function handleOpen(id: string) {
    navigation.navigate('Category', { id });
  }

  useFocusEffect(
    useCallback(() => {
      setCategories([]);
      setSearch('');
      fetchCategories();
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
              value={search}
              onChangeText={handleSearchFilter}
              onClear={handleClear}
            />
          </SearchContainer>

          <MessageCategory>Suas categorias</MessageCategory>

          {loading ? <LoadAnimation />
            :
            (!!categorys.length && !!filteredCategories.length) ?
              <>
                <FlatList
                  data={filteredCategories}
                  keyExtractor={(item) => String(item._id)}
                  style={{ marginBottom: 10, paddingVertical: 5 }}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <ListDivider />}
                  renderItem={({ item }) => (
                    <AdvertiserCategoryCard
                      data={item}
                      onPress={() => handleOpen(item._id)}
                    />
                  )}
                />
              </>

              :
              <NotFind />
          }

          <ButtonView>

            <Button
              title="Nova categoria"
              iconRight
              iconName="add-outline"
              backgroundColor="primary"
              onPress={() => { navigation.navigate("Category", {}) }}
            />

          </ButtonView>

        </Container>
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>

  )

}