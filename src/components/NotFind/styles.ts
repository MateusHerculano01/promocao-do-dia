import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const NotFindView = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  margin-top: 80px;
  align-items: center;
`;

export const TextEmoji = styled.Text`
  font-size: ${RFValue(50)}px;
`;

export const TextTitle = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(26)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin: 10px 0; 
`;

export const TextSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: center;
  line-height: 50px;
`;
