import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  width: 100%;
`;

export const Content = styled(RectButton)`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  margin-right: 20px;
  border-radius: 10px;
`;

export const Name = styled.Text`
  flex: 1;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather)`
  font-size: 23px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  margin: 12px 0;
  margin-left: 124px;
  background-color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.5;
`;