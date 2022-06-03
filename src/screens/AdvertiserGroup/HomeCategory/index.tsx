import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserCategoryCard, CategoryProps } from "@components/AdvertiserCategoryCard";
import { api } from "@services/api";
import { AxiosError } from "axios";
import { Container, Header, Icone, ReturnButton, SearchContainer, Title } from "./styles";

export function HomeCategory() {
  const navigation = useNavigation();
  const [categorys, setCategorys] = useState<CategoryProps[]>([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<CategoryProps[]>([]);

  async function fetchCategorys(value: string) {

    try {
      const response = await api.get('/categories');

      setCategorys(response.data);
      setFilteredData(response.data);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.status)
      }

    }

  }

  useEffect(() => {
    fetchCategorys('');
  }, []);

  function searchFilter(text: string) {
    if (text) {
      const newData = categorys.filter(item => {
        if (item.categoryName) {
          const itemData = item.categoryName.toUpperCase();
          const textData = text.toUpperCase();

          return itemData.indexOf(textData) > -1;
        }

      });
      setFilteredData(newData);
      setSearch(text);

    } else {
      setFilteredData(categorys);
      setSearch(text);
    }
  }

  function handleOpen(id: string) {
    navigation.navigate('Category', { id });
  }

  return (
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
          onChangeText={(text) => searchFilter(text)}
        />
      </SearchContainer>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AdvertiserCategoryCard
            data={item}
            onPress={() => handleOpen(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
        }}
      />

    </Container>
  )

}