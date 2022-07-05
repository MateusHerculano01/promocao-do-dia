import styled from "styled-components/native";
import { ReactNode } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import NotFindSvg from "@assets/not_find.svg";

interface Props extends RectButtonProps {
  children: ReactNode;
}

export const Container = styled.View`
  flex: 1;
  /* height: ${Dimensions.get('window').height}; */
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  margin-top: ${RFValue(40)}px;
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

export const WithoutAdContainer = styled.View`
  margin-top: ${RFValue(50)}px;
  width: 100%;
  flex: 0.8;
  align-items: center;
  justify-content: space-between;
`;

export const NotFind = styled(NotFindSvg)` 
  width: 340px;
  height: 240px;
  margin-top: ${RFValue(10)}px;
`;

export const WithoutAdTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;


export const AdSection = styled.View`
  margin-top: ${RFValue(17)}px;
  justify-content: space-between;
  flex-direction: column;
`;

export const EditButton = styled(RectButton) <Props>`
  width: 50%;
  flex-direction: row;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.blue_default};
  font-size: ${RFValue(24)}px;
`;

export const Text = styled.Text`
  margin-left: ${RFValue(5)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
`;

export const AdImage = styled.Image`
  width: 100%;
  height: ${RFValue(180)}px;
  margin-top: ${RFValue(5)}px;
  border-radius: 10px;
`;

export const AdvertiserActions = styled.View`
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content:center;
`;
