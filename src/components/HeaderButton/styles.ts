import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  color: "edit" | "delete";
}

export const Container = styled.TouchableOpacity<Props>`
  border: 1px solid;
  border-radius: 5px;
  padding: 5px;
  background-color: transparent;

  ${({ color, theme }) => color === "edit" && css`
    border-color: ${({ theme }) => theme.colors.blue_default};
  `};

  ${({ color, theme }) => color === "delete" && css`
    border-color: ${({ theme }) => theme.colors.attention};
  `};

`;

export const TextCancel = styled.Text<Props>`
font-size: ${RFValue(14)}px;
font-family: ${({ theme }) => theme.fonts.semibold};

${({ color, theme }) => color === "edit" && css`
    color: ${({ theme }) => theme.colors.blue_default};
  `};

  ${({ color, theme }) => color === "delete" && css`
    color: ${({ theme }) => theme.colors.attention};
  `};
`;

