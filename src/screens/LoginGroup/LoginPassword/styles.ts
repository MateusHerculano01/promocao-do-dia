import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import LoginPassword from "../../../assets/login_password_banner.svg";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 16px;
`;

export const Svg = styled(LoginPassword)`
  width: 240px;
  height: 240px;
  margin-top: ${RFValue(10)}px;
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
  justify-content: space-between;
  width: 100%;
  height: ${RFValue(266)}px;
`;

export const ButtonsContainer = styled.View`
  justify-content: space-between;
  height: ${RFValue(130)}px;
`;