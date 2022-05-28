import React from "react";
import { Container, Icon, Title } from "./styles";

type Props = {
  icon: string;
  title: string;
  onPress: () => void;
}

export function AdvertiserStockCard({ icon, title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Icon name={icon} />
      <Title>{title}</Title>
    </Container>
  )
}