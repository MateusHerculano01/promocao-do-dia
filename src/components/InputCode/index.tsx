import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps, StyleProp, TextStyle } from "react-native";
import { InputField, Input } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  control: Control;
  style?: StyleProp<TextStyle>;
  error: string;
}

export function InputCode({ name, error, control, style, ...rest }: InputProps) {

  return (
    <InputField style={style} isErrored={!!error}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            maxLength={1}
            onChangeText={onChange}
            keyboardAppearance="dark"
            {...rest}
          />
        )}
        name={name}
      />
    </InputField >
  );
}



