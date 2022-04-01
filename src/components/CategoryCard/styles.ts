import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  height: ${RFValue(160)}px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin: 7px;
  padding-bottom: 10px;
  align-items: center;
  justify-content: space-between; 
  flex-basis: 47%;
`;

export const ImageCategory = styled.Image`
 
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
`;
