import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  padding: 10px 16px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.blue_default};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(18)}px;
  margin-bottom: 100px;
`;