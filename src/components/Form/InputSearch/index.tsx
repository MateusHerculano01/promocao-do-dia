import React from "react";
import { TextInputProps } from "react-native";
import { InputField, Icon, Input } from "./styles";
interface InputProps extends TextInputProps {
  name: string;
}

export function InputSearch({ name, ...rest }: InputProps) {
  return (
    <InputField>
      <Icon name="search" size={20} />
      <Input {...rest} keyboardAppearance="dark" />
    </InputField>
  );
}
