import styled from 'styled-components/native'
import { FlatList, FlatListProps } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { DataListProps } from '.';
import { getBottomSpace } from 'react-native-iphone-x-helper';

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

export const Advertisements = styled.View`
    flex: 1;
    flex-direction: column;

    margin-top: ${RFPercentage(3)}px;
`;

export const AdvertisementsList = styled(
    FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
    }
})``;




