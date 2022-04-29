import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { DataListProps } from ".";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(10)}px;
`;

export const SearchContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(75)}px;
`;

export const Advertisements = styled.View`
  flex: 1;
  flex-direction: column;
  margin-top: ${RFPercentage(1)}px;
  padding:0 5px;
`;

export const AdvertisementsList = styled(
  FlatList as new (
    props: FlatListProps<DataListProps>
  ) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;


export const ContainerBackground = styled.ImageBackground`
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  flex-direction: column;
`;
