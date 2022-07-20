import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { api } from "@services/api";
import { localityApi } from "@services/localityApi";
import { AxiosError } from "axios";
import { AdvertiserDTOS } from "@dtos/AdvertiserDTOS";
import { LocalityUFDTOS } from "@dtos/LocalityUFDTOS";
import { LocalityCityDTOS } from "@dtos/LocalityCityDTOS";

import { ContainerBackground } from "@components/ContainerBackground";
import { PhotoComponent } from "@components/PhotoComponent";
import { BottomSheet, BottomSheetRefProps } from "@components/BottomSheet";
import { InputDefault } from "@components/Form/Input";
import { InputWithMask } from "@components/Form/InputMask";
import { InputSearch } from "@components/Form/InputSearch";
import { Button } from "@components/Form/Button";
import { ButtonSelect } from "@components/ButtonSelect";
import { HeaderButton } from "@components/HeaderButton";
import { ListDivider } from "@components/ListDivider";
import { LoadCart } from "@components/LoadCart";
import { LoadAnimation } from "@components/LoadAnimation";

import { Container, Header, LeftView, Icone, ReturnButton, Title, Form, PhotoView, IconView, Icon, Fields, LocalityButtonView, LocalityInfo, LocalityIcon, Content, SearchContainer } from "./styles";

type AdvertiserNavigationProps = {
  action: "update";
}

