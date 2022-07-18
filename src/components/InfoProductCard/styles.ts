import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;


export const Separator = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.title};
  opacity: 0.1;
`;