import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import LoginPassword from "@assets/login_password_banner.svg";

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.background};
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

export const HeaderResendView = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.colors.attention};
  border-radius: 5px;
  padding: 3px 16px;
  background-color: transparent;
`;

export const IconResend = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(25)}px;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SentEmailView = styled.View`
  flex: 0.5;
  align-items: center;
  justify-content: space-around;
  margin-top: ${RFValue(40)}px;
`;

export const SentEmailText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const UserEmailText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(23)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.6;
`;

export const SentEmailFailedView = styled.View`
  flex: 0.5;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(40)}px;
`;

export const IconFailed = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(80)}px;
`;

export const Svg = styled(LoginPassword)`
  width: 180px;
  height: 180px;
  margin-top: ${RFValue(10)}px;
`;

export const TextsView = styled.View`
  margin-top: ${RFValue(10)}px;
`;

export const TitleText = styled.Text`
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

export const EmailText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Fields = styled.View`
  flex: 1;
  margin-top: 20px;
  margin-bottom: 10px;
  justify-content: space-around;
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.attention,
}))``;