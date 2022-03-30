import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  margin-top: ${getStatusBarHeight() + RFValue(13)}px;

  flex: 1;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const NotificationButton = styled(BorderlessButton)``;

export const Icon = styled(MaterialIcons)`
  font-size: ${RFValue(24)}px;

  color: ${({ theme }) => theme.colors.title};

`;