import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Load, TextCancel } from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
    color: "edit" | "delete";
    isLoading?: boolean;
}

export function HeaderButton({ title, color, isLoading = false, onPress, ...rest }: Props) {
    return (
        <Container onPress={onPress} color={color} {...rest}>
            {isLoading ? <Load /> :
                <TextCancel color={color}>{title}</TextCancel>
            }

        </Container>

    )
}