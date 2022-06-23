import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { InputField, Icon, Input, ButtonClear } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  onClear: () => void;
}

export function InputSearch({ name, defaultValue, onClear, ...rest }: InputProps) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!defaultValue);
  }

  return (
    <InputField>
      <Icon
        name="search"
        color={(isFocused || isFilled) ? theme.colors.primary : theme.colors.text}
      />
      <Input
        keyboardAppearance="dark"
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />

      {!!defaultValue ?
        <ButtonClear onPress={onClear}>
          <Feather name="x" size={20} color={theme.colors.title} />
        </ButtonClear>
        :
        <></>
      }

    </InputField>
  );
}
