import styled, { css } from "styled-components/native";
import { ReactNode } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
  size?: "big" | "small";
}

export const Container = styled.TouchableOpacity<Props>`
  flex: 1;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  height: 200px;
  margin-bottom: 10px;
  background-color: #f0f1f2;
  ${({ size }) => size === "big" && css`
    width: 100%;
  `};
  ${({ size }) => size === "small" && css`
    width: 50%;
  `};
`;

// export const ContainerMini = styled.View`
//   flex: 1;
//   border: 1px solid black;
//   justify-content: center;
//   align-items: center;
//   flex-direction: row;
//   border-radius: 10px;
//   height: 200px;
//   width: 50%;
//   margin-bottom: 10px;
//   background-color: #f0f1f2;
// `;

// export const BannerGroup = styled.View`
//   justify-content: center;
//   align-items: center;
//   flex: 1;
//   flex-direction: row;
// `;

// export const BannerMini = styled(RectButton) <Props>`
//   border-radius: 10px;
//   margin-bottom: 10px;
//   height: 200px;
//   justify-content: center;
//   align-items: center;
//   flex: 1;
// `;

// export const BannerBig = styled(RectButton) <Props>`
//   border-radius: 10px;
//   margin-bottom: 10px;
//   height: 200px;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   margin: 0px 10px;
// `;

// export const Title = styled.Text`
//   font-weight: bold;
//   font-size: ${RFValue(14)}px;
//   font-family: ${({ theme }) => theme.fonts.regular};
//   color: ${({ theme }) => theme.colors.text_dark};
//   opacity: 0.7;
// `;

export const ImageAds = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
