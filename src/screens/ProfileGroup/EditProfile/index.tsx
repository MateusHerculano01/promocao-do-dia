import React, { useCallback, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";


import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { PhotoAvatar } from "@components/PhotoAvatar";
import { InputDefault } from "@components/Form/Input";

import { Container, Header, Icone, ReturnButton, Title, Form, UserPhotoInput, Fields, Image, View, Icon, TouchView, EditPasswordView, EditPasswordText } from "./styles";


export function EditProfile() {
  const navigation = useNavigation();

  const [image, setImage] = useState('');

  function fetchUser() {

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

  const handleEditProfile = useCallback(() => {


  }, []);

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
                errorMessage={"t"}
                autoCapitalize="words"
                inputType="default"
                placeholder="Nome completo"
                iconName="person-circle-outline"
              />
              <InputDefault
                name="phone"
                errorMessage={"t"}
                maxLength={15}
                inputType="numeric"
                placeholder="Número de telefone"
                iconName="call-outline"
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
              onPress={handleEditProfile} />
          </Form>

        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  )
}