import styled from "styled-components/native";
import { ReactNode } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
}

export const Container = styled.SafeAreaView`
  height: 100%;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  margin-top: ${RFValue(40)}px;
`;

export const LeftView = styled.View`
  flex-direction: row;
`;

export const ReturnButton = styled(TouchableOpacity)``;

export const Icone = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  margin-left: 15px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: bold;
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const UploadImage = styled.View`
  border: 1.5px dashed ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  width: 343px;
  height: 181px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const ButtonView = styled(RectButton) <Props>`
  flex: 1;
  border: 1px solid blue;
  align-items: center;
  justify-content: space-around;
`;

export const IconCamera = styled(MaterialCommunityIcons)`
  font-size: ${RFValue(50)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  opacity: 0.7;
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

export const Content = styled.View`
  flex: 1;
`;

export const ButtonsView = styled.View`
  width: 100%;
`;

export const NotFindCategoryView = styled.View`
  height: 30%;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const CategoryButtonView = styled.View`
  padding: 0 16px;
  width: 100%;
  margin-bottom: 30px;
`;


