import React from "react";
import { Container, Image, Button, Icon } from "./styles";

type Props = {
  uri: string;
  onPress: () => void;
}

export function PhotoProduct({ uri, onPress }: Props) {
  return (
    <Container>
      <Image source={{ uri }} />
      <Button onPress={onPress}>
        <Icon name="close-circle" />
      </Button>
    </Container>
  )
}