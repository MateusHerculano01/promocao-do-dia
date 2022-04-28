import React from "react";
import { Alert, ImageSourcePropType, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CommonActions } from '@react-navigation/native';
import { ContainerBackground } from "../../components/ContainerBackground";
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { Container, Header, Icone, ReturnButton, Title, Form, UserPhotoInput, Fields, Image, View, Icon } from "./styles";

export interface CategoryListProps {
  id: string;
  image: ImageSourcePropType;
  title: string;
}

interface FormData {
  [key: string]: any;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  oldPassword: Yup.string().required('Senha antiga é obrigatória'),
  newPassword: Yup.string().required('Nova senha é obrigatória'),
  phone: Yup.string().required('Telefone é obrigatório'),
});

export function EditProfile({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function handleEditProfile(form: FormData) {
    const data = {
      name: form.name,
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
      phone: form.phone
    }
    console.log(data)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "#37474F" }}>

        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >

          <Container>
            <ContainerBackground />
            <Header>
              <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                {/* <Icone name="arrow-back" /> */}
              </ReturnButton>
              <Title>Editar perfil</Title>
            </Header>
            <Form>
              <UserPhotoInput>
                <Image source={{ uri: 'https://scontent.frvd3-1.fna.fbcdn.net/v/t31.18172-8/11782508_870418799719578_796437011858698732_o.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ba80b0&_nc_ohc=Lr569TYqHIkAX85R5bI&_nc_ht=scontent.frvd3-1.fna&oh=00_AT__V2A4d7w3FYwwzncc73K-GuiwGtjwpQqZbbEoNRWtRQ&oe=6275D4A1' }} />
               
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
                  name="oldPassword"
                  control={control}
                  error={errors.oldPassword && errors.oldPassword.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  placeholder="Senha antiga"
                  iconNameL="lock-open-outline"
                  isPassword
                  iconRight
                />
                <InputForm
                  name="newPassword"
                  control={control}
                  error={errors.newPassword && errors.newPassword.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputType="default"
                  placeholder="Nova senha"
                  iconNameL="lock-closed-outline"
                  isPassword
                  iconRight
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