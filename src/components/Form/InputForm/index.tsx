import React, { useCallback, useState } from "react";
import { TextInputProps, KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { Control, Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../../../global/styles/theme";
import { InputField, InputContainer, Icon, Container, Input, Error } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  control: Control;
  inputType: KeyboardTypeOptions;
  iconName: string;
  isPassword?: boolean;
  iconColor?: string;
  iconRight?: boolean;
  style?: StyleProp<TextStyle>;
  error: string;
}

export function InputForm({ name, error, control, inputType, iconName, isPassword, iconColor, iconRight, style, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    iconName: "eye-outline",
    textVisible: true
  });

  const handleToggleVisibleText = useCallback(() => {
    let iconName = isPasswordVisible.textVisible ? "eye-off-outline" : "eye-outline";

    setIsPasswordVisible({
      iconName,
      textVisible: !isPasswordVisible.textVisible
    })
  }, [isPasswordVisible.iconName]);

  return (
    <InputField style={style}>
      <InputContainer>
        <Icon name={iconName} style={{ color: iconColor ? iconColor : theme.colors.title }} />
        <Container>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                keyboardType={inputType}
                secureTextEntry={isPassword && isPasswordVisible.textVisible}
                keyboardAppearance="dark"
                {...rest}
              />
            )}
            name={name}
          />

        </Container>
        {
          iconRight &&
          <TouchableOpacity onPress={handleToggleVisibleText}>
            <Icon name={isPasswordVisible.iconName} style={{ color: iconColor ? iconColor : theme.colors.title, paddingHorizontal: 18 }} />
          </TouchableOpacity>
        }
      </InputContainer>
      {error && <Error>{error}</Error>}
    </InputField >
  );
}



