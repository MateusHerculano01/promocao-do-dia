import styled from "styled-components/native";
import { ReactNode } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
}

export const Container = styled(RectButton) <Props>`
  flex-basis: 47%;
  justify-content: space-between; 
  align-items: center;
  height: auto;
  /* height: ${RFValue(180)}px; */
  padding:10px;
  padding-bottom: 20px;
  margin: 7px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.secondary};
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
