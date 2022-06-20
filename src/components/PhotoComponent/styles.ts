import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Image = styled.Image`
  width: ${RFValue(330)}px;
  height: ${RFValue(200)}px;
  border-radius: ${RFValue(20)}px;
`;

export const Placeholder = styled.View`
  width: ${RFValue(330)}px;
  height: ${RFValue(200)}px;
  border-radius: ${RFValue(20)}px;
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