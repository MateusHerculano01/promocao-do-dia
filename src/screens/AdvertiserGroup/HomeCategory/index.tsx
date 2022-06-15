import React, { useState, useCallback } from "react";
import { FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { CategoryDTOS } from "@dtos/CategoryDTOS";
import { InputSearch } from "@components/Form/InputSearch";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserCategoryCard } from "@components/AdvertiserCategoryCard";
import { Button } from "@components/Form/Button";
import { LoadAnimation } from "@components/LoadAnimation";
import { Container, Header, Icone, ReturnButton, SearchContainer, Title, CountCategory } from "./styles";

export function HomeCategory() {
  const navigation = useNavigation();
  const [categorys, setCategorys] = useState<CategoryDTOS[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      async function fetchCategorys() {
        setLoading(true)

        await api.get(`/categories?category=${search}`)
          .then(response => {
            if (isMounted) {
              setCategorys(response.data);
              setLoading(false);
            }

          })
          .catch(error => console.log(error.response))

      }

      fetchCategorys();

      return () => { isMounted = false }

    }, [categorys])
  );

  function handleOpen(id: string) {
    navigation.navigate('Category', { id });
  }

  return (

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

            <Button
              title="Nova categoria"
              iconRight
              iconName="add-outline"
              backgroundColor="primary"
              onPress={() => { navigation.navigate("Category", {}) }}
            />
          </>
        }

      </Container>
    </TouchableWithoutFeedback>

  )

}