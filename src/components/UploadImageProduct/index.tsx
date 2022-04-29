import React from "react";
import { Container, ButtonView, IconCamera, Label } from "./styles";

export function UploadImageProduct() {
  return (
    <Container>
      <ButtonView>
        <IconCamera name="camera-plus-outline" />
        <Label>Enviar uma imagem</Label>
      </ButtonView>
    </Container>
  )
}