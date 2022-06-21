import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: ${RFValue(300)}px;
  height: ${RFValue(300)}px;
  margin-bottom: ${RFValue(18)}px;
`;

export const Image = styled.Image`
  width: ${RFValue(300)}px;
  height: ${RFValue(300)}px;
  border-radius: 9px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  position: absolute;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(35)}px;
  color: ${({ theme }) => theme.colors.attention};
  opacity: 0.8;
`;
