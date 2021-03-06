import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const ContainerImage = styled.View`
  width: 100%;
  height: ${RFValue(308)}px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: 90%;
  height: ${RFValue(308)}px;
  aspect-ratio: 0.961538462;
`;

export const TitleProduct = styled.Text`
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
  margin-top: 30px;
`;

export const IconeDescription = styled(Ionicons)`
  font-size: 40px;
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
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-top: ${RFValue(50)}px;
  margin-bottom: ${RFValue(10)}px;
`;

export const Separator = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.title};
  opacity: 0.1;
`;