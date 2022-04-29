import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Image = styled.Image`
  width: 260px;
  height: 156px;
  border-radius: 50px;
`;

export const Placeholder = styled.View`
  width: 260px;
  height: 156px;
  border-radius: 50px;
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