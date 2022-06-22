import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { ButtonSelectContainer, Container, IconLeft, Title, IconRight, Error } from "./styles";

interface SelectButtonProps extends RectButtonProps {
  title: string;
  icon: string;
  errorMessage?: string | null;
}

export function ButtonSelect({ title, icon, errorMessage, onPress }: SelectButtonProps) {
  return (
    <ButtonSelectContainer>

      <Container onPress={onPress}>
        <IconLeft name={icon} />
        <Title>{title}</Title>
        <IconRight name="chevron-down" />
      </Container>

      {errorMessage &&
        <Error>{errorMessage}</Error>
      }

    </ButtonSelectContainer>
  )
}