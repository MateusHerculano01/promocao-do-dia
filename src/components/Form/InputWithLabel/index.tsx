import React, { useCallback, useRef, useState } from "react";
import { TextInput, TextInputProps, KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../../../global/styles/theme";
import { maskCep, maskCurrency, maskDefault, maskPhone } from "../../../utils/masks";
import { InputField, Icon, Container, PlaceholderLabel, Input } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  inputType: KeyboardTypeOptions;
  iconNameL: string;
  isPassword?: boolean;
  iconColor?: string;
  iconRight?: boolean;
  placeholder: string;
  style?: StyleProp<TextStyle>;
  mask?: "default" | "cep" | "phone" | "currency";
  inputMaskChange?: any;
}

interface InputReference extends TextInput {
  value: string | number
}

export function InputWithLabel({ name, inputType, iconNameL, isPassword, iconColor, iconRight, placeholder, style, mask, inputMaskChange, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isVisible, setIsVisible] = useState({
    iconName: "eye-outline",
    textVisible: true
  });

  const inputRef = useRef<InputReference>(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    if (inputRef.current) setIsFilled(!!inputRef.current.value);
  }, []);

  const handleChangeText = useCallback((text) => {
    if (mask === 'default') {
      if (inputRef.current) inputRef.current.value = maskDefault(text);
      inputMaskChange(inputRef.current!.value);
    }
    if (mask === 'cep') {
      if (inputRef.current) inputRef.current.value = maskCep(text);
      inputMaskChange(inputRef.current!.value);
    }
    if (mask === 'phone') {
      if (inputRef.current) inputRef.current.value = maskPhone(text);
      inputMaskChange(inputRef.current!.value);
    }
    if (mask === 'currency') {
      if (inputRef.current) inputRef.current.value = maskCurrency(text);
      inputMaskChange(inputRef.current!.value);
    }
  }, []);

  function handleToggleVisibleText() {
    let iconName = isVisible.textVisible ? "eye-off-outline" : "eye-outline";

    setIsVisible({
      iconName,
      textVisible: !isVisible.textVisible
    })

  };

  return (
    <InputField style={style}>
      <Icon name={iconNameL} style={{ color: iconColor ? iconColor : theme.colors.title }} />
      <Container>
        <PlaceholderLabel
          isFocused={isFocused}
          isFilled={isFilled}
          onPress={() => setIsFocused(!isFocused)}>
          {placeholder}
        </PlaceholderLabel>

        <Input
          ref={inputRef}
          keyboardType={inputType}
          secureTextEntry={isPassword && isVisible.textVisible}
          keyboardAppearance="dark"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={handleChangeText}
          {...rest} />
      </Container>
      {iconRight &&
        <TouchableOpacity onPress={handleToggleVisibleText}>
          <Icon name={isVisible.iconName} style={{ color: iconColor ? iconColor : theme.colors.title, paddingHorizontal: 18 }} />
        </TouchableOpacity>
      }
    </InputField>
  );
}
