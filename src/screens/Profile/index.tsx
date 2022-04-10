import React from "react";
import { Container, Title, UserInfo, Image, View, Name, Email } from "./styles";
import { ContainerBackground } from "../../components/ContainerBackground";
import { ButtonUserProfile } from "../../components/ButtonUserProfile";
import { Divider } from "../../components/ListDivider/styles";
import { ScrollView } from "react-native";

export function Profile() {
  return (
    <Container>
      <ContainerBackground />

      <Title>Minha conta</Title>

      <UserInfo>
        <Image source={{ uri: 'https://scontent.frvd3-1.fna.fbcdn.net/v/t31.18172-8/11782508_870418799719578_796437011858698732_o.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ba80b0&_nc_ohc=Lr569TYqHIkAX85R5bI&_nc_ht=scontent.frvd3-1.fna&oh=00_AT__V2A4d7w3FYwwzncc73K-GuiwGtjwpQqZbbEoNRWtRQ&oe=6275D4A1' }} />
        <View>
          <Name>Adriel Mendes</Name>
          <Email>adriel.mendes@gmail.com</Email>
        </View>
      </UserInfo>

      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <ButtonUserProfile title="Editar perfil" iconName="pencil" iconColor="#236CD9" onPress={() => { }} />
        <Divider />
        <ButtonUserProfile title="Minha localização" iconName="ios-location-outline" onPress={() => { }} />
        <Divider />
        <ButtonUserProfile title="Produtos cadastrados" iconName="basket-outline" onPress={() => { }} />
        <Divider />
        <ButtonUserProfile title="Notificações" iconName="md-notifications-outline" onPress={() => { }} />
        <Divider />
        <ButtonUserProfile title="Fale com o nosso suporte" iconName="chatbox-outline" iconColor="#5EC401" onPress={() => { }} />
        <Divider />
        <ButtonUserProfile title="Sair" iconName="power-outline" iconColor="#FF5552" onPress={() => { }} />
      </ScrollView>
    </Container>
  )
}