import styled from "styled-components/native";
import { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children?: ReactNode;
}

export const Container = styled(RectButton) <Props>`
  flex-direction: row;
  padding: 20px 0;
`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-left: 20px;
`;
