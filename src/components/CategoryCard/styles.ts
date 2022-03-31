import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 165px;
  height: ${RFValue(160)}px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin-top: 5px;
  margin-bottom: 10px;
  margin-right: 45px;
  margin-left: 1px;
  align-items: center;
  justify-content: space-between;
`;

export const ImageCategory = styled.Image`
 
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
`;
