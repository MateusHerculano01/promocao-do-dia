import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const BannerGroup = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: row;
`;

export const BannerBlank = styled.View`
  height: ${RFValue(55)}px;
  justify-content: center;
  align-items: center;
`;

export const BannerMini = styled(RectButton)`
  border-radius: 10px;
  flex: 1;
  height: 200px;
  margin-bottom: 10px;
  background-color: #f0f1f2;
  justify-content: center;
  align-items: center;
`;
export const BannerBig = styled(RectButton)`
  border-radius: 10px;
  width: 100%;
  height: 200px;
  margin: 0px 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.7;
`;

export const ImageAds = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
