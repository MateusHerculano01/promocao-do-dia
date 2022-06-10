import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CommonActions } from '@react-navigation/native';
import { ContainerBackground } from "@components/ContainerBackground";
import { InputForm } from "@components/Form/InputForm";
import { Button } from "@components/Form/Button";
import { PhotoAvatar } from "@components/PhotoAvatar";
import { Container, Header, Icone, ReturnButton, Title, Form, UserPhotoInput, Fields, Image, View, Icon, TouchView, EditPasswordView, EditPasswordText } from "./styles";

interface FormData {
  [key: string]: any;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
});

export function EditProfile({ navigation }: any) {
  const [image, setImage] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

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

  function handleEditProfile(form: FormData) {
    const data = {
      name: form.name,
      phone: form.phone
    }
    console.log(data)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding' })}
      enabled
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
              <Title>Editar perfil</Title>
            </Header>
            <Form>
              <UserPhotoInput>
                <PhotoAvatar uri={image} />
                <View onPress={handleImagePicker}>
                  <Icon name="camera-reverse-outline" />
                </View>
              </UserPhotoInput>
              <Fields>
                <InputForm
                  name="name"
                  control={control}
                  error={errors.name && errors.name.message}
                  autoCapitalize="words"
                  inputType="default"
                  placeholder="Nome completo"
                  iconNameL="person-circle-outline"
                />
                <InputForm
                  name="phone"
                  control={control}
                  error={errors.phone && errors.phone.message}
                  maxLength={15}
                  inputType="numeric"
                  placeholder="Número de telefone"
                  iconNameL="call-outline"
                />

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
                  onPress={handleSubmit(handleEditProfile)} />
              </Fields>
            </Form>
          </Container>
        </TouchableWithoutFeedback>

      </ScrollView>
    </KeyboardAvoidingView >
  )
}