import React, { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { api } from "@services/api";
import { AxiosError } from "axios";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ContainerBackground } from "@components/ContainerBackground";
import { PhotoComponent } from "@components/PhotoComponent";
import { InputDefault } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { AdSizeSelect } from "@components/AdSizeSelect";
import { ModalView } from "@components/ModalView";
import { SizeAdvertisement, SizesType } from "../SizeAdvertisement";
import { Container, Header, Icone, ReturnButton, Title, Form, PhotoView, IconView, Icon, Fields, ScrollForm } from "./styles";

export function RegisterAdvertisement() {
  const navigation = useNavigation();

  const [isLogging, setIsLogging] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [photo, setPhoto] = useState<string>();
  const [size, setSize] = useState<SizesType>({
    id: "1",
    title: "Tamanho do anúncio"
  })
  const [title, setTitle] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [link, setLink] = useState<string>('');

  const [errorTitle, setErrorTitle] = useState<string | null>();
  const [errorPhone, setErrorPhone] = useState<string | null>();

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
      formData.append('phone', phone)
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
              <Title>Cadastrar anúncio</Title>
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
                    defaultValue={phone}
                    onChangeText={(text) => {
                      setPhone(text)
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
                    title={size.title ? size.title : "Tamanho do anúncio"}
                    onPress={handleOpenModal}
                  />

                </Fields>

              </ScrollForm>

              <Button
                title="Salvar"
                backgroundColor="primary"
                iconRight
                isLoading={isLogging}
                iconName="save-outline"
                onPress={handleRegisterAdvertisement}
              />

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