import React, { useCallback, useState } from "react";
import { TextInputProps, KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { InputField, InputContainer, Icon, Container, Input, Error } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  inputType?: KeyboardTypeOptions;
  iconName?: string;
  isPassword?: boolean;
  iconRight?: boolean;
  style?: StyleProp<TextStyle>;
  errorMessage?: string | null;
}

export function InputDefault({ name, defaultValue, errorMessage, inputType, iconName, isPassword, iconRight, style, ...rest }: InputProps) {
  const [isVisible, setIsVisible] = useState({
    iconName: "eye-outline",
    textVisible: true
  });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!defaultValue);
  }

  const handleToggleVisibleText = useCallback(() => {
    let iconName = isVisible.textVisible ? "eye-off-outline" : "eye-outline";

    setIsVisible({
      iconName,
      textVisible: !isVisible.textVisible
    })
  }, [isVisible.iconName]);

  return (
    <InputField style={style}>
      <InputContainer>
        <Icon name={iconName} color={(isFocused || isFilled) ? theme.colors.blue_default : theme.colors.title} />
        <Container>
          <Input
            keyboardType={inputType}
            secureTextEntry={isPassword && isVisible.textVisible}
            keyboardAppearance="dark"
            isFocused={isFocused}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...rest}
          />
        </Container>
        {
          iconRight &&
          <TouchableOpacity onPress={handleToggleVisibleText}>
            <Icon name={isVisible.iconName} color={(isFocused || isFilled) ? theme.colors.blue_default : theme.colors.title} />
          </TouchableOpacity>
        }
      </InputContainer>
      {errorMessage &&
        <Error>{errorMessage}</Error>
      }
    </InputField >
  );
}



