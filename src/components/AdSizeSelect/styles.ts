import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 20px;
`;

export const IconLeft = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(20)}px;
`;

export const AdTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  
  font-size: ${RFValue(16)}px;
`;

export const IconRight = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(20)}px;
`;

