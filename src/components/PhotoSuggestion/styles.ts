import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import { ImageBackground } from "react-native";

export const ButtonView = styled(RectButton)`
  width: 111px;
  height: 111px;
  border-radius: 9px;
`;

export const Image = styled(ImageBackground)`
  width: 110px;
  height: 110px;
  border-radius: 9px;
`;

export const Placeholder = styled.View`
  width: 110px;
  height: 110px;
  border-radius: 9px;
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