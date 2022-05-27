import React from "react";
import { Container, Icon, Title } from "./styles";

type Props = {
  icon: string;
  title: string;
}

export function AdvertiserStockCard({ icon, title }: Props) {
  return (
    <Container>
      <Icon name={icon} />
      <Title>{title}</Title>
    </Container>
  )
}