export function RegisterAdvertisement() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('sendo chamado')

  const { action } = route.params as AdvertiserNavigationProps;

  const refBottomSheet = useRef<BottomSheetRefProps>(null);

  const [isLogging, setIsLogging] = useState(false);
  const [photo, setPhoto] = useState<string>();
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [link, setLink] = useState('https://');
  const [search, setSearch] = useState<string>('');

  const [uf, setUf] = useState('GO');
  const [city, setCity] = useState('');

  const [listUf, setListUf] = useState<LocalityUFDTOS[]>([]);
  const [listCitie, setlistCitie] = useState<LocalityCityDTOS[]>([]);
  const [filteredCities, setFilteredCities] = useState<LocalityCityDTOS[]>([]);

  const [errorTitle, setErrorTitle] = useState<string | null>();
  const [errorPhone, setErrorPhone] = useState<string | null>();
  const [errorUf, setErrorUf] = useState<string | null>();
  const [errorCity, setErrorCity] = useState<string | null>();

  const [loading, setLoading] = useState(false);
  const [loadCities, setLoadCities] = useState(false);

  const handleOpenBottomSheet = useCallback(() => {
    const isActive = refBottomSheet?.current?.isActive();

    isActive ? refBottomSheet?.current?.scrollTo(0) : refBottomSheet?.current?.scrollTo(-300);

  }, []);

  const handleImagePicker = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1
      });

      if (!result.cancelled) {
        setPhoto(result.uri);
      }
    }
  }, [photo]);

  function validate() {
    let error = false;

    if (!title) {
      setErrorTitle("Preencha o nome da empresa")
      error = true;
    }

    if (!phone) {
      setErrorPhone("Preencha o telefone")
      error = true;
    }

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

  const handleRegisterAdvertisement = useCallback(async () => {

    if (!photo) {
      return Alert.alert("Cadastrar Anúncio", "Selecione uma imagem para o anúncio. 📷");
    }

    const formData = new FormData();

    let fileName = photo.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName!);
    let type = match ? `image/${match[1]}` : `image`;

    if (validate()) {

      formData.append('photo', JSON.parse(JSON.stringify({ uri: photo, name: fileName, type })))
      formData.append('title', title);
      formData.append('link', link);
      formData.append('phone', String(phone));
      formData.append('uf', uf);
      formData.append('city', city);

      try {
        setIsLogging(true);

        await api.post('/advertiser/new', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })

        setIsLogging(false);

        navigation.navigate("ResponseScreen", {
          nextScreenRoute: "AdvertiserDashboard",
          title: "Cadastrar anúncio",
          message: "Anúncio cadastrado com sucesso.",
          type: "sucess"
        });

      } catch (error) {
        setIsLogging(false);

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
          console.log(error.response?.status)

        }

        Alert.alert("Cadastrar Anúncio", "Houve um erro ao cadastrar o anúncio, tente novamente. ❌");
      }

    }

  }, [photo, phone, link, title, uf, city]);

  async function fetchAdvertisement() {
    try {
      setLoading(true);

      const { data } = await api.get<AdvertiserDTOS>(`/advertiser/advertise`);

      setTitle(data.title);
      setPhone(String(data.phone));
      setPhoto(data.photo_url);
      setLink(!data.link ? 'https://' : data.link);
      setUf(data.uf);
      setCity(data.city);

      setLoading(false)

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)

      }

    }

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

      setlistCitie([...data]);
      setFilteredCities([...data]);
      setLoadCities(false);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)
      }
    }
  }, []);


  const handleUpdateAdvertisement = useCallback(async () => {

    if (!photo) {
      return Alert.alert("Editar Anúncio", "Selecione uma imagem para o anúncio. 📷");
    }

    const formData = new FormData();

    let fileName = photo.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName!);
    let type = match ? `image/${match[1]}` : `image`;

    if (validate()) {

      formData.append('photo', JSON.parse(JSON.stringify({ uri: photo, name: fileName, type })))
      formData.append('title', title);
      formData.append('link', link);
      formData.append('phone', String(phone));
      formData.append('uf', uf);
      formData.append('city', city);

      try {
        setIsLogging(true);

        await api.patch('/advertiser/update', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })

        setIsLogging(false);

        navigation.navigate("ResponseScreen", {
          nextScreenRoute: "AdvertiserDashboard",
          title: "Atualizar anúncio",
          message: "Anúncio atualizado com sucesso.",
          type: "sucess"
        });

      } catch (error) {
        setIsLogging(false);

        if (error instanceof AxiosError) {
          console.log(error)
          console.log(error.response?.data)
          console.log(error.response?.status)

        }

        Alert.alert("Atualizar Anúncio", "Houve um erro ao atualizar o anúncio, tente novamente. ❌");
      }

    }

  }, [photo, phone, link, title, uf, city]);

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

  function handleOpenBottomSheetUf() {
    handleOpenBottomSheet();
    setUf('');
  }

  const handleToggleBottomSheet = useCallback(() => {

    const isActive = refBottomSheet?.current?.isActive();

    isActive ? refBottomSheet?.current?.scrollTo(0) : null;

  }, []);

  const handleTouchableWithoutFeedback = useCallback(() => {
    Keyboard.dismiss;
    handleToggleBottomSheet();
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

  function handleClear() {
    setSearch('');
    fetchCity(uf);
  }

  useEffect(() => {
    if (action === "update") {
      fetchAdvertisement();
    }
  }, [action]);

  useEffect(() => {
    fetchUf();
  }, []);

  useEffect(() => {
    if (uf) {
      fetchCity(uf);
    }
  }, [uf]);


  if (loading)
    return <LoadCart />

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding' })}
      enabled
      style={{ flex: 1 }}
    >

      <TouchableWithoutFeedback
        onPress={handleTouchableWithoutFeedback}
        containerStyle={{ flex: 1 }}
        style={{ flex: 1 }}
      >
        <Container>
          <ContainerBackground />
          <Header>
            <LeftView>
              <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                <Icone name="arrow-back" />
              </ReturnButton>
              <Title>Anúncio</Title>
            </LeftView>

            {action === "update" && (
              <HeaderButton
                title="Cancelar"
                color="delete"
                onPress={() => navigation.dispatch(CommonActions.goBack())}
              />
            )}

          </Header>

          <ScrollView showsVerticalScrollIndicator={false}>

            <Form>
              <PhotoView>
                <PhotoComponent uri={photo || ''} />
                <IconView onPress={handleImagePicker}>
                  <Icon name="camera-reverse-outline" />
                </IconView>
              </PhotoView>

              <Fields>
                <InputDefault
                  name="title"
                  value={title}
                  onChangeText={(text) => {
                    setTitle(text)
                    setErrorTitle(null)
                  }}
                  errorMessage={errorTitle}
                  autoCapitalize="words"
                  inputType="default"
                  placeholder="Nome da empresa"
                  iconName="ios-newspaper-outline"
                />

                <InputWithMask
                  name="phone"
                  mask="phone"
                  value={phone}
                  inputMaskChange={(text: any) => {
                    setPhone(text)
                    setErrorPhone(null)
                  }}
                  errorMessage={errorPhone}
                  inputType="numeric"
                  placeholder="Número de telefone"
                  iconName="call-outline"
                />

                <InputDefault
                  name="link"
                  value={link}
                  onChangeText={setLink}
                  autoCapitalize="none"
                  inputType="url"
                  placeholder="Link da rede social"
                  iconName="ios-link"
                />

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

              </Fields>

            </Form>

          </ScrollView>

          {action === "update" ?
            <Button
              title="Salvar"
              backgroundColor="primary"
              iconRight
              isLoading={isLogging}
              iconName="save-outline"
              onPress={handleUpdateAdvertisement}
            />
            :
            <Button
              title="Cadastrar"
              backgroundColor="primary"
              iconRight
              isLoading={isLogging}
              iconName="save-outline"
              onPress={handleRegisterAdvertisement}
            />
          }

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

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  )
}