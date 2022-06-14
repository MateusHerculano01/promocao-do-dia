import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { api } from "@services/api";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserPhoto } from "@components/AdvertiserPhoto";
import { InputForm } from "@components/Form/InputForm";
import { Button } from "@components/Form/Button";
import { AdSizeSelect } from "@components/AdSizeSelect";
import { ModalView } from "@components/ModalView";
import { SizeAdvertisement, SizesType } from "../SizeAdvertisement";
import { Container, Header, Icone, ReturnButton, Title, Form, PhotoView, IconView, Icon, Fields } from "./styles";

interface FormData {
  [key: string]: any;
}

const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  phone: Yup.number().required('Telefone é obrigatório'),
  link: Yup.string(),
});

export function RegisterAdvertisement() {
  const navigation = useNavigation();

  const [isLogging, setIsLogging] = useState(false);
  const [photo, setPhoto] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [size, setSize] = useState<SizesType>({
    id: "1",
    title: "Tamanho do anúncio"
  })

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

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

  const handleRegisterAdvertisement = useCallback(async (form: FormData) => {
    console.log(size)

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

    formData.append('photo', JSON.parse(JSON.stringify({ uri: photo, name: fileName, type })))
    formData.append('title', form.title);
    formData.append('link', form.link)
    formData.append('phone', form.phone)
    formData.append('size', size.title);

    try {
      setIsLogging(true);

      await api.post('/advertiser/new', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      })

      setIsLogging(false);

      navigation.navigate("Sucess", {
        nextScreenRoute: "AdvertiserDashboard",
        title: "Anúncio cadastrado com sucesso."
      });

    } catch (error) {
      setIsLogging(false);

      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.status)

      }

      Alert.alert("Cadastrar Anúncio", "Houve um erro ao cadastrar o anúncio, tente novamente.");
    }

  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding' })}
      enabled
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "#37474F" }}>

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
                <AdvertiserPhoto uri={photo} />
                <IconView onPress={handleImagePicker}>
                  <Icon name="camera-reverse-outline" />
                </IconView>
              </PhotoView>

              <Fields>
                <InputForm
                  name="title"
                  control={control}
                  error={errors.title && errors.title.message}
                  autoCapitalize="words"
                  inputType="default"
                  placeholder="Título do anúncio"
                  iconNameL="ios-newspaper-outline"
                />

                <InputForm
                  name="phone"
                  control={control}
                  error={errors.phone && errors.phone.message}
                  inputType="numeric"
                  placeholder="Número de telefone"
                  iconNameL="call-outline"
                />

                <InputForm
                  name="link"
                  control={control}
                  error={errors.link && errors.link.message}
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

              <Button
                title="Salvar"
                backgroundColor="primary"
                iconRight
                isLoading={isLogging}
                iconName="save-outline"
                onPress={handleSubmit(handleRegisterAdvertisement)}
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