import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import SelectPassword from "../../../assets/select_password_banner.svg";
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
  flex: 1;
  height: ${RFPercentage(103.1)}px;
  align-items: center;
  padding: 0 16px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: ${RFValue(40)}px;
`;

export const ReturnButton = styled(TouchableOpacity)``;

export const Icone = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(30)}px;
`;

export const TitleDefault = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-weight: bold;
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const TextView = styled.View`
  width: 100%;
  margin-top: 38px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  opacity: 0.72;
`;

export const Svg = styled(SelectPassword)`
  width: 300px;
  height: 300px;
  margin-top: ${RFValue(10)}px;
`;

export const UserEvents = styled.View`
  flex: 1;
  justify-content: space-around;
  width: 100%;
  height: ${RFPercentage(40)}px;
`;

export const Fields = styled.View`
  flex: 0.8;
  justify-content: space-around;
`;
