import styled from 'styled-components/native';
// import { MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  margin-top: ${getStatusBarHeight() + RFValue(10)}px;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-weight: bold;
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const NotificationButton = styled(TouchableOpacity)``;

export const Icon = styled.View`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title};

`;