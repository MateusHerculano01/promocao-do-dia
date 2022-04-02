import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  height: ${RFPercentage(30)}px;
  margin: 7px;
  justify-content: space-between; 
  flex-basis: 47%;
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
`;

export const TitleProduct = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.7;
`;

export const Price = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.pricing};
  opacity: 0.7;  
`;
