import React from "react";
import { TextInputProps, StyleProp, TextStyle } from "react-native";

import { InputField, Input } from "./styles";

export interface InputProps extends TextInputProps {
  value: string;
  style?: StyleProp<TextStyle>;
  error: boolean;
}

export function InputCode({ value, error = false, style, ...rest }: InputProps) {

  return (
    <InputField style={style} isErrored={error}>
      <Input
        value={value}
        keyboardType="numeric"
        keyboardAppearance="dark"
        {...rest}
      />
    </InputField >
  );
}



