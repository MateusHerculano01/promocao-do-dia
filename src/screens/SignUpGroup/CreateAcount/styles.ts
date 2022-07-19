import styled from "styled-components/native";
import { ReactNode } from "react";
import { Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import NewAccount from "@assets/new_account_banner.svg";

type Props = {
  children: ReactNode;
}

export const Container = styled.View`
  flex: 1;
  height: ${Dimensions.get('window').height};
  padding: 0 16px;
  padding-bottom: 10px;
`;

export const Header = styled.View`
  width: 100%;
  padding: 7px 0;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: ${RFValue(20)}px;
`;

export const ReturnButton = styled(BorderlessButton) <Props>``;

export const Icone = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(30)}px;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
`;

export const TitleDefault = styled.Text`
  margin-left: 15px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: bold;
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const Svg = styled(NewAccount)`
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
  color: ${({ theme }) => theme.colors.title};
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  opacity: 0.72;
`;

export const UserEvents = styled.View`
  justify-content: space-around;
  width: 100%;
  height: ${RFPercentage(40)}px;
`;

export const Fields = styled.View`
  flex: 0.8;
  justify-content: space-around;
`;