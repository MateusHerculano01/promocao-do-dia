import React from "react";
import { Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/auth";
import { ContainerBackground } from "@components/ContainerBackground";
import { ButtonUserProfile } from "@components/ButtonUserProfile";
import { Divider } from "@components/ListDivider/styles";

import { Container, Title, UserInfo, Image, View, Name, Email, NoImage } from "./styles";

export function Profile() {

  const navigation = useNavigation();

  const { signOut, user } = useAuth();

  function handleNavigation() {
    navigation.navigate('Advertiser');
  }

  return (
    <Container>
      <ContainerBackground />

      <Title>Minha conta</Title>

      <UserInfo>
        {/*  // Resolver problema de link de imagem esta trazendo undefined quando n tem imagem */}
        {user.avatar_url ?
          <Image source={{ uri: user.avatar_url }} /> : <NoImage />
        }
        <View>
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
        </View>
      </UserInfo>

      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <ButtonUserProfile
          title="Editar perfil"
          iconName="pencil"
          iconColor="#236CD9"
          onPress={() => { navigation.navigate("EditProfile") }}
        />
        <Divider />
        {user.isAdvertiser ?
          <>
            <ButtonUserProfile
              title="Área do anunciante"
              iconName="ios-newspaper-outline"
              iconColor="#F37A20"
              onPress={handleNavigation}
            />
            <Divider />
          </> : null}
        <ButtonUserProfile
          title="Minha localização"
          iconName="ios-location-outline"
          onPress={() => { }}
        />
        <Divider />
        <ButtonUserProfile
          title="Notificações"
          iconName="md-notifications-outline"
          onPress={() => { }}
        />
        <Divider />
        <ButtonUserProfile
          title="Fale com o nosso suporte"
          iconName="chatbox-outline"
          iconColor="#5EC401"
          onPress={() => { }}
        />
        <Divider />
        <ButtonUserProfile
          title="Sair"
          iconName="power-outline"
          iconColor="#FF5552"
          onPress={signOut}
        />
      </ScrollView>
    </Container>
  )
}