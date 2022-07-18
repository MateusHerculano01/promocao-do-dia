import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;  
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${RFPercentage(15)}px;
  margin-bottom: ${RFValue(-20)}px;
  margin-top:${getBottomSpace() + 10}px;
`;

export const ReturnButton = styled(TouchableOpacity)``;

export const Icone = styled(AntDesign)`
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

export const ContainerImage = styled.View`
  width: 100%;
  height: ${RFPercentage(35)}px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: 100%;
  height: ${RFPercentage(35)}px;
`;

export const ProductName = styled.Text`
  margin-top: ${RFValue(51)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const QuantityAndPrice = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 31px;
  margin-bottom: 24px;
`;

export const UnitMeasurement = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(29)}px;
  color: ${({ theme }) => theme.colors.text}; 
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(29)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ContainerCategory = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid black;
`;

export const IconeCategory = styled(Ionicons)`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 10px;
`;

export const ContainerDescription = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  border: 1px solid black;
`;

export const IconeDescription = styled(Ionicons)`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Wrap = styled.View`
  flex: 1;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 10px;
  text-align: justify;
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-top: ${RFValue(50)}px;
  margin-bottom: ${RFValue(10)}px;
`;

