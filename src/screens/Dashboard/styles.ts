import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    padding: 0 16px;
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(10)}px;
`;

export const SearchContainer = styled.View`
    width: 100%;
    margin-top: ${RFValue(90)}px;
`;




