import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { Octicons, Feather } from "@expo/vector-icons";

export const Container = styled(RectButton)`
  margin-top: 9px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const View = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  padding: 15px 20px;
`;

export const LocationInfo = styled.View`
  margin-right: ${RFValue(80)}px;
`;

export const TextLocation = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(11)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Location = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const IconLocation = styled(Octicons)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const IconRowRigh = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
`;
