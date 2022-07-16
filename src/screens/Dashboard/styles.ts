import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
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
  margin-top: ${RFValue(85)}px;
  margin-bottom: ${RFValue(12)}px;
`;

// export const AdvertisementsList = styled(
//   FlatList as new (
//     props: FlatListProps<DataListProps>
//   ) => FlatList<DataListProps>
// ).attrs({
//   showsVerticalScrollIndicator: false,
//   contentContainerStyle: {
//     paddingBottom: getBottomSpace(),
//   },
// })``;


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

export const AdNotFind = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: ${RFValue(35)}px;
  text-align: center;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: 12px;
`;