import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  flex-direction: row;
  padding: 15px;
`;

export const ImageView = styled.View`
  
`;

export const ProductImg = styled.Image`
  max-width: 115px;
  max-height: ${RFPercentage(121)}px;
`;

export const UserImg = styled.Image`
  width: 100%;  
`;

export const Description = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  width: 70%;
`;

export const TitleProduct = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const DataAdverstiser = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Pricing = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.pricing};
`;

export const AdverstiserImage = styled.View`
  width: 120px;
  height: ${RFPercentage(5)}px;
`;
