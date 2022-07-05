import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dimensions } from "react-native";
import LoginLogo from "@assets/login_logo.svg";

export const Container = styled.View`
  flex: 1;
  height: ${Dimensions.get('window').height};
  align-items: center;
  width: 100%;
  padding: 0 16px;
  padding-bottom: 10px;
`;

export const Svg = styled(LoginLogo)`
  width: 70px;
  height: 70px;
  margin-top: ${RFValue(100)}px;
`;

export const TextsWelcome = styled.View`
  margin-top: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.blue_default};
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  opacity: 0.72;
`;

export const UserEvents = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
  height: ${RFPercentage(39)}px;
`;

export const ButtonsContainer = styled.View`
  justify-content: space-around;
  height: ${RFPercentage(20)}px;
`;