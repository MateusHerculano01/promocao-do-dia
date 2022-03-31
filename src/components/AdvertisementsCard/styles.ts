import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.input_background};
  flex: 1;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 50px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;
