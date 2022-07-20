import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { useTheme } from "styled-components";
import { ButtonSelectContainer, Container, IconLeft, Title, IconRight, Error } from "./styles";

interface SelectButtonProps extends RectButtonProps {
  title: string;
  hasValue?: boolean;
  icon: string;
  errorMessage?: string | null;
  navigate?: boolean;
}

export function ButtonSelect({ title, hasValue = false, icon, errorMessage, navigate = false, onPress }: SelectButtonProps) {
  const theme = useTheme();
  return (
    <ButtonSelectContainer>

      <Container onPress={onPress}>
        <IconLeft name={icon} color={hasValue ? theme.colors.blue_default : theme.colors.title} />
        <Title>{title}</Title>
        {navigate ?
          <IconRight name="chevron-forward" color={hasValue ? theme.colors.blue_default : theme.colors.title} />
          :
          <IconRight name="chevron-down" color={hasValue ? theme.colors.blue_default : theme.colors.title} />
        }

      </Container>

      {errorMessage &&
        <Error>{errorMessage}</Error>
      }

    </ButtonSelectContainer>
  )
}