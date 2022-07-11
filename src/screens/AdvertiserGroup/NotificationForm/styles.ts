import styled from "styled-components/native";
import { ReactNode } from "react";
import { RectButton } from "react-native-gesture-handler";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

type Props = {
  children: ReactNode;
}

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: ${RFValue(370)}px;
  height: ${RFPercentage(55)}px;
  padding: 0 16px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  opacity: 0.8;
  margin-top: 30px;
`;

export const TitleGroup = styled.View`
  width: 100%;
`;

export const InputTitleGroupHeader = styled.View`
  width: 100%;
  padding: 0 5px;
  align-items: flex-end;
`;

export const DescriptionGroup = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

export const InputGroupHeader = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
`;

export const LabelDescription = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const MaxCharacters = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const InputDescription = styled.TextInput`
  height: ${RFValue(90)}px;
  font-size:${RFValue(14)}px;
  padding: 0 10px;
  border: 0.5px solid ${({ theme }) => theme.colors.title};
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.7;
`;

export const ButtonView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ConfirmButton = styled.TouchableOpacity <Props>`
  border-radius: 5px;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ConfirmText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme }) => theme.colors.secondary};
`;
