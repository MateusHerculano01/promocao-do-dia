import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  height: ${RFValue(160)}px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin: 7px;
  padding:10px;
  padding-bottom: 20px;
  align-items: center;
  justify-content: space-between; 
  flex-basis: 47%;
`;

export const ImageCategory = styled.Image`
 
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size:${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  opacity:0.7;
`;
