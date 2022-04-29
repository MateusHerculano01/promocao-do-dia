import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  border: 1.5px dashed ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  width: 343px;
  height: 181px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const ButtonView = styled(RectButton)`
  flex: 1;
  border: 1px solid blue;
  align-items: center;
  justify-content: space-around;
`;

export const IconCamera = styled(MaterialCommunityIcons)`
  font-size: ${RFValue(50)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  opacity: 0.7;
`;