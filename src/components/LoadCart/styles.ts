import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LottieViewContainer = styled(LottieView)`
  background-color: transparent;
  width: ${RFValue(200)}px;
  height: ${RFValue(200)}px;
`