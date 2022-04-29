import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../../global/styles/theme';
import { Container, Title, Icon, Load } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  isLoading?: boolean;
  backgroundColor: "primary" | "secondary";
  iconRight?: boolean;
  iconName?: string;
  iconColor?: string;
  onPress: () => void;

}

export function Button({ title, isLoading = false, backgroundColor, iconRight, iconName, iconColor, onPress, ...rest }: ButtonProps) {
  return (
    <Container onPress={onPress} enabled={!isLoading} {...rest} style={{ backgroundColor: backgroundColor === "primary" ? theme.colors.primary : theme.colors.blue_default }}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
      {iconRight &&
        <Icon name={iconName} style={{ color: iconColor ? iconColor : theme.colors.secondary }} />
      }
    </Container>
  )
}