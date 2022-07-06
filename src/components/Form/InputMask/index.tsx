import React, { useRef, useState } from "react";
import { TextInputProps, KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { maskCep, maskCurrency, maskPhone } from "@utils/masks";
import { useTheme } from "styled-components";
import { InputField, InputContainer, Icon, Container, Input, Error } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  inputType?: KeyboardTypeOptions;
  iconName: string;
  iconColor?: string;
  style?: StyleProp<TextStyle>;
  mask: "cep" | "phone" | "currency";
  inputMaskChange: any;
  errorMessage?: string | null;
}

export function InputWithMask({ name, errorMessage, inputType, iconName, iconColor, style, mask, inputMaskChange, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleChangeText(text: string) {
    if (mask === 'phone') {
      const value = maskPhone(text);
      inputMaskChange(value);
      setIsFilled(!!value);
    }
    if (mask === 'currency') {
      const value = maskCurrency(text);
      inputMaskChange(value);
      setIsFilled(!!value);
    }

  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <InputField style={style}>
      <InputContainer>
        <Icon name={iconName} color={(isFocused || isFilled) ? theme.colors.blue_default : theme.colors.title} />
        <Container>
          <Input
            isFocused={isFocused}
            keyboardType={inputType}
            keyboardAppearance="dark"
            onChangeText={text => handleChangeText(text)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...rest}
          />
        </Container>
      </InputContainer>
      {errorMessage && <Error>{errorMessage}</Error>}
    </InputField >
  );
}



