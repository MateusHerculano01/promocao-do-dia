import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.colors.attention};
  border-radius: 5px;
  padding: 5px;
  background-color: transparent;
`;

export const TextCancel = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

