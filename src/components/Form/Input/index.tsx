import React, { useCallback, useState } from "react";
import { TextInputProps, KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../../../global/styles/theme";
import { InputField, InputContainer, Icon, Container, Input, Error } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  inputType: KeyboardTypeOptions;
  iconNameL: string;
  isPassword?: boolean;
  iconColor?: string;
  iconRight?: boolean;
  style?: StyleProp<TextStyle>;
}

export function InputDefault({ name, inputType, iconNameL, isPassword, iconColor, iconRight, style, ...rest }: InputProps) {
  const [isVisible, setIsVisible] = useState({
    iconName: "eye-outline",
    textVisible: true
  });

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
        <Icon name={iconNameL} style={{ color: iconColor ? iconColor : theme.colors.title }} />
        <Container>
          <Input
            keyboardType={inputType}
            secureTextEntry={isPassword && isVisible.textVisible}
            keyboardAppearance="dark"
            {...rest}
          />
        </Container>
        {
          iconRight &&
          <TouchableOpacity onPress={handleToggleVisibleText}>
            <Icon name={isVisible.iconName} style={{ color: iconColor ? iconColor : theme.colors.title, paddingHorizontal: 18 }} />
          </TouchableOpacity>
        }
      </InputContainer>
    </InputField >
  );
}



