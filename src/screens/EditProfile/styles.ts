import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  height: ${RFPercentage(95)}px;
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
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const UserPhotoInput = styled.View`
  width: 200px;
  margin-top: ${RFValue(40)}px;
  align-items: center;
  align-self: center;
`;

export const Image = styled.Image`
  position: relative;
  width: 170px;
  height: 170px;
  border-radius: 85px;
`;

export const View = styled(RectButton)`
  position: absolute;
  right: 20px;
  bottom: 0;
  width: 40px;
  height: 40px;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  border-radius: 20px; 
  background-color: ${({ theme }) => theme.colors.price};
`;

export const Icon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(30)}px;
`;

export const Fields = styled.View``;