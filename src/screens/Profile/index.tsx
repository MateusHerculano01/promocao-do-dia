import React, { useEffect, useState } from "react";
import { Container, Title, UserInfo, Image, View, Name, Email, NoImage } from "./styles";
import { ContainerBackground } from "../../components/ContainerBackground";
import { ButtonUserProfile } from "../../components/ButtonUserProfile";
import { Divider } from "../../components/ListDivider/styles";
import { ScrollView } from "react-native";
import { useAuth } from "@hooks/auth";

export function Profile({ navigation }: any) {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <ContainerBackground />

      <Title>Minha conta</Title>

      <UserInfo>
        {user.avatar ?
          <Image source={{ uri: '' }} /> : <NoImage />
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
        <ButtonUserProfile
          title="Editar anúncio"
          iconName="ios-newspaper-outline"
          iconColor="#F37A20"
          onPress={() => { navigation.navigate("EditAdvertisement") }}
        />
        <Divider />
        <ButtonUserProfile
          title="Minha localização"
          iconName="ios-location-outline"
          onPress={() => { }}
        />
        <Divider />
        <ButtonUserProfile
          title="Produtos cadastrados"
          iconName="basket-outline"
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