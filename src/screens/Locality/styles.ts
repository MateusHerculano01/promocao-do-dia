import styled from "styled-components/native";
import { ReactNode } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
}

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  margin-top: ${RFValue(40)}px;
`;

export const LeftView = styled.View`
  flex-direction: row;
`;

export const ReturnButton = styled.TouchableOpacity``;

export const Icone = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  margin-left: 15px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: bold;
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const IconView = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: center;
  margin-top: ${RFValue(30)}px; 
  background-color: ${({ theme }) => theme.colors.primary_000};
  border-radius: 10px;
`;

export const MainLocationIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(100)}px;
`;

export const ButtonsView = styled.View`
  flex: 1;
  margin-top: ${RFValue(20)}px; 
`;


export const Content = styled.View`
  flex: 1;
`;

export const SearchContainer = styled.View`
  margin-top: 10px;
  padding: 0 10px;
`;

export const LocalityButtonView = styled(RectButton) <Props>`
  flex-direction: row;
  padding: 10px;
`;

export const LocalityIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(30)}px;
`;

export const LocalityInfo = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  margin-left: 15px;
`;