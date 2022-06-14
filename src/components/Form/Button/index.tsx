import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../../global/styles/theme';
import { Container, Title, Icon, Load } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  isLoading?: boolean;
  backgroundColor: "primary" | "secondary" | "delete";
  iconRight?: boolean;
  iconName?: string;
  iconColor?: string;
  onPress: () => void | Promise<void>;
}

export function Button({ title, isLoading = false, backgroundColor, iconRight, iconName, iconColor, onPress, ...rest }: ButtonProps) {
  return (
    <Container onPress={onPress} enabled={!isLoading} backgroundColor={backgroundColor} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
      {iconRight &&
        <Icon name={iconName} style={{ color: iconColor ? iconColor : theme.colors.secondary }} />
      }
    </Container>
  )
}