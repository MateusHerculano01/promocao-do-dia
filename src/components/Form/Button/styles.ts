import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { RectButton } from 'react-native-gesture-handler';
import { ReactNode } from "react";
import { RFValue } from "react-native-responsive-fontsize";

type Props = {
  children: ReactNode;
  backgroundColor: "primary" | "secondary" | "delete"
}

export const Container = styled(RectButton) <Props>`
  width: 100%;
  flex-direction: column;
  padding: 18px 0px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, backgroundColor }) => backgroundColor === "primary" ? theme.colors.primary : backgroundColor === "secondary" ? theme.colors.blue_default : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.background};
`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(24)}px;
  position: absolute;
  padding-right: 20px;
  align-self: flex-end;
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.secondary
}))``;