import styled from "styled-components/native";
import { ReactNode } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import LoginPassword from "@assets/login_password_banner.svg";

type Props = {
  children: ReactNode;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 16px;
  padding-bottom: 10px;
`;

export const Header = styled.View`
  flex: 1;
  border:0.1px solid transparent;
  width: 100%;
  padding: 7px 0;
  padding-left: 8px;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: ${RFValue(40)}px;
`;

export const ReturnButton = styled(BorderlessButton) <Props>``;

export const Icone = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(30)}px;
`;


export const Svg = styled(LoginPassword)`
  width: 240px;
  height: 240px;
  margin-top: ${RFValue(10)}px;
`;

export const TextsWelcome = styled.View`
  margin-top: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.blue_default};
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  opacity: 0.72;
`;

export const UserEvents = styled.View`
  flex: 1;
  justify-content: space-around;
  width: 100%;
  height: ${RFPercentage(37)}px;
`;

export const ForgotView = styled(RectButton) <Props>`
  width: 200px;
`;

export const ForgotText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.blue_default};
`;
