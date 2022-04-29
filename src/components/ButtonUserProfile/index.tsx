import React from "react";
import { Container, Icon, Title } from "./styles";

interface Props {
  iconName: string;
  title: string;
  iconColor?: string;
  onPress: () => void;
}

export function ButtonUserProfile({ iconName, iconColor, title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Icon name={iconName}
        style={{ color: iconColor ? iconColor : "#37474F" }}
      />
      <Title>{title}</Title>
    </Container>
  )
}