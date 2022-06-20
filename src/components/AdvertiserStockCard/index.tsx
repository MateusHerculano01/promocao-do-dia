import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Container, Icon, Title } from "./styles";

interface Props extends RectButtonProps {
  icon: string;
  title: string;
  iconColor?: string;
}

export function AdvertiserStockCard({ icon, iconColor, title, onPress, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container onPress={onPress} {...rest}>
      <Icon name={icon} style={{ color: iconColor ? iconColor : theme.colors.title }} />
      <Title>{title}</Title>
    </Container>
  )
}