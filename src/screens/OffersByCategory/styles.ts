import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { CategoryListProps } from ".";

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  margin-top: ${RFValue(30)}px;
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
  margin-top: ${RFValue(75)}px;
`;

export const CategoryView = styled.View`
  flex: 1;
  align-items: center;
  margin-top: ${RFValue(10)}px;
`;

export const CategoryList = styled(
  FlatList as new (
    props: FlatListProps<CategoryListProps>
  ) => FlatList<CategoryListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;

