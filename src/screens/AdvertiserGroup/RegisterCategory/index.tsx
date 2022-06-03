import React, { useState } from "react";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/auth";
import { api } from "@services/api";
import { ContainerBackground } from "@components/ContainerBackground";
import { PhotoAdversitment } from "@components/PhotoAdversitment";
import { InputForm } from "@components/Form/InputForm";
import { Button } from "@components/Form/Button";
import { Container, Header, Icone, ReturnButton, Title, Form, PhotoView, IconView, Icon, Fields } from "./styles";
import { AxiosError } from "axios";

interface FormData {
  [key: string]: any;
}

const schema = Yup.object().shape({
  categoryName: Yup.string().required('Nome da categoria é obrigatório.'),
});

export function RegisterCategory() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [photo, setPhoto] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if (!result.cancelled) {
        setPhoto(result.uri);
      }
    }
  }

  async function handleRegisterCategory(form: FormData) {

    if (!photo) {
      return Alert.alert("Cadastrar Categoria", "Selecione uma imagem para a categoria");
    }

    const formData = new FormData();

    let fileName = photo.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName!);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append('photo', JSON.parse(JSON.stringify({ uri: photo, name: fileName, type })))
    formData.append('categoryName', form.categoryName);

    try {
      setIsLogging(true);

      await api.post('/category/new', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      })

      setIsLogging(false);

      Alert.alert("Cadastrar Categoria", "Categoria cadastrada com sucesso.");

      // navigation.navigate('AdvertiserDashboard');

    } catch (error) {
      setIsLogging(false);

      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.status)
      }
      Alert.alert("Cadastrar Categoria", "Houve um erro ao cadastrar a categoria, tente novamente.");
    }

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              <Title>Cadastrar Categoria</Title>
            </Header>

            <Form>
              <PhotoView>
                <PhotoAdversitment uri={photo} />
                <IconView onPress={handleImagePicker}>
                  <Icon name="camera-reverse-outline" />
                </IconView>
              </PhotoView>

              <Fields>
                <InputForm
                  name="categoryName"
                  control={control}
                  error={errors.categoryName && errors.categoryName.message}
                  autoCapitalize="words"
                  inputType="default"
                  placeholder="Nome da categoria"
                  iconNameL="filter-outline"
                />

              </Fields>

              <Button
                title="Salvar"
                backgroundColor="primary"
                iconRight
                isLoading={isLogging}
                iconName="save-outline"
                onPress={handleSubmit(handleRegisterCategory)}
              />
            </Form>

          </Container>

        </TouchableWithoutFeedback>
      </ScrollView>

    </KeyboardAvoidingView >
  )
}