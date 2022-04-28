import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 16px;
`;


const TextsWelcome = styled.View`
  margin-top: ${RFValue(30)}px;
`;

const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.blue_default};
`;

const SubTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.title};
  opacity: 0.72;
`;

const UserEvents = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
  height: ${RFPercentage(39)}px;
`;

const ButtonsContainer = styled.View`
  justify-content: space-around;
  height: ${RFPercentage(20)}px;
`;

export {
  Container,
  TextsWelcome,
  Title,
  SubTitle,
  UserEvents,
  ButtonsContainer,
};
