import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
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

export const Form = styled.View`
  flex: 1;
  justify-content: space-around;
  height: ${RFPercentage(70)}px;
`;

export const Fields = styled.View`
  flex: 0.7;
  margin-top: 30px;
  justify-content: space-around;
`;