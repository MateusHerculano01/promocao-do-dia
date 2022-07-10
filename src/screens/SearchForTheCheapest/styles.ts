import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SearchContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(85)}px;
  margin-bottom: ${RFValue(25)}px;
  padding: 0 16px;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(10)}px;
  padding: 0 16px;
`;

export const NotFindView = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 16px;
`;

export const TextEmoji = styled.Text`
  font-size: ${RFValue(50)}px;
`;

export const TextTitle = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(26)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin: 10px 0; 
`;

export const TextSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: center;
  line-height: 50px;
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.secondary
}))``;
