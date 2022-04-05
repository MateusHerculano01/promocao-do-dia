import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { FlatList, FlatListProps, TouchableOpacity } from "react-native";
import { ProductCategoryListProps } from ".";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${RFPercentage(15)}px;

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


export const ProductView = styled.View`
  flex: 1;
  align-items: center;
  margin-top: ${RFValue(10)}px;
`;

export const ProductCategoryList = styled(
  FlatList as new (
    props: FlatListProps<ProductCategoryListProps>
  ) => FlatList<ProductCategoryListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;
