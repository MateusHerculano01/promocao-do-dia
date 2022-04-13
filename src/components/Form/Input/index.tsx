//https://goshacmd.com/floating-label-input-rn-animated/
import React, { useState } from "react";
import { TextInputProps, KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../../../global/styles/theme";
import { InputField, Icon, Container } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  inputType: KeyboardTypeOptions;
  iconNameL: string;
  isPassword?: boolean;
  iconColor?: string;
  iconRight?: boolean;
  placeholder: string;
  style?: StyleProp<TextStyle>;
}

export function Input({ name, inputType, iconNameL, isPassword, iconColor, iconRight, placeholder, style, ...rest }: InputProps) {
  const [isVisible, setIsVisible] = useState({
    iconName: "eye-outline",
    textVisible: true
  });

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
        <Input
          keyboardType={inputType}
          secureTextEntry={isPassword && isVisible.textVisible}
          keyboardAppearance="dark"
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
