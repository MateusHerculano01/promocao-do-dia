import React from "react";
import { Container, Icon, Title } from "./styles";

interface Props {
  icon: string;
  title: string;
  IconColor?: string;
  onPress: () => void;
}

export function ButtonUserProfile({ icon, IconColor, title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Icon name={icon}
        style={{ color: IconColor ? IconColor : "#37474F" }}
      />
      <Title>{title}</Title>
    </Container>
  )
}