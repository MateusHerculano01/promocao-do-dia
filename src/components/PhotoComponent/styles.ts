import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Image = styled.Image`
  width: ${RFValue(330)}px;
  height: ${RFValue(170)}px;
  border-radius: ${RFValue(20)}px;
  margin-bottom: 20px;
`;

export const Placeholder = styled.View`
  width: ${RFValue(330)}px;
  height: ${RFValue(170)}px;
  border-radius: ${RFValue(20)}px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: 1px dashed ${({ theme }) => theme.colors.text};
`;

export const PlaceholderTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;