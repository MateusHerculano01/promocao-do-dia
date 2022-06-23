import React, { useState, useEffect } from "react";
import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { api } from "@services/api";
import { AxiosError } from "axios";
import { ContainerBackground } from "@components/ContainerBackground";
import { PhotoComponent } from "@components/PhotoComponent";
import { InputDefault } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { LoadCart } from "@components/LoadCart";
import { Container, Header, Icone, ReturnButton, Title, Form, PhotoView, IconView, Icon, ButtonView, LeftView, RightView, CancelButton, TextCancel } from "./styles";

type CategoryNavigationProps = {
  id: string;
}

export function RegisterCategory() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params as CategoryNavigationProps;

  const [isLogging, setIsLogging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [photo, setPhoto] = useState<string>();
  const [categoryName, setCategoryName] = useState<string>();
  const [errorCategoryName, setErrorCategoryName] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  async function handleImagePicker() {
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
  }

  function validate() {
    let error = false

    if (!categoryName) {
      setErrorCategoryName("Preencha o nome da categoria")
      error = true
    }

    return !error

  }

  async function handleRegisterCategory() {

    if (!photo) {
      return Alert.alert("Cadastrar Categoria", "Selecione uma imagem para a categoria");
    }

    const formData = new FormData();

    let fileName = photo.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName!);
    let type = match ? `image/${match[1]}` : `image`;

    if (validate()) {

      formData.append('photo', JSON.parse(JSON.stringify({ uri: photo, name: fileName, type })))
      formData.append('categoryName', categoryName!.trim());

      try {
        setIsLogging(true);

        await api.post('/categories/new', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })

        setIsLogging(false);

        Alert.alert("Cadastrar Categoria", "Categoria cadastrada com sucesso. ✔");

        navigation.navigate('HomeCategory');

      } catch (error) {
        setIsLogging(false);

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
          console.log(error.response?.status)
        }
        Alert.alert("Cadastrar Categoria", "Houve um erro ao cadastrar a categoria, tente novamente. ❌");
      }

    }

  }

  async function fetchCategory() {
    try {
      setLoading(true);

      const { data } = await api.get(`/categories/${id}`);

      setCategoryName(data.categoryName);
      setPhoto(data.photo_url);
      setLoading(false);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)

      }

    }

  }

  async function handleUpdateCategory() {
    if (!photo) {
      return Alert.alert("Atualizar Categoria", "Selecione uma imagem para a categoria. 📷");
    }

    const formData = new FormData();

    let fileName = photo.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName!);
    let type = match ? `image/${match[1]}` : `image`;

    if (validate()) {
      formData.append('photo', JSON.parse(JSON.stringify({ uri: photo, name: fileName, type })))
      formData.append('categoryName', categoryName!.trim());

      try {
        setIsLogging(true);

        await api.patch(`/categories/update/${id}`, formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })

        setIsLogging(false);

        Alert.alert("Atualizar Categoria", "Categoria atualizada com sucesso. ✔");

        navigation.navigate('HomeCategory');

      } catch (error) {
        setIsLogging(false);

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
          console.log(error.response?.status)
        }
        Alert.alert("Atualizar Categoria", "Houve um erro ao atualizar a categoria, tente novamente. ❌");
      }

    }

  }

  async function handleDeleteCategory() {
    try {
      setIsDeleting(true);

      await api.delete(`categories/delete/${id}`);

      setIsDeleting(false);

      Alert.alert("Deletar Categoria", "Categoria deletada com sucesso. ✔");

      navigation.navigate('HomeCategory');

    } catch (error) {
      setIsDeleting(false);

      Alert.alert("Deletar Categoria", "Houve um erro ao deletar a categoria, tente novamente. ❌");
    }
  }

  useEffect(() => {
    if (id) {
      fetchCategory();
    }
  }, [id]);

  if (loading)
    return <LoadCart />

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        containerStyle={{ flex: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Container>
            <ContainerBackground />
            <Header>
              <LeftView>
                <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                  <Icone name="arrow-back" />
                </ReturnButton>
                <Title>Anúncio</Title>
              </LeftView>
              <RightView>
                <CancelButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                  <TextCancel>Cancelar</TextCancel>
                </CancelButton>
              </RightView>
            </Header>

            <Form>
              <PhotoView>
                <PhotoComponent uri={photo || ''} />
                <IconView onPress={handleImagePicker}>
                  <Icon name="camera-reverse-outline" />
                </IconView>
              </PhotoView>

              <InputDefault
                name="categoryName"
                defaultValue={categoryName}
                onChangeText={text => {
                  setCategoryName(text)
                  setErrorCategoryName(null);
                }}
                errorMessage={errorCategoryName}
                autoCapitalize="words"
                inputType="default"
                placeholder="Nome da categoria"
                iconName="filter-outline"
              />

              {id ?
                <ButtonView>
                  <Button
                    title="Atualizar"
                    backgroundColor="primary"
                    iconRight
                    isLoading={isLogging}
                    iconName="save-outline"
                    onPress={handleUpdateCategory}
                  />
                  <Button
                    title="Deletar"
                    backgroundColor="delete"
                    iconRight
                    isLoading={isDeleting}
                    iconName="ios-trash-outline"
                    onPress={handleDeleteCategory}
                  />
                </ButtonView>
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
        </ScrollView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}