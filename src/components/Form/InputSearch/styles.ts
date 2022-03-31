import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";

export const Container = styled.View`
  width: 100%;
  height: 52px;
  padding: 10px;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.input_background};
  border-radius: 10px;
`;

export const Icon = styled(MaterialIcons)`
  font-size: ${RFValue(17)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const InputText = styled(TextInput)`
  width: 90%;
  font-size: ${RFValue(14)}px;
  margin-left: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
`;
