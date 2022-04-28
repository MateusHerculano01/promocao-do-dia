import React from "react";
import { Container, Title, NotificationButton, Icon } from "./styles";
interface Props {
  title: string;
}

export function TitleWithNotification({ title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <NotificationButton>
        {/* <Icon name="notifications-none" /> */}
      </NotificationButton>
    </Container>
  );
}
