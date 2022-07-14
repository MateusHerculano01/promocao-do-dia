import React from "react";
import { Container, Title, NotificationButton, Icon, CountNotifications, NotificationsNumber } from "./styles";

interface Props {
  title: string;
  onPress: () => void;
  notificationsActive: boolean;
}

export function TitleWithNotification({ title, onPress, notificationsActive = false }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <NotificationButton onPress={onPress}>
        <Icon name="notifications-none" />

        {notificationsActive ?
          <CountNotifications />
          :
          <></>
        }

      </NotificationButton>
    </Container>
  );
}
