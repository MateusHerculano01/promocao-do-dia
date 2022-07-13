import styled, { css } from 'styled-components/native';
import { ReactNode } from "react";
import { Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type Props = {
  children: ReactNode;
  visualized?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 0 12px;
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

export const ReturnButton = styled(TouchableOpacity)``;

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

export const NotificationCard = styled.TouchableOpacity<Props>`
  width: 100%;
  height: ${RFPercentage(20)}px;
  border-radius: 12px;
  padding: 3px 3px;
  margin: 10px 0;
  ${({ visualized, theme }) => visualized && css`
    background-color: ${theme.colors.primary_000};
  `};

`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
`;

export const ImageView = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 50px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

export const NotificationData = styled.View`
  width: 78%;
  margin-left: 10px;
`;

export const RowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleNotification = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme }) => theme.colors.title};
`;

export const DateNotification = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;

export const MessageNotification = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  text-align: justify;
`;
