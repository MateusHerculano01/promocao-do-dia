import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Icon, Title } from "./styles";

interface Props extends RectButtonProps {
  icon: string;
  title: string;
}

export function AdvertiserStockCard({ icon, title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Icon name={icon} />
      <Title>{title}</Title>
    </Container>
  )
}