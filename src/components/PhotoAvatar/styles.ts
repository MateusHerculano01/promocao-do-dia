import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Image = styled.Image`
 width: 170px;
  height: 170px;
  border-radius: 85px;
`;

export const Placeholder = styled.View`
  width: 170px;
  height: 170px;
  border-radius: 85px;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${({ theme }) => theme.colors.text};
`;

export const PlaceholderTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;