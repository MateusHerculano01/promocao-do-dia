import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  padding: 0 14px;
`;

export const ContainerScroll = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
})`
 `;

export const Header = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${RFPercentage(15)}px;

`;

export const ReturnButton = styled(TouchableOpacity)``;

export const Icone = styled(AntDesign)`
  font-size: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  margin-left: 15px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: bold;
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;