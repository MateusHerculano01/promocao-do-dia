import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme }) => theme.colors.title};
  margin-top: ${RFValue(40)}px;
`;

export const UserInfo = styled.View` 
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 60px;
`;

export const NoImage = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  border: 1px dashed ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.secondary} ;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const View = styled.View` 
  margin-left: 15px;
`;

export const Name = styled.Text` 
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Email = styled.Text` 
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;