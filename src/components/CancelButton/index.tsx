import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, TextCancel } from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
}

export function CancelButton({ title, onPress, ...rest }: Props) {
    return (
        <Container onPress={onPress} {...rest}>
            <TextCancel>{title}</TextCancel>
        </Container>

    )
}