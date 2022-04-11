import React, { useState } from "react";
import { CommonActions } from '@react-navigation/native';
import { Alert, ImageSourcePropType, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ContainerBackground } from "../../components/ContainerBackground";
import { InputWithLabel } from "../../components/Form/InputWithLabel";
import { Container, Header, Icone, ReturnButton, Title, Form, UserPhotoInput, Image, View, Icon, Fields } from "./styles";
import { Button } from "../../components/Form/Button";

export interface CategoryListProps {
  id: string;
  image: ImageSourcePropType;
  title: string;
}

export function EditProfile({ navigation }: any) {
  const [name, setName] = useState(null as any);
  const [oldpassword, setOldPassword] = useState(null as any);
  const [newPassword, setNewPassword] = useState(null as any);
  const [phone, setPhone] = useState(null as any);

  function handleEditProfile() {
    const data =
    {
      name,
      oldpassword,
      newPassword,
      phone
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
                <Image source={{ uri: 'https://scontent.frvd3-1.fna.fbcdn.net/v/t31.18172-8/11782508_870418799719578_796437011858698732_o.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ba80b0&_nc_ohc=Lr569TYqHIkAX85R5bI&_nc_ht=scontent.frvd3-1.fna&oh=00_AT__V2A4d7w3FYwwzncc73K-GuiwGtjwpQqZbbEoNRWtRQ&oe=6275D4A1' }} />
                <View>
                  <Icon name="camera-reverse-outline" />
                </View>
              </UserPhotoInput>
              <Fields>
                <InputWithLabel
                  value={name}
                  mask="default"
                  inputMaskChange={(text: string) => setName(text)}
                  name="name"
                  inputType="default"
                  placeholder="Nome completo"
                  iconNameL="person-circle-outline"
                />
                <InputWithLabel
                  value={oldpassword}
                  mask="default"
                  inputMaskChange={(text: string) => setOldPassword(text)}
                  name="password"
                  inputType="default"
                  placeholder="Senha antiga"
                  iconNameL="lock-open-outline"
                  isPassword={true}
                  iconRight={true}
                  style={{ marginTop: 15, marginBottom: 15 }}
                />
                <InputWithLabel
                  value={newPassword}
                  mask="default"
                  inputMaskChange={(text: string) => setNewPassword(text)}
                  name="password"
                  inputType="default"
                  placeholder="Nova senha"
                  iconNameL="lock-closed-outline"
                  isPassword={true}
                  iconRight={true}
                  style={{ marginBottom: 15 }}
                />
                <InputWithLabel
                  value={phone}
                  inputMaskChange={(text: string) => setPhone(text)}
                  maxLength={15}
                  mask="phone"
                  name="phone"
                  inputType="numeric"
                  placeholder="Número de telefone"
                  iconNameL="call-outline"
                />
              </Fields>
              <Button title="Salvar" style={{ alignSelf: 'flex-end' }} iconRight={true} iconName="save-outline" backgroundColor="primary" onPress={handleEditProfile} />
            </Form>
          </Container>
        </TouchableWithoutFeedback>

      </ScrollView>
    </KeyboardAvoidingView >
  )
}