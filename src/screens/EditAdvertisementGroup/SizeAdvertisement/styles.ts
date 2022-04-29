import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
  align-items: center;
  flex: 1;
  padding-top: 20px;
`;

export const Sizes = styled(TouchableOpacity)`
  width: 100%;
  padding: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;
`;

export const SizesTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.title};
  opacity: 0.1;
`;