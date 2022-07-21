import styled from "styled-components/native";
import { ReactNode } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
}

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

export const ReturnButton = styled(TouchableOpacity) <Props>``;

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
`;

export const UserPhotoInput = styled.View`
  width: 200px;
  margin-top: ${RFValue(10)}px;
  align-items: center;
  align-self: center;
`;

export const Fields = styled.View`
  margin-top: 20px;
`;

export const TouchView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
`;

export const EditPasswordView = styled(RectButton) <Props>``;

export const EditPasswordText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;


export const Image = styled.Image`
  position: relative;
  width: 170px;
  height: 170px;
  border-radius: 85px;
`;

export const View = styled(RectButton) <Props>`
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