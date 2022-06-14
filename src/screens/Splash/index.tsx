import React, { useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated';
import BasketSvg from '@assets/basket.svg';
import { Container, TextAnimated } from './styles';

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation();

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
      transform: [
        {
          translateY: interpolate(splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
      transform: [
        {
          translateY: interpolate(splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  function startApp() {
    navigation.navigate('LoginEmail');
  }

  useFocusEffect(() => {
    splashAnimation.value = withTiming(50,
      { duration: 1000 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    );
  });

  return (
    <Container>
      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <BasketSvg width={200} height={200} />
      </Animated.View>

      <Animated.View style={[textStyle, { position: 'absolute' }]}>
        <TextAnimated>As melhores ofertas na palma {'\n'} da {'\n'}sua mão</TextAnimated >
      </Animated.View>
    </Container>
  );
}