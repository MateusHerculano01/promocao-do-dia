import React from "react";
import { ContainerBackground, Container, Button, Icon, Image, Label } from "./styles";

type Props = {
  uri: string | null;
}

export function PhotoProduct({ uri }: Props) {
  if (uri) {
    return (
      <ContainerBackground source={{ uri }}>
        <Button>
          <Icon name="close-circle" />
        </Button>
      </ContainerBackground>
    )
  }

  return (
    <Container>
      <Label>Não há foto</Label>
    </Container>
  )

}