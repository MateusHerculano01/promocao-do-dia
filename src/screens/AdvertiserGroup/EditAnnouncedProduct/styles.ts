import styled from "styled-components/native";
import { ReactNode } from "react";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
}

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  height: ${Dimensions.get('window').height};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  margin-top: ${RFValue(40)}px;
`;

export const LeftView = styled.View`
  flex-direction: row;
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
  flex: 0.8;
  justify-content: space-between;
  align-items: center;
`;

export const Photo = styled.Image`
  width: 100%;
  height: ${RFValue(180)}px;
  margin-top: ${RFValue(5)}px;
  border-radius: 10px;
`;

