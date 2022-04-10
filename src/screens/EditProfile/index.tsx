import React, { useState } from "react";
import { CommonActions } from '@react-navigation/native';
import { ImageSourcePropType, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
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
  const [phone, setPhone] = useState(null as any);

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
                  name="name"
                  inputType="default"
                  placeholder="Nome completo"
                  iconNameL="person-circle-outline"
                />
                <InputWithLabel
                  name="password"
                  inputType="default"
                  placeholder="Senha"
                  iconNameL="lock-closed-outline"
                  isPassword={true}
                  iconRight={true}
                  style={{ marginTop: 15, marginBottom: 15 }}
                />
                <InputWithLabel
                  value={phone}
                  mask="phone"
                  name="phone"
                  inputType="numeric"
                  placeholder="Número de telefone"
                  iconNameL="call-outline"
                />
              </Fields>
              <Button title="Salvar" style={{ alignSelf: 'flex-end' }} iconRight={true} iconName="save-outline" backgroundColor="primary" onPress={() => { }} />
            </Form>
          </Container>
        </TouchableWithoutFeedback>

      </ScrollView>
    </KeyboardAvoidingView >
  )
}