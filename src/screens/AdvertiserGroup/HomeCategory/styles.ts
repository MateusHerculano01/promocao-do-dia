import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SearchContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(20)}px;
  margin-bottom: 10px;
  padding: 0 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  margin-top: ${RFValue(40)}px;
  padding: 0 16px;
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

export const MessageCategory = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  margin: 10px 0; 
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

export const ButtonView = styled.View`
  width: 100%;
  padding: 0 16px;
`;


