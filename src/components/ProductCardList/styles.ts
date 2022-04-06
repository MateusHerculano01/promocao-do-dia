import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  flex-direction: row;
  padding: 25px;
`;

export const ProductImg = styled.Image`
  max-width: 200px;
  max-height: ${RFPercentage(121)}px;
  border-radius:5px;
  padding:5px;
  margin-right:10px;
`;

export const Description = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`;

export const TitleProduct = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.7;
`;

export const DataAdverstiser = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Price = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.price};
`;

export const Separator = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.title};
  opacity: 0.1;
`;
