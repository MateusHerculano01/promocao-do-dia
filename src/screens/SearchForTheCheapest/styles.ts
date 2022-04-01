import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.secondary}
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(10)}px;
`;

export const SearchContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(20)}px;
  margin-bottom: 10px;
`;

export const ProductsView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: ${RFValue(10)}px;
  background-color: ${({ theme }) => theme.colors.pricing}
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.title};
  opacity: 0.3;
`;



