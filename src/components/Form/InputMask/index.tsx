import React, { useCallback, useState } from "react";
import { TextInputProps, KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { maskCep, maskPhone } from "@utils/masks";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../../../global/styles/theme";
import { InputField, InputContainer, Icon, Container, Input, Error } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  inputType: KeyboardTypeOptions;
  iconNameL: string;
  iconColor?: string;
  style?: StyleProp<TextStyle>;
  mask?: "cep" | "phone" | "currency";
  inputMaskChange?: any;
  error?: string | null;
}

export function InputWithMask({ name, error, inputType, iconNameL, iconColor, style, mask, inputMaskChange, ...rest }: InputProps) {

  function handleChangeText(text: string) {
    if (mask === 'cep') {
      const value = maskCep(text);
      inputMaskChange(value);
    } if (mask === 'phone') {
      const value = maskPhone(text);
      inputMaskChange(value);
    }
  }

  return (
    <InputField style={style}>
      <InputContainer>
        <Icon name={iconNameL} style={{ color: iconColor ? iconColor : theme.colors.title }} />
        <Container>
          <Input
            keyboardType={inputType}
            keyboardAppearance="dark"
            onChangeText={handleChangeText}
            {...rest}
          />
        </Container>
      </InputContainer>
      {error && <Error>{error}</Error>}
    </InputField >
  );
}



