import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

import { api } from '@services/api';
import { localityApi } from "@services/localityApi";
import { AxiosError } from "axios";
import { LocalityUFDTOS } from "@dtos/LocalityUFDTOS";
import { LocalityCityDTOS } from "@dtos/LocalityCityDTOS";

import { ContainerBackground } from '@components/ContainerBackground';
import { ButtonSelect } from '@components/ButtonSelect';
import { BottomSheet, BottomSheetRefProps } from '@components/BottomSheet';
import { ListDivider } from '@components/ListDivider';
import { Button } from '@components/Form/Button';
import { InputSearch } from '@components/Form/InputSearch';
import { LoadAnimation } from "@components/LoadAnimation";

import { ButtonsView, Container, Content, Header, Icone, IconView, LeftView, LocalityButtonView, LocalityIcon, LocalityInfo, MainLocationIcon, ReturnButton, SearchContainer, Title } from './styles';
import { Alert } from 'react-native';

export function Locality() {
  const navigation = useNavigation();

  const refBottomSheet = useRef<BottomSheetRefProps>(null);

  const [search, setSearch] = useState<string>('');
  const [uf, setUf] = useState('GO');
  const [city, setCity] = useState('');

  const [listUf, setListUf] = useState<LocalityUFDTOS[]>([]);
  const [listCitie, setListCitie] = useState<LocalityCityDTOS[]>([]);
  const [filteredCities, setFilteredCities] = useState<LocalityCityDTOS[]>([]);

  const [errorUf, setErrorUf] = useState<string | null>();
  const [errorCity, setErrorCity] = useState<string | null>();

  const [isLogging, setIsLogging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadCities, setLoadCities] = useState(false);

  function validate() {
    let error = false;

    if (!uf) {
      setErrorUf("Estado obrigatório");
      error = true;
    }

    if (!city) {
      setErrorCity("Cidade obrigatória");
      error = true;
    }

    return !error;
  }

  const fetchUf = useCallback(async () => {
    try {

      const { data } = await localityApi.get<LocalityUFDTOS[]>(`api/v1/localidades/estados`);

      data.sort((a, b) => a.nome.localeCompare(b.nome));

      setListUf([...data]);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)
      }
    }
  }, []);

  const fetchCity = useCallback(async (uf: string) => {
    try {
      setLoadCities(true);

      const { data } = await localityApi.get<LocalityCityDTOS[]>(`api/v1/localidades/estados/${uf}/municipios`);

      data.sort((a, b) => a.nome.localeCompare(b.nome));

      setListCitie([...data]);
      setFilteredCities([...data]);

      setLoadCities(false);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)
      }
    }
  }, []);

  const handleUfSelect = useCallback((item: LocalityUFDTOS) => {
    setUf(item.sigla);

    setErrorUf(null);

    handleOpenBottomSheet();

  }, [uf]);

  const handleCitySelect = useCallback((item: LocalityCityDTOS) => {
    setCity(item.nome);

    setErrorCity(null);

    handleOpenBottomSheet();

  }, []);

  const handleOpenBottomSheet = useCallback(() => {
    const isActive = refBottomSheet?.current?.isActive();

    isActive ? refBottomSheet?.current?.scrollTo(0) : refBottomSheet?.current?.scrollTo(-300);

  }, []);

  function handleOpenBottomSheetUf() {

    handleOpenBottomSheet();
    setUf('');

  }

  const handleToggleBottomSheet = useCallback(() => {

    const isActive = refBottomSheet?.current?.isActive();

    isActive ? refBottomSheet?.current?.scrollTo(0) : null;

  }, []);

  function handleSearchFilter(searchText: string) {
    if (searchText) {
      const newCities = listCitie.filter(city => {
        if (city.nome) {
          const itemCity = city.nome.toUpperCase();
          const textSearch = searchText.toUpperCase();

          return itemCity.indexOf(textSearch) > -1;
        }
      });

      setFilteredCities(newCities);
      setSearch(searchText);

    } else {
      setFilteredCities(listCitie);
      setSearch(searchText);
    }
  }

  const handleUpdateLocality = useCallback(async () => {
    try {

      setIsLogging(true);

      await api.put(`/users/update-locality`, { uf, city });

      setIsLogging(false);

      navigation.navigate("ResponseScreen", {
        nextScreenRoute: "ProfileScreen",
        title: "Alterar localização",
        message: "Localização alterada com sucesso.",
        type: "sucess"
      });

    } catch (error) {
      setIsLogging(false);

      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.status)
        console.log(error);
        Alert.alert("Editar Localização", "Houve um erro ao editar a localização, tente novamente. ❌")
      }
    }

  }, [city, uf]);

  function handleClear() {
    setSearch('');
    fetchCity(uf);
  }


  useEffect(() => {
    fetchUf();
  }, []);

  useEffect(() => {
    if (uf) {
      fetchCity(uf);
    }
  }, [uf]);


  return (
    <Container>
      <ContainerBackground />
      <Header>
        <LeftView>
          <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <Icone name="arrow-back" />
          </ReturnButton>
          <Title>Anúncio</Title>
        </LeftView>
      </Header>

      <IconView>
        <MainLocationIcon name="location-outline" />
      </IconView>

      <ButtonsView>
        <ButtonSelect
          key={'#$'}
          title={uf ? uf : "Selecione seu estado"}
          icon="location-outline"
          errorMessage={errorUf}
          hasValue={!!uf}
          onPress={handleOpenBottomSheetUf}
        />

        <ButtonSelect
          key={'*&'}
          title={city ? city : "Selecione sua cidade"}
          icon="location-outline"
          errorMessage={errorCity}
          hasValue={!!city}
          onPress={handleOpenBottomSheet}
        />

        <Button
          title="Salvar"
          backgroundColor="primary"
          iconRight
          isLoading={isLogging}
          iconName="save-outline"
          onPress={handleUpdateLocality}
        />
      </ButtonsView>

      <BottomSheet ref={refBottomSheet}>

        {loadCities ? <LoadAnimation />
          :
          uf ?
            <Content>
              <SearchContainer>
                <InputSearch
                  name="searchProduct"
                  placeholder="Procure por uma cidade"
                  defaultValue={search}
                  value={search}
                  onChangeText={handleSearchFilter}
                  onClear={handleClear}
                />
              </SearchContainer>

              <FlatList
                key={"#"}
                data={filteredCities}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 30, paddingHorizontal: 20 }}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                  <LocalityButtonView onPress={() => handleCitySelect(item)}>
                    <LocalityIcon name="location-outline" />
                    <LocalityInfo>{item.nome}</LocalityInfo>
                  </LocalityButtonView>
                )}
              />
            </Content>
            :
            <FlatList
              key={"_"}
              data={listUf}
              keyExtractor={(item) => String(item.id)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 30, paddingHorizontal: 20 }}
              ItemSeparatorComponent={() => <ListDivider />}
              renderItem={({ item }) => (
                <LocalityButtonView onPress={() => handleUfSelect(item)}>
                  <LocalityIcon name="location-outline" />
                  <LocalityInfo>{item.sigla}</LocalityInfo>
                </LocalityButtonView>
              )}
            />
        }
      </BottomSheet>

    </Container>
  );
}