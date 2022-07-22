import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
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

export const NotificationButton = styled(TouchableOpacity)`
  position: relative;
`;

export const Icon = styled(MaterialIcons)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const CountNotifications = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: ${RFValue(10)}px;
  height: ${RFValue(10)}px;
  top: ${RFValue(4)}px;
  right: ${RFValue(3)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${({ theme }) => theme.colors.attention};
`;

export const NotificationsNumber = styled.Text``;
