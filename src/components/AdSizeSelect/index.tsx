import React from "react";

import { Container, IconLeft, AdTitle, IconRight } from "./styles";

type Props = {
  title: string;
  onPress: () => void;
}

export function AdSizeSelect({ title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <IconLeft name="contract-outline" />
      <AdTitle>{title}</AdTitle>
      <IconRight name="chevron-down" />
    </Container>
  )
}