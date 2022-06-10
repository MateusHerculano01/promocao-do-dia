import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ConfirmYour from "@assets/confirm_your_banner.svg";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  height: ${RFPercentage(103)}px;
  padding: 0 16px;
`;

export const Header = styled.View`
  border:0.1px solid transparent;
  width: 100%;
  padding: 7px 0;
  padding-left: 8px;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: ${RFValue(40)}px;
`;

export const ReturnButton = styled(BorderlessButton)``;

export const Icone = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(30)}px;
`;

export const TitleDefault = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-weight: bold;
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const Svg = styled(ConfirmYour)`
  width: 240px;
  height: 240px;
  margin-top: ${RFValue(60)}px;
`;

export const TextsWelcome = styled.View`
  margin-top: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  opacity: 0.72;
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const UserEvents = styled.View`
  flex: 1;
  justify-content: space-around;
  width: 100%;
  height: ${RFPercentage(37)}px;
`;

export const InputCodeView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const TouchView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ResendView = styled(RectButton)``;

export const ResendText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.price};
`;

export const CountText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.price};
`;
