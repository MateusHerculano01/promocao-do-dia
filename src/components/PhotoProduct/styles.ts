import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { ImageBackground, ImageBackgroundProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerBackground = styled(ImageBackground) <ImageBackgroundProps>`
  width: 350px;
  height: 360px;
  border: 0.5px solid ${({ theme }) => theme.colors.title};
`;

export const Container = styled.View`
  width: 350px;
  height: 360px;
  border: 1px solid ${({ theme }) => theme.colors.title};
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  width: 36px;
  align-self: flex-end;
  margin-right: 10px;
`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(35)}px;
  color: ${({ theme }) => theme.colors.attention};
  opacity: 0.7;
  align-self: flex-end;
  border: 0.2px solid;
`;

export const Image = styled.Image`
  flex: 1;
`;

export const Label = styled.Text``;