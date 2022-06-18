import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.SafeAreaView`
  height: 100%;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: 20px;
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

export const Form = styled.View`
  border: 1px solid red;
  flex: 1;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;


export const SuggestionView = styled.View`
  border: 1px solid blue;
  justify-content: space-between;
  width: 100%;
  flex: 0.4;
`;

export const TitleSuggestion = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(16)}px;
`;

export const ImagesView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  flex-direction: row;
  margin-top: 10px;
`;
