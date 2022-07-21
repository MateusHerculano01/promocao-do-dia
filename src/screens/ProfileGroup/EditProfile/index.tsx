import React, { useCallback, useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";

import { useAuth } from "@hooks/auth";

import { AxiosError } from "axios";
import { api } from "@services/api";
import { UserDTOS } from "@dtos/UserDTOS";

import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { PhotoAvatar } from "@components/PhotoAvatar";
import { InputDefault } from "@components/Form/Input";
import { InputWithMask } from "@components/Form/InputMask"
import { LoadCart } from "@components/LoadCart";

import { Container, Header, Icone, ReturnButton, Title, Form, UserPhotoInput, Fields, Image, View, Icon, TouchView, EditPasswordView, EditPasswordText } from "./styles";

export function EditProfile() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');

  const [errorName, setErrorName] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  async function fetchUser() {
    try {
      setLoading(true);

      const { data } = await api.get(`/users/${user.id}`);

      setImage(data.user.avatar_url);
      setName(data.user.name);

      setLoading(false);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)

      }

    }

  }

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  function validate() {
    let error = false;

    if (!name) {
      setErrorName("Preencha o nome");
      error = true;
    }

    return !error;
  }

  async function handleEditProfile() {

    const formData = new FormData();

    let fileName = image.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName!);
    let type = match ? `image/${match[1]}` : `image`;

    if (validate()) {

      formData.append('avatar', JSON.parse(JSON.stringify({ uri: image, name: fileName, type })))
      formData.append('name', name!.trim());

      try {
        setIsLogging(true);

        await api.patch('/users/update', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })

        setIsLogging(false);

        navigation.navigate('ProfileScreen');

      } catch (error) {
        setIsLogging(false);

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
          console.log(error.response?.status)
          console.log(error)
        }
      }

    }

  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <LoadCart />
  }

  return (

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
          <Title>Editar perfil</Title>
        </Header>

        <ScrollView showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>

          <Form>
            <UserPhotoInput>
              <PhotoAvatar uri={image} />
              <View onPress={handleImagePicker}>
                <Icon name="camera-reverse-outline" />
              </View>
            </UserPhotoInput>
            <Fields>
              <InputDefault
                name="name"
                value={name}
                onChangeText={(text: string) => {
                  setName(text)
                  setErrorName(null);
                }}
                errorMessage={errorName}
                autoCapitalize="words"
                inputType="default"
                placeholder="Nome completo"
                iconName="person-circle-outline"
              />
            </Fields>

            <TouchView>
              <EditPasswordView
                onPress={() => { navigation.navigate("EditPassword") }}
              >
                <EditPasswordText>Editar senha</EditPasswordText>
              </EditPasswordView>
            </TouchView>

            <Button
              title="Salvar"
              iconRight
              iconName="save-outline"
              backgroundColor="primary"
              isLoading={isLogging}
              onPress={handleEditProfile} />
          </Form>

        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  )
}