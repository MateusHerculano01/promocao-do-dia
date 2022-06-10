import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  isFocused: boolean;
}

export const InputField = styled.View``;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin-left:5px;
  margin-right:5px;
  padding-left: 20px;
  background-color: ${({ theme }) => theme.colors.background_secondary};`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(24)}px;
`;

export const Container = styled.View`
flex: 0.98;
height: ${RFValue(60)}px;
margin-left: 10px;
flex-direction: column;
justify-content: space-between;
`;

export const Input = styled(TextInput) <Props>`
flex: 1;
margin-bottom: 0;
font-size:${RFValue(14)}px;
font-family: ${({ theme }) => theme.fonts.regular};
color: ${({ theme }) => theme.colors.text_dark};
opacity: 0.7;
margin-top: 10px;

${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.blue_default};
  `};

`;

export const Error = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.attention};
  margin-left: 7px;
`;
