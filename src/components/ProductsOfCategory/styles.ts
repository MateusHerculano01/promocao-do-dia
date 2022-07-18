import styled from "styled-components/native";
import { ReactNode } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
}

export const Container = styled.TouchableOpacity <Props>`
  height: ${RFPercentage(30)}px;
  margin: 7px;
  justify-content: space-around;
  align-items: center;
  flex-basis: 47%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 9px;
`;

export const ContainerImage = styled.View`
  width: 100%;
  padding-bottom: 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  border-radius: 9px;
`;

export const ProductImage = styled.Image`
  border-radius: 8px;
  width: 110px;
  height: 110px;
`;

export const TitleProduct = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.7;
`;

export const Price = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.price};
  opacity: 0.7;  
`;
