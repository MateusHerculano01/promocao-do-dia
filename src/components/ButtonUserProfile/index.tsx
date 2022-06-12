import React, { ReactNode } from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Icon, Title } from "./styles";

interface Props extends RectButtonProps {
  iconName: string;
  title: string;
  iconColor?: string;
}

export function ButtonUserProfile({ iconName, iconColor, title, onPress, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      <Icon name={iconName}
        style={{ color: iconColor ? iconColor : "#37474F" }}
      />
      <Title>{title}</Title>
    </Container>
  )
}