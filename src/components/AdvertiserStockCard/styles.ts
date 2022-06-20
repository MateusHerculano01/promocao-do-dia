import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
}

export const Container = styled(RectButton) <Props>`
  width: ${RFPercentage(24)}px;
  height: ${RFPercentage(20)}px;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Icon = styled(MaterialIcons)`
  font-size: ${RFValue(50)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;