import React, { useCallback, useState } from "react";
import { Linking, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/auth";

import { AxiosError } from "axios";
import { api } from "@services/api";

import { ContainerBackground } from "@components/ContainerBackground";
import { ButtonUserProfile } from "@components/ButtonUserProfile";
import { ListDivider } from "@components/ListDivider";

import { Container, Title, UserInfo, Image, View, Name, Email } from "./styles";

export function Profile() {

  const navigation = useNavigation();

  const { signOut, user } = useAuth();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleNavigation() {
    navigation.navigate('Advertiser');
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+5564981612655&text=Olá gostaria de falar com suporte ao usuário do App Promoção do Dia`);
  }

  async function fetchUser() {
    try {

      const { data } = await api.get(`/users/${user.id}`);

      setImage(data.user.avatar_url);
      setName(data.user.name);
      setEmail(data.user.email);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)

      }

    }

  }

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  return (
    <>

      <Container>
        <ContainerBackground />

        <Title>Minha conta</Title>

        <UserInfo>
          <Image source={{ uri: image }} />
          <View>
            <Name>{name}</Name>
            <Email>{email}</Email>
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
            onPress={() => { navigation.navigate("EditProfile") }} />
          <ListDivider />

          {
            user.isAdvertiser ?
              <>
                <ButtonUserProfile
                  title="Área do anunciante"
                  iconName="ios-newspaper-outline"
                  iconColor="#F37A20"
                  onPress={handleNavigation}
                />
                <ListDivider />
              </>
              :

              <>
                <ButtonUserProfile
                  title="Seja um anunciante"
                  iconName="ios-newspaper-outline"
                  iconColor="#F37A20"
                  onPress={() => { }}
                />
                <ListDivider />
              </>

          }
          <ButtonUserProfile
            title="Minha localização"
            iconName="ios-location-outline"
            onPress={() => { }}
          />
          <ListDivider />

          <ButtonUserProfile
            title="Notificações"
            iconName="md-notifications-outline"
            onPress={() => navigation.navigate("Notifications")}
          />
          <ListDivider />

          <ButtonUserProfile
            title="Fale com o nosso suporte"
            iconName="chatbox-outline"
            iconColor="#5EC401"
            onPress={handleWhatsapp}
          />
          <ListDivider />

          <ButtonUserProfile
            title="Sair"
            iconName="power-outline"
            iconColor="#FF5552"
            onPress={signOut}
          />
        </ScrollView>
      </Container>
    </>
  )
}