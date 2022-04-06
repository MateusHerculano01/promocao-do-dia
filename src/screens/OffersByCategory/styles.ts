import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { CategoryListProps } from ".";

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(10)}px;
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

