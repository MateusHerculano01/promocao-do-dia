import React from "react";
import { TextInputProps } from "react-native";
import { Container, Icon, InputText } from "./styles";
interface InputProps extends TextInputProps {
  name: string;
}

export function InputSearch({ name, ...rest }: InputProps) {
  return (
    <Container>
      <Icon name="search" />
      <InputText {...rest} />
    </Container>
  );
}
