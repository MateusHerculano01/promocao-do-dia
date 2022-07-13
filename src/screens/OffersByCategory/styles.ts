import styled from "styled-components/native";
import { ReactNode } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  margin-top: ${RFValue(40)}px;
  padding: 0 16px;
`;

export const ReturnButton = styled(TouchableOpacity)``;

export const Icone = styled(AntDesign)`
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

export const SearchContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(30)}px;
  padding: 0 16px;
`;

export const CategoryCard = styled(RectButton) <Props>`
  flex-basis: 47%;
  justify-content: space-between; 
  align-items: center;
  height: auto;
  padding:10px;
  padding-bottom: 20px;
  margin: 7px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const ImageCategory = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

export const CategoryName = styled.Text`
  font-weight: bold;
  font-size:${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  opacity:0.7;
  margin-top: 10px;
`;


