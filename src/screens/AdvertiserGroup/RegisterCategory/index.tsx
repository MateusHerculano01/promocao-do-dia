import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import { CategoryNavigationProps } from "@src/@types/navigationAdvertiser";
import { ContainerBackground } from "@components/ContainerBackground";
import { AdvertiserPhoto } from "@components/AdvertiserPhoto";
import { CategoryProps } from "@components/AdvertiserCategoryCard";
import { InputDefault } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { Container, Header, Icone, ReturnButton, Title, Form, PhotoView, IconView, Icon, Fields } from "./styles";
import { AxiosError } from "axios";

type FormData = {
  [key: string]: any;
}

export function RegisterCategory() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as CategoryNavigationProps;
  const [isLogging, setIsLogging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [photo, setPhoto] = useState('');
  const [categoryName, setCategoryName] = useState('');

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

  async function handleRegisterCategory() {

    if (!photo) {
      return Alert.alert("Cadastrar Categoria", "Selecione uma imagem para a categoria");
    }

    if (!categoryName) {
      return Alert.alert("Cadastrar Categoria", "Informe um nome para a categoria");
    }

    const formData = new FormData();

    let fileName = photo.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName!);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append('photo', JSON.parse(JSON.stringify({ uri: photo, name: fileName, type })))
    formData.append('categoryName', categoryName.trim());

    try {
      setIsLogging(true);

      await api.post('/categories/new', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      })

      setIsLogging(false);

      Alert.alert("Cadastrar Categoria", "Categoria cadastrada com sucesso.");

      navigation.navigate('HomeCategory');

    } catch (error) {
      setIsLogging(false);

      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.status)
      }
      Alert.alert("Cadastrar Categoria", "Houve um erro ao cadastrar a categoria, tente novamente.");
    }

  }

  async function fetchCategory() {
    try {
      const category = await api.get(`/categories/${id}`);

      setCategoryName(category.data.categoryName);
      setPhoto(category.data.photo_url);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.status)
      }

    }

  }

  async function handleUpdateCategory() {
    if (!photo) {
      return Alert.alert("Atualizar Categoria", "Selecione uma imagem para a categoria");
    }

    if (!categoryName) {
      return Alert.alert("Atualizar Categoria", "Informe um nome para a categoria");
    }

    const formData = new FormData();

    let fileName = photo.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName!);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append('photo', JSON.parse(JSON.stringify({ uri: photo, name: fileName, type })))
    formData.append('categoryName', categoryName.trim());

    try {
      setIsLogging(true);

      await api.patch(`/categories/update/${id}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      })

      setIsLogging(false);

      Alert.alert("Atualizar Categoria", "Categoria atualizada com sucesso.");

      navigation.navigate('HomeCategory');

    } catch (error) {
      setIsLogging(false);

      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.status)
      }
      Alert.alert("Atualizar Categoria", "Houve um erro ao atualizar a categoria, tente novamente.");
    }
  }

  async function handleDeleteCategory() {
    try {
      setIsDeleting(true);

      await api.delete(`categories/delete/${id}`);

      setIsDeleting(false);

      Alert.alert("Deletar Categoria", "Categoria deletada com sucesso.");

      navigation.navigate('HomeCategory');

    } catch (error) {
      setIsDeleting(false);

      Alert.alert("Deletar Categoria", "Houve um erro ao deletar a categoria, tente novamente.");
    }
  }

  useEffect(() => {
    if (id) {
      fetchCategory();
    }
  }, [id]);

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
              <Title>Categoria</Title>
            </Header>

            <Form>
              <PhotoView>
                <AdvertiserPhoto uri={photo} />
                <IconView onPress={handleImagePicker}>
                  <Icon name="camera-reverse-outline" />
                </IconView>
              </PhotoView>

              <Fields>
                <InputDefault
                  value={categoryName}
                  onChangeText={text => setCategoryName(text)}
                  name="categoryName"
                  autoCapitalize="words"
                  inputType="default"
                  placeholder="Nome da categoria"
                  iconNameL="filter-outline"
                />
              </Fields>

              {id ?
                <>
                  <Button
                    title="Atualizar"
                    backgroundColor="primary"
                    iconRight
                    isLoading={isLogging}
                    iconName="save-outline"
                    onPress={handleUpdateCategory}
                  />
                  <View style={{ marginVertical: 10 }} />
                  <Button
                    title="Deletar"
                    backgroundColor="delete"
                    iconRight
                    isLoading={isDeleting}
                    iconName="ios-trash-outline"
                    onPress={handleDeleteCategory}
                  />
                </>
                :
                <Button
                  title="Cadastrar"
                  backgroundColor="primary"
                  iconRight
                  isLoading={isLogging}
                  iconName="save-outline"
                  onPress={handleRegisterCategory}
                />
              }
            </Form>

          </Container>

        </TouchableWithoutFeedback>
      </ScrollView>

    </KeyboardAvoidingView >
  )
}