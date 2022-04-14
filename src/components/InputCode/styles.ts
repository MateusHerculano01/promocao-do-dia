import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type ContainerProps = {
  isErrored: boolean;
}

export const InputField = styled.View<ContainerProps>`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  ${(props) => props.isErrored && css`
    border-color: ${({ theme }) => theme.colors.attention};
  `}
`;

export const Input = styled(TextInput)`
  flex: 1;
  width: 100%;
  text-align: center;
  font-size:${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.8;
`;

