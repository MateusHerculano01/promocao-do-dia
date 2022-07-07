import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, TextCancel } from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
    color: "edit" | "delete";
}

export function HeaderButton({ title, color, onPress, ...rest }: Props) {
    return (
        <Container onPress={onPress} color={color} {...rest}>
            <TextCancel color={color}>{title}</TextCancel>
        </Container>

    )
}