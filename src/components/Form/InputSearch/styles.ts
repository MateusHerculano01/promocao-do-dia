import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  isFocused: boolean;
}

export const InputField = styled.View`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding-left: 20px;
  width: 100%;
`;

export const Icon = styled(MaterialIcons)`
  font-size: ${RFValue(20)}px;
`;

export const Input = styled(TextInput) <Props>`
  margin-left: 5px;
  width: 90%;
  padding: 15px;
  padding-right: 5px;
  font-size:${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.primary};
  `};
`;
