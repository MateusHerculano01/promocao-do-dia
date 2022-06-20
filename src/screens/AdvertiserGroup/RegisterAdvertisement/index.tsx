import React, { useCallback, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import { AxiosError } from "axios";
import { AdvertiserDTOS } from "@dtos/AdvertiserDTOS";
import { ContainerBackground } from "@components/ContainerBackground";
import { PhotoComponent } from "@components/PhotoComponent";
import { InputDefault } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { AdSizeSelect } from "@components/AdSizeSelect";
import { ModalView } from "@components/ModalView";
import { LoadCart } from "@components/LoadCart";
import { SizeAdvertisement, SizesType } from "../SizeAdvertisement";
import { Container, Header, Icone, ReturnButton, Title, Form, PhotoView, IconView, Icon, Fields, ScrollForm } from "./styles";

type AdvertiserNavigationProps = {
  action: "update";
}

export function RegisterAdvertisement() {
  const navigation = useNavigation();
  const route = useRoute();

  const { action } = route.params as AdvertiserNavigationProps;

  const [isLogging, setIsLogging] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [photo, setPhoto] = useState<string>();
  const [size, setSize] = useState<SizesType>({
    id: "1",
    sizeTitle: "Tamanho do anúncio"
  })
  const [title, setTitle] = useState<string>('');
  const [phone, setPhone] = useState<string | number>('');
  const [link, setLink] = useState<string>('https://');

  const [errorTitle, setErrorTitle] = useState<string | null>();
  const [errorPhone, setErrorPhone] = useState<string | null>();

  const [loading, setLoading] = useState(false);

  function handleOpenModal() {
    setOpenModal(true);
  };

  function handleCloseModal() {
    setOpenModal(false);
  };

  function handleModalSelect(sizeSelect: SizesType) {
    setSize(sizeSelect);
    setOpenModal(false);
  };

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
      error = true
    }

    if (!phone) {
      setErrorPhone("Preencha o telefone")
      error = true
    }

    return !error;
  }

  const handleRegisterAdvertisement = useCallback(async () => {

    if (size.id === "1") {
      return Alert.alert("Cadastrar Anúncio", "Selecione o tamanho do anúncio");
    }

    if (!photo) {
      return Alert.alert("Cadastrar Anúncio", "Selecione uma imagem para o anúncio");
    }

    const formData = new FormData();

    let fileName = photo.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName!);
    let type = match ? `image/${match[1]}` : `image`;

    if (validate()) {

      formData.append('photo', JSON.parse(JSON.stringify({ uri: photo, name: fileName, type })))
      formData.append('title', title);
      formData.append('link', link)
      formData.append('phone', String(phone))
      formData.append('size', title);

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

        Alert.alert("Cadastrar Anúncio", "Houve um erro ao cadastrar o anúncio, tente novamente.");
      }

    }

  }, [size, photo, phone, link, title]);

  async function fetchAdvertisement() {
    try {
      setLoading(true);

      const { data } = await api.get<AdvertiserDTOS>(`/advertiser/advertise`);

      setTitle(data.title);
      setPhone(data.phone);
      setPhoto(data.photo_url);
      setLink(!data.link ? 'https://' : data.link);
      setSize({
        id: "1",
        sizeTitle: "Tamanho do anúncio"
      });

      setLoading(false)

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)

      }

    }

  }

  const handleUpdateAdvertisement = useCallback(async () => {

    if (size.id === "1") {
      return Alert.alert("Editar Anúncio", "Selecione o tamanho do anúncio");
    }

    if (!photo) {
      return Alert.alert("Editar Anúncio", "Selecione uma imagem para o anúncio");
    }

    const formData = new FormData();

    let fileName = photo.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName!);
    let type = match ? `image/${match[1]}` : `image`;

    if (validate()) {

      formData.append('photo', JSON.parse(JSON.stringify({ uri: photo, name: fileName, type })))
      formData.append('title', title);
      formData.append('link', link)
      formData.append('phone', String(phone))
      formData.append('size', title);

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
          console.log(error.response?.data)
          console.log(error.response?.status)

        }

        Alert.alert("Atualizar Anúncio", "Houve um erro ao atualizar o anúncio, tente novamente.");
      }

    }

  }, [size, photo, phone, link, title]);

  useEffect(() => {
    if (action === "update") {
      fetchAdvertisement();
    }
  }, [action]);

  if (loading)
    return <LoadCart />

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding' })}
      enabled
      style={{ flex: 1 }}
    >
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          containerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
        >
          <Container>
            <ContainerBackground />
            <Header>
              <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                <Icone name="arrow-back" />
              </ReturnButton>
              <Title>Anúncio</Title>
            </Header>

            <Form>
              <PhotoView>
                <PhotoComponent uri={photo || ''} />
                <IconView onPress={handleImagePicker}>
                  <Icon name="camera-reverse-outline" />
                </IconView>
              </PhotoView>

              <ScrollForm>
                <Fields>
                  <InputDefault
                    name="title"
                    defaultValue={title}
                    onChangeText={(text) => {
                      setTitle(text)
                      setErrorTitle(null)
                    }}
                    errorMessage={errorTitle}
                    autoCapitalize="words"
                    inputType="default"
                    placeholder="Nome da empresa"
                    iconNameL="ios-newspaper-outline"
                  />

                  <InputDefault
                    name="phone"
                    defaultValue={String(phone)}
                    onChangeText={(number) => {
                      setPhone(number)
                      setErrorPhone(null)
                    }}
                    errorMessage={errorPhone}
                    inputType="numeric"
                    placeholder="Número de telefone"
                    iconNameL="call-outline"
                  />

                  <InputDefault
                    name="link"
                    defaultValue={link}
                    onChangeText={(text) => setLink(text)}
                    autoCapitalize="none"
                    inputType="default"
                    placeholder="Link da rede social"
                    iconNameL="ios-link"
                  />

                  <AdSizeSelect
                    title={size.sizeTitle ? size.sizeTitle : "Tamanho do anúncio"}
                    onPress={handleOpenModal}
                  />

                </Fields>

              </ScrollForm>

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

            </Form>

          </Container>

        </TouchableWithoutFeedback>

      </ScrollView>

      <ModalView visible={openModal} closeModal={handleCloseModal}>
        <SizeAdvertisement handleModalSelect={handleModalSelect} />
      </ModalView>
    </KeyboardAvoidingView >
  )
}