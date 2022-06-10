import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { InputField, Icon, Input } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
}

export function InputSearch({ name, value, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <InputField>
      <Icon
        name="search"
        color={(isFocused || isFilled) ? theme.colors.primary : theme.colors.text}
      />
      <Input
        {...rest}
        keyboardAppearance="dark"
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </InputField>
  );
}
