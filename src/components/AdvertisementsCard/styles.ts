import styled, { css } from "styled-components/native";
import { ReactNode } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
  size?: "big" | "small";
}

export const Container = styled(RectButton) <Props>`
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 200px;
  margin-bottom: 10px;
  background-color: #f0f1f2;
  ${({ size }) => size === "big" && css`
    width: 100%;
  `};
  ${({ size }) => size === "small" && css`
    width: 49%;
  `};
`;

export const BannerGroup = styled.View`
  justify-content: space-between;
  align-items: center;
  flex: 1;
  flex-direction: row;
`;

export const ImageAds = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
