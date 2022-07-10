import React, { useCallback, useState } from "react";
import { ButtonView, ConfirmButton, ConfirmText, Container, Content, DescriptionGroup, InputDescription, InputGroupHeader, LabelDescription, MaxCharacters, Title } from "./styles";
import { HeaderButton } from "@components/HeaderButton";
import { InputDefault } from "@components/Form/Input";

type Props = {
  closeModal: () => void;
  confirm: (notificationTitle: string, notificationMessage: string) => void;
}

export function NotificationForm({ closeModal, confirm }: Props) {

  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  return (
    <Container>
      <Content>

        <Title>Digite uma mensagem que aparecera como notificação para o usuário.</Title>

        <InputDefault
          name="notificationTitle"
          value={notificationTitle}
          maxLength={30}
          placeholder="Título"
          iconName="md-notifications"
          onChangeText={(text: string) => {
            setNotificationTitle(text)
          }}
        />

        <DescriptionGroup>
          <InputGroupHeader>
            <LabelDescription>Mensagem da notificação</LabelDescription>
            <MaxCharacters>{!notificationMessage ? 0 : notificationMessage.length} de 100</MaxCharacters>
          </InputGroupHeader>

          <InputDescription
            multiline
            maxLength={100}
            onChangeText={setNotificationMessage}
            value={notificationMessage}
          />
        </DescriptionGroup>

        <ButtonView>
          <HeaderButton
            color="delete"
            title="Cancelar"
            onPress={closeModal}
          />
          <ConfirmButton
            onPress={() => { confirm(notificationTitle, notificationMessage) }}
          >
            <ConfirmText>
              Confirmar
            </ConfirmText>
          </ConfirmButton>
        </ButtonView>

      </Content>
    </Container>
  )
}