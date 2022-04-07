import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  flex-direction: row;
  padding: 25px;
`;

export const ProductImg = styled.Image`
  max-width: ${RFValue(90)}px;
  border-radius:5px;
  margin-right:10px;
  aspect-ratio: 0.97;
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
  flex-direction: column;
  justify-content: space-between;
`;

export const PriceOld = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  opacity: 0.6;
  text-decoration-line: line-through;
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
