import React, { useCallback, useState } from "react";
import { TextInputProps, KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { maskCep, maskCurrency, maskPhone } from "@utils/masks";
import theme from "@global/styles/theme";
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

  function handleChangeText(text: string) {
    if (mask === 'phone') {
      const value = maskPhone(text);
      inputMaskChange(value);
    }
    if (mask === 'currency') {
      const value = maskCurrency(text);
      inputMaskChange(value);
    }

  }

  return (
    <InputField style={style}>
      <InputContainer>
        <Icon name={iconName} style={{ color: iconColor ? iconColor : theme.colors.title }} />
        <Container>
          <Input
            keyboardType={inputType}
            keyboardAppearance="dark"
            onChangeText={text => handleChangeText(text)}
            {...rest}
          />
        </Container>
      </InputContainer>
      {errorMessage && <Error>{errorMessage}</Error>}
    </InputField >
  );
}



