import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";

export const InputField = styled.View`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  margin-left:5px;
  margin-right:5px;
  padding: 20px 15px;
  padding-left: 20px;
`;

export const Icon = styled(MaterialIcons)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled(TextInput)`
  margin-left: 5px;
  width: 95%;
  font-size:${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
`;
