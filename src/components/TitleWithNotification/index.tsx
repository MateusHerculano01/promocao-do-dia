import React from "react";
import { Container, Title, NotificationButton, Icon } from "./styles";
interface Props {
  title: string;
  onPress: () => void;
}

export function TitleWithNotification({ title, onPress }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <NotificationButton onPress={onPress}>
        <Icon name="notifications-none" />
      </NotificationButton>
    </Container>
  );
}
