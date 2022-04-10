import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

interface PlaceholderLabelProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const InputField = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin-left:5px;
  margin-right:5px;
  padding-left: 20px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

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

export const PlaceholderLabel = styled.Text<PlaceholderLabelProps>`
  position: absolute;
  left: 0;
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.7;

  ${(props) =>
    props.isFocused || props.isFilled
      ? css`
    transform: translateY(-1px);
    font-size: 13px;
   ` : css`
    transform: translateY(+20px);
    font-size: 16px;
 `}

`;

export const Input = styled(TextInput)`
flex: 1;
margin-bottom: 0;
font-size:${RFValue(14)}px;
font-family: ${({ theme }) => theme.fonts.regular};
color: ${({ theme }) => theme.colors.text_dark};
margin-top: 10px;
`;
