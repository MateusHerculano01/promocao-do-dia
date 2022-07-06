import styled, { css } from "styled-components/native";
import { ReactNode } from "react";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children?: ReactNode;
  active?: boolean;
}

export const Container = styled(RectButton) <Props>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 10px;
`;

export const InfoProduct = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-left: 20px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
`;

export const InfoProductView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 40px;
`;

export const Price = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme }) => theme.colors.price};
`;

export const InfoSize = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  margin-right: 20px;
`;

export const Icon = styled(Feather)`
  font-size: 26px;
  color: ${({ theme }) => theme.colors.title};
`;

export const SelectView = styled.View<Props>`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.title};
  
  ${({ active, theme }) => active && css`
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
  `};
`